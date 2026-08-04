export type ReadoutNumericFormatOptions = {
  showZeroPadding: boolean;
  minValueLength: number;
  fractionDigits: number;
};

function dashedGenerator({
  showZeroPadding,
  minValueLength,
  fractionDigits,
}: ReadoutNumericFormatOptions): string {
  const visibleDigits = showZeroPadding ? Math.max(minValueLength, 1) : 1;

  if (fractionDigits < 1) {
    return '-'.repeat(visibleDigits);
  }

  const integerDigits = visibleDigits - fractionDigits;

  return (
    '-'.repeat(Math.max(integerDigits, 1)) + '.' + '-'.repeat(fractionDigits)
  );
}

export function formatNumericValue(
  value: number | undefined,
  options: ReadoutNumericFormatOptions
): string {
  if (value === undefined) {
    return dashedGenerator(options);
  }

  return value.toFixed(options.fractionDigits);
}

function readoutFormattedInteger(valueText: string): number {
  const t = valueText.trim();
  if (!t) {
    return 0;
  }

  const rest = t.startsWith('-') ? t.slice(1) : t;
  const dot = rest.indexOf('.');
  return dot === -1 ? rest.length : dot;
}

export type HintedValueOptions = {
  /** Integer digits to reserve / hint. The fraction digits never count. */
  maxDigits: number;
  fractionDigits: number;
  hintedZeros: boolean;
};

/**
 * The three display segments of a hinted value, in render order. The consumer
 * mutes only `hint`; `sign` and `text` carry the value's own colour.
 */
export type HintedValueParts = {
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
 * Splits a value into its sign, hinted leading zeros and number text.
 *
 * The sign occupies one of the `maxDigits` reserved positions, so a negative
 * value renders at the same width as a positive one. A missing value with
 * `hintedZeros` renders as dashes across the whole reserved width instead of
 * dashes preceded by zeros.
 */
export function formatHintedValue(
  value: number | undefined,
  {maxDigits, fractionDigits, hintedZeros}: HintedValueOptions
): HintedValueParts {
  const formatOptions: ReadoutNumericFormatOptions = {
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
