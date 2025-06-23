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
 * A versatile check button component that supports both regular and checkbox modes.
 *
 * Width behavior:
 * - fullWidth=false: Button width adjusts to content (fit-content)
 * - fullWidth=true + width specified: Button uses the specified width
 * - fullWidth=true + no width: Button uses 100% width
 *
 * Icon behavior:
 * - Regular type: Uses slotted icon content via 'icon' slot, controlled by showIcon property
 * - Checkbox type: Uses checked/unchecked icons with fallbacks to default icons
 */
@customElement('obc-check-button')
export class ObcCheckButton extends LitElement {
  @property({type: String}) type: CheckButtonType = CheckButtonType.regular;
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) disabled = false;

  /** When false, button width adjusts to content. When true, uses width property or 100% */
  @property({type: Boolean}) fullWidth = false;

  /** Specific width for the button. Only applies when fullWidth=true */
  @property({type: String}) width = '';

  /** Whether to show the icon for regular type buttons */
  @property({type: Boolean}) showIcon = true;

  @property({type: Boolean}) hasCheckedIcon = false;
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