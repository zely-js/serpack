/* eslint-disable no-loop-func */
/* eslint-disable default-param-last */
import { dirname, extname, isAbsolute, join, parse as parsePath } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { Options, transform } from '@swc/core';
import { debug, dev, error, warn } from '@serpack/logger';
import { parseSync, Node, CallExpression } from 'oxc-parser';
import { ResolverFactory, NapiResolveOptions, ResolveResult } from 'oxc-resolver';
import { walk } from 'estree-walker';
import { generate } from 'astring';
import { deepmerge } from 'deepmerge-ts';
import { builtinModules } from 'module';
import MagicString, { Bundle } from 'magic-string';

import { importToRequire } from './parse';
import {
  __NON_SERPACK_REQUIRE__,
  __SERPACK_ENV__,
  __SERPACK_MODULE_CACHE__,
  __SERPACK_MODULE_PENDING__,
  __SERPACK_REQUIRE__,
} from './functions';
import { load } from './loader';
import { findPackage } from '../lib/root';
import { Plugin } from '../plugin';

const MODULE_EXT = ['cjs', 'mjs', 'js', 'cts', 'mts', 'ts', 'jsx', 'tsx'];
const SUPPORTED_EXT = [...MODULE_EXT, 'json'];
const TS_EXT = ['ts', 'cts', 'mts', 'tsx'];

/** https://zely.vercel.app/serpack/options */
export interface CompilerOptions {
  globals?: {
    vars?: Record<string, string>;
    env?: Record<string, string>;
  };

  /** `oxc-resolver` options */
  resolverOptions?: NapiResolveOptions;

  type?: 'script' | 'module';

  /** Banner */
  banner?: string;
  /** Footer */
  footer?: string;

  /** @deprecated use `options.externals` instead. */
  forceExternal?: string[];

  /** Exclude every node_modules */
  nodeExternal?: boolean;
  /** Exclude specific modules */
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

  plugins?: Plugin[];

  swcOptions?: Options;

  modifier?: {
    caller?: (node: CallExpression, parent: Node, ctx: { filename: string }) => Node;
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

  _DEV: {
    startTime: number;
    sum: number;
  };

  constructor(entry: string, compilerOptions?: CompilerOptions) {
    if (!isAbsolute(entry)) {
      entry = join(process.cwd(), entry);
    }

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

    for (const element of this.pluginArray('onSetup')) {
      const output = element(this.parserOptions);
      if (output) this.parserOptions = { ...this.parserOptions, ...output };
    }

    // (DEV) For trace bottleneck
    if (__DEV__) {
      this._DEV = { startTime: performance.now(), sum: 0 };
    }
  }

  // (DEV) For get processing time
  getTime() {
    const time = performance.now() - this._DEV.startTime;
    this._DEV.startTime = performance.now();
    this._DEV.sum += time;
    return time.toFixed(1);
  }

  pluginArray<T extends keyof Plugin>(field: T): Plugin[T][] {
    return (this.parserOptions.plugins?.map((plugin) => plugin[field]) ?? []).filter(
      (a): a is Plugin[T] => a !== undefined && a !== null
    );
  }

  async transform(filename: string = this.entry) {
    const source = readFileSync(filename, 'utf-8');

    if (!MODULE_EXT.includes(extname(filename).slice(1))) {
      const target = filename.replace(/\\/g, '/');

      if (this.parserOptions?.type === 'script') {
        return {
          code: `module.exports=/*export*/${__NON_SERPACK_REQUIRE__}(\`./$\{${__SERPACK_REQUIRE__}("path").relative(__dirname, "${target}").replace(/\\\\/g, '/')}\`);`,
          map: null,
        };
      }

      if (!this.parserOptions?.type || this.parserOptions?.type === 'module') {
        const loaded = load(target, source);
        // Assuming load function returns { code, map }
        return { code: loaded.code, map: loaded.map || null };
      }

      error(`unknown options.type: ${this.parserOptions?.type}`);
    }

    if (this.parserOptions?.type === 'script') {
      if (!this.parserOptions.globals) {
        this.parserOptions.globals = {};
      }
      if (!this.parserOptions.globals.vars) {
        this.parserOptions.globals.vars = {};
      }

      this.parserOptions.globals.vars.__filename = JSON.stringify(filename);
      this.parserOptions.globals.vars.__dirname = JSON.stringify(dirname(filename));
    }

    const swcOutput = await transform(
      source,
      deepmerge(
        {
          filename,
          isModule: true,
          sourceMaps: true,
          module: {
            type: 'commonjs',
            strict: false,
            strictMode: false,
          },
          jsc: {
            externalHelpers: !!this.parserOptions.runtime || false,
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
        },
        this.parserOptions.swcOptions
      )
    );

    // (DEV) Check module compilation time
    if (__DEV__) {
      dev(`Module "${filename}" compiled in ${this.getTime()}`);
    }

    // Create a MagicString instance to handle transformations and sourcemaps
    const magicString = new MagicString(swcOutput.code, { filename });

    for await (const onCompile of this.pluginArray('onCompile')) {
      await onCompile({
        filename: { original: filename, resolved: filename },
        s: magicString,
        source,
      });
    }

    return {
      code: magicString.toString(),
      map: magicString.generateMap({
        source: filename,
        file: `${filename}.map`,
        includeContent: true,
        hires: true,
      }),
    };
  }

  resolve(dirname: string = process.cwd(), to: string, by?: string) {
    const out = this.resolver.sync(dirname, to);
    let output = this.resolveDev(to, out);

    for (const element of this.pluginArray('onResolve')) {
      output =
        element({
          resolved: out.path,
          type: output ? 'internal' : 'external',
          original: {
            dirname,
            to,
          },
          by,
        }) ?? output;
    }

    return output;
  }

  resolveDev(to: string, out: ResolveResult) {
    const target = out.path;

    if (!target) return;

    for (const element of this.pluginArray('onLoad')) {
      element({
        filename: { original: to, resolved: target },
      });
    }

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

    if (out.error?.length > 0) {
      console.error(out.error);
    }

    return target;
  }

  async compile(
    target: string = this.entry,
    caller: string = join(process.cwd(), 'path')
  ) {
    const _target = this.resolve(dirname(caller), target, target);

    if (!_target) {
      warn(`Cannot resolve module: ${target}`);
      return;
    }

    target = _target;

    if (!(target in this.id)) {
      this.id[target] = Object.keys(this.id).length;
    }

    debug(`Resolving module: ${target}`);

    // ## Compile Start

    const output = await this.transform(target);

    const parsed = this.parseModule(target, output.code, this.parserOptions);

    this.modules[target] = {
      code: parsed.code,
      map: parsed.map,
    };

    for await (const module of parsed.modules) {
      if (builtinModules.includes(module)) {
        continue;
      }

      const resolved = this.resolve(dirname(target), module, target);

      if (!this.modules[resolved]) {
        await this.compile(module, target);
      }
    }
  }

  parseModule(filename: string, sourcecode?: string, parserOptions?: CompilerOptions) {
    const source = sourcecode ?? readFileSync(filename, 'utf-8');
    const s = new MagicString(source);

    const { program: ast } = parseSync(filename, source, {
      sourceType: 'module',
    });

    const $ = {
      modules: [],
      id: this.id,
    };

    const resolver = this.resolve.bind(this);

    walk(ast, {
      enter(node) {
        // ** Core **

        // require statement
        if (
          node.type === 'CallExpression' &&
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require' &&
          node.arguments[0].type === 'Literal'
        ) {
          const path = node.arguments[0].value;
          const resolved = resolver(dirname(filename), path, filename);

          if (!resolved) {
            s.overwrite(node.callee.start, node.callee.end, __SERPACK_REQUIRE__);
            return;
          }

          if (!(resolved in $.id)) {
            $.id[resolved] = Object.keys($.id).length;
          }

          const id = $.id[resolved];

          $.modules.push(path);
          s.overwrite(node.callee.start, node.callee.end, __SERPACK_REQUIRE__);
          s.overwrite(node.arguments[0].start, node.arguments[0].end, `'sp:${id}'`);
        }

        // import statement
        if (node.type === 'ImportDeclaration' && node.source.type === 'Literal') {
          const path = node.source.value;
          const resolved = resolver(dirname(filename), path, filename);

          if (!resolved) return;

          if (!(resolved in $.id)) {
            $.id[resolved] = Object.keys($.id).length;
          }

          const id = $.id[resolved];

          $.modules.push(path);
          node.source.value = `sp:${id}`;

          s.overwrite(node.start, node.end, generate(importToRequire(node)));
        }
      },
      leave(node, parent) {
        // ** Modifier **

        // options.modifier.caller

        if (node.type === 'CallExpression' && parserOptions.modifier?.caller) {
          const replacement =
            parserOptions.modifier?.caller(node, parent, { filename }) || node;
          if (replacement !== node) {
            s.overwrite(node.start, node.end, generate(replacement));
          }
        }
      },
    });

    if (__DEV__) {
      writeFileSync('_output.json', JSON.stringify(ast));
    }

    this.id = $.id;

    // (DEV) Check module parsing time
    if (__DEV__) {
      dev(`Module "${filename}" parsed in ${this.getTime()}`);
    }

    return {
      code: s.toString(),
      map: s.generateMap({
        source: filename,
        file: `${filename}.map`,
        includeContent: true,
        hires: true,
      }),
      modules: $.modules,
    };
  }

  async bundle() {
    const { modules, target } = this;
    const enableSourcemap = this.parserOptions.sourcemap;

    for await (const element of this.pluginArray('onBundle')) {
      await element();
    }

    const bundle = new Bundle();

    debug(`modules: ${JSON.stringify(this.id)}`);

    let wrapperHeader = [
      '(function(modules) {',
      `  var ${__SERPACK_MODULE_CACHE__}={};`,
      `  function ${__SERPACK_REQUIRE__}(id){`,
      '    if (!id.startsWith("sp:")) return require(id);',
      `    if (${__SERPACK_MODULE_CACHE__}[id.slice(3)]) return ${__SERPACK_MODULE_CACHE__}[id.slice(3)];`,
      '    const module={exports:{}};',
      `    ${__SERPACK_MODULE_CACHE__}[id.slice(3)]="${__SERPACK_MODULE_PENDING__}";`,
      `    modules[id.slice(3)].call(module.exports, ${__SERPACK_REQUIRE__}, ${__NON_SERPACK_REQUIRE__}, module, module.exports);`,
      `    ${__SERPACK_MODULE_CACHE__}[id.slice(3)]=module.exports;`,
      '    return module.exports;',
      '  }',
      `  module.exports=${__SERPACK_REQUIRE__}("sp:0");`,
      '})({',
    ];

    if (target === 'browser') {
      wrapperHeader.unshift(
        '/*browser-support*/',
        'var module={exports:{}};',
        // eslint-disable-next-line no-template-curly-in-string
        'function require(id){throw new Error(`Cannot find module "${id}"`);}'
      );
    }

    if (this.parserOptions.runtime) {
      wrapperHeader = [
        `  var ${__SERPACK_ENV__}=${JSON.stringify({
          target: this.target,
        })};`,
        `  ${
          this.target === 'node' ? 'process.env' : 'window'
        }.__RUNTIME__=JSON.stringify(${__SERPACK_ENV__});`,
        'module.exports=({',
      ];
    }

    bundle.prepend(wrapperHeader.join('\n'));

    // options.banner
    if (this.parserOptions?.banner) {
      bundle.prepend(`${this.parserOptions.banner}\n`);
    }

    for await (const [file, module] of Object.entries(modules)) {
      if (module) {
        const banner = `\n/* ${file} */\n"${this.id[file]}": (function(${__SERPACK_REQUIRE__},__non_serpack_require__,module,exports) { `;
        const footer = '\n}),';

        const moduleMagicString = new MagicString(module.code);
        moduleMagicString.prepend(banner);
        moduleMagicString.append(footer);

        bundle.addSource({
          filename: file,
          content: moduleMagicString,
        });
      }
    }

    bundle.append('\n});');

    // options.footer
    if (this.parserOptions?.footer) {
      bundle.append(`\n${this.parserOptions.footer}`);
    }

    // (DEV) Check module bundle time
    if (__DEV__) {
      dev(`Module bundled in ${this.getTime()} (sum: ${this._DEV.sum.toFixed(2)})`);
    }

    return {
      code: bundle.toString(),
      map: enableSourcemap
        ? bundle
            .generateMap({
              file: 'bundle.js',
              includeContent: true,
              hires: true,
            })
            .toString()
        : null,
    };
  }
}

export { Compiler };
