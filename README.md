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

| Option            | Description                               | Default        |
| ----------------- | ----------------------------------------- | -------------- |
| `--no-run`        | only build file                           | `false`        |
| `--output, -o`    | provide outfile path                      | `"cache.~.js"` |
| `--sourcemap, -s` | provide sourcemap path **(experimental)** | `false`        |

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

| Option            | Description              | Default |
| ----------------- | ------------------------ | ------- |
| `parserOptions`   | Acorn parse options      | `{}`    |
| `globals`         | Global variable settings |         |
| `resolverOptions` | oxc-resolver options     | `{}`    |

> 🚧 The sourcemap generation is still under development.

### `importToRequire`

Convert `ImportStatement` to require.

```ts
const requireNode = importToRequire(node);
```

## LICENSE

MIT
