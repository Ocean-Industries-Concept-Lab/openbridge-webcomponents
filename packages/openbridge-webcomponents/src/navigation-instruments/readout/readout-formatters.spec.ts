import {describe, it, expect} from 'vitest';
import {formatHintedValue} from './readout-formatters.js';

describe('formatHintedValue', () => {
  it('pads a positive value up to maxDigits integer digits', () => {
    expect(
      formatHintedValue(12.3, {
        maxDigits: 4,
        fractionDigits: 1,
        hintedZeros: true,
      })
    ).toEqual({sign: '', hint: '00', text: '12.3'});
  });

  it('never counts the fraction digits toward maxDigits', () => {
    expect(
      formatHintedValue(12.3, {
        maxDigits: 4,
        fractionDigits: 4,
        hintedZeros: true,
      })
    ).toEqual({sign: '', hint: '00', text: '12.3000'});
  });

  it('puts the minus sign ahead of the hinted zeros', () => {
    expect(
      formatHintedValue(-1.2, {
        maxDigits: 4,
        fractionDigits: 1,
        hintedZeros: true,
      })
    ).toEqual({sign: '-', hint: '00', text: '1.2'});
  });

  it('lets the minus sign occupy one of the reserved digit positions', () => {
    const positive = formatHintedValue(12.3, {
      maxDigits: 4,
      fractionDigits: 1,
      hintedZeros: true,
    });
    const negative = formatHintedValue(-12.3, {
      maxDigits: 4,
      fractionDigits: 1,
      hintedZeros: true,
    });

    const width = ({sign, hint, text}: typeof positive) =>
      (sign + hint + text).length;
    expect(width(negative)).toBe(width(positive));
    expect(negative).toEqual({sign: '-', hint: '0', text: '12.3'});
  });

  it('renders a missing value as dashes filling the reserved width', () => {
    expect(
      formatHintedValue(undefined, {
        maxDigits: 3,
        fractionDigits: 2,
        hintedZeros: true,
      })
    ).toEqual({sign: '', hint: '', text: '---.--'});
  });

  it('renders a missing value without a fraction part as bare dashes', () => {
    expect(
      formatHintedValue(undefined, {
        maxDigits: 3,
        fractionDigits: 0,
        hintedZeros: true,
      })
    ).toEqual({sign: '', hint: '', text: '---'});
  });

  it('keeps the short dashed fallback when zeros are not hinted', () => {
    expect(
      formatHintedValue(undefined, {
        maxDigits: 3,
        fractionDigits: 2,
        hintedZeros: false,
      })
    ).toEqual({sign: '', hint: '', text: '-.--'});
  });

  it('hints nothing when zeros are not hinted', () => {
    expect(
      formatHintedValue(-1.2, {
        maxDigits: 4,
        fractionDigits: 1,
        hintedZeros: false,
      })
    ).toEqual({sign: '-', hint: '', text: '1.2'});
  });

  it('hints nothing when the value already fills maxDigits', () => {
    expect(
      formatHintedValue(1234.5, {
        maxDigits: 2,
        fractionDigits: 1,
        hintedZeros: true,
      })
    ).toEqual({sign: '', hint: '', text: '1234.5'});
  });

  it('treats a value that rounds to zero as its signed self', () => {
    expect(
      formatHintedValue(-0.04, {
        maxDigits: 2,
        fractionDigits: 1,
        hintedZeros: true,
      })
    ).toEqual({sign: '-', hint: '', text: '0.0'});
  });
});
