import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './modal-window.css?inline';

import '../button/button.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';

/**
 * Enum for modal window sizes.
 * - `small`: Compact size for minimal content.
 * - `medium`: Standard size for most content.
 * - `large`: Expanded size for complex content.
 */
export enum ObcModalWindowSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

/**
 * `<obc-modal-window>` – A modular dialog component for displaying content and capturing user actions.
 *
 * The `obc-modal-window` provides a structured layout with a header (title and leading icon), a content area, and a footer with action buttons (Cancel, Done, and an optional custom action).
 *
 * ### Features
 * - **Flexible Sizing:** Supports `small`, `medium`, and `large` sizes to accommodate different content amounts.
 * - **Header Customization:** Includes a title slot and an optional leading icon slot.
 * - **Action Management:** Built-in "Cancel" and "Done" buttons, plus an optional additional action button.
 * - **Responsive Actions:** Action buttons automatically switch between horizontal and vertical layouts based on the modal size.
 *
 * ### Slots
 * | Slot Name     | Renders When...             | Purpose                                            |
 * |---------------|----------------------------|----------------------------------------------------|
 * | leading-icon  | `hasLeadingIcon` is true    | Icon displayed before the title                   |
 * | title         | Always                     | Main heading text for the modal                   |
 * | content       | Always                     | Primary content area of the modal                  |
 * | option-label  | `hasOptionalAction` is true | Label for the optional action button               |
 * | cancel-label  | Always                     | Label for the cancel button                        |
 * | done-label    | Always                     | Label for the primary (done) button                |
 *
 * ### Properties
 * - `size` (ObcModalWindowSize): Controls the width and layout of the modal. Default is `large`.
 * - `hasOptionalAction` (boolean): Shows an additional action button when true.
 * - `hasLeadingIcon` (boolean): Shows the leading icon slot when true.
 *
 * ### Events
 * - `close-click`: Fired when the close (X) button in the header is clicked.
 * - `cancel-click`: Fired when the cancel button is clicked.
 * - `done-click`: Fired when the done button is clicked.
 * - `option-click`: Fired when the optional action button is clicked.
 *
 * ### Example:
 * ```html
 * <obc-modal-window size="medium" hasLeadingIcon>
 *   <span slot="leading-icon"><obi-info></obi-info></span>
 *   <span slot="title">Settings</span>
 *   <div slot="content">
 *     <p>Adjust your preferences here.</p>
 *   </div>
 *   <span slot="cancel-label">Discard</span>
 *   <span slot="done-label">Save</span>
 * </obc-modal-window>
 * ```
 *
 * @fires close-click - {CustomEvent} - Fired when the close button is clicked.
 * @fires cancel-click - {CustomEvent} - Fired when the cancel button is clicked.
 * @fires done-click - {CustomEvent} - Fired when the done button is clicked.
 * @fires option-click - {CustomEvent} - Fired when the optional action button is clicked.
 *
 * @slot leading-icon - Slot for an icon to appear before the title (shown when `hasLeadingIcon` is true)
 * @slot title - Slot for the modal title text
 * @slot content - Slot for the main content area
 * @slot option-label - Slot for the label of the optional action button (shown when `hasOptionalAction` is true)
 * @slot cancel-label - Slot for the label of the cancel button
 * @slot done-label - Slot for the label of the done button
 */
@customElement('obc-modal-window')
export class ObcModalWindow extends LitElement {
  /**
   * Controls the modal window size and action button layout.
   */
  @property({type: String}) size = ObcModalWindowSize.Large;

  /**
   * Whether to show an optional third action button.
   */
  @property({type: Boolean}) hasOptionalAction = false;

  /**
   * Whether to show the leading icon slot in the header.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  private onCloseClick = () =>
    this.dispatchEvent(new CustomEvent('close-click'));

  private onCancelClick = () =>
    this.dispatchEvent(new CustomEvent('cancel-click'));

  private onDoneClick = () => this.dispatchEvent(new CustomEvent('done-click'));

  private onOptionClick = () =>
    this.dispatchEvent(new CustomEvent('option-click'));

  protected override render() {
    const isLarge = this.size === ObcModalWindowSize.Large;
    const isMedium = this.size === ObcModalWindowSize.Medium;
    const isSmall = this.size === ObcModalWindowSize.Small;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`size-${this.size}`]: true,
        })}
      >
        <div class="title-container">
          <div class="title-content">
            ${this.hasLeadingIcon
              ? html`<div class="leading-icon">
                  <slot name="leading-icon"></slot>
                </div>`
              : nothing}
            <div class="label-container">
              <slot name="title">Title</slot>
            </div>
          </div>
          <obc-icon-button variant="flat" @click=${this.onCloseClick}>
            <obi-close-google></obi-close-google>
          </obc-icon-button>
          <div class="divider"></div>
        </div>

        <div class="content-area">
          <slot name="content"></slot>
        </div>

        <div class="action-container">
          <div class="divider"></div>
          ${this.hasOptionalAction
            ? html`<div class="optional-action-container">
                <obc-button @click=${this.onOptionClick} .fullWidth=${true}>
                  <slot name="option-label">Option</slot>
                </obc-button>
              </div>`
            : nothing}

          <div
            class=${classMap({
              'primary-action-container': true,
              'primary-action-horizontal': isLarge || isMedium,
              'primary-action-vertical': isSmall,
            })}
          >
            <obc-button
              @click=${this.onCancelClick}
              .fullWidth=${isSmall || isMedium}
            >
              <slot name="cancel-label">Cancel</slot>
            </obc-button>
            <obc-button
              variant="raised"
              @click=${this.onDoneClick}
              .fullWidth=${isSmall || isMedium}
            >
              <slot name="done-label">Done</slot>
            </obc-button>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-modal-window': ObcModalWindow;
  }
}
