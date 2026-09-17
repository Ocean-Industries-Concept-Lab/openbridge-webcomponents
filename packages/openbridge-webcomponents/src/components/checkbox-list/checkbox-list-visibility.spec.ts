import {describe, expect, it} from 'vitest';
import {
  computeHiddenRows,
  type CheckboxListRow,
} from './checkbox-list-visibility.js';

const row = (
  level: number,
  expandable = false,
  expanded = false
): CheckboxListRow => ({level, expandable, expanded});

describe('computeHiddenRows', () => {
  it('shows every row when nothing is collapsed', () => {
    expect(
      computeHiddenRows([row(1, true, true), row(2), row(2), row(1)])
    ).toEqual([false, false, false, false]);
  });

  it('hides descendants of a collapsed row until a sibling or ancestor', () => {
    expect(
      computeHiddenRows([row(1, true, false), row(2), row(3), row(1)])
    ).toEqual([false, true, true, false]);
  });

  it('a collapsed row nested under an open one hides only its own subtree', () => {
    expect(
      computeHiddenRows([
        row(1, true, true),
        row(2, true, false),
        row(3),
        row(2),
        row(1),
      ])
    ).toEqual([false, false, true, false, false]);
  });

  it('a collapsed row that is itself hidden does not change the cut level', () => {
    expect(
      computeHiddenRows([
        row(1, true, false),
        row(2, true, true),
        row(3),
        row(1),
      ])
    ).toEqual([false, true, true, false]);
  });

  it('non-expandable rows never collapse anything', () => {
    expect(computeHiddenRows([row(1), row(2), row(2)])).toEqual([
      false,
      false,
      false,
    ]);
  });

  it('treats level 0 like any other depth', () => {
    expect(computeHiddenRows([row(0, true, false), row(1), row(0)])).toEqual([
      false,
      true,
      false,
    ]);
  });

  it('returns an empty array for no rows', () => {
    expect(computeHiddenRows([])).toEqual([]);
  });
});
