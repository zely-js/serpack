import { loadConfig, Options } from 'serpack';
import { Dev } from './watch';

/** Watcher */
export async function dev(entry: string, options?: Options) {
  const dev = new Dev(entry, {
    ...(await loadConfig()),
    ...options,
  });

  dev.watch();
}

export * from './watch';
