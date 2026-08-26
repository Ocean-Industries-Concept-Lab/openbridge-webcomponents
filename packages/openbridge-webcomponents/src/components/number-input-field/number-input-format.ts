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

  // Drop whitespace and apostrophe grouping that may appear in pasted or
  // locale-formatted numbers (e.g. `1 234`, `1'234`).
  let normalized = trimmed.replace(/[\s']/g, '');

  const commaCount = (normalized.match(/,/g) ?? []).length;
  const dotCount = (normalized.match(/\./g) ?? []).length;

  if (commaCount > 0 && dotCount > 0) {
    // Both separators present: the right-most one is the decimal separator,
    // the other is a grouping separator.
    const decimalSeparator =
      normalized.lastIndexOf(',') > normalized.lastIndexOf('.') ? ',' : '.';
    const groupSeparator = decimalSeparator === ',' ? '.' : ',';
    normalized = normalized.split(groupSeparator).join('');
    normalized = normalized.replace(decimalSeparator, '.');
  } else if (commaCount > 1) {
    // Multiple commas without a dot can only be grouping separators.
    normalized = normalized.split(',').join('');
  } else if (commaCount === 1) {
    // A single comma is treated as the decimal separator.
    normalized = normalized.replace(',', '.');
  } else if (dotCount > 1) {
    // Multiple dots without a comma can only be grouping separators.
    normalized = normalized.split('.').join('');
  }

  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

function escapeRegex(value: string): string {
  return value.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Permissive per-keystroke validator used to reject non-numeric characters
 * before they reach the input. Allows half-typed states like `10.`, `-`, `,5`,
 * `1,234.`; final correctness is enforced by `parseNumberInput` at commit.
 *
 * Accepts: optional leading sign, digits, the active decimal separator,
 * the active group separator, and whitespace.
 */
export function isAllowedIntermediateInput(
  value: string,
  options: NumberInputFormatOptions = {}
): boolean {
  if (value === '') return true;

  const localeSeparators = getLocaleNumberSeparators();
  const decimalSeparator =
    options.decimalSeparator ?? localeSeparators.decimalSeparator;
  const groupSeparator =
    options.groupSeparator ?? localeSeparators.groupSeparator;

  const allowedChars = new Set<string>([decimalSeparator]);
  if (groupSeparator) {
    allowedChars.add(groupSeparator);
  }
  const allowedClass = [...allowedChars].map(escapeRegex).join('') + '0-9 \\t';
  const pattern = new RegExp(`^[+\\-]?[${allowedClass}]*$`);
  return pattern.test(value);
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

  const escaped = escapeRegex(groupSeparator);
  return display.replace(new RegExp(escaped, 'g'), '');
}

export function valuesEqual(a: number, b: number): boolean {
  return Object.is(a, b);
}
