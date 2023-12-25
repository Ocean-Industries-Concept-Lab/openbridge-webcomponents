import {LitElement, html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import iconStyle from './button.style';
import '../icon/icon';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-button')
export class Button extends LitElement {
  @property({type: String}) icon = '01-placeholder';
  @property({type: String}) variant = 'normal';
  @property({type: String}) size = 'regular';
  @property({type: Boolean, attribute: 'full-width'}) fullWidth = false;

  @queryAssignedElements({slot: 'leading-icon'})
  leadingIcon!: NodeListOf<HTMLElement>;
  @queryAssignedElements({slot: 'trailing-icon'})
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
        })}
      >
        <div class="visible-wrapper">
          <span class="icon leading"><slot name="leading-icon"></slot></span>
          <span class="label"><slot></slot></span>
          <span class="icon trailing"><slot name="trailing-icon"></slot></span>
        </div>
      </button>
    `;
  }

  static override styles = iconStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-button': Button;
  }
}
