import { Compiler, CompilerOptions } from './core';

export async function getDependencies(
  filename: string,
  compilerOptions?: CompilerOptions
) {
  const compiler = new Compiler(filename, compilerOptions || {});
  await compiler.parseModule(filename);

  return Object.keys(compiler.modules);
}
