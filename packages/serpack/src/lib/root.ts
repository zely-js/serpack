import { existsSync } from 'fs';
import { join, parse, normalize, sep } from 'path';

function find(chunks?: string[]): string | null {
  if (!chunks || chunks.length === 0) {
    return null;
  }

  const currentPath = join(...chunks);
  if (existsSync(join(currentPath, 'package.json'))) {
    return join(currentPath, 'package.json');
  }
  const parentDir = parse(currentPath).dir;

  if (currentPath === parentDir) {
    return null;
  }

  return find(parentDir.split(sep));
}

export function findPackage(dir: string): string | null {
  const normalizedDir = normalize(dir);
  const chunks = normalizedDir.split(sep);

  return find(chunks);
}
