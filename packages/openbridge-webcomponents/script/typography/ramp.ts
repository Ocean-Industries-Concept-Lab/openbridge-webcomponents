/**
 * @module TypographyRamp
 * @description
 * The size classes (`.obc-component-size-regular` / `-medium` / `-large` /
 * `-xl`) scale text through the font-size and line-height tokens each class
 * block of `src/palettes/variables.css` declares. A token a block does not
 * declare keeps the regular value there, a token the export leaves at 0 hides
 * the text, and a value smaller than the class before it shrinks the text as
 * the class grows. The first went unnoticed until a consumer found the text
 * stuck at the regular size (#1420). `rampGaps()` lists all three for the
 * tokens components read, directly or through a mixin;
 * `check-typography-ramp.ts` fails on them.
 */
import type {Declarations} from '../palette/export.js';
import {parseDeclarations, parseTopLevelBlocks} from '../palette/export.js';

export const SIZE_CLASSES = ['regular', 'medium', 'large', 'xl'] as const;
export type SizeClass = (typeof SIZE_CLASSES)[number];

const TOKEN_RE = /--[\w-]+/g;
const SIZE_TOKEN_RE = /-(?:font-size|line-height)$/;
const MIXIN_NAME_RE = /@define-mixin\s+([\w-]+)[^;{}]*$/;
const MIXIN_USE_RE = /@mixin\s+([\w-]+)/g;
const LENGTH_RE = /^([+-]?(?:\d+\.?\d*|\.\d+))([a-z%]*)$/i;
const VAR_RE = /^var\((--[\w-]+)\)$/;

function tokensIn(text: string): Set<string> {
  return new Set(text.match(TOKEN_RE) ?? []);
}

/**
 * Mixin name → the custom properties its body reads, nested rules and the
 * mixins it applies included.
 */
export function mixinTokens(mixinSources: string[]): Map<string, Set<string>> {
  const direct = new Map<string, Set<string>>();
  const applies = new Map<string, string[]>();
  for (const source of mixinSources) {
    for (const block of parseTopLevelBlocks(source)) {
      const name = block.selector.match(MIXIN_NAME_RE)?.[1];
      if (!name) continue;
      direct.set(name, tokensIn(block.body));
      applies.set(
        name,
        Array.from(block.body.matchAll(MIXIN_USE_RE), (use) => use[1])
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
 * The custom properties a source file reads: every name in it (inside `var()`
 * or as a bare string, as `charthelpers/constants.ts` keeps them) and those of
 * every mixin it applies. Mask comments first, or a name in one counts.
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

export interface Palette {
  /** The declarations of each size-class block. */
  classes: Record<SizeClass, Declarations>;
  /** Every declaration outside them, the first one winning: what a size token's `var()` points at. */
  primitives: Declarations;
}

export function readPalette(variablesCss: string): Palette {
  const blocks = parseDeclarations(variablesCss);
  const classes = {} as Record<SizeClass, Declarations>;
  const owners = new Set<Declarations>();
  for (const sizeClass of SIZE_CLASSES) {
    const selector = `.obc-component-size-${sizeClass}`;
    const found = Array.from(blocks.entries()).find(([s]) =>
      s.split(',').some((part) => part.trim() === selector)
    );
    if (!found) throw new Error(`variables.css has no ${selector} block`);
    classes[sizeClass] = found[1];
    owners.add(found[1]);
  }
  const primitives: Declarations = new Map();
  for (const declarations of blocks.values()) {
    if (owners.has(declarations)) continue;
    for (const [name, value] of declarations) {
      if (!primitives.has(name)) primitives.set(name, value);
    }
  }
  return {classes, primitives};
}

export interface Length {
  n: number;
  unit: string;
}

/** A value as a number and its unit, following `var()` through the class block and the primitives. */
export function resolveLength(
  value: string | undefined,
  block: Declarations,
  primitives: Declarations
): Length | undefined {
  for (let depth = 0; value !== undefined && depth < 8; depth++) {
    const ref = value.match(VAR_RE);
    if (!ref) break;
    value = block.get(ref[1]) ?? primitives.get(ref[1]);
  }
  const m = value?.match(LENGTH_RE);
  return m ? {n: Number(m[1]), unit: m[2].toLowerCase()} : undefined;
}

export type GapKind = 'missing' | 'zero' | 'shrinks';

export interface RampGap {
  token: string;
  sizeClass: SizeClass;
  kind: GapKind;
  /** The declared value, `undefined` when the block does not declare the token. */
  value: string | undefined;
  /** For `shrinks`: the resolved value here and in the class before. */
  sizes?: [string, string];
  readers: string[];
}

export interface KnownGap {
  /** The size classes the gap is accepted in. */
  classes: SizeClass[];
  /** When set, the only files the gap is accepted for; any other reader is reported. */
  readers?: string[];
  /** Why, with the issue that tracks it. */
  reason: string;
}

export interface StaleEntry {
  token: string;
  detail: string;
}

export interface RampReport {
  gaps: RampGap[];
  /** Known-gap entries that accept more than is still a gap, so they get narrowed or deleted. */
  stale: StaleEntry[];
}

const show = (length: Length) => `${length.n}${length.unit}`;

/**
 * Every font-size or line-height token of the size classes that a file reads
 * and that a class leaves undeclared, at 0, or smaller than the class before,
 * minus what `known` accepts; a known entry that accepts more than is still a
 * gap comes back as stale.
 */
export function rampGaps(
  readers: Map<string, Set<string>>,
  palette: Palette,
  known: Record<string, KnownGap> = {}
): RampReport {
  const gaps: RampGap[] = [];
  const stale: StaleEntry[] = [];
  for (const [token, files] of readers) {
    if (!SIZE_TOKEN_RE.test(token)) continue;
    if (!SIZE_CLASSES.some((c) => palette.classes[c].has(token))) continue;
    const entry = known[token];
    const sortedFiles = Array.from(files).sort();
    let previous: Length | undefined;
    for (const sizeClass of SIZE_CLASSES) {
      const block = palette.classes[sizeClass];
      const declared = block.get(token);
      const length = resolveLength(
        declared ?? palette.classes.regular.get(token),
        block,
        palette.primitives
      );
      let kind: GapKind | undefined;
      if (declared === undefined) kind = 'missing';
      else if (length?.n === 0) kind = 'zero';
      else if (
        length &&
        previous &&
        length.unit === previous.unit &&
        length.n < previous.n
      ) {
        kind = 'shrinks';
      }
      const accepted = entry?.classes.includes(sizeClass) ?? false;
      if (accepted && !kind) {
        stale.push({token, detail: `it has a value in ${sizeClass}`});
      }
      if (kind) {
        const allowed = accepted ? (entry?.readers ?? sortedFiles) : [];
        const extra = sortedFiles.filter((f) => !allowed.includes(f));
        if (extra.length) {
          gaps.push({
            token,
            sizeClass,
            kind,
            value: declared,
            sizes:
              kind === 'shrinks' && length && previous
                ? [show(length), show(previous)]
                : undefined,
            readers: extra,
          });
        }
      }
      if (length) previous = length;
    }
    for (const reader of entry?.readers ?? []) {
      if (!files.has(reader)) {
        stale.push({token, detail: `${reader} no longer reads it`});
      }
    }
  }
  for (const token of Object.keys(known)) {
    if (!readers.has(token)) stale.push({token, detail: 'nothing reads it'});
  }
  return {gaps, stale};
}
