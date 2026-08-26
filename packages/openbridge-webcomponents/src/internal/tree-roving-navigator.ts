import {ObcTreeNavigationItem} from '../components/tree-navigation-item/tree-navigation-item.js';

/**
 * Host-specific row resolution. The two tree hosts differ only in row tags,
 * expand-state storage, and DOM shape, so injecting these hooks lets one
 * navigator drive both.
 */
export interface TreeRovingAdapter<Row extends HTMLElement = HTMLElement> {
  /** Top-level rows, in document order. */
  getRows(): Row[];
  /** Direct child rows of a row, in document order. */
  childRows(row: Row): Row[];
  isGroup(row: Row): boolean;
  isExpanded(row: Row): boolean;
  setExpanded(row: Row, expanded: boolean): void;
  /** The focusable `obc-tree-navigation-item` for a row (a leaf is itself). */
  innerItem(row: Row): ObcTreeNavigationItem | null;
  /** Defaults to false when omitted. */
  isDisabled?(row: Row): boolean;
}

/**
 * Implements the [WAI-ARIA Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
 * keyboard pattern for a tree host: a single tab stop (roving tabindex) plus
 * Up/Down, Left/Right (collapse/expand → parent/child), and Home/End. Type-ahead
 * and `*` are intentionally out of scope.
 *
 * The host owns the DOM and the event wiring; this class owns the navigation
 * logic. The host calls {@link handleKeydown} from its `keydown` listener and
 * {@link refresh} whenever the structure changes, and supplies a
 * {@link TreeRovingAdapter} for row resolution. Focus only moves on user keys;
 * `refresh` re-points the roving tabindex without stealing focus.
 */
export class TreeRovingNavigator<Row extends HTMLElement = HTMLElement> {
  private readonly adapter: TreeRovingAdapter<Row>;
  private readonly host: HTMLElement;

  /** The row that currently holds the single tab stop (roving tabindex). */
  private activeRow?: Row;

  constructor(host: HTMLElement, adapter: TreeRovingAdapter<Row>) {
    this.adapter = adapter;
    this.host = host;
  }

  private isDisabled(row: Row): boolean {
    return this.adapter.isDisabled?.(row) ?? false;
  }

  /**
   * Depth-first list of every visible row: descend into a group only when it is
   * expanded. Disabled rows are included so {@link refresh} can re-point to a
   * visible ancestor; arrow navigation filters them out via {@link navigableRows}.
   */
  private visibleRows(): Row[] {
    const out: Row[] = [];
    const walk = (rows: Row[]) => {
      for (const row of rows) {
        out.push(row);
        if (this.adapter.isGroup(row) && this.adapter.isExpanded(row)) {
          walk(this.adapter.childRows(row));
        }
      }
    };
    walk(this.adapter.getRows());
    return out;
  }

  /** Visible rows that arrow navigation can land on (enabled rows). */
  private navigableRows(): Row[] {
    return this.visibleRows().filter((row) => !this.isDisabled(row));
  }

  /** The parent row of a row within this tree, or undefined for a top-level row. */
  private parentRow(target: Row): Row | undefined {
    let found: Row | undefined;
    const walk = (rows: Row[], parent?: Row) => {
      for (const row of rows) {
        if (row === target) {
          found = parent;
          return;
        }
        if (this.adapter.isGroup(row)) {
          walk(this.adapter.childRows(row), row);
          if (found !== undefined) return;
        }
      }
    };
    walk(this.adapter.getRows(), undefined);
    return found;
  }

  /**
   * Rebuild the roving tabindex: exactly one navigable row is `focusable`. Keeps
   * the active row if still navigable; else falls back to its nearest navigable
   * ancestor, else the first navigable row. Never moves focus.
   */
  refresh(): void {
    const navigable = this.navigableRows();
    if (navigable.length === 0) {
      this.activeRow = undefined;
      return;
    }

    let next: Row | undefined;
    if (this.activeRow && navigable.includes(this.activeRow)) {
      next = this.activeRow;
    } else if (this.activeRow) {
      let ancestor = this.parentRow(this.activeRow);
      while (ancestor && !navigable.includes(ancestor)) {
        ancestor = this.parentRow(ancestor);
      }
      next = ancestor ?? navigable[0];
    } else {
      next = navigable[0];
    }

    this.setActiveRow(next, false);
  }

  private setActiveRow(row: Row, moveFocus: boolean): void {
    this.activeRow = row;
    for (const candidate of this.visibleRows()) {
      const item = this.adapter.innerItem(candidate);
      if (item) item.focusable = candidate === row;
    }
    if (!moveFocus) return;
    // A row's header may render asynchronously (e.g. right after expanding a
    // group), so fall back to a microtask if it isn't present yet.
    const item = this.adapter.innerItem(row);
    if (item) item.focus();
    else queueMicrotask(() => this.adapter.innerItem(row)?.focus());
  }

  /**
   * The originating tree row for a keydown. A group's header lives in the
   * group's own shadow root, so the host-root check resolves a header to its
   * group rather than the inner header item.
   */
  private rowFromEvent(event: KeyboardEvent): Row | undefined {
    // Read the root live: the navigator is constructed before the host connects.
    const root = this.host.getRootNode();
    for (const target of event.composedPath()) {
      if (
        target instanceof HTMLElement &&
        target.getRootNode() === root &&
        this.isRow(target)
      ) {
        return target as Row;
      }
    }
    return undefined;
  }

  /** Whether an element is one of this tree's rows (group or leaf). */
  private isRow(el: HTMLElement): boolean {
    const tops = this.adapter.getRows();
    const stack = [...tops];
    while (stack.length) {
      const row = stack.pop()!;
      if (row === el) return true;
      if (this.adapter.isGroup(row)) stack.push(...this.adapter.childRows(row));
    }
    return false;
  }

  /** Handle a `keydown`; returns true if the key was consumed. */
  handleKeydown(event: KeyboardEvent): boolean {
    const row = this.rowFromEvent(event);
    if (!row) return false;

    switch (event.key) {
      case 'ArrowDown':
        this.moveByOffset(row, 1);
        return true;
      case 'ArrowUp':
        this.moveByOffset(row, -1);
        return true;
      case 'ArrowRight':
        this.onArrowRight(row);
        return true;
      case 'ArrowLeft':
        this.onArrowLeft(row);
        return true;
      case 'Home':
        this.moveToEdge(true);
        return true;
      case 'End':
        this.moveToEdge(false);
        return true;
      default:
        return false;
    }
  }

  private moveByOffset(row: Row, offset: number): void {
    const rows = this.navigableRows();
    const index = rows.indexOf(row);
    if (index === -1) return;
    const target = rows[index + offset];
    if (target) this.setActiveRow(target, true);
  }

  private moveToEdge(first: boolean): void {
    const rows = this.navigableRows();
    if (rows.length === 0) return;
    this.setActiveRow(first ? rows[0] : rows[rows.length - 1], true);
  }

  private onArrowRight(row: Row): void {
    if (!this.adapter.isGroup(row)) return;
    if (!this.adapter.isExpanded(row)) {
      this.adapter.setExpanded(row, true);
      // Re-point the roving set for hosts that don't observe expansion themselves.
      this.refresh();
      return;
    }
    const child = this.adapter.childRows(row).find((c) => !this.isDisabled(c));
    if (child) this.setActiveRow(child, true);
  }

  private onArrowLeft(row: Row): void {
    if (this.adapter.isGroup(row) && this.adapter.isExpanded(row)) {
      this.adapter.setExpanded(row, false);
      this.refresh();
      return;
    }
    const parent = this.parentRow(row);
    if (parent) this.setActiveRow(parent, true);
  }
}
