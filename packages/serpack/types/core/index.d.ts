import type { Options as ParseOptions } from 'acorn';
import { ResolverFactory, NapiResolveOptions } from 'oxc-resolver';
import { Plugin } from '../plugin';
/** https://zely.vercel.app/serpack/options */
export interface CompilerOptions {
    /** `acorn` parser options */
    parserOptions?: ParseOptions;
    globals?: {
        vars?: Record<string, string>;
        env?: Record<string, string>;
    };
    /** `oxc-resolver` options */
    resolverOptions?: NapiResolveOptions;
    type?: 'script' | 'module';
    banner?: string;
    footer?: string;
    /** @deprecated use `options.externals` instead */
    forceExternal?: string[];
    nodeExternal?: boolean;
    externals?: string[];
    /**
     * https://zely.vercel.app/serpack/runtime
     */
    runtime?: boolean;
    /** environment (default: node) */
    target?: 'node' | 'browser';
    /** Allow sourcemap generation */
    sourcemap?: boolean;
    sourcemapOptions?: {
        sourcemapRoot?: string;
    };
    plugins?: Plugin[];
}
declare class Compiler {
    entry: string;
    source: string;
    modules: Record<string, {
        code: string;
        map: any;
    } | null>;
    parserOptions: CompilerOptions;
    sourceType: 'typescript' | 'javascript';
    resolver: ResolverFactory;
    resolverOptions: NapiResolveOptions;
    id: Record<string, number>;
    target: 'node' | 'browser';
    constructor(entry: string, compilerOptions?: CompilerOptions);
    pluginArray<T extends keyof Plugin>(field: T): Plugin[T][];
    transform(filename?: string): Promise<{
        code: string;
        map: any;
    }>;
    resolve(dirname: string, to: string): string;
    compile(target?: string, caller?: string): Promise<void>;
    parseModule(filename: string, sourcecode?: string, parserOptions?: CompilerOptions): {
        ast: any;
        modules: any[];
    };
    bundle(): Promise<{
        code: string;
        map: string;
    }>;
}
export { Compiler };
