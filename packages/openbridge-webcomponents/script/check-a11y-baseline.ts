import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

/**
 * Ratchet over the axe report.
 *
 * `__a11y__/baseline.json` freezes the violations the library ships with, by
 * story and rule. A run that adds a story or a rule to that set fails; one
 * that removes some prints what can be pruned. New components therefore start
 * from zero without the existing debt turning into hundreds of warnings, and
 * the debt can only shrink (#1208).
 *
 *   tsx script/check-a11y-baseline.ts            # compare a11y-report.json
 *   tsx script/check-a11y-baseline.ts --update   # rewrite the baseline
 */

export type A11yReport = {violations: {storyId: string; rule: string}[]};
export type A11yBaseline = Record<string, string[]>;

export function toBaseline(report: A11yReport): A11yBaseline {
  const grouped = new Map<string, Set<string>>();
  for (const {storyId, rule} of report.violations) {
    grouped.set(storyId, (grouped.get(storyId) ?? new Set()).add(rule));
  }
  const baseline: A11yBaseline = {};
  for (const storyId of [...grouped.keys()].sort()) {
    baseline[storyId] = [...grouped.get(storyId)!].sort();
  }
  return baseline;
}

export function diffAgainstBaseline(
  report: A11yReport,
  baseline: A11yBaseline
): {added: string[]; fixed: string[]} {
  const entries = (set: A11yBaseline) =>
    new Set(
      Object.entries(set).flatMap(([storyId, rules]) =>
        rules.map((rule) => `${storyId}: ${rule}`)
      )
    );
  const current = entries(toBaseline(report));
  const frozen = entries(baseline);
  return {
    added: [...current].filter((entry) => !frozen.has(entry)).sort(),
    fixed: [...frozen].filter((entry) => !current.has(entry)).sort(),
  };
}

function main() {
  const packageDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
  );
  const reportFile = path.join(packageDir, 'a11y-report.json');
  const baselineFile = path.join(packageDir, '__a11y__', 'baseline.json');
  if (!fs.existsSync(reportFile)) {
    console.error(
      `a11y-baseline: no ${path.relative(packageDir, reportFile)} — run \`npm run test-a11y\` first`
    );
    process.exit(2);
  }
  const report = JSON.parse(fs.readFileSync(reportFile, 'utf8')) as A11yReport;

  if (process.argv.includes('--update')) {
    fs.mkdirSync(path.dirname(baselineFile), {recursive: true});
    fs.writeFileSync(
      baselineFile,
      JSON.stringify(toBaseline(report), null, 2) + '\n'
    );
    console.log(
      `a11y-baseline: wrote ${Object.keys(toBaseline(report)).length} stories to ${path.relative(packageDir, baselineFile)}`
    );
    return;
  }

  const baseline = fs.existsSync(baselineFile)
    ? (JSON.parse(fs.readFileSync(baselineFile, 'utf8')) as A11yBaseline)
    : {};
  const {added, fixed} = diffAgainstBaseline(report, baseline);

  if (fixed.length) {
    console.log(
      `a11y-baseline: ${fixed.length} baseline entries no longer fail — prune with \`npm run test-a11y:update\`:`
    );
    fixed.forEach((entry) => console.log(`  ${entry}`));
  }
  if (added.length) {
    console.error(
      `a11y-baseline: ${added.length} violations not in the baseline (fix them, or add them with \`npm run test-a11y:update\` and say why in the PR):`
    );
    added.forEach((entry) => console.error(`  ${entry}`));
    process.exit(1);
  }
  console.log('a11y-baseline: no new violations');
}

if (
  process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href
) {
  main();
}
