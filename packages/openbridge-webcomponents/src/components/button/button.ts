import { LitElement, html, unsafeCSS } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import iconStyle from './button.css?inline';
import { classMap } from 'lit/directives/class-map.js';

export enum ButtonVariant {
  Normal = 'normal',
  Flat = 'flat',
  Raised = 'raised',
  Check = 'check',
}

export enum ButtonSize {
  Regular = 'regular',
  Large = 'large',
}

/**
 * A button component
 * 
 * @element obc-button
 * 
 * @fires click - Dispatched when the button is clicked
 * 
 * @slot - The text to be displayed on the button
 * @slot leading-icon - Icon to be displayed before the text
 * @slot trailing-icon - Icon to be displayed after the text
 */
@customElement('obc-button')
export class ObcButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = ButtonVariant.Normal;
  @property({ type: String }) size: ButtonSize = ButtonSize.Regular;
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: Boolean }) hugText = false;
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;

  @queryAssignedElements({ slot: 'leading-icon' })
  leadingIcon!: NodeListOf<HTMLElement>;
  @queryAssignedElements({ slot: 'trailing-icon' })
  trailingIcon!: NodeListOf<HTMLElement>;
  @state() hasIconLeading = false;
  @state() hasIconTrailing = false;

  override firstUpdated() {
    this.hasIconLeading = this.leadingIcon.length > 0;
    this.hasIconTrailing = this.trailingIcon.length > 0;
  }

  override render() {
    return html`
      <button
        class=${classMap({
      wrapper: true,
      ['variant-' + this.variant]: true,
      ['size-' + this.size]: true,
      hasIconLeading: this.hasIconLeading,
      hasIconTrailing: this.hasIconTrailing,
      'full-width': this.fullWidth,
      'hug-text': this.hugText,
      checked: this.checked,
    })}
        ?disabled=${this.disabled}
      >
        <div class="visible-wrapper">
          <span class="icon leading"><slot name="leading-icon"></slot></span>
          <span class="label"><slot></slot></span>
          <span class="icon trailing"><slot name="trailing-icon"></slot></span>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-button': ObcButton;
  }
}
