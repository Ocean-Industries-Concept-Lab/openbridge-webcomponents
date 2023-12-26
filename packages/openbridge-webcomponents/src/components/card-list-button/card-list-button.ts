import {LitElement, html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import iconStyle from './card-list-button.style';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-card-list-button')
export class CardListButton extends LitElement {
  @property({type: String}) icon = '01-placeholder';
  @property({type: String}) variant = 'normal';

  @queryAssignedElements({slot: 'leading-icon'})
  private leadingIcon!: NodeListOf<HTMLElement>;
  @queryAssignedElements({slot: 'trailing-icon'})
  private trailingIcon!: NodeListOf<HTMLElement>;
  @state() private hasIconLeading = false;
  @state() private hasIconTrailing = false;

  override firstUpdated() {
    this.hasIconLeading = this.leadingIcon.length > 0;
    this.hasIconTrailing = this.trailingIcon.length > 0;
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          hasIconLeading: this.hasIconLeading,
          hasIconTrailing: this.hasIconTrailing,
        })}
      >
        <span class="icon leading"><slot name="leading-icon"></slot></span>
        <span class="label"><slot></slot></span>
        <span class="icon trailing"><slot name="trailing-icon"></slot></span>
      </button>
    `;
  }

  static override styles = iconStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-card-list-button': CardListButton;
  }
}
