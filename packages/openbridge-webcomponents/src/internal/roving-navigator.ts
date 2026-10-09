import {clamp} from '../svghelpers/math.js';

/**
 * Host-specific item resolution for a flat composite widget.
 *
 * The host owns the DOM; the navigator only decides which item holds the tab
 * stop and where the arrow keys go. `setFocusable` is how the host applies
 * that decision, because a tab, an option and a menu item each carry their
 * `tabindex` on a different element.
 */
export interface RovingAdapter<Item extends HTMLElement = HTMLElement> {
  /** Items in order, disabled ones included. */
  items(): Item[];
  /** Defaults to false when omitted. */
  isDisabled?(item: Item): boolean;
  /** The item to hold the tab stop before the user moves — the selected one. */
  preferred?(): Item | undefined;
  /** Give the item the single tab stop, or take it away. */
  setFocusable(item: Item, focusable: boolean): void;
  /** Move focus into the item. Defaults to `item.focus()`. */
  focusItem?(item: Item): void;
}

export interface RovingOptions {
  /** Which arrow keys move: Left/Right, Up/Down, or all four. */
  orientation: 'horizontal' | 'vertical' | 'both';
  /** Whether the last item continues to the first. Defaults to true. */
  wrap?: boolean;
}

/** The first element on the event's composed path that is one of `items`. */
export function itemFromEvent<Item extends HTMLElement>(
  event: Event,
  items: readonly Item[]
): Item | undefined {
  return event
    .composedPath()
    .find((target): target is Item => items.includes(target as Item));
}

/**
 * Roving tabindex for a flat composite widget — tabs, a radio-like option
 * group, a menu: one tab stop for the whole widget, arrow keys inside it,
 * Home and End to the edges. The tree variant is `TreeRovingNavigator`.
 *
 * The host forwards `keydown` to {@link handleKeydown} and `focusin` to
 * {@link handleFocusin}, and calls {@link refresh} after every render so the
 * tab stop follows structure changes. Focus only moves on user keys; the tab
 * stop also follows an item focused by other means, such as a click, so Tab
 * later leaves from where the user was.
 */
export class RovingNavigator<Item extends HTMLElement = HTMLElement> {
  activeItem?: Item;

  constructor(
    private readonly adapter: RovingAdapter<Item>,
    private readonly options: RovingOptions
  ) {}

  private navigable(): Item[] {
    return this.adapter
      .items()
      .filter((item) => !(this.adapter.isDisabled?.(item) ?? false));
  }

  /**
   * Re-point the tab stop without moving focus: the active item if it is still
   * navigable, else the preferred one, else the first.
   */
  refresh(): void {
    const navigable = this.navigable();
    if (navigable.length === 0) {
      this.activeItem = undefined;
      this.adapter
        .items()
        .forEach((item) => this.adapter.setFocusable(item, false));
      return;
    }
    const preferred = this.adapter.preferred?.();
    const next =
      (this.activeItem && navigable.includes(this.activeItem)
        ? this.activeItem
        : undefined) ??
      (preferred && navigable.includes(preferred) ? preferred : undefined) ??
      navigable[0];
    this.setActive(next, false);
  }

  setActive(item: Item, moveFocus: boolean): void {
    this.activeItem = item;
    for (const candidate of this.adapter.items()) {
      this.adapter.setFocusable(candidate, candidate === item);
    }
    if (moveFocus) (this.adapter.focusItem ?? ((it: Item) => it.focus()))(item);
  }

  handleFocusin(event: Event): void {
    const item = itemFromEvent(event, this.navigable());
    if (item && item !== this.activeItem) this.setActive(item, false);
  }

  /** Handle a `keydown`; returns true if the key was consumed. */
  handleKeydown(event: KeyboardEvent): boolean {
    if (event.altKey || event.ctrlKey || event.metaKey) return false;
    const items = this.navigable();
    const item = itemFromEvent(event, items);
    if (!item) return false;

    const horizontal = this.options.orientation !== 'vertical';
    const vertical = this.options.orientation !== 'horizontal';
    let delta: number;
    switch (event.key) {
      case 'ArrowRight':
        if (!horizontal) return false;
        delta = 1;
        break;
      case 'ArrowLeft':
        if (!horizontal) return false;
        delta = -1;
        break;
      case 'ArrowDown':
        if (!vertical) return false;
        delta = 1;
        break;
      case 'ArrowUp':
        if (!vertical) return false;
        delta = -1;
        break;
      case 'Home':
        this.setActive(items[0], true);
        return true;
      case 'End':
        this.setActive(items[items.length - 1], true);
        return true;
      default:
        return false;
    }

    const index = items.indexOf(item) + delta;
    const next =
      this.options.wrap === false
        ? clamp(index, 0, items.length - 1)
        : (index + items.length) % items.length;
    this.setActive(items[next], true);
    return true;
  }
}
