const { join } = require('path');
const serpack = require('../../packages/serpack/dist/runtime/index');

const runtime = serpack.createRuntime(join(__dirname, './compiled.js'));

runtime.createExternalModule('hello', (a, b, module) => {
  module.exports = {
    name: 'World',
  };
});

const mod = runtime.execute();

console.log(mod);
