import { CompilerOptions } from './core';
/** https://zely.vercel.app/serpack/compile */
declare function compile(entry: string, compilerOptions?: CompilerOptions): Promise<{
    code: string;
    map: string;
}>;
export { compile };
