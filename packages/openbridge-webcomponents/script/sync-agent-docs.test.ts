import {describe, expect, it} from 'vitest';
import {parseAgentDoc} from './agent-docs/frontmatter.js';

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
