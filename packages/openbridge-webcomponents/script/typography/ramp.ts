/**
 * @module TypographyRamp
 * @description
 * The size classes (`.obc-component-size-regular` / `-medium` / `-large` /
 * `-xl`) scale text through the `--global-typography-*` tokens, one block per
 * class in `src/palettes/variables.css`. A size token a component reads but a
 * block does not carry inherits the regular value, and a token the export
 * leaves at 0 hides the text: both went unnoticed until a consumer found the
 * text stuck at the regular size (#1420). `rampGaps()` lists every font-size
 * and line-height token that components read, directly or through a mixin,
 * and has no value in a size class; `check-typography-ramp.ts` fails on them.
 */
import type {Declarations} from '../palette/export.js';
import {parseDeclarations} from '../palette/export.js';

export const SIZE_CLASSES = ['regular', 'medium', 'large', 'xl'] as const;
export type SizeClass = (typeof SIZE_CLASSES)[number];

const TOKEN_RE = /--global-typography-[\w-]+/g;
const SIZE_TOKEN_RE = /-(?:font-size|line-height)$/;
const MIXIN_DEFINITION_RE = /@define-mixin\s+([\w-]+)[^{]*\{([^}]*)\}/g;
const MIXIN_USE_RE = /@mixin\s+([\w-]+)/g;

function tokensIn(text: string): Set<string> {
  return new Set(text.match(TOKEN_RE) ?? []);
}

/** Mixin name → the typography tokens its body sets, mixins it applies included. */
export function mixinTokens(mixinSources: string[]): Map<string, Set<string>> {
  const direct = new Map<string, Set<string>>();
  const applies = new Map<string, string[]>();
  for (const source of mixinSources) {
    for (const m of source.matchAll(MIXIN_DEFINITION_RE)) {
      direct.set(m[1], tokensIn(m[2]));
      applies.set(
        m[1],
        Array.from(m[2].matchAll(MIXIN_USE_RE), (use) => use[1])
      );
    }
  }
  const resolved = new Map<string, Set<string>>();
  const resolve = (name: string, seen: Set<string>): Set<string> => {
    const cached = resolved.get(name);
    if (cached) return cached;
    const tokens = new Set(direct.get(name) ?? []);
    for (const inner of applies.get(name) ?? []) {
      if (seen.has(inner)) continue;
      for (const t of resolve(inner, new Set([...seen, inner]))) tokens.add(t);
    }
    resolved.set(name, tokens);
    return tokens;
  };
  for (const name of direct.keys()) resolve(name, new Set([name]));
  return resolved;
}

/**
 * The typography tokens a source file reads: every token name in it (inside
 * `var()` or as a bare string, as `charthelpers/constants.ts` keeps them) and
 * the tokens of every mixin it applies.
 */
export function readTokens(
  text: string,
  mixins: Map<string, Set<string>>
): Set<string> {
  const tokens = tokensIn(text);
  for (const m of text.matchAll(MIXIN_USE_RE)) {
    for (const t of mixins.get(m[1]) ?? []) tokens.add(t);
  }
  return tokens;
}

/** The declarations of each size-class block of `variables.css`. */
export function sizeClassBlocks(
  variablesCss: string
): Record<SizeClass, Declarations> {
  const blocks = parseDeclarations(variablesCss);
  const result = {} as Record<SizeClass, Declarations>;
  for (const sizeClass of SIZE_CLASSES) {
    const selector = `.obc-component-size-${sizeClass}`;
    const found = Array.from(blocks.entries()).find(([s]) =>
      s.split(',').some((part) => part.trim() === selector)
    );
    if (!found) throw new Error(`variables.css has no ${selector} block`);
    result[sizeClass] = found[1];
  }
  return result;
}

export interface RampGap {
  token: string;
  sizeClass: SizeClass;
  /** `undefined` when the block does not declare the token. */
  value: string | undefined;
  readers: string[];
}

export interface RampReport {
  gaps: RampGap[];
  /** Known-gap entries whose token has a value in every class again, or no reader. */
  stale: string[];
}

/**
 * Every font-size or line-height token that a file reads and that a size-class
 * block leaves undeclared or at 0, minus the ones `known` lists with a reason;
 * a known entry that no longer gaps is reported as stale so it gets deleted.
 */
export function rampGaps(
  readers: Map<string, Set<string>>,
  blocks: Record<SizeClass, Declarations>,
  known: Record<string, string> = {}
): RampReport {
  const gaps: RampGap[] = [];
  const gapped = new Set<string>();
  for (const [token, files] of readers) {
    if (!SIZE_TOKEN_RE.test(token)) continue;
    for (const sizeClass of SIZE_CLASSES) {
      const value = blocks[sizeClass].get(token);
      if (value !== undefined && !/^0(?:px)?$/.test(value)) continue;
      gapped.add(token);
      if (token in known) continue;
      gaps.push({token, sizeClass, value, readers: Array.from(files).sort()});
    }
  }
  const stale = Object.keys(known).filter((token) => !gapped.has(token));
  return {gaps, stale};
}
