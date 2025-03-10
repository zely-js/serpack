import { debug } from '@serpack/logger';
import { Compiler, CompilerOptions } from './core';

/** https://zely.vercel.app/serpack/compile */
async function compile(entry: string, compilerOptions?: CompilerOptions) {
  const now = performance.now();
  const compiler = new Compiler(entry, compilerOptions);

  await compiler.compile(entry);

  const output = await compiler.bundle();

  debug(`Compiled Successfully in ${(performance.now() - now).toFixed()}ms`);

  return {
    code: output.code,
    map: output.map,
  };
}

export { compile };
