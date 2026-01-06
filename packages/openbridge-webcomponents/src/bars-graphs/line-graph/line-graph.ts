import {customElement} from '../../decorator.js';
import {ObcChartLineBase} from '../../building-blocks/chart-line/chart-line-base.js';

/**
 * Line chart component (non-filled) built on Chart.js.
 *
 * Use this component for clean line graphs without area fills.
 * For area charts with fill modes, use `<obc-area-graph>` instead.
 *
 * ## Features (inherited from base class)
 * - **Single or multi-series**: Use `data` for simple single-series or `datasets` for multi-series charts
 * - **Time and category axes**: Supports `category` x-axis (labels) and `time` x-axis (ISO dates or timestamps)
 * - **Line styles**: Choose `smooth` (curved), `straight`, or `stepped` line rendering
 * - **Flexible axes**: Single y-axis via `yAxisPosition` or multi-axis via `yAxes` for complex charts
 * - **Theme-aware**: Automatically updates colors on theme changes using CSS variables
 * - **Responsive sizing**: Fixed height with 1.5:1 aspect ratio (e.g., 320px height → 480px width)
 * - **Grid & ticks**: Toggle grid lines (`showGrid`, `showGridX`, `showGridY`) and tick marks (`showTickMarks`)
 * - **Legend support**: Optional HTML legend showing series labels with `legend` property
 * - **External axis support**: via slots
 *
 * ## Size Behavior
 * - Above 192px: Shows labels, tick marks, and grid lines with standard padding
 * - Below 192px: Hides labels/ticks and uses edge-to-edge rendering for compact display
 *
 * ## Usage Examples
 *
 * ### Basic single-series line graph
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.data = [
 *     {label: 'Jan', value: 10},
 *     {label: 'Feb', value: 14},
 *     {label: 'Mar', value: 12}
 *   ];
 *   chart.unit = 'kW';
 *   chart.height = 256;
 * </script>
 * ```
 *
 * ### Multi-series with time axis and legend
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.xAxisType = 'time';
 *   chart.timeDisplay = 'date';
 *   chart.legend = true;
 *   chart.datasets = [
 *     {label: 'Temperature', data: [{x: '2025-01-01', y: 20}, {x: '2025-01-02', y: 22}]},
 *     {label: 'Humidity', data: [{x: '2025-01-01', y: 65}, {x: '2025-01-02', y: 68}]}
 *   ];
 * </script>
 * ```
 *
 * ### Multi-axis chart (left and right y-axes)
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.yAxes = [
 *     {id: 'y-temp', position: 'left', min: 0, max: 100},
 *     {id: 'y-pressure', position: 'right', min: 0, max: 10}
 *   ];
 *   chart.datasets = [
 *     {label: 'Temperature', data: [20, 25, 30], yAxisID: 'y-temp'},
 *     {label: 'Pressure', data: [2, 3, 2.5], yAxisID: 'y-pressure'}
 *   ];
 * </script>
 * ```
 *
 * ### With line styles
 * ```html
 * <obc-line-graph lineMode="straight" .showPoints="${true}"></obc-line-graph>
 * ```
 */
@customElement('obc-line-graph')
export class ObcLineGraph extends ObcChartLineBase {
  // Implement abstract methods from base class
  // Line graph never applies fill - use <obc-area-graph> for area charts
  protected override shouldApplyFill(): boolean {
    return false;
  }

  protected override getFillMode(): string | undefined {
    return undefined;
  }

  protected override shouldStack(): boolean {
    return false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-line-graph': ObcLineGraph;
  }
}
