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
  @property({type: Number, attribute: 'step-click'}) stepClick = 10;

  onInput(value: number) {
    this.value = value;
    this.dispatchEvent(new CustomEvent('value', {detail: this.value}));
  }

  onReduceClick() {
    this.onInput(Math.max(this.value - this.stepClick, this.min));
  }

  onIncreaseClick() {
    this.onInput(Math.min(this.value + this.stepClick, this.max));
  }

  override render() {
    const ratio = (this.value - this.min) / (this.max - this.min);
    return html`
      <obc-icon-button @click=${this.onReduceClick} variant="flat">
        <slot name="icon-left"></slot>
      </obc-icon-button>
      <div class="wrapper">
        <div class="track"></div>
        <div
          class="interactive-track"
          style=${styleMap({'--ratio': ratio})}
        ></div>
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${ifDefined(this.step)}
          .value=${this.value.toString()}
          class="slider"
          @input=${(event: Event) => {
            this.value = Number((event.target as HTMLInputElement).value);
            this.dispatchEvent(new CustomEvent('value', {detail: this.value}));
          }}
        />
      </div>
      <obc-icon-button @click=${this.onIncreaseClick} variant="flat">
        <slot name="icon-right"></slot>
      </obc-icon-button>
    `;
  }

  static override styles = componentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-slider': ObcSlider;
  }
}
