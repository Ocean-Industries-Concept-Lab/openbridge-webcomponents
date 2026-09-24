/**
 * @module CssMask
 * @description
 * Text masking for the CSS audits (`check-css-mixins.ts`,
 * `check-css-variables.ts`). They match raw text, so without this a mixin or a
 * variable named in a comment or in a quoted value counts as a real definition
 * or usage.
 */

function blank(text: string): string {
  return text.replace(/[^\n]/g, ' ');
}

/**
 * Replaces everything a CSS parser would not read as code — comments, and the
 * text inside quoted values — with spaces.
 *
 * The result has the same length and the same line breaks as the input, so an
 * index into it still points at the right line of the original file.
 *
 * Both halves matter to an audit that greps for a name. A comment opener
 * inside `content: "…"` is ordinary text, and taking it for the start of a
 * comment would blank out every declaration up to the next comment end — a
 * definition among them turns its real usages into "used but undefined". A
 * name inside that same quoted value is ordinary text too, and counting it as
 * a usage fails the build for a mixin nobody called.
 */
export function maskCssText(css: string): string {
  let out = '';
  let index = 0;

  while (index < css.length) {
    const char = css[index];

    if (char === '/' && css[index + 1] === '*') {
      const commentEnd = css.indexOf('*/', index + 2);
      const stop = commentEnd === -1 ? css.length : commentEnd + 2;
      out += blank(css.slice(index, stop));
      index = stop;
      continue;
    }

    if (char === '"' || char === "'") {
      let end = index + 1;
      while (end < css.length) {
        if (css[end] === '\\') {
          end += 2;
          continue;
        }
        // CSS strings do not span lines, so a newline ends an unterminated one.
        if (css[end] === char || css[end] === '\n') {
          break;
        }
        end += 1;
      }
      const closed = css[end] === char;
      out += char + blank(css.slice(index + 1, end)) + (closed ? char : '');
      index = closed ? end + 1 : end;
      continue;
    }

    out += char;
    index += 1;
  }

  return out;
}
