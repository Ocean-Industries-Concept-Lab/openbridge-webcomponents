import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';
import {parseAgentDoc, type AgentDoc} from './agent-docs/frontmatter.js';
import {
  ROUTING_MARKER,
  renderClaudeMd,
  renderCopilotInstructions,
  renderCursorRule,
  renderInstructionsFile,
  renderRoutingTable,
  replaceMarkedBlock,
  rewriteSiblingLinks,
} from './agent-docs/emitters.js';

const VALID = `---
name: a11y
description: Accessibility (WCAG 2.1 AA) — keyboard nav, ARIA, focus
globs:
  - packages/openbridge-webcomponents/src/components/**
  - packages/openbridge-webcomponents/src/automation/**
---

# Accessibility Instructions

Body text.
`;

describe('parseAgentDoc', () => {
  it('parses name, description and globs', () => {
    const doc = parseAgentDoc(VALID, 'docs/agents/a11y.md');
    expect(doc.name).toBe('a11y');
    expect(doc.description).toBe(
      'Accessibility (WCAG 2.1 AA) — keyboard nav, ARIA, focus'
    );
    expect(doc.globs).toEqual([
      'packages/openbridge-webcomponents/src/components/**',
      'packages/openbridge-webcomponents/src/automation/**',
    ]);
  });

  it('returns the body without the frontmatter', () => {
    const doc = parseAgentDoc(VALID, 'docs/agents/a11y.md');
    expect(doc.body).toBe('# Accessibility Instructions\n\nBody text.\n');
  });

  it('parses frontmatter checked out with CRLF line endings', () => {
    const doc = parseAgentDoc(
      VALID.replace(/\n/g, '\r\n'),
      'docs/agents/a11y.md'
    );
    expect(doc.name).toBe('a11y');
    expect(doc.body).toBe('# Accessibility Instructions\n\nBody text.\n');
  });

  it('strips single quotes used to escape leading "!"', () => {
    const raw = `---
name: jsdoc
description: JSDoc rules
globs:
  - packages/openbridge-webcomponents/src/**/*.ts
  - '!packages/openbridge-webcomponents/src/icons/**'
---
body
`;
    expect(parseAgentDoc(raw, 'docs/agents/jsdoc.md').globs[1]).toBe(
      '!packages/openbridge-webcomponents/src/icons/**'
    );
  });

  it('throws when name does not match the filename', () => {
    expect(() => parseAgentDoc(VALID, 'docs/agents/wrong.md')).toThrow(
      /name "a11y" does not match filename "wrong"/
    );
  });

  it('throws on an unsupported key', () => {
    const raw = `---
name: x
description: d
globs:
  - a/**
alwaysApply: true
---
body
`;
    expect(() => parseAgentDoc(raw, 'docs/agents/x.md')).toThrow(
      /unsupported key "alwaysApply" on line 6/
    );
  });

  it('throws when globs is empty', () => {
    const raw = `---
name: x
description: d
globs:
---
body
`;
    expect(() => parseAgentDoc(raw, 'docs/agents/x.md')).toThrow(
      /"globs" must list at least one pattern/
    );
  });

  it('throws when there is no frontmatter', () => {
    expect(() =>
      parseAgentDoc('# no frontmatter\n', 'docs/agents/x.md')
    ).toThrow(/must start with a "---" frontmatter block/);
  });
});

const DOC: AgentDoc = {
  name: 'a11y',
  description: 'Accessibility (WCAG 2.1 AA)',
  globs: ['packages/openbridge-webcomponents/src/components/**'],
  body: '# Accessibility\n\nBody.\n',
  sourcePath: 'docs/agents/a11y.md',
};

describe('renderInstructionsFile', () => {
  it('writes applyTo from globs and keeps the body verbatim', () => {
    const out = renderInstructionsFile(DOC);
    expect(out).toContain(
      'applyTo: "packages/openbridge-webcomponents/src/components/**"'
    );
    expect(out).toContain('# Accessibility\n\nBody.\n');
  });

  it('joins multiple globs with commas', () => {
    const out = renderInstructionsFile({...DOC, globs: ['a/**', 'b/**']});
    expect(out).toContain('applyTo: "a/**,b/**"');
  });

  it('includes a do-not-edit banner naming the source and the command', () => {
    const out = renderInstructionsFile(DOC);
    expect(out).toContain('GENERATED FILE — DO NOT EDIT');
    expect(out).toContain('docs/agents/a11y.md');
    expect(out).toContain('npm run agents:sync');
  });

  it('puts the frontmatter first so Copilot can read applyTo', () => {
    expect(renderInstructionsFile(DOC).startsWith('---\napplyTo:')).toBe(true);
  });
});

describe('renderRoutingTable', () => {
  it('emits one row per doc with description and globs', () => {
    const table = renderRoutingTable([DOC]);
    expect(table).toContain('[a11y](docs/agents/a11y.md)');
    expect(table).toContain('Accessibility (WCAG 2.1 AA)');
    expect(table).toContain(
      '`packages/openbridge-webcomponents/src/components/**`'
    );
  });

  it('sorts rows by name regardless of input order', () => {
    const z: AgentDoc = {
      ...DOC,
      name: 'zebra',
      sourcePath: 'docs/agents/zebra.md',
    };
    const table = renderRoutingTable([z, DOC]);
    expect(table.indexOf('[a11y]')).toBeLessThan(table.indexOf('[zebra]'));
  });
});

describe('renderCopilotInstructions', () => {
  it('points at AGENTS.md and carries the routing table but no bodies', () => {
    const out = renderCopilotInstructions([DOC]);
    expect(out).toContain('AGENTS.md');
    expect(out).toContain('[a11y](docs/agents/a11y.md)');
    expect(out).not.toContain('Body.');
  });
});

describe('replaceMarkedBlock', () => {
  it('replaces only the content between the markers', () => {
    const content = [
      'before',
      `<!-- ${ROUTING_MARKER}:start -->`,
      'OLD',
      `<!-- ${ROUTING_MARKER}:end -->`,
      'after',
    ].join('\n');
    const out = replaceMarkedBlock(content, ROUTING_MARKER, 'NEW');
    expect(out).toBe(
      [
        'before',
        `<!-- ${ROUTING_MARKER}:start -->`,
        'NEW',
        `<!-- ${ROUTING_MARKER}:end -->`,
        'after',
      ].join('\n')
    );
  });

  it('throws when the markers are missing', () => {
    expect(() => replaceMarkedBlock('no markers', ROUTING_MARKER, 'x')).toThrow(
      /markers .* not found/
    );
  });
});

describe('renderClaudeMd', () => {
  it('points at AGENTS.md and docs/agents', () => {
    const out = renderClaudeMd();
    expect(out).toContain('AGENTS.md');
    expect(out).toContain('docs/agents/');
    expect(out).toContain('GENERATED FILE — DO NOT EDIT');
  });

  it('carries no rules of its own — it is a pointer, not a source', () => {
    const out = renderClaudeMd();
    expect(out).toContain('intentionally adds nothing of its own');
    // No numbered rule list: team rules belong in AGENTS.md, path-scoped rules
    // in docs/agents/. Neither is tool-specific.
    expect(out).not.toMatch(/^\d+\. \*\*/m);
  });
});

describe('CLI failure semantics', () => {
  const cli = 'script/sync-agent-docs.ts';

  it('write mode never exits non-zero, so `prepare` cannot break npm ci', () => {
    const src = readFileSync(cli, 'utf8');
    expect(src).toContain('if (CHECK) process.exit(1);');
    expect(src).not.toMatch(/^\s*process\.exit\(1\);\s*$/m);
  });

  it('only skips negative globs in the resolution check', () => {
    const src = readFileSync(cli, 'utf8');
    expect(src).toContain("if (g.startsWith('!')) continue;");
  });
});

describe('renderCursorRule', () => {
  it('emits globs + alwaysApply:false — Cursor\'s "Apply to Specific Files" type', () => {
    const out = renderCursorRule(DOC);
    expect(out.startsWith('---\n')).toBe(true);
    expect(out).toContain(
      'globs: packages/openbridge-webcomponents/src/components/**'
    );
    expect(out).toContain('alwaysApply: false');
  });

  it('omits description, which would select "Apply Intelligently" instead', () => {
    expect(renderCursorRule(DOC)).not.toContain('description:');
  });

  it('joins multiple globs with commas', () => {
    expect(renderCursorRule({...DOC, globs: ['a/**', 'b/**']})).toContain(
      'globs: a/**,b/**'
    );
  });

  it('drops negative globs, which Cursor does not document', () => {
    const out = renderCursorRule({...DOC, globs: ['a/**', '!b/**', 'c/**']});
    expect(out).toContain('globs: a/**,c/**');
    expect(out).not.toContain('!b/**');
  });

  it('keeps the body verbatim and carries the do-not-edit banner', () => {
    const out = renderCursorRule(DOC);
    expect(out).toContain('# Accessibility\n\nBody.\n');
    expect(out).toContain('GENERATED FILE — DO NOT EDIT');
  });
});

describe('rewriteSiblingLinks', () => {
  const siblings = new Set(['jsdoc', 'a11y', 'css-postcss']);

  it('repoints bare sibling links at the canonical doc', () => {
    expect(rewriteSiblingLinks('see [`jsdoc.md`](jsdoc.md).', siblings)).toBe(
      'see [`jsdoc.md`](../../docs/agents/jsdoc.md).'
    );
  });

  it('preserves anchors', () => {
    expect(rewriteSiblingLinks('[x](a11y.md#section-2)', siblings)).toBe(
      '[x](../../docs/agents/a11y.md#section-2)'
    );
  });

  it('leaves ../../ links alone — they already resolve from every adapter dir', () => {
    const link = '[g](../../IMPLEMENTATION_GUIDELINES.md#-postcss)';
    expect(rewriteSiblingLinks(link, siblings)).toBe(link);
  });

  it('leaves external and absolute links alone', () => {
    const body = '[a](https://example.com/x.md) [b](/abs/y.md)';
    expect(rewriteSiblingLinks(body, siblings)).toBe(body);
  });

  it('leaves bare links that are not canonical docs alone', () => {
    const link = '[r](README.md)';
    expect(rewriteSiblingLinks(link, siblings)).toBe(link);
  });

  it('is applied by both adapter renderers', () => {
    const doc = {...DOC, body: 'see [`jsdoc.md`](jsdoc.md).\n'};
    expect(renderInstructionsFile(doc, siblings)).toContain(
      '](../../docs/agents/jsdoc.md)'
    );
    expect(renderCursorRule(doc, siblings)).toContain(
      '](../../docs/agents/jsdoc.md)'
    );
  });
});
