import type {Plugin} from '@custom-elements-manifest/analyzer';
import type * as ts from 'typescript';

/** A resolved `@availableWhen` condition, in the shape of a Storybook argType's `if:`. */
export type AvailableWhenIf =
  | {arg: string; truthy: boolean}
  | {arg: string; exists: boolean}
  | {arg: string; eq: unknown}
  | {arg: string; neq: unknown};

export function parseCondition(
  cond: string,
  resolveEnum: (id: string) => string | undefined
): AvailableWhenIf | undefined;

export function collectEnums(
  tsModule: typeof ts,
  sourceFile: ts.SourceFile,
  seen?: Set<string>
): Map<string, string>;

export function availableWhenPlugin(): Plugin;
