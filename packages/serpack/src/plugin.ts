import MagicString from 'magic-string';
import { CompilerOptions } from './core';

export interface PluginContext {
  filename: {
    original: string;
    resolved: string;
  };
  /** original source */
  source?: string;
}

export type PluginContextOnCompile = {
  s: MagicString;
} & PluginContext;

type CompilerOutput<T = any> = Promise<T | void> | T | void;

export interface PluginContextOnResolve {
  resolved: string;
  original: {
    dirname: string;
    to: string;
  };
  type: 'internal' | 'external';
  by?: string;
}

export type Promisable<T> = Promise<T> | T;

export interface Plugin {
  /** `name` is used for debugging */
  name?: string;

  onSetup?(compilerOptions: CompilerOptions): CompilerOptions | void;

  onLoad?(context: PluginContext): void;

  onCompile?(
    context: PluginContextOnCompile
  ): Promisable<CompilerOutput<{ code: string; map?: any }>>;

  onResolve?(context: PluginContextOnResolve): string;

  onBundle?(): Promisable<CompilerOutput<void>>;
}

/**
 * 1. setup compiler
 * 2. run `plugin.onSetup`
 * ...
 * 3. load module
 * 4. run `plugin.onLoad`
 * 5. load & compile module // ==> output
 * 6. run `plugin.onCompile` // Loop
 * ...
 * 7. run `plugin.onBundle`
 *
 */
