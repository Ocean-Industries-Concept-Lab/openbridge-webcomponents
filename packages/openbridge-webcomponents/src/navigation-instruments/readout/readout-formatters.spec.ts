import {describe, it, expect} from 'vitest';
import {
  assertReadoutValueType,
  assertReadoutFractionDigits,
  isReadoutDigitCountMissing,
  resolveReadoutDigitCount,
  READOUT_MAX_DIGITS,
  resolveReadoutNumericValue,
  resolveReadoutTextValue,
  formatNumericValue,
  isReadoutValueType,
  splitHintedValue,
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

  // `.value=${undefined}` reaches the property uncoerced, so an unset value must
  // read exactly like an explicit `null` — both are "no reading".
  it('treats undefined and null identically', () => {
    expect(resolveReadoutNumericValue(undefined, ReadoutValueType.number)).toBe(
      resolveReadoutNumericValue(null, ReadoutValueType.number)
    );
    expect(resolveReadoutTextValue(undefined, ReadoutValueType.text)).toBe(
      resolveReadoutTextValue(null, ReadoutValueType.text)
    );
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

  // `formatNumericValue` is exported, so it must hold the line itself rather
  // than trusting every caller to have normalised first — `NaN.toFixed()`
  // would otherwise put the literal text "NaN" where a reading belongs.
  it('treats a non-finite argument as unavailable without normalisation', () => {
    expect(formatNumericValue(Number.NaN, opts(3, 2))).toBe(`${D}.${D}${D}`);
    expect(formatNumericValue(Number.POSITIVE_INFINITY, opts(3, 2))).toBe(
      `${D}.${D}${D}`
    );
    expect(formatNumericValue(Number.NEGATIVE_INFINITY, opts(3, 2))).toBe(
      `${D}.${D}${D}`
    );
  });

  it('still formats a finite value', () => {
    expect(formatNumericValue(12.3, opts(3, 2))).toBe('12.30');
    expect(formatNumericValue(0, opts(0, 0))).toBe('0');
    expect(formatNumericValue(-4.5, opts(3, 1))).toBe('-4.5');
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

describe('assertReadoutFractionDigits', () => {
  // `fractionDigits` reaches `Number.prototype.toFixed` unchanged, which throws
  // outside 0…100. These are the values that already crash today, now reported
  // against the component instead of as a bare RangeError.
  it('throws below 0 and above the maximum', () => {
    expect(() => assertReadoutFractionDigits('obc-readout', -1)).toThrow(
      RangeError
    );
    expect(() =>
      assertReadoutFractionDigits('obc-readout', READOUT_MAX_DIGITS + 1)
    ).toThrow(RangeError);
    expect(() =>
      assertReadoutFractionDigits('obc-readout', Number.POSITIVE_INFINITY)
    ).toThrow(RangeError);
  });

  it('names the component and the offending value', () => {
    expect(() =>
      assertReadoutFractionDigits('obc-readout-list-item', -1)
    ).toThrow(/obc-readout-list-item.*between 0 and 100.*-1/s);
  });

  // `JSON.stringify` serialises these to `null`, which would hide the very
  // value being rejected.
  it('reports non-finite values verbatim in the message', () => {
    expect(() =>
      assertReadoutFractionDigits('obc-readout', Number.POSITIVE_INFINITY)
    ).toThrow(/got Infinity/);
    expect(() =>
      assertReadoutFractionDigits('obc-readout', Number.NEGATIVE_INFINITY)
    ).toThrow(/got -Infinity/);
  });

  // The components read `fractionDigits ?? 0` and `toFixed(undefined)` behaves
  // as `toFixed(0)`, so clearing the property must not throw.
  it('accepts an unset value', () => {
    expect(() =>
      assertReadoutFractionDigits('obc-readout', undefined as unknown as number)
    ).not.toThrow();
    expect(() =>
      assertReadoutFractionDigits('obc-readout', null as unknown as number)
    ).not.toThrow();
  });

  it('accepts the whole supported range', () => {
    expect(() => assertReadoutFractionDigits('obc-readout', 0)).not.toThrow();
    expect(() =>
      assertReadoutFractionDigits('obc-readout', READOUT_MAX_DIGITS)
    ).not.toThrow();
  });

  // Values `toFixed` itself tolerates are left alone rather than rejected.
  it('tolerates what toFixed tolerates', () => {
    expect(() => assertReadoutFractionDigits('obc-readout', 2.7)).not.toThrow();
    expect(() =>
      assertReadoutFractionDigits('obc-readout', Number.NaN)
    ).not.toThrow();
  });

  // The assertion must agree with the runtime it is protecting.
  it('accepts exactly the values toFixed accepts', () => {
    // Covers both sides of the boundary, including the truncation cases the
    // instruction file documents: 100.9 -> 100 and -0.5 -> -0 are accepted,
    // while -1, 101 and the infinities are not.
    for (const digits of [
      0,
      1,
      2.7,
      -0.5,
      100.9,
      Number.NaN,
      undefined,
      null,
      READOUT_MAX_DIGITS,
      -1,
      READOUT_MAX_DIGITS + 1,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ] as number[]) {
      let assertionThrew = false;
      let toFixedThrew = false;
      try {
        assertReadoutFractionDigits('obc-readout', digits);
      } catch {
        assertionThrew = true;
      }
      try {
        (12.3).toFixed(digits);
      } catch {
        toFixedThrew = true;
      }
      expect(assertionThrew).toBe(toFixedThrew);
    }
  });
});

describe('resolveReadoutDigitCount', () => {
  it('passes a usable count through', () => {
    expect(resolveReadoutDigitCount(4)).toBe(4);
    expect(resolveReadoutDigitCount(0)).toBe(0);
  });

  // `Infinity` is the value that throws out of `String.prototype.repeat`.
  it('caps Infinity rather than throwing', () => {
    expect(resolveReadoutDigitCount(Number.POSITIVE_INFINITY)).toBe(
      READOUT_MAX_DIGITS
    );
    expect(() =>
      '0'.repeat(resolveReadoutDigitCount(Number.POSITIVE_INFINITY))
    ).not.toThrow();
  });

  it('caps a large finite count so the reserver stays bounded', () => {
    expect(resolveReadoutDigitCount(1_000_000)).toBe(READOUT_MAX_DIGITS);
  });

  // Matches what the existing guards already did with these: reserve nothing.
  it('is 0 for negative, NaN, null and undefined', () => {
    expect(resolveReadoutDigitCount(-5)).toBe(0);
    expect(resolveReadoutDigitCount(Number.NEGATIVE_INFINITY)).toBe(0);
    expect(resolveReadoutDigitCount(Number.NaN)).toBe(0);
    expect(resolveReadoutDigitCount(null)).toBe(0);
    expect(resolveReadoutDigitCount(undefined)).toBe(0);
  });

  it('truncates a fractional count', () => {
    expect(resolveReadoutDigitCount(2.7)).toBe(2);
  });

  // Whatever comes back must be safe to hand to `repeat`.
  it('always returns a count repeat() accepts', () => {
    for (const input of [
      -5,
      0,
      2.7,
      4,
      1_000_000,
      Number.NaN,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ]) {
      expect(() => '0'.repeat(resolveReadoutDigitCount(input))).not.toThrow();
    }
  });
});

describe('isReadoutDigitCountMissing', () => {
  // The third contract besides throw and clamp: a knob that never arrived is
  // a runtime data condition, and the reading renders as the dash rather than
  // silently formatting with a default the author never chose.
  it('is true for NaN, null and undefined', () => {
    expect(isReadoutDigitCountMissing(Number.NaN)).toBe(true);
    expect(isReadoutDigitCountMissing(null)).toBe(true);
    expect(isReadoutDigitCountMissing(undefined)).toBe(true);
  });

  // A number that ARRIVED wrong is a different contract: out-of-range
  // `fractionDigits` throws (`assertReadoutFractionDigits`), out-of-range
  // `maxDigits` clamps (`resolveReadoutDigitCount`). Neither is "missing".
  it('is false for any number that arrived, however wrong', () => {
    expect(isReadoutDigitCountMissing(0)).toBe(false);
    expect(isReadoutDigitCountMissing(2)).toBe(false);
    expect(isReadoutDigitCountMissing(2.7)).toBe(false);
    expect(isReadoutDigitCountMissing(-1)).toBe(false);
    expect(isReadoutDigitCountMissing(101)).toBe(false);
    expect(isReadoutDigitCountMissing(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isReadoutDigitCountMissing(Number.NEGATIVE_INFINITY)).toBe(false);
  });
});

// The review that introduced this: a system writing `fractionDigits` at
// runtime can fail and produce `NaN` — `toFixed(NaN)` then formats with zero
// decimals, so a critical `0.4` prints as a plausible-looking `0` and an
// operator cannot tell the readout is broken. The dash makes it visible.
describe('formatNumericValue — missing precision', () => {
  const opts = (fractionDigits: number) => ({
    showZeroPadding: false,
    minValueLength: 3,
    fractionDigits,
  });
  const D = READOUT_UNAVAILABLE_DASH;

  it('renders the dash, not a zero-decimal number', () => {
    expect(formatNumericValue(0.4, opts(Number.NaN))).toBe(D);
    expect(formatNumericValue(12.3, opts(Number.NaN))).toBe(D);
  });

  // Regression: `NaN < 1` is false, so the placeholder generator used to fall
  // into its fraction branch where both `repeat(NaN)` calls produce '', and
  // an unavailable value with a missing precision degenerated to a lone ".".
  it('shapes the placeholder as zero fraction digits, not a lone dot', () => {
    expect(formatNumericValue(undefined, opts(Number.NaN))).toBe(D);
    expect(formatNumericValue(undefined, opts(Number.NaN))).not.toBe('.');
  });

  it('still formats normally with a precision that arrived', () => {
    expect(formatNumericValue(0.4, opts(1))).toBe('0.4');
    expect(formatNumericValue(12.3, opts(2))).toBe('12.30');
  });
});

describe('splitHintedValue', () => {
  // Rendered width = sign + hinted + magnitude; it must not change across zero.
  const width = (v: string, maxDigits: number) => {
    const {sign, hinted, magnitude} = splitHintedValue(v, maxDigits);
    return (sign + hinted + magnitude).length;
  };

  it('pads a positive value to maxDigits', () => {
    expect(splitHintedValue('12', 4)).toEqual({
      sign: '',
      hinted: '00',
      magnitude: '12',
    });
  });

  // The bug this fixes: the sign must come out separately, so the caller can
  // render it BEFORE the muted zeros ("-012", never "00-12").
  it('hoists the sign of a negative value out of the magnitude', () => {
    expect(splitHintedValue('-12', 4)).toEqual({
      sign: '-',
      hinted: '0',
      magnitude: '12',
    });
  });

  it('lets the sign consume the leading zero so width is unchanged', () => {
    expect(width('12', 4)).toBe(width('-12', 4));
    expect(width('8', 4)).toBe(width('-8', 4));
    expect(width('1.2', 3)).toBe(width('-1.2', 3));
  });

  it('counts only integer digits, ignoring the fraction', () => {
    expect(splitHintedValue('1.2', 3)).toEqual({
      sign: '',
      hinted: '00',
      magnitude: '1.2',
    });
    expect(splitHintedValue('-1.2', 3)).toEqual({
      sign: '-',
      hinted: '0',
      magnitude: '1.2',
    });
  });

  it('emits no zeros when the magnitude already fills maxDigits', () => {
    expect(splitHintedValue('1234', 4).hinted).toBe('');
    expect(splitHintedValue('-1234', 4).hinted).toBe('');
  });

  // No zero is left for the sign to consume, so a negative overflows by one —
  // consumers reserve a sign column via spaceReserver (e.g. "-0000").
  it('is one wider than the reserve for a negative at full magnitude', () => {
    expect(width('-1234', 4)).toBe(5);
    expect(width('1234', 4)).toBe(4);
  });

  // Without the digit guard the leading `-` would be read as a sign and padded
  // to "-000". render() also never hints an unavailable value, but the helper
  // must not be able to produce that on its own.
  it('passes a dashed (unavailable) value through unpadded', () => {
    expect(splitHintedValue('-', 4)).toEqual({
      sign: '',
      hinted: '',
      magnitude: '-',
    });
    expect(splitHintedValue('--.-', 4)).toEqual({
      sign: '',
      hinted: '',
      magnitude: '--.-',
    });
  });

  it('handles maxDigits of 0', () => {
    expect(splitHintedValue('12', 0).hinted).toBe('');
    expect(splitHintedValue('-12', 0).hinted).toBe('');
  });
});
