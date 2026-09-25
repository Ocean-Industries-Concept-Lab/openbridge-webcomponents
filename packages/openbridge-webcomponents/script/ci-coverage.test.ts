/**
 * Every check a package defines runs in CI, or is listed in `NOT_IN_CI` with
 * the reason it does not; and `npm run check` at the repository root runs
 * what CI's static jobs run, so the local gate and CI cannot drift apart.
 *
 * `build.yml` names each step instead of running `npm run lint`, so a check
 * added to a package runs nowhere until someone also adds it to a workflow:
 * `lint:palette` and `lint:icons` passed every local `npm run lint` and never
 * ran in CI. A check covers the scripts its command calls, so the members of
 * a chain and the `type-check` inside the vue demo's `build` count.
 */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {describe, expect, it} from 'vitest';

const repo = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../..'
);

/** Script names that check something: lints, type checks, tests and builds. */
const CHECK =
  /^(lint(:(?!fix)[\w-]+)?|typecheck(:[\w-]+)?|type-check(:[\w-]+)?|format:check|fix-imports:check|test([:-][\w:-]+)?|build([:-][\w:-]+)?)$/;

/** `package:script` → why CI does not run it. */
const NOT_IN_CI: Record<string, string> = {
  'openbridge-webcomponents:lint':
    'CI runs each member as its own step; the chain test below keeps the two in step',
  'openbridge-webcomponents:test-storybook:watch': 'watch mode',
  'openbridge-webcomponents:test-storybook:docker':
    'the local Docker route for macOS; CI runs test-storybook directly',
  'openbridge-webcomponents:test-a11y:update': 'rewrites the baseline',
  'openbridge-webcomponents:build:ts:watch': 'watch mode',
  'openbridge-webcomponents:build':
    'prepack runs it when the release publishes; build:full, which CI runs, starts with the same two steps',
  'root:build:docker-for-storybook-testing': 'builds the local Docker image',
  'vue-demo:lint': 'eslint --fix; lint:check is the check',
  'vue-demo:test:visual': 'the visual project of test:e2e, which CI runs',
  'vue-demo:test:visual:update': 'rewrites the baselines',
  'connector-diagram:test:unit': 'watch mode of test',
  'connector-diagram:test-storybook:watch': 'watch mode',
  'connector-diagram:build':
    'the package is not published; typecheck runs the same compiler',
  'connector-diagram:build-storybook':
    'test-storybook renders every story; the static build is not published',
};

/** The jobs `npm run check` mirrors: the static checks and the specs, not the builds or the snapshot suites. */
const LOCAL_GATE_JOBS = [
  {file: 'build.yml', job: 'lint'},
  {file: 'build.yml', job: 'test-browser'},
];

type Scripts = Record<string, string>;

/**
 * The framework wrappers, which `npm run wrappers` generates into gitignored
 * folders (the same `openbridge-webcomponents-*` glob its `wrappers:clean`
 * wipes): they exist only in a checkout that has built them, never in CI's.
 */
const GENERATED_PACKAGE = /^openbridge-webcomponents-/;

/** Every workspace package with its scripts, keyed by directory name; `root` is the repository. */
function packages(): Map<string, Scripts> {
  const out = new Map<string, Scripts>();
  const root = JSON.parse(
    fs.readFileSync(path.join(repo, 'package.json'), 'utf8')
  );
  out.set('root', root.scripts ?? {});
  for (const dir of fs.readdirSync(path.join(repo, 'packages'))) {
    if (GENERATED_PACKAGE.test(dir)) continue;
    const file = path.join(repo, 'packages', dir, 'package.json');
    if (!fs.existsSync(file)) continue;
    out.set(dir, JSON.parse(fs.readFileSync(file, 'utf8')).scripts ?? {});
  }
  return out;
}

interface CiCommand {
  file: string;
  job: string;
  pkg: string;
  command: string;
}

/** The `run:` commands of every workflow, with the job and the package each runs in. */
function ciCommands(): CiCommand[] {
  const runs: CiCommand[] = [];
  const dir = path.join(repo, '.github', 'workflows');
  for (const file of fs.readdirSync(dir)) {
    const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
    let inJobs = false;
    let job = '';
    let step: {dir: string; commands: string[]} | null = null;
    const flush = () => {
      for (const command of step?.commands ?? []) {
        const cd = /cd (?:\.\/)?packages\/([\w-]+)/.exec(command)?.[1];
        runs.push({file, job, pkg: cd ?? (step!.dir || 'root'), command});
      }
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\S/.test(line)) inJobs = /^jobs:\s*$/.test(line);
      const jobName = inJobs && /^ {2}([\w-]+):\s*$/.exec(line)?.[1];
      if (jobName) {
        flush();
        step = null;
        job = jobName;
      }
      if (/^\s*- (name|uses|run):/.test(line)) {
        flush();
        step = {dir: '', commands: []};
      }
      if (!step) continue;
      const wd = /^\s*working-directory:\s*(?:\.\/)?packages\/([\w-]+)/.exec(
        line
      );
      if (wd) step.dir = wd[1];
      const run = /^\s*-?\s*run:\s*(.*)$/.exec(line);
      if (!run) continue;
      if (run[1].trim() === '|' || run[1].trim() === '>') {
        const indent = /^\s*/.exec(lines[i + 1] ?? '')![0].length;
        const block: string[] = [];
        while (
          i + 1 < lines.length &&
          (lines[i + 1].trim() === '' ||
            /^\s*/.exec(lines[i + 1])![0].length >= indent)
        ) {
          block.push(lines[++i].trim());
        }
        step.commands.push(block.join('\n'));
      } else {
        step.commands.push(run[1]);
      }
    }
    flush();
  }
  return runs;
}

/**
 * The scripts a command runs, as `package:script`: `npm run <name>`, in each
 * package a `-w packages/<dir>` names or in every package that has it with
 * `--workspaces`, and the arguments of npm-run-all's `run-p` and `run-s`. A
 * word that only matches a script name is no call.
 */
function calls(
  pkg: string,
  command: string,
  all: Map<string, Scripts>
): string[] {
  const out: string[] = [];
  for (const part of command.split(/&&|\|\||;|\n/)) {
    const npm = /\bnpm run ([\w:.-]+)(.*)/.exec(part);
    if (npm) {
      const workspaces = Array.from(
        npm[2].matchAll(/(?:-w|--workspace)[=\s]+(?:\.\/)?packages\/([\w-]+)/g),
        (m) => m[1]
      );
      if (/(?:^|\s)(?:-ws|--workspaces)(?:\s|$)/.test(npm[2])) {
        for (const [name, scripts] of all) {
          if (name !== 'root' && npm[1] in scripts) {
            out.push(`${name}:${npm[1]}`);
          }
        }
      } else if (workspaces.length > 0) {
        for (const name of workspaces) out.push(`${name}:${npm[1]}`);
      } else {
        out.push(`${pkg}:${npm[1]}`);
      }
      continue;
    }
    const runAll = /\brun-[ps]\s+(.*)/.exec(part);
    if (!runAll) continue;
    const args = runAll[1].split(/\s--(?:\s|$)/)[0];
    for (const m of args.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)) {
      const name = (m[1] ?? m[2] ?? m[3]).trim().split(/\s+/)[0];
      if (name && !name.startsWith('-')) out.push(`${pkg}:${name}`);
    }
  }
  return out;
}

/** `package:script` for every script the seeds run, directly or from another script. */
function reachable(
  all: Map<string, Scripts>,
  seeds: {pkg: string; command: string}[]
): Set<string> {
  const covered = new Set<string>();
  const visit = (key: string) => {
    const [pkg, ...rest] = key.split(':');
    const script = rest.join(':');
    const scripts = all.get(pkg);
    if (covered.has(key) || !scripts?.[script]) return;
    covered.add(key);
    // npm runs pre<name> and post<name> with <name>.
    for (const hook of [`pre${script}`, `post${script}`]) {
      if (hook in scripts) visit(`${pkg}:${hook}`);
    }
    for (const call of calls(pkg, scripts[script], all)) visit(call);
  };
  for (const {pkg, command} of seeds) {
    for (const call of calls(pkg, command, all)) visit(call);
  }
  return covered;
}

const isCheck = (key: string) => CHECK.test(key.split(':').slice(1).join(':'));

describe('script calls', () => {
  const all = new Map<string, Scripts>([
    ['root', {}],
    ['openbridge-webcomponents', {check: 'npm run lint'}],
    ['vue-demo', {check: 'npm run lint:check'}],
  ]);

  it('reads npm run, the package -w names, and the arguments of run-p', () => {
    expect(
      calls(
        'root',
        'npm run build:full -w packages/openbridge-webcomponents && npm install && npm run build',
        all
      )
    ).toEqual(['openbridge-webcomponents:build:full', 'root:build']);
    expect(
      calls('vue-demo', 'run-p type-check "build-only {@}" --', all)
    ).toEqual(['vue-demo:type-check', 'vue-demo:build-only']);
  });

  it('reads every package a repeated -w names', () => {
    expect(
      calls(
        'root',
        'npm run check -w packages/openbridge-webcomponents -w packages/vue-demo',
        all
      )
    ).toEqual(['openbridge-webcomponents:check', 'vue-demo:check']);
  });

  it('reads --workspaces as a call in every package that has the script', () => {
    expect(
      calls('root', 'npm run check --workspaces --if-present', all)
    ).toEqual(['openbridge-webcomponents:check', 'vue-demo:check']);
  });

  it('does not count a word that only matches a script name', () => {
    expect(calls('openbridge-webcomponents', 'vite build', all)).toEqual([]);
  });

  it('counts a type check with a suffix as a check', () => {
    expect(CHECK.test('typecheck:tooling')).toBe(true);
    expect(CHECK.test('type-check:e2e')).toBe(true);
  });
});

describe('CI coverage', () => {
  const all = packages();
  const ci = ciCommands();
  const covered = reachable(all, ci);

  it('leaves out the generated wrapper packages, which only a local build writes', () => {
    const generated = [...all.keys()].filter((name) =>
      GENERATED_PACKAGE.test(name)
    );
    expect(generated).toEqual([]);
    expect(all.get('openbridge-webcomponents')!['wrappers:clean']).toContain(
      '../openbridge-webcomponents-*'
    );
  });

  it('reads the job each workflow step belongs to', () => {
    const jobs = new Set(ci.map((c) => `${c.file}:${c.job}`));
    expect(jobs).toContain('build.yml:lint');
    expect(jobs).toContain('build.yml:test-browser');
    expect(jobs).toContain('visual-testing.yml:vue-demo');
  });

  it('runs every check script, or says why not', () => {
    const missing: string[] = [];
    for (const [pkg, scripts] of all) {
      for (const script of Object.keys(scripts)) {
        const key = `${pkg}:${script}`;
        if (CHECK.test(script) && !covered.has(key) && !(key in NOT_IN_CI)) {
          missing.push(key);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it('keeps the list of exceptions current', () => {
    const stale = Object.keys(NOT_IN_CI).filter((key) => {
      const [pkg, ...rest] = key.split(':');
      return !(rest.join(':') in (all.get(pkg) ?? {})) || covered.has(key);
    });
    expect(stale).toEqual([]);
  });

  it('puts every lint of the component package in its lint chain', () => {
    const scripts = all.get('openbridge-webcomponents')!;
    const chain = new Set(
      Array.from(scripts.lint.matchAll(/npm run (lint:[\w-]+)/g), (m) => m[1])
    );
    const lints = Object.keys(scripts).filter(
      (s) => /^lint:/.test(s) && !/^lint:fix:/.test(s)
    );
    expect(lints.filter((s) => !chain.has(s))).toEqual([]);
  });
});

describe('the local gate', () => {
  const all = packages();
  const ci = ciCommands();
  const gate = reachable(all, [{pkg: 'root', command: 'npm run check'}]);
  const jobs = reachable(
    all,
    ci.filter((c) =>
      LOCAL_GATE_JOBS.some((j) => j.file === c.file && j.job === c.job)
    )
  );

  it('runs every check of the static and spec jobs of build.yml', () => {
    const missing = [...jobs].filter((key) => isCheck(key) && !gate.has(key));
    expect(missing).toEqual([]);
  });

  it('runs no check CI does not', () => {
    const covered = reachable(all, ci);
    const extra = [...gate].filter(
      (key) => isCheck(key) && !covered.has(key) && !(key in NOT_IN_CI)
    );
    expect(extra).toEqual([]);
  });
});
