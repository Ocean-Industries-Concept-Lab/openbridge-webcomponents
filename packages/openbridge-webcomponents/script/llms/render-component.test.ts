import {describe, expect, it} from 'vitest';
import {resolveChannel} from './channel.js';
import {
  escapeCell,
  normalizeHeadings,
  renderComponentPage,
} from './render-component.js';
import type {StoriesInfo} from './stories.js';
import type {ComponentEntry} from './types.js';

const channel = resolveChannel('next', {});

const entry: ComponentEntry = {
  tag: 'obc-x',
  className: 'ObcX',
  modulePath: 'src/components/x/x.ts',
  family: 'components',
  summary: 'Shows X.',
  lifecycle: 'beta',
  deprecatedNote: undefined,
  description:
    '`<obc-x>` – Shows X.\n\n### Features\n\n- one\n\n### Usage Guidelines\n\nUse it.',
  declaration: {
    kind: 'class',
    name: 'ObcX',
    tagName: 'obc-x',
    members: [
      {
        kind: 'field',
        name: 'value',
        type: {text: 'number'},
        default: '0',
        description: 'The value.',
      },
      {
        kind: 'field',
        name: 'label',
        type: {text: 'string'},
        description: 'A | b',
        inheritedFrom: {name: 'Base'},
      },
      {
        kind: 'field',
        name: 'mode',
        type: {text: 'Mode | undefined'},
        default: "'a' | 'b'",
      },
      {kind: 'field', name: '_internal', type: {text: 'number'}},
      {kind: 'field', name: 'hidden', privacy: 'private'},
      {kind: 'field', name: 'styles', static: true},
      {kind: 'method', name: 'focus'},
    ],
    attributes: [{name: 'value', fieldName: 'value'}],
    events: [
      {
        name: 'change',
        type: {text: 'CustomEvent<{value: number}>'},
        description: 'Fired on change.',
      },
    ],
    slots: [
      {name: '', description: 'Default content.'},
      {name: 'icon', description: 'An icon.'},
    ],
    cssParts: [{name: 'wrapper', description: 'The box.'}],
  },
};

const stories: StoriesInfo[] = [
  {
    file: 'x.stories.ts',
    title: 'UI/X',
    componentTag: 'obc-x',
    componentDocs: 'Extra story-file docs.',
    stories: [
      {exportName: 'Default', name: 'Default', doc: 'Shows the default.'},
    ],
  },
  {
    file: 'x-more.stories.ts',
    title: 'UI/X More',
    componentTag: 'obc-x',
    componentDocs: undefined,
    stories: [
      {exportName: 'DenseLayout', name: 'Dense (compact)', doc: undefined},
    ],
  },
];

describe('renderComponentPage', () => {
  const out = renderComponentPage({
    entry,
    channel,
    stories,
    seeAlso: [{title: 'Advice System', href: 'https://g/advice'}],
  });

  it('renders the header', () => {
    expect(out.startsWith('# `<obc-x>`\n\nShows X.\n\n')).toBe(true);
    expect(out).toContain(
      'Lifecycle: beta. [Storybook](https://openbridge-next-storybook.web.app/?path=/docs/ui-x--docs) · [Source](https://raw.githubusercontent.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/develop/packages/openbridge-webcomponents/src/components/x/x.ts)'
    );
  });

  it('normalises the description headings and appends the story-file docs', () => {
    expect(out).toContain('\n## Features\n');
    expect(out).toContain('\n## Usage Guidelines\n');
    expect(out).toContain('Extra story-file docs.');
  });

  it('renders the tables', () => {
    expect(out).toContain(
      '| Property | Attribute | Type | Default | Description |'
    );
    expect(out).toContain('| value | value | `number` | `0` | The value. |');
    expect(out).toContain('| label |  | `string` |  | A \\| b |');
    expect(out).toContain(
      "| mode |  | `Mode \\| undefined` | `'a' \\| 'b'` |  |"
    );
    expect(out).not.toContain('_internal');
    expect(out).not.toContain('| hidden');
    expect(out).not.toContain('| styles');
    expect(out).toContain(
      '| change | `CustomEvent<{value: number}>` | Fired on change. |'
    );
    expect(out).toContain('| (default) | Default content. |');
    expect(out).toContain('| icon | An icon. |');
    expect(out).toContain('## CSS parts');
    expect(out).toContain('| wrapper | The box. |');
  });

  it('lists stories from every file declaring the tag', () => {
    expect(out).toContain(
      '- [Default](https://openbridge-next-storybook.web.app/?path=/story/ui-x--default): Shows the default.'
    );
    expect(out).toContain(
      '- [Dense (compact)](https://openbridge-next-storybook.web.app/?path=/story/ui-x-more--dense-layout)\n'
    );
  });

  it('renders see-also links', () => {
    expect(out).toContain('## See also\n\n- [Advice System](https://g/advice)');
  });

  it('resolves a docs reference on a component stories file, once', () => {
    const withRef: StoriesInfo[] = [
      {...stories[0], componentDocs: {kind: 'classDocs', arg: 'ObcBase'}},
      {...stories[1], componentDocs: {kind: 'moduleDocs', arg: 'x/x.ts'}},
    ];
    const page = renderComponentPage({
      entry,
      channel,
      stories: withRef,
      seeAlso: [],
      resolveDocs: (ref) =>
        ref.kind === 'classDocs' ? 'Base class docs.' : entry.description,
    });
    expect(page).toContain('Base class docs.');
    expect(page.match(/Shows X\./g)).toHaveLength(2);
  });

  it('renders a bare declaration without throwing', () => {
    const bare: ComponentEntry = {
      ...entry,
      summary: undefined,
      lifecycle: undefined,
      description: '',
      declaration: {kind: 'class', tagName: 'obc-x'},
    };
    const page = renderComponentPage({
      entry: bare,
      channel,
      stories: [],
      seeAlso: [],
    });
    expect(page).toContain('No summary yet.');
    expect(page).toContain('Lifecycle: unknown.');
    expect(page).not.toContain('[Storybook]');
    expect(page).toContain('## Properties\n\nNone.');
    expect(page).toContain('## Events\n\nNone.');
    expect(page).toContain('## Slots\n\nNone.');
    expect(page).not.toContain('## CSS parts');
    expect(page).not.toContain('## Stories');
    expect(page).not.toContain('## See also');
  });
});

describe('normalizeHeadings', () => {
  it('shifts every heading so the shallowest becomes ##, leaving code alone', () => {
    expect(
      normalizeHeadings(
        '### Features\n\ntext\n\n#### Sub\n\n```md\n# in code\n```'
      )
    ).toBe('## Features\n\ntext\n\n### Sub\n\n```md\n# in code\n```');
  });

  it('leaves tilde fences and longer backtick fences alone', () => {
    expect(
      normalizeHeadings(
        '### Features\n\n~~~sh\n# comment\n~~~\n\n````md\n# four\n```\n# still code\n````'
      )
    ).toBe(
      '## Features\n\n~~~sh\n# comment\n~~~\n\n````md\n# four\n```\n# still code\n````'
    );
  });

  it('demotes an H1 to ##', () => {
    expect(normalizeHeadings('# Title\n\n## Part')).toBe(
      '## Title\n\n### Part'
    );
  });

  it('returns text without headings unchanged', () => {
    expect(normalizeHeadings('plain')).toBe('plain');
  });
});

describe('escapeCell', () => {
  it('escapes pipes and flattens newlines', () => {
    expect(escapeCell('a | b\nc')).toBe('a \\| b c');
    expect(escapeCell(undefined)).toBe('');
  });
});
