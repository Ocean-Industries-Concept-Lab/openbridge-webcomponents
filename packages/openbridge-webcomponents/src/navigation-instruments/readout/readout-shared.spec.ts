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
