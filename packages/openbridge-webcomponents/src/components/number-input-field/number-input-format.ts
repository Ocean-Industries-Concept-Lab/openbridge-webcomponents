export type NumberInputFormatOptions = {
  decimalSeparator?: string;
  groupSeparator?: string;
  minFractionDigits?: number;
  maxFractionDigits?: number;
};

export type LocaleNumberSeparators = {
  decimalSeparator: string;
  groupSeparator: string;
};

export function getLocaleNumberSeparators(
  locale?: string | string[]
): LocaleNumberSeparators {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  return {
    decimalSeparator: parts.find((p) => p.type === 'decimal')?.value ?? '.',
    groupSeparator: parts.find((p) => p.type === 'group')?.value ?? '',
  };
}

export function parseNumberInput(display: string): number {
  const trimmed = display.trim();
  if (trimmed === '' || trimmed === '-' || trimmed === '+') {
    return NaN;
  }

  const normalized = trimmed.replace(',', '.');

  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

function clampFractionDigits(
  minFractionDigits: number | undefined,
  maxFractionDigits: number | undefined
): {min: number; max: number | undefined} {
  const min = Math.max(0, minFractionDigits ?? 0);
  const max =
    maxFractionDigits == undefined
      ? undefined
      : Math.max(min, maxFractionDigits);
  return {min, max};
}

export function formatNumberForDisplay(
  value: number,
  options: NumberInputFormatOptions = {}
): string {
  if (Number.isNaN(value)) {
    return '';
  }

  const localeSeparators = getLocaleNumberSeparators();
  const decimalSeparator =
    options.decimalSeparator ?? localeSeparators.decimalSeparator;
  const groupSeparator =
    options.groupSeparator ?? localeSeparators.groupSeparator;
  const {min: minFractionDigits, max: maxFractionDigits} = clampFractionDigits(
    options.minFractionDigits ?? 0,
    options.maxFractionDigits
  );
  const effectiveMaxFractionDigits = maxFractionDigits ?? 20;

  const usesLocaleSeparators =
    options.decimalSeparator === undefined &&
    options.groupSeparator === undefined;

  if (usesLocaleSeparators) {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: effectiveMaxFractionDigits,
      useGrouping: Boolean(groupSeparator),
    }).format(value);
  }

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: effectiveMaxFractionDigits,
    useGrouping: Boolean(groupSeparator),
  }).format(value);

  if (decimalSeparator === '.' && groupSeparator === ',') {
    return formatted;
  }

  let result = formatted;
  if (groupSeparator) {
    result = result.replace(/,/g, groupSeparator);
  } else {
    result = result.replace(/,/g, '');
  }
  if (decimalSeparator !== '.') {
    result = result.replace('.', decimalSeparator);
  }

  return result;
}

export function removeGroupingFromDisplay(
  display: string,
  options: NumberInputFormatOptions = {}
): string {
  const localeSeparators = getLocaleNumberSeparators();
  const groupSeparator =
    options.groupSeparator ?? localeSeparators.groupSeparator;

  if (!groupSeparator) {
    return display;
  }

  const escaped = groupSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return display.replace(new RegExp(escaped, 'g'), '');
}

export function valuesEqual(a: number, b: number): boolean {
  return Object.is(a, b);
}
