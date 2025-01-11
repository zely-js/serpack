import { extname } from 'path';
import { warn } from '@serpack/logger';

export function load(filename: string, source: string) {
  const ext = extname(filename).slice(1);

  // TODO: support more extensions
  if (ext === 'json') {
    return `module.exports=${source};`;
  }
  warn(`Unsupported extension: .${ext} (file: ${filename})`);
}
