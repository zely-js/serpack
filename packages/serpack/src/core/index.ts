/* eslint-disable no-loop-func */
/* eslint-disable default-param-last */
import { dirname, extname, join, parse as parsePath, relative } from 'path';
import { readFileSync } from 'fs';

import { transform } from '@swc/core';
import { debug, error } from '@serpack/logger';
import type { Options as ParseOptions } from 'acorn';
import { parse } from 'acorn';
import { ResolverFactory, NapiResolveOptions } from 'oxc-resolver';
import { walk } from 'estree-walker';
import { generate } from 'escodegen';
import { SourceMapGenerator, SourceMapConsumer } from 'source-map';

import { builtinModules } from 'module';
import { importToRequire } from './parse';
import {
  __NON_SERPACK_REQUIRE__,
  __SERPACK_ENV__,
  __SERPACK_MODULE_CACHE__,
  __SERPACK_REQUIRE__,
} from './functions';
import { load } from './loader';
import { findPackage } from '../lib/root';

const MODULE_EXT = ['cjs', 'mjs', 'js', 'cts', 'mts', 'ts', 'jsx', 'tsx'];
const SUPPORTED_EXT = [...MODULE_EXT, 'json'];
const TS_EXT = ['ts', 'cts', 'mts', 'tsx'];

/** https://zely.vercel.app/serpack/options */
export interface CompilerOptions {
  /** `acorn` parser options */
  parserOptions?: ParseOptions;

  globals?: {
    vars?: Record<string, string>;
    env?: Record<string, string>;
  };

  /** `oxc-resolver` options */
  resolverOptions?: NapiResolveOptions;

  type?: 'script' | 'module';

  banner?: string;
  footer?: string;

  /** @deprecated use `options.externals` instead */
  forceExternal?: string[];

  nodeExternal?: boolean;
  externals?: string[];

  /**
   * https://zely.vercel.app/serpack/runtime
   */
  runtime?: boolean;

  /** environment (default: node) */
  target?: 'node' | 'browser';

  /** Allow sourcemap generation */
  sourcemap?: boolean;

  sourcemapOptions?: {
    sourcemapRoot?: string;
  };
}

class Compiler {
  entry: string;

  source: string;

  modules: Record<string, { code: string; map: any } | null>;

  parserOptions: CompilerOptions;

  sourceType: 'typescript' | 'javascript';

  resolver: ResolverFactory;

  resolverOptions: NapiResolveOptions;

  id: Record<string, number>;

  target: 'node' | 'browser';

  constructor(entry: string, compilerOptions?: CompilerOptions) {
    this.entry = entry;

    this.modules = {};

    this.source = readFileSync(entry, 'utf-8');

    this.parserOptions = compilerOptions || {};

    this.sourceType = TS_EXT.includes(parsePath(entry).ext.slice(1))
      ? 'typescript'
      : 'javascript';

    this.resolverOptions = this.parserOptions.resolverOptions || {};

    this.id = {};

    this.target = this.parserOptions.target || 'node';

    this.resolver = new ResolverFactory({
      conditionNames: ['node', 'import'],
      mainFields: ['module', 'main'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
      ...this.resolverOptions,
    });
  }

  async transform(filename: string = this.entry) {
    const source =
      filename !== this.entry ? readFileSync(filename, 'utf-8') : this.source;

    if (!MODULE_EXT.includes(extname(filename).slice(1))) {
      const target = filename.replace(/\\/g, '/');

      if (this.parserOptions?.type === 'script') {
        return {
          code: `module.exports=/*export*/${__NON_SERPACK_REQUIRE__}(\`./$\{${__SERPACK_REQUIRE__}("path").relative(__dirname, "${target}").replace(/\\\\/g, '/')}\`);`,
          map: {},
        };
      }

      if (!this.parserOptions?.type || this.parserOptions?.type === 'module') {
        return { code: load(target, source), map: {} };
      }

      error(`unknown options.type: ${this.parserOptions?.type}`);
    }

    const output = await transform(source, {
      filename,
      isModule: true,
      sourceMaps: true,
      module: {
        // https://swc.rs/docs/configuration/modules#commonjs
        // TODO: Add support for other module types
        type: 'commonjs',
        strict: false,
      },
      jsc: {
        externalHelpers: this.parserOptions.runtime || false,
        target: 'es2015',
        parser: {
          syntax: this.sourceType === 'typescript' ? 'typescript' : 'ecmascript',
        },
        minify: {
          compress: true,
          mangle: true,
        },
        transform: {
          optimizer: {
            globals: {
              envs: this.parserOptions.globals?.env || {},
              vars: this.parserOptions.globals?.vars || {},
            },
          },
        },
      },
    });

    return { code: output.code, map: JSON.parse(output.map) };
  }

  resolve(dirname: string = process.cwd(), to: string) {
    const target = this.resolver.sync(dirname, to).path;

    if (!target) return;

    const extension = parsePath(target).ext.slice(1);

    if (!SUPPORTED_EXT.includes(extension)) return;

    /* deprecated - forceExternal */
    if (this.parserOptions?.forceExternal?.includes(to)) {
      debug(`Resolving module: ${target} [rejected - externals]`);
      return;
    }

    if (builtinModules.includes(target)) {
      debug(`Resolving module: ${target} [rejected - builtin]`);
      return;
    }

    // node modules
    if (target?.includes('node_modules')) {
      if (this.parserOptions.nodeExternal) {
        debug(`Resolving module: ${target} [rejected - node_modules]`);
        return; // exclude
      }

      if (this.parserOptions.externals?.length === 0) return target; // include

      const pkgPath = findPackage(target);

      if (!pkgPath) return target; // include

      const pkg = JSON.parse(readFileSync(pkgPath).toString());
      const { name } = pkg;

      if (this.parserOptions.externals?.includes(name)) {
        return;
      }

      return target;
    }

    return target;
  }

  async compile(
    target: string = this.entry,
    caller: string = join(process.cwd(), 'path')
  ) {
    target = this.resolve(dirname(caller), target);

    if (!target) return;

    if (!this.id[target]) {
      this.id[target] = Object.keys(this.id).length;
    }

    // disable node_modules

    debug(`Resolving module: ${target}`);

    const output = await this.transform(target);

    const parsed = this.parseModule(target, output.code, this.parserOptions);

    this.modules[target] = {
      code: generate(parsed.ast, { format: { compact: true } }),
      map: output.map,
    };

    for await (const module of parsed.modules) {
      if (builtinModules.includes(module)) {
        continue;
      }

      const resolved = this.resolve(dirname(target), module);

      if (!this.modules[resolved]) {
        await this.compile(module, target);
      }
    }
  }

  parseModule(filename: string, sourcecode?: string, parserOptions?: CompilerOptions) {
    const source = sourcecode ?? readFileSync(filename, 'utf-8');

    const ast = parse(source, {
      sourceType: 'module',
      ecmaVersion: 'latest',

      ...parserOptions?.parserOptions,
    });

    const $ = {
      modules: [],
      id: this.id,
    };

    const resolver = this.resolve.bind(this);

    const outputAst = walk(ast, {
      enter(node) {
        // require statement
        if (
          node.type === 'CallExpression' &&
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require' &&
          node.arguments[0].type === 'Literal'
        ) {
          const path = node.arguments[0].value;
          const resolved = resolver(dirname(filename), path);

          if (!resolved) return;

          if (!$.id[resolved]) {
            $.id[resolved] = Object.keys($.id).length;
          }

          const id = $.id[resolved];

          $.modules.push(path);
          node.callee.name = __SERPACK_REQUIRE__;
          node.arguments[0].value = `sp:${id}`;
        }

        // import statement
        if (node.type === 'ImportDeclaration' && node.source.type === 'Literal') {
          const path = node.source.value;
          const resolved = resolver(dirname(filename), path);

          if (!resolved) return;

          if (!$.id[resolved]) {
            $.id[resolved] = Object.keys($.id).length;
          }

          const id = $.id[resolved];

          $.modules.push(path);
          node.source.value = `sp:${id}`;

          this.replace(importToRequire(node));
        }
      },
    });

    this.id = $.id;

    return {
      ast: outputAst,
      modules: $.modules,
    };
  }

  async bundle() {
    const { modules } = this;
    const codeLines: string[] = [];
    const addedSources = new Set<string>();
    const enableSourcemap = this.parserOptions.sourcemap;
    let currentLine = 1;
    let generator: SourceMapGenerator;

    if (this.parserOptions?.banner) {
      codeLines.push(this.parserOptions.banner);
      currentLine += this.parserOptions.banner.split('\n').length;
    }

    if (enableSourcemap) {
      generator = new SourceMapGenerator({ file: 'bundle.js' });
    }

    let wrapperHeader = [
      '(function(modules) {',
      `  var ${__SERPACK_MODULE_CACHE__}={};`,
      `  function ${__SERPACK_REQUIRE__}(id){`,
      '    if (!id.startsWith("sp:")) return require(id);',
      `    if (${__SERPACK_MODULE_CACHE__}[id.slice(3)]) return ${__SERPACK_MODULE_CACHE__}[id.slice(3)];`,
      '    const module={exports:{}};',
      `    modules[id.slice(3)].call(module.exports, ${__SERPACK_REQUIRE__}, ${__NON_SERPACK_REQUIRE__}, module, module.exports);`,
      `    ${__SERPACK_MODULE_CACHE__}[id.slice(3)]=module.exports;`,
      '    return module.exports;',
      '  }',
      `  module.exports=${__SERPACK_REQUIRE__}("sp:0");`,
      '})({',
    ];

    if (this.parserOptions.runtime) {
      wrapperHeader = [
        '(function(modules) {',
        `  var ${__SERPACK_ENV__}=${JSON.stringify({
          target: this.target,
        })};`,
        `  ${
          this.target === 'node' ? 'process.env' : 'window'
        }.__RUNTIME__=JSON.stringify(${__SERPACK_ENV__});`,
        `const ${__SERPACK_REQUIRE__}=require("serpack/runtime").createRequire(modules);`,
        `module.exports=${__SERPACK_REQUIRE__}("sp:0")`,
        '})({',
      ];
    }

    codeLines.push(...wrapperHeader);
    currentLine += wrapperHeader.length;

    for await (const [file, module] of Object.entries(modules)) {
      const banner = `/* ${file} */ "${this.id[file]}": (function(${__SERPACK_REQUIRE__},__non_serpack_require__,module,exports) { `;
      const moduleCode = `${banner}${module.code} }),`;
      codeLines.push(moduleCode);

      if (enableSourcemap) {
        const consumer = await new SourceMapConsumer(module.map);

        consumer.eachMapping((mapping) => {
          generator.addMapping({
            source: relative(
              this.parserOptions?.sourcemapOptions?.sourcemapRoot || dirname(this.entry),
              mapping.source
            ),
            original: {
              line: mapping.originalLine,
              column: mapping.originalColumn,
            },
            generated: {
              line: currentLine,
              column: mapping.generatedColumn + banner.length,
            },
            name: mapping.name,
          });

          if (mapping.source && !addedSources.has(mapping.source)) {
            addedSources.add(mapping.source);
            generator.setSourceContent(
              mapping.source,
              consumer.sourceContentFor(mapping.source, true)
            );
          }
        });
      }

      currentLine += moduleCode.split('\n').length;
    }

    codeLines.push('});');
    currentLine += 1;

    if (this.parserOptions?.footer) {
      codeLines.push(this.parserOptions.footer);
      currentLine += this.parserOptions.footer.split('\n').length;
    }

    // console.log(generator.toString());

    return {
      code: codeLines.join('\n'),
      map: enableSourcemap ? generator.toString() : null,
    };
  }
}

export { Compiler };
