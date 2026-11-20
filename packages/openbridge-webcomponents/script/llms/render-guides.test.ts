import {describe, expect, it} from 'vitest';
import {resolveChannel} from './channel.js';
import {
  isModuleGuide,
  renderLlmsFull,
  renderStoriesGuide,
} from './render-guides.js';
import type {StoriesInfo} from './stories.js';

const channel = resolveChannel('next', {});
const base: StoriesInfo = {
  file: 'setpoint.stories.ts',
  title: 'Building Blocks/Setpoint',
  componentTag: undefined,
  componentDocs: '# Setpoint\n\nThe marker.',
  stories: [
    {
      exportName: 'NotEqual',
      name: 'NotEqual (Input ≠ Output)',
      doc: 'Full size.',
    },
    {exportName: 'Flow', name: 'Flow', doc: undefined},
  ],
};

describe('isModuleGuide', () => {
  it('is a guide only with a title, no component and some docs', () => {
    expect(isModuleGuide(base)).toBe(true);
    expect(isModuleGuide({...base, componentTag: 'obc-x'})).toBe(false);
    expect(isModuleGuide({...base, componentDocs: undefined})).toBe(false);
    expect(isModuleGuide({...base, title: undefined})).toBe(false);
  });
});

describe('renderStoriesGuide', () => {
  it('renders the title, the docs and the stories', () => {
    const out = renderStoriesGuide(base, channel, () => undefined);
    expect(out.startsWith('# Setpoint\n\n')).toBe(true);
    expect(out).toContain(
      '[Storybook](https://openbridge-next-storybook.web.app/?path=/docs/building-blocks-setpoint--docs)'
    );
    expect(out).toContain('\n## Setpoint\n\nThe marker.');
    expect(out).toContain(
      '- [NotEqual (Input ≠ Output)](https://openbridge-next-storybook.web.app/?path=/story/building-blocks-setpoint--notequal-input-≠-output): Full size.'
    );
    expect(out).toContain(
      '- [Flow](https://openbridge-next-storybook.web.app/?path=/story/building-blocks-setpoint--flow)\n'
    );
  });

  it('resolves a moduleDocs reference through the callback', () => {
    const info: StoriesInfo = {
      ...base,
      componentDocs: {kind: 'moduleDocs', arg: 'x/y.ts'},
    };
    const out = renderStoriesGuide(info, channel, (ref) =>
      ref.arg === 'x/y.ts' ? 'Module text.' : undefined
    );
    expect(out).toContain('Module text.');
  });

  it('strips the Introduction prefix from the title', () => {
    expect(
      renderStoriesGuide(
        {...base, title: 'Introduction/Thing'},
        channel,
        () => undefined
      ).startsWith('# Thing\n')
    ).toBe(true);
  });
});

describe('renderLlmsFull', () => {
  it('joins the parts with a rule between them', () => {
    expect(
      renderLlmsFull([
        {title: 'a', markdown: '# A\n\nx\n'},
        {title: 'b', markdown: '# B'},
      ])
    ).toBe('# A\n\nx\n\n---\n\n# B\n');
  });
});
