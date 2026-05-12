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

export function numericOrOriginalString(
  value: number | string | undefined
): number | string | undefined {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (trimmed === '') {
    return value;
  }

  const n = Number(trimmed);
  if (!Number.isFinite(n)) {
    return value;
  }

  return n;
}

export function readoutValueFromAttribute(
  value: string | null
): number | string | undefined {
  if (value === null) {
    return undefined;
  }

  return numericOrOriginalString(value);
}

export function readoutValueToAttribute(
  value: number | string | undefined
): string | null {
  if (value === undefined) {
    return null;
  }

  return String(value);
}

export function formatReadoutValue(
  value: number | string | undefined,
  options: ReadoutNumericFormatOptions
): string {
  const resolved = numericOrOriginalString(value);
  if (typeof resolved === 'string') {
    return resolved;
  }

  return formatNumericValue(resolved, options);
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
  value: number | string | undefined,
  formattedValue: string,
  {showZeroPadding, maxDigits, fractionDigits}: ReadoutNumericFormatOptions
): string {
  if (!showZeroPadding) {
    return '';
  }

  const resolved = numericOrOriginalString(value);
  if (typeof resolved !== 'number' || resolved < 0) {
    return '';
  }

  const integerCharCount = readoutFormattedInteger(formattedValue);
  const integerWidth = Math.max(maxDigits - fractionDigits, 1);
  const hintedDigits = integerWidth - integerCharCount;

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

  const templateLength = trimmedLengthTemplate.length;

  if (value.length <= templateLength) {
    return {
      visibleValue: value,
      widthTemplate: trimmedLengthTemplate,
    };
  }

  if (value.startsWith('-') && templateLength > 1) {
    const digits = value.slice(1);
    return {
      visibleValue: `-${digits.slice(-(templateLength - 1))}`,
      widthTemplate: trimmedLengthTemplate,
    };
  }

  return {
    visibleValue: value.slice(-templateLength),
    widthTemplate: trimmedLengthTemplate,
  };
}
