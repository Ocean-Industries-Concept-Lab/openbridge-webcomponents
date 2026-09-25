/**
 * @module PrBodyCheck
 * @description
 * Fails a pull request whose body skips what the review needs from it.
 *
 * A snapshot baseline, a demo screenshot or an axe baseline entry turns a
 * failing check green when the same PR regenerates it, so CI cannot tell an
 * intended change from a regression; the reviewer can, but only if the body
 * says which moved and why. This check makes the body carry it:
 *
 * - every heading of `.github/pull_request_template.md`;
 * - every box under Docs ticked;
 * - every added, changed or removed visual baseline, by `component/story`
 *   (`vue-demo/<route>` for the demo);
 * - every story an entry was added for in `__a11y__/baseline.json`;
 * - every stories file that gains a `skip-test`, `skip-a11y` or `!snapshot`
 *   tag;
 * - and no hand edit to `CHANGELOG.md`, which the release writes.
 *
 * It needs no dependencies, so the workflow runs it with plain Node:
 *
 * ```bash
 * node packages/openbridge-webcomponents/script/check-pr-body.ts \
 *   --body-file body.md --base origin/develop
 * ```
 *
 * In CI it reads the body and the base branch from the pull_request event,
 * and skips bots.
 */
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/** Every `## ` heading of the PR template, without its parenthetical. */
export function templateHeadings(template: string): string[] {
  return Array.from(template.matchAll(/^##\s+(.+?)\s*$/gm), (m) =>
    normalizeHeading(m[1])
  );
}

function normalizeHeading(heading: string): string {
  return heading
    .replace(/\(.*?\)/g, '')
    .replace(/[:.]+$/, '')
    .trim()
    .toLowerCase();
}

/** Template headings the body does not have. */
export function missingHeadings(body: string, headings: string[]): string[] {
  const present = new Set(templateHeadings(body));
  return headings.filter((heading) => !present.has(heading));
}

/** The unticked boxes of the body's Docs section. */
export function untickedDocsBoxes(body: string): string[] {
  const section = /^##\s+Docs\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/m.exec(body);
  if (!section) return [];
  return Array.from(section[1].matchAll(/^\s*[-*]\s+\[ \]\s*(.*)$/gm), (m) =>
    m[1].trim()
  );
}

/**
 * The name a body uses for a visual baseline: `component/story` for a
 * Storybook baseline, `vue-demo/<route>` for a demo screenshot, or null for
 * any other file.
 */
export function baselineId(file: string): string | null {
  const demo =
    /^packages\/vue-demo\/e2e\/visual\/__screenshots__\/linux\/(.+)\.png$/.exec(
      file
    );
  if (demo) return `vue-demo/${demo[1]}`;
  const storybook =
    /^packages\/[\w-]+\/__vis__\/linux\/__baselines__\/(?:.*\/)?([\w.-]+)\.stories\.tsx?\/(.+?)(?:-auto)?\.png$/.exec(
      file
    );
  return storybook ? `${storybook[1]}/${storybook[2]}` : null;
}

/** Story ids that gained a rule in the axe baseline. */
export function addedA11yStories(
  base: Record<string, string[]>,
  head: Record<string, string[]>
): string[] {
  return Object.entries(head)
    .filter(([story, rules]) => rules.some((r) => !base[story]?.includes(r)))
    .map(([story]) => story);
}

/** Stories files whose added lines carry an opt-out tag, from a unified diff. */
export function filesAddingOptOuts(diff: string): string[] {
  const files = new Set<string>();
  let file = '';
  for (const line of diff.split('\n')) {
    const header = /^\+\+\+ b\/(.+)$/.exec(line);
    if (header) {
      file = header[1];
      continue;
    }
    if (
      file.endsWith('.stories.ts') &&
      line.startsWith('+') &&
      /['"](skip-test|skip-a11y|!snapshot)['"]/.test(line)
    ) {
      files.add(path.basename(file));
    }
  }
  return [...files];
}

/** Names the body does not mention. */
export function unmentioned(body: string, names: string[]): string[] {
  return names.filter((name) => !body.includes(name));
}

export interface PrFacts {
  body: string;
  template: string;
  changedFiles: string[];
  a11yBase: Record<string, string[]>;
  a11yHead: Record<string, string[]>;
  storiesDiff: string;
}

export function checkPrBody(facts: PrFacts): string[] {
  const problems: string[] = [];
  const headings = missingHeadings(
    facts.body,
    templateHeadings(facts.template)
  );
  if (headings.length) {
    problems.push(
      `Missing template sections: ${headings.join(', ')}. The body follows .github/pull_request_template.md; write "None" under a section that has nothing.`
    );
  }
  const boxes = untickedDocsBoxes(facts.body);
  if (boxes.length) {
    problems.push(
      `Unticked Docs boxes: ${boxes.join(' | ')}. Tick each one, with the reason when the answer is "not needed".`
    );
  }
  const baselines = unmentioned(
    facts.body,
    facts.changedFiles.map(baselineId).filter((id): id is string => !!id)
  );
  if (baselines.length) {
    problems.push(
      `Baselines this PR adds, moves or removes, not named in the body: ${baselines.join(', ')}. Name each one in Verification with why it moved.`
    );
  }
  const a11y = unmentioned(
    facts.body,
    addedA11yStories(facts.a11yBase, facts.a11yHead)
  );
  if (a11y.length) {
    problems.push(
      `Stories added to __a11y__/baseline.json, not named in the body: ${a11y.join(', ')}. Name each one with the reason its violation stays.`
    );
  }
  const optOuts = unmentioned(
    facts.body,
    filesAddingOptOuts(facts.storiesDiff)
  );
  if (optOuts.length) {
    problems.push(
      `Stories files that gain a skip-test, skip-a11y or !snapshot tag, not named in the body: ${optOuts.join(', ')}. Name each one with the reason.`
    );
  }
  if (facts.changedFiles.some((f) => /(^|\/)CHANGELOG\.md$/.test(f))) {
    problems.push(
      'CHANGELOG.md is written by the release (docs/agents/generated-code.md); drop the edit.'
    );
  }
  return problems;
}

function git(root: string, ...args: string[]): string {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
}

function readJson(text: string): Record<string, string[]> {
  return text.trim() ? JSON.parse(text) : {};
}

function main() {
  const root = git(process.cwd(), 'rev-parse', '--show-toplevel').trim();
  const arg = (name: string) => {
    const at = process.argv.indexOf(name);
    return at > 0 ? process.argv[at + 1] : undefined;
  };
  let body = '';
  let base = arg('--base');
  const bodyFile = arg('--body-file');
  if (bodyFile) {
    body = fs.readFileSync(bodyFile, 'utf8');
  } else if (process.env.GITHUB_EVENT_PATH) {
    const event = JSON.parse(
      fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
    );
    if (event.pull_request?.user?.type === 'Bot') {
      console.log('check-pr-body: a bot opened this PR; skipped.');
      return;
    }
    body = event.pull_request?.body ?? '';
    base ??= `origin/${event.pull_request?.base?.ref}`;
  } else {
    console.error(
      'check-pr-body: pass --body-file, or run in a pull_request workflow.'
    );
    process.exit(2);
  }
  base ??= 'origin/develop';
  const range = `${base}...HEAD`;
  const a11yPath = 'packages/openbridge-webcomponents/__a11y__/baseline.json';
  const show = (ref: string) => {
    try {
      return git(root, 'show', `${ref}:${a11yPath}`);
    } catch {
      return '';
    }
  };
  const problems = checkPrBody({
    body,
    template: fs.readFileSync(
      path.join(root, '.github/pull_request_template.md'),
      'utf8'
    ),
    changedFiles: git(root, 'diff', '--name-only', range)
      .split('\n')
      .filter(Boolean),
    a11yBase: readJson(show(git(root, 'merge-base', base, 'HEAD').trim())),
    a11yHead: readJson(show('HEAD')),
    storiesDiff: git(root, 'diff', '--unified=0', range, '--', '*.stories.ts'),
  });
  for (const problem of problems) console.error(`- ${problem}`);
  if (problems.length) {
    console.error(
      `\n${problems.length} problem(s) with the PR body; edit it and this check runs again (docs/agents/development-cycle.md § 10).`
    );
    process.exit(1);
  }
  console.log(
    'check-pr-body: the body carries the template and names every baseline it moves.'
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(new URL(import.meta.url).pathname)
) {
  main();
}
