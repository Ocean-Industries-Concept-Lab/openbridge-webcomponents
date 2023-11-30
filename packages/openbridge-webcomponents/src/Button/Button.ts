import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property, queryAll, queryAssignedElements, queryAssignedNodes, state } from 'lit/decorators.js'
import iconStyle from "./Button.css?inline";
import "../icon/Icon"
import { classMap } from 'lit/directives/class-map.js';

@customElement('ob-button')
export class Button extends LitElement {
  @property({ type: String }) icon = '01-placeholder'
  @property({ type: String }) variant = "normal"
  @property({ type: String }) size = "regular"
  @property({ type: Boolean, attribute: "full-width" }) fullWidth = false
  @property({ type: Boolean, attribute: "left-align" }) leftAlign = false

  @queryAssignedElements({slot: 'leading-icon'}) leadingIcon!: NodeListOf<HTMLElement>;
  @queryAssignedElements({slot: 'trailing-icon'}) trailingIcon!: NodeListOf<HTMLElement>;
  @state() hasIconLeading = false;
  @state() hasIconTrailing = false;

  firstUpdated() {
    this.hasIconLeading = this.leadingIcon.length > 0;
    this.hasIconTrailing = this.trailingIcon.length > 0;
  }

  render() {
    return html`
      <button class=${classMap({
        wrapper: true,
        ['variant-' + this.variant]: true,
        ['size-' + this.size]: true,
        hasIconLeading: this.hasIconLeading,
        hasIconTrailing: this.hasIconTrailing,
        'full-width': this.fullWidth,
        'left-align': this.leftAlign,
      })}
      >
        <div class="visible-wrapper">
          <span class="icon leading"><slot name="leading-icon"></slot></span>
          <span class="label"><slot></slot></span>
          <span class="icon trailing"><slot name="trailing-icon"></slot></span>
        </div>
      </button>
    `
  }

  static styles = unsafeCSS(iconStyle)
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-button': Button
  }
}
