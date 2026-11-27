import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {resolveChannel} from './channel.js';
import {
  docsPageUrl,
  readStoriesFile,
  storiesIndex,
  storyPageUrl,
} from './stories.js';

let dir: string;
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'llms-stories-'));
});
afterEach(() => {
  fs.rmSync(dir, {recursive: true, force: true});
});
const write = (name: string, text: string): string => {
  const file = path.join(dir, name);
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, text);
  return file;
};
const next = resolveChannel('next', {});

describe('readStoriesFile', () => {
  it('reads title, component and stories with docs', () => {
    const file = write(
      'a.stories.ts',
      [
        "import type {Meta, StoryObj} from '@storybook/web-components-vite';",
        'const meta: Meta = {',
        "  title: 'Bars and Graphs/Bar Vertical',",
        "  component: 'obc-bar-vertical',",
        "  parameters: {docs: {description: {component: 'Comp docs'}}},",
        '} satisfies Meta;',
        'export default meta;',
        'type Story = StoryObj;',
        '/** Each band carries its icon.',
        ' *',
        ' * More. */',
        'export const WithAdviceIcons: Story = {args: {}};',
        'export const Named: Story = {',
        "  name: 'Default (right side)',",
        "  parameters: {docs: {description: {story: 'Story docs'}}},",
        '};',
        'const helper = 1;',
        'export {helper};',
      ].join('\n')
    );
    expect(readStoriesFile(file, () => {})).toEqual({
      file,
      title: 'Bars and Graphs/Bar Vertical',
      componentTag: 'obc-bar-vertical',
      componentDocs: 'Comp docs',
      docsPage: true,
      stories: [
        {
          exportName: 'WithAdviceIcons',
          name: 'With Advice Icons',
          doc: 'Each band carries its icon.\n\nMore.',
        },
        {exportName: 'Named', name: 'Default (right side)', doc: 'Story docs'},
      ],
    });
  });

  it('keeps every paragraph of a story description', () => {
    const file = write(
      'g.stories.ts',
      [
        "export default {title: 'X/G', component: 'obc-g'};",
        '/**',
        ' * Scales like a vector.',
        ' *',
        ' * - **false**: reacts to properties',
        ' * - **true**: scales as a whole',
        ' */',
        'export const Fixed = {args: {}};',
        'export const Params = {',
        "  parameters: {docs: {description: {story: 'One.\\n\\nTwo.'}}},",
        '};',
      ].join('\n')
    );
    expect(readStoriesFile(file, () => {}).stories.map((s) => s.doc)).toEqual([
      'Scales like a vector.\n\n- **false**: reacts to properties\n- **true**: scales as a whole',
      'One.\n\nTwo.',
    ]);
  });

  it('records whether Storybook builds a docs page for the file', () => {
    const on = write(
      'h.stories.ts',
      "export default {title: 'X/H', component: 'obc-h', tags: ['beta']};"
    );
    const off = write(
      'i.stories.ts',
      "const meta = {title: 'X/I', component: 'obc-i', tags: ['!autodocs', '6.0']};\nexport default meta;"
    );
    expect(readStoriesFile(on, () => {}).docsPage).toBe(true);
    expect(readStoriesFile(off, () => {}).docsPage).toBe(false);
  });

  it('does not take description.component for the component tag', () => {
    const file = write(
      'b.stories.ts',
      "const meta = {title: 'Building Blocks/Setpoint', parameters: {docs: {description: {component: `# Setpoint\n\nText.`}}}};\nexport default meta;"
    );
    const info = readStoriesFile(file, () => {});
    expect(info.componentTag).toBeUndefined();
    expect(info.componentDocs).toBe('# Setpoint\n\nText.');
  });

  it('records a moduleDocs() or classDocs() reference', () => {
    const file = write(
      'c.stories.ts',
      "export default {title: 'Building Blocks/External Scale', parameters: {docs: {description: {component: moduleDocs('building-blocks/external-scale/external-scale.ts')}}}};"
    );
    expect(readStoriesFile(file, () => {}).componentDocs).toEqual({
      kind: 'moduleDocs',
      arg: 'building-blocks/external-scale/external-scale.ts',
    });
  });

  it('warns on a non-literal title and leaves it undefined', () => {
    const file = write(
      'd.stories.ts',
      "const x = 'B';\nconst meta = {title: `A/${x}`, component: 'obc-a'};\nexport default meta;"
    );
    const warn = vi.fn();
    const info = readStoriesFile(file, warn);
    expect(info.title).toBeUndefined();
    expect(info.componentTag).toBe('obc-a');
    expect(warn).toHaveBeenCalledOnce();
  });

  it('keeps stories that reference a shared object', () => {
    const file = write(
      'f.stories.ts',
      "import {shared} from './shared.js';\nexport default {title: 'X/F', component: 'obc-f'};\n/** The default. */\nexport const Default = shared.Default;\nexport const Whole = shared;\nexport const N = 5;"
    );
    expect(readStoriesFile(file, () => {}).stories).toEqual([
      {exportName: 'Default', name: 'Default', doc: 'The default.'},
      {exportName: 'Whole', name: 'Whole', doc: undefined},
    ]);
  });

  it('skips exports that are not story objects', () => {
    const file = write(
      'e.stories.ts',
      "export default {title: 'X/Y', component: 'obc-y'};\nexport const SAMPLE = [1, 2];\nexport function helper() {}\nexport const Default = {args: {}};"
    );
    expect(
      readStoriesFile(file, () => {}).stories.map((s) => s.exportName)
    ).toEqual(['Default']);
  });
});

describe('storiesIndex', () => {
  it('reads every stories file under the directory', () => {
    write(
      'a/a.stories.ts',
      "export default {title: 'A/A', component: 'obc-a'};"
    );
    write(
      'b/c/b.stories.ts',
      "export default {title: 'B/B', component: 'obc-b'};"
    );
    write('b/b.spec.ts', 'export const x = 1;');
    expect(storiesIndex(dir, () => {}).map((i) => i.componentTag)).toEqual([
      'obc-a',
      'obc-b',
    ]);
  });
});

describe('urls', () => {
  it('builds Storybook urls', () => {
    expect(docsPageUrl(next, 'Bars and Graphs/Bar Vertical')).toBe(
      'https://openbridge-next-storybook.web.app/?path=/docs/bars-and-graphs-bar-vertical--docs'
    );
    expect(
      storyPageUrl(next, 'Bars and Graphs/Bar Vertical', 'DefaultRight')
    ).toBe(
      'https://openbridge-next-storybook.web.app/?path=/story/bars-and-graphs-bar-vertical--default-right'
    );
    expect(storyPageUrl(next, 'Building Blocks/Setpoint', 'NotEqual')).toBe(
      'https://openbridge-next-storybook.web.app/?path=/story/building-blocks-setpoint--not-equal'
    );
  });
});
