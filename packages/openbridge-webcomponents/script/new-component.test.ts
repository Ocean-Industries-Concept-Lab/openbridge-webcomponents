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
  renderStories,
  storyTags,
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
      for (const hasCss of [true, false]) {
        const files = renderFiles(spec({type, hasCss}));
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
