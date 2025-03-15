import { error } from '@serpack/logger';
import type { DevOptions } from 'serpack-dev';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, isAbsolute, join, relative } from 'path';
import { CompilerOptions } from './core';
import { compile } from './compile';
import { __importDefault } from './runtime';

export interface Options {
  compilerOptions?: CompilerOptions;
  dev?: DevOptions;
}

export function defineConfig(options: Options) {
  return options;
}

async function loadConfigDev(cwd: string = process.cwd()): Promise<Options> {
  const targets = {
    json: ['.serpackrc', '.serpackrc.json'],
    js: ['.serpackrc.js'],
    ts: ['.serpackrc.ts'],
  };

  targets.json = targets.json.map((filename) => join(cwd, filename));
  targets.js = targets.js.map((filename) => join(cwd, filename));
  targets.ts = targets.ts.map((filename) => join(cwd, filename));

  for (const filename of targets.json) {
    try {
      if (existsSync(filename)) {
        const raw = readFileSync(filename, 'utf-8');

        return JSON.parse(raw);
      }
    } catch (e) {
      error(e);
    }
  }

  for await (const filename of targets.js) {
    const relativePath = `./${relative(__dirname, filename).replace(/\\/g, '/')}`;

    if (existsSync(filename)) {
      try {
        return require(relativePath);
      } catch (e) {
        return await import(relativePath);
      }
    }
  }

  for await (const filename of targets.ts) {
    try {
      if (existsSync(filename)) {
        const output = await compile(filename, {
          globals: {
            vars: {
              __dirname: JSON.stringify(dirname(filename)),
              __filename: JSON.stringify(filename),
            },
          },
        });
        const outfile = join(process.cwd(), 'scfg.js');

        writeFileSync(outfile, output.code);

        const relativePath = `./${relative(__dirname, outfile).replace(/\\/g, '/')}`;

        try {
          const output = require(relativePath);
          rmSync(outfile);
          return output;
        } catch (e) {
          const output = await import(relativePath);
          rmSync(outfile);
          return output;
        }
      }
    } catch (e) {
      error(e);
    }
  }

  return {};
}

export async function loadConfig(cwd: string = process.cwd()): Promise<Options> {
  if (!isAbsolute(cwd)) {
    cwd = join(process.cwd(), cwd);
  }
  const output: any = await loadConfigDev(cwd);

  return __importDefault(output);
}
