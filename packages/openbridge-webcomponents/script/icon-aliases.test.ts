import {describe, expect, it} from 'vitest';
import {RENAMED_ICONS, renamedIconAlias} from './icon-aliases.js';

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
