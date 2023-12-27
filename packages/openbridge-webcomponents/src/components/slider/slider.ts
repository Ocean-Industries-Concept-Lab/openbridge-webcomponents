import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import componentStyle from './slider.style';
import '../icon-button/icon-button';

@customElement('obc-slider')
export class Slider extends LitElement {
  @property({type: Number}) value = 50;
  @property({type: Number}) min = 0;
  @property({type: Number}) max = 100;
  @property({type: Number}) step = 1;

  override render() {
    return html`
      <slot name="icon-left" class="icon"> </slot>
      <input
        type="range"
        min="${this.min}"
        max="${this.max}"
        step=${this.step}
        value="${this.value}"
        class="slider"
      />
      <slot name="icon-right" class="icon"></slot>
    `;
  }

  static override styles = componentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slider': Slider;
  }
}
