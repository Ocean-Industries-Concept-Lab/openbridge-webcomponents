import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './automation-tank.css?inline';
import {LineMedium} from '..';

import '../../icons/icon-02-chevron-double-up';
import '../../icons/icon-02-chevron-up';
import '../../icons/icon-02-chevron-double-down';
import '../../icons/icon-02-chevron-down';
import '../../icons/icon-01-off';

export enum TankTrend {
  fastRising = 'fast-rising',
  rising = 'rising',
  stable = 'stable',
  falling = 'falling',
  fastFalling = 'fast-falling',
}

@customElement('obc-automation-tank')
export class ObcAutomationTank extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.water;
  @property({type: Number}) value: number = 0;
  @property({type: Number}) max: number = 100;
  @property({type: String}) trend: TankTrend = TankTrend.stable;

  trendIcon(): HTMLTemplateResult {
    if (this.trend === TankTrend.fastRising) {
      return html`<obi-02-chevron-double-up
        class="trend-icon"
      ></obi-02-chevron-double-up>`;
    } else if (this.trend === TankTrend.rising) {
      return html`<obi-02-chevron-up class="trend-icon"></obi-02-chevron-up>`;
    } else if (this.trend === TankTrend.fastFalling) {
      return html`<obi-02-chevron-double-down
        class="trend-icon"
      ></obi-02-chevron-double-down>`;
    } else if (this.trend === TankTrend.falling) {
      return html`<obi-02-chevron-down
        class="trend-icon"
      ></obi-02-chevron-down>`;
    } else {
      return html`<obi-01-off class="trend-icon"></obi-01-off>`;
    }
  }

  override render() {
    const percent = (this.value / this.max) * 100;

    return html`
      <div class="wrapper" style="--percent: ${percent}%">
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
