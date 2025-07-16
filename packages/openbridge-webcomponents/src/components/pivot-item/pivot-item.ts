import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './pivot-item.css?inline';

export enum ObcPivotItemDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

/**
 * `<obc-pivot-item>` – A selectable tab or navigation item for use in pivot/tab bars and segmented controls.
 *
 * Represents a single option within a group of pivot items, supporting icon-only, label-only, or combined icon+label layouts. Designed for navigation or view switching scenarios where users select one option from a set. Can be arranged horizontally or vertically to fit different UI layouts.
 *
 * ---
 *
 * ### Features
 * - **Direction:** Supports `horizontal` (default) or `vertical` layout, adapting to the orientation of the containing group.
 * - **Icon and Label Options:** Can display a leading icon (via the `icon` slot), a text label (via the `label` property), or both. Each can be toggled independently.
 * - **Selection State:** Indicates the currently selected item with a visual highlight (active tab stroke). Only one item should be selected in a group at a time.
 * - **Disabled State:** Can be disabled to prevent interaction and visually indicate inactivity.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-pivot-item` within an `obc-pivot-item-group` to create tab bars, segmented controls, or navigation rails. Ideal for switching between views, pages, or content sections. Choose horizontal orientation for top navigation bars and vertical for side navigation or tool selectors. Use icons for compact layouts or when representing actions visually; combine with labels for clarity. Avoid using for persistent navigation (use a menu or list instead).
 *
 * **TODO(designer):** Confirm if there are recommended limits on icon or label length, and if divider usage is preferred in certain layouts.
 *
 * ---
 *
 * ### Slots
 * | Slot Name | Renders When...         | Purpose                                   |
 * |-----------|------------------------|-------------------------------------------|
 * | icon      | `hasLeadingIcon` true  | Leading icon representing the item. Place an icon such as `<obi-home slot="icon"></obi-home>`. |
 *
 * ---
 *
 * ### Events
 * - `selected` – Fired when the item is clicked and becomes selected. Event detail: `{ value: string }`.
 *
 * ---
 *
 * ### Example:
 * ```
 * <obc-pivot-item
 *   value="home"
 *   label="Home"
 *   hasLeadingIcon
 *   hasLabel
 * >
 *   <obi-home slot="icon"></obi-home>
 * </obc-pivot-item>
 * ```
 * In this example, the item displays a home icon and a label. When clicked (and not already selected/disabled), it emits a `selected` event.
 *
 * @slot icon - Leading icon slot (shown when `hasLeadingIcon` is true)
 * @fires selected {CustomEvent<{value: string}>} When the item is clicked and becomes selected
 */
@customElement('obc-pivot-item')
export class ObcPivotItem extends LitElement {
  /**
   * The value associated with this pivot item. Used to identify the item within a group.
   */
  @property({type: String}) value = '';

  /**
   * Whether this item is currently selected. Only one item should be selected in a group.
   */
  @property({type: Boolean, reflect: true}) selected = false;

  /**
   * Layout direction for the item: `horizontal` (default) or `vertical`.
   * Should match the direction of the containing group.
   */
  @property({type: String}) direction: ObcPivotItemDirection =
    ObcPivotItemDirection.horizontal;

  /**
   * Whether to display a leading icon. If true, renders the `icon` slot.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * Whether to display a text label. If true and `label` is non-empty, shows the label.
   */
  @property({type: Boolean}) hasLabel = false;

  /**
   * The text label to display for the item. Only shown if `hasLabel` is true and label is non-empty.
   */
  @property({type: String}) label = '';

  /**
   * Disables the item, preventing interaction and applying a disabled style.
   */
  @property({type: Boolean}) disabled = false;

  private onClick() {
    // Don't allow clicking if disabled OR already selected
    if (this.disabled || this.selected) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    const isVertical = this.direction === ObcPivotItemDirection.vertical;
    const shouldShowLabel = this.hasLabel && this.label.trim().length > 0;

    const classes = classMap({
      wrapper: true,
      selected: this.selected,
      'direction-vertical': isVertical,
      'direction-horizontal': !isVertical,
      'has-leading-icon': this.hasLeadingIcon,
      'has-label': this.hasLabel,
      disabled: this.disabled,
    });

    return html`
      <button
        class=${classes}
        @click=${this.onClick}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
      >
        <div class="visible-wrapper">
          <div class="placeholder">
            <div class="icon-label-container">
              ${this.hasLeadingIcon
                ? html`<div class="icon">
                    <slot name="icon"></slot>
                  </div>`
                : nothing}
              ${shouldShowLabel
                ? html`<div class="label">${this.label}</div>`
                : nothing}
            </div>
          </div>
        </div>

        <div class="selected-container">
          <div class="active-tab-stroke"></div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pivot-item': ObcPivotItem;
  }
}
