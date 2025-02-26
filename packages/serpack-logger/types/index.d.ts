import 'colors';
export declare enum COMPILER_LOG_LEVEL_TYPE {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}
declare function error(message: string): void;
declare function warn(message: string): void;
declare function info(message: string): void;
declare function debug(message: string): void;
export { error, warn, info, debug };
