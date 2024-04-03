import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import componentStyle from './brilliance-menu.css?inline';
import '../icon-button/icon-button';
import '../slider/slider';
import '../toggle-switch/toggle-switch';
import '../toggle-button-group/toggle-button-group';
import '../toggle-button-option/toggle-button-option';
import '../../icons/icon-04-brilliance-low';
import '../../icons/icon-04-brilliance-high';
import '../../icons/icon-04-night';
import '../../icons/icon-04-dusk';
import '../../icons/icon-04-day';
import '../../icons/icon-04-day-bright';

/**
 * @element obc-brilliance-menu
 *
 * @prop {String} palette - The palette to use. Possible values are 'night', 'dusk', 'day', 'bright'
 * @prop {Number} brightness - The brightness value
 * @prop {Boolean} showAutoBrightness - Show the auto brightness toggle
 * @prop {Boolean} showAutoPalette - Show the auto palette toggle
 *
 * @fires palette-changed - Fires when the palette is changed
 * @fires brightness-changed - Fires when the brightness is changed
 */
@customElement('obc-brilliance-menu')
export class ObcBrillianceMenu extends LitElement {
  @property({type: String}) palette: 'night' | 'dusk' | 'day' | 'bright' =
    'day';
  @property({type: Number}) brightness = 50;
  @property({type: Boolean, attribute: 'show-auto-brightness'})
  showAutoBrightness = false;
  @property({type: Boolean, attribute: 'show-auto-palette'}) showAutoPalette =
    false;

  onPaletteChanged(event: CustomEvent) {
    this.palette = event.detail.value;
    this.dispatchEvent(
      new CustomEvent('palette-changed', {
        detail: {value: event.detail.value},
      })
    );
  }

  onBrightnessChanged(event: CustomEvent) {
    this.brightness = event.detail;
    this.dispatchEvent(
      new CustomEvent('brightness-changed', {
        detail: {value: event.detail},
      })
    );
  }

  override render() {
    return html`
      <div class="card">
        <h3>Brilliance</h3>
        <obc-slider
          value=${this.brightness}
          @value=${this.onBrightnessChanged}
          min="0"
          max="100"
          hug-container
          has-left-icon
          has-right-icon
        >
          <obi-04-brilliance-low slot="icon-left"></obi-04-brilliance-low>
          <obi-04-brilliance-high slot="icon-right"></obi-04-brilliance-high>
        </obc-slider>
        ${this.showAutoBrightness
          ? html`<obc-toggle-switch
              label="Auto brilliance"
            ></obc-toggle-switch>`
          : ''}
        <div class="divider"></div>
        <h3>Day - Night</h3>
        <obc-toggle-button-group
          value=${this.palette}
          @value=${this.onPaletteChanged}
        >
          <obc-toggle-button-option value="night">
            <obi-04-night slot="icon"></obi-04-night>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="dusk">
            <obi-04-dusk slot="icon"></obi-04-dusk>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="day">
            <obi-04-day slot="icon"></obi-04-day>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="bright">
            <obi-04-day-bright slot="icon"></obi-04-day-bright>
          </obc-toggle-button-option>
        </obc-toggle-button-group>
        ${this.showAutoPalette
          ? html`<obc-toggle-switch
              label="Auto day - night"
              checked
            ></obc-toggle-switch>`
          : ''}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-brilliance-menu': ObcBrillianceMenu;
  }
}
