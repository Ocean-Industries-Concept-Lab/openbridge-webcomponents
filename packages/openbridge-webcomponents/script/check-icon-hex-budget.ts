/**
 * Counts literal hex color fills/strokes (`fill="#…"`, `stroke="#…"`) emitted
 * into the generated icon components and fails if the count exceeds the
 * documented budget. Hex fallbacks happen when `convert-icons.ts` encounters
 * a Figma color that is not bound to a known variable in `figmavariables.json`,
 * which silently defeats the `var(--undefined)` grep gate documented in
 * `IMPLEMENTATION_GUIDELINES.md`. Tracking the count over time forces every
 * regression (new unbound color in Figma, missing variable mapping) to be
 * acknowledged in a PR instead of slipping through unnoticed.
 */
import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.resolve('src/icons');
const budgetPath = path.resolve('script/icon-hex-budget.json');

interface Budget {
  description: string;
  maxHexAttributes: number;
}

const budget: Budget = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));

const hexAttrRegex = /(?:fill|stroke)="#[0-9A-Fa-f]{6,8}"/g;

let total = 0;
const perFile: {file: string; count: number}[] = [];

for (const file of fs.readdirSync(iconsDir)) {
  if (!file.endsWith('.ts')) continue;
  const text = fs.readFileSync(path.join(iconsDir, file), 'utf8');
  const matches = text.match(hexAttrRegex);
  if (matches && matches.length > 0) {
    perFile.push({file, count: matches.length});
    total += matches.length;
  }
}

console.log(
  `[lint:icons] hex fill/stroke count: ${total} (budget ${budget.maxHexAttributes})`
);

if (total > budget.maxHexAttributes) {
  console.error(
    `[lint:icons] hex count ${total} exceeds budget ${budget.maxHexAttributes}.`
  );
  console.error(
    '            Either bind the new colors in Figma to a variable and add the'
  );
  console.error(
    '            mapping to script/figmavariables.json, or raise the budget in'
  );
  console.error('            script/icon-hex-budget.json with justification.');
  console.error('            Offending files (top 20):');
  perFile
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .forEach(({file, count}) =>
      console.error(`              ${count}\t${file}`)
    );
  process.exit(1);
}
