import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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
            <ob-slider iconLeft="brilliance-low" iconRight="brilliance-high"></ob-slider>
            <ob-toggle-switch label="Auto brilliance"></ob-toggle-switch>
            <div class="divider"></div>
            <h3>Day - Night</h3>
            <ob-toggle-button-group>
                <ob-toggle-button-option icon="night" value="night"></ob-toggle-button-option>
                <ob-toggle-button-option icon="dusk" value="dusk"></ob-toggle-button-option>
                <ob-toggle-button-option icon="day" value="day" selected></ob-toggle-button-option>
                <ob-toggle-button-option icon="day-bright" value="bright"></ob-toggle-button-option>
            </ob-toggle-button-group>
            <ob-toggle-switch label="Auto day - night" checked></ob-toggle-switch>

        </div>
    `
  }

  static styles = css`

    .card {
        display: flex;
        flex-direction: column;
        padding: 16px 24px;
        box-sizing: border-box;
        width: 360px;

        border-radius: 8px;
        background: var(--container-global-color, #FCFCFC);

        /* Shadow/Floating */
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.30);

        gap: 8px;
    }
    h3 {
        color: var(--element-neutral-color, rgba(0, 0, 0, 0.59));
        
        /* UI/Overline */
        font-family: Noto Sans;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 200% */
        letter-spacing: 1.2px;
        text-transform: uppercase;

        margin-bottom: 16px;
    }

    .divider {
        height: 1px;
        align-self: stretch;
        margin-top: 16px;
        margin-bottom: 16px;

        border-radius: 2px;
        background: var(--border-outline-color, rgba(0, 0, 0, 0.08));
    }
   
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-brilliance-menu': BrillianceMenu
  }
}
