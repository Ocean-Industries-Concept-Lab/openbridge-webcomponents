import {describe, expect, it} from 'vitest';
import {resolveChannel} from './channel.js';
import {
  gapReport,
  renderLlmsTxt,
  type LlmsTxtInput,
} from './render-llms-txt.js';
import type {ComponentEntry} from './types.js';

const entry = (over: Partial<ComponentEntry>): ComponentEntry => ({
  tag: 'obc-x',
  className: 'ObcX',
  modulePath: 'src/components/x/x.ts',
  family: 'components',
  summary: 'X.',
  lifecycle: 'stable',
  deprecatedNote: undefined,
  description: 'X.',
  declaration: {kind: 'class'},
  ...over,
});

const entries: ComponentEntry[] = [
  entry({
    tag: 'obc-button',
    summary: 'A button.',
    description: '`<obc-button>` – A button.',
  }),
  entry({
    tag: 'obc-line',
    family: 'automation',
    modulePath: 'src/automation/line/line.ts',
    summary: 'A line.',
    lifecycle: 'deprecated',
    deprecatedNote: 'Use obc-corner-line instead.',
  }),
  entry({
    tag: 'obc-pump',
    family: 'automation',
    modulePath: 'src/automation/pump/pump.ts',
    summary: undefined,
    description: '',
    lifecycle: undefined,
  }),
];

const input: LlmsTxtInput = {
  pkg: {
    name: '@oicl/openbridge-webcomponents',
    version: '2.2.0',
    description: 'The library.',
  },
  channel: resolveChannel('next', {}),
  entries,
  guides: [
    {
      title: 'Introduction/Advice System',
      file: 'AdviceSystem.mdx',
      slug: 'introduction-advice-system',
      optional: false,
      source: '',
    },
    {
      title: 'Introduction/Migration Guide',
      file: 'MigrationGuide.mdx',
      slug: 'introduction-migration-guide',
      optional: true,
      source: '',
    },
  ],
  agentDocs: [
    {
      name: 'a11y',
      description: 'Accessibility rules',
      repoPath: 'docs/agents/a11y.md',
    },
  ],
  componentHref: (e) => `https://x/${e.tag.slice(4)}.ts`,
  guideHref: (g) => `https://g/${g.slug}`,
};

const out = renderLlmsTxt(input);
const headings = (s: string) => s.split('\n').filter((l) => /^#/.test(l));

describe('renderLlmsTxt', () => {
  it('starts with the H1, the blockquote and the install paragraph', () => {
    const lines = out.split('\n').filter(Boolean);
    expect(lines[0]).toBe('# OpenBridge Web Components');
    expect(lines[1]).toBe('> The library.');
    expect(lines[2]).toMatch(
      /^Install `npm i @oicl\/openbridge-webcomponents`/
    );
  });

  it('emits the sections in order', () => {
    expect(headings(out)).toEqual([
      '# OpenBridge Web Components',
      '## Getting started',
      '## Guides',
      '## Component reference',
      '## UI components',
      '## Automation',
      '## Optional',
    ]);
  });

  it('links the getting-started sources on the channel', () => {
    expect(out).toContain(
      '- [README](https://unpkg.com/@oicl/openbridge-webcomponents@next/README.md): install, the setup lines, usage, wrappers, CDN bundle'
    );
    expect(out).toContain(
      '- [Getting started: React](https://raw.githubusercontent.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/develop/docs/getting-started-react.md)'
    );
    expect(out).toContain(
      '[Svelte wrapper README](https://unpkg.com/@oicl/openbridge-webcomponents-svelte@next/README.md)'
    );
  });

  it('links the manifest, Storybook and its index', () => {
    expect(out).toContain(
      '- [custom-elements.json](https://openbridge-next-storybook.web.app/custom-elements.json): every element'
    );
    expect(out).toContain(
      '- [Storybook](https://openbridge-next-storybook.web.app/): rendered docs and live stories, for people'
    );
    expect(out).toContain(
      '- [Storybook index](https://openbridge-next-storybook.web.app/index.json)'
    );
  });

  it('renders one line per component with summary and lifecycle', () => {
    expect(out).toContain(
      '- [obc-button](https://x/button.ts): A button. (stable)'
    );
  });

  it('marks a missing summary and an unknown lifecycle', () => {
    expect(out).toContain(
      '- [obc-pump](https://x/pump.ts): no summary yet (lifecycle unknown)'
    );
  });

  it('marks a deprecation with its note', () => {
    expect(out).toContain(
      '- [obc-line](https://x/line.ts): A line. (deprecated: Use obc-corner-line instead.)'
    );
  });

  it('lists guides without the Introduction prefix, optional ones under Optional', () => {
    const guidesSection = out
      .split('## Guides')[1]
      .split('## Component reference')[0];
    expect(guidesSection).toContain(
      '- [Advice System](https://g/introduction-advice-system)'
    );
    expect(guidesSection).not.toContain('Migration Guide');
    const optional = out.split('## Optional')[1];
    expect(optional).toContain(
      '- [Migration Guide](https://g/introduction-migration-guide)'
    );
    expect(optional).toContain(
      '- [Changelog](https://raw.githubusercontent.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/develop/packages/openbridge-webcomponents/CHANGELOG.md)'
    );
    expect(optional).toContain(
      '- [Contributing](https://raw.githubusercontent.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/develop/CONTRIBUTING.md)'
    );
    expect(optional).toContain(
      '- [a11y](https://raw.githubusercontent.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/develop/docs/agents/a11y.md): Accessibility rules'
    );
  });

  it('adds extra reference lines when given', () => {
    const withFull = renderLlmsTxt({
      ...input,
      extraReference: [
        {
          name: 'llms-full.txt',
          href: 'https://f',
          note: 'everything in one file',
        },
      ],
    });
    expect(withFull).toContain(
      '- [llms-full.txt](https://f): everything in one file'
    );
  });

  it('ends with a single newline', () => {
    expect(out.endsWith('\n')).toBe(true);
    expect(out.endsWith('\n\n')).toBe(false);
  });
});

describe('gapReport', () => {
  it('reports gaps by family', () => {
    expect(gapReport(entries).split('\n')).toEqual([
      'llms.txt: 3 components, 1 without a description, 0 without a summary line',
      '  automation: 1 without a description, 0 without a summary line',
    ]);
  });

  it('counts a description without a summary separately', () => {
    const todo = [
      entry({
        tag: 'obc-t',
        summary: undefined,
        description: '**TODO(designer)**: open',
      }),
    ];
    expect(gapReport(todo).split('\n')[0]).toBe(
      'llms.txt: 1 components, 0 without a description, 1 without a summary line'
    );
  });
});
