# serpack

Serpack is a JavaScript/TypeScript tool for application development, powered by [swc](https://swc.rs/).

```bash
$ npx serpack ./src/awesome-app.ts # run script
```

Serpack is optimized for high-speed bundling and execution of TypeScript files, leveraging [swc](https://swc.rs/) as a transformer and [oxc](https://oxc.rs/) as a resolver for enhanced performance.

By default, serpack is built to run Javascript/Typescript, but it also supports module bundling!

## Features

- ⚡ **Lightning Fast**: Your JavaScript/TypeScript file will be compiled it in the blink of an eye.
- 📦 **Module Bunling**: Bundle multiple files into one file.
- 🚀 **TypeScript Supported**: TypeScript compilation is also possible.

## CLI

```txt
$ serpack <path>
```

| Option            | Description                               | Default        | Type                  |
| ----------------- | ----------------------------------------- | -------------- | --------------------- |
| `--no-run`        | only build file                           | `false`        | `boolean`             |
| `--output, -o`    | provide outfile path                      | `"cache.~.js"` | `string`              |
| `--sourcemap, -s` | provide sourcemap path **(experimental)** | `false`        | `boolean` \| `string` |
| `--cli`           | whether js file is cli app                | `false`        | `boolean`             |
| `--external`      | exclude `node_modules` from output        | `false`        | `boolean`             |

> TIP: A flag with a boolean type as its value, such as `--cli`, must specify true or false as `--cli=true`

## APIs

### `compile`

Compile a TypeScript or Javascript file in a executable code.

```ts
import { compile } from 'serpack';

compile('foo/bar.ts', {
  /* options */
}).then(({ code }) => {
  eval(code);
});
```

| Option            | Description                                  | Default    |
| ----------------- | -------------------------------------------- | ---------- |
| `nodeExternal`    | exclude `node_modules` from output           | `false`    |
| `externals`       | module to exclude                            | `[]`       |
| `runtime`         | enable runtime (output size will be smaller) | `[]`       |
| `parserOptions`   | Acorn parse options                          | `{}`       |
| `globals`         | Global variable settings (swc)               |            |
| `resolverOptions` | oxc-resolver options                         | `{}`       |
| `type`            | Type (`script` \| `module`)                  | `"module"` |
| `banner`          | banner                                       | `""`       |
| `footer`          | footer                                       | `""`       |

> 🚧 The sourcemap generation is still under development.

### `importToRequire`

Convert `ImportStatement` to require.

```ts
const requireNode = importToRequire(node);
```

## Supported Extensions

- **JavaScript**: `js`, `cjs`,`mjs`, `jsx`
- **TypeScript**: `ts`, `cts`, `mts`, `tsx`
- **JSON**: `json`

> TIP: If you want to load the file regardless of whether its extension is supported, set `options.type`to `script`.  
> In `module` mode, extension support is checked strictly, but in `script` mode, it is loaded **unconditionally**.

## LICENSE

MIT
