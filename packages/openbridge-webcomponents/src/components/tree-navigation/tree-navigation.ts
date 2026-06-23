import {LitElement, html, unsafeCSS} from 'lit';
import componentStyle from './tree-navigation.css?inline';
import {customElement} from '../../decorator.js';
import {
  ObcTreeNavigationItem,
  TreeBranchType,
} from '../tree-navigation-item/tree-navigation-item.js';
import {ObcTreeNavigationGroup} from '../tree-navigation-group/tree-navigation-group.js';
import '../tree-navigation-group/tree-navigation-group.js';
import {
  TreeRovingNavigator,
  TreeRovingAdapter,
} from '../../internal/tree-roving-navigator.js';

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

  /** The focusable header item for a row: a leaf is itself; a group's is its shadow header. */
  private innerItem(row: TreeRow): ObcTreeNavigationItem | null {
    return isGroup(row)
      ? (row.shadowRoot?.querySelector<ObcTreeNavigationItem>(ITEM_TAG) ?? null)
      : row;
  }

  private readonly navigator = new TreeRovingNavigator<TreeRow>(this, {
    getRows: () => this.childRows(this),
    childRows: (row) => this.childRows(row),
    isGroup: (row) => isGroup(row),
    isExpanded: (row) => isGroup(row) && row.hasAttribute('expanded'),
    setExpanded: (row, expanded) => {
      if (isGroup(row)) row.expanded = expanded;
    },
    innerItem: (row) => this.innerItem(row),
    isDisabled: (row) => this.innerItem(row)?.hasAttribute('disabled') ?? false,
  } satisfies TreeRovingAdapter<TreeRow>);

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

  private onKeydown = (event: KeyboardEvent): void => {
    if (this.navigator.handleKeydown(event)) event.preventDefault();
  };

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
    // Keep the roving tabindex in lockstep with the visible structure.
    this.navigator.refresh();
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
