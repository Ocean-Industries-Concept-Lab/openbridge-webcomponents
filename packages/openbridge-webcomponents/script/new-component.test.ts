import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {describe, expect, it} from 'vitest';
import * as prettier from 'prettier';
import {globSync} from 'glob';

// @ts-expect-error - eslint.config.mjs is untyped JavaScript.
import {__testables} from '../eslint.config.mjs';

import {
  FAMILIES,
  NAME_PATTERN,
  TAG_PATTERN,
  componentDir,
  renderFiles,
  quote,
  rejectUnless,
  renderStories,
  splitWords,
  storyTags,
  toDefaultTitle,
  toKebabCase,
  type ComponentType,
  type Lifecycle,
  type ScaffoldSpec,
} from './new-component/scaffold.js';

const {extractComponents} = __testables;
const PKG = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function spec(overrides: Partial<ScaffoldSpec> = {}): ScaffoldSpec {
  return {
    name: 'ThrusterDial',
    tag: 'obc-thruster-dial',
    type: 'ui',
    lifecycle: 'experimental',
    title: 'Thruster Dial',
    version: '6.1',
    hasCss: true,
    ...overrides,
  };
}

describe('toKebabCase', () => {
  it('splits words, acronyms and digits', () => {
    expect(toKebabCase('TopBar')).toBe('top-bar');
    expect(toKebabCase('GNSSSkyplot')).toBe('gnss-skyplot');
    expect(toKebabCase('ARPoiButton')).toBe('ar-poi-button');
    expect(toKebabCase('HydraulicValveX2')).toBe('hydraulic-valve-x-2');
    expect(toKebabCase('Watch')).toBe('watch');
  });

  it('derives the tags of the two shipped elements that carry digits', () => {
    // obc-hydraulic-valve-4-3 is the counter-example: a digit group cannot be
    // split from the name alone, which is why the CLI confirms the tag.
    expect(toKebabCase('HydraulicValveX2')).toBe('hydraulic-valve-x-2');
    expect(toKebabCase('HydraulicValve43')).toBe('hydraulic-valve-43');
  });

  it('produces a tag the CLI accepts, for every name the CLI accepts', () => {
    for (const name of [
      'A1',
      'ARPoiButton',
      'GNSSSkyplot',
      'HydraulicValveX2',
      'Watch',
      'PitchRollHeave',
    ]) {
      expect(NAME_PATTERN.test(name)).toBe(true);
      expect(TAG_PATTERN.test(`obc-${toKebabCase(name)}`)).toBe(true);
    }
  });
});

describe('rejectUnless', () => {
  it('rejects in the only shape the prompt library reads', () => {
    // A boolean or a string return is treated as valid by its isValid(), so a
    // validator written either way passes every answer.
    expect(rejectUnless(false, 'nope')).toEqual({
      isValid: false,
      error: 'nope',
    });
    expect(rejectUnless(true, 'nope')).toBeNull();
  });
});

describe('quote', () => {
  it('matches the literal prettier would write', async () => {
    const absPath = path.join(PKG, 'src/components/thruster-dial/probe.ts');
    const config = await prettier.resolveConfig(absPath);
    for (const value of [
      'Thruster Dial',
      "Captain's Chair",
      'Say "ahead"',
      'It\'s a "mix"',
      'Back\\slash',
    ]) {
      const source = `const title = ${quote(value)};\n`;
      expect(
        await prettier.format(source, {...config, filepath: absPath}),
        value
      ).toBe(source);
    }
  });
});

describe('splitWords', () => {
  it('keeps an acronym as one word', () => {
    expect(splitWords('GPSWidget')).toEqual(['GPS', 'Widget']);
    expect(splitWords('GNSSSkyplot')).toEqual(['GNSS', 'Skyplot']);
    expect(splitWords('ARPoiButton')).toEqual(['AR', 'Poi', 'Button']);
    expect(splitWords('TopBar')).toEqual(['Top', 'Bar']);
    expect(splitWords('Watch')).toEqual(['Watch']);
  });
});

describe('toDefaultTitle', () => {
  it('splits acronyms, which the tag rule alone would not', () => {
    expect(toDefaultTitle('GPSWidget')).toBe('GPS Widget');
    expect(toDefaultTitle('ThrusterDial')).toBe('Thruster Dial');
    expect(toDefaultTitle('ARPoiButton')).toBe('AR Poi Button');
  });

  it('leaves digits attached, the way the shipped titles spell them', () => {
    // The story is titled `Valve X-2`, never `Valve X 2`; the tag wants the
    // split, a title does not, and the prompt default is editable either way.
    expect(toDefaultTitle('HydraulicValveX2')).toBe('Hydraulic Valve X2');
    expect(toKebabCase('HydraulicValveX2')).toBe('hydraulic-valve-x-2');
  });

  it('is already Title Case, as the story lint rule requires', () => {
    for (const name of ['GPSWidget', 'ThrusterDial', 'PitchRollHeave']) {
      const title = toDefaultTitle(name);
      for (const word of title.split(' ')) {
        expect(word[0], title).toBe(word[0].toUpperCase());
      }
    }
  });
});

describe('FAMILIES', () => {
  it('points every family at a directory that exists', () => {
    for (const family of Object.values(FAMILIES)) {
      expect(
        fs.existsSync(path.join(PKG, 'src', family.dir)),
        `src/${family.dir}`
      ).toBe(true);
    }
  });

  it('uses a Storybook group that existing stories already use', () => {
    const titles = globSync('src/**/*.stories.ts', {cwd: PKG, absolute: true})
      .flatMap((file) => [
        ...fs.readFileSync(file, 'utf8').matchAll(/^\s*title: '([^/']+)\//gm),
      ])
      .map((match) => match[1]);
    const used = new Set(titles);
    for (const family of Object.values(FAMILIES)) {
      expect(used.has(family.group), family.group).toBe(true);
    }
  });

  it('places a ui and an application component in the same directory', () => {
    expect(componentDir(spec({type: 'ui'}))).toBe('components/thruster-dial');
    expect(componentDir(spec({type: 'application'}))).toBe(
      'components/thruster-dial'
    );
  });
});

describe('renderComponent', () => {
  it('carries exactly one lifecycle tag, and it is the one asked for', () => {
    for (const lifecycle of [
      'stable',
      'beta',
      'experimental',
      'deprecated',
    ] as Lifecycle[]) {
      const source = renderFiles(spec({lifecycle}))[
        'components/thruster-dial/thruster-dial.ts'
      ];
      expect(extractComponents(source)).toMatchObject([
        {tag: 'obc-thruster-dial', tags: [lifecycle]},
      ]);
    }
  });

  it('drops the stylesheet import when css is not wanted', () => {
    const files = renderFiles(spec({hasCss: false}));
    const source = files['components/thruster-dial/thruster-dial.ts'];
    expect(source).not.toContain('unsafeCSS');
    expect(source).not.toContain('.css?inline');
    expect(files).not.toHaveProperty(
      'components/thruster-dial/thruster-dial.css'
    );
  });
});

describe('storyTags', () => {
  it('derives the lifecycle entry from the class tag, and omits it for stable', () => {
    expect(storyTags(spec({lifecycle: 'experimental'}))).toEqual([
      'autodocs',
      '6.1',
      'experimental',
    ]);
    expect(storyTags(spec({lifecycle: 'stable'}))).toEqual(['autodocs', '6.1']);
  });

  it('omits the version when none was chosen', () => {
    expect(storyTags(spec({version: undefined}))).toEqual([
      'autodocs',
      'experimental',
    ]);
  });

  it('agrees with the class JSDoc the same run writes', () => {
    const current = spec({lifecycle: 'beta'});
    const files = renderFiles(current);
    const [component] = extractComponents(
      files['components/thruster-dial/thruster-dial.ts']
    );
    expect(storyTags(current)).toContain(component.tags[0]);
  });

  it('survives an apostrophe in the title', async () => {
    const story = renderStories(spec({title: "Captain's Chair"}));
    const absPath = path.join(PKG, 'src/components/thruster-dial/x.stories.ts');
    const config = await prettier.resolveConfig(absPath);
    await expect(
      prettier.format(story, {...config, filepath: absPath})
    ).resolves.toBeTypeOf('string');
    expect(story).toContain("Captain's Chair");
  });

  it('titles the story in the family group, and exports Default', () => {
    const story = renderStories(spec({type: 'application'}));
    expect(story).toContain("title: 'Application Components/Thruster Dial'");
    expect(story).toContain('export const Default: Story');
    expect(story).not.toContain('export const Primary');
  });
});

describe('generated files', () => {
  it('are already prettier-clean, so format:check passes on a fresh scaffold', async () => {
    for (const type of Object.keys(FAMILIES) as ComponentType[]) {
      for (const [hasCss, title] of [
        [true, 'Thruster Dial'],
        [false, "Captain's Chair"],
        [true, 'Say "ahead"'],
      ] as [boolean, string][]) {
        const files = renderFiles(spec({type, hasCss, title}));
        for (const [relPath, content] of Object.entries(files)) {
          if (!content.trim()) continue;
          const absPath = path.join(PKG, 'src', relPath);
          const config = await prettier.resolveConfig(absPath);
          const formatted = await prettier.format(content, {
            ...config,
            filepath: absPath,
          });
          expect(formatted, relPath).toBe(content);
        }
      }
    }
  });
});
