import {describe, it, expect} from 'vitest';
import {
  assertReadoutValueType,
  resolveReadoutNumericValue,
  resolveReadoutTextValue,
  formatNumericValue,
  isReadoutValueType,
  ReadoutValueType,
  READOUT_UNAVAILABLE_DASH,
} from './readout-formatters.js';

describe('assertReadoutValueType', () => {
  it('accepts a number when valueType is number', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', 12.4, ReadoutValueType.number)
    ).not.toThrow();
  });

  it('accepts null when valueType is number', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', null, ReadoutValueType.number)
    ).not.toThrow();
  });

  // HTML attributes are always strings, so `<obc-readout value="12.4">` must
  // keep working under the default valueType.
  it('accepts a numeric-looking string when valueType is number', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', '12.4', ReadoutValueType.number)
    ).not.toThrow();
  });

  it('accepts a negative numeric string when valueType is number', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', '-12.4', ReadoutValueType.number)
    ).not.toThrow();
  });

  // `value="${maybeUndefined}"` is a common template shape, and Number('') is
  // 0 — a silently wrong reading, which is worse than a dash.
  it('accepts a blank string when valueType is number', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', '', ReadoutValueType.number)
    ).not.toThrow();
    expect(() =>
      assertReadoutValueType('obc-readout', '   ', ReadoutValueType.number)
    ).not.toThrow();
  });

  it('throws for text when valueType is number', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', 'Auto', ReadoutValueType.number)
    ).toThrow(TypeError);
  });

  it('names the offending tag and value in the message', () => {
    expect(() =>
      assertReadoutValueType(
        'obc-readout-list-item',
        'Thermo On',
        ReadoutValueType.number
      )
    ).toThrow(/obc-readout-list-item.*Thermo On.*valueType="text"/s);
  });

  it('throws for a partially numeric string when valueType is number', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', '12.4 kn', ReadoutValueType.number)
    ).toThrow(TypeError);
  });

  it('never throws when valueType is text', () => {
    expect(() =>
      assertReadoutValueType('obc-readout', 'Auto', ReadoutValueType.text)
    ).not.toThrow();
    expect(() =>
      assertReadoutValueType('obc-readout', 12.4, ReadoutValueType.text)
    ).not.toThrow();
  });

  // An attribute carries an unchecked string, so a typo matches neither mode.
  // Without this it falls through every check and silently renders a dash.
  it('throws for an unrecognised valueType', () => {
    expect(() =>
      assertReadoutValueType(
        'obc-readout',
        'Auto',
        'strng' as unknown as ReadoutValueType
      )
    ).toThrow(/valueType must be "number" or "text".*"strng"/s);
  });

  it('throws for an unrecognised valueType even with a numeric value', () => {
    expect(() =>
      assertReadoutValueType(
        'obc-readout',
        12.4,
        'STRING' as unknown as ReadoutValueType
      )
    ).toThrow(TypeError);
  });

  // undefined/null mean "use the default", so they must still enforce the
  // number contract rather than skipping validation entirely.
  it('treats an unset valueType as number', () => {
    expect(() =>
      assertReadoutValueType(
        'obc-readout',
        'Auto',
        undefined as unknown as ReadoutValueType
      )
    ).toThrow(TypeError);
    expect(() =>
      assertReadoutValueType(
        'obc-readout',
        12.4,
        undefined as unknown as ReadoutValueType
      )
    ).not.toThrow();
  });
});

describe('isReadoutValueType', () => {
  it('accepts the supported values', () => {
    expect(isReadoutValueType('number')).toBe(true);
    expect(isReadoutValueType('text')).toBe(true);
  });

  it('rejects anything else', () => {
    // `string` names the JS type rather than the mode, and is the likely
    // mistake for anyone reaching for the TypeScript word.
    expect(isReadoutValueType('string')).toBe(false);
    expect(isReadoutValueType('strng')).toBe(false);
    expect(isReadoutValueType('Number')).toBe(false);
    expect(isReadoutValueType('')).toBe(false);
    expect(isReadoutValueType(undefined)).toBe(false);
    expect(isReadoutValueType(null)).toBe(false);
    expect(isReadoutValueType(0)).toBe(false);
  });
});

describe('resolveReadoutNumericValue', () => {
  it('passes a number through unchanged', () => {
    expect(resolveReadoutNumericValue(12.4, ReadoutValueType.number)).toBe(
      12.4
    );
  });

  it('parses a numeric string', () => {
    expect(resolveReadoutNumericValue('12.4', ReadoutValueType.number)).toBe(
      12.4
    );
  });

  it('is undefined for null, undefined and blank strings', () => {
    expect(
      resolveReadoutNumericValue(null, ReadoutValueType.number)
    ).toBeUndefined();
    expect(
      resolveReadoutNumericValue(undefined, ReadoutValueType.number)
    ).toBeUndefined();
    expect(
      resolveReadoutNumericValue('', ReadoutValueType.number)
    ).toBeUndefined();
    expect(
      resolveReadoutNumericValue('  ', ReadoutValueType.number)
    ).toBeUndefined();
  });

  it('is undefined for non-numeric text', () => {
    expect(
      resolveReadoutNumericValue('Auto', ReadoutValueType.number)
    ).toBeUndefined();
  });

  // Text rows must contribute nothing to obc-readout-list's shared reserver.
  it('is undefined in text mode even for a numeric value', () => {
    expect(
      resolveReadoutNumericValue(12.4, ReadoutValueType.text)
    ).toBeUndefined();
    expect(
      resolveReadoutNumericValue('12.4', ReadoutValueType.text)
    ).toBeUndefined();
  });

  // A non-finite number is unavailable, not a reading: `toFixed` would render
  // the literal text "NaN" / "Infinity" in place of a value.
  it('is undefined for a non-finite number', () => {
    expect(
      resolveReadoutNumericValue(Number.NaN, ReadoutValueType.number)
    ).toBeUndefined();
    expect(
      resolveReadoutNumericValue(
        Number.POSITIVE_INFINITY,
        ReadoutValueType.number
      )
    ).toBeUndefined();
    expect(
      resolveReadoutNumericValue(
        Number.NEGATIVE_INFINITY,
        ReadoutValueType.number
      )
    ).toBeUndefined();
  });

  // Before this, the same logical input resolved differently depending on how
  // it was bound: `<obc-readout value="NaN">` (attribute → string) gave a dash,
  // while `.value=${NaN}` (property → number) gave the literal text "NaN".
  it('resolves a non-finite value identically as a number and as a string', () => {
    expect(
      resolveReadoutNumericValue(Number.NaN, ReadoutValueType.number)
    ).toBe(resolveReadoutNumericValue('NaN', ReadoutValueType.number));
    expect(
      resolveReadoutNumericValue(
        Number.POSITIVE_INFINITY,
        ReadoutValueType.number
      )
    ).toBe(resolveReadoutNumericValue('Infinity', ReadoutValueType.number));
  });
});

describe('resolveReadoutTextValue', () => {
  it('returns the text verbatim in text mode', () => {
    expect(resolveReadoutTextValue('Thermo On', ReadoutValueType.text)).toBe(
      'Thermo On'
    );
  });

  // The reason a converter was rejected: it would have parsed this to 1.5.
  it('preserves trailing zeros in text mode', () => {
    expect(resolveReadoutTextValue('1.50', ReadoutValueType.text)).toBe('1.50');
  });

  it('coerces a number to text in text mode', () => {
    expect(resolveReadoutTextValue(12.4, ReadoutValueType.text)).toBe('12.4');
  });

  it('is undefined for null, undefined and blank strings', () => {
    expect(
      resolveReadoutTextValue(null, ReadoutValueType.text)
    ).toBeUndefined();
    expect(
      resolveReadoutTextValue(undefined, ReadoutValueType.text)
    ).toBeUndefined();
    expect(resolveReadoutTextValue('', ReadoutValueType.text)).toBeUndefined();
    expect(
      resolveReadoutTextValue('   ', ReadoutValueType.text)
    ).toBeUndefined();
  });

  it('is undefined in number mode', () => {
    expect(
      resolveReadoutTextValue('12.4', ReadoutValueType.number)
    ).toBeUndefined();
    expect(
      resolveReadoutTextValue(12.4, ReadoutValueType.number)
    ).toBeUndefined();
  });
});

describe('formatNumericValue — unavailable value', () => {
  const opts = (minValueLength: number, fractionDigits: number) => ({
    showZeroPadding: false,
    minValueLength,
    fractionDigits,
  });
  const D = READOUT_UNAVAILABLE_DASH;

  // U+2012 FIGURE DASH, not the ASCII hyphen. It is defined to be digit-width,
  // so the placeholder's decimal point and fraction positions line up with the
  // reading it replaces; measured in Noto Sans, a digit and U+2012 are both
  // 13.02px while U+002D is 7.02px. `tabular-nums` does not fix this — it
  // equalises figures with each other and leaves punctuation alone.
  it('uses the digit-width figure dash, not a hyphen', () => {
    expect(D).toBe('\u2012');
    expect(formatNumericValue(undefined, opts(0, 0))).not.toContain('-');
  });

  // Deliberately short: `maxDigits` reserves the width, so the placeholder sits
  // at the right edge of it rather than spelling out every reserved position.
  it('is one integer dash plus one per fraction digit', () => {
    expect(formatNumericValue(undefined, opts(0, 0))).toBe(D);
    expect(formatNumericValue(undefined, opts(0, 2))).toBe(`${D}.${D}${D}`);
    expect(formatNumericValue(undefined, opts(3, 2))).toBe(`${D}.${D}${D}`);
  });

  it('does not grow with maxDigits', () => {
    expect(formatNumericValue(undefined, opts(4, 3))).toBe(
      formatNumericValue(undefined, opts(0, 3))
    );
  });

  // The whole point of routing non-finite numbers through the same path.
  it('renders a non-finite number as the unavailable dash', () => {
    const resolved = resolveReadoutNumericValue(
      Number.NaN,
      ReadoutValueType.number
    );
    expect(formatNumericValue(resolved, opts(4, 1))).toBe(`${D}.${D}`);
  });
});

// The designer's specification, verbatim:
//   format: 000.00
//   readout: 12.30
//   readout with hinted: 012.30  (hinted colour on the first zero)
//   Not available: -.--   (revised in review from ---.--)
// `format: 000.00` is maxDigits 3 + fractionDigits 2.
describe("designer's format specification (000.00)", () => {
  const MAX_DIGITS = 3;
  const FRACTION_DIGITS = 2;
  const opts = {
    showZeroPadding: false,
    minValueLength: MAX_DIGITS,
    fractionDigits: FRACTION_DIGITS,
  };

  it('renders a reading as 12.30', () => {
    expect(formatNumericValue(12.3, opts)).toBe('12.30');
  });

  // The specification's hinted line (`012.30`) is covered by the hinted-zeros
  // change, not here — this PR only owns the unavailable placeholder. The
  // rendered hinted case is still shown in the story for the designer.

  it('renders an unavailable value as -.-- (short form)', () => {
    expect(formatNumericValue(undefined, opts)).toBe(
      `${READOUT_UNAVAILABLE_DASH}.${READOUT_UNAVAILABLE_DASH}${READOUT_UNAVAILABLE_DASH}`
    );
  });

  // The placeholder is deliberately shorter than the reading now; `maxDigits`
  // reserves the width, so it right-aligns inside it instead of filling it.
  it('is shorter than the reading, sitting at the right of the reserve', () => {
    expect(formatNumericValue(undefined, opts).length).toBeLessThan(
      '012.30'.length
    );
  });
});
