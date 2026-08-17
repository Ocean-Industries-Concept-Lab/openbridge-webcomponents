import {describe, it, expect} from 'vitest';
import {
  ObcTextboxSize,
  ObcTextboxFontWeight,
} from '../../components/textbox/textbox.js';
import {
  ReadoutBlockSize,
  ReadoutBlockDataQuality,
  ReadoutBlockHidePhase,
} from '../../building-blocks/readout-block/readout-block.js';
import {
  readoutNumericFormatOptions,
  isDisplayedAtSetpoint,
  readoutPrimarySize,
  readoutSecondarySize,
  readoutSetpointSize,
  readoutSetpointWeight,
  readoutDataQualityClasses,
  resolveSetpointHidePhase,
} from './readout-shared.js';

describe('readoutNumericFormatOptions', () => {
  it('maps maxDigits to minValueLength and never zero-pads', () => {
    expect(readoutNumericFormatOptions(3, 1)).toEqual({
      showZeroPadding: false,
      minValueLength: 3,
      fractionDigits: 1,
    });
  });
});

describe('isDisplayedAtSetpoint', () => {
  it('compares the DISPLAYED (rounded) strings, not the raw values', () => {
    expect(
      isDisplayedAtSetpoint(29.999, 30, readoutNumericFormatOptions(0, 0))
    ).toBe(true);
  });

  it('is false when the displayed strings differ', () => {
    expect(
      isDisplayedAtSetpoint(123, 120, readoutNumericFormatOptions(0, 0))
    ).toBe(false);
  });

  it('respects fractionDigits', () => {
    expect(
      isDisplayedAtSetpoint(29.999, 30, readoutNumericFormatOptions(0, 1))
    ).toBe(true);
    expect(
      isDisplayedAtSetpoint(29.9, 30, readoutNumericFormatOptions(0, 1))
    ).toBe(false);
  });

  it('is false for a null value or an undefined setpoint', () => {
    expect(
      isDisplayedAtSetpoint(null, 30, readoutNumericFormatOptions(0, 0))
    ).toBe(false);
    expect(
      isDisplayedAtSetpoint(30, undefined, readoutNumericFormatOptions(0, 0))
    ).toBe(false);
  });

  // Callers normalise `value` but pass `setpoint` raw, so a non-finite setpoint
  // would otherwise be formatted as the literal "NaN" / "Infinity" and compared
  // as a string. An unavailable reading is never "at" a setpoint.
  it('is false when either side is non-finite', () => {
    const format = readoutNumericFormatOptions(0, 0);
    expect(isDisplayedAtSetpoint(30, Number.NaN, format)).toBe(false);
    expect(isDisplayedAtSetpoint(30, Number.POSITIVE_INFINITY, format)).toBe(
      false
    );
    expect(isDisplayedAtSetpoint(Number.NaN, 30, format)).toBe(false);
    expect(isDisplayedAtSetpoint(Number.NaN, Number.NaN, format)).toBe(false);
  });
});

describe('readoutPrimarySize / readoutSecondarySize', () => {
  it('maps the density tier to the primary textbox size', () => {
    expect(readoutPrimarySize(ReadoutBlockSize.small)).toBe(ObcTextboxSize.s);
    expect(readoutPrimarySize(ReadoutBlockSize.medium)).toBe(ObcTextboxSize.m);
    expect(readoutPrimarySize(ReadoutBlockSize.large)).toBe(ObcTextboxSize.l);
  });

  it('maps the density tier to the de-emphasised secondary size', () => {
    expect(readoutSecondarySize(ReadoutBlockSize.small)).toBe(
      ObcTextboxSize.xs
    );
    expect(readoutSecondarySize(ReadoutBlockSize.medium)).toBe(
      ObcTextboxSize.s
    );
    expect(readoutSecondarySize(ReadoutBlockSize.large)).toBe(ObcTextboxSize.s);
  });
});

describe('readoutSetpointSize', () => {
  const sizes = {primary: ObcTextboxSize.l, secondary: ObcTextboxSize.s};

  it('is secondary at rest (primary-secondary convention)', () => {
    expect(
      readoutSetpointSize({...sizes, emphasized: false, equalSize: false})
    ).toBe(ObcTextboxSize.s);
  });

  it('is primary while emphasised OR in equal-size, including both at once', () => {
    expect(
      readoutSetpointSize({...sizes, emphasized: true, equalSize: false})
    ).toBe(ObcTextboxSize.l);
    expect(
      readoutSetpointSize({...sizes, emphasized: false, equalSize: true})
    ).toBe(ObcTextboxSize.l);
    // Touching an equal-size setpoint must not demote it.
    expect(
      readoutSetpointSize({...sizes, emphasized: true, equalSize: true})
    ).toBe(ObcTextboxSize.l);
  });
});

describe('readoutSetpointWeight', () => {
  it('is semibold only while emphasised', () => {
    expect(readoutSetpointWeight(true)).toBe(ObcTextboxFontWeight.semibold);
    expect(readoutSetpointWeight(false)).toBe(ObcTextboxFontWeight.regular);
  });
});

describe('readoutDataQualityClasses', () => {
  it('produces the classMap fragment for each quality', () => {
    expect(
      readoutDataQualityClasses(ReadoutBlockDataQuality.lowIntegrity)
    ).toEqual({
      'data-low-integrity': true,
      'data-invalid': false,
    });
    expect(readoutDataQualityClasses(ReadoutBlockDataQuality.invalid)).toEqual({
      'data-low-integrity': false,
      'data-invalid': true,
    });
    expect(readoutDataQualityClasses(undefined)).toEqual({
      'data-low-integrity': false,
      'data-invalid': false,
    });
  });
});

describe('resolveSetpointHidePhase', () => {
  it('is none unless the pop-up is at the setpoint', () => {
    expect(resolveSetpointHidePhase(false, ReadoutBlockHidePhase.hiding)).toBe(
      ReadoutBlockHidePhase.none
    );
    expect(resolveSetpointHidePhase(false, ReadoutBlockHidePhase.hidden)).toBe(
      ReadoutBlockHidePhase.none
    );
  });

  it('passes the deferred phase through once at the setpoint', () => {
    expect(resolveSetpointHidePhase(true, ReadoutBlockHidePhase.none)).toBe(
      ReadoutBlockHidePhase.none
    );
    expect(resolveSetpointHidePhase(true, ReadoutBlockHidePhase.hiding)).toBe(
      ReadoutBlockHidePhase.hiding
    );
    expect(resolveSetpointHidePhase(true, ReadoutBlockHidePhase.hidden)).toBe(
      ReadoutBlockHidePhase.hidden
    );
  });
});
