Test if __filename, __dirname is declared in script mode

$ node ./packages/serpack/dist/cli.js ./fixtures/vars/index.ts --cwd=./fixtures/vars # type: module
$ node ./packages/serpack/dist/cli.js ./fixtures/vars/index.ts --cwd=./fixtures/vars --script # type: script
