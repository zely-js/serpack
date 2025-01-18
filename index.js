const { writeFileSync } = require('fs');
const { compile } = require('./packages/serpack/dist');

const now = performance.now();

compile('./packages/serpack/src/index.ts', {
  nodeExternal: true,
}).then(({ code }) => {
  console.log(`Compiled in ${(performance.now() - now).toFixed(2)}ms`);
  writeFileSync(
    'serpack.js',
    `/* ** This is core package compiled using serpack ** */\n\n${code}`
  );
});
