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
