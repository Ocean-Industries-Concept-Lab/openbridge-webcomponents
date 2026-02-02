import {HTMLTemplateResult, LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './brilliance-menu.css?inline';
import '../button/button.js';
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
import '../../icons/icon-link.js';
import '../../icons/icon-chevron-double-right-google.js';
import '../../icons/icon-chevron-double-left-google.js';
import '../../icons/icon-chevron-left-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-screen-desk.js';

import {localized, msg} from '@lit/localize';
import {customElement} from '../../decorator.js';
import {
  ObcToggleButtonOptionType,
  ObcToggleButtonOptionVariant,
} from '../toggle-button-option/toggle-button-option.js';
import {ObcSliderVariant} from '../slider/slider.js';
import {ObcToggleSwitch} from '../toggle-switch/toggle-switch.js';
import '../progress-indicator-dots/progress-indicator-dots.js';
import '../navigation-item/navigation-item.js';
import '../app-button/app-button.js';
import '../user-button/user-button.js';
import '../tabbed-card/tabbed-card.js';
import '../../icons/icon-display-brilliance-iec.js';
import '../../icons/icon-palette-day-night-iec.js';

export enum ObcPalette {
  night = 'night',
  dusk = 'dusk',
  day = 'day',
  bright = 'bright',
}

export enum ObcBrillianceMenuVariant {
  normal = 'normal',
  compact = 'compact',
  tabbed = 'tabbed',
}

export enum ObcBrillianceInputVariant {
  buttons = 'buttons',
  slider = 'slider',
}

export type ObcPaletteChangeEvent = CustomEvent<{value: ObcPalette}>;
export type ObcBrightnessChangeEvent = CustomEvent<{value: number}>;
export type ObcLinkPaletteChangeEvent = CustomEvent<{value: boolean}>;
export type ObcLinkBrightnessChangeEvent = CustomEvent<{value: boolean}>;

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
 * @fires palette-changed {ObcPaletteChangeEvent} When the palette is changed
 * @fires brightness-changed {ObcBrightnessChangeEvent} When the brightness is changed
 * @fires link-palette-changed {ObcLinkPaletteChangeEvent} When the link palette toggle is changed
 * @fires link-brightness-changed {ObcLinkBrightnessChangeEvent} When the link brightness toggle is changed
 * @fires screen-control-link-clicked {CustomEvent} When the screen control link is clicked
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
   * If true, displays the link brightness toggle below the brightness slider.
   */
  @property({type: Boolean})
  showLinkBrightness = false;

  /**
   * If true, displays the link palette toggle below the palette selector.
   */
  @property({type: Boolean}) showLinkPalette = false;

  /**
   * If true, hides the brightness slider and auto brightness toggle from the menu.
   */
  @property({type: Boolean}) hideBrightness = false;

  /**
   * If true, hides the palette selector and link palette toggle from the menu.
   */
  @property({type: Boolean}) hidePalette = false;

  @property({type: Boolean}) noNightPalette = false;
  @property({type: Boolean}) noDuskPalette = false;
  @property({type: Boolean}) noDayPalette = false;
  @property({type: Boolean}) noBrightPalette = false;

  /**
   * The variant of the menu. Possible values: `'normal'`, `'compact'`.
   * Defaults to `'normal'`.
   */
  @property({type: String}) variant = ObcBrillianceMenuVariant.normal;

  /**
   * The unit of the brightness value.
   */
  @property({type: String}) brightnessUnit = '%';

  /**
   * The maximum value of the brightness slider.
   */
  @property({type: Number}) brightnessMax = 100;

  /**
   * The minor step of the brightness slider.
   */
  @property({type: Number}) brightnessMinorStep = 5;

  /**
   * The major step of the brightness slider.
   */
  @property({type: Number}) brightnessMajorStep = 25;

  /**
   * The variant of the brightness input.
   */
  @property({type: String}) brightnessInputVariant =
    ObcBrillianceInputVariant.buttons;

  /**
   * If true, displays the screen control link.
   */
  @property({type: Boolean}) showScreenControlLink = false;

  override willUpdate(_changed: Map<string, unknown>) {
    if (!this.hidePalette) {
      const available = this.availablePalettes;
      if (available.length > 0 && !available.includes(this.palette)) {
        this.palette = available[0];
        this.dispatchEvent(
          new CustomEvent('palette-changed', {
            detail: {value: this.palette},
          })
        );
      }
    }
  }

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
  handleBrightnessChanged(event: CustomEvent) {
    this.brightness = event.detail;
    this.dispatchEvent(
      new CustomEvent('brightness-changed', {
        detail: {value: event.detail},
      })
    );
  }

  increaseBrightness(step: number) {
    this.brightness = Math.max(
      0,
      Math.min(this.brightness + step, this.brightnessMax)
    );
    this.dispatchEvent(
      new CustomEvent('brightness-changed', {
        detail: {value: this.brightness},
      })
    );
  }

  get canIncreaseBrightness() {
    return this.brightness < this.brightnessMax;
  }

  get canDecreaseBrightness() {
    return this.brightness > 0;
  }

  /**
   * Handles link palette changes and emits `link-palette-changed`.
   * @fires link-palette-changed
   * @param {CustomEvent} event
   */
  onLinkPaletteChanged(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('link-palette-changed', {
        detail: {value: (event.target as ObcToggleSwitch).checked},
      })
    );
  }

  /**
   * Handles link brightness changes and emits `link-brightness-changed`.
   * @fires link-brightness-changed
   * @param {CustomEvent} event
   */
  onLinkBrightnessChanged(event: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('link-brightness-changed', {
        detail: {value: (event.target as ObcToggleSwitch).checked},
      })
    );
  }

  get availablePalettes(): ObcPalette[] {
    const palettes: ObcPalette[] = [];
    if (!this.noNightPalette) palettes.push(ObcPalette.night);
    if (!this.noDuskPalette) palettes.push(ObcPalette.dusk);
    if (!this.noDayPalette) palettes.push(ObcPalette.day);
    if (!this.noBrightPalette) palettes.push(ObcPalette.bright);
    return palettes;
  }

  get canIncreasePalette() {
    const palettes = this.availablePalettes;
    const idx = palettes.indexOf(this.palette);
    return idx >= 0 && idx < palettes.length - 1;
  }

  get canDecreasePalette() {
    const palettes = this.availablePalettes;
    const idx = palettes.indexOf(this.palette);
    return idx > 0;
  }

  nextPalette() {
    if (this.canIncreasePalette) {
      const palettes = this.availablePalettes;
      const idx = palettes.indexOf(this.palette);
      this.palette = palettes[idx + 1];
      this.dispatchEvent(
        new CustomEvent('palette-changed', {
          detail: {value: this.palette},
        })
      );
    }
  }

  previousPalette() {
    if (this.canDecreasePalette) {
      const palettes = this.availablePalettes;
      const idx = palettes.indexOf(this.palette);
      this.palette = palettes[idx - 1];
      this.dispatchEvent(
        new CustomEvent('palette-changed', {
          detail: {value: this.palette},
        })
      );
    }
  }

  renderBrightness() {
    const title =
      this.variant === ObcBrillianceMenuVariant.tabbed
        ? nothing
        : html`<div class="title-container">
            <h3>${msg('Brilliance')}</h3>
          </div>`;
    const valueLength =
      this.brightness.toString().length + 0.5 * this.brightnessUnit.length;

    return html`${title}
      <div class="content-container brilliance">
        ${this.variant === ObcBrillianceMenuVariant.compact
          ? html` <obc-slider
              value=${this.brightness}
              @value=${this.handleBrightnessChanged}
              min="0"
              max=${this.brightnessMax}
              variant=${ObcSliderVariant.Normal}
              haslefticon
              hasrighticon
            >
              <obi-display-brilliance-low
                slot="icon-left"
              ></obi-display-brilliance-low>
              <obi-display-brilliance-proposal
                slot="icon-right"
              ></obi-display-brilliance-proposal>
            </obc-slider>`
          : html`
              <div class="value-container">
                <div class="value-label-container">
                  <obi-display-brilliance-proposal
                    class="icon"
                  ></obi-display-brilliance-proposal>
                  <div class="label-container" style="width: ${valueLength}ch">
                    <div class="value">${this.brightness.toFixed(0)}</div>
                    <div class="unit">${this.brightnessUnit}</div>
                  </div>
                </div>
                <div class="value-slider-container">
                  ${this.brightnessInputVariant ===
                  ObcBrillianceInputVariant.buttons
                    ? html`
                        <obc-slider
                          value=${this.brightness}
                          variant=${ObcSliderVariant.NoInput}
                          min="0"
                          max=${this.brightnessMax}
                        ></obc-slider>
                      `
                    : html`
                        <obc-slider
                          value=${this.brightness}
                          variant=${ObcSliderVariant.Enhanced}
                          @value=${this.handleBrightnessChanged}
                          min="0"
                          max=${this.brightnessMax}
                        ></obc-slider>
                      `}
                </div>
              </div>
              ${this.brightnessInputVariant ===
              ObcBrillianceInputVariant.buttons
                ? html`
                    <div class="icon-button-container">
                      <obc-button
                        segmentPosition="start"
                        fullWidth
                        ?disabled=${!this.canDecreaseBrightness}
                        class=${this.canDecreaseBrightness ? '' : 'disabled'}
                        @click=${() =>
                          this.increaseBrightness(-this.brightnessMajorStep)}
                      >
                        <obi-chevron-double-left-google
                          class="btn-icon"
                        ></obi-chevron-double-left-google>
                      </obc-button>
                      <obc-button
                        segmentPosition="middle"
                        fullWidth
                        ?disabled=${!this.canDecreaseBrightness}
                        class=${this.canDecreaseBrightness ? '' : 'disabled'}
                        @click=${() =>
                          this.increaseBrightness(-this.brightnessMinorStep)}
                      >
                        <obi-chevron-left-google
                          class="btn-icon"
                        ></obi-chevron-left-google>
                      </obc-button>
                      <obc-button
                        segmentPosition="middle"
                        fullWidth
                        ?disabled=${!this.canIncreaseBrightness}
                        class=${this.canIncreaseBrightness ? '' : 'disabled'}
                        @click=${() =>
                          this.increaseBrightness(this.brightnessMinorStep)}
                      >
                        <obi-chevron-right-google
                          class="btn-icon"
                        ></obi-chevron-right-google>
                      </obc-button>
                      <obc-button
                        segmentPosition="end"
                        fullWidth
                        ?disabled=${!this.canIncreaseBrightness}
                        class=${this.canIncreaseBrightness ? '' : 'disabled'}
                        @click=${() =>
                          this.increaseBrightness(this.brightnessMajorStep)}
                      >
                        <obi-chevron-double-right-google
                          class="btn-icon"
                        ></obi-chevron-double-right-google>
                      </obc-button>
                    </div>
                  `
                : nothing}
            `}
        ${this.showLinkBrightness
          ? html`<obc-toggle-switch
              .label="${msg('Link')}"
              hasicon
              @input=${this.onLinkBrightnessChanged}
            >
              <obi-link slot="icon"></obi-link>
            </obc-toggle-switch>`
          : nothing}
      </div>`;
  }

  get effectivePalette() {
    const palettes = this.availablePalettes;
    return palettes.includes(this.palette) ? this.palette : palettes[0];
  }

  get paletteIcon() {
    if (this.effectivePalette === ObcPalette.night) {
      return html`<obi-palette-night class="icon"></obi-palette-night>`;
    } else if (this.effectivePalette === ObcPalette.dusk) {
      return html`<obi-palette-dusk class="icon"></obi-palette-dusk>`;
    } else if (this.effectivePalette === ObcPalette.day) {
      return html`<obi-palette-day class="icon"></obi-palette-day>`;
    } else if (this.effectivePalette === ObcPalette.bright) {
      return html`<obi-palette-day-bright
        class="icon"
      ></obi-palette-day-bright>`;
    } else {
      return nothing;
    }
  }

  private paletteOptions(): HTMLTemplateResult[] {
    const out = [];
    if (!this.noNightPalette)
      out.push(
        html`<obc-toggle-button-option
          value="night"
          type="icon"
        ></obc-toggle-button-option>`
      );
    if (!this.noDuskPalette)
      out.push(
        html`<obc-toggle-button-option
          value="dusk"
          type="icon"
        ></obc-toggle-button-option>`
      );
    if (!this.noDayPalette)
      out.push(
        html`<obc-toggle-button-option
          value="day"
          type="icon"
        ></obc-toggle-button-option>`
      );
    if (!this.noBrightPalette)
      out.push(
        html`<obc-toggle-button-option
          value="bright"
          type="icon"
        ></obc-toggle-button-option>`
      );
    return out;
  }

  renderPalette() {
    const palettes = this.availablePalettes;
    if (palettes.length === 0) return nothing;

    const paletteNames: Record<ObcPalette, string> = {
      [ObcPalette.night]: msg('Night'),
      [ObcPalette.dusk]: msg('Dusk'),
      [ObcPalette.day]: msg('Day'),
      [ObcPalette.bright]: msg('Bright'),
    };
    const currentPaletteName = paletteNames[this.effectivePalette];
    const valueLength = currentPaletteName.length;
    const index = palettes.indexOf(this.effectivePalette);
    const nextIndex = Math.min(index + 1, palettes.length - 1);
    const previousIndex = Math.max(index - 1, 0);
    const nextPalette = paletteNames[palettes[nextIndex]];
    const previousPalette = paletteNames[palettes[previousIndex]];

    return html`
      ${this.variant === ObcBrillianceMenuVariant.tabbed
        ? nothing
        : html`
            <div class="title-container">
              <h3>${msg('Day')}/${msg('Night')}</h3>
            </div>
          `}
      <div
        class="content-container palette ${this.showLinkPalette
          ? 'with-link'
          : 'without-link'}"
      >
        ${this.variant === ObcBrillianceMenuVariant.compact
          ? html` <obc-toggle-button-group
              value=${this.effectivePalette}
              @value=${this.onPaletteChanged}
              variant=${ObcToggleButtonOptionVariant.regular}
              type=${ObcToggleButtonOptionType.icon}
            >
              ${this.paletteOptions()}
            </obc-toggle-button-group>`
          : html`
              <div class="value-container">
                <div class="value-label-container">
                  ${this.paletteIcon}
                  <div class="label-container" style="width: ${valueLength}ch">
                    <div class="value">${currentPaletteName}</div>
                  </div>
                </div>
                <obc-progress-indicator-dots
                  .totalSteps=${palettes.length}
                  .currentStep=${index + 1}
                ></obc-progress-indicator-dots>
              </div>
              <div class="icon-button-container">
                <obc-button
                  segmentPosition="start"
                  fullWidth
                  showLeadingIcon
                  ?disabled=${!this.canDecreasePalette}
                  class=${this.canDecreasePalette ? '' : 'disabled'}
                  @click=${() => this.previousPalette()}
                >
                  ${previousPalette}
                  <obi-chevron-left-google
                    slot="leading-icon"
                  ></obi-chevron-left-google>
                </obc-button>

                <obc-button
                  segmentPosition="end"
                  fullWidth
                  showTrailingIcon
                  ?disabled=${!this.canIncreasePalette}
                  class=${this.canIncreasePalette ? '' : 'disabled'}
                  @click=${() => this.nextPalette()}
                >
                  ${nextPalette}
                  <obi-chevron-right-google
                    slot="trailing-icon"
                  ></obi-chevron-right-google>
                </obc-button>
              </div>
            `}
        ${this.showLinkPalette
          ? html`<obc-toggle-switch
              .label="${msg('Link')}"
              hasicon
              @input=${this.onLinkPaletteChanged}
            >
              <obi-link slot="icon"></obi-link>
            </obc-toggle-switch>`
          : nothing}
      </div>
    `;
  }

  renderScreenControlLink() {
    if (!this.showScreenControlLink) {
      return nothing;
    }
    return html`
      <div class="footer">
        <obc-navigation-item
          .label="${msg('Screen Control')}"
          @click=${() => this.handleScreenControlLinkClicked()}
          hasicon
        >
          <obc-user-button slot="icon" static variant="icon" styleType="normal">
            <obi-screen-desk slot="icon"></obi-screen-desk>
          </obc-user-button>
        </obc-navigation-item>
      </div>
    `;
  }

  override render() {
    if (this.variant === ObcBrillianceMenuVariant.tabbed) {
      return html`<obc-tabbed-card class="card" nTabs=${2} hasTabIcons>
        <span slot="tab-title-0">${msg('Brilliance')}</span>
        <obi-display-brilliance-iec
          slot="tab-icon-0"
        ></obi-display-brilliance-iec>
        <span slot="tab-title-1">${msg('Day')}/${msg('Night')}</span>
        <obi-palette-day-night-iec
          slot="tab-icon-1"
        ></obi-palette-day-night-iec>
        <div slot="tab-content-0">
          ${this.renderBrightness()} ${this.renderScreenControlLink()}
        </div>
        <div slot="tab-content-1">
          ${this.renderPalette()} ${this.renderScreenControlLink()}
        </div>
      </obc-tabbed-card>`;
    } else {
      return html`
        <div class="card ${this.variant}">
          ${this.hideBrightness ? nothing : this.renderBrightness()}
          ${!this.hideBrightness && !this.hidePalette
            ? html`<div class="divider"></div>`
            : nothing}
          ${this.hidePalette ? nothing : this.renderPalette()}
          ${this.renderScreenControlLink()}
        </div>
      `;
    }
  }

  handleScreenControlLinkClicked() {
    this.dispatchEvent(new CustomEvent('screen-control-link-clicked'));
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-brilliance-menu': ObcBrillianceMenu;
  }
}
