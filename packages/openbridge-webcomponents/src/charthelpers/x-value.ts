/**
 * X-value normalization and formatting for line/area charts.
 *
 * Charts accept x-values as epoch milliseconds, ISO-8601 strings, `Date`
 * instances, or Temporal objects (`Instant`, `ZonedDateTime`,
 * `PlainDateTime`, `PlainDate`). All are normalized to a single number
 * (epoch milliseconds in `'time'` mode, the plain value in `'number'` mode)
 * so the Chart.js linear scale positions points proportionally.
 *
 * Temporal support is structural (duck-typed): there is no dependency on the
 * Temporal API or a polyfill, and cross-realm/polyfilled objects work.
 * Plain* types (which carry no time zone) are interpreted in the system
 * time zone.
 *
 * @example
 * ```ts
 * normalizeXValue('2026-07-06T10:00:00Z', XValueMode.time); // epoch ms
 * normalizeXValue(new Date(0), XValueMode.time); // 0
 * normalizeXValue({epochMilliseconds: 42}, XValueMode.time); // 42 (Temporal)
 * normalizeXValue('2.5', XValueMode.number); // 2.5
 *
 * formatXValue(ms, XValueMode.time, referenceMs); // '5min' (relative)
 * formatXValue(ms, XValueMode.time); // locale date string
 * formatXValue(2.5, XValueMode.number); // '2.5'
 * ```
 */

type TemporalEpochLike = {
  epochMilliseconds: number;
};

type TemporalPlainLike = {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};

/** Structural type covering the supported Temporal object shapes. */
export type TemporalLike = TemporalEpochLike | TemporalPlainLike;

/** Every value accepted as a chart x-coordinate. */
export type ChartXValue = number | string | Date | TemporalLike;

/** X-axis interpretation used for normalization and formatting. */
export enum XValueMode {
  time = 'time',
  number = 'number',
}

function isTemporalEpochLike(v: object): v is TemporalEpochLike {
  return typeof (v as TemporalEpochLike).epochMilliseconds === 'number';
}

function isTemporalPlainLike(v: object): v is TemporalPlainLike {
  const t = v as TemporalPlainLike;
  return (
    typeof t.year === 'number' &&
    typeof t.month === 'number' &&
    typeof t.day === 'number'
  );
}

/**
 * Normalize an x-value to a finite number, or NaN when unusable.
 *
 * Rules, in order:
 * 1. `number` → as-is (epoch ms in time mode, plain value in number mode)
 * 2. `Date` → `getTime()`
 * 3. `{epochMilliseconds}` (Temporal Instant / ZonedDateTime) → epoch ms
 * 4. `{year, month, day, …}` (Temporal PlainDateTime / PlainDate) →
 *    epoch ms in the system time zone
 * 5. `string` → time mode: `Date.parse()` first, `Number()` fallback;
 *    number mode: `Number()` only
 */
export function normalizeXValue(v: ChartXValue, mode: XValueMode): number {
  if (typeof v === 'number') {
    return Number.isFinite(v) ? v : NaN;
  }
  if (v instanceof Date) {
    return v.getTime();
  }
  if (typeof v === 'object' && v !== null) {
    if (isTemporalEpochLike(v)) return v.epochMilliseconds;
    if (isTemporalPlainLike(v)) {
      return new Date(
        v.year,
        v.month - 1,
        v.day,
        v.hour ?? 0,
        v.minute ?? 0,
        v.second ?? 0,
        v.millisecond ?? 0
      ).getTime();
    }
    return NaN;
  }
  if (typeof v === 'string') {
    if (v.trim() === '') return NaN;
    if (mode === XValueMode.time) {
      const parsed = Date.parse(v);
      if (Number.isFinite(parsed)) return parsed;
    }
    const numeric = Number(v);
    return Number.isFinite(numeric) ? numeric : NaN;
  }
  return NaN;
}

/**
 * Format a normalized x-value for axis tick labels and tooltips.
 *
 * Mirrors the historical chart-line tick formatting exactly: with a finite
 * `relativeToMs` (time mode) renders `<n>min` relative to it; without one
 * renders `toLocaleDateString()`. Number mode renders the plain value.
 * Callers express the `TimeDisplay` choice by passing or omitting
 * `relativeToMs`.
 */
export function formatXValue(
  value: number,
  mode: XValueMode,
  relativeToMs?: number
): string {
  if (!Number.isFinite(value)) return '';
  if (mode === XValueMode.number) return String(value);
  if (relativeToMs !== undefined && Number.isFinite(relativeToMs)) {
    const minutes = Math.round((value - relativeToMs) / 60000);
    return `${minutes}min`;
  }
  return new Date(value).toLocaleDateString();
}
