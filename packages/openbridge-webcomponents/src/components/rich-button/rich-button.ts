import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './rich-button.css?inline';

/**
 * Specifies the direction in which a RichButton arranges its content.
 * - `Vertical`: Stacks content in a column.
 * - `Horizontal`: Aligns content in a row.
 */
export enum RichButtonDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

/**
 * `<obc-rich-button>` – A configurable button component supporting label, description, and optional icons.
 *
 * The rich button presents a primary action with a prominent label, optional supporting description, and can display leading and/or trailing icons. It is designed for scenarios where a standard button is not descriptive enough, providing additional context or visual cues to the user.
 *
 * Appears as a single interactive button with flexible layout (vertical or horizontal) and supports both enabled and disabled states. Ideal for use in toolbars, cards, or anywhere a visually rich, descriptive action is needed.
 *
 * ### Features
 * - **Label and Description:** Displays a main label (single line) and an optional description (up to two lines, truncated if too long).
 * - **Icon Support:** Can show a leading icon (before the label) and/or a trailing icon (after the description), supplied via slots.
 * - **Layout Variants:**
 *   - **Vertical:** Icons and text are stacked vertically (default).
 *   - **Horizontal:** Icons and text are arranged side by side.
 * - **Disabled State:** Supports a disabled mode, preventing interaction and visually indicating inactivity.
 * - **Customizable Width:** Width adapts based on layout direction and content.
 *
 * ### Usage Guidelines
 * Use `obc-rich-button` when you need an action button that conveys more information than a standard button, such as a short explanation or a visual icon. Suitable for actions that benefit from additional context, like "Download Report" with a file icon and a description of the file type.
 *
 * - For simple actions with only a label, consider using a standard button component.
 * - Avoid overloading the button with excessive text; keep descriptions concise.
 * - Use icons to reinforce the action or provide quick visual recognition.
 * - The button is not intended for use as a menu or dropdown trigger.
 * - **TODO(designer):** Confirm if there are recommended maximum character limits for label/description, and if there are specific use cases where only one icon should be used.
 *
 * ### Slots
 * | Slot Name      | Renders When...           | Purpose                                   |
 * | -------------- | ------------------------ | ------------------------------------------ |
 * | leading-icon   | `hasLeadingIcon` is true | Icon displayed before the label            |
 * | trailing-icon  | `hasTrailingIcon` is true| Icon displayed after the description       |
 *
 * ### Events
 * - `rich-button-click` – Fired when the button is clicked (if not disabled). Event detail includes the current label and description.
 *
 * ### Example:
 * ```
 * <obc-rich-button
 *   label="Download"
 *   description="PDF, 2 MB"
 *   direction="horizontal"
 *   hasLeadingIcon
 *   hasTrailingIcon
 * >
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 *   <obi-arrow slot="trailing-icon"></obi-arrow>
 * </obc-rich-button>
 * ```
 *
 * @slot leading-icon - Icon displayed before the label (shown when `hasLeadingIcon` is true)
 * @slot trailing-icon - Icon displayed after the description (shown when `hasTrailingIcon` is true)
 * @fires rich-button-click {CustomEvent<{label: string, description: string}>} When the button is clicked and not disabled
 */
@customElement('obc-rich-button')
export class ObcRichButton extends LitElement {
  /**
   * The main label text displayed on the button (single line, truncated if too long).
   */
  @property({type: String}) label: string | HTMLTemplateResult = '';

  /**
   * Optional supporting description text (up to two lines, truncated if too long).
   */
  @property({type: String}) description = '';

  /**
   * Layout direction for the button content.
   * - `vertical` (default): Icons and text are stacked vertically.
   * - `horizontal`: Icons and text are arranged side by side.
   */
  @property({type: String}) direction: RichButtonDirection =
    RichButtonDirection.Vertical;

  /**
   * If true, displays the leading icon slot before the label.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * If true, displays the trailing icon slot after the description.
   */
  @property({type: Boolean}) hasTrailingIcon = false;

  /**
   * If true, the button is disabled and cannot be interacted with.
   */
  @property({type: Boolean}) disabled = false;

  @property({type: Boolean}) fullWidth = false;
  @property({type: Boolean}) fullHeight = false;

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('rich-button-click', {
        detail: {
          label: this.label,
          description: this.description,
        },
      })
    );
  }

  private renderContent() {
    return html`
      ${this.hasLeadingIcon
        ? html`
            <div class="icon-container leading-icon">
              <slot name="leading-icon"></slot>
            </div>
          `
        : ''}

      <div class="content-container">
        <div class="label">${this.label}</div>
        ${this.description
          ? html`<div class="description">${this.description}</div>`
          : ''}
      </div>

      ${this.hasTrailingIcon
        ? html`
            <div class="icon-container trailing-icon">
              <slot name="trailing-icon"></slot>
            </div>
          `
        : ''}
    `;
  }

  override render() {
    return html`
      <button
        class=${classMap({
          'rich-button': true,
          'direction-vertical': this.direction === RichButtonDirection.Vertical,
          'direction-horizontal':
            this.direction === RichButtonDirection.Horizontal,
          'has-leading-icon': this.hasLeadingIcon,
          'has-trailing-icon': this.hasTrailingIcon,
          disabled: this.disabled,
          'full-width': this.fullWidth,
          'full-height': this.fullHeight,
        })}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
      >
        ${this.renderContent()}
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-button': ObcRichButton;
  }
}
