Test if sourcemap is working properly

$ node ./packages/serpack/dist/cli.js ./fixtures/sourcemap/index.ts --sourcemap=true --output=./fixtures/sourcemap/compiled.js --external=true
