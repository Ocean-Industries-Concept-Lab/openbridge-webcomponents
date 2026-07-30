import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './indicator-tank-atmospheric.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-tank.js';
import {
  IndicatorDirection,
  LinearIndicatorScheme,
  Rect,
  renderLinearBar,
  renderTrendGraph,
} from '../indicator-shared/linear-indicator.js';

export enum IndicatorTankAtmosphericVariant {
  bar = 'bar',
  trend = 'trend',
}

export enum IndicatorTankAtmosphericValue {
  regular = 'regular',
  enhanced = 'enhanced',
  medium = 'medium',
}

const HORIZONTAL_BAR: Rect = {x: 8, y: 11, width: 32, height: 26};
const VERTICAL_BAR: Rect = {x: 11, y: 8, width: 26, height: 32};
const HORIZONTAL_TREND: Rect = {x: 8, y: 10, width: 32, height: 28};
const VERTICAL_TREND: Rect = {x: 10, y: 8, width: 28, height: 32};

const FRAME_PATH =
  'M20.5 32.5L4.21259 32.5C3.70663 32.5 3.45364 32.5 3.09178 32.3531C2.84817 32.2542 2.44102 31.9492 2.27758 31.7433C2.0348 31.4373 1.98325 31.2615 1.88017 30.9098C1.29286 28.906 0.5 24.6852 0.5 16.5C0.5 8.31487 1.29286 4.09402 1.88016 2.09025C1.98325 1.73854 2.0348 1.56268 2.27758 1.25676C2.44102 1.0508 2.84817 0.745859 3.09178 0.646944C3.45364 0.500011 3.70662 0.500011 4.21259 0.500011L20.5 0.50001L36.7874 0.500011C37.2934 0.500011 37.5464 0.500011 37.9082 0.646943C38.1518 0.745859 38.559 1.0508 38.7224 1.25675C38.9652 1.56268 39.0167 1.73854 39.1198 2.09025C39.7071 4.09402 40.5 8.31487 40.5 16.5C40.5 24.6851 39.7071 28.906 39.1198 30.9098C39.0167 31.2615 38.9652 31.4373 38.7224 31.7433C38.559 31.9492 38.1518 32.2542 37.9082 32.3531C37.5464 32.5 37.2934 32.5 36.7874 32.5H20.5Z';

/**
 * Compact 48×48 atmospheric tank level indicator.
 *
 * ## Features / Variants
 * - `variant`: `bar` (bottom-up percentage fill) or `trend` (history graph
 *   with a current-value micro-bar)
 * - `direction`: `vertical` or `horizontal` tank outline
 * - `value`: color scheme — `regular`, `enhanced` or `medium`
 * - `level`: current tank level 0–100 (%), drives the fill and micro-bar
 * - `data`: history samples 0–100 (%) drawn as the trend graph
 * - `hasIcon`: centered icon overlay (bar variant only)
 *
 * ## Usage Guidelines
 * Use as an at-a-glance level indicator in dashboards and lists. For a
 * full-featured tank cell with readouts, badges and setpoints, use
 * `obc-automation-tank` instead.
 *
 * ## Slots
 * | Slot   | Condition                     | Purpose                        |
 * | ------ | ----------------------------- | ------------------------------ |
 * | `icon` | `hasIcon` and `variant='bar'` | Icon overlay (`obi-*` element) |
 *
 * @slot icon - Centered icon overlay, defaults to `obi-tank`
 */
@customElement('obc-indicator-tank-atmospheric')
export class ObcIndicatorTankAtmospheric extends LitElement {
  @property({type: String, reflect: true}) direction: IndicatorDirection =
    IndicatorDirection.vertical;
  @property({type: String, reflect: true})
  variant: IndicatorTankAtmosphericVariant =
    IndicatorTankAtmosphericVariant.bar;
  @property({type: String, reflect: true})
  value: IndicatorTankAtmosphericValue = IndicatorTankAtmosphericValue.regular;
  /** Current level, 0-100 (%) */
  @property({type: Number}) level = 0;
  /** History samples, 0-100 (%) each, oldest first */
  @property({type: Array}) data: number[] = [];
  @property({type: Boolean}) hasIcon = false;

  private get scheme(): LinearIndicatorScheme {
    switch (this.value) {
      case IndicatorTankAtmosphericValue.enhanced:
        return LinearIndicatorScheme.enhanced;
      case IndicatorTankAtmosphericValue.medium:
        return LinearIndicatorScheme.categorical;
      default:
        return LinearIndicatorScheme.regular;
    }
  }

  override render() {
    const horizontal = this.direction === IndicatorDirection.horizontal;
    const trend = this.variant === IndicatorTankAtmosphericVariant.trend;
    const barRect = horizontal
      ? trend
        ? HORIZONTAL_TREND
        : HORIZONTAL_BAR
      : trend
        ? VERTICAL_TREND
        : VERTICAL_BAR;
    const frameTransform = horizontal
      ? 'translate(3.5 7.5)'
      : 'rotate(90 24 24) translate(3.5 7.5)';
    const showIcon =
      this.hasIcon && this.variant === IndicatorTankAtmosphericVariant.bar;
    return html`
      <svg viewBox="0 0 48 48" role="img">
        <g transform=${frameTransform}>
          <path class="frame" d=${FRAME_PATH} />
        </g>
        ${this.variant === IndicatorTankAtmosphericVariant.trend
          ? renderTrendGraph(
              barRect,
              this.data,
              this.level,
              this.scheme,
              'tank'
            )
          : renderLinearBar(barRect, this.level, this.scheme, 'tank')}
      </svg>
      ${showIcon
        ? html`<div class="icon-wrapper">
            <slot name="icon"><obi-tank usecsscolor></obi-tank></slot>
          </div>`
        : nothing}
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-indicator-tank-atmospheric': ObcIndicatorTankAtmospheric;
  }
}
