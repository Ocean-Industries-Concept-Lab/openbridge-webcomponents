/**
 * Fails `npm run lint:icons` if any generated icon (`src/icons/*.ts`) still
 * contains a literal hex `fill="#…"` or `stroke="#…"` attribute. Every such
 * attribute indicates one of:
 *
 *   1. A converter regression in `script/convert-icons.ts` (the most recent
 *      example: `getSingleColorIcon` originally rewrote `fill` but not
 *      `stroke`, leaking raw hex strokes into 27 icons across `obi-alarm-*`,
 *      `obi-warning-*`, `obi-connector-*`, etc.).
 *   2. An unbound Figma variable on a fill/stroke. Designers should bind the
 *      color in Figma; if the variable id is new, regenerate
 *      `script/figmavariables.json` from the obc-figma-plugin and re-run
 *      `npm run download:icons`. See `script/.cache/unknown-variables.json`
 *      for the per-id diagnostic.
 *
 * The check is intentionally zero-tolerance — there is currently no
 * documented case where an icon legitimately needs a hard-coded hex, because
 * the themed (`iconCss`) variant always uses CSS variables and the
 * single-color (`icon`) variant always uses `currentColor`. If a future
 * legitimate exception arises, prefer adding an explicit allowlist here over
 * reintroducing a sliding budget.
 */
import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.resolve('src/icons');
const hexAttrRegex = /(?:fill|stroke)="#[0-9A-Fa-f]{6,8}"/g;

interface Leak {
  file: string;
  attr: string;
}

const leaks: Leak[] = [];

for (const file of fs.readdirSync(iconsDir).sort()) {
  if (!file.endsWith('.ts')) continue;
  const text = fs.readFileSync(path.join(iconsDir, file), 'utf8');
  const matches = text.match(hexAttrRegex);
  if (!matches) continue;
  for (const attr of matches) leaks.push({file, attr});
}

if (leaks.length === 0) {
  console.log(
    `[lint:icons] no literal hex fill/stroke attributes in ${iconsDir}`
  );
  process.exit(0);
}

console.error(
  `[lint:icons] found ${leaks.length} literal hex fill/stroke attribute(s) in src/icons/*.ts:`
);
for (const {file, attr} of leaks) {
  console.error(`  ${file}\t${attr}`);
}
console.error('');
console.error(
  '  Each leak is either (a) a converter regression in script/convert-icons.ts'
);
console.error(
  '  or (b) a Figma variable that is not bound on the source fill/stroke.'
);
console.error(
  '  See script/.cache/unknown-variables.json for unresolved variable ids,'
);
console.error(
  '  and the JSDoc on this script for the full diagnostic checklist.'
);
process.exit(1);
