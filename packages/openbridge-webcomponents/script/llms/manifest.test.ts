import {describe, expect, it, vi} from 'vitest';
import {
  componentEntries,
  familyOf,
  firstSentence,
  summaryOf,
  type Manifest,
} from './manifest.js';

describe('summaryOf', () => {
  it('strips the tag prefix and the dash', () => {
    expect(
      summaryOf('`<obc-compass>` – Full compass with arrows.\n\n## Features')
    ).toBe('Full compass with arrows.');
  });

  it('accepts the bare-backtick tag form and a hyphen', () => {
    expect(summaryOf('`obc-x` - Does a thing.')).toBe('Does a thing.');
  });

  it('joins a wrapped first sentence', () => {
    expect(
      summaryOf(
        '`<obc-valve>` – three-way control valve for process\ndiagrams, with a continuous opening. Second sentence.'
      )
    ).toBe(
      'three-way control valve for process diagrams, with a continuous opening.'
    );
  });

  it('keeps a first line without the tag', () => {
    expect(summaryOf('Vertical SVG bar + external scale.')).toBe(
      'Vertical SVG bar + external scale.'
    );
  });

  it('does not cut at an abbreviation', () => {
    expect(summaryOf('Shows e.g. the value. Then more.')).toBe(
      'Shows e.g. the value.'
    );
  });

  it.each([
    '### Overview\n\nText.',
    '**TODO(designer)**: open',
    'TODO(designer): open',
    '@property x - y',
    '```ts\ncode\n```',
  ])('treats %j as missing', (d) => {
    expect(summaryOf(d)).toBeUndefined();
  });

  it('is undefined for an empty description', () => {
    expect(summaryOf(undefined)).toBeUndefined();
    expect(summaryOf('')).toBeUndefined();
  });

  it('escapes markdown-significant characters', () => {
    expect(summaryOf('`<obc-x>` – A [b] | c.')).toBe('A \\[b\\] \\| c.');
  });
});

describe('firstSentence', () => {
  it('cuts before an uppercase or backtick start of the next sentence', () => {
    expect(firstSentence('One. Two.')).toBe('One.');
    expect(firstSentence('One. `two`.')).toBe('One.');
    expect(firstSentence('v1.5 m. more')).toBe('v1.5 m. more');
  });
});

describe('familyOf', () => {
  it.each([
    ['src/components/button/button.ts', 'components'],
    ['src/navigation-instruments/compass/compass.ts', 'navigation-instruments'],
    ['src/bars-graphs/pie-chart/pie-chart.ts', 'bars-graphs'],
    ['src/ar/poi/poi.ts', 'ar'],
    ['src/pages/alert-detail-page/alert-detail-page.ts', 'pages'],
  ])('%s → %s', (p, f) => {
    expect(familyOf(p)).toBe(f);
  });

  it('is undefined outside the families', () => {
    expect(familyOf('src/decorator.ts')).toBeUndefined();
    expect(familyOf('src/palettes/x.ts')).toBeUndefined();
  });
});

describe('componentEntries', () => {
  const manifest: Manifest = {
    modules: [
      {
        path: 'src/automation/pump/pump.ts',
        declarations: [
          {
            kind: 'class',
            name: 'ObcPump',
            tagName: 'obc-pump',
            lifecycle: 'beta',
          },
        ],
      },
      {
        path: 'src/components/button/button.ts',
        declarations: [
          {
            kind: 'class',
            name: 'ObcButton',
            tagName: 'obc-button',
            description: '`<obc-button>` – A button.',
            lifecycle: 'stable',
          },
          {kind: 'class', name: 'ButtonBase'},
        ],
      },
      {
        path: 'src/automation/line/line.ts',
        declarations: [
          {
            kind: 'class',
            name: 'ObcLine',
            tagName: 'obc-line',
            description: '`<obc-line>` – A line.',
            lifecycle: 'deprecated',
            deprecated: 'Use obc-corner-line instead. More text.',
          },
        ],
      },
      {
        path: 'src/palettes/x.ts',
        declarations: [{kind: 'class', name: 'ObcOdd', tagName: 'obc-odd'}],
      },
    ],
  };

  it('orders by family then tag and skips non-elements', () => {
    const warn = vi.fn();
    expect(componentEntries(manifest, warn).map((e) => e.tag)).toEqual([
      'obc-button',
      'obc-line',
      'obc-pump',
    ]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('obc-odd'));
  });

  it('carries summary, lifecycle and the first sentence of a deprecation', () => {
    const entries = componentEntries(manifest, () => {});
    expect(entries.find((e) => e.tag === 'obc-line')).toMatchObject({
      summary: 'A line.',
      lifecycle: 'deprecated',
      deprecatedNote: 'Use obc-corner-line instead.',
      family: 'automation',
      modulePath: 'src/automation/line/line.ts',
      className: 'ObcLine',
    });
    const pump = entries.find((e) => e.tag === 'obc-pump')!;
    expect(pump.summary).toBeUndefined();
    expect(pump.description).toBe('');
    expect(pump.deprecatedNote).toBeUndefined();
  });
});
