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
  formatNumericValue,
  type ReadoutNumericFormatOptions,
} from './readout-formatters.js';

/**
 * Pure helpers shared by `obc-readout` and `obc-readout-list-item`. The two
 * components are layout siblings built from the same primitives + per-block
 * options API (see #1012); this module keeps their behavioral logic in
 * lock-step until an eventual merge.
 *
 * ## Features
 * - **Numeric formatting:** {@link readoutNumericFormatOptions} builds the
 *   shared `maxDigits`/`fractionDigits` format options (never zero-padded).
 * - **Setpoint comparison:** {@link isDisplayedAtSetpoint} compares the
 *   DISPLAYED (rounded) value and setpoint strings, not the raw numbers.
 * - **Typography mapping:** {@link readoutPrimarySize} /
 *   {@link readoutSecondarySize} map the density tier to the primary /
 *   de-emphasised `obc-textbox` size; {@link readoutSetpointWeight} picks the
 *   setpoint font weight from its emphasis state.
 * - **Data quality:** {@link readoutDataQualityClasses} produces the classMap
 *   fragment for the low-integrity / invalid chip.
 * - **Pop-up hide phase:** {@link resolveSetpointHidePhase} maps the
 *   component's deferred-hide state onto the block-level
 *   `ReadoutBlockHidePhase`.
 *
 * ## Usage Guidelines
 * These helpers are consumed by the components' private getters — behavioral
 * changes belong here (once), not re-inlined per component.
 *
 * @example
 * const format = readoutNumericFormatOptions(3, 1);
 * const atSetpoint = isDisplayedAtSetpoint(29.99, 30, format);
 */

export function readoutNumericFormatOptions(
  maxDigits: number,
  fractionDigits: number
): ReadoutNumericFormatOptions {
  return {
    showZeroPadding: false,
    minValueLength: maxDigits,
    fractionDigits,
  };
}

/**
 * Whether the value reads as "at the setpoint". Compares what is DISPLAYED
 * (rounded to fractionDigits), not the raw values, so e.g. 29.999 and 30 at
 * fractionDigits=0 both read "30" → at setpoint.
 */
export function isDisplayedAtSetpoint(
  value: number | null,
  setpoint: number | undefined,
  formatOptions: ReadoutNumericFormatOptions
): boolean {
  if (value === null || setpoint === undefined) {
    return false;
  }
  return (
    formatNumericValue(value, formatOptions) ===
    formatNumericValue(setpoint, formatOptions)
  );
}

/** Primary value-typography size for a density tier. */
export function readoutPrimarySize(size: ReadoutBlockSize): ObcTextboxSize {
  switch (size) {
    case ReadoutBlockSize.large:
      return ObcTextboxSize.l;
    case ReadoutBlockSize.medium:
      return ObcTextboxSize.m;
    default:
      return ObcTextboxSize.s;
  }
}

/** Secondary (de-emphasised) value-typography size for a density tier. */
export function readoutSecondarySize(size: ReadoutBlockSize): ObcTextboxSize {
  switch (size) {
    case ReadoutBlockSize.large:
      return ObcTextboxSize.s;
    case ReadoutBlockSize.medium:
      return ObcTextboxSize.s;
    default:
      return ObcTextboxSize.xs;
  }
}

/** Setpoint is SemiBold only while emphasised, otherwise regular weight. */
export function readoutSetpointWeight(
  emphasized: boolean
): ObcTextboxFontWeight {
  return emphasized
    ? ObcTextboxFontWeight.semibold
    : ObcTextboxFontWeight.regular;
}

/** classMap fragment for a block / source carrying per-block data quality. */
export function readoutDataQualityClasses(
  dataQuality: ReadoutBlockDataQuality | undefined
): Record<string, boolean> {
  return {
    'data-low-integrity': dataQuality === ReadoutBlockDataQuality.lowIntegrity,
    'data-invalid': dataQuality === ReadoutBlockDataQuality.invalid,
  };
}

/**
 * The block-level hide phase for a pop-up setpoint: the component's deferred
 * phase while the value sits at the setpoint, `none` otherwise (value away
 * from the setpoint, or touching).
 */
export function resolveSetpointHidePhase(
  popUpAtSetpoint: boolean,
  deferredPhase: ReadoutBlockHidePhase
): ReadoutBlockHidePhase {
  return popUpAtSetpoint ? deferredPhase : ReadoutBlockHidePhase.none;
}
