import {describe, it, expect} from 'vitest';
import {
  formatNumberForDisplay,
  getLocaleNumberSeparators,
  isAllowedIntermediateInput,
  parseNumberInput,
  removeGroupingFromDisplay,
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

  it('parses grouped numbers with mixed separators', () => {
    expect(parseNumberInput('1,234.5')).toBe(1234.5);
    expect(parseNumberInput('1.234,5')).toBe(1234.5);
    expect(parseNumberInput('1 234,5')).toBe(1234.5);
    expect(parseNumberInput("1'234.5")).toBe(1234.5);
  });

  it('parses grouped integers', () => {
    expect(parseNumberInput('1,234,567')).toBe(1234567);
  });

  it('returns NaN for sign-only input', () => {
    expect(Number.isNaN(parseNumberInput('-'))).toBe(true);
    expect(Number.isNaN(parseNumberInput('+'))).toBe(true);
  });
});

describe('getLocaleNumberSeparators', () => {
  it('returns separators for en-US', () => {
    expect(getLocaleNumberSeparators('en-US')).toEqual({
      decimalSeparator: '.',
      groupSeparator: ',',
    });
  });

  it('returns separators for de-DE', () => {
    expect(getLocaleNumberSeparators('de-DE')).toEqual({
      decimalSeparator: ',',
      groupSeparator: '.',
    });
  });
});

describe('formatNumberForDisplay', () => {
  it('returns empty string for NaN', () => {
    expect(formatNumberForDisplay(NaN)).toBe('');
  });

  it('formats finite numbers using locale defaults without options', () => {
    expect(formatNumberForDisplay(10.21212)).toBe(
      new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
      }).format(10.21212)
    );
  });

  it('applies group and decimal separators', () => {
    expect(
      formatNumberForDisplay(1234.5, {
        groupSeparator: ' ',
        decimalSeparator: ',',
        minFractionDigits: 1,
        maxFractionDigits: 1,
      })
    ).toBe('1 234,5');
  });

  it('pads to minFractionDigits', () => {
    expect(
      formatNumberForDisplay(10, {
        minFractionDigits: 2,
        maxFractionDigits: 2,
      })
    ).toBe(
      new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(10)
    );
  });

  it('limits to maxFractionDigits', () => {
    expect(
      formatNumberForDisplay(10.256, {
        maxFractionDigits: 2,
      })
    ).toBe(
      new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(10.256)
    );
  });

  it('formats negative numbers with grouping', () => {
    expect(
      formatNumberForDisplay(-1234.5, {
        groupSeparator: "'",
        decimalSeparator: ',',
        minFractionDigits: 1,
        maxFractionDigits: 1,
      })
    ).toBe("-1'234,5");
  });
});

describe('removeGroupingFromDisplay', () => {
  it('removes space group separator', () => {
    expect(
      removeGroupingFromDisplay('1 234,50', {
        groupSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('1234,50');
  });

  it('removes apostrophe group separator', () => {
    expect(
      removeGroupingFromDisplay("1'234,50", {
        groupSeparator: "'",
        decimalSeparator: ',',
      })
    ).toBe('1234,50');
  });

  it('removes dot group separator', () => {
    expect(
      removeGroupingFromDisplay('1.234,50', {
        groupSeparator: '.',
        decimalSeparator: ',',
      })
    ).toBe('1234,50');
  });

  it('returns display unchanged when group separator is empty', () => {
    expect(removeGroupingFromDisplay('1234.50', {groupSeparator: ''})).toBe(
      '1234.50'
    );
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

describe('isAllowedIntermediateInput', () => {
  const enUsOptions = {decimalSeparator: '.', groupSeparator: ','};

  it('allows empty string', () => {
    expect(isAllowedIntermediateInput('', enUsOptions)).toBe(true);
  });

  it('allows digits', () => {
    expect(isAllowedIntermediateInput('123', enUsOptions)).toBe(true);
  });

  it('allows leading sign', () => {
    expect(isAllowedIntermediateInput('-', enUsOptions)).toBe(true);
    expect(isAllowedIntermediateInput('+12.5', enUsOptions)).toBe(true);
  });

  it('allows trailing decimal separator', () => {
    expect(isAllowedIntermediateInput('10.', enUsOptions)).toBe(true);
    expect(isAllowedIntermediateInput(',5', enUsOptions)).toBe(true);
  });

  it('allows grouped numbers with default separators', () => {
    expect(isAllowedIntermediateInput('1,234.5', enUsOptions)).toBe(true);
  });

  it('rejects letters', () => {
    expect(isAllowedIntermediateInput('12a')).toBe(false);
    expect(isAllowedIntermediateInput('e')).toBe(false);
  });

  it('rejects symbols outside the allowed set', () => {
    expect(isAllowedIntermediateInput('12!')).toBe(false);
    expect(isAllowedIntermediateInput('12$')).toBe(false);
  });

  it('rejects sign in non-leading position', () => {
    expect(isAllowedIntermediateInput('1-2')).toBe(false);
  });

  it('honours custom decimal separator', () => {
    const opts = {decimalSeparator: ',', groupSeparator: ' '};
    expect(isAllowedIntermediateInput('1 234,5', opts)).toBe(true);
    expect(isAllowedIntermediateInput('1,234.5', opts)).toBe(false);
  });

  it('allows whitespace', () => {
    expect(isAllowedIntermediateInput(' 12 ')).toBe(true);
  });
});
