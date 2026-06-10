import {LitElement, html, unsafeCSS} from 'lit';
import componentStyle from './tree-navigation.css?inline';
import {customElement} from '../../decorator.js';
import {
  ObcTreeNavigationItem,
  TreeBranchType,
} from '../tree-navigation-item/tree-navigation-item.js';
import {ObcTreeNavigationGroup} from '../tree-navigation-group/tree-navigation-group.js';
import '../tree-navigation-group/tree-navigation-group.js';

/** A tree row is either a leaf item or an expandable group. */
type TreeRow = ObcTreeNavigationItem | ObcTreeNavigationGroup;

const ITEM_TAG = 'obc-tree-navigation-item';
const GROUP_TAG = 'obc-tree-navigation-group';

function isGroup(el: Element): el is ObcTreeNavigationGroup {
  return el.tagName.toLowerCase() === GROUP_TAG;
}

function isRow(el: Element): el is TreeRow {
  const tag = el.tagName.toLowerCase();
  return tag === ITEM_TAG || tag === GROUP_TAG;
}

/**
 * `<obc-tree-navigation>` – The container for a tree- or file-explorer-style
 * navigation list. Holds nested `<obc-tree-navigation-group>` and
 * `<obc-tree-navigation-item>` rows and computes each row's indentation guide
 * lines automatically from its position in the hierarchy.
 *
 * Consumers write the tree as plain nested markup; the container assigns every
 * row's `branches` array so the guide lines (pass-through verticals, elbows, and
 * the last-child corner) connect correctly — there is no need to compute depth or
 * branch types by hand. It re-derives the guides whenever rows are added, removed,
 * or groups expand and collapse.
 *
 * ## Features
 * - **Automatic guide lines:** Each row receives a `branches` array derived from
 *   its depth and whether each ancestor still has siblings below it. Last children
 *   get a corner (`└`); rows with siblings below get an intersection (`├`); and
 *   ancestor columns become a pass-through (`│`) or blank as appropriate.
 * - **Live updates:** Reacts to slotted content changes and to group expand state,
 *   recomputing the guides so they always match the visible structure.
 * - **Composable:** Works with any nesting depth of groups and items.
 *
 * ## Usage Guidelines
 * - Use as the root of a hierarchical navigation list. For flat navigation, use
 *   `obc-navigation-menu` instead.
 * - Place `<obc-tree-navigation-group>` for expandable parents and
 *   `<obc-tree-navigation-item>` for leaves; nest groups to any depth.
 * - Do not set each row's `branches` manually — the container manages them.
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose                                            |
 * |-----------|-----------------|----------------------------------------------------|
 * | (default) | Always          | Top-level rows (`obc-tree-navigation-group`/`-item`). |
 *
 * @slot - Top-level tree rows (groups and items).
 */
@customElement('obc-tree-navigation')
export class ObcTreeNavigation extends LitElement {
  private mutationObserver?: MutationObserver;

  /** The row that currently holds the single tab stop (roving tabindex). */
  private activeRow?: TreeRow;

  override connectedCallback(): void {
    super.connectedCallback();
    // Recompute guides on any structural change: rows added/removed, or a group's
    // `expanded` attribute toggled anywhere in the subtree.
    this.mutationObserver = new MutationObserver(() => this.updateBranches());
    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['expanded'],
    });
    this.addEventListener('expand-toggle', this.onExpandToggle);
    this.addEventListener('keydown', this.onKeydown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
    this.removeEventListener('expand-toggle', this.onExpandToggle);
    this.removeEventListener('keydown', this.onKeydown);
  }

  private onExpandToggle = () => {
    // Defer so the group's `expanded` attribute and slotted children reflect the
    // new state before guides are recomputed.
    queueMicrotask(() => this.updateBranches());
  };

  override firstUpdated(): void {
    this.updateBranches();
  }

  /** Direct tree-row children of an element, in document order. */
  private childRows(el: Element): TreeRow[] {
    return Array.from(el.children).filter(isRow);
  }

  /**
   * Walk the row tree and assign each row's `branches`. Mirrors the guide-line
   * model: a row gets one column per ancestor (pass-through `straight` if that
   * ancestor still has siblings below, else `blank`) followed by its own elbow
   * (`corner` if it is the last child, else `intersection`). Top-level rows draw
   * no columns at all.
   *
   * @param rows - sibling rows at this level, in order
   * @param ancestorHasNextSibling - one flag per ancestor *below the root*: true
   *   if that ancestor has a sibling still below it (so its column is a
   *   pass-through), false if its subtree has ended (a blank column)
   * @param depth - nesting depth; 0 for top-level rows (which draw no columns)
   */
  private assignBranches(
    rows: TreeRow[],
    ancestorHasNextSibling: boolean[],
    depth: number
  ): void {
    rows.forEach((row, index) => {
      const isLast = index === rows.length - 1;
      row.branches =
        depth === 0
          ? []
          : [
              ...ancestorHasNextSibling.map((hasNext) =>
                hasNext ? TreeBranchType.straight : TreeBranchType.blank
              ),
              isLast ? TreeBranchType.corner : TreeBranchType.intersection,
            ];

      if (isGroup(row)) {
        const childAncestry =
          depth === 0 ? [] : [...ancestorHasNextSibling, !isLast];
        this.assignBranches(this.childRows(row), childAncestry, depth + 1);
      }
    });
  }

  private updateBranches(): void {
    this.assignBranches(this.childRows(this), [], 0);
    this.refreshRoving();
  }

  // --- Roving tabindex + keyboard navigation (WAI-ARIA tree pattern) ---------

  /** The `obc-tree-navigation-item` for a row: a leaf is itself; a group's is its header. */
  private innerItem(row: TreeRow): ObcTreeNavigationItem | null {
    return isGroup(row)
      ? (row.shadowRoot?.querySelector<ObcTreeNavigationItem>(ITEM_TAG) ?? null)
      : row;
  }

  private isExpanded(row: TreeRow): boolean {
    // A group reflects `expanded` on its own host; a leaf is never expanded.
    return isGroup(row) && row.hasAttribute('expanded');
  }

  private isDisabled(row: TreeRow): boolean {
    return this.innerItem(row)?.hasAttribute('disabled') ?? false;
  }

  /**
   * Depth-first list of every visible row: descend into a group only when it is
   * expanded. Disabled rows are included so {@link refreshRoving} can re-point to
   * a visible ancestor; arrow navigation filters them out via {@link navigableRows}.
   */
  private visibleRows(): TreeRow[] {
    const out: TreeRow[] = [];
    const walk = (rows: TreeRow[]) => {
      for (const row of rows) {
        out.push(row);
        if (isGroup(row) && this.isExpanded(row)) {
          walk(this.childRows(row));
        }
      }
    };
    walk(this.childRows(this));
    return out;
  }

  /** Visible rows that arrow navigation can land on (enabled rows). */
  private navigableRows(): TreeRow[] {
    return this.visibleRows().filter((row) => !this.isDisabled(row));
  }

  /** The parent row of a row within this tree, or undefined for a top-level row. */
  private parentRow(row: TreeRow): TreeRow | undefined {
    const parent = row.parentElement;
    return parent && parent !== this && isRow(parent) ? parent : undefined;
  }

  /**
   * Rebuild the roving tabindex: exactly one navigable row is `focusable`. Keeps
   * the active row if still navigable; else falls back to its nearest navigable
   * ancestor, else the first navigable row. Never moves focus.
   */
  private refreshRoving(): void {
    const navigable = this.navigableRows();
    if (navigable.length === 0) {
      this.activeRow = undefined;
      return;
    }

    let next: TreeRow | undefined;
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

  private setActiveRow(row: TreeRow, moveFocus: boolean): void {
    this.activeRow = row;
    for (const candidate of this.visibleRows()) {
      const item = this.innerItem(candidate);
      if (item) item.focusable = candidate === row;
    }
    if (moveFocus) this.innerItem(row)?.focus();
  }

  /**
   * The originating tree row for a keydown. The composed path runs innermost →
   * outermost; a group's header is an `obc-tree-navigation-item` in the group's
   * own shadow root (excluded by the root check below), while the group itself
   * lives in the container's light DOM. Return the *innermost* such light-DOM
   * row so a header resolves to its own group — not the inner item, and not an
   * enclosing ancestor group.
   */
  private rowFromEvent(event: KeyboardEvent): TreeRow | undefined {
    const root = this.getRootNode();
    for (const target of event.composedPath()) {
      if (
        target instanceof HTMLElement &&
        isRow(target) &&
        target.getRootNode() === root
      ) {
        return target;
      }
    }
    return undefined;
  }

  private onKeydown = (event: KeyboardEvent): void => {
    const row = this.rowFromEvent(event);
    if (!row) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveByOffset(row, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveByOffset(row, -1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.onArrowRight(row);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.onArrowLeft(row);
        break;
      case 'Home':
        event.preventDefault();
        this.moveToEdge(true);
        break;
      case 'End':
        event.preventDefault();
        this.moveToEdge(false);
        break;
    }
  };

  private moveByOffset(row: TreeRow, offset: number): void {
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

  private onArrowRight(row: TreeRow): void {
    if (!isGroup(row)) return;
    if (!this.isExpanded(row)) {
      this.toggle(row);
      return;
    }
    const child = this.childRows(row).find((c) => !this.isDisabled(c));
    if (child) this.setActiveRow(child, true);
  }

  private onArrowLeft(row: TreeRow): void {
    if (isGroup(row) && this.isExpanded(row)) {
      this.toggle(row);
      return;
    }
    const parent = this.parentRow(row);
    if (parent) this.setActiveRow(parent, true);
  }

  /**
   * Toggle a group's disclosure. Set `expanded` on the group host directly — the
   * container's MutationObserver on `expanded` recomputes guides and the roving
   * tabindex. (Clicking the shadow header would not trigger its internal handler.)
   */
  private toggle(row: TreeRow): void {
    if (!isGroup(row)) return;
    row.expanded = !row.expanded;
  }

  override render() {
    return html`<div role="tree">
      <slot @slotchange=${() => this.updateBranches()}></slot>
    </div>`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tree-navigation': ObcTreeNavigation;
  }
}
