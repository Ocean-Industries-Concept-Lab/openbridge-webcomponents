import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import componentStyle from './brilliance-menu.css?inline';
import '../icon-button/icon-button.js';
import '../slider/slider.js';
import '../toggle-switch/toggle-switch.js';
import '../toggle-button-group/toggle-button-group.js';
import '../toggle-button-option/toggle-button-option.js';
import '../../icons/icon-display-brilliance-low.js';
import '../../icons/icon-display-brilliance-proposal.js';
import '../../icons/icon-palette-night.js';
import '../../icons/icon-palette-dusk.js';
import '../../icons/icon-palette-day.js';
import '../../icons/icon-palette-day-bright.js';

import {localized, msg} from '@lit/localize';

export enum ObcPalette {
  night = 'night',
  dusk = 'dusk',
  day = 'day',
  bright = 'bright',
}

export type ObcPaletteChangeEvent = CustomEvent<{value: ObcPalette}>;
export type ObcBrightnessChangeEvent = CustomEvent<{value: number}>;

/**
 * @element obc-brilliance-menu
 *
 * @prop {String} palette - The palette to use. Possible values are 'night', 'dusk', 'day', 'bright'
 * @prop {Number} brightness - The brightness value
 * @prop {Boolean} showAutoBrightness - Show the auto brightness toggle
 * @prop {Boolean} showAutoPalette - Show the auto palette toggle
 * @prop {Boolean} hideBrightness - Show the auto brightness toggle
 *
 * @fires palette-changed {ObcPaletteChangeEvent} - Fires when the palette is changed
 * @fires brightness-changed {ObcBrightnessChangeEvent} - Fires when the brightness is changed
 */
@localized()
@customElement('obc-brilliance-menu')
export class ObcBrillianceMenu extends LitElement {
  @property({type: String}) palette: ObcPalette = ObcPalette.day;
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
          type="icon-text-under"
        >
          <obc-toggle-button-option value="night" type="icon-text-under">
            <obi-palette-night slot="icon"></obi-palette-night>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="dusk" type="icon-text-under">
            <obi-palette-dusk slot="icon"></obi-palette-dusk>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="day" type="icon-text-under">
            <obi-palette-day slot="icon"></obi-palette-day>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="bright" type="icon-text-under">
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
