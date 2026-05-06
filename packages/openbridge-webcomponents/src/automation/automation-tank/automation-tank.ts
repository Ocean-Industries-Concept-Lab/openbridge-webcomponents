import {HTMLTemplateResult, LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './automation-tank.css?inline';
import {LineMedium} from '../index.js';

import '../../icons/icon-chevron-double-up-google.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-double-down-google.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-off.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum TankTrend {
  fastRising = 'fast-rising',
  rising = 'rising',
  stable = 'stable',
  falling = 'falling',
  fastFalling = 'fast-falling',
}

export enum TankType {
  generic = 'generic',
  atmospheric = 'atmospheric',
  pressurized = 'pressurized',
  battery = 'battery',
}

export enum TankOrientation {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

/**
 *
 *
 * @ignition-base-height: 173px
 * @ignition-base-width: 168px
 * @ignition-center-horizontal
 */
@customElement('obc-automation-tank')
export class ObcAutomationTank extends LitElement {
  @property({type: String}) medium: LineMedium = LineMedium.water;
  @property({type: Number}) value: number = 0;
  @property({type: Number}) max: number = 100;
  @property({type: String}) trend: TankTrend = TankTrend.stable;
  @property({type: String}) type: TankType = TankType.generic;
  @property({type: String}) orientation: TankOrientation =
    TankOrientation.vertical;
  @property({type: Boolean, reflect: true}) compact: boolean = false;
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

  /**
   * Atmospheric cap, 3-piece (corner-start / stretchable middle arc / corner-end).
   * Each piece draws its own fill (closed) and stroke (open) so adjacent pieces
   * abut without a visible vertical seam line. Coordinates are derived from the
   * Figma 248x18 path; corners stay 12px wide while the middle arc stretches.
   * Position (start vs end) and orientation flipping are handled in CSS.
   *
   * Horizontal orientation reuses the same path data but rotates each piece
   * via an inner `<g transform="translate(0 H) rotate(-90)">`, mapping the
   * source coord (x, y) to (y, H - x). The viewBox is swapped accordingly:
   *  corner: 12x18 -> 18x12      (H=12)
   *  middle: 224x18 -> 18x224    (H=224)
   * Cap-end (right side in horizontal) is mirrored via CSS scaleX(-1).
   */
  private renderAtmosphericCap(side: 'start' | 'end'): HTMLTemplateResult {
    const isHorizontal = this.orientation === TankOrientation.horizontal;

    // Path data — identical between vertical and horizontal; only the SVG
    // viewBox + inner rotation transform differ.
    const cornerStartFill =
      'M 12 8.4648 C 6.346 8.7091, 5.176 8.8385, 4.168 9.3262 C 2.6445 10.0636, 1.418 11.4407, 0.8613 13.0391 C 0.493 14.0967, 0.5 15.3127, 0.5 17.5 L 0.5 18 L 12 18 Z';
    const cornerStartStroke =
      'M 12 8.4648 C 6.346 8.7091, 5.176 8.8385, 4.168 9.3262 C 2.6445 10.0636, 1.418 11.4407, 0.8613 13.0391 C 0.493 14.0967, 0.5 15.3127, 0.5 17.5 L 0.5 18';
    const midFill =
      'M 0 8.4648 C 16 6.5731, 56 2.5, 112 2.5 C 168 2.5, 208 6.5731, 224 8.4648 L 224 18 L 0 18 Z';
    const midStroke =
      'M 0 8.4648 C 16 6.5731, 56 2.5, 112 2.5 C 168 2.5, 208 6.5731, 224 8.4648';
    const cornerEndFill =
      'M 0 8.4648 C 5.654 8.7091, 6.824 8.8385, 7.832 9.3262 C 9.3555 10.0636, 10.582 11.4407, 11.1387 13.0391 C 11.507 14.0967, 11.5 15.3127, 11.5 17.5 L 11.5 18 L 0 18 Z';
    const cornerEndStroke =
      'M 0 8.4648 C 5.654 8.7091, 6.824 8.8385, 7.832 9.3262 C 9.3555 10.0636, 10.582 11.4407, 11.1387 13.0391 C 11.507 14.0967, 11.5 15.3127, 11.5 17.5 L 11.5 18';

    if (isHorizontal) {
      return html`
        <div class="cap cap-atmospheric cap-${side}">
          <svg
            class="cap-corner cap-corner-start"
            viewBox="0 0 18 12"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 12) rotate(-90)">
                <path class="cap-fill" d="${cornerStartFill}" />
                <path class="cap-stroke" fill="none" d="${cornerStartStroke}" />
              </g>
            `}
          </svg>
          <svg
            class="cap-mid"
            viewBox="0 0 18 224"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 224) rotate(-90)">
                <path class="cap-fill" d="${midFill}" />
                <path class="cap-stroke" fill="none" vector-effect="non-scaling-stroke" d="${midStroke}" />
              </g>
            `}
          </svg>
          <svg
            class="cap-corner cap-corner-end"
            viewBox="0 0 18 12"
            preserveAspectRatio="xMidYMin meet"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 12) rotate(-90)">
                <path class="cap-fill" d="${cornerEndFill}" />
                <path class="cap-stroke" fill="none" d="${cornerEndStroke}" />
              </g>
            `}
          </svg>
        </div>
      `;
    }

    return html`
      <div class="cap cap-atmospheric cap-${side}">
        <svg
          class="cap-corner cap-corner-start"
          viewBox="0 0 12 18"
          preserveAspectRatio="xMaxYMid meet"
          aria-hidden="true"
        >
          ${svg`
            <path class="cap-fill" d="${cornerStartFill}" />
            <path class="cap-stroke" fill="none" d="${cornerStartStroke}" />
          `}
        </svg>
        <svg
          class="cap-mid"
          viewBox="0 0 224 18"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${svg`
            <path class="cap-fill" d="${midFill}" />
            <path class="cap-stroke" fill="none" vector-effect="non-scaling-stroke" d="${midStroke}" />
          `}
        </svg>
        <svg
          class="cap-corner cap-corner-end"
          viewBox="0 0 12 18"
          preserveAspectRatio="xMinYMid meet"
          aria-hidden="true"
        >
          ${svg`
            <path class="cap-fill" d="${cornerEndFill}" />
            <path class="cap-stroke" fill="none" d="${cornerEndStroke}" />
          `}
        </svg>
      </div>
    `;
  }

  private renderCap(side: 'start' | 'end'): HTMLTemplateResult | null {
    if (this.type === TankType.generic) return null;
    if (this.type === TankType.battery && side === 'end') return null;
    if (this.type === TankType.atmospheric) {
      return this.renderAtmosphericCap(side);
    }
    if (this.type === TankType.pressurized) {
      return html`<div class="cap cap-pressurized cap-${side}"></div>`;
    }
    // battery, start only
    return html`<div class="cap cap-battery cap-${side}"></div>`;
  }

  override render() {
    const percent = (this.value / this.max) * 100;

    return html`
      <div class="outer">
        <div class="halo-area">
          <div
            class=${classMap({
              'tank-frame': true,
              [`type-${this.type}`]: true,
              [`orientation-${this.orientation}`]: true,
              [this.medium]: true,
              compact: this.compact,
            })}
            style="--percent: ${percent / 100}"
          >
            ${this.renderCap('start')}
            <div class="middle">
              <div class="badges">
                <slot name="badges"></slot>
              </div>
              ${this.compact
                ? null
                : html`
                    <div class="content">
                      <div class="header">
                        ${this.trendIcon()}
                        <div class="percent">
                          ${percent.toFixed(0)}<span class="percent-symbol"
                            >%</span
                          >
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
                  `}
              <div class="bar-container">
                <div class="bar"></div>
              </div>
            </div>
            ${this.renderCap('end')}
          </div>
          <button class="halo" type="button" aria-label=${this.tag || 'Tank'}>
            <span class="visually-hidden">${this.tag || 'Tank'}</span>
          </button>
        </div>

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
