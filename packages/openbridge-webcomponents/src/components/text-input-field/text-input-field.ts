import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './text-input-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Common HTML input types for practical use with `<obc-text-input-field>`.
 * Focuses on the most commonly used input types in real applications.
 */
export enum HTMLInputTypeAttribute {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  Tel = 'tel',
  Url = 'url',
  Search = 'search',
  Date = 'date',
  Time = 'time',
}

export enum ObcTextInputFieldFont {
  Body = 'body',
  Button = 'button',
}

export enum ObcTextInputFieldTextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

@customElement('obc-text-input-field')
export class ObcTextInputField extends LitElement {
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
  @property({type: String}) textAlign: ObcTextInputFieldTextAlign =
    ObcTextInputFieldTextAlign.Left;

  /**
   * Sets the font style for the input text.
   * - "body": Standard body font (default).
   * - "button": Bolder, button-style font.
   */
  @property({type: String}) font: ObcTextInputFieldFont = ObcTextInputFieldFont.Body;

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
    'obc-text-input-field': ObcTextInputField;
  }
}
