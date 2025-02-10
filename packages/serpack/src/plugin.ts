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
  output: { code: string; map?: any };
} & PluginContext;

type CompilerOutput<T = any> = Promise<T | void> | T | void;

export interface Plugin {
  /** `name` is used for debugging */
  name?: string;

  onSetup?(compilerOptions: CompilerOptions): CompilerOptions | void;

  onLoad?(context: PluginContext): void;

  onCompile?(
    context: PluginContextOnCompile
  ): CompilerOutput<{ code: string; map?: any }>;

  onBundle?(): CompilerOutput<void>;
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
