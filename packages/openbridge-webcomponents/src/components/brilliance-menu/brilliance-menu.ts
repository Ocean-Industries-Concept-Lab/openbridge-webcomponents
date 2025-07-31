import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
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
import {customElement} from '../../decorator.js';
import {
  ObcToggleButtonOptionType,
  ObcToggleButtonOptionVariant,
} from '../toggle-button-option/toggle-button-option.js';

export enum ObcPalette {
  night = 'night',
  dusk = 'dusk',
  day = 'day',
  bright = 'bright',
}

export type ObcPaletteChangeEvent = CustomEvent<{value: ObcPalette}>;
export type ObcBrightnessChangeEvent = CustomEvent<{value: number}>;

/**
 * Event fired when the palette is changed.
 * @typedef {CustomEvent<{value: ObcPalette}>} ObcPaletteChangeEvent
 */

/**
 * Event fired when the brightness is changed.
 * @typedef {CustomEvent<{value: number}>} ObcBrightnessChangeEvent
 */

/**
 * `<obc-brilliance-menu>` – A settings menu component for adjusting display palette and brightness.
 *
 * Provides a combined interface for users to select a color palette (night, dusk, day, bright) and adjust screen brightness. Includes options for toggling automatic palette and brightness modes. Designed for quick access to visual environment controls in applications where adaptable display settings are important.
 *
 * ### Features
 * - **Palette Selection:** Choose between four preset palettes: night, dusk, day, and bright. Each palette is represented by an icon.
 * - **Brightness Control:** Adjustable slider for fine-tuning brightness from 0 to 100. Optionally displays left/right icons for low and high brilliance.
 * - **Auto Modes:** Optional toggles for enabling automatic palette switching and automatic brightness adjustment.
 * - **Configurable Visibility:** Brightness controls and auto toggles can be shown or hidden via properties.
 * - **Responsive Layout:** Arranged in a card-style panel for use in settings menus or overlays.
 *
 * ### Variants
 * - **Palette:** Four options—`night`, `dusk`, `day`, `bright`. Each is visually distinct and selectable via toggle button group.
 * - **Auto Toggles:** `showAutoBrightness` and `showAutoPalette` properties control the presence of auto mode switches.
 * - **Hide Brightness:** The `hideBrightness` property removes the brightness slider and auto brightness toggle from the menu.
 *
 * ### Usage Guidelines
 * Use `obc-brilliance-menu` in settings panels or overlays where users need to quickly adjust display appearance. Ideal for scenarios requiring rapid adaptation to changing lighting conditions or user preferences.
 * **TODO(designer):** Confirm if there are recommended default palette/brightness settings, and clarify intended use cases for auto toggles versus manual controls.
 *
 * ### Properties and Configuration
 * - `palette` (`ObcPalette`): The currently selected palette. Accepts `'night'`, `'dusk'`, `'day'`, or `'bright'`. Defaults to `'day'`.
 * - `brightness` (`number`): Current brightness value (0–100). Defaults to `50`.
 * - `showAutoBrightness` (`boolean`): If true, displays the auto brightness toggle.
 * - `showAutoPalette` (`boolean`): If true, displays the auto palette toggle.
 * - `hideBrightness` (`boolean`): If true, hides the brightness slider and auto brightness toggle.
 *
 * ### Events
 * - `palette-changed` – Fired when the user selects a new palette. Event detail: `{ value: ObcPalette }`
 * - `brightness-changed` – Fired when the brightness slider is adjusted. Event detail: `{ value: number }`
 *
 * ### Example
 * ```html
 * <obc-brilliance-menu
 *   palette="dusk"
 *   brightness="75"
 *   showAutoBrightness
 *   showAutoPalette
 * ></obc-brilliance-menu>
 * ```
 * In this example, both auto toggles are visible, the palette is set to dusk, and brightness is set to 75.
 *
 * @fires palette-changed {CustomEvent<{value: ObcPalette}>} When the palette is changed
 * @fires brightness-changed {CustomEvent<{value: number}>} When the brightness is changed
 */
@localized()
@customElement('obc-brilliance-menu')
export class ObcBrillianceMenu extends LitElement {
  /**
   * The currently selected palette. Possible values: `'night'`, `'dusk'`, `'day'`, `'bright'`.
   * Defaults to `'day'`.
   */
  @property({type: String}) palette: ObcPalette = ObcPalette.day;

  /**
   * The current brightness value (0–100). Defaults to `50`.
   */
  @property({type: Number}) brightness = 50;

  /**
   * If true, displays the auto brightness toggle below the brightness slider.
   */
  @property({type: Boolean})
  showAutoBrightness = false;

  /**
   * If true, displays the auto palette toggle below the palette selector.
   */
  @property({type: Boolean}) showAutoPalette = false;

  /**
   * If true, hides the brightness slider and auto brightness toggle from the menu.
   */
  @property({type: Boolean}) hideBrightness = false;

  /**
   * Handles palette selection changes and emits `palette-changed`.
   * @fires palette-changed
   * @param {CustomEvent} event
   */
  onPaletteChanged(event: CustomEvent) {
    this.palette = event.detail.value;
    this.dispatchEvent(
      new CustomEvent('palette-changed', {
        detail: {value: event.detail.value},
      })
    );
  }

  /**
   * Handles brightness slider changes and emits `brightness-changed`.
   * @fires brightness-changed
   * @param {CustomEvent} event
   */
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
          variant=${ObcToggleButtonOptionVariant.regular}
          type=${ObcToggleButtonOptionType.icon}
        >
          <obc-toggle-button-option value="night" type="icon">
            <obi-palette-night slot="icon"></obi-palette-night>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="dusk" type="icon">
            <obi-palette-dusk slot="icon"></obi-palette-dusk>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="day" type="icon">
            <obi-palette-day slot="icon"></obi-palette-day>
          </obc-toggle-button-option>
          <obc-toggle-button-option value="bright" type="icon">
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
