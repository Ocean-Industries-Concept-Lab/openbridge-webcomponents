import { LitElement, unsafeCSS, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import componentStyle from "./BrillianceMenu.css?inline";
import "../Button/IconButton"
import "../input/Slider"
import "../Control/ToggleSwitch"
import "../Button/ToggleButtonGroup"
import "../Button/ToggleButtonOption"

@customElement('ob-brilliance-menu')
export class BrillianceMenu extends LitElement {


  render() {
    return html`
        <div class="card">
            <h3>Brilliance</h3>
            <ob-slider iconLeft="04-brilliance-low" iconRight="04-brilliance-high"></ob-slider>
            <ob-toggle-switch label="Auto brilliance"></ob-toggle-switch>
            <div class="divider"></div>
            <h3>Day - Night</h3>
            <ob-toggle-button-group value="day">
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
