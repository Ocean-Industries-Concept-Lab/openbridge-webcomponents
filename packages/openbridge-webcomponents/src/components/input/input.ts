import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './input.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Enumeration of all valid HTML input types for use with `<obc-input>`.
 * Matches the standard set of input types supported by HTML.
 */
export enum HTMLInputTypeAttribute {
  Button = 'button',
  Checkbox = 'checkbox',
  Color = 'color',
  Date = 'date',
  DateTimeLocal = 'datetime-local',
  Email = 'email',
  File = 'file',
  Hidden = 'hidden',
  Image = 'image',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Radio = 'radio',
  Range = 'range',
  Reset = 'reset',
  Search = 'search',
  Submit = 'submit',
  Tel = 'tel',
  Text = 'text',
  Time = 'time',
  Url = 'url',
  Week = 'week',
}

/**
 * Font style options for `<obc-input>`.
 * - `body`: Standard body text style.
 * - `button`: Bolder, button-like text style.
 */
export enum ObcInputFont {
  Body = 'body',
  Button = 'button',
}

/**
 * Text alignment options for `<obc-input>`.
 * - `left`: Align text to the left (default).
 * - `center`: Center-align text.
 * - `right`: Align text to the right.
 */
export enum ObcInputTextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

/**
 * `<obc-input>` – A versatile single-line text input field supporting icons, helper text, and multiple visual styles.
 *
 * Provides a customizable input field for user text entry, supporting leading/trailing icons, helper text, error state, and various layout and style options. Designed for use in forms, search bars, and other data entry scenarios where a standard text input is required.
 *
 * Appears as a single-line field with optional icons and helper text, adapting to different use cases such as password entry, search, or numeric input.
 *
 * ## Features
 * - **Input types:** Supports all standard HTML input types (text, password, email, number, search, etc.) via the `type` property.
 * - **Leading/trailing icons:** Optional slots for icons before or after the input (e.g., search icon, clear button).
 * - **Helper text:** Slot for additional guidance or validation feedback below the field.
 * - **Error state:** Visual error indication when `error` is true.
 * - **Disabled/required states:** Standard form control behaviors.
 * - **Text alignment:** Left, center, or right alignment via `textAlign`.
 * - **Font style:** Switch between body and button font weights.
 * - **Squared corners:** Option to remove border radius for a squared look.
 * - **No horizontal padding:** Remove side padding for edge-to-edge layouts.
 *
 * ## Usage Guidelines
 * Use `<obc-input>` for single-line text entry in forms, search bars, or filter controls. It is suitable for capturing user input such as names, emails, passwords, or search queries. For multi-line input, use a textarea component instead.
 *
 * - Use the `type` property to match the expected data (e.g., `type="email"` for email addresses).
 * - Add leading or trailing icons for context (e.g., a search icon for search fields).
 * - Use the `helper-text` slot to provide validation feedback or additional instructions.
 * - Set `error` to true to visually indicate a validation error.
 * - For accessibility, ensure `placeholder` text is meaningful and not used as a replacement for labels.
 *
 * **TODO(designer):** Confirm if there are recommended character limits or best practices for helper text length.
 *
 * ## Slots
 *
 * | Slot Name        | Renders When...            | Purpose                                               |
 * |------------------|---------------------------|-------------------------------------------------------|
 * | leading-icon     | `hasLeadingIcon` is true  | Icon displayed before the input (e.g., search, user). |
 * | trailing-icon    | `hasTrailingIcon` is true | Icon displayed after the input (e.g., clear, reveal). |
 * | helper-text      | Always                     | Helper or validation text below the input.            |
 *
 * ## Properties and Attributes
 * - `type`: Sets the input type (default: `text`). Accepts any value from `HTMLInputTypeAttribute`.
 * - `value`: The current value of the input field.
 * - `placeholder`: Placeholder text shown when the field is empty.
 * - `squared`: If true, removes border radius for a squared appearance.
 * - `textAlign`: Controls text alignment (`left`, `center`, `right`).
 * - `font`: Sets the font style (`body` for regular, `button` for bold).
 * - `disabled`: Disables the input field.
 * - `required`: Marks the input as required for form validation.
 * - `error`: Shows error styling when true.
 * - `noHorisontalPadding`: Removes horizontal padding for edge-to-edge layouts.
 * - `hasLeadingIcon`: If true, displays the leading icon slot.
 * - `hasTrailingIcon`: If true, displays the trailing icon slot.
 *
 * ## Events
 * - `input` – Fired when the value of the input changes (standard input event).
 *
 * ## Best Practices and Constraints
 * - Use helper text to clarify input requirements or validation errors.
 * - Only use icons that add clear meaning or affordance to the input.
 * - Avoid using placeholder text as a substitute for a visible label.
 * - For password or sensitive fields, consider using a trailing icon to toggle visibility.
 * - When using `type="number"`, ensure proper validation and formatting as per HTML standards.
 *
 * ## Example
 *
 * ```html
 * <obc-input
 *   placeholder="Search"
 *   type="search"
 *   .hasLeadingIcon=${true}
 * >
 *   <obi-search slot="leading-icon"></obi-search>
 *   <div slot="helper-text">Type to search</div>
 * </obc-input>
 * ```
 *
 * In this example, the input field displays a search icon before the field and helper text below.
 *
 * @slot leading-icon - Icon displayed before the input field (when `hasLeadingIcon` is true)
 * @slot trailing-icon - Icon displayed after the input field (when `hasTrailingIcon` is true)
 * @slot helper-text - Helper or validation text shown below the input field
 * @fires input - Dispatched when the value of the input changes
 */
@customElement('obc-input')
export class ObcInput extends LitElement {
  /**
   * The current value of the input field.
   * Set this property to control the input's value programmatically.
   */
  @property({type: String}) value: string = '';

  /**
   * Placeholder text displayed when the input is empty.
   */
  @property({type: String}) placeholder: string = '';

  /**
   * The input type, matching standard HTML input types (e.g., "text", "password", "email").
   * Defaults to "text".
   */
  @property({type: String}) type: HTMLInputTypeAttribute =
    HTMLInputTypeAttribute.Text;

  /**
   * If true, renders the input with squared corners (no border radius).
   * Defaults to false (rounded corners).
   */
  @property({type: Boolean}) squared: boolean = false;

  /**
   * Controls the horizontal alignment of the input text.
   * Accepts "left", "center", or "right". Defaults to "left".
   */
  @property({type: String}) textAlign: ObcInputTextAlign =
    ObcInputTextAlign.Left;

  /**
   * Sets the font style for the input text.
   * - "body": Standard body font (default).
   * - "button": Bolder, button-style font.
   */
  @property({type: String}) font: ObcInputFont = ObcInputFont.Body;

  /**
   * If true, disables the input field and prevents user interaction.
   */
  @property({type: Boolean}) disabled: boolean = false;

  /**
   * If true, marks the input as required for form validation.
   */
  @property({type: Boolean}) required: boolean = false;

  /**
   * If true, displays error styling on the input field.
   */
  @property({type: Boolean}) error: boolean = false;

  /**
   * If true, removes horizontal padding for edge-to-edge layouts.
   */
  @property({type: Boolean}) noHorisontalPadding: boolean = false;

  /**
   * If true, displays the leading icon slot before the input field.
   * Place an icon element in the `leading-icon` slot to use.
   */
  @property({type: Boolean}) hasLeadingIcon: boolean = false;

  /**
   * If true, displays the trailing icon slot after the input field.
   * Place an icon element in the `trailing-icon` slot to use.
   */
  @property({type: Boolean}) hasTrailingIcon: boolean = false;

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  override render() {
    return html`
      <label
        class=${classMap({
          wrapper: true,
          squared: this.squared,
          'has-leading-icon': this.hasLeadingIcon,
          'has-trailing-icon': this.hasTrailingIcon,
          [`align-` + this.textAlign]: true,
          [`font-` + this.font]: true,
          disabled: this.disabled,
          error: this.error,
          'no-horisontal-padding': this.noHorisontalPadding,
        })}
      >
        <div class="input-wrapper" part="input-wrapper">
          <input
            .type=${this.type}
            class="input"
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            @input=${this.onInput}
          />
          ${this.hasLeadingIcon
            ? html`<div class="icon leading" part="icon leading">
                <slot name="leading-icon"></slot>
              </div>`
            : nothing}
          ${this.hasTrailingIcon
            ? html`<div class="icon trailing" part="icon trailing">
                <slot name="trailing-icon"></slot>
              </div>`
            : nothing}
        </div>
        <div class="helper-text" part="helper-text">
          <slot name="helper-text"></slot>
        </div>
      </label>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-input': ObcInput;
  }
}
