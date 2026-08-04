import {describe, it, expect} from 'vitest';
import {
  assertReadoutValueType,
  resolveReadoutNumericValue,
  resolveReadoutTextValue,
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

  it('never throws when valueType is string', () => {
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
  it('is undefined in string mode even for a numeric value', () => {
    expect(
      resolveReadoutNumericValue(12.4, ReadoutValueType.text)
    ).toBeUndefined();
    expect(
      resolveReadoutNumericValue('12.4', ReadoutValueType.text)
    ).toBeUndefined();
  });

  // Pre-existing behaviour, deliberately preserved: NaN reaches the formatter.
  it('passes NaN through in number mode', () => {
    expect(
      resolveReadoutNumericValue(Number.NaN, ReadoutValueType.number)
    ).toBeNaN();
  });
});

describe('resolveReadoutTextValue', () => {
  it('returns the text verbatim in string mode', () => {
    expect(resolveReadoutTextValue('Thermo On', ReadoutValueType.text)).toBe(
      'Thermo On'
    );
  });

  // The reason a converter was rejected: it would have parsed this to 1.5.
  it('preserves trailing zeros in string mode', () => {
    expect(resolveReadoutTextValue('1.50', ReadoutValueType.text)).toBe('1.50');
  });

  it('coerces a number to text in string mode', () => {
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
