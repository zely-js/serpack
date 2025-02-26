import type { DevOptions } from 'serpack-dev';
import { CompilerOptions } from './core';
export interface Options {
    compilerOptions?: CompilerOptions;
    dev?: DevOptions;
}
export declare function defineConfig(options: Options): Options;
export declare function loadConfig(cwd?: string): Promise<Options>;
