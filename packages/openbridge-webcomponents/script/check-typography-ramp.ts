/**
 * Fails when a component reads a font-size or line-height token that a size
 * class leaves undeclared, at 0, or smaller than the class before it, so its
 * text keeps the regular size, disappears or shrinks there (see
 * `typography/ramp.ts`).
 *
 * ```bash
 * npm run lint:typography
 * ```
 *
 * A token the design file cannot fill yet goes in `KNOWN_GAPS` with the size
 * classes it gaps in and the issue that tracks it; the entry fails as stale
 * once the export carries the value.
 */
import * as fs from 'fs';
import * as path from 'path';
import {globby} from 'globby';
import {maskCssText} from './css/mask.js';
import {stripComments} from './source-links.js';
import {
  type KnownGap,
  type RampGap,
  mixinTokens,
  rampGaps,
  readPalette,
  readTokens,
} from './typography/ramp.js';

const SKYPLOT = 'src/navigation-instruments/gnss-skyplot/gnss-skyplot.css';
const GENERAL_SIZES =
  'the General styles have no medium, large or xl sizes in the design file; obc-gnss-skyplot reads them by design and keeps its regular size there (#1420)';
const UI_TITLE_XL = 'UI/Title has no XL value in the design file (#1422)';
const AUTOMATION_XL =
  'the automation styles carry their regular sizes in the XL mode of the design file, smaller than in large (#1422)';

/** Token → the size classes it gaps in, the readers that may keep reading it if only some, and why. */
const KNOWN_GAPS: Record<string, KnownGap> = {
  '--global-typography-general-xs-font-size': {
    classes: ['medium', 'large', 'xl'],
    readers: [SKYPLOT],
    reason: GENERAL_SIZES,
  },
  '--global-typography-general-xs-line-height': {
    classes: ['medium', 'large', 'xl'],
    readers: [SKYPLOT],
    reason: GENERAL_SIZES,
  },
  '--global-typography-ui-title-font-size': {
    classes: ['xl'],
    reason: UI_TITLE_XL,
  },
  '--global-typography-ui-title-line-height': {
    classes: ['xl'],
    reason: UI_TITLE_XL,
  },
  '--automation-components-typography-unit-regular-font-size': {
    classes: ['xl'],
    reason: AUTOMATION_XL,
  },
  '--automation-components-typography-label-font-size': {
    classes: ['xl'],
    reason: AUTOMATION_XL,
  },
  '--automation-components-typography-label-line-height': {
    classes: ['xl'],
    reason: AUTOMATION_XL,
  },
  '--global-typography-instrument-value-medium-font-size': {
    classes: ['xl'],
    reason:
      'Instrument/Value medium is 36 px in the XL mode of the design file, smaller than 44 px in large (#1422)',
  },
};

function gapText(gap: RampGap): string {
  switch (gap.kind) {
    case 'missing':
      return 'not declared';
    case 'zero':
      return gap.value ?? '0';
    case 'shrinks':
      return `${gap.sizes?.[0]}, smaller than the ${gap.sizes?.[1]} of the class before,`;
  }
}

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
    const text = file.endsWith('.css')
      ? maskCssText(read(file))
      : stripComments(read(file));
    for (const token of readTokens(text, mixins)) {
      readers.set(token, (readers.get(token) ?? new Set()).add(file));
    }
  }
  const palette = readPalette(read('src/palettes/variables.css'));
  const {gaps, stale} = rampGaps(readers, palette, KNOWN_GAPS);
  const sizeTokens = Array.from(readers.keys()).filter(
    (t) =>
      /-(?:font-size|line-height)$/.test(t) && palette.classes.regular.has(t)
  );

  console.log(
    `typography ramp: ${sizeTokens.length} size tokens read by ${files.length} files, ${Object.keys(KNOWN_GAPS).length} known gaps`
  );
  for (const gap of gaps) {
    const where = gap.readers.slice(0, 3).join(', ');
    const more = gap.readers.length > 3 ? ` +${gap.readers.length - 3}` : '';
    console.error(
      `  - ${gap.token} is ${gapText(gap)} in .obc-component-size-${gap.sizeClass}, read by ${where}${more}`
    );
  }
  for (const entry of stale) {
    console.error(
      `  - KNOWN_GAPS lists ${entry.token}, but ${entry.detail}; narrow or delete the entry`
    );
  }
  if (gaps.length || stale.length) {
    console.error(
      '\n[lint:typography] text on these tokens keeps its regular size, disappears or shrinks in that class. Keep it on a style whose variables carry every size class (IMPLEMENTATION_GUIDELINES.md § Instrument and automation fonts), or list the token in KNOWN_GAPS with the issue that tracks the design file.'
    );
    process.exit(1);
  }
  console.log(
    '✅ every size token components read has a value in every size class and never shrinks.'
  );
}

run();
