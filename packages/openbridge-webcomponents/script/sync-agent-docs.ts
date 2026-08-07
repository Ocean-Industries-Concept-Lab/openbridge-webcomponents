import fs from 'node:fs';
import path from 'node:path';
import {globSync} from 'glob';
import * as prettier from 'prettier';
import {parseAgentDoc, type AgentDoc} from './agent-docs/frontmatter.js';
import {
  ROUTING_MARKER,
  renderClaudeMd,
  renderCopilotInstructions,
  renderInstructionsFile,
  renderRoutingTable,
  replaceMarkedBlock,
} from './agent-docs/emitters.js';

const ROOT = path.resolve(import.meta.dirname, '../../..');
const AGENTS_DIR = path.join(ROOT, 'docs/agents');
const INSTRUCTIONS_DIR = path.join(ROOT, '.github/instructions');
const CHECK = process.argv.includes('--check');

const problems: string[] = [];
const writes = new Map<string, string>();

function plan(absPath: string, content: string): void {
  writes.set(absPath, content);
}

function loadDocs(): AgentDoc[] {
  if (!fs.existsSync(AGENTS_DIR)) {
    throw new Error(
      `docs/agents does not exist at ${AGENTS_DIR} — nothing to sync`
    );
  }
  return fs
    .readdirSync(AGENTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const rel = path.posix.join('docs/agents', f);
      return parseAgentDoc(
        fs.readFileSync(path.join(AGENTS_DIR, f), 'utf8'),
        rel
      );
    });
}

/** Check 1 — every positive glob must match at least one real path. */
function checkGlobs(docs: AgentDoc[]): void {
  for (const doc of docs) {
    for (const g of doc.globs) {
      if (g.startsWith('!')) continue;
      if (globSync(g, {cwd: ROOT, dot: true}).length === 0) {
        problems.push(`${doc.sourcePath}: glob matches nothing → ${g}`);
      }
    }
  }
}

/** Check 4 — no generated instruction file without a canonical source. */
function checkOrphans(docs: AgentDoc[]): void {
  const expected = new Set(docs.map((d) => `${d.name}.instructions.md`));
  if (!fs.existsSync(INSTRUCTIONS_DIR)) return;
  for (const f of fs.readdirSync(INSTRUCTIONS_DIR)) {
    if (f.endsWith('.instructions.md') && !expected.has(f)) {
      problems.push(
        `.github/instructions/${f}: no matching docs/agents/ source (delete it or add the source)`
      );
    }
  }
}

const docs = loadDocs();
checkGlobs(docs);
checkOrphans(docs);

// `claude` has no path-scoped adapter and no routing row — it renders CLAUDE.md.
const routable = docs.filter((d) => d.name !== 'claude');

for (const doc of routable) {
  plan(
    path.join(INSTRUCTIONS_DIR, `${doc.name}.instructions.md`),
    renderInstructionsFile(doc)
  );
}
plan(
  path.join(ROOT, '.github/copilot-instructions.md'),
  renderCopilotInstructions(routable)
);

const agentsPath = path.join(ROOT, 'AGENTS.md');
plan(
  agentsPath,
  replaceMarkedBlock(
    fs.readFileSync(agentsPath, 'utf8'),
    ROUTING_MARKER,
    renderRoutingTable(routable)
  )
);

const claude = docs.find((d) => d.name === 'claude');
if (!claude) {
  problems.push(
    'docs/agents/claude.md is missing — CLAUDE.md cannot be generated'
  );
} else {
  plan(path.join(ROOT, 'CLAUDE.md'), renderClaudeMd(claude));
}

/**
 * Runs generated Markdown through Prettier before writing or comparing.
 *
 * Without this the generator's compact tables would differ from what
 * `npm run format:check` (and the lint-staged `.md` hook) demand, so every
 * sync would leave the repo format-dirty and CI would fail. Formatting here
 * makes generator output and Prettier output the same artefact by
 * construction, and keeps `--check` comparing like with like.
 */
async function format(content: string, absPath: string): Promise<string> {
  const config = await prettier.resolveConfig(absPath);
  return prettier.format(content, {
    ...config,
    filepath: absPath,
    parser: 'markdown',
  });
}

for (const [absPath, raw] of writes) {
  const rel = path.relative(ROOT, absPath);
  const content = await format(raw, absPath);
  const current = fs.existsSync(absPath)
    ? fs.readFileSync(absPath, 'utf8')
    : null;
  if (current === content) continue;
  if (CHECK) {
    problems.push(`${rel}: out of date — run \`npm run agents:sync\``);
  } else {
    fs.mkdirSync(path.dirname(absPath), {recursive: true});
    fs.writeFileSync(absPath, content);
    console.log(`${current === null ? 'created' : 'updated'} ${rel}`);
  }
}

if (problems.length > 0) {
  console.error(`\nagent-docs: ${problems.length} problem(s)`);
  for (const p of problems) console.error(`  ${CHECK ? '✗' : 'warning:'} ${p}`);
  // Write mode reports but never fails. `agents:sync` runs from the root
  // `prepare` script, so a stale glob or a missing source must not be able to
  // break `npm ci` for everyone. `lint:agents` is the gate; it runs in CI after
  // the build steps, when any generated paths actually exist.
  if (CHECK) process.exit(1);
}
console.log(CHECK ? 'agent-docs: up to date' : 'agent-docs: sync complete');
