import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './accordion-item.css?inline';
import {property} from 'lit/decorators.js';
import '../../icons/icon-chevron-down-google.js';

/**
 * `<obc-accordion-item>` – A collapsible section component for toggling the visibility of content panels (commonly known as an accordion item, expandable panel, or disclosure).
 *
 * Provides a single expandable/collapsible section with a clickable header and an optional content area. Useful for organizing related information in a compact, vertically stacked layout, allowing users to reveal or hide details as needed.
 *
 * ### Features
 * - **Toggleable Expansion:** Click the header to expand or collapse the content area. The chevron icon visually indicates the current state.
 * - **Disabled State:** Prevents user interaction and visually indicates non-interactivity.
 * - **Customizable Content:** Slot for custom expanded content (`expanded-content`), supporting any HTML or component.
 * - **Optional Divider:** Can display a divider line below the item for visual separation in lists.
 * - **Show/Hide Content Area:** Optionally hide the expanded content area entirely (e.g., for header-only items).
 * - **Accessible:** Uses a button for the header with appropriate ARIA attributes for accessibility.
 *
 * ### Usage Guidelines
 * Use `obc-accordion-item` to organize content into expandable sections, such as FAQs, settings panels, or grouped lists. Ideal when you want to let users scan section titles and expand only those relevant to them. For multi-item accordions, stack several `obc-accordion-item` components vertically.
 *
 * - Use the `title` property for the section label.
 * - Place any custom content (text, forms, components) in the `expanded-content` slot.
 * - Use the `disabled` property to prevent interaction for items that should not be toggled.
 * - Use the `showDivider` property to visually separate items in a list.
 * - If you need a persistent panel (not collapsible), use a different container component.
 *
 * **TODO(designer):** Confirm if there are recommended patterns for managing open/close state in multi-item accordions (e.g., only one open at a time), or if this is left to the developer.
 *
 * ### Slots
 * | Slot Name         | Renders When...           | Purpose                                         |
 * |-------------------|--------------------------|-------------------------------------------------|
 * | expanded-content  | When `open` and `showContent` are true | Custom content displayed when expanded           |
 *
 * ### Events
 * - `accordion-item-toggle` – Fired when the item is toggled open or closed. Event detail: `{ open: boolean, title: string }`
 *
 * ### Best Practices
 * - Keep section titles concise for easy scanning.
 * - Avoid placing interactive controls in the header area to prevent accidental toggling.
 * - For accessibility, ensure each item’s title is unique within a group.
 *
 * **Example:**
 * ```
 * <obc-accordion-item title="Details" .open=${false}>
 *   <div slot="expanded-content">
 *     <p>Additional information goes here.</p>
 *   </div>
 * </obc-accordion-item>
 * ```
 *
 * @slot expanded-content - Content displayed when the item is expanded and `showContent` is true.
 * @fires accordion-item-toggle {CustomEvent<{open: boolean, title: string}>} Fired when the item is toggled open or closed.
 */
@customElement('obc-accordion-item')
export class ObcAccordionItem extends LitElement {
  /**
   * The label displayed in the header of the accordion item.
   */
  @property({type: String}) override title = '';

  /**
   * Whether the item is expanded (shows the content area).
   * Set to `true` to expand, `false` to collapse.
   */
  @property({type: Boolean}) open = false;

  /**
   * Disables the accordion item, preventing user interaction and dimming the appearance.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Displays a divider line below the item for visual separation.
   * Useful when stacking multiple items in a list.
   */
  @property({type: Boolean}) showDivider = false;

  private handleToggle() {
    if (this.disabled) return;

    this.open = !this.open;

    this.dispatchEvent(
      new CustomEvent('accordion-item-toggle', {
        detail: {
          open: this.open,
          title: this.title,
        },
      })
    );
  }

  private renderContent() {
    return html`
      <div class="content">
        <div class="leading-content-container">
          <div class="label-frame">
            <div class="title">${this.title}</div>
          </div>
        </div>
        <div class="trailing-icon">
          <obi-chevron-down-google></obi-chevron-down-google>
        </div>
      </div>
    `;
  }

  private renderExpandedContent() {
    if (!this.open) return '';

    return html`
      <div class="content-container">
        <slot name="expanded-content"></slot>
      </div>
    `;
  }

  private renderDivider() {
    if (!this.showDivider) return '';

    return html`<div class="divider"></div>`;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'state-disabled': this.disabled,
          'open-true': this.open,
          'open-false': !this.open,
        })}
      >
        <button
          class="content-button"
          @click=${this.handleToggle}
          ?disabled=${this.disabled}
          aria-expanded=${this.open}
        >
          ${this.renderContent()}
        </button>

        ${this.renderExpandedContent()} ${this.renderDivider()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-accordion-item': ObcAccordionItem;
  }
}
