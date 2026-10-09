/**
 * Visibility of a flat checkbox-item sequence
 *
 * `<obc-checkbox-list>` keeps its rows flat and infers the tree from each
 * row's `level`. A row is hidden while a preceding, visible, collapsed
 * expandable row of smaller level is still "open" — that is, until a row of
 * equal or smaller level closes it. Kept free of DOM so it can be unit-tested.
 * @module
 */
export interface CheckboxListRow {
  level: number;
  expandable: boolean;
  expanded: boolean;
}

export function computeHiddenRows(rows: readonly CheckboxListRow[]): boolean[] {
  let cutLevel: number | null = null;
  return rows.map((row) => {
    if (cutLevel !== null && row.level > cutLevel) return true;
    cutLevel = row.expandable && !row.expanded ? row.level : null;
    return false;
  });
}
