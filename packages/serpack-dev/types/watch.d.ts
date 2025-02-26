import { Options } from 'serpack';
import { FSWatcher } from 'chokidar';
export type EntryOutput = string | {
    outfile: string;
    map: string;
};
export interface DevOptions {
    output?: EntryOutput;
    /** @default false */
    map?: boolean;
}
declare class Dev {
    entry: string;
    options: Options;
    compiler: Compiler;
    watcher: FSWatcher;
    dependencies: string[];
    constructor(entry: string, options?: Options);
    updateDependencies(): Promise<string[]>;
    writeResult(code: string, map?: string): void;
    watch(): Promise<void>;
}
export { Dev };
