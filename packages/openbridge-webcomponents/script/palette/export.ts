/**
 * @module PaletteExport
 * @description
 * Post-processing for the obc-figma-plugin `cssvariables` output that becomes
 * `src/palettes/variables.css`. The plugin emits three things the package does
 * not ship, and `stripPaletteExport()` removes them so the committed file is
 * reproducible from the export: the `@keyframes` blink and the `:root`
 * animation rule that #1116 replaced with `src/palettes/blinking.ts` (#1134),
 * and every `Component-size` mode outside the four documented size classes.
 * `diffPaletteExports()` compares two versions by block, property and value,
 * because the text diff of an export is dominated by reformatting.
 */

const SIZE_CLASSES = new Set(['regular', 'medium', 'large', 'xl']);
const SIZE_CLASS_PREFIX = '.obc-component-size-';

export interface CssBlock {
  selector: string;
  body: string;
  text: string;
}

/** Splits a flat stylesheet into its top-level rules; nested braces stay inside `body`. */
export function parseTopLevelBlocks(css: string): CssBlock[] {
  const blocks: CssBlock[] = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) break;
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    if (depth !== 0) throw new Error('unbalanced braces in stylesheet');
    blocks.push({
      selector: css.slice(i, open).trim(),
      body: css.slice(open + 1, j - 1),
      text: css.slice(i, j).trim(),
    });
    i = j;
  }
  return blocks;
}

/** Why a top-level block is not shipped, or `undefined` when it is. */
export function rejectionReason(block: CssBlock): string | undefined {
  if (block.selector.startsWith('@keyframes')) {
    return `${block.selector} — the blink is driven from src/palettes/blinking.ts`;
  }
  if (block.selector === ':root') {
    const declarations = block.body
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean);
    if (declarations.every((d) => d.startsWith('animation'))) {
      return ':root animation rule — animating inherited custom properties on the root recalculates every node';
    }
  }
  for (const selector of block.selector.split(',').map((s) => s.trim())) {
    if (!selector.startsWith(SIZE_CLASS_PREFIX)) continue;
    const mode = selector.slice(SIZE_CLASS_PREFIX.length);
    if (!/^[a-z]+$/.test(mode) || !SIZE_CLASSES.has(mode)) {
      return `size mode "${mode}" — not one of the documented size classes`;
    }
  }
  return undefined;
}

export interface StripResult {
  css: string;
  removed: string[];
}

export function stripPaletteExport(css: string): StripResult {
  const kept: string[] = [];
  const removed: string[] = [];
  for (const block of parseTopLevelBlocks(css)) {
    const reason = rejectionReason(block);
    if (reason) removed.push(reason);
    else kept.push(block.text);
  }
  return {css: kept.join('\n\n') + '\n', removed};
}

export type Declarations = Map<string, string>;

/** Block selector → property → value, whitespace collapsed so formatting does not register. */
export function parseDeclarations(css: string): Map<string, Declarations> {
  const result = new Map<string, Declarations>();
  for (const block of parseTopLevelBlocks(css)) {
    if (block.selector.startsWith('@')) continue;
    const selector = block.selector.replace(/\s+/g, ' ');
    const declarations = result.get(selector) ?? new Map<string, string>();
    for (const declaration of block.body.split(';')) {
      const colon = declaration.indexOf(':');
      if (colon < 0) continue;
      const name = declaration.slice(0, colon).trim();
      const value = declaration
        .slice(colon + 1)
        .replace(/\s+/g, ' ')
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        .trim();
      declarations.set(name, value);
    }
    result.set(selector, declarations);
  }
  return result;
}

export interface DeclarationChange {
  block: string;
  name: string;
  before?: string;
  after?: string;
}

export interface PaletteDiff {
  added: DeclarationChange[];
  removed: DeclarationChange[];
  changed: DeclarationChange[];
  /** A removed name whose value reappears under one new name in the same block, and under no other removed name. */
  renamed: Array<{block: string; from: string; to: string}>;
}

function groupByValue(changes: DeclarationChange[], key: 'before' | 'after') {
  const groups = new Map<string, DeclarationChange[]>();
  for (const change of changes) {
    const id = `${change.block}|${change[key]}`;
    groups.set(id, [...(groups.get(id) ?? []), change]);
  }
  return groups;
}

export function diffPaletteExports(before: string, after: string): PaletteDiff {
  const a = parseDeclarations(before);
  const b = parseDeclarations(after);
  const diff: PaletteDiff = {added: [], removed: [], changed: [], renamed: []};
  for (const block of new Set([...a.keys(), ...b.keys()])) {
    const da = a.get(block) ?? new Map();
    const db = b.get(block) ?? new Map();
    for (const name of new Set([...da.keys(), ...db.keys()])) {
      const x = da.get(name);
      const y = db.get(name);
      if (x === undefined) diff.added.push({block, name, after: y});
      else if (y === undefined) diff.removed.push({block, name, before: x});
      else if (x !== y) diff.changed.push({block, name, before: x, after: y});
    }
  }
  const addedByValue = groupByValue(diff.added, 'after');
  for (const [id, removed] of groupByValue(diff.removed, 'before')) {
    const added = addedByValue.get(id) ?? [];
    if (removed.length === 1 && added.length === 1) {
      diff.renamed.push({
        block: removed[0].block,
        from: removed[0].name,
        to: added[0].name,
      });
    }
  }
  return diff;
}
