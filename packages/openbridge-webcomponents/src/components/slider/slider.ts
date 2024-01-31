import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import componentStyle from './slider.style';
import '../icon-button/icon-button';

/**
 * @element obc-slider
 *
 * @fires value - Fires when the value is changed
 */
@customElement('obc-slider')
export class ObcSlider extends LitElement {
  @property({type: Number}) value = 50;
  @property({type: Number}) min = 0;
  @property({type: Number}) max = 100;
  @property({type: Number}) step: number | undefined;

  override render() {
    const ratio = (this.value - this.min) / (this.max - this.min);
    return html`
      <slot name="icon-left" class="icon"> </slot>
      <div class="wrapper">
        <div
          class="interactive-track"
          style=${styleMap({'--ratio': ratio})}
        ></div>
        <input
          type="range"
          min="${this.min}"
          max="${this.max}"
          step=${ifDefined(this.step)}
          value=${this.value}
          class="slider"
          @input=${(event: Event) => {
            this.value = Number((event.target as HTMLInputElement).value);
            this.dispatchEvent(new CustomEvent('value', {detail: this.value}));
          }}
        />
      </div>
      <slot name="icon-right" class="icon"></slot>
    `;
  }

  static override styles = componentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slider': ObcSlider;
  }
}
