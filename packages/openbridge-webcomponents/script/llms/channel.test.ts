import {describe, expect, it} from 'vitest';
import {
  CORE_PACKAGE,
  rawUrl,
  resolveChannel,
  siteUrl,
  unpkgUrl,
} from './channel.js';

describe('resolveChannel', () => {
  it('flag wins over env', () => {
    expect(
      resolveChannel('latest', {
        LLMS_CHANNEL: 'next',
        GITHUB_REF_NAME: 'develop',
      }).name
    ).toBe('latest');
  });

  it('LLMS_CHANNEL wins over GITHUB_REF_NAME', () => {
    expect(
      resolveChannel(undefined, {
        LLMS_CHANNEL: 'latest',
        GITHUB_REF_NAME: 'develop',
      }).name
    ).toBe('latest');
  });

  it('stable ref means latest', () => {
    expect(resolveChannel(undefined, {GITHUB_REF_NAME: 'stable'})).toEqual({
      name: 'latest',
      site: 'https://openbridge-storybook.web.app',
      npmTag: 'latest',
      gitRef: 'stable',
    });
  });

  it('defaults to next', () => {
    expect(resolveChannel(undefined, {})).toEqual({
      name: 'next',
      site: 'https://openbridge-next-storybook.web.app',
      npmTag: 'next',
      gitRef: 'develop',
    });
  });

  it('rejects an unknown channel', () => {
    expect(() => resolveChannel('beta', {})).toThrow(/next|latest/);
    expect(() => resolveChannel(undefined, {LLMS_CHANNEL: 'beta'})).toThrow(
      /next|latest/
    );
  });
});

describe('urls', () => {
  const ch = resolveChannel('next', {});

  it('builds the three url shapes', () => {
    expect(rawUrl(ch, 'docs/graph.md')).toBe(
      'https://raw.githubusercontent.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/develop/docs/graph.md'
    );
    expect(unpkgUrl(ch, CORE_PACKAGE, 'README.md')).toBe(
      'https://unpkg.com/@oicl/openbridge-webcomponents@next/README.md'
    );
    expect(siteUrl(ch, '/llms.txt')).toBe(
      'https://openbridge-next-storybook.web.app/llms.txt'
    );
  });
});
