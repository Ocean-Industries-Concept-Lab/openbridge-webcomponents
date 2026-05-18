import {describe, it, expect} from 'vitest';
import {
  formatNumberForDisplay,
  parseNumberInput,
  valuesEqual,
} from './number-input-format.js';

describe('parseNumberInput', () => {
  it('returns NaN for empty input', () => {
    expect(Number.isNaN(parseNumberInput(''))).toBe(true);
  });

  it('parses finite numbers', () => {
    expect(parseNumberInput('10.2')).toBe(10.2);
    expect(parseNumberInput('10,2')).toBe(10.2);
  });

  it('parses trailing decimal separator as the numeric value', () => {
    expect(parseNumberInput('10.')).toBe(10);
    expect(parseNumberInput('10,')).toBe(10);
  });

  it('returns NaN for sign-only input', () => {
    expect(Number.isNaN(parseNumberInput('-'))).toBe(true);
    expect(Number.isNaN(parseNumberInput('+'))).toBe(true);
  });
});

describe('formatNumberForDisplay', () => {
  it('returns empty string for NaN', () => {
    expect(formatNumberForDisplay(NaN)).toBe('');
  });

  it('formats finite numbers as strings', () => {
    expect(formatNumberForDisplay(10.2)).toBe('10.2');
  });
});

describe('valuesEqual', () => {
  it('treats NaN as equal to NaN', () => {
    expect(valuesEqual(NaN, NaN)).toBe(true);
  });

  it('compares finite numbers', () => {
    expect(valuesEqual(1, 1)).toBe(true);
    expect(valuesEqual(1, 2)).toBe(false);
  });
});
