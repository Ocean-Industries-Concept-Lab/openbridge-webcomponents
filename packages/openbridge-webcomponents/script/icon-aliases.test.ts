import {describe, expect, it} from 'vitest';
import {
  RENAMED_ICONS,
  planRenamedIconAliases,
  renamedIconAlias,
} from './icon-aliases.js';

describe('renamedIconAlias', () => {
  const source = renamedIconAlias('log-open-google', 'log-open');

  it('registers the old tag on a subclass of the current icon', () => {
    expect(source).toContain("@customElement('obi-log-open-google')");
    expect(source).toContain(
      'export class ObiLogOpenGoogle extends ObiLogOpen {}'
    );
    expect(source).toContain("import {ObiLogOpen} from './icon-log-open.js';");
  });

  it('marks the alias deprecated and names its replacement', () => {
    expect(source).toContain('@deprecated');
    expect(source).toContain('`<obi-log-open>`');
  });

  it('declares the tag so TypeScript resolves it', () => {
    expect(source).toContain("'obi-log-open-google': ObiLogOpenGoogle;");
  });

  it('upper-camel-cases every segment, digits included', () => {
    expect(renamedIconAlias('wind-true-10-old', 'wind-true-10')).toContain(
      'export class ObiWindTrue10Old extends ObiWindTrue10 {}'
    );
  });
});

describe('RENAMED_ICONS', () => {
  it('points every old name at a different, current one', () => {
    for (const [from, to] of Object.entries(RENAMED_ICONS)) {
      expect(from).not.toBe(to);
      expect(RENAMED_ICONS[to]).toBeUndefined();
    }
  });
});

describe('planRenamedIconAliases', () => {
  it('pairs every entry with the icon it extends', () => {
    expect(
      planRenamedIconAliases(['log-open', 'timer', 'anchor'], {
        'log-open-google': 'log-open',
        'timer-google': 'timer',
      })
    ).toEqual([
      {oldName: 'log-open-google', currentName: 'log-open'},
      {oldName: 'timer-google', currentName: 'timer'},
    ]);
  });

  it('fails when the export has no icon under the current name', () => {
    expect(() =>
      planRenamedIconAliases(['timer'], {'log-open-google': 'log-open'})
    ).toThrow(/obi-log-open, which this export does not have/);
  });

  it('fails when the export carries the old name again', () => {
    expect(() =>
      planRenamedIconAliases(['log-open', 'log-open-google'], {
        'log-open-google': 'log-open',
      })
    ).toThrow(/carries obi-log-open-google again/);
  });

  it('plans the committed map against the generated set', () => {
    const generated = Object.values(RENAMED_ICONS);
    expect(planRenamedIconAliases(generated, RENAMED_ICONS)).toHaveLength(
      Object.keys(RENAMED_ICONS).length
    );
  });
});
