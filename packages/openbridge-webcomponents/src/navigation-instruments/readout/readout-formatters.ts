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

export function readoutFormattedInteger(valueText: string): number {
  const t = valueText.trim();
  if (!t) {
    return 0;
  }

  const rest = t.startsWith('-') ? t.slice(1) : t;
  const dot = rest.indexOf('.');
  return dot === -1 ? rest.length : dot;
}

export function getHintZeros(
  value: number | undefined,
  {showZeroPadding, minValueLength, fractionDigits}: ReadoutNumericFormatOptions
): string {
  const formattedValue = formatNumericValue(value, {
    showZeroPadding,
    minValueLength,
    fractionDigits,
  });
  const dotLength = fractionDigits > 0 ? 1 : 0;
  const integerLength = formattedValue.length - dotLength;
  const hintedDigits = Math.max(minValueLength - integerLength, 0);

  if (hintedDigits > 0) {
    return '0'.repeat(hintedDigits);
  }

  return '';
}
