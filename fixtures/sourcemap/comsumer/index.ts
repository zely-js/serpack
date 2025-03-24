// src/parse.ts
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { SourceMapConsumer } from 'source-map';

import { parseError } from './parse';

async function parse(err: Error, map?: string) {
  const stacks = parseError(err);
  const occured = (stacks as any)[0].loc.slice(1, -1);
  const sliced = occured.split(':');

  const column = sliced.pop();
  const line = sliced.pop();

  const trace = {
    filename: occured,
    line: Number(line),
    column: Number(column),
  };

  if (!existsSync(map as string)) {
    throw new Error(".map file desn't exist");
  }

  const sourcemapRaw = JSON.parse(readFileSync(map as string, 'utf-8'));

  const sourcemap = new SourceMapConsumer(sourcemapRaw);

  const result = (await sourcemap).originalPositionFor(trace);
  const target = result.source;

  const errorFile = readFileSync(target, 'utf-8').split('\n');
  const errorLine = errorFile[result.line - 1];

  (stacks as any).unshift({
    at: '',
    loc: `${target}:${result.line}:${result.column}`,
  });

  return { line: errorLine, originalFile: errorFile, stacks };
}

async function emit(e: Error, map: string) {
  const parsed = await parse(e, map);
  console.log(e.message);
  console.log(`> ${parsed.line} (at ${(parsed.stacks as any)[0].loc})`);
}

export { parse, emit };
