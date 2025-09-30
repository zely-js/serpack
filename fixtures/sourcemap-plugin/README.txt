Test if sourcemap is working properly

$ node ./packages/serpack/dist/cli.js ./fixtures/sourcemap-plugin/index.ts --sourcemap=true --output=./fixtures/sourcemap-plugin/compiled.js --external=true --cwd=./fixtures/sourcemap-plugin
