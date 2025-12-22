import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  ObcChartLineBase,
  ScaleInfo,
} from '../../building-blocks/chart-line/chart-line-base.js';

export enum AreaFillMode {
  semitransparent = 'semitransparent',
  solid = 'solid',
  threshold = 'threshold',
}

/**
 * Area graph component - a line chart that is always filled.
 * Extends the base line/area chart with fill behavior built-in.
 *
 * Use this component when you want area charts with semitransparent, solid, or threshold fill modes.
 * For non-filled line charts, use `<obc-line-graph>` instead.
 *
 * All properties and features from the base class are available:
 * - Single or multi-series data
 * - Time and category axes
 * - Stacked mode for multi-series
 * - Threshold fill (single-series only)
 * - Theme-aware colors
 * - Responsive sizing
 * - External axis support via `scales-updated` event
 *
 * ## Usage Examples
 *
 * ### Basic semitransparent area graph (default)
 * ```html
 * <obc-area-graph></obc-area-graph>
 * <script>
 *   const chart = document.querySelector('obc-area-graph');
 *   chart.data = [
 *     {label: 'Jan', value: 10},
 *     {label: 'Feb', value: 14},
 *     {label: 'Mar', value: 12}
 *   ];
 *   chart.fillMode = 'semitransparent'; // default
 *   chart.fixedHeight = 256;
 * </script>
 * ```
 *
 * ### Solid fill area graph
 * ```html
 * <obc-area-graph fillMode="solid"></obc-area-graph>
 * ```
 *
 * ### Stacked area chart
 * ```html
 * <obc-area-graph></obc-area-graph>
 * <script>
 *   const chart = document.querySelector('obc-area-graph');
 *   chart.datasets = [
 *     {label: 'Series A', data: [2, 3, 4, 3, 5]},
 *     {label: 'Series B', data: [1, 2, 3, 2, 4]},
 *     {label: 'Series C', data: [3, 2, 1, 2, 3]}
 *   ];
 *   chart.fillMode = 'solid';
 *   chart.stacked = true;
 *   chart.legend = true;
 * </script>
 * ```
 *
 * ### Threshold fill
 * Single-series only. Automatically calculates midpoint from data min/max.
 * ```html
 * <obc-area-graph></obc-area-graph>
 * <script>
 *   const chart = document.querySelector('obc-area-graph');
 *   chart.data = [{label: '1', value: 20}, {label: '2', value: 45}, {label: '3', value: 35}];
 *   chart.fillMode = 'threshold'; // Single-series only
 * </script>
 * ```
 *
 * ### Multi-series with time axis
 * ```html
 * <obc-area-graph></obc-area-graph>
 * <script>
 *   const chart = document.querySelector('obc-area-graph');
 *   chart.xAxisType = 'time';
 *   chart.legend = true;
 *   chart.datasets = [
 *     {label: 'CPU', data: [{x: '2025-01-01T10:00', y: 45}, {x: '2025-01-01T11:00', y: 52}]},
 *     {label: 'Memory', data: [{x: '2025-01-01T10:00', y: 65}, {x: '2025-01-01T11:00', y: 68}]}
 *   ];
 * </script>
 * ```
 */
@customElement('obc-area-graph')
export class ObcAreaGraph extends ObcChartLineBase {
  /**
   * Fill rendering mode for area charts.
   * - `'semitransparent'`: 50% alpha fill (default)
   * - `'solid'`: Opaque fill
   * - `'threshold'`: single-series only, falls back to semitransparent for multi-series
   */
  @property({type: String})
  fillMode: AreaFillMode = AreaFillMode.semitransparent;

  /**
   * Stack multi-series datasets vertically on y-axis.
   * Ignored for single-series and threshold fill mode.
   */
  @property({type: Boolean})
  stacked = false;

  /**
   * Area graphs always apply fill.
   */
  protected override shouldApplyFill(): boolean {
    return true;
  }

  /**
   * Return the fill mode for area rendering.
   */
  protected override getFillMode(): string | undefined {
    return this.fillMode;
  }

  /**
   * Return whether multi-series datasets should be stacked.
   */
  protected override shouldStack(): boolean {
    return this.stacked;
  }
}

// Re-export ScaleInfo for convenience (used with scales-updated event)
export type {ScaleInfo};

declare global {
  interface HTMLElementTagNameMap {
    'obc-area-graph': ObcAreaGraph;
  }
}
