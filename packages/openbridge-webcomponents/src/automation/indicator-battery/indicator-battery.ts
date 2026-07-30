import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './indicator-battery.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-energy-battery.js';
import {
  IndicatorDirection,
  LinearIndicatorScheme,
  Rect,
  renderLinearBar,
  renderTrendGraph,
} from '../indicator-shared/linear-indicator.js';

export enum IndicatorBatteryVariant {
  bar = 'bar',
  trend = 'trend',
}

export enum IndicatorBatteryValue {
  regular = 'regular',
  enhanced = 'enhanced',
  categorical = 'categorical',
}

const HORIZONTAL_SHELL: Rect = {x: 6, y: 8, width: 36, height: 32};
const VERTICAL_SHELL: Rect = {x: 8, y: 6, width: 32, height: 36};
const HORIZONTAL_BAR: Rect = {x: 9, y: 11, width: 30, height: 26};
const VERTICAL_BAR: Rect = {x: 11, y: 9, width: 26, height: 30};
const HORIZONTAL_TREND: Rect = {x: 8, y: 10, width: 32, height: 28};
const VERTICAL_TREND: Rect = {x: 10, y: 8, width: 28, height: 32};

const HORIZONTAL_TIP_PATH =
  'M42 18 H44 A2 2 0 0 1 46 20 V28 A2 2 0 0 1 44 30 H42 Z';
const VERTICAL_TIP_PATH = 'M18 6 V4 A2 2 0 0 1 20 2 H28 A2 2 0 0 1 30 4 V6 Z';

/**
 * Compact 48×48 battery charge indicator.
 *
 * ## Features / Variants
 * - `variant`: `bar` (bottom-up percentage fill) or `trend` (history graph
 *   with a current-value micro-bar)
 * - `direction`: `vertical` or `horizontal` battery shell
 * - `value`: color scheme — `regular`, `enhanced` or `categorical`
 * - `level`: current charge 0–100 (%), drives the fill and micro-bar
 * - `data`: history samples 0–100 (%) drawn as the trend graph
 * - `hasIcon`: centered icon overlay (bar variant only)
 *
 * ## Usage Guidelines
 * Use as an at-a-glance charge indicator in dashboards and lists. For a
 * full-featured tank/battery cell with readouts, badges and setpoints, use
 * `obc-automation-tank` (type `battery`) instead.
 *
 * ## Best Practices / Constraints
 * - `level` and `data` values are clamped to 0–100; values outside that
 *   range are pinned to the nearest bound.
 * - The `trend` variant needs at least two `data` samples to draw a line;
 *   with fewer it shows only the current-value micro-bar.
 * - The `icon` slot renders only in the `bar` variant; it is ignored in
 *   `trend`.
 * - Display-only: the root SVG is `aria-hidden`; convey battery state to
 *   assistive tech through adjacent text if it is not otherwise available.
 *
 * ## Slots
 * | Slot   | Condition                     | Purpose                        |
 * | ------ | ----------------------------- | ------------------------------ |
 * | `icon` | `hasIcon` and `variant='bar'` | Icon overlay (`obi-*` element) |
 *
 * @slot icon - Centered icon overlay, defaults to `obi-energy-battery`
 */
@customElement('obc-indicator-battery')
export class ObcIndicatorBattery extends LitElement {
  @property({type: String, reflect: true}) direction: IndicatorDirection =
    IndicatorDirection.vertical;
  @property({type: String, reflect: true}) variant: IndicatorBatteryVariant =
    IndicatorBatteryVariant.bar;
  @property({type: String, reflect: true}) value: IndicatorBatteryValue =
    IndicatorBatteryValue.regular;
  /** Current charge, 0-100 (%) */
  @property({type: Number}) level = 0;
  /** History samples, 0-100 (%) each, oldest first */
  @property({type: Array}) data: number[] = [];
  @property({type: Boolean}) hasIcon = false;

  private get scheme(): LinearIndicatorScheme {
    switch (this.value) {
      case IndicatorBatteryValue.enhanced:
        return LinearIndicatorScheme.enhanced;
      case IndicatorBatteryValue.categorical:
        return LinearIndicatorScheme.categorical;
      default:
        return LinearIndicatorScheme.regular;
    }
  }

  override render() {
    const horizontal = this.direction === IndicatorDirection.horizontal;
    const trend = this.variant === IndicatorBatteryVariant.trend;
    const shell = horizontal ? HORIZONTAL_SHELL : VERTICAL_SHELL;
    const barRect = horizontal
      ? trend
        ? HORIZONTAL_TREND
        : HORIZONTAL_BAR
      : trend
        ? VERTICAL_TREND
        : VERTICAL_BAR;
    const showIcon =
      this.hasIcon && this.variant === IndicatorBatteryVariant.bar;
    return html`
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          class="tip"
          d=${horizontal ? HORIZONTAL_TIP_PATH : VERTICAL_TIP_PATH}
        />
        <rect
          class="shell"
          x=${shell.x}
          y=${shell.y}
          width=${shell.width}
          height=${shell.height}
          rx="4"
        />
        ${this.variant === IndicatorBatteryVariant.trend
          ? renderTrendGraph(
              barRect,
              this.data,
              this.level,
              this.scheme,
              'battery'
            )
          : renderLinearBar(barRect, this.level, this.scheme, 'battery')}
      </svg>
      ${showIcon
        ? html`<div class="icon-wrapper">
            <slot name="icon">
              <obi-energy-battery usecsscolor></obi-energy-battery>
            </slot>
          </div>`
        : nothing}
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-indicator-battery': ObcIndicatorBattery;
  }
}
