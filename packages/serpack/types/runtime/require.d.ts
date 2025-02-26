/** create require function working in node environment */
export declare function createNodeRequire(modules: Record<number, any>): (id: any) => any;
/** create require function working in browser environment */
export declare function createBrowserRequire(modules: Record<number, any>): (id: any) => any;
/** create require() to load virtual modules */
export declare function createRequire(modules: Record<number, any>): (id: any) => any;
