/**
 * Every check a package defines runs in CI, or is listed in `NOT_IN_CI` with
 * the reason it does not.
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
  /^(lint(:(?!fix)[\w-]+)?|typecheck(:[\w-]+)?|type-check|format:check|fix-imports:check|test([:-][\w:-]+)?|build([:-][\w:-]+)?)$/;

/** `package:script` → why CI does not run it. */
const NOT_IN_CI: Record<string, string> = {
  'openbridge-webcomponents:lint':
    'CI runs each member as its own step; the chain test below keeps the two in step',
  'openbridge-webcomponents:test-storybook:watch': 'watch mode',
  'openbridge-webcomponents:test-storybook:docker':
    'the local Docker route for macOS; CI runs test-storybook directly',
  'openbridge-webcomponents:test-a11y:update': 'rewrites the baseline',
  'openbridge-webcomponents:build:ts:watch': 'watch mode',
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

type Scripts = Record<string, string>;

/** Every workspace package with its scripts, keyed by directory name; `root` is the repository. */
function packages(): Map<string, Scripts> {
  const out = new Map<string, Scripts>();
  const root = JSON.parse(
    fs.readFileSync(path.join(repo, 'package.json'), 'utf8')
  );
  out.set('root', root.scripts ?? {});
  for (const dir of fs.readdirSync(path.join(repo, 'packages'))) {
    const file = path.join(repo, 'packages', dir, 'package.json');
    if (!fs.existsSync(file)) continue;
    out.set(dir, JSON.parse(fs.readFileSync(file, 'utf8')).scripts ?? {});
  }
  return out;
}

/** The `run:` commands of every workflow, with the package each runs in. */
function ciCommands(): {pkg: string; command: string}[] {
  const runs: {pkg: string; command: string}[] = [];
  const dir = path.join(repo, '.github', 'workflows');
  for (const file of fs.readdirSync(dir)) {
    const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
    let step: {dir: string; commands: string[]} | null = null;
    const flush = () => {
      for (const command of step?.commands ?? []) {
        const cd = /cd (?:\.\/)?packages\/([\w-]+)/.exec(command)?.[1];
        runs.push({pkg: cd ?? (step!.dir || 'root'), command});
      }
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
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

/** `package:script` for every script CI runs, directly or from another script. */
function coveredByCi(all: Map<string, Scripts>): Set<string> {
  const covered = new Set<string>();
  const visit = (pkg: string, script: string) => {
    const key = `${pkg}:${script}`;
    const scripts = all.get(pkg);
    if (covered.has(key) || !scripts?.[script]) return;
    covered.add(key);
    for (const word of scripts[script].match(/[\w:.-]+/g) ?? []) {
      if (word in scripts) visit(pkg, word);
    }
  };
  for (const {pkg, command} of ciCommands()) {
    for (const m of command.matchAll(/npm run ([\w:.-]+)/g)) visit(pkg, m[1]);
  }
  return covered;
}

describe('CI coverage', () => {
  const all = packages();
  const covered = coveredByCi(all);

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
