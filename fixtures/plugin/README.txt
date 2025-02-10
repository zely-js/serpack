Test plugin works

$ node ./packages/serpack/dist/cli.js ./fixtures/plugin/index.ts --output=./fixtures/plugin/index.js --cwd=./fixtures/plugin


## Expected output

On Setup -  {"banner":"","type":"module","plugins":[{"name":"test"}]}
On Load -  D:\serpack\fixtures\plugin\index.ts
On Compile -  D:\serpack\fixtures\plugin\index.ts
On Load -  D:\serpack\fixtures\plugin\foo\bar.ts
On Load -  D:\serpack\fixtures\plugin\foo\bar.ts
On Load -  D:\serpack\fixtures\plugin\foo\bar.ts
On Compile -  D:\serpack\fixtures\plugin\foo\bar.ts

----------

inserted - D:\serpack\fixtures\plugin\index.ts
inserted - D:\serpack\fixtures\plugin\foo\bar.ts
File 2
File 1
