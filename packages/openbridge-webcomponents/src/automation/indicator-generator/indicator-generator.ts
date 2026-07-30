import {LitElement, html, svg, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './indicator-generator.css?inline';
import {customElement} from '../../decorator.js';
import {
  BUTTON_SILHOUETTE_RADIUS,
  DISC_RADIUS,
  FILLED_DISC_RADIUS,
  BAR_SILHOUETTE_RADIUS,
  BAR_SILHOUETTE_STROKE_WIDTH,
  BAR_OUTLINE_RADIUS,
  DOUBLE_BAR_OUTLINE_RADIUS,
  OUTLINE_STROKE_WIDTH,
  BAR_TRACK_RADIUS,
  BAR_TRACK_STROKE_WIDTH,
  DOUBLE_BAR_OUTER_RADIUS,
  DOUBLE_BAR_OUTER_STROKE_WIDTH,
  DOUBLE_BAR_INNER_RADIUS,
  DOUBLE_BAR_INNER_STROKE_WIDTH,
  arcPath,
  progressSweep,
} from './indicator-generator-geometry.js';

export enum IndicatorGeneratorVariant {
  button = 'button',
  bar = 'bar',
  doubleBar = 'double-bar',
}

export enum IndicatorGeneratorValue {
  off = 'off',
  regular = 'regular',
  filled = 'filled',
  enhanced = 'enhanced',
  categorical = 'categorical',
}

const ICON_G_PATH =
  'M6.1686 5.216H10.6326V11.088C10.0353 11.2907 9.41127 11.4507 8.7606 11.568C8.1206 11.6853 7.38993 11.744 6.5686 11.744C5.43793 11.744 4.4726 11.52 3.6726 11.072C2.88327 10.6133 2.2806 9.94667 1.8646 9.072C1.4486 8.19733 1.2406 7.12533 1.2406 5.856C1.2406 4.66133 1.46993 3.62667 1.9286 2.752C2.39793 1.87733 3.07527 1.2 3.9606 0.72C4.84593 0.24 5.9286 0 7.2086 0C7.8166 0 8.41393 0.0640001 9.0006 0.192C9.58727 0.32 10.1206 0.490667 10.6006 0.704L9.8326 2.56C9.46993 2.37867 9.05927 2.22933 8.6006 2.112C8.1526 1.99467 7.68327 1.936 7.1926 1.936C6.4566 1.936 5.82193 2.10133 5.2886 2.432C4.76593 2.752 4.35527 3.21067 4.0566 3.808C3.7686 4.39467 3.6246 5.09333 3.6246 5.904C3.6246 6.66133 3.73127 7.33867 3.9446 7.936C4.15793 8.52267 4.49393 8.98133 4.9526 9.312C5.41127 9.64267 6.01393 9.808 6.7606 9.808C7.00593 9.808 7.21927 9.80267 7.4006 9.792C7.5926 9.77067 7.76327 9.74933 7.9126 9.728C8.0726 9.696 8.22727 9.66933 8.3766 9.648V7.152H6.1686V5.216Z';

const ICON_TILDE_PATH =
  'M4.20117 14.0059C5.30264 14.0679 6.22793 14.5801 7.02344 15.2207C7.64824 15.7239 8.18172 15.9676 8.7041 15.9971C9.21748 16.026 9.88939 15.8574 10.8096 15.1904L11.6191 14.6035L12.793 16.2227L11.9834 16.8096C10.8203 17.6526 9.7024 18.0567 8.5918 17.9941C7.49033 17.9321 6.56504 17.4199 5.76953 16.7793C5.14473 16.2761 4.61125 16.0324 4.08887 16.0029C3.57549 15.974 2.90358 16.1426 1.9834 16.8096L1.17383 17.3965L0 15.7773L0.80957 15.1904C1.97263 14.3473 3.09057 13.9433 4.20117 14.0059Z';

/**
 * Compact generator status indicator (48×48; 56×56 as double-bar).
 *
 * ## Features / Variants
 * - `variant`: `button` (plain disc), `bar` (disc with a circular progress
 *   ring) or `double-bar` (disc with two concentric progress rings)
 * - `value`: visual scheme — `off`, `regular`, `filled`, `enhanced` or
 *   `categorical`; `off` hides the progress rings
 * - `level`: 0–100 (%), sweep of the (outer) progress ring, clockwise from
 *   12 o'clock
 * - `secondaryLevel`: 0–100 (%), sweep of the inner ring (double-bar only)
 *
 * ## Usage Guidelines
 * Use as an at-a-glance generator load indicator in dashboards and lists.
 * For schematic (P&ID) placement with button behavior, use the electric
 * generator automation devices instead.
 *
 * ## Slots
 * | Slot   | Condition | Purpose                                          |
 * | ------ | --------- | ------------------------------------------------ |
 * | `icon` | always    | Center icon, defaults to the generator G~ glyph  |
 *
 * @slot icon - Center icon, defaults to the generator G~ glyph
 */
@customElement('obc-indicator-generator')
export class ObcIndicatorGenerator extends LitElement {
  @property({type: String, reflect: true}) variant: IndicatorGeneratorVariant =
    IndicatorGeneratorVariant.button;
  @property({type: String, reflect: true}) value: IndicatorGeneratorValue =
    IndicatorGeneratorValue.off;
  /** Outer progress ring sweep, 0-100 (%) */
  @property({type: Number}) level = 0;
  /** Inner progress ring sweep, 0-100 (%), double-bar only */
  @property({type: Number}) secondaryLevel = 0;

  private get center(): number {
    return this.variant === IndicatorGeneratorVariant.doubleBar ? 28 : 24;
  }

  private get discRadius(): number {
    if (this.value === IndicatorGeneratorValue.filled) {
      return FILLED_DISC_RADIUS;
    }
    if (
      this.variant === IndicatorGeneratorVariant.button ||
      this.value === IndicatorGeneratorValue.off ||
      this.value === IndicatorGeneratorValue.regular
    ) {
      return DISC_RADIUS;
    }
    return FILLED_DISC_RADIUS;
  }

  private get showOutline(): boolean {
    if (this.variant === IndicatorGeneratorVariant.bar) {
      return [
        IndicatorGeneratorValue.filled,
        IndicatorGeneratorValue.enhanced,
        IndicatorGeneratorValue.categorical,
      ].includes(this.value);
    }
    if (this.variant === IndicatorGeneratorVariant.doubleBar) {
      return this.value !== IndicatorGeneratorValue.off;
    }
    return false;
  }

  private renderRing(radius: number, strokeWidth: number, level: number) {
    const c = this.center;
    const sweep = progressSweep(level);
    return svg`
      <circle class="ring-track" cx=${c} cy=${c} r=${radius} stroke-width=${strokeWidth} />
      ${
        sweep >= 360
          ? svg`<circle class="ring-progress" cx=${c} cy=${c} r=${radius} stroke-width=${strokeWidth} />`
          : sweep > 0
            ? svg`<path class="ring-progress" d=${arcPath(c, c, radius, 0, sweep)} stroke-width=${strokeWidth} />`
            : nothing
      }
    `;
  }

  override render() {
    const c = this.center;
    const doubleBar = this.variant === IndicatorGeneratorVariant.doubleBar;
    const bar = this.variant === IndicatorGeneratorVariant.bar;
    const showRings = this.value !== IndicatorGeneratorValue.off;
    const size = doubleBar ? 56 : 48;
    return html`
      <svg viewBox="0 0 ${size} ${size}" role="img">
        ${this.variant === IndicatorGeneratorVariant.button
          ? svg`<circle class="silhouette" cx=${c} cy=${c} r=${BUTTON_SILHOUETTE_RADIUS} />`
          : nothing}
        ${bar
          ? svg`<circle class="silhouette-ring" cx=${c} cy=${c} r=${BAR_SILHOUETTE_RADIUS} stroke-width=${BAR_SILHOUETTE_STROKE_WIDTH} />`
          : nothing}
        <circle class="disc" cx=${c} cy=${c} r=${this.discRadius} />
        ${this.showOutline
          ? svg`<circle
              class="outline"
              cx=${c}
              cy=${c}
              r=${doubleBar ? DOUBLE_BAR_OUTLINE_RADIUS : BAR_OUTLINE_RADIUS}
              stroke-width=${OUTLINE_STROKE_WIDTH}
            />`
          : nothing}
        ${bar && showRings
          ? this.renderRing(
              BAR_TRACK_RADIUS,
              BAR_TRACK_STROKE_WIDTH,
              this.level
            )
          : nothing}
        ${doubleBar && showRings
          ? svg`
              ${this.renderRing(DOUBLE_BAR_OUTER_RADIUS, DOUBLE_BAR_OUTER_STROKE_WIDTH, this.level)}
              ${this.renderRing(DOUBLE_BAR_INNER_RADIUS, DOUBLE_BAR_INNER_STROKE_WIDTH, this.secondaryLevel)}
            `
          : nothing}
      </svg>
      <div class="icon-wrapper">
        <slot name="icon">
          <svg class="default-icon" viewBox="0 0 24 24">
            <g transform="translate(5.604 3)">
              <path d=${ICON_G_PATH} />
              <path d=${ICON_TILDE_PATH} />
            </g>
          </svg>
        </slot>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-indicator-generator': ObcIndicatorGenerator;
  }
}
