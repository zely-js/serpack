import { isAbsolute, resolve } from 'path';
import { createNodeRequire } from './require';

type Module = (
  __serpack_require__: (id: string) => Module,
  __non_serpack_require__: typeof require,
  module: any,
  exports: any
) => void;

type ModulesType = Record<string | number, Module>;

export class Runtime {
  __modules__: ModulesType;

  require: typeof createNodeRequire;

  constructor(modules: ModulesType) {
    this.__modules__ = modules;
    this.require = createNodeRequire(modules);
  }

  loadModule(id: `sp:${number}`) {
    return this.require(id);
  }
}

export function createRuntime(path: string) {
  const absolutePath = isAbsolute(path) ? path : resolve(path);
  const modules: ModulesType = require(absolutePath);

  const runtime = new Runtime(modules);

  return {
    runtime,

    execute() {
      return runtime.loadModule('sp:0');
    },

    createExternalModule(id: string, mod: Module) {
      runtime.__modules__[id] = mod;
    },
  };
}
