/**
 * Fails when a component reads a font-size or line-height token that a size
 * class leaves undeclared or at 0, so its text keeps the regular size or
 * disappears there (see `typography/ramp.ts`).
 *
 * ```bash
 * npm run lint:typography
 * ```
 *
 * A token the design file cannot fill yet goes in `KNOWN_GAPS` with the issue
 * that tracks it; the entry fails as stale once the export carries the value.
 */
import * as fs from 'fs';
import * as path from 'path';
import {globby} from 'globby';
import {maskCssText} from './css/mask.js';
import {
  mixinTokens,
  rampGaps,
  readTokens,
  sizeClassBlocks,
} from './typography/ramp.js';

/** Token → why it has no value in every size class, with the issue that tracks it. */
const KNOWN_GAPS: Record<string, string> = {
  '--global-typography-general-xs-font-size':
    'the General styles have no medium, large or xl sizes in the design file; obc-gnss-skyplot reads them by design and keeps its regular size there (#1420)',
  '--global-typography-general-xs-line-height':
    'the General styles have no medium, large or xl sizes in the design file; obc-gnss-skyplot reads them by design and keeps its regular size there (#1420)',
  '--global-typography-ui-title-font-size':
    'UI/Title has no XL value in the design file (#1422)',
  '--global-typography-ui-title-line-height':
    'UI/Title has no XL value in the design file (#1422)',
};

async function run(): Promise<void> {
  const root = process.cwd();
  const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf8');
  const mixinFiles = await globby('src/mixins/*.css', {cwd: root});
  const mixins = mixinTokens(mixinFiles.map((f) => maskCssText(read(f))));
  const files = await globby(['src/**/*.css', 'src/**/*.ts'], {
    cwd: root,
    ignore: [
      'src/palettes/**',
      'src/mixins/**',
      'src/icons/**',
      'src/generated/**',
      'src/**/*.stories.ts',
      'src/**/*.spec.ts',
    ],
  });
  const readers = new Map<string, Set<string>>();
  for (const file of files.sort()) {
    const text = file.endsWith('.css') ? maskCssText(read(file)) : read(file);
    for (const token of readTokens(text, mixins)) {
      readers.set(token, (readers.get(token) ?? new Set()).add(file));
    }
  }
  const blocks = sizeClassBlocks(read('src/palettes/variables.css'));
  const {gaps, stale} = rampGaps(readers, blocks, KNOWN_GAPS);

  console.log(
    `typography ramp: ${readers.size} typography tokens read by ${files.length} files, ${Object.keys(KNOWN_GAPS).length} known gaps`
  );
  for (const gap of gaps) {
    const where = gap.readers.slice(0, 3).join(', ');
    const more = gap.readers.length > 3 ? ` +${gap.readers.length - 3}` : '';
    console.error(
      `  - ${gap.token} is ${gap.value === undefined ? 'not declared' : gap.value} in .obc-component-size-${gap.sizeClass}, read by ${where}${more}`
    );
  }
  for (const token of stale) {
    console.error(
      `  - KNOWN_GAPS lists ${token}, which has a value in every size class or no reader; delete the entry`
    );
  }
  if (gaps.length || stale.length) {
    console.error(
      '\n[lint:typography] text on these tokens keeps its regular size or disappears in that class. Keep it on a style whose variables carry every size class (IMPLEMENTATION_GUIDELINES.md § Instrument and automation fonts), or list the token in KNOWN_GAPS with the issue that tracks the design file.'
    );
    process.exit(1);
  }
  console.log(
    '✅ every size token components read has a value in every size class.'
  );
}

run();
