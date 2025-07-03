import {LitElement, unsafeCSS} from 'lit';
import {html} from 'lit/static-html.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import checkButtonStyle from './check-button.css?inline';
import '../../icons/icon-checkbox-checked-filled.js';
import '../../icons/icon-checkbox-uncheck-google.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../decorator.js';

export enum CheckButtonType {
  regular = 'regular',
  checkbox = 'checkbox',
}

/**
 * `<obc-check-button>` – A versatile **state‑toggle component** used to represent
 * persistent settings (on/off, enabled/disabled, selected/unselected).  It is
 * **not** intended for transient command actions such as “Send”, “Save”, or
 * navigation – use a standard `<button>` or action component for those.
 *
 * The element supports two visual variants, both exposing the same checked /
 * unchecked semantics:
 *
 * ### Regular (toggle button)
 * * Entire surface changes color when checked.
 * * Optional single icon (via `icon` slot) is *identical* in both states; the
 *   button’s styling conveys the difference.
 * * Ideal for equipment controls, system modes, feature enable/disable, etc.
 *
 * ### Checkbox (icon‑swap)
 * * Renders a familiar checkbox frame but allows *custom* icons for checked and
 *   unchecked states (`checked-icon` / `unchecked-icon` slots).  Falls back to
 *   built‑in checkbox icons when none supplied.
 * * Useful for semantic pairs such as microphone on/off, volume mute/unmute,
 *   communication link active/inactive, etc.
 *
 * ## Difference from `<obc-checkbox>`
 * `<obc-checkbox>` is a classic form control with a fixed check/mixed visual and
 * built‑in change events.  `<obc-check-button>` focuses on *state indication*
 * and leaves business logic to the host via the `check-button-click` event, plus
 * offers width, icon, and full customization options.
 *
 * ## Features
 * * **Two Variants** – `regular` & `checkbox` (see above).
 * * **Icon Support** – Single icon (regular) or paired icons (checkbox).
 * * **Width Control** – `fullWidth` (hug content vs. expand) and `width` for a
 *   fixed size when `fullWidth` is true.
 * * **State API** – `checked`, `disabled`, and `check-button-click` event.
 * * **Accessibility** – Uses `aria-pressed` (regular) or `aria-checked` with
 *   `role="checkbox"` (checkbox) so assistive tech announces state correctly.
 *
 * ## Usage Guidelines
 * 1. Prefer **regular** when a solid background change is the clearest cue and
 *    the meaning of the state does not rely on an icon transformation.
 * 2. Choose **checkbox** when the *icon itself* conveys the before/after state
 *    (e.g., 🎤 vs. 🎤🚫).  Provide both icons for maximum clarity.
 * 3. Group independent toggles freely; for mutually exclusive choices use radio
 *    buttons or segmented controls instead.
 * 4. Keep labels concise.  For icon‑only checkbox buttons supply an
 *    `aria-label`.
 *
 * ## Slots
 * | Slot Name      | When Rendered                             | Purpose                              |
 * | -------------- | ----------------------------------------- | ------------------------------------ |
 * | (default)      | Always                                   | Button label text/content            |
 * | icon           | type="regular" & showIcon               | Icon before label (same for both states) |
 * | checked-icon   | type="checkbox" & hasCheckedIcon        | Custom icon for *checked* state      |
 * | unchecked-icon | type="checkbox" & hasUncheckedIcon      | Custom icon for *unchecked* state    |
 *
 * ## Events
 * * `check-button-click` – Fired after user toggles the control.  Detail:
 *   `{ checked: boolean, type: 'regular' | 'checkbox' }`.
 *
 * @slot - Default slot for button label/content
 * @slot icon - Icon before label (regular mode, if showIcon is true)
 * @slot checked-icon - Custom icon for checked state (checkbox mode)
 * @slot unchecked-icon - Custom icon for unchecked state (checkbox mode)
 * @fires check-button-click {CustomEvent<{checked: boolean, type: string}>}
 */
@customElement('obc-check-button')
export class ObcCheckButton extends LitElement {
  /**
   * Determines the visual style and toggle behavior of the button.
   * - `regular`: Standard button with optional icon and label.
   * - `checkbox`: Checkbox-style toggle with checked/unchecked icons.
   *
   * @default 'regular'
   */
  @property({type: String}) type: CheckButtonType = CheckButtonType.regular;

  /**
   * Whether the button is currently checked (selected/on).
   *
   * When clicked, this state toggles and the `check-button-click` event is fired.
   *
   * @default false
   */
  @property({type: Boolean}) checked = false;

  /**
   * Disables the button, preventing user interaction and applying disabled styling.
   *
   * @default false
   */
  @property({type: Boolean}) disabled = false;

  /**
   * If false, button width adapts to its content (fit-content).
   * If true, uses the `width` property (if set) or expands to 100% of parent.
   *
   * @default false
   */
  @property({type: Boolean}) fullWidth = false;

  /**
   * Specific width for the button (e.g., "200px", "10rem").
   * Only applies when `fullWidth` is true.
   *
   * @default ''
   */
  @property({type: String}) width = '';

  /**
   * Whether to show the icon in regular mode (icon slot).
   * Ignored in checkbox mode.
   *
   * @default true
   */
  @property({type: Boolean}) showIcon = true;

  /**
   * If true, uses the `checked-icon` slot for the checked state in checkbox mode.
   * Otherwise, uses the default checked icon.
   *
   * @default false
   */
  @property({type: Boolean}) hasCheckedIcon = false;

  /**
   * If true, uses the `unchecked-icon` slot for the unchecked state in checkbox mode.
   * Otherwise, uses the default unchecked icon.
   *
   * @default false
   */
  @property({type: Boolean}) hasUncheckedIcon = false;

  private get customWidthStyle() {
    if (!this.fullWidth || this.width === '') return '';
    return `--custom-width: ${this.width}`;
  }

  private handleClick() {
    if (this.disabled) return;

    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('check-button-click', {
        detail: {
          checked: this.checked,
          type: this.type,
        },
      })
    );
  }

  private renderIcon() {
    if (this.type === CheckButtonType.checkbox) {
      return html`
        <div class="icon-container">
          ${this.checked
            ? this.renderCheckedIcon()
            : this.renderUncheckedIcon()}
        </div>
      `;
    }

    if (this.type === CheckButtonType.regular && this.showIcon) {
      return html`
        <div class="icon-container">
          <slot name="icon"></slot>
        </div>
      `;
    }

    return html``;
  }

  private renderCheckedIcon() {
    if (this.hasCheckedIcon) {
      return html`<slot name="checked-icon"></slot>`;
    }
    return html`<obi-checkbox-checked-filled></obi-checkbox-checked-filled>`;
  }

  private renderUncheckedIcon() {
    if (this.hasUncheckedIcon) {
      return html`<slot name="unchecked-icon"></slot>`;
    }
    return html`<obi-checkbox-uncheck-google></obi-checkbox-uncheck-google>`;
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'state-checked': this.checked,
          'state-unchecked': !this.checked,
          'type-regular': this.type === CheckButtonType.regular,
          'type-checkbox': this.type === CheckButtonType.checkbox,
          hasIcon:
            this.type === CheckButtonType.checkbox ||
            (this.type === CheckButtonType.regular && this.showIcon),
          'full-width': this.fullWidth,
          'has-custom-width': this.fullWidth && this.width !== '',
        })}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        part="wrapper"
        style=${this.customWidthStyle}
        aria-checked=${ifDefined(
          this.type === CheckButtonType.checkbox
            ? this.checked
              ? 'true'
              : 'false'
            : undefined
        )}
        aria-pressed=${ifDefined(
          this.type === CheckButtonType.regular
            ? this.checked
              ? 'true'
              : 'false'
            : undefined
        )}
      >
        <div class="visible-wrapper" part="visible-wrapper">
          <div class="content-container">
            ${this.renderIcon()}
            <span class="label-container" part="label">
              <slot></slot>
            </span>
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(checkButtonStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-check-button': ObcCheckButton;
  }
}
