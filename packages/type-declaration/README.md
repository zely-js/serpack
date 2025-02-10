# serpack-declaration

Plugin for generating `.d.ts` file using [oxc-transform](https://oxc.rs/)

```ts
import { join } from 'path';
import { TypeDeclaration } from 'serpack-declaration';

export default <import('serpack').Options>{
  compilerOptions: {
    plugins: [TypeDeclaration(join(process.cwd(), './types/'))],
  },
};
```
