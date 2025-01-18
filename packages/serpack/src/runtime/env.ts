/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable camelcase */

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
  var __RUNTIME__: RuntimeEnv;
}

/**
 * Get runtime env declares
 */
export function env(__serpack_env__?: RuntimeEnv): RuntimeEnv {
  if (!__serpack_env__) {
    if (typeof process !== 'undefined' && process?.env?.__RUNTIME__) {
      return JSON.parse(process.env.__RUNTIME__);
    }

    if (typeof window !== 'undefined' && window?.__RUNTIME__) {
      return window.__RUNTIME__;
    }
  }

  if (typeof __serpack_env__ === 'string') return JSON.parse(__serpack_env__);

  return __serpack_env__;
}
