import { LitElement, unsafeCSS } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement } from '../../decorator.js';
import iconStyle from './button.css?inline';

export enum ButtonVariant {
  normal = 'normal',
  raised = 'raised',
  flat = 'flat',
}

/**
 * A versatile button component with support for leading and trailing icons.
 *
 * Features:
 * - Multiple variants: normal, raised, flat
 * - Optional leading and trailing icons
 * - Full width option
 * - Can render as button or link (when href provided)
 */
@customElement('obc-button')
export class ObcButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = ButtonVariant.normal;
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: Boolean }) disabled = false;

  /** Whether to show the leading icon */
  @property({ type: Boolean }) showLeadingIcon = false;

  /** Whether to show the trailing icon */
  @property({ type: Boolean }) showTrailingIcon = false;

  /** When provided, renders as a link instead of button */
  @property({ type: String }) href?: string = undefined;

  /** Link target (only applies when href is provided) */
  @property({ type: String }) target?: string = undefined;

  private renderLeadingIcon() {
    if (this.showLeadingIcon) {
      return html`
        <span class="icon leading" part="icon leading">
          <slot name="leading-icon"></slot>
        </span>
      `;
    }
    return html``;
  }

  private renderTrailingIcon() {
    if (this.showTrailingIcon) {
      return html`
        <span class="icon trailing" part="icon trailing">
          <slot name="trailing-icon"></slot>
        </span>
      `;
    }
    return html``;
  }

  override render() {
    const tag = this.href ? literal`a` : literal`button`;

    return html`
      <${tag}
        class=${classMap({
      wrapper: true,
      ['variant-' + this.variant]: true,
      hasIconLeading: this.showLeadingIcon,
      hasIconTrailing: this.showTrailingIcon,
      'full-width': this.fullWidth,
    })}
        ?disabled=${this.disabled}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        part="wrapper"
      >
        <div class="visible-wrapper" part="visible-wrapper">
          ${this.renderLeadingIcon()}
          <span class="label" part="label">
            <slot></slot>
          </span>
          ${this.renderTrailingIcon()}
        </div>
      </${tag}>
    `;
  }

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-button': ObcButton;
  }
}
