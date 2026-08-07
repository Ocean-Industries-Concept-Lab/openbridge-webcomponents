import type {AgentDoc} from './frontmatter.js';

export const ROUTING_MARKER = 'agents:routing';

const SYNC_CMD = 'npm run agents:sync -w packages/openbridge-webcomponents';

/**
 * Rewrites sibling links so they still resolve from an adapter directory.
 *
 * Canonical docs link to each other by bare filename — `[jsdoc.md](jsdoc.md)` —
 * which is correct inside `docs/agents/` and broken once the body is copied
 * into `.github/instructions/` or `.cursor/rules/`, where the sibling is named
 * `jsdoc.instructions.md` / `jsdoc.mdc` or does not exist at all.
 *
 * They are repointed at the canonical file rather than at the neighbouring
 * adapter: the canonical doc is the thing a reader should land on, and one
 * rewrite then works for every adapter. `.github/instructions/`, `.cursor/rules/`
 * and `docs/agents/` are all two levels below the repository root, so links
 * already written as `../../…` need no adjustment.
 *
 * Only names in `siblings` are touched, so an unrelated bare `.md` link is left
 * alone instead of being silently repointed at a file that does not exist.
 */
export function rewriteSiblingLinks(
  body: string,
  siblings: ReadonlySet<string>
): string {
  return body.replace(
    /\]\((?!\.\.\/|\/|https?:)([A-Za-z0-9._-]+)\.md(#[^)]*)?\)/g,
    (match, name: string, hash: string | undefined) =>
      siblings.has(name)
        ? `](../../docs/agents/${name}.md${hash ?? ''})`
        : match
  );
}

function banner(source: string): string {
  return [
    '<!-- GENERATED FILE — DO NOT EDIT.',
    `     Source: ${source}`,
    `     Regenerate: ${SYNC_CMD} -->`,
  ].join('\n');
}

/**
 * Copilot path-scoped instruction file: `applyTo` frontmatter plus the full
 * body. The body is copied rather than referenced because a pointer would
 * defeat the glob auto-attachment this file exists to provide.
 */
export function renderInstructionsFile(
  doc: AgentDoc,
  siblings: ReadonlySet<string> = new Set()
): string {
  return [
    '---',
    `applyTo: "${doc.globs.join(',')}"`,
    '---',
    '',
    banner(doc.sourcePath),
    '',
    rewriteSiblingLinks(doc.body, siblings).replace(/\n*$/, '\n'),
  ].join('\n');
}

/**
 * Cursor rule: `globs` + `alwaysApply: false` is Cursor's "Apply to Specific
 * Files" type — the direct equivalent of Copilot's `applyTo`.
 *
 * `description` is deliberately omitted. Cursor's four rule types are distinct
 * frontmatter combinations, and adding a description alongside globs selects
 * "Apply Intelligently" (the agent decides) instead of deterministic
 * attachment. The description still reaches the reader: the body opens with the
 * document's own heading.
 *
 * Negative globs are dropped. Cursor documents `globs` as a comma-separated
 * list and says nothing about `!` negation, so a pattern it cannot parse could
 * take the whole line with it. The only doc affected is `jsdoc.md`, whose
 * exclusions are generated directories a developer rarely opens by hand.
 */
export function renderCursorRule(
  doc: AgentDoc,
  siblings: ReadonlySet<string> = new Set()
): string {
  const globs = doc.globs.filter((g) => !g.startsWith('!'));
  return [
    '---',
    `globs: ${globs.join(',')}`,
    'alwaysApply: false',
    '---',
    '',
    banner(doc.sourcePath),
    '',
    rewriteSiblingLinks(doc.body, siblings).replace(/\n*$/, '\n'),
  ].join('\n');
}

/** Shared routing table (no markers) for AGENTS.md and copilot-instructions.md. */
export function renderRoutingTable(docs: AgentDoc[]): string {
  const rows = [...docs]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((doc) => {
      const scope = doc.globs.map((g) => `\`${g}\``).join('<br>');
      return `| [${doc.name}](${doc.sourcePath}) | ${scope} | ${doc.description} |`;
    });
  return [
    '| Doc | Scope (globs) | Description |',
    '| --- | --- | --- |',
    ...rows,
  ].join('\n');
}

/**
 * Repo-wide Copilot entry point. Unlike the path-scoped files this one carries
 * no bodies — it has no globs of its own, so a pointer costs nothing here.
 */
export function renderCopilotInstructions(docs: AgentDoc[]): string {
  return [
    banner('docs/agents/*.md'),
    '',
    '# GitHub Copilot Custom Instructions',
    '',
    '> **Canonical instructions live in [`AGENTS.md`](../AGENTS.md)**, and the',
    '> path-scoped rules in [`docs/agents/`](../docs/agents/). This file exists',
    '> because Copilot reads `.github/copilot-instructions.md` by convention.',
    '',
    'This repository contains the Openbridge Web Components library, a collection',
    'of maritime navigation and automation UI components built with Lit and',
    'TypeScript.',
    '',
    '- **Start here →** [`AGENTS.md`](../AGENTS.md).',
    '- Path-scoped rules are auto-attached from `.github/instructions/`, which is',
    '  generated from `docs/agents/`. Read the canonical file, not the copy.',
    '- Ask for clarification (e.g. a list of questions) before implementing',
    '  significant changes.',
    '',
    '## Available Instruction Files',
    '',
    renderRoutingTable(docs),
    '',
  ].join('\n');
}

/**
 * Claude Code entry point. Generated locally; stays gitignored.
 *
 * A pure pointer by design. Claude Code reads `CLAUDE.md` by convention, so the
 * file exists to route it to the canonical instructions — it deliberately holds
 * no rules of its own. Anything that applies to the whole team belongs in
 * `AGENTS.md`; anything path-scoped belongs in `docs/agents/`. Neither is
 * tool-specific, so neither belongs here.
 */
export function renderClaudeMd(): string {
  return [
    banner('the agents:sync generator'),
    '',
    '# CLAUDE.md',
    '',
    'All repository instructions live in **[AGENTS.md](AGENTS.md)** — read and',
    'follow it, including the path-scoped rules in',
    '[`docs/agents/`](docs/agents/) that it routes to.',
    '',
    'This file intentionally adds nothing of its own. It exists because Claude',
    'Code reads `CLAUDE.md` by convention; the instructions are tool-neutral and',
    'shared with every other agent.',
    '',
  ].join('\n');
}

/** Replaces the text between `<!-- marker:start -->` and `<!-- marker:end -->`. */
export function replaceMarkedBlock(
  content: string,
  marker: string,
  replacement: string
): string {
  const start = `<!-- ${marker}:start -->`;
  const end = `<!-- ${marker}:end -->`;
  const startIdx = content.indexOf(start);
  const endIdx = content.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(`markers "${start}" / "${end}" not found`);
  }
  return (
    content.slice(0, startIdx + start.length) +
    '\n' +
    replacement +
    '\n' +
    content.slice(endIdx)
  );
}
