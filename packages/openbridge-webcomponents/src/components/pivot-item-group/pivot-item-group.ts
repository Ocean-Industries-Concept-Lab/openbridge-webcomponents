import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './pivot-item-group.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ObcPivotItemDirection, ObcPivotItem} from '../pivot-item/pivot-item.js';

/**
 * `<obc-pivot-item-group>` – A container for managing a set of pivot items (tab-like or segmented controls) with single selection.
 *
 * Groups multiple `<obc-pivot-item>` components and handles their selection logic, ensuring only one item is selected at a time (or none, if allowed). Provides a way to visually and functionally organize navigation or filtering controls in either a horizontal or vertical layout.
 *
 * ### Features
 * - **Single selection management:** Only one pivot item can be selected at a time. Optionally allows deselecting all.
 * - **Layout direction:** Supports `horizontal` (default, items in a row) or `vertical` (items stacked in a column) via the `direction` property.
 * - **Deselect option:** When `allowDeselect` is true, clicking the selected item will deselect it (no item selected).
 * - **Syncs child state:** Automatically updates all child `<obc-pivot-item>` components to reflect the current selection and layout direction.
 * - **Change event:** Emits a `change` event whenever the selection changes, with the new value.
 *
 * ### Usage Guidelines
 * Use `obc-pivot-item-group` to present a set of mutually exclusive options, such as navigation tabs, segmented controls, or filter toggles. Ideal for scenarios where users need to switch between views, categories, or modes.
 * For independent toggles, use a different component (e.g., checkboxes or chips).
 *
 * - Set the `direction` property to `vertical` for sidebar or stacked layouts, or leave as `horizontal` for toolbar/tab layouts.
 * - Use `allowDeselect` if you want to permit users to clear their selection entirely.
 * - Place one or more `<obc-pivot-item>` elements as children; each should have a unique `value` property.
 *
 * **TODO(designer):** Clarify if there are recommended use cases or visual constraints for horizontal vs. vertical layouts, and if there are accessibility guidelines for keyboard navigation.
 *
 * ### Slots and Content Structure
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always          | Place one or more `<obc-pivot-item>` elements here. Each represents a selectable option. |
 *
 * ### Events
 * - `change` – Fired whenever the selected value changes. Event detail: `{selectedValue: string}`.
 *
 * ### Best Practices and Constraints
 * - Ensure each child `<obc-pivot-item>` has a unique `value` property.
 * - Only use `allowDeselect` if having no selection is a valid state for your use case.
 * - For accessibility, ensure the group and items are labeled appropriately (see `<obc-pivot-item>` docs for ARIA guidance).
 *
 * **Example:**
 * ```html
 * <obc-pivot-item-group direction="horizontal" selectedValue="a">
 *   <obc-pivot-item value="a">Option A</obc-pivot-item>
 *   <obc-pivot-item value="b">Option B</obc-pivot-item>
 *   <obc-pivot-item value="c">Option C</obc-pivot-item>
 * </obc-pivot-item-group>
 * ```
 *
 * @slot - Default slot for one or more `<obc-pivot-item>` elements.
 * @fires change {CustomEvent<{selectedValue: string}>} Fired when the selected value changes.
 */
@customElement('obc-pivot-item-group')
export class ObcPivotItemGroup extends LitElement {
  /**
   * Layout direction for the group: `'horizontal'` (default, items in a row) or `'vertical'` (items stacked).
   * Changing this updates the direction of all child pivot items.
   */
  @property({type: String}) direction: ObcPivotItemDirection =
    ObcPivotItemDirection.horizontal;

  /**
   * The value of the currently selected pivot item.
   * Set this to control selection programmatically, or listen for the `change` event to react to user selection.
   * Defaults to empty string (no selection).
   */
  @property({type: String}) selectedValue = '';

  /**
   * If true, allows the user to deselect the currently selected item by clicking it again (resulting in no selection).
   * If false (default), one item is always selected unless `selectedValue` is empty.
   */
  @property({type: Boolean}) allowDeselect = false;

  private handleItemSelected(event: CustomEvent) {
    event.stopPropagation();
    const {value} = event.detail;

    if (this.allowDeselect && this.selectedValue === value) {
      this.selectedValue = '';
    } else {
      this.selectedValue = value;
    }

    this.updateChildItems();

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {selectedValue: this.selectedValue},
        bubbles: true,
        composed: true,
      })
    );
  }

  private updateChildItems() {
    const items = this.querySelectorAll(
      'obc-pivot-item'
    ) as NodeListOf<ObcPivotItem>;

    items.forEach((item) => {
      item.selected = item.value === this.selectedValue;
      item.direction = this.direction;
    });
  }

  override firstUpdated() {
    // Wait for slotted content to be available
    this.updateComplete.then(() => {
      this.updateChildItems();
    });
  }

  override updated(changedProperties: PropertyValues) {
    if (
      changedProperties.has('selectedValue') ||
      changedProperties.has('direction')
    ) {
      this.updateChildItems();
    }
  }

  override render() {
    const classes = classMap({
      'pivot-group': true,
      'direction-horizontal':
        this.direction === ObcPivotItemDirection.horizontal,
      'direction-vertical': this.direction === ObcPivotItemDirection.vertical,
    });

    return html`
      <div class=${classes} @selected=${this.handleItemSelected}>
        <slot></slot>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pivot-item-group': ObcPivotItemGroup;
  }
}
