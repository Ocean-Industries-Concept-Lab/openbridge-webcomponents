/**
 * @module Transmitter Readout
 *
 * A deliberate local copy of the parts of `<obc-readout-block>` that
 * `<obc-transmitter-button>` renders, trimmed to the options it actually uses,
 * including its own sign-aware hinted-zero formatting.
 *
 * The block is `@experimental` and still changing; this copy keeps the
 * transmitter button stable in the meantime. Delete this module and restore the
 * `obc-readout-block` imports once the block's API settles.
 *
 * The markup renders into the transmitter button's own shadow root, so the
 * styles live in `transmitter-button.css` rather than here.
 */
import {html, nothing, type TemplateResult} from 'lit';
import {
  formatNumericValue,
  readoutFormattedInteger,
} from '../../navigation-instruments/readout/readout-formatters.js';
import '../../components/textbox/textbox.js';
import {
  ObcTextboxAlignment,
  ObcTextboxSize,
} from '../../components/textbox/textbox.js';
import '../../icons/icon-input-right.js';
import '../../icons/icon-notification-advice.js';

export enum TransmitterReadoutVariant {
  value = 'value',
  setpoint = 'setpoint',
  advice = 'advice',
}

export enum TransmitterReadoutSize {
  regular = 'regular',
  medium = 'medium',
  large = 'large',
}

export type TransmitterReadoutOptions = {
  variant: TransmitterReadoutVariant;
  size: TransmitterReadoutSize;
  value: number | null | undefined;
  fractionDigits: number;
  maxDigits: number;
  hintedZeros: boolean;
};

const textboxSizeBySize: Record<TransmitterReadoutSize, ObcTextboxSize> = {
  [TransmitterReadoutSize.regular]: ObcTextboxSize.s,
  [TransmitterReadoutSize.medium]: ObcTextboxSize.m,
  [TransmitterReadoutSize.large]: ObcTextboxSize.l,
};

function normalizeNumericValue(
  value: number | null | undefined
): number | undefined {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return undefined;
  }
  return value;
}

type HintedValueOptions = {
  /** Integer digits to reserve / hint. The fraction digits never count. */
  maxDigits: number;
  fractionDigits: number;
  hintedZeros: boolean;
};

type HintedValueParts = {
  /** `-` for a negative value, otherwise empty. */
  sign: string;
  /** Muted leading zeros filling the integer part up to `maxDigits`. */
  hint: string;
  /** The formatted number without its sign, or the dashed fallback. */
  text: string;
};

function dashedValue(maxDigits: number, fractionDigits: number): string {
  const integer = '-'.repeat(Math.max(maxDigits, 1));
  return fractionDigits > 0
    ? `${integer}.${'-'.repeat(fractionDigits)}`
    : integer;
}

/**
 * The sign occupies one of the `maxDigits` reserved positions, so a negative
 * value renders at the same width as a positive one. A missing value with
 * `hintedZeros` renders as dashes across the whole reserved width instead of
 * dashes preceded by zeros.
 */
function formatHintedValue(
  value: number | undefined,
  {maxDigits, fractionDigits, hintedZeros}: HintedValueOptions
): HintedValueParts {
  const formatOptions = {
    showZeroPadding: false,
    minValueLength: maxDigits,
    fractionDigits,
  };

  if (value === undefined) {
    return {
      sign: '',
      hint: '',
      text: hintedZeros
        ? dashedValue(maxDigits, fractionDigits)
        : formatNumericValue(undefined, formatOptions),
    };
  }

  const sign = value < 0 ? '-' : '';
  const text = formatNumericValue(Math.abs(value), formatOptions);
  const hintCount = hintedZeros
    ? Math.max(maxDigits - readoutFormattedInteger(text) - sign.length, 0)
    : 0;

  return {sign, hint: '0'.repeat(hintCount), text};
}

/** Widest possible value string for width reservation (e.g. `"000.0"`). */
function reserverText(maxDigits: number, fractionDigits: number): string {
  if (maxDigits <= 0) {
    return '';
  }
  const integer = '0'.repeat(maxDigits);
  return fractionDigits > 0
    ? `${integer}.${'0'.repeat(fractionDigits)}`
    : integer;
}

function renderMarkerIcon(
  variant: TransmitterReadoutVariant
): TemplateResult | typeof nothing {
  if (variant === TransmitterReadoutVariant.setpoint) {
    return html`<span class="readout-icon" aria-hidden="true"
      ><obi-input-right></obi-input-right
    ></span>`;
  }
  if (variant === TransmitterReadoutVariant.advice) {
    return html`<span class="readout-icon" aria-hidden="true"
      ><obi-notification-advice></obi-notification-advice
    ></span>`;
  }
  return nothing;
}

export function renderTransmitterReadout({
  variant,
  size,
  value,
  fractionDigits,
  maxDigits,
  hintedZeros,
}: TransmitterReadoutOptions): TemplateResult {
  const {sign, hint, text} = formatHintedValue(normalizeNumericValue(value), {
    maxDigits,
    fractionDigits,
    hintedZeros,
  });
  const reserver = reserverText(maxDigits, fractionDigits);

  return html`
    <span class="readout ${variant}">
      ${renderMarkerIcon(variant)}
      <obc-textbox
        class="readout-text"
        .size=${textboxSizeBySize[size]}
        .alignment=${ObcTextboxAlignment.Right}
        .tabularNums=${true}
      >
        ${sign}${hint
          ? html`<span class="hinted-zero" aria-hidden="true">${hint}</span>`
          : nothing}${text}
        ${reserver ? html`<span slot="length">${reserver}</span>` : nothing}
      </obc-textbox>
    </span>
  `;
}
