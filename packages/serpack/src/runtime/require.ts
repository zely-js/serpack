/* eslint-disable camelcase */
// export * as __swc_helper__ from '@swc/helpers';

import { __SERPACK_MODULE_PENDING__ } from '../core/functions';
import { env } from './env';

/** create require function working in node environment */
export function createNodeRequire(modules: Record<number, any>) {
  const __serpack_module_cache__ = {};

  function callModule(id: any) {
    const module = { exports: {} };

    __serpack_module_cache__[id] = __SERPACK_MODULE_PENDING__;

    modules[id].call(
      module.exports,
      // eslint-disable-next-line no-use-before-define
      __serpack_require__,
      require,
      module,
      module.exports
    );
    __serpack_module_cache__[id] = module.exports;

    return module.exports;
  }

  function __serpack_require__(id: any) {
    if (modules[id]) {
      return callModule(id);
    }
    if (!id.startsWith('sp:')) return require(id);

    id = id.slice(3);

    if (__serpack_module_cache__[id]) {
      return __serpack_module_cache__[id];
    }
    return callModule(id);
  }

  return __serpack_require__;
}

/** create require function working in browser environment */
export function createBrowserRequire(modules: Record<number, any>) {
  const __serpack_module_cache__ = {};

  const __browser_require__ = (id: string) => {
    throw new Error(`Cannot find module "${id}"`);
  };

  function __serpack_require__(id) {
    if (!id.startsWith('sp:')) {
      throw new Error(`Cannot find module "${id}"`);
    }

    id = id.slice(3);

    if (__serpack_module_cache__[id]) {
      return __serpack_module_cache__[id];
    }

    const module = { exports: {} };

    __serpack_module_cache__[id] = __SERPACK_MODULE_PENDING__;

    modules[id].call(
      module.exports,
      __serpack_require__,
      __browser_require__,
      module,
      module.exports
    );
    __serpack_module_cache__[id] = module.exports;

    return module.exports;
  }

  return __serpack_require__;
}

/** create require() to load virtual modules */
export function createRequire(modules: Record<number, any>) {
  const runtimeTarget = env()?.target;

  if (runtimeTarget === 'browser') {
    return createBrowserRequire(modules);
  }

  return createNodeRequire(modules);
}
