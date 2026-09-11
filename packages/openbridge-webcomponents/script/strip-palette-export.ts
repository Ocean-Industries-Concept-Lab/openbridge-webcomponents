/**
 * Strips what the obc-figma-plugin `cssvariables` codegen emits and the package
 * does not ship from `src/palettes/variables.css` (see `palette/export.ts`).
 *
 * ```bash
 * npm run palette:strip     # rewrite the file after pasting a new export
 * npm run lint:palette      # exit 1 if the committed file still carries any of it
 * ```
 */
import * as fs from 'fs';
import * as path from 'path';
import {stripPaletteExport} from './palette/export.js';

const file = path.resolve('src/palettes/variables.css');
const check = process.argv.includes('--check');
const source = fs.readFileSync(file, 'utf8');
const {css, removed} = stripPaletteExport(source);

if (removed.length === 0) {
  console.log('[palette] nothing to strip from src/palettes/variables.css');
  process.exit(0);
}

for (const reason of removed) console.log(`[palette] ${reason}`);

if (check) {
  console.error(
    '[lint:palette] src/palettes/variables.css carries plugin output the package does not ship; run `npm run palette:strip`'
  );
  process.exit(1);
}

fs.writeFileSync(file, css);
console.log(
  `[palette] removed ${removed.length} block(s); run prettier and diff before committing`
);
