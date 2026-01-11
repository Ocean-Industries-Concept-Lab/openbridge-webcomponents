import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './rich-text-input-field.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-placeholder.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-screen-shot.js';
import '../../icons/icon-image.js';
import '../../icons/icon-attachment.js';

/**
 * `<obc-rich-text-input-field>` – A multi-line, rich text input component with optional toolbar and leading icon.
 *
 * Provides a flexible text area for user input, supporting features like a contextual toolbar (for actions such as send, screenshot, image, and attachment), an optional leading icon, and a configurable title with required indicator. Designed for scenarios where users need to enter or edit extended text, such as composing messages, notes, or comments.
 *
 * Appears as a styled textarea with optional enhancements, allowing for both simple and advanced input workflows. The toolbar enables quick access to common actions, while error and disabled states help communicate input status.
 *
 * ### Features
 * - **Multi-line Input:** Allows users to enter and edit extended text content.
 * - **Toolbar (optional):** When `hasToolbar` is true, displays action buttons for sending, taking screenshots, adding images, and attaching files.
 * - **Leading Icon (optional):** Supports a leading icon slot for contextual or branding icons.
 * - **Title and Required Indicator:** Can display a title above the input, with a visual required marker if `isRequired` is true.
 * - **Error State:** Highlights the input field to indicate validation errors when `hasError` is true.
 * - **Disabled State:** Prevents user interaction and visually indicates when input is not allowed.
 * - **Custom Placeholder:** Configurable placeholder text for guidance.
 * - **Value Binding:** Supports two-way binding via the `value` property and `value-changed` event.
 *
 * ### Usage Guidelines
 * Use `obc-rich-text-input-field` when you need a multi-line input area with optional contextual actions. Ideal for chat/message composition, comment fields, or any scenario requiring rich user input with quick access to related actions (e.g., attaching files or images).
 *
 * - Enable the toolbar (`hasToolbar`) for workflows where users frequently need to send, attach, or enhance their input.
 * - Use the leading icon slot to visually reinforce the input’s context or purpose.
 * - Show the title and required indicator for forms or structured data entry.
 * - Use the error state to communicate validation issues.
 *
 * **TODO(designer):** Provide guidance on when to use this component versus a standard text input or other rich text editors. Clarify if the toolbar actions are customizable or fixed.
 *
 * ### Slots
 * | Slot Name      | Renders When...        | Purpose                                      |
 * | -------------- | --------------------- | --------------------------------------------- |
 * | leading-icon   | hasLeadingIcon=true   | Displays a contextual icon before the input.  |
 *
 * ### Events
 * - `send-click` – Fired when the send (up arrow) button in the toolbar is clicked.
 * - `screenshot-click` – Fired when the screenshot button in the toolbar is clicked.
 * - `image-click` – Fired when the image button in the toolbar is clicked.
 * - `attachment-click` – Fired when the attachment button in the toolbar is clicked.
 * - `value-changed` – Fired whenever the text value changes (on input).
 *
 * ### Best Practices & Constraints
 * - Keep placeholder and title text concise for clarity.
 * - Use error state to clearly indicate validation problems.
 * - When disabled, all actions and input are blocked.
 * - Toolbar actions are only available when `hasToolbar` is true.
 * - Only use the required indicator if the field is truly mandatory.
 * - For accessibility, ensure the title or placeholder clearly describes the expected input.
 *
 * ### Example:
 * ```
 * <obc-rich-text-input-field
 *   hasToolbar
 *   hasLeadingIcon
 *   hasTitle
 *   title="Comment"
 *   isRequired
 *   placeholder="Write your comment..."
 * >
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 * </obc-rich-text-input-field>
 * ```
 *
 * @slot leading-icon - Displays a contextual icon before the input when `hasLeadingIcon` is true.
 * @fires send-click {CustomEvent<{value:string}>} Fired when the send (up arrow) button is clicked.
 * @fires screenshot-click {CustomEvent<{value:string}>} Fired when the screenshot button is clicked.
 * @fires image-click {CustomEvent<{value:string}>} Fired when the image button is clicked.
 * @fires attachment-click {CustomEvent<{value:string}>} Fired when the attachment button is clicked.
 * @fires value-changed {CustomEvent<{value:string}>} Fired whenever the text value changes.
 */
@customElement('obc-rich-text-input-field')
export class ObcRichTextInputField extends LitElement {
  /**
   * Disables the input field and all toolbar actions when true.
   * When disabled, user cannot enter text or trigger any toolbar actions.
   */
  @property({type: Boolean}) isDisabled = false;

  /**
   * Indicates an error state for the input field.
   * When true, the input is visually highlighted to signal a validation error.
   */
  @property({type: Boolean}) hasError = false;

  /**
   * Placeholder text shown when the input is empty.
   * Use to guide users on expected input.
   */
  @property({type: String}) placeholder = 'Type your text here...';

  /**
   * Shows a leading icon before the input field when true.
   * Supply icon content via the `leading-icon` slot.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * Displays the toolbar with action buttons when true.
   * Toolbar includes send, screenshot, image, and attachment actions.
   */
  @property({type: Boolean}) hasToolbar = false;

  /**
   * Shows a title above the input field when true.
   * The title text is set via the `title` property.
   */
  @property({type: Boolean}) hasTitle = false;

  /**
   * Title text displayed above the input field when `hasTitle` is true.
   */
  @property({type: String}) override title = 'Title';

  /**
   * Shows a required indicator next to the title when true.
   * Use to indicate that the field must be filled out.
   */
  @property({type: Boolean}) isRequired = false;

  /**
   * The current value of the input field.
   * Updates as the user types; emits `value-changed` on change.
   */
  @property({type: String}) value = '';

  private handleSendClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('send-click', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleScreenshotClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('screenshot-click', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleImageClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('image-click', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAttachmentClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('attachment-click', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          disabled: this.isDisabled,
          error: this.hasError,
          'has-leading-icon': this.hasLeadingIcon,
        })}
      >
        ${this.hasTitle
          ? html`<div class="title-text-container">
              <p class="title-text">${this.title}</p>
              ${this.isRequired
                ? html`<div class="required-indicator"></div>`
                : nothing}
            </div>`
          : nothing}
        <div class="content-container">
          ${this.hasLeadingIcon
            ? html` <div class="leading-icon">
                <slot name="leading-icon">
                  <obi-placeholder></obi-placeholder>
                </slot>
              </div>`
            : nothing}
          <textarea
            class="input-field"
            .placeholder=${this.placeholder}
            .value=${this.value}
            @input=${this.handleInput}
            ?disabled=${this.isDisabled}
          ></textarea>
          ${this.hasToolbar
            ? html` <div class="tool-bar-container">
                <div class="tool-container">
                  <div class="divider"></div>
                  <obc-icon-button
                    class="up-icon-button"
                    variant="flat"
                    @click=${this.handleSendClick}
                    ?disabled=${this.isDisabled}
                  >
                    <obi-up-iec></obi-up-iec>
                  </obc-icon-button>
                  <obc-icon-button
                    variant="flat"
                    @click=${this.handleScreenshotClick}
                    ?disabled=${this.isDisabled}
                  >
                    <obi-screen-shot></obi-screen-shot>
                  </obc-icon-button>
                  <obc-icon-button
                    variant="flat"
                    @click=${this.handleImageClick}
                    ?disabled=${this.isDisabled}
                  >
                    <obi-image></obi-image>
                  </obc-icon-button>
                  <obc-icon-button
                    variant="flat"
                    @click=${this.handleAttachmentClick}
                    ?disabled=${this.isDisabled}
                  >
                    <obi-attachment></obi-attachment>
                  </obc-icon-button>
                </div>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-text-input-field': ObcRichTextInputField;
  }
}
