/* eslint-disable camelcase */
export * as __swc_helper__ from '@swc/helpers';

export function createRequire(modules: Record<number, any>) {
  const __serpack_module_cache__ = {};

  function __serpack_require__(id) {
    if (!id.startsWith('sp:')) return require(id);

    id = id.slice(3);

    if (__serpack_module_cache__[id]) {
      return __serpack_module_cache__[id];
    }

    const module = { exports: {} };

    modules[id].call(
      module.exports,
      __serpack_require__,
      require,
      module,
      module.exports
    );
    __serpack_module_cache__[id] = module.exports;

    return module.exports;
  }

  return __serpack_require__;
}
