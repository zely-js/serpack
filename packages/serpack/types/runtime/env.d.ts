export type RuntimeRequired = 'target';
export type RuntimeRequiredType = {
    target: 'node' | 'browser';
};
export type RuntimeEnv = {
    [K in RuntimeRequired]: RuntimeRequiredType[K];
} & {
    [K: string]: any;
};
declare global {
    /** RUNTIME ENV */
    var __RUNTIME__: string;
}
/**
 * Get runtime env declares
 */
export declare function env(__serpack_env__?: RuntimeEnv): RuntimeEnv;
