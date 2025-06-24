import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import iconStyle from './card-list-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

@customElement('obc-card-list-button')
export class ObcCardListButton extends LitElement {
  @property({type: String}) icon = 'placeholder';
  @property({type: String}) variant = 'normal';
  @property({type: Boolean}) hasIconLeading = false;
  @property({type: Boolean}) hasIconTrailing = false;

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

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-card-list-button': ObcCardListButton;
  }
}
