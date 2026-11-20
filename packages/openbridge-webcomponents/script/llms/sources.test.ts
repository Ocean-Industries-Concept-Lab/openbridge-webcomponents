import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {agentDocs, mdxGuides, packageMeta} from './sources.js';

let dir: string;
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'llms-'));
});
afterEach(() => {
  fs.rmSync(dir, {recursive: true, force: true});
});
const write = (name: string, text: string): string => {
  const file = path.join(dir, name);
  fs.writeFileSync(file, text);
  return file;
};

const VALID_FRONTMATTER = `---
name: a11y
description: Accessibility (WCAG 2.1 AA) — keyboard nav, ARIA, focus
globs:
  - packages/openbridge-webcomponents/src/components/**
---

# Accessibility Instructions

Body text.
`;

describe('mdxGuides', () => {
  it('reads titles, slugs and the optional flag from the MDX pages', () => {
    write(
      'AdviceSystem.mdx',
      `import {Meta} from '@storybook/addon-docs/blocks';\n\n<Meta title="Introduction/Advice System" />\n\n# Advice System`
    );
    write(
      'MigrationGuide21.mdx',
      `<Meta title="Introduction/Migration Guide 2.0 to 2.1" />`
    );
    write('notes.md', 'not a page');
    const guides = mdxGuides(dir, () => {});
    expect(
      guides.map(({title, slug, optional}) => ({title, slug, optional}))
    ).toEqual([
      {
        title: 'Introduction/Advice System',
        slug: 'introduction-advice-system',
        optional: false,
      },
      {
        title: 'Introduction/Migration Guide 2.0 to 2.1',
        slug: 'introduction-migration-guide-2-0-to-2-1',
        optional: true,
      },
    ]);
    expect(guides[0].file).toBe(path.join(dir, 'AdviceSystem.mdx'));
    expect(guides[0].source).toContain('# Advice System');
  });

  it('flags the changelog and the join page as optional', () => {
    write('Changelog.mdx', `<Meta title="Introduction/Changelog" />`);
    write('Join.mdx', `<Meta title="Introduction/Join the project!" />`);
    expect(mdxGuides(dir, () => {}).map((g) => g.optional)).toEqual([
      true,
      true,
    ]);
  });

  it('skips an MDX page without a Meta title and warns', () => {
    write('Loose.mdx', '# No meta here');
    const warn = vi.fn();
    expect(mdxGuides(dir, warn)).toEqual([]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Loose.mdx'));
  });
});

describe('agentDocs', () => {
  it('summarises agent docs from frontmatter', () => {
    write('a11y.md', VALID_FRONTMATTER);
    expect(agentDocs(dir, () => {})).toEqual([
      {
        name: 'a11y',
        description: 'Accessibility (WCAG 2.1 AA) — keyboard nav, ARIA, focus',
        repoPath: 'docs/agents/a11y.md',
      },
    ]);
  });

  it('returns [] and warns when docs/agents is missing', () => {
    const warn = vi.fn();
    expect(agentDocs(path.join(dir, 'nope'), warn)).toEqual([]);
    expect(warn).toHaveBeenCalledOnce();
  });
});

describe('packageMeta', () => {
  it('reads name, version and description', () => {
    const file = write(
      'package.json',
      JSON.stringify({name: '@oicl/x', version: '2.0.0', description: 'Desc.'})
    );
    expect(packageMeta(file)).toEqual({
      name: '@oicl/x',
      version: '2.0.0',
      description: 'Desc.',
    });
  });

  it('throws without a description', () => {
    const file = write(
      'package.json',
      JSON.stringify({name: 'x', version: '1'})
    );
    expect(() => packageMeta(file)).toThrow(/description/);
  });
});
