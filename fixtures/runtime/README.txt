Test if runtime works

$ node ./packages/serpack/dist/cli.js ./fixtures/runtime/index.ts --output=./fixtures/runtime/compiled.js --runtime
$ node ./fixtures/runtime/runner.js