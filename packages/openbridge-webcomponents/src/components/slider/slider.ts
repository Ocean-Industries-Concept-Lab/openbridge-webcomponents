import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import componentStyle from './slider.style';
import '../icon-button/icon-button';
import '../icon/icon';

@customElement('obc-slider')
export class Slider extends LitElement {
  @property({type: Number}) value = 50;
  @property({type: Number}) min = 0;
  @property({type: Number}) max = 100;
  @property({type: Number}) step = 1;

  @property({type: String, attribute: 'icon-left'}) iconLeft = '01-placeholder';
  @property({type: String, attribute: 'icon-right'}) iconRight =
    '01-placeholder';

  override render() {
    return html`
      <obc-icon icon=${this.iconLeft}> </obc-icon>
      <input
        type="range"
        min="${this.min}"
        max="${this.max}"
        step=${this.step}
        value="${this.value}"
        class="slider"
      />
      <obc-icon icon=${this.iconRight}> </obc-icon>
    `;
  }

  static override styles = componentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slider': Slider;
  }
}
