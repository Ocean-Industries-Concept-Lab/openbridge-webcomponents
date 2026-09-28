/**
 * @module ApgRecordAudit
 * @description
 * Fails when a component renders an ARIA widget role without a record of the
 * pattern it follows.
 *
 * An explicit widget role (`role="tablist"`, `role="radiogroup"`,
 * `role="dialog"`, …) means the component re-implements a widget the browser
 * would otherwise provide, and `docs/agents/a11y.md` § 1 asks for two things
 * in its class JSDoc: a link to the WAI-ARIA Authoring Practices pattern it
 * follows, and what it leaves out of that pattern. The second one is where a
 * gap is decided rather than forgotten — `obc-tab-row` shipped without saying
 * that its tabs cannot point at their panels, and the gap came back as an
 * issue (#1312). This audit makes both lines required:
 *
 * - a link under `https://www.w3.org/WAI/ARIA/apg/patterns/`;
 * - a line that starts with `Left out:` — `Left out: nothing.` when the
 *   component follows the whole pattern.
 *
 * A composite widget (a tab list, radio group, menu, menu bar, listbox, tree,
 * tree grid, grid or toolbar) also needs a `*-keyboard.spec.ts` in its
 * directory, or in the directory of the base class that renders the widget:
 * its keys are the part no scanner can check (a11y.md § 9).
 *
 * Roles are read from the templates: literal `role="…"` attributes, the
 * quoted roles inside a bound `role=${…}` expression, and, for a binding that
 * quotes none (`role=${this.itemRole}`), every widget role the file spells
 * out as a string, such as the members of an enum. A component is read with
 * its base classes and the helper modules that render for it
 * (`source-links.ts`), so a role a base class renders counts for every
 * element registered on it.
 *
 * Usage:
 * ```bash
 * npm run lint:apg
 * ```
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {globby} from 'globby';
import {linkedSources, stripComments, type Reader} from './source-links.js';

/** Roles whose behaviour an APG pattern describes. */
const WIDGET_ROLES = new Set([
  'alertdialog',
  'checkbox',
  'combobox',
  'dialog',
  'grid',
  'gridcell',
  'listbox',
  'menu',
  'menubar',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'radio',
  'radiogroup',
  'slider',
  'spinbutton',
  'switch',
  'tab',
  'tablist',
  'tabpanel',
  'toolbar',
  'tree',
  'treegrid',
  'treeitem',
]);

/** Widget roles that hold other widgets and move focus among them. */
export const COMPOSITE_ROLES = new Set([
  'grid',
  'listbox',
  'menu',
  'menubar',
  'radiogroup',
  'tablist',
  'toolbar',
  'tree',
  'treegrid',
]);

export function widgetRoles(source: string): string[] {
  const roles = new Set<string>();
  const code = stripComments(source);
  let unquotedBinding = false;
  for (const m of code.matchAll(
    /(?<!\[)\brole=(?:"([^"]*)"|'([^']*)'|\$\{([^}]*)\})/g
  )) {
    const literal = m[1] ?? m[2];
    const quoted =
      literal === undefined
        ? Array.from(m[3].matchAll(/['"]([a-z]+)['"]/g), (q) => q[1])
        : null;
    if (quoted !== null && quoted.length === 0) unquotedBinding = true;
    for (const role of quoted ?? literal!.split(/\s+/)) {
      if (WIDGET_ROLES.has(role)) roles.add(role);
    }
  }
  if (unquotedBinding) {
    // The value comes from elsewhere in the file: the members of a `…Role`
    // enum, or a string on a line that names a role.
    const enums = Array.from(
      code.matchAll(/\benum\s+\w*Roles?\s*\{([^}]*)\}/g),
      (m) => m[1]
    );
    const lines = code.split('\n').filter((line) => /\brole\b/i.test(line));
    for (const text of [...enums, ...lines]) {
      for (const m of text.matchAll(/(?<!role=)['"]([a-z]+)['"]/g)) {
        if (WIDGET_ROLES.has(m[1])) roles.add(m[1]);
      }
    }
  }
  return [...roles];
}

/** The JSDoc block directly above `@customElement(…)`: the only one the manifest and the wrappers read. */
export function classDoc(source: string): string {
  const at = source.indexOf('@customElement(');
  if (at < 0) return '';
  const before = source.slice(0, at);
  const start = before.lastIndexOf('/**');
  return start < 0 ? '' : before.slice(start);
}

export interface RecordContext {
  /** Other source files, for the base classes and helpers of the component. */
  read?: Reader;
  /** Whether a directory holds a `*-keyboard.spec.ts`. */
  hasKeyboardSpec?: (dir: string) => boolean;
}

export function checkRecord(
  source: string,
  file: string,
  context: RecordContext | boolean = {}
): string[] {
  const {read = () => null, hasKeyboardSpec = () => true} =
    typeof context === 'boolean' ? {hasKeyboardSpec: () => context} : context;
  const tag = /@customElement\(\s*['"]([^'"]+)['"]\s*\)/.exec(source)?.[1];
  if (!tag) return [];
  const linked = linkedSources(source, file, read);
  const roles = [
    ...new Set([source, ...linked.map((l) => l.source)].flatMap(widgetRoles)),
  ];
  if (roles.length === 0) return [];
  const specDirs = [
    file,
    ...linked.filter((l) => l.kind === 'base').map((l) => l.file),
  ].map((f) => path.dirname(f));
  const specBeside = specDirs.some(hasKeyboardSpec);
  const doc = classDoc(source);
  const renders = `${file}: <${tag}> renders ${roles
    .map((role) => `role="${role}"`)
    .join(', ')}`;
  const problems: string[] = [];
  if (!/https:\/\/www\.w3\.org\/WAI\/ARIA\/apg\/patterns\//.test(doc)) {
    problems.push(
      `${renders} but its class JSDoc links no APG pattern (https://www.w3.org/WAI/ARIA/apg/patterns/…)`
    );
  }
  if (!/^\s*\*\s*Left out:/m.test(doc)) {
    problems.push(
      `${renders} but its class JSDoc has no "Left out:" line (write "Left out: nothing." when it follows the whole pattern)`
    );
  }
  if (!specBeside && roles.some((role) => COMPOSITE_ROLES.has(role))) {
    problems.push(
      `${renders}, a composite widget, but ${specDirs.join(' or ')} has no *-keyboard.spec.ts pinning its keys (docs/agents/a11y.md § 9)`
    );
  }
  return problems;
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const files = await globby(['src/**/*.ts'], {
    cwd: root,
    ignore: [
      'src/**/*.stories.ts',
      'src/**/*.spec.ts',
      'src/**/*.test.ts',
      'src/icons/**',
      'src/generated/**',
    ],
  });
  const sources = new Map<string, string | null>();
  const read: Reader = (file) => {
    if (!sources.has(file)) {
      const abs = path.join(root, file);
      sources.set(
        file,
        fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null
      );
    }
    return sources.get(file)!;
  };
  const hasKeyboardSpec = (dir: string) =>
    fs
      .readdirSync(path.join(root, dir))
      .some((name) => name.endsWith('-keyboard.spec.ts'));
  const problems = files.flatMap((file) =>
    checkRecord(read(file)!, file, {read, hasKeyboardSpec})
  );
  for (const problem of problems) console.error(problem);
  if (problems.length > 0) {
    console.error(
      `\n${problems.length} problem(s) — see docs/agents/a11y.md § 1 and § 9.`
    );
    process.exit(1);
  }
  console.log(
    'lint:apg: every component with a widget role records its pattern, and every composite widget has a keyboard spec.'
  );
}

if (
  process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href
) {
  await main();
}
