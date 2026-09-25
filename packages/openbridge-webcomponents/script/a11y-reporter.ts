import fs from 'node:fs';
import path from 'node:path';
import type {Reporter, TestCase} from 'vitest/node';

type AxeNode = {target: string[]; failureSummary?: string; html?: string};
type AxeViolation = {
  id: string;
  impact?: string;
  help: string;
  nodes: AxeNode[];
};
type A11yReport = {
  type: string;
  result?: {violations?: AxeViolation[]; incomplete?: AxeViolation[]};
};

type Row = {
  storyId: string;
  component: string;
  story: string;
  rule: string;
  impact: string;
  help: string;
  nodes: number;
  target: string;
  why: string;
};

/**
 * Writes the axe results the a11y addon records per story.
 *
 * In `todo` mode the addon reports without asserting, so a plain CLI run
 * prints nothing at all; the results only exist on the test's meta. This
 * turns them into `a11y-report.json` plus a per-rule summary, which is what
 * makes report-then-triage possible before the gate moves to `error` (#1208).
 */
class A11yReporter implements Reporter {
  private rows: Row[] = [];
  private stories = 0;

  onTestCaseResult(testCase: TestCase) {
    const meta = testCase.meta() as {
      storyId?: string;
      reports?: A11yReport[];
    };
    if (!meta?.reports) return;
    this.stories++;
    for (const report of meta.reports) {
      if (report.type !== 'a11y') continue;
      for (const violation of report.result?.violations ?? []) {
        this.rows.push({
          storyId: meta.storyId ?? testCase.fullName,
          component: testCase.module.moduleId.split('/').slice(-1)[0],
          story: testCase.name,
          rule: violation.id,
          impact: violation.impact ?? 'unknown',
          help: violation.help,
          nodes: violation.nodes.length,
          target: violation.nodes[0]?.target?.join(' ') ?? '',
          why: (violation.nodes[0]?.failureSummary ?? '')
            .replace(/\s+/g, ' ')
            .slice(0, 200),
        });
      }
    }
  }

  onTestRunEnd() {
    const outFile = path.join(process.cwd(), 'a11y-report.json');
    fs.writeFileSync(
      outFile,
      JSON.stringify({stories: this.stories, violations: this.rows}, null, 2)
    );

    const byRule = new Map<string, {stories: Set<string>; nodes: number}>();
    for (const row of this.rows) {
      const entry = byRule.get(row.rule) ?? {stories: new Set(), nodes: 0};
      entry.stories.add(row.storyId);
      entry.nodes += row.nodes;
      byRule.set(row.rule, entry);
    }
    const affected = new Set(this.rows.map((row) => row.storyId));

    const lines = [
      '',
      `axe: ${affected.size} of ${this.stories} stories with violations`,
      ...[...byRule.entries()]
        .sort((a, b) => b[1].stories.size - a[1].stories.size)
        .map(
          ([rule, entry]) =>
            `  ${rule.padEnd(28)} ${String(entry.stories.size).padStart(
              4
            )} stories  ${String(entry.nodes).padStart(5)} nodes`
        ),
      `  report: ${path.relative(process.cwd(), outFile)}`,
      '',
    ];
    process.stdout.write(lines.join('\n'));
  }
}

export default A11yReporter;
