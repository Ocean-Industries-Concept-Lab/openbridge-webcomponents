export type ReadoutNumericFormatOptions = {
  showZeroPadding: boolean;
  maxDigits: number;
  fractionDigits: number;
};

export type ReadoutTextSegment = {
  visibleValue: string;
  widthTemplate: string;
};

function dashedGenerator({
  showZeroPadding,
  maxDigits,
  fractionDigits,
}: ReadoutNumericFormatOptions): string {
  const visibleDigits = showZeroPadding ? Math.max(maxDigits, 1) : 1;

  if (fractionDigits < 1) {
    return '-'.repeat(visibleDigits);
  }

  const integerDigits = visibleDigits - fractionDigits;

  return (
    '-'.repeat(Math.max(integerDigits, 1)) + '.' + '-'.repeat(fractionDigits)
  );
}

function formatNumericValue(
  value: number | undefined,
  options: ReadoutNumericFormatOptions
): string {
  if (value === undefined) {
    return dashedGenerator(options);
  }

  return value.toFixed(options.fractionDigits);
}

export function formatReadoutValue(
  value: number | string | undefined,
  options: ReadoutNumericFormatOptions
): string {
  if (typeof value === 'string') {
    return value;
  }

  return formatNumericValue(value, options);
}

export function getHintZeros(
  value: number | string | undefined,
  formattedValue: string,
  {maxDigits}: ReadoutNumericFormatOptions
): string {
  if (typeof value !== 'number' || value < 0) {
    return '';
  }

  const hintedDigits = maxDigits - formattedValue.length;

  if (hintedDigits > 0) {
    return '0'.repeat(hintedDigits);
  }

  return '';
}

export function formatTextSegment(
  value: string,
  hasFixedLength: boolean,
  lengthTemplate: string
): ReadoutTextSegment {
  if (!hasFixedLength) {
    return {
      visibleValue: value,
      widthTemplate: '',
    };
  }

  const trimmedLengthTemplate = lengthTemplate.trim();

  if (!trimmedLengthTemplate) {
    return {
      visibleValue: '',
      widthTemplate: '',
    };
  }

  return {
    visibleValue: value.slice(0, trimmedLengthTemplate.length),
    widthTemplate: trimmedLengthTemplate,
  };
}
