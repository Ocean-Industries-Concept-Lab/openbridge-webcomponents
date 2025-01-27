import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './automation-tank.css?inline';
import {LineMedium} from '..';

import '../../icons/icon-chevron-double-up-google';
import '../../icons/icon-chevron-up-google';
import '../../icons/icon-chevron-double-down-google';
import '../../icons/icon-chevron-down-google';
import '../../icons/icon-off';
import {classMap} from 'lit/directives/class-map.js';

export enum TankTrend {
  fastRising = 'fast-rising',
  rising = 'rising',
  stable = 'stable',
  falling = 'falling',
  fastFalling = 'fast-falling',
}

export enum TankVariant {
  vertical = 'vertical',
  compact = 'compact',
}

/**
 *
 *
 * @ignition-base-height: 173px
 * @ignition-base-width: 168px
 * @ignition-center
 */
@customElement('obc-automation-tank')
export class ObcAutomationTank extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.water;
  @property({type: Number}) value: number = 0;
  @property({type: Number}) max: number = 100;
  @property({type: String}) trend: TankTrend = TankTrend.stable;
  @property({type: String}) variant: TankVariant = TankVariant.vertical;
  @property({type: String}) tag: string = '';

  trendIcon(): HTMLTemplateResult {
    if (this.trend === TankTrend.fastRising) {
      return html`<obi-chevron-double-up-google
        class="trend-icon"
      ></obi-chevron-double-up-google>`;
    } else if (this.trend === TankTrend.rising) {
      return html`<obi-chevron-up-google
        class="trend-icon"
      ></obi-chevron-up-google>`;
    } else if (this.trend === TankTrend.fastFalling) {
      return html`<obi-chevron-double-down-google
        class="trend-icon"
      ></obi-chevron-double-down-google>`;
    } else if (this.trend === TankTrend.falling) {
      return html`<obi-chevron-down-google
        class="trend-icon"
      ></obi-chevron-down-google>`;
    } else {
      return html`<obi-off class="trend-icon"></obi-off>`;
    }
  }

  override render() {
    const percent = (this.value / this.max) * 100;

    return html`
      <div class="outer">
        <div class="badges">
          <slot name="badges"></slot>
        </div>
        <button
          class=${classMap({
            wrapper: true,
            [this.variant]: true,
            [this.medium]: true,
          })}
          style="--percent: ${percent / 100}"
        >
          <div class="bar-container">
            <div class="bar"></div>
          </div>
          <div class="content">
            <div class="header">
              ${this.trendIcon()}
              <div class="percent">
                ${percent.toFixed(0)}<span class="percent-symbol">%</span>
              </div>
            </div>
            <div class="value">
              <div class="current">
                <slot name="current-value" class="current-value"
                  >${this.value.toFixed(0)}</slot
                ><span class="divider">/</span>
              </div>
              <div class="max">
                <slot class="max-value" name="max-value"
                  >${this.max.toFixed(0)}</slot
                >
                <slot class="unit" name="unit">m<sup>3</sup></slot>
              </div>
            </div>
          </div>
        </button>
        <div class="tag"><slot name="tag">${this.tag}</slot></div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-tank': ObcAutomationTank;
  }
}
