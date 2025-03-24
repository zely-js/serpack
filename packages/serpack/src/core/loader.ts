/* eslint-disable no-bitwise */
import { extname } from 'path';
import { warn } from '@serpack/logger';
import { encode as vlqEncode } from 'vlq';

function generateMappings(jsonObj: any): string {
  let currentColumn = 0;
  let mappings = '';

  // Initial mapping for "module.exports="
  mappings += vlqEncode([currentColumn, 0, 0, 0]);
  currentColumn += 15; // module.exports=

  mappings += `,${vlqEncode([0, 0, 0, 0])}`;

  const entries = Object.entries(jsonObj);
  entries.forEach(([key, value], index) => {
    // Map the key
    mappings += `,${vlqEncode([1, 0, 0, currentColumn])}`;
    currentColumn += key.length + 2;

    currentColumn += 2;

    const valueStr = JSON.stringify(value);
    mappings += `,${vlqEncode([1, 0, 0, currentColumn])}`;
    currentColumn += valueStr.length;

    if (index < entries.length - 1) {
      currentColumn += 2;
    }
  });

  return mappings;
}

function generateJSONSourceMap(originalPath: string, source: string) {
  const obj = JSON.parse(source);

  return {
    version: 3,
    file: originalPath,
    sources: [originalPath],
    names: [],
    sourcesContent: [source],
    mappings: generateMappings(obj),
    sourceRoot: '',
  };
}

export function load(filename: string, source: string) {
  const ext = extname(filename).slice(1);

  // TODO: support more extensions
  if (ext === 'json') {
    return {
      code: `module.exports=${source};`,
      map: generateJSONSourceMap(filename, source),
    };
  }

  warn(`Unsupported extension: .${ext} (file: ${filename})`);
  return { code: '', map: null };
}
