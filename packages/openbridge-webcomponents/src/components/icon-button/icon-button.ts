import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import iconStyle from './icon-button.style';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-icon-button')
export class IconButton extends LitElement {
  @property({type: String}) variant = 'normal';
  @property({type: String}) size = 'regular';
  @property({type: Boolean, attribute: 'corner-left'}) cornerLeft = false;
  @property({type: Boolean, attribute: 'corner-right'}) cornerRight = false;
  @property({type: Boolean, attribute: 'active-color'}) activeColor = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['variant-' + this.variant]: true,
          ['size-' + this.size]: true,
          'corner-left': this.cornerLeft,
          'corner-right': this.cornerRight,
          'active-color': this.activeColor,
        })}
      >
        <div class="visible-wrapper">
          <div class="icon">
            <slot></slot>
          </div>
        </div>
      </button>
    `;
  }

  static override styles = iconStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-icon-button': IconButton;
  }
}
