import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import componentStyle from './brilliance-menu.css?inline';
import '../icon-button/icon-button';
import '../slider/slider';
import '../toggle-switch/toggle-switch';
import '../toggle-button-group/toggle-button-group';
import '../toggle-button-option/toggle-button-option';
import '../../icons/icon-display-brilliance-low';
import '../../icons/icon-display-brilliance-proposal';
import '../../icons/icon-palette-night';
import '../../icons/icon-palette-dusk';
import '../../icons/icon-palette-day';
import '../../icons/icon-palette-day-bright';

import {localized, msg} from '@lit/localize';

/**
 * @element obc-brilliance-menu
 *
 * @prop {String} palette - The palette to use. Possible values are 'night', 'dusk', 'day', 'bright'
 * @prop {Number} brightness - The brightness value
 * @prop {Boolean} showAutoBrightness - Show the auto brightness toggle
 * @prop {Boolean} showAutoPalette - Show the auto palette toggle
 * @prop {Boolean} hideBrightness - Show the auto brightness toggle
 *
 * @fires palette-changed - Fires when the palette is changed
 * @fires brightness-changed - Fires when the brightness is changed
 */
@localized()
@customElement('obc-brilliance-menu')
export class ObcBrillianceMenu extends LitElement {
  @property({type: String}) palette: 'night' | 'dusk' | 'day' | 'bright' =
    'day';
  @property({type: Number}) brightness = 50;
  @property({type: Boolean})
  showAutoBrightness = false;
  @property({type: Boolean}) showAutoPalette = false;
  @property({type: Boolean}) hideBrightness = false;

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
        ${this.hideBrightness
          ? ''
          : html`
              <h3>${msg('Brilliance')}</h3>
              <obc-slider
                value=${this.brightness}
                @value=${this.onBrightnessChanged}
                min="0"
                max="100"
                hugcontainer
                haslefticon
                hasrighticon
              >
                <obi-display-brilliance-low
                  slot="icon-left"
                ></obi-display-brilliance-low>
                <obi-display-brilliance-proposal
                  slot="icon-right"
                ></obi-display-brilliance-proposal>
              </obc-slider>
              ${this.showAutoBrightness
                ? html`<obc-toggle-switch
                    .label="${msg('Auto brilliance')}"
                  ></obc-toggle-switch>`
                : ''}
              <div class="divider"></div>
            `}
        <h3>${msg('Day')} - ${msg('Night')}</h3>
        <obc-toggle-button-group
          value=${this.palette}
          @value=${this.onPaletteChanged}
        >
          <obc-toggle-button-option value="night">
            <obi-palette-night slot="icon"></obi-palette-night>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="dusk">
            <obi-palette-dusk slot="icon"></obi-palette-dusk>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="day">
            <obi-palette-day slot="icon"></obi-palette-day>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="bright">
            <obi-palette-day-bright slot="icon"></obi-palette-day-bright>
          </obc-toggle-button-option>
        </obc-toggle-button-group>
        ${this.showAutoPalette
          ? html`<obc-toggle-switch
              .label="${msg('Auto day - night')}"
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
