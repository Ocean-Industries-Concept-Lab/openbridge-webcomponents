import {describe, it, expect} from 'vitest';
import {
  assertReadoutValueType,
  resolveReadoutNumericValue,
  resolveReadoutTextValue,
  formatNumericValue,
  isReadoutValueType,
  ReadoutValueType,
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
    showZeroPadding: true,
    minValueLength,
    fractionDigits,
  });

  // One dash per reserved digit position, so the placeholder takes the same
  // shape as the reading it stands in for.
  it('fills the reserved integer digits', () => {
    expect(formatNumericValue(undefined, opts(4, 0))).toBe('----');
  });

  // `minValueLength` counts INTEGER digits only (matching `maxDigits`); the
  // point and fraction are added on top. This previously read as a total width,
  // collapsing to '-.---' where '----.---' was reserved.
  it('adds the fraction on top of the integer digits', () => {
    expect(formatNumericValue(undefined, opts(4, 3))).toBe('----.---');
    expect(formatNumericValue(undefined, opts(3, 1))).toBe('---.-');
  });

  it('matches the width of the value it replaces', () => {
    const [maxDigits, fractionDigits] = [4, 3];
    const reserve = '0'.repeat(maxDigits) + '.' + '0'.repeat(fractionDigits);
    expect(
      formatNumericValue(undefined, opts(maxDigits, fractionDigits)).length
    ).toBe(reserve.length);
  });

  // Only the INTEGER part falls back to one dash; the fraction placeholder is
  // always kept, so this is `-.--` rather than a bare `-` at fractionDigits 2.
  it('falls back to a single integer dash when there are no digits to fill', () => {
    expect(formatNumericValue(undefined, opts(0, 0))).toBe('-');
    expect(formatNumericValue(undefined, opts(0, 2))).toBe('-.--');
  });

  it('keeps a single integer dash when padding is off', () => {
    expect(
      formatNumericValue(undefined, {
        showZeroPadding: false,
        minValueLength: 4,
        fractionDigits: 3,
      })
    ).toBe('-.---');
  });

  // The whole point of routing non-finite numbers through the same path.
  it('renders a non-finite number as the unavailable dash', () => {
    const resolved = resolveReadoutNumericValue(
      Number.NaN,
      ReadoutValueType.number
    );
    expect(formatNumericValue(resolved, opts(4, 1))).toBe('----.-');
  });
});

// The designer's specification, verbatim:
//   format: 000.00
//   readout: 12.30
//   readout with hinted: 012.30  (hinted colour on the first zero)
//   Not available: ---.--
// `format: 000.00` is maxDigits 3 + fractionDigits 2.
describe("designer's format specification (000.00)", () => {
  const MAX_DIGITS = 3;
  const FRACTION_DIGITS = 2;
  const opts = {
    showZeroPadding: true,
    minValueLength: MAX_DIGITS,
    fractionDigits: FRACTION_DIGITS,
  };

  it('renders a reading as 12.30', () => {
    expect(formatNumericValue(12.3, opts)).toBe('12.30');
  });

  // The specification's hinted line (`012.30`) is covered by the hinted-zeros
  // change, not here — this PR only owns the unavailable placeholder. The
  // rendered hinted case is still shown in the story for the designer.

  it('renders an unavailable value as ---.--', () => {
    expect(formatNumericValue(undefined, opts)).toBe('---.--');
  });

  it('gives the unavailable placeholder the same width as the reading', () => {
    expect(formatNumericValue(undefined, opts)).toHaveLength('012.30'.length);
  });
});
