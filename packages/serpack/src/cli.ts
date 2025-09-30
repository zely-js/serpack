#!/usr/bin/env node

import { CLI } from 'animaux';
import { rmSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { debug } from '@serpack/logger';

import pkg from '../package.json';
import { CompilerOptions } from '.';
import { loadConfig } from './config';
import { compile } from './compile';

const app = new CLI('serpack')
  .option('--no-run', 'only bundle file', false)
  .option('--output, -o', 'provide outfile path')
  .option('--cli', 'whether js app is cli', false)
  .option('--runtime', 'enable runtime', false)
  .option('--external', 'exclude node_modules from output', false)
  .option('--cwd', 'cwd', process.cwd())
  .option('--sourcemap, -s', '(experimental) provide sourcemap path', false);

app.version(pkg.version);

app.action(async ({ options: command }) => {
  const args = (command as any).__;
  const path = args.join(' ');

  debug(`[serpack:cli] args: ${JSON.stringify(command)}`);

  const config = (await loadConfig(command.cwd))?.compilerOptions || {};

  const options: CompilerOptions = {
    banner: command.cli ? '#!/usr/bin/env node' : '',
    ...config,
  };

  let target;

  if (command.output) {
    target = join(process.cwd(), command.output);
  } else {
    target = join(process.cwd(), `cache.${performance.now()}.js`);
  }

  if (command.runtime || process.argv.includes('--runtime')) {
    options.runtime = true;
  }
  if (command.external || process.argv.includes('--external')) {
    options.nodeExternal = true;
  }
  if (command.sourcemap) {
    options.sourcemap = true;
    options.sourcemapOptions = {
      sourcemapRoot: dirname(`${target}.map`),
    };
  }

  const output = await compile(path, options);

  if (command.sourcemap) {
    if (typeof command.sourcemap !== 'string') {
      (command as any).sourcemap = `${target}.map`;
    }
    writeFileSync(command.sourcemap, output.map);
  }

  writeFileSync(target, output.code);

  if (!command['no-run']) {
    try {
      require(target);
    } catch (e) {
      if (!command.output) {
        rmSync(target);
      }

      console.error(e);
    }
  }

  if (!command.output) {
    rmSync(target);
  }
});

app.parse(process.argv.slice(2));
