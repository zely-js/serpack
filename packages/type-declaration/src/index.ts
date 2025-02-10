import type { Plugin } from 'serpack';
import oxc from 'oxc-transform';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';

function findCommonRoot(directories: string[]) {
  if (directories.length === 0) return '';

  const paths = directories.map((dir) => dir.replace(/\\/g, '/').split('/'));
  let commonRoot = paths[0];

  for (let i = 1; i < paths.length; i += 1) {
    let j = 0;
    while (
      j < commonRoot.length &&
      j < paths[i].length &&
      commonRoot[j] === paths[i][j]
    ) {
      j += 1;
    }
    commonRoot = commonRoot.slice(0, j);
    if (commonRoot.length === 0) break;
  }

  return commonRoot.length > 0 ? commonRoot.join('/') : '/';
}

function replaceExtension(filename: string, newExt: string): string {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex === -1) {
    return `${filename}.${newExt}`;
  }
  return `${filename.substring(0, dotIndex)}.${newExt}`;
}

export function TypeDeclaration(outdir: string): Plugin {
  let cache = {};

  return {
    name: 'serpack-declaration',

    onSetup() {
      cache = {};
    },

    onLoad(context) {
      if (cache[context.filename.resolved]) {
        return;
      }

      if (!context.source) {
        context.source = readFileSync(context.filename.resolved).toString();
      }

      const { code, errors } = oxc.isolatedDeclaration(
        context.filename.resolved,
        context.source,
        {
          stripInternal: true,
        }
      );

      if (errors.length > 0) {
        console.error(errors);
      }

      cache[context.filename.resolved] = code;
    },

    onBundle() {
      const root = findCommonRoot(Object.keys(cache));
      const entries = Object.entries(cache);

      for (const [entry, source] of entries) {
        const entrypoint = relative(root, entry);

        mkdirSync(dirname(join(outdir, entrypoint)), { recursive: true });

        writeFileSync(
          replaceExtension(join(outdir, entrypoint), 'd.ts'),
          source as string
        );
      }
    },
  };
}
