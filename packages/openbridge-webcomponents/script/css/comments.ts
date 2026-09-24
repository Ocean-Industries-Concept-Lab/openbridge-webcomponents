/**
 * @module CssComments
 * @description
 * Comment masking for the CSS audits (`check-css-mixins.ts`,
 * `check-css-variables.ts`). They match raw text, so without this a mixin or a
 * variable named in a comment counts as a real definition or usage.
 */

/**
 * Replaces every CSS block comment with spaces.
 *
 * The result has the same length and the same line breaks as the input, so an
 * index into it still points at the right line of the original file.
 *
 * Quoted values are copied through: a comment opener inside `content: "…"` is
 * ordinary text, and taking it for the start of a comment would blank out
 * every declaration between it and the next comment end — a definition among
 * them turns its real usages into "used but undefined".
 */
export function maskCssComments(css: string): string {
  let out = '';
  let index = 0;
  let quote: string | null = null;

  while (index < css.length) {
    const char = css[index];

    if (quote) {
      if (char === '\\') {
        out += css.slice(index, index + 2);
        index += 2;
        continue;
      }
      // CSS strings do not span lines, so a newline ends an unterminated one.
      if (char === quote || char === '\n') {
        quote = null;
      }
      out += char;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      out += char;
      index += 1;
      continue;
    }

    if (char === '/' && css[index + 1] === '*') {
      const end = css.indexOf('*/', index + 2);
      const stop = end === -1 ? css.length : end + 2;
      out += css.slice(index, stop).replace(/[^\n]/g, ' ');
      index = stop;
      continue;
    }

    out += char;
    index += 1;
  }

  return out;
}
