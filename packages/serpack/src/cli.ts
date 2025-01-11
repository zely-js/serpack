#!/usr/bin/env node

import program from 'animaux';
import { rmSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { debug } from '@serpack/logger';

import pkg from '../package.json';
import { compile } from '.';

const app = program('serpack');

app.version(pkg.version);

app
  .option('--no-run', 'only bundle file')
  .option('--output, -o', 'provide outfile path')
  .option('--sourcemap, -s', '(experimental) provide sourcemap path');

app.action(async (command) => {
  const args = command.__;
  const path = args.join(' ');

  debug(`[serpack:cli] args: ${JSON.stringify(command)}`);

  const output = await compile(path);
  let target;

  if (command.output) {
    target = join(process.cwd(), command.output);
  } else {
    target = join(process.cwd(), `cache.${performance.now()}.js`);
  }

  if (command.sourcemap) {
    if (typeof command.sourcemap !== 'string') {
      command.sourcemap = `${target}.map`;
    }
    writeFileSync(command.sourcemap, output.map);
  }

  writeFileSync(target, output.code);

  if (!command['no-run']) {
    require(`./${relative(__dirname, target).replace(/\\/g, '/')}`);
  }

  if (!command.output) {
    rmSync(target);
  }
});

app.parse(process.argv);
