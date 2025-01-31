import { dirname, isAbsolute, join, normalize, parse, relative } from 'path';
import { Compiler, Options } from 'serpack';
import { FSWatcher, watch } from 'chokidar';
import { debug, info } from '@serpack/logger';
import { mkdirSync, writeFileSync } from 'fs';

export type EntryOutput = string | { outfile: string; map: string };

export interface DevOptions {
  output?: EntryOutput;
  /** @default false */
  map?: boolean;
}

class Dev {
  entry: string;

  options: Options;

  compiler: Compiler;

  watcher: FSWatcher;

  dependencies: string[];

  constructor(entry: string, options?: Options) {
    if (!entry) throw new Error('Entrypoint must be provided.');

    this.entry = entry;
    this.options = options || {};
    this.compiler = new Compiler(entry, this.options?.compilerOptions || {});
  }

  async updateDependencies() {
    if (Object.keys(this.compiler.id).length === 0) await this.compiler.compile();

    const dependencies = Object.keys(this.compiler.id).map((p) => normalize(p));
    // console.log(dependencies);
    this.dependencies = dependencies; // update deps
    return dependencies;
  }

  writeResult(code: string, map?: string) {
    const outfile = {
      js: null,
      map: null,
    };

    if (!this.options.dev?.output) {
      const parsed = parse(this.entry);
      outfile.js = join(process.cwd(), 'dist', `${parsed.name}.js`);
      outfile.map = `${outfile.js}.map`;
    } else if (typeof this.options.dev.output === 'string') {
      outfile.js = this.options.dev.output;
      outfile.map = `${this.options.dev.output}.map`;
    } else {
      outfile.js = this.options.dev.output.outfile;
      outfile.map =
        this.options.dev.output.map ?? `${this.options.dev.output.outfile}.map`;
    }

    mkdirSync(dirname(outfile.js), { recursive: true });
    mkdirSync(dirname(outfile.map), { recursive: true });

    if (code) writeFileSync(outfile.js, code);
    if (map) writeFileSync(outfile.map, map);
  }

  async watch() {
    const compile = async (path: string) => {
      await this.compiler.compile(path);
      const output = await this.compiler.bundle();
      this.writeResult(output.code, output.map);
    };

    const watcher = watch('.', {
      cwd: process.cwd(),
    });

    this.watcher = watcher;

    await this.updateDependencies(); // init dependencies

    debug(`Dependencies: ${JSON.stringify(this.dependencies)}`);

    compile(this.entry);

    info('Watcher is watching...\n');

    watcher.on('change', async (path) => {
      if (!isAbsolute(path)) path = join(process.cwd(), path);

      if (!this.dependencies.includes(normalize(path))) return;

      const start = performance.now();

      await compile(path);

      info(
        `File change detected! Compiled in ${(performance.now() - start).toFixed(
          2
        )}ms - ${relative(process.cwd(), path).gray}`
      );

      // update dependencies

      this.updateDependencies();
    });
  }
}

export { Dev };
