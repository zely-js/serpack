<div align="center">
  <h1>Serpack</h1>
  <p>a JavaScript/TypeScript tool for application development, powered by <a href="https://swc.rs">SWC</a>.</p>
  <a href="https://zely.vercel.app/serpack"><img src="https://img.shields.io/badge/docs-available-blue.svg" alt="Documentation"></a>
  <a href="https://npmjs.com/package/serpack"><img src="https://img.shields.io/npm/v/serpack.svg" alt="NPM Version"></a>
  <a href="https://npmjs.com/package/serpack"><img src="https://img.shields.io/npm/dt/serpack.svg" alt="NPM Downloads"></a>
</div>

---

Serpack is optimized for high-speed bundling and execution of TypeScript files, leveraging [swc](https://swc.rs/) as a transformer and [oxc](https://oxc.rs/) as a resolver for enhanced performance.

This project is designed to be a versatile tool for JavaScript and TypeScript development, providing fast compilation and module bundling capabilities. It is particularly useful for building CLI applications, server-side scripts, and other Node.js-based projects.  
By default, serpack is built to run Javascript/Typescript, but it also supports module bundling!

> [Read our documentation](https://zely.vercel.app/serpack)

## Features

- ⚡ **Lightning Fast**: Your JavaScript/TypeScript file will be compiled it in the blink of an eye.
- 📦 **Module Bunling**: Bundle multiple files into one file.
- 🚀 **TypeScript Supported**: TypeScript compilation is also possible.

## CLI

```txt
$ serpack <path>
```

> [`CLI documentation`](https://zely.vercel.app/serpack/cli)

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

> [`compile API documentation`](https://zely.vercel.app/serpack/compile)

## Supported Extensions

- **JavaScript**: `js`, `cjs`,`mjs`, `jsx`
- **TypeScript**: `ts`, `cts`, `mts`, `tsx`
- **JSON**: `json`

## LICENSE

MIT
