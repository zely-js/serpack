# serpack

Serpack is a JavaScript/TypeScript tool for application development.

```bash
$ npx serpack ./src/index.ts
```

serpack is a tool for developing Javascript/typescript applications. It is designed for high-speed bundling and executing typescript files.

By default, serpack is built to run Javascript/Typescript, but it also supports module bundling!

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

| Option            | Description                    | Default  |
| ----------------- | ------------------------------ | -------- |
| `parserOptions`   | Acorn parse options            | `{}`     |
| `globals`         | Global variable settings (swc) |          |
| `resolverOptions` | oxc-resolver options           | `{}`     |
| `type`            | Type (`script` \| `module`)    | `module` |

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
> In `module` mode, extension support is checked, but in `script` mode, it is loaded **unconditionally**.

## LICENSE

MIT
