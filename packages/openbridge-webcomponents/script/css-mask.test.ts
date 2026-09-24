import {describe, expect, it} from 'vitest';
import {maskCssText} from './css/mask.js';

const OPEN = '/' + '*';
const CLOSE = '*' + '/';

describe('maskCssText', () => {
  it('blanks a comment without moving anything after it', () => {
    const css = `.a {} ${OPEN} @define-mixin ghost ${CLOSE} .b {}`;
    const masked = maskCssText(css);

    expect(masked).not.toContain('@define-mixin');
    expect(masked.length).toBe(css.length);
    expect(masked.indexOf('.b')).toBe(css.indexOf('.b'));
  });

  it('keeps the line breaks of a multi-line comment', () => {
    const css = `.a {}\n${OPEN} one\n two ${CLOSE}\n.b {}`;
    const masked = maskCssText(css);

    expect(masked.split('\n')).toHaveLength(4);
    expect(masked.split('\n')[3]).toBe('.b {}');
  });

  it('blanks an unterminated comment to the end of the file', () => {
    const css = `.a {}\n${OPEN} @mixin ghost\n@mixin also-ghost`;

    expect(maskCssText(css)).not.toContain('@mixin');
  });

  it('leaves a comment opener inside a quoted value alone', () => {
    const css = [
      `.a { content: "${OPEN}"; }`,
      '@define-mixin real $wrapper {}',
      `${OPEN} a note ${CLOSE}`,
    ].join('\n');

    expect(maskCssText(css)).toContain('@define-mixin real');
  });

  it('blanks a name inside a quoted value, keeping the quotes', () => {
    const inner = '@mixin ghost --ghost-token: 1';
    const css = `.a { content: "${inner}"; }`;
    const masked = maskCssText(css);

    expect(masked).not.toContain('@mixin');
    expect(masked).not.toContain('--ghost-token');
    expect(masked).toBe(`.a { content: "${' '.repeat(inner.length)}"; }`);
  });

  it('handles single quotes and an escaped quote', () => {
    const css = [
      `.a { content: '@mixin ghost'; }`,
      `.b { content: "\\"@mixin ghost"; }`,
      '@define-mixin real $wrapper {}',
    ].join('\n');
    const masked = maskCssText(css);

    expect(masked).not.toContain('@mixin ghost');
    expect(masked).toContain('@define-mixin real');
  });

  it('keeps a line break inside a continued string', () => {
    const css = `.a { content: "@mixin\\\nghost"; }\n.b {}`;
    const masked = maskCssText(css);

    expect(masked).not.toContain('@mixin');
    expect(masked.split('\n')).toHaveLength(3);
    expect(masked.split('\n')[2]).toBe('.b {}');
  });
});
