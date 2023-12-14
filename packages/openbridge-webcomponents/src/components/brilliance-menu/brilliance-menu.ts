import { LitElement, unsafeCSS, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import componentStyle from "./brilliance-menu.css?inline";
import "../icon-button/icon-button"
import "../slider/slider"
import "../toggle-switch/toggle-switch"
import "../toggle-button-group/toggle-button-group"
import "../toggle-button-option/toggle-button-option"

@customElement('ob-brilliance-menu')
export class BrillianceMenu extends LitElement {

  onBrilianceChanged(event: CustomEvent) {
    this.dispatchEvent(new CustomEvent('brilliance-changed', { detail: { value: event.detail.value } }));
  }

  render() {
    return html`
        <div class="card">
            <h3>Brilliance</h3>
            <ob-slider iconLeft="04-brilliance-low" iconRight="04-brilliance-high"></ob-slider>
            <ob-toggle-switch label="Auto brilliance"></ob-toggle-switch>
            <div class="divider"></div>
            <h3>Day - Night</h3>
            <ob-toggle-button-group value="day" @value=${this.onBrilianceChanged}>
                <ob-toggle-button-option icon="04-night" value="night"></ob-toggle-button-option>
                <ob-toggle-button-option icon="04-dusk" value="dusk"></ob-toggle-button-option>
                <ob-toggle-button-option icon="04-day" value="day"></ob-toggle-button-option>
                <ob-toggle-button-option icon="04-day-bright" value="bright"></ob-toggle-button-option>
            </ob-toggle-button-group>
            <ob-toggle-switch label="Auto day - night" checked></ob-toggle-switch>

        </div>
    `
  }

  static styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-brilliance-menu': BrillianceMenu
  }
}
