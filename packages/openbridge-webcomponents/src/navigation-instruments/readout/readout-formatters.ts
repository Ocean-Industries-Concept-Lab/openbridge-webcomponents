export type ReadoutNumericFormatOptions = {
  showZeroPadding: boolean;
  minValueLength: number;
  fractionDigits: number;
};

/**
 * How a readout's `value` is interpreted.
 * - `number`: formatted via `fractionDigits` / `maxDigits`.
 * - `text`: rendered verbatim, with the numeric format options ignored.
 */
export enum ReadoutValueType {
  number = 'number',
  text = 'text',
}

const READOUT_VALUE_TYPES: readonly string[] = Object.values(ReadoutValueType);

/** Whether `value` is one of the supported {@link ReadoutValueType} values. */
export function isReadoutValueType(value: unknown): value is ReadoutValueType {
  return typeof value === 'string' && READOUT_VALUE_TYPES.includes(value);
}

function isBlank(value: string): boolean {
  return value.trim() === '';
}

/**
 * Throws when `valueType` is not a supported value, or when `value` is text but
 * `valueType` is `number`.
 *
 * `valueType` is validated first because an attribute carries an unchecked
 * string: a typo such as `valuetype="strng"` matches neither mode, so every
 * mode check falls through and the readout silently renders the unavailable
 * dash — the opposite of the loud failure this contract exists to give.
 * `undefined`/`null` are allowed and mean "use the default".
 *
 * Attributes are always strings, so a numeric-looking string (`value="10.12"`)
 * is accepted and parsed. Blank strings resolve to the unavailable dash rather
 * than throwing — `value="${maybeUndefined}"` is a common template shape, and
 * `Number('')` is `0`, a silently wrong reading.
 */
export function assertReadoutValueType(
  tagName: string,
  value: number | string | null | undefined,
  valueType: ReadoutValueType
): void {
  // `undefined`/`null` mean "use the default", matching how the components and
  // the resolvers treat an unset `valueType`.
  const resolved = valueType ?? ReadoutValueType.number;
  if (!isReadoutValueType(resolved)) {
    throw new TypeError(
      `<${tagName}>: valueType must be ` +
        `${READOUT_VALUE_TYPES.map((t) => `"${t}"`).join(' or ')} ` +
        `(got ${JSON.stringify(valueType)}).`
    );
  }
  if (
    resolved !== ReadoutValueType.number ||
    typeof value !== 'string' ||
    isBlank(value)
  ) {
    return;
  }
  if (Number.isFinite(Number(value))) {
    return;
  }
  throw new TypeError(
    `<${tagName}>: value must be a number when valueType is "number" ` +
      `(got ${JSON.stringify(value)}). Set valueType="text" to render text.`
  );
}

/** The value as a number, or `undefined` when it is text / unavailable. */
export function resolveReadoutNumericValue(
  value: number | string | null | undefined,
  valueType: ReadoutValueType
): number | undefined {
  if (
    valueType === ReadoutValueType.text ||
    value === null ||
    value === undefined
  ) {
    return undefined;
  }
  if (typeof value === 'number') {
    return value;
  }
  if (isBlank(value)) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/** The value as display text, or `undefined` when not in text mode / blank. */
export function resolveReadoutTextValue(
  value: number | string | null | undefined,
  valueType: ReadoutValueType
): string | undefined {
  if (
    valueType !== ReadoutValueType.text ||
    value === null ||
    value === undefined
  ) {
    return undefined;
  }
  const text = typeof value === 'number' ? String(value) : value;
  return isBlank(text) ? undefined : text;
}

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
