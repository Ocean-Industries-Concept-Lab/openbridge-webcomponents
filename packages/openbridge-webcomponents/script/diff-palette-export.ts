/**
 * Compares two versions of `src/palettes/variables.css` by block, property and
 * value, so a refresh diff reads as renames, removals and value changes instead
 * of reformatted text.
 *
 * ```bash
 * git show develop:packages/openbridge-webcomponents/src/palettes/variables.css > /tmp/variables.old.css
 * npm run palette:diff -- /tmp/variables.old.css src/palettes/variables.css
 * ```
 */
import * as fs from 'fs';
import {diffPaletteExports} from './palette/export.js';

const [before, after] = process.argv.slice(2);
if (!before || !after) {
  console.error('usage: palette:diff <before.css> <after.css>');
  process.exit(2);
}

const diff = diffPaletteExports(
  fs.readFileSync(before, 'utf8'),
  fs.readFileSync(after, 'utf8')
);
const renamedFrom = new Set(diff.renamed.map((r) => `${r.block}|${r.from}`));
const renamedTo = new Set(diff.renamed.map((r) => `${r.block}|${r.to}`));

for (const r of diff.renamed)
  console.log(`= [${r.block}] ${r.from} -> ${r.to}`);
for (const c of diff.removed) {
  if (!renamedFrom.has(`${c.block}|${c.name}`))
    console.log(`- [${c.block}] ${c.name}: ${c.before}`);
}
for (const c of diff.added) {
  if (!renamedTo.has(`${c.block}|${c.name}`))
    console.log(`+ [${c.block}] ${c.name}: ${c.after}`);
}
for (const c of diff.changed)
  console.log(`~ [${c.block}] ${c.name}: ${c.before} -> ${c.after}`);

const perBlock = new Map<string, number>();
for (const c of diff.changed)
  perBlock.set(c.block, (perBlock.get(c.block) ?? 0) + 1);
console.log('');
console.log(
  `renamed ${diff.renamed.length}, removed ${diff.removed.length - diff.renamed.length}, added ${diff.added.length - diff.renamed.length}, changed ${diff.changed.length}`
);
for (const [block, n] of perBlock) console.log(`  changed in ${block}: ${n}`);
