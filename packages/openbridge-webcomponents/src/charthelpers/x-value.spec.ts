import {describe, expect, it} from 'vitest';
import {formatXValue, normalizeXValue, XValueMode} from './x-value.js';

describe('normalizeXValue', () => {
  it('passes finite numbers through in both modes', () => {
    expect(normalizeXValue(1751790000000, XValueMode.time)).toBe(1751790000000);
    expect(normalizeXValue(42.5, XValueMode.number)).toBe(42.5);
  });

  it('returns NaN for non-finite numbers', () => {
    expect(normalizeXValue(Infinity, XValueMode.time)).toBeNaN();
    expect(normalizeXValue(NaN, XValueMode.number)).toBeNaN();
  });

  it('converts Date via getTime()', () => {
    const d = new Date('2026-07-06T10:00:00Z');
    expect(normalizeXValue(d, XValueMode.time)).toBe(d.getTime());
  });

  it('uses epochMilliseconds for Temporal Instant/ZonedDateTime shapes', () => {
    expect(
      normalizeXValue({epochMilliseconds: 1751790000000}, XValueMode.time)
    ).toBe(1751790000000);
  });

  it('prefers epochMilliseconds when a ZonedDateTime-like also has year/month/day', () => {
    expect(
      normalizeXValue(
        {epochMilliseconds: 123, year: 2026, month: 7, day: 6},
        XValueMode.time
      )
    ).toBe(123);
  });

  it('interprets PlainDateTime-like shapes in the system time zone', () => {
    const v = {year: 2026, month: 7, day: 6, hour: 10, minute: 30};
    expect(normalizeXValue(v, XValueMode.time)).toBe(
      new Date(2026, 6, 6, 10, 30, 0, 0).getTime()
    );
  });

  it('interprets PlainDate-like shapes as local midnight', () => {
    expect(
      normalizeXValue({year: 2026, month: 7, day: 6}, XValueMode.time)
    ).toBe(new Date(2026, 6, 6).getTime());
  });

  it('parses ISO strings in time mode', () => {
    expect(normalizeXValue('2026-07-06T10:00:00Z', XValueMode.time)).toBe(
      Date.parse('2026-07-06T10:00:00Z')
    );
  });

  it('falls back to Number() for numeric strings in time mode', () => {
    expect(normalizeXValue('1751790000000', XValueMode.time)).toBe(
      1751790000000
    );
  });

  it('only accepts numeric strings in number mode', () => {
    expect(normalizeXValue('42.5', XValueMode.number)).toBe(42.5);
    expect(normalizeXValue('2026-07-06', XValueMode.number)).toBeNaN();
  });

  it('returns NaN for garbage input', () => {
    expect(normalizeXValue('not a date', XValueMode.time)).toBeNaN();
    expect(normalizeXValue('', XValueMode.time)).toBeNaN();
    expect(normalizeXValue({} as never, XValueMode.time)).toBeNaN();
    expect(normalizeXValue(null as never, XValueMode.time)).toBeNaN();
    expect(normalizeXValue(undefined as never, XValueMode.time)).toBeNaN();
  });
});

describe('formatXValue', () => {
  it('formats relative minutes when a reference is given', () => {
    const ref = 1751790000000;
    expect(formatXValue(ref + 5 * 60000, XValueMode.time, ref)).toBe('5min');
    expect(formatXValue(ref - 3 * 60000, XValueMode.time, ref)).toBe('-3min');
  });

  it('renders a locale date when no reference is given', () => {
    const ts = Date.parse('2026-07-06T10:00:00Z');
    expect(formatXValue(ts, XValueMode.time)).toBe(
      new Date(ts).toLocaleDateString()
    );
  });

  it('ignores a non-finite reference', () => {
    const ts = Date.parse('2026-07-06T10:00:00Z');
    expect(formatXValue(ts, XValueMode.time, NaN)).toBe(
      new Date(ts).toLocaleDateString()
    );
  });

  it('formats number mode as plain string, even with a reference', () => {
    expect(formatXValue(42.5, XValueMode.number, 1000)).toBe('42.5');
  });

  it('returns empty string for non-finite values', () => {
    expect(formatXValue(NaN, XValueMode.time)).toBe('');
  });
});
