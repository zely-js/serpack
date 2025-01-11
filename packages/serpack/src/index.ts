import { Compiler, CompilerOptions } from './core';

async function compile(entry: string, compilerOptions?: CompilerOptions) {
  const compiler = new Compiler(entry, compilerOptions);

  await compiler.compile(entry);

  const output = compiler.bundle();

  return {
    code: output.code,
    map: JSON.stringify(output.map),
  };
}

export { Compiler, CompilerOptions };
export { compile };
export * from './core/functions';
export * from './core/parse';
