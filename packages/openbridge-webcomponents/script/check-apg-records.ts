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
 * Roles are read from the templates: literal `role="…"` attributes, and the
 * quoted roles inside a bound `role=${…}` expression.
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

function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

export function widgetRoles(source: string): string[] {
  const roles = new Set<string>();
  const code = stripComments(source);
  for (const m of code.matchAll(
    /(?<!\[)\brole=(?:"([^"]*)"|'([^']*)'|\$\{([^}]*)\})/g
  )) {
    const literal = m[1] ?? m[2];
    const candidates =
      literal !== undefined
        ? literal.split(/\s+/)
        : Array.from(m[3].matchAll(/['"]([a-z]+)['"]/g), (q) => q[1]);
    for (const role of candidates) if (WIDGET_ROLES.has(role)) roles.add(role);
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

export function checkRecord(source: string, file: string): string[] {
  const tag = /@customElement\(\s*['"]([^'"]+)['"]\s*\)/.exec(source)?.[1];
  if (!tag) return [];
  const roles = widgetRoles(source);
  if (roles.length === 0) return [];
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
  const problems = files.flatMap((file) =>
    checkRecord(fs.readFileSync(path.join(root, file), 'utf8'), file)
  );
  for (const problem of problems) console.error(problem);
  if (problems.length > 0) {
    console.error(
      `\n${problems.length} missing pattern record(s) — see docs/agents/a11y.md § 1.`
    );
    process.exit(1);
  }
  console.log(
    'lint:apg: every component with a widget role records its pattern.'
  );
}

if (
  process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href
) {
  await main();
}
