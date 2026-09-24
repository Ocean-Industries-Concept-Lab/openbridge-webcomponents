import {describe, expect, it} from 'vitest';
import {maskCssComments} from './css/comments.js';

const OPEN = '/' + '*';
const CLOSE = '*' + '/';

describe('maskCssComments', () => {
  it('blanks a comment without moving anything after it', () => {
    const css = `.a {} ${OPEN} @define-mixin ghost ${CLOSE} .b {}`;
    const masked = maskCssComments(css);

    expect(masked).not.toContain('@define-mixin');
    expect(masked.length).toBe(css.length);
    expect(masked.indexOf('.b')).toBe(css.indexOf('.b'));
  });

  it('keeps the line breaks of a multi-line comment', () => {
    const css = `.a {}\n${OPEN} one\n two ${CLOSE}\n.b {}`;
    const masked = maskCssComments(css);

    expect(masked.split('\n')).toHaveLength(4);
    expect(masked.split('\n')[3]).toBe('.b {}');
  });

  it('leaves a comment opener inside a quoted value alone', () => {
    const css = [
      `.a { content: "${OPEN}"; }`,
      '@define-mixin real $wrapper {}',
      `${OPEN} a note ${CLOSE}`,
    ].join('\n');

    expect(maskCssComments(css)).toContain('@define-mixin real');
  });

  it('handles single quotes and an escaped quote', () => {
    const css = [
      `.a { content: '${OPEN}'; }`,
      `.b { content: "\\"${OPEN}"; }`,
      '@define-mixin real $wrapper {}',
      `${OPEN} a note ${CLOSE}`,
    ].join('\n');

    expect(maskCssComments(css)).toContain('@define-mixin real');
  });

  it('blanks an unterminated comment to the end of the file', () => {
    const css = `.a {}\n${OPEN} @mixin ghost\n@mixin also-ghost`;

    expect(maskCssComments(css)).not.toContain('@mixin');
  });
});
