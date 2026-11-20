import {describe, expect, it, vi} from 'vitest';
import {mdxToMarkdown, type MdxContext} from './mdx.js';

const ctx = (over: Partial<MdxContext> = {}): MdxContext => ({
  readRaw: (p) => `<raw ${p}>`,
  storyLink: () => undefined,
  site: 'https://s',
  vars: {
    isStable: false,
    STORYBOOK_STABLE_URL: 'https://stable',
    STORYBOOK_DEVELOP_URL: 'https://dev',
  },
  warn: () => {},
  ...over,
});

describe('mdxToMarkdown', () => {
  it('drops imports and Meta, keeps the prose', () => {
    const src = `import {Meta} from '@storybook/addon-docs/blocks';\n\n<Meta title="Introduction/X" />\n\n# X\n\nText.`;
    expect(mdxToMarkdown(src, ctx())).toBe('# X\n\nText.');
  });

  it('handles a multi-line import', () => {
    const src = `import {\n  a,\n  b,\n} from '../x.js';\n\n# X`;
    expect(mdxToMarkdown(src, ctx())).toBe('# X');
  });

  it('ends an import at a trailing comment and never swallows prose', () => {
    const src = `import {Meta} from '@storybook/addon-docs/blocks'; // docs blocks\n\n# X\n\nText.`;
    expect(mdxToMarkdown(src, ctx())).toBe('# X\n\nText.');
  });

  it('keeps a blank line inside a multi-line import', () => {
    const src = `import {\n  Meta,\n\n  Markdown,\n} from '@storybook/addon-docs/blocks';\n\n# X\n\nText.`;
    expect(mdxToMarkdown(src, ctx())).toBe('# X\n\nText.');
  });

  it('rewrites Storybook links inside an expanded partial, leaving its code alone', () => {
    const docsRoute = (id: string) =>
      id === 'components-pump' ? 'https://s/components/obc-pump.md' : undefined;
    const raw =
      '| [Pump](?path=/docs/components-pump--docs) | `{min: 1}` |\n|---|---|\n\n```\n[x](?path=/story/a--b)\n```';
    expect(
      mdxToMarkdown(
        `import t from './t.md?raw';\n\n<Markdown>{t}</Markdown>`,
        ctx({readRaw: () => raw, docsRoute})
      )
    ).toBe(
      '| [Pump](https://s/components/obc-pump.md) | `{min: 1}` |\n|---|---|\n\n```\n[x](?path=/story/a--b)\n```'
    );
  });

  it('stops an unterminated import at the first blank line and warns', () => {
    const warn = vi.fn();
    expect(mdxToMarkdown(`import {\n  a,\n\n# X`, ctx({warn}))).toBe('# X');
    expect(warn).toHaveBeenCalledOnce();
  });

  it('maps a docs route to its generated page and leaves story routes on Storybook', () => {
    const docsRoute = (id: string) =>
      id === 'introduction-advice-system'
        ? 'https://s/docs/introduction-advice-system.md'
        : undefined;
    expect(
      mdxToMarkdown(
        '[a](?path=/docs/introduction-advice-system--docs), [b](?path=/docs/unknown--docs), [c](?path=/story/x--y)',
        ctx({docsRoute})
      )
    ).toBe(
      '[a](https://s/docs/introduction-advice-system.md), [b](https://s/?path=/docs/unknown--docs), [c](https://s/?path=/story/x--y)'
    );
  });

  it('normalises links and blank lines outside fenced code only', () => {
    const src =
      'A\n\n\n\nB\n\n```md\n[x](?path=/story/x--y)\n\n\n\nkeep\n```\n\n~~~\n[y](?path=/story/x--y)\n~~~';
    expect(mdxToMarkdown(src, ctx())).toBe(
      'A\n\nB\n\n```md\n[x](?path=/story/x--y)\n\n\n\nkeep\n```\n\n~~~\n[y](?path=/story/x--y)\n~~~'
    );
  });

  it('inlines a Markdown raw partial', () => {
    const src = `import categories from './x/categories.md?raw';\n\n## Categories\n\n<Markdown>{categories}</Markdown>`;
    expect(
      mdxToMarkdown(
        src,
        ctx({
          readRaw: (p) => (p === './x/categories.md?raw' ? '| a |\n|---|' : ''),
        })
      )
    ).toBe('## Categories\n\n| a |\n|---|');
  });

  it('replaces a Canvas with a story link and drops Controls', () => {
    const src = `import * as S from '../src/a/a.stories';\n\n<Canvas of={S.Playground} sourceState="none" />\n\n<Controls of={S.Playground} />\n\nAfter.`;
    const storyLink = vi.fn(
      () => '[Story: A / Playground](https://s/?path=/story/a--playground)'
    );
    expect(mdxToMarkdown(src, ctx({storyLink}))).toBe(
      '[Story: A / Playground](https://s/?path=/story/a--playground)\n\nAfter.'
    );
    expect(storyLink).toHaveBeenCalledWith('../src/a/a.stories', 'Playground');
  });

  it('drops a Canvas whose story cannot be resolved', () => {
    const src = `import * as S from '../src/a/a.stories';\n\n<Canvas of={S.Gone} />\n\nAfter.`;
    expect(mdxToMarkdown(src, ctx())).toBe('After.');
  });

  it('leaves fenced code alone, indented fences included', () => {
    const src =
      '```html\n<ObcPump></ObcPump>\nimport x from "y";\n<Meta title="no" />\n```\n\n1. Step\n\n   ```vue\n   <ObcTopBar></ObcTopBar>\n   ```';
    expect(mdxToMarkdown(src, ctx())).toBe(src);
  });

  it('absolutises Storybook path links', () => {
    expect(
      mdxToMarkdown(
        '[a](?path=/story/x--y) and [b](?path=/docs/z--docs)',
        ctx()
      )
    ).toBe(
      '[a](https://s/?path=/story/x--y) and [b](https://s/?path=/docs/z--docs)'
    );
  });

  it('resolves the channel expressions the Introduction page uses', () => {
    const src = [
      '{isStable ? (',
      '  <div style={{padding: 1}}>',
      '    <strong>Channel: Stable</strong>',
      '  </div>',
      ') : (',
      '  <div>Develop</div>',
      ')}',
      '',
      '- **<a href={STORYBOOK_STABLE_URL}>Stable Storybook</a>** {isStable && <em>(You are here)</em>} — quarterly.',
      '- **<a href={STORYBOOK_DEVELOP_URL}>Develop Storybook</a>** {!isStable && <em>(You are here)</em>} — every merge.',
      '',
      "Jump to the {isStable ? 'develop' : 'stable'} build.",
    ].join('\n');
    expect(mdxToMarkdown(src, ctx())).toBe(
      [
        '- **[Stable Storybook](https://stable)** — quarterly.',
        '- **[Develop Storybook](https://dev)** <em>(You are here)</em> — every merge.',
        '',
        'Jump to the stable build.',
      ].join('\n')
    );
  });

  it('drops an unknown expression and warns', () => {
    const warn = vi.fn();
    expect(mdxToMarkdown('Count: {items.length} total.', ctx({warn}))).toBe(
      'Count:  total.'
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('items.length'));
  });

  it('drops div wrappers around a partial', () => {
    const warn = vi.fn();
    const src = `import t from './t.md?raw';\n\n<div style={{overflowX: 'auto'}}>\n<Markdown>{t}</Markdown>\n</div>\n\nAfter.`;
    expect(mdxToMarkdown(src, ctx({readRaw: () => '| a |', warn}))).toBe(
      '| a |\n\nAfter.'
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it('collapses runs of blank lines', () => {
    expect(mdxToMarkdown('A\n\n\n\n\nB', ctx())).toBe('A\n\nB');
  });
});
