import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './depth.css?inline';
import '../gauge-trend/gauge-trend.js';
import './depth-top-band.js';
import {DepthTopBandType} from './depth-top-band.js';
import {ScaleType} from '../../building-blocks/bar-vertical/bar-vertical.js';
import {
  XAxisType,
  TimeDisplay,
  type ChartLineDataItem,
  type ChartLineDataset,
  type ChartLinePoint,
  type ChartLineXAxisConfig,
  type ChartLineXMarker,
  type ChartLineYMarker,
} from '../../building-blocks/chart-line/chart-line-base.js';
import {
  getCssVariableValue,
  observeThemeChanges,
} from '../../charthelpers/index.js';
import type {LinearAdvice} from '../../building-blocks/instrument-linear/advice.js';
import {InstrumentState, Priority} from '../types.js';
import {VesselImage} from '../watch/watch.js';
import {
  DEPTH_RANGES,
  resolveDepthRange,
  type DepthRange,
} from './depth-shared.js';

/** Figma axis "Depth type". */
export enum DepthType {
  /** History up to now, the current depth marked in the scale band. */
  regular = 'regular',
  /** History astern, predicted depths ahead along the track, now in the middle. */
  prediction = 'prediction',
  /** History astern and a forward-looking scan of the seabed ahead. */
  scanned = 'scanned',
}

/** A history sample; `echoValue` is the deeper edge of the echo return band. */
export type DepthDataItem = ChartLineDataItem & {echoValue?: number};

/** Default x window per type, in the distance unit of the track. */
const DEFAULT_X_AXIS: Partial<Record<DepthType, ChartLineXAxisConfig>> = {
  [DepthType.prediction]: {min: -200, max: 200},
  [DepthType.scanned]: {min: -100, max: 250},
};

const LINE_WIDTH = 2;
const PREDICTION_DASH = [8, 4];
const PAST_TRACK_DASH = [0, 4];
const PREDICTED_DEPTH_DASH = [0, 6];

/** Deepest finite value among the given series, or NaN. */
function deepest(...series: (number | undefined)[][]): number {
  let max = NaN;
  for (const values of series) {
    for (const v of values) {
      if (v !== undefined && Number.isFinite(v) && !(v <= max)) max = v;
    }
  }
  return max;
}

/**
 * `<obc-depth>` — history and current depth on a chart.
 *
 * A square instrument built on `obc-gauge-trend`: the depth axis runs
 * downward from 0 at the top, the right band carries the condensed scale and
 * the current-value dot, and the chart shows the history as a line with the
 * echo return band under it.
 *
 * ## Types (`type`)
 * - `regular` — history only; now is the right edge.
 * - `prediction` — now in the middle with a now-line and dot, predicted depths
 *   ahead as a dashed line, and the x range labelled above the frame.
 * - `scanned` — history astern as a dotted past track, the scanned seabed
 *   ahead with the water column filled up to the surface and cut off at the
 *   scan range, and a dotted line at the predicted depth beyond it.
 *
 * ## Range
 * `ranges` is the ladder of range steps (default: the design's 25 / 100 / 1000);
 * `maxDepth` picks one explicitly, `autoRange` climbs and descends it with
 * hysteresis as the data changes.
 *
 * `regular` history takes `{x, value}` samples on a time axis (`x` as epoch
 * ms, ISO string, Date or Temporal) or `{label, value}` on a category axis;
 * `prediction` and `scan` are `{x, value}` with `x` a distance along the
 * track, negative astern.
 *
 * @property type - `regular`, `prediction` or `scanned`.
 * @property data - History samples; `echoValue` draws the echo band under the line.
 * @property prediction - Predicted depths ahead, `x` a distance from the vessel.
 * @availableWhen prediction type==prediction
 * @property scan - Scanned seabed ahead, `x` a distance from the vessel.
 * @availableWhen scan type==scanned
 * @property scanRange - Sonar range in the distance unit, which is also the slant range that
 *   cuts the water column off; the last scan sample when unset.
 * @availableWhen scanRange type==scanned
 * @property predictedDepth - Depth drawn as a dotted line beyond the scan range.
 * @availableWhen predictedDepth type==scanned
 * @property value - Current depth; the last history sample when unset.
 * @property hasValueLine - Draws the current depth as a line across the chart.
 * @property now - x of the now-line; 0 for `prediction` and `scanned`.
 * @availableWhen now type!=regular
 * @property xAxis - Pinned x range; defaults to ±200 for `prediction` and −100…250 for `scanned`.
 * @property ranges - Range ladder.
 * @property maxDepth - Explicit scale maximum; wins over `autoRange`.
 * @property autoRange - Steps the ladder with the data.
 * @property primaryTickmarkInterval - Overrides the range's primary tick interval.
 * @availableWhen primaryTickmarkInterval hasScale==true
 * @property secondaryTickmarkInterval - Overrides the range's secondary tick interval.
 * @availableWhen secondaryTickmarkInterval hasScale==true
 * @property hasScale - Condensed tick ladder in the right band (Figma style "Condenced").
 * @property showVessel - Frame band with the vessel silhouette above the chart (Figma style "Vessel scale").
 * @property vesselImage - Side-view silhouette in the vessel band.
 * @availableWhen vesselImage showVessel==true
 * @property hasAdvice - Advice overlays on the right band.
 * @property advice - Advice zones in depth units.
 * @availableWhen advice hasAdvice==true
 * @property priority - `enhanced` draws the live series in the enhanced palette.
 * @property state - Instrument state, passed to the chart and the scale.
 * @experimental
 */
@customElement('obc-depth')
export class ObcDepth extends LitElement {
  @property({type: String}) type: DepthType = DepthType.regular;
  @property({type: Array, attribute: false}) data: DepthDataItem[] = [];
  @property({type: Array, attribute: false}) prediction: ChartLineDataItem[] =
    [];
  @property({type: Array, attribute: false}) scan: ChartLineDataItem[] = [];
  @property({type: Number}) scanRange?: number = undefined;
  @property({type: Number}) predictedDepth?: number = undefined;
  @property({type: Number}) value?: number = undefined;
  @property({type: Boolean}) hasValueLine = false;
  @property({type: Number}) now = 0;
  @property({type: Object, attribute: false}) xAxis?: ChartLineXAxisConfig =
    undefined;
  @property({type: Array, attribute: false}) ranges: readonly DepthRange[] =
    DEPTH_RANGES;
  @property({type: Number}) maxDepth?: number = undefined;
  @property({type: Boolean}) autoRange = false;
  @property({type: Number}) primaryTickmarkInterval?: number = undefined;
  @property({type: Number}) secondaryTickmarkInterval?: number = undefined;
  @property({type: Boolean}) hasScale = false;
  @property({type: Boolean}) showVessel = false;
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvSide;
  @property({type: Boolean}) hasAdvice = false;
  @property({type: Array, attribute: false}) advice: LinearAdvice[] = [];
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) state: InstrumentState = InstrumentState.active;

  @state() private _range: DepthRange = DEPTH_RANGES[1];
  @state() private _cellWidth = 0;
  @state() private _cellHeight = 0;

  private _cellObserver?: ResizeObserver;
  private _themeObserver?: MutationObserver;

  override connectedCallback() {
    super.connectedCallback();
    // The canvas gets resolved colours, so a theme switch has to rebuild them.
    this._themeObserver = observeThemeChanges(() => this.requestUpdate());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._themeObserver?.disconnect();
    this._themeObserver = undefined;
    this._cellObserver?.disconnect();
    this._cellObserver = undefined;
  }

  override firstUpdated() {
    const cell = this.renderRoot.querySelector('.container');
    if (!cell) return;
    // contentRect, not getBoundingClientRect: the latter is zoom-scaled.
    this._cellObserver = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width !== this._cellWidth) this._cellWidth = width;
      if (height !== this._cellHeight) this._cellHeight = height;
    });
    this._cellObserver.observe(cell);
  }

  override willUpdate(changed: PropertyValues) {
    if (
      changed.has('data') ||
      changed.has('prediction') ||
      changed.has('scan') ||
      changed.has('predictedDepth') ||
      changed.has('value') ||
      changed.has('maxDepth') ||
      changed.has('autoRange') ||
      changed.has('ranges')
    ) {
      this._range = resolveDepthRange({
        ranges: this.ranges,
        maxDepth: this.maxDepth,
        autoRange: this.autoRange,
        dataMax: this.dataMax,
        current: this._range,
      });
    }
  }

  /** The range in use. */
  get range(): DepthRange {
    return this._range;
  }

  /** Current depth: the property, else the last history sample. */
  get currentDepth(): number | undefined {
    if (this.value !== undefined) return this.value;
    for (let i = this.data.length - 1; i >= 0; i--) {
      const v = this.data[i].value;
      if (Number.isFinite(v)) return v;
    }
    return undefined;
  }

  private get dataMax(): number {
    return deepest(
      this.data.map((d) => d.value),
      this.data.map((d) => d.echoValue),
      this.type === DepthType.prediction
        ? this.prediction.map((d) => d.value)
        : [],
      this.type === DepthType.scanned ? this.scan.map((d) => d.value) : [],
      [this.type === DepthType.scanned ? this.predictedDepth : undefined],
      [this.currentDepth]
    );
  }

  /** Whether the history is positioned by `x` (time axis) or by `label`. */
  private get historyHasX(): boolean {
    return this.data.length > 0 && this.data.every((d) => d.x != null);
  }

  private get xAxisType(): XAxisType {
    if (this.type !== DepthType.regular) return XAxisType.number;
    return this.historyHasX ? XAxisType.time : XAxisType.category;
  }

  private get effectiveXAxis(): ChartLineXAxisConfig | undefined {
    return this.xAxis ?? DEFAULT_X_AXIS[this.type];
  }

  private get effectiveScanRange(): number | undefined {
    if (this.scanRange !== undefined) return this.scanRange;
    const last = this.scan[this.scan.length - 1];
    return last?.x !== undefined ? Number(last.x) : undefined;
  }

  private colors() {
    const live = this.priority === Priority.enhanced ? 'enhanced' : 'regular';
    const read = (name: string) => getCssVariableValue(this, name);
    return {
      line: read(`--instrument-${live}-secondary-color`),
      band: read(`--instrument-${live}-tertiary-color`),
      dimLine: read('--instrument-regular-secondary-color'),
      dimBand: read('--instrument-regular-tertiary-color'),
    };
  }

  private points(
    items: ChartLineDataItem[],
    pick: (item: ChartLineDataItem) => number | undefined = (d) => d.value
  ): ChartLinePoint[] {
    return items.map((d) => ({x: d.x ?? NaN, y: pick(d) ?? d.value}));
  }

  /** Series for the chart, drawn back to front (the first entry is on top). */
  buildDatasets(): ChartLineDataset[] {
    const c = this.colors();
    const history = this.historyHasX
      ? this.points(this.data)
      : this.data.map((d) => d.value);
    const echo = this.historyHasX
      ? this.points(this.data, (d) => (d as DepthDataItem).echoValue)
      : this.data.map((d) => d.echoValue ?? d.value);
    const historySet = (line: string): ChartLineDataset => ({
      label: 'history',
      data: history,
      borderColor: line,
      borderWidth: LINE_WIDTH,
      fill: false,
    });
    const echoSet = (target: number, band: string): ChartLineDataset => ({
      label: 'echo',
      data: echo,
      borderWidth: 0,
      pointRadius: 0,
      backgroundColor: band,
      fill: target,
    });

    if (this.type === DepthType.prediction) {
      return [
        historySet(c.line),
        echoSet(0, c.band),
        {
          label: 'prediction',
          data: this.points(this.prediction),
          borderColor: c.dimLine,
          borderWidth: LINE_WIDTH,
          borderDash: PREDICTION_DASH,
          fill: false,
        },
      ];
    }
    if (this.type === DepthType.scanned) {
      const range = this.effectiveScanRange;
      const xMax = this.effectiveXAxis?.max;
      const predicted: ChartLineDataset[] =
        this.predictedDepth !== undefined && range !== undefined
          ? [
              {
                label: 'predicted',
                data: [
                  {x: range, y: this.predictedDepth},
                  {x: xMax ?? range, y: this.predictedDepth},
                ],
                borderColor: c.line,
                borderWidth: LINE_WIDTH,
                borderDash: PREDICTED_DEPTH_DASH,
                borderCapStyle: 'round',
                fill: false,
              },
            ]
          : [];
      return [
        {
          label: 'scan',
          data: this.points(this.scan),
          borderColor: c.line,
          borderWidth: LINE_WIDTH,
          backgroundColor: c.band,
          fill: {value: 0},
          ...(range !== undefined
            ? {ellipseClip: {x: this.now, y: 0, rx: range, ry: range}}
            : {}),
        },
        {
          ...historySet(c.dimLine),
          borderDash: PAST_TRACK_DASH,
          borderCapStyle: 'round',
        },
        echoSet(1, c.dimBand),
        ...predicted,
      ];
    }
    return [historySet(c.line), echoSet(0, c.band)];
  }

  private get xMarker(): ChartLineXMarker | undefined {
    return this.type === DepthType.regular
      ? undefined
      : {x: this.now, datasetIndex: 0};
  }

  private get yMarker(): ChartLineYMarker | undefined {
    const depth = this.currentDepth;
    return this.hasValueLine && depth !== undefined ? {y: depth} : undefined;
  }

  private renderTopBand() {
    const type = this.showVessel
      ? DepthTopBandType.vessel
      : this.type === DepthType.prediction
        ? DepthTopBandType.labels
        : undefined;
    if (!type) return nothing;
    return html`<obc-depth-top-band
      slot="top-scale"
      .type=${type}
      .now=${this.now}
      .vesselImage=${this.vesselImage}
    ></obc-depth-top-band>`;
  }

  override render() {
    const hasSize = this._cellWidth > 0 && this._cellHeight > 0;
    const range = this._range;
    const labels =
      this.type === DepthType.regular && !this.historyHasX
        ? this.data.map((d) => d.label ?? '')
        : undefined;
    return html`
      <div class="container">
        ${hasSize
          ? html`<obc-gauge-trend
              .xAxisType=${this.xAxisType}
              .timeDisplay=${TimeDisplay.minutes}
              .xAxis=${this.effectiveXAxis}
              .labels=${labels}
              .datasets=${this.buildDatasets()}
              .minValue=${0}
              .maxValue=${range.maxDepth}
              .reverse=${true}
              .value=${this.type === DepthType.regular
                ? this.currentDepth
                : undefined}
              .hasBar=${false}
              .hasScale=${true}
              .hasLabelPadding=${false}
              .scaleType=${ScaleType.condensed}
              .primaryTickmarkInterval=${this.hasScale
                ? (this.primaryTickmarkInterval ??
                  range.primaryTickmarkInterval)
                : 0}
              .secondaryTickmarkInterval=${this.hasScale
                ? (this.secondaryTickmarkInterval ??
                  range.secondaryTickmarkInterval)
                : 0}
              .hasAdvice=${this.hasAdvice}
              .advice=${this.advice}
              .xMarker=${this.xMarker}
              .yMarker=${this.yMarker}
              .priority=${this.priority}
              .state=${this.state}
              .width=${this._cellWidth}
              .height=${this._cellHeight}
              >${this.renderTopBand()}</obc-gauge-trend
            >`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-depth': ObcDepth;
  }
}
