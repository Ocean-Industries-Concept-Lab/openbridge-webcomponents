import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './attachment-list-item.css?inline';

/**
 * `<obc-attachment-list-item>` - A list item for displaying file attachments.
 *
 * @summary Displays a file attachment entry with optional icon, index, tag,
 * date/time, and trailing action. Supports flat and amplified visual styles
 * with all standard interactive states.
 *
 * ### Features / Variants
 * - **Leading Icon:** Optional icon slot before the file name.
 * - **Index:** Optional index number displayed before the icon.
 * - **Tag:** Optional tag slot displayed after the file name.
 * - **Time/Date:** Optional date and time display.
 * - **Trailing Action:** Optional action button slot (e.g., download/delete).
 * - **Amplified:** Highlighted visual style for emphasis.
 * - **Divider:** Optional bottom divider line.
 * - **Disabled:** Non-interactive muted appearance.
 *
 * ### Slots
 * | Slot Name        | Renders When...           | Purpose                                |
 * |------------------|---------------------------|----------------------------------------|
 * | `leading-icon`   | `hasLeadingIcon` is true  | Icon before the file name              |
 * | `tag`            | `hasTag` is true          | Tag element after the file name        |
 * | `trailing-action`| `hasTrailingAction` is true| Action button (e.g., icon-button)      |
 *
 * ### Events
 * | Event Name             | Detail              | Description                           |
 * |------------------------|---------------------|---------------------------------------|
 * | `attachment-item-click`| `{ label: string }` | Fired when the item is clicked.       |
 *
 * ### Example
 * ```html
 * <obc-attachment-list-item
 *   label="Document.pdf"
 *   date="09 May 2025"
 *   time="10:41:32"
 *   hasLeadingIcon
 *   hasTimeDate
 *   hasTrailingAction
 * >
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 *   <obc-icon-button slot="trailing-action" variant="flat">
 *     <obi-placeholder></obi-placeholder>
 *   </obc-icon-button>
 * </obc-attachment-list-item>
 * ```
 *
 * @fires {CustomEvent<{label: string}>} attachment-item-click - Fired when the item is clicked.
 * @slot leading-icon - Icon displayed before the file name.
 * @slot tag - Tag element displayed after the file name.
 * @slot trailing-action - Trailing action button.
 */
@customElement('obc-attachment-list-item')
export class ObcAttachmentListItem extends LitElement {
  /** The file name or label text displayed in the item. */
  @property({type: String}) label = 'File name';

  /** Optional index text displayed before the icon (e.g., "01"). */
  @property({type: String}) index = '';

  /** Whether to show the index. */
  @property({type: Boolean}) hasIndex = false;

  /** Whether to show the leading icon slot. */
  @property({type: Boolean}) hasLeadingIcon = false;

  /** Whether to show the tag slot. */
  @property({type: Boolean}) hasTag = false;

  /** Whether to show the date and time. */
  @property({type: Boolean}) hasTimeDate = false;

  /** The date string to display (e.g., "09 May 2025"). */
  @property({type: String}) date = '';

  /** The time string to display (e.g., "10:41:32"). */
  @property({type: String}) time = '';

  /** Whether to show the trailing action slot. */
  @property({type: Boolean}) hasTrailingAction = false;

  /** Whether to show the bottom divider. */
  @property({type: Boolean}) showDivider = false;

  /** Whether the item is in amplified (highlighted) state. */
  @property({type: Boolean}) amplified = false;

  /** Whether the item is disabled. */
  @property({type: Boolean}) disabled = false;

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('disabled')) {
      this._updateTrailingActionDisabled();
    }
  }

  private _updateTrailingActionDisabled() {
    const slot = this.shadowRoot?.querySelector(
      'slot[name="trailing-action"]'
    ) as HTMLSlotElement | null;
    if (!slot) return;
    for (const node of slot.assignedElements()) {
      if (this.disabled) {
        node.setAttribute('disabled', '');
      } else {
        node.removeAttribute('disabled');
      }
    }
  }

  private _handleTrailingActionSlotChange() {
    this._updateTrailingActionDisabled();
  }

  private _handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('attachment-item-click', {
        bubbles: true,
        composed: true,
        detail: {label: this.label},
      })
    );
  }

  override render() {
    return html`
      <button
        type="button"
        class=${classMap({
          wrapper: true,
          amplified: this.amplified,
          disabled: this.disabled,
        })}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        ${this.showDivider ? html`<div class="divider"></div>` : nothing}
        <div class="content-container">
          <div class="label-group">
            ${this.hasIndex
              ? html`<span class="index-label">${this.index}</span>`
              : nothing}
            ${this.hasLeadingIcon
              ? html`<div class="leading-icon">
                  <slot name="leading-icon"></slot>
                </div>`
              : nothing}
            <div class="file-name-container">
              <span class="file-name">${this.label}</span>
            </div>
          </div>
          ${this.hasTag
            ? html`<div class="tag-container">
                <slot name="tag"></slot>
              </div>`
            : nothing}
          <div class="trailing-group">
            ${this.hasTimeDate
              ? html`<div class="time-date-container">
                  <span class="date-label">${this.date}</span>
                  <span class="time-label">${this.time}</span>
                </div>`
              : nothing}
            ${this.hasTrailingAction
              ? html`<div class="trailing-action">
                  <slot
                    name="trailing-action"
                    @slotchange=${this._handleTrailingActionSlotChange}
                  ></slot>
                </div>`
              : nothing}
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-attachment-list-item': ObcAttachmentListItem;
  }
}
