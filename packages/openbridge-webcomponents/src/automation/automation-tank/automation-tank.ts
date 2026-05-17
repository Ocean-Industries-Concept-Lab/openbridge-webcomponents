import {HTMLTemplateResult, LitElement, html, svg, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './automation-tank.css?inline';
import {LineMedium} from '../index.js';

import '../../icons/icon-chevron-double-up-google.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-double-down-google.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-off.js';
import '../../icons/icon-tank.js';
import '../../navigation-instruments/gauge-trend/gauge-trend.js';
import '../../building-blocks/bar-vertical/bar-vertical.js';
import type {ChartLineDataItem} from '../../building-blocks/chart-line/chart-line-base.js';
import type {LinearAdvice} from '../../building-blocks/instrument-linear/advice.js';
import {
  AdvicePosition,
  ExternalScaleSide,
  FillMode,
} from '../../building-blocks/external-scale/external-scale.js';
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

export enum TankChartMode {
  /** Static fill bar driven by `value` / `max` (default, backward compatible). */
  bar = 'bar',
  /** Embedded `obc-gauge-trend` line/area chart, no side bar. */
  graph = 'graph',
  /** Embedded `obc-gauge-trend` line/area chart with a side bar. */
  graphAndBar = 'graph-and-bar',
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
  @property({type: String, reflect: true}) type: TankType = TankType.generic;
  @property({type: String, reflect: true}) orientation: TankOrientation =
    TankOrientation.vertical;
  @property({type: Boolean, reflect: true}) compact: boolean = false;
  /**
   * Static (display-only) variant. Always rendered at the compact size; the
   * inner chart/bar is hidden, the bordered area is filled with
   * `--container-section-color`, and the readout is centered inside the frame.
   * Tag is rendered below the bordered area; badges (when slotted) sit above
   * the frame inside the halo and shrink the frame just like in compact mode.
   * Overrides `compact` (a static tank is always compact-sized).
   *
   * Static tanks render as a non-interactive `<div role="img">` (not a
   * `<button>`), so they are not in the tab order and do not announce as
   * activatable controls.
   */
  @property({type: Boolean, reflect: true}) static: boolean = false;
  @property({type: String}) tag: string = '';

  /**
   * Chart cell rendering mode.
   * - `bar`: static fill bar driven by `value`/`max` (default).
   * - `graph`: embedded `obc-gauge-trend` line/area chart.
   * - `graphAndBar`: embedded `obc-gauge-trend` with an integrated side bar.
   */
  @property({type: String, reflect: true, attribute: 'chart-mode'})
  chartMode: TankChartMode = TankChartMode.bar;

  /** Time-series data points for the embedded gauge-trend (graph modes only). */
  @property({type: Array, attribute: false})
  chartData: ChartLineDataItem[] = [];

  /**
   * Advice overlays. Forwarded to the embedded `obc-gauge-trend` in
   * `graph` / `graph-and-bar` modes, or rendered as pills over the static
   * bar in `bar` mode.
   */
  @property({type: Array, attribute: false})
  advice: LinearAdvice[] = [];

  /** Show advice overlays (works in all `chartMode` variants). */
  @property({type: Boolean}) hasAdvice = false;

  /**
   * Overlay a 32×32 decorative icon (currently `<obi-tank>`) centered on the
   * chart cell. Works in all three `chartMode` variants (bar, graph,
   * graph-and-bar) and in both orientations. The icon is rendered above the
   * bar/graph in a fixed CSS layer (does not scale with the SVG meet
   * transform) and is silhouetted with a `--border-silhouette-color` halo so
   * it stays legible on any underlying fill. The icon size scales with the
   * ambient `obc-component-size-*` class on an ancestor (32 → 40 → 48 → 56
   * for regular → medium → large → xl).
   *
   * TODO(future): replace the hard-coded `<obi-tank>` with a `slot="graph-icon"`
   * so consumers can pass any `<obi-*>` icon. The current API ships the
   * smallest viable surface; the slot can be added without breaking the
   * boolean property.
   */
  @property({type: Boolean, attribute: false}) hasGraphIcon = false;

  @state() private _cellWidth = 0;
  @state() private _cellHeight = 0;
  private _chartResizeObserver?: ResizeObserver;
  private _observedCell?: Element;

  private get isCompact(): boolean {
    return this.compact || this.static;
  }

  private get _usesGaugeTrend(): boolean {
    return (
      this.chartMode === TankChartMode.graph ||
      this.chartMode === TankChartMode.graphAndBar
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._chartResizeObserver?.disconnect();
    this._chartResizeObserver = undefined;
    this._observedCell = undefined;
  }

  protected override updated(
    changed: Map<string | number | symbol, unknown>
  ): void {
    super.updated(changed);
    // The chart cell DOM element is recreated when chartMode toggles between
    // bar and graph modes (different class/contents), and may also appear/
    // disappear with static/compact. Re-attach the observer to the current
    // .bar-container instance.
    this._syncChartResizeObserver();
  }

  private _syncChartResizeObserver(): void {
    // Observe the bar-container in BOTH bar mode and graph modes — the bar
    // mode now renders an SVG `obc-bar-vertical` / `-horizontal` that needs
    // measured pixel dimensions for its viewBox and barThickness.
    const cell = this.renderRoot.querySelector('.bar-container');
    if (!cell) {
      if (this._chartResizeObserver) {
        this._chartResizeObserver.disconnect();
        this._observedCell = undefined;
      }
      return;
    }
    if (cell === this._observedCell) return;

    if (!this._chartResizeObserver) {
      this._chartResizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const w = Math.round(entry.contentRect.width);
        const h = Math.round(entry.contentRect.height);
        if (w !== this._cellWidth) this._cellWidth = w;
        if (h !== this._cellHeight) this._cellHeight = h;
      });
    } else {
      this._chartResizeObserver.disconnect();
    }
    this._chartResizeObserver.observe(cell);
    this._observedCell = cell;
  }

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
   * Figma 248x14 path; corners stay 12px wide while the middle arc stretches.
   * Position (start vs end) and orientation flipping are handled in CSS.
   *
   * Horizontal orientation reuses the same path data but rotates each piece
   * via an inner `<g transform="translate(0 H) rotate(-90)">`, mapping the
   * source coord (x, y) to (y, H - x). The viewBox is swapped accordingly:
   *  corner: 12x14 -> 14x12      (H=12)
   *  middle: 224x14 -> 14x224    (H=224)
   * Cap-end (right side in horizontal) is mirrored via CSS scaleX(-1).
   */
  private renderAtmosphericCap(side: 'start' | 'end'): HTMLTemplateResult {
    const isHorizontal = this.orientation === TankOrientation.horizontal;

    // Path data. Two variants — regular (14px tall, 12px corners) and compact
    // (10px tall, 7px corners). Curve Y-values are proportionally scaled from
    // the original 18/12-tall Figma reference so the corner curves stay
    // continuous at the new thickness.
    // Horizontal orientation reuses the same vertical path data inside an
    // inner `<g transform="translate(0 H) rotate(-90)">`; the SVG viewBox is
    // swapped accordingly. Cap-end is mirrored via CSS scaleY/scaleX(-1).
    let cornerStartFill: string;
    let cornerStartStroke: string;
    let midFill: string;
    let midStroke: string;
    let cornerEndFill: string;
    let cornerEndStroke: string;
    let cornerW: number;
    let capH: number;
    let midW: number;

    if (this.isCompact) {
      cornerW = 7;
      capH = 10;
      midW = 149;
      cornerStartFill =
        'M 6.374 4.8214 C 6.138 4.8429, 6.005 4.8543, 5.83 4.8771 C 2.937 5.2557, 0.669 7.0957, 0.51 9.1936 C 0.5 9.3214, 0.5 9.4357, 0.5 9.6429 L 0.5 10 L 6.374 10 Z';
      cornerStartStroke =
        'M 6.374 4.8214 C 6.138 4.8429, 6.005 4.8543, 5.83 4.8771 C 2.937 5.2557, 0.669 7.0957, 0.51 9.1936 C 0.5 9.3214, 0.5 9.4357, 0.5 9.6429 L 0.5 10';
      midFill =
        'M 0 4.8214 C 10.97 3.8214, 37.83 1.7857, 74.626 1.7857 C 111.42 1.7857, 138.28 3.8214, 149.252 4.8214 L 149.252 10 L 0 10 Z';
      midStroke =
        'M 0 4.8214 C 10.97 3.8214, 37.83 1.7857, 74.626 1.7857 C 111.42 1.7857, 138.28 3.8214, 149.252 4.8214';
      cornerEndFill =
        'M 0 4.8214 C 0.236 4.8429, 0.369 4.8543, 0.544 4.8771 C 3.437 5.2557, 5.705 7.0957, 5.864 9.1936 C 5.874 9.3214, 5.874 9.4357, 5.874 9.6429 L 5.874 10 L 0 10 Z';
      cornerEndStroke =
        'M 0 4.8214 C 0.236 4.8429, 0.369 4.8543, 0.544 4.8771 C 3.437 5.2557, 5.705 7.0957, 5.864 9.1936 C 5.874 9.3214, 5.874 9.4357, 5.874 9.6429 L 5.874 10';
    } else {
      cornerW = 12;
      capH = 14;
      midW = 224;
      cornerStartFill =
        'M 12 6.5837 C 6.346 6.7737, 5.176 6.8744, 4.168 7.2537 C 2.6445 7.8272, 1.418 8.8983, 0.8613 10.1415 C 0.493 10.9641, 0.5 11.9099, 0.5 13.6111 L 0.5 14 L 12 14 Z';
      cornerStartStroke =
        'M 12 6.5837 C 6.346 6.7737, 5.176 6.8744, 4.168 7.2537 C 2.6445 7.8272, 1.418 8.8983, 0.8613 10.1415 C 0.493 10.9641, 0.5 11.9099, 0.5 13.6111 L 0.5 14';
      midFill =
        'M 0 6.5837 C 16 5.1124, 56 1.9444, 112 1.9444 C 168 1.9444, 208 5.1124, 224 6.5837 L 224 14 L 0 14 Z';
      midStroke =
        'M 0 6.5837 C 16 5.1124, 56 1.9444, 112 1.9444 C 168 1.9444, 208 5.1124, 224 6.5837';
      cornerEndFill =
        'M 0 6.5837 C 5.654 6.7737, 6.824 6.8744, 7.832 7.2537 C 9.3555 7.8272, 10.582 8.8983, 11.1387 10.1415 C 11.507 10.9641, 11.5 11.9099, 11.5 13.6111 L 11.5 14 L 0 14 Z';
      cornerEndStroke =
        'M 0 6.5837 C 5.654 6.7737, 6.824 6.8744, 7.832 7.2537 C 9.3555 7.8272, 10.582 8.8983, 11.1387 10.1415 C 11.507 10.9641, 11.5 11.9099, 11.5 13.6111 L 11.5 14';
    }

    if (isHorizontal) {
      // Rotate vertical paths -90deg into a `capH`-wide column. Source coord
      // (x, y) maps to (y, cornerW - x) for corners and (y, midW - x) for mid.
      return html`
        <div class="cap cap-atmospheric cap-${side}">
          <svg
            class="cap-corner cap-corner-start"
            viewBox="0 0 ${capH} ${cornerW}"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 ${cornerW}) rotate(-90)">
                <path class="cap-fill" d="${cornerStartFill}" />
                <path class="cap-stroke" fill="none" d="${cornerStartStroke}" />
              </g>
            `}
          </svg>
          <svg
            class="cap-mid"
            viewBox="0 0 ${capH} ${midW}"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 ${midW}) rotate(-90)">
                <path class="cap-fill" d="${midFill}" />
                <path class="cap-stroke" fill="none" vector-effect="non-scaling-stroke" d="${midStroke}" />
              </g>
            `}
          </svg>
          <svg
            class="cap-corner cap-corner-end"
            viewBox="0 0 ${capH} ${cornerW}"
            preserveAspectRatio="xMidYMin meet"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 ${cornerW}) rotate(-90)">
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
          viewBox="0 0 ${cornerW} ${capH}"
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
          viewBox="0 0 ${midW} ${capH}"
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
          viewBox="0 0 ${cornerW} ${capH}"
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
    const safeMax = this.max > 0 ? this.max : 1;
    const percent = Math.max(0, Math.min(100, (this.value / safeMax) * 100));
    const isCompact = this.isCompact;

    const badgesCell = html`
      <div class="badges"><slot name="badges"></slot></div>
    `;
    const tagCell = html`
      <div class="tag"><slot name="tag">${this.tag}</slot></div>
    `;
    const readoutCell = isCompact
      ? html`
          <div class="readout readout-compact">
            <slot name="readout">
              ${this.trendIcon()}
              <span class="percent"
                >${percent.toFixed(0)}<span class="percent-symbol"
                  >%</span
                ></span
              >
            </slot>
          </div>
        `
      : html`
          <div class="readout">
            <slot name="readout">
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
            </slot>
          </div>
        `;
    // Decorative icon overlay (centered on the chart cell). Two stacked
    // `<obi-tank>` elements: the back layer paints an inherited SVG `stroke`
    // halo (the icon's paths use `fill="currentColor"`, and SVG `stroke` is
    // inherited across the icon's shadow DOM); the front layer paints the
    // colored fill via the `color` property. This mirrors the established
    // silhouette pattern used by `obc-automation-button` (back-layer slot
    // with stroke, front-layer slot with fill).
    const graphIconOverlay = html`
      <div class="graph-icon" aria-hidden="true">
        <obi-tank class="graph-icon-stroke"></obi-tank>
        <obi-tank class="graph-icon-fill"></obi-tank>
      </div>
    `;
    let chartCell: HTMLTemplateResult;
    if (this._usesGaugeTrend) {
      // Forward the measured cell size as the gauge-trend's width/height,
      // which it interprets as an aspect-ratio reference. Its internal
      // ResizeObserver then picks up its own wrapper's clientWidth (= cell
      // width, since we set style width:100%) and computes height from the
      // aspect ratio — so the chart matches the cell exactly. We delay
      // rendering until both dimensions are measured to avoid a divide-by-
      // zero in the aspect-ratio math on first paint.
      const hasSize = this._cellWidth > 0 && this._cellHeight > 0;
      chartCell = html`
        <div class="bar-container chart-cell">
          ${hasSize
            ? html`<obc-gauge-trend
                .data=${this.chartData}
                .minValue=${0}
                .maxValue=${safeMax}
                .value=${this.value}
                .hasBar=${this.chartMode === TankChartMode.graphAndBar}
                .hasScale=${false}
                .hasLabelPadding=${false}
                .chartFill=${true}
                .hasAdvice=${this.hasAdvice}
                .advice=${this.advice}
                .width=${this._cellWidth}
                .height=${this._cellHeight}
                style="width: 100%; height: 100%;"
              ></obc-gauge-trend>`
            : null}
          ${this.hasGraphIcon ? graphIconOverlay : null}
        </div>
      `;
    } else {
      // Bar mode: render the shared SVG bar (`obc-bar-vertical` /
      // `-horizontal`) — the same renderer used by gauge-trend's side bar —
      // so advice overlays work the same way across all three chart modes.
      //
      // TODO(refactor): once `obc-gauge-trend` supports a bar-only layout at
      // this size (no chart-line area), migrate this branch to gauge-trend
      // too so all three chart modes share a single implementation.
      //
      // TODO(theming): the bar fill currently uses the standard instrument
      // palette (`--instrument-regular-tertiary-color` for tint mode). The
      // legacy CSS bar used per-medium colors (e.g. `--automation-medium-fuel`).
      // Extend `external-scale.ts` (and the bar-vertical/-horizontal wrappers)
      // to accept a medium / fuel color so the tank can restore its
      // per-`medium` coloring through the shared renderer.
      const hasSize = this._cellWidth > 0 && this._cellHeight > 0;
      // The inner bar always renders vertically, regardless of the tank's
      // outer `orientation`. Only the tank's outer wrapper flips; its inner
      // chart cell stays portrait. This matches gauge-trend behavior.
      //
      // Match gauge-trend's proportional sizing so advice pills (and other
      // fixed-pixel SVG primitives) render at the same on-screen size in
      // every chart mode. We mirror gauge-trend's defaults exactly:
      // `fixedAspectRatio=true` + `scaleReferenceSize=384`. The bar SVG is
      // then built in a 384-unit-tall viewBox and shrunk into the cell via
      // `xMidYMid meet`, giving on-screen scale = cellHeight / 384.
      //
      // Because the meet transform scales the viewBox uniformly, we must
      // also size `barThickness` in viewBox units (not cell pixels) so the
      // bar still fills the cell width after scaling. We pick the viewBox
      // cross-axis size so width-fit and height-fit ratios match exactly
      // (no horizontal gutters): viewBoxCross = cellWidth * 384 / cellHeight.
      const SCALE_REFERENCE_SIZE = 384;
      const adviceReserveVb = this.hasAdvice ? 16 : 0;
      const safeCellHeight = Math.max(1, this._cellHeight);
      const viewBoxCross =
        (this._cellWidth * SCALE_REFERENCE_SIZE) / safeCellHeight;
      const barThickness = Math.max(0, viewBoxCross - adviceReserveVb);
      // `tint` is locked in for tank bar mode: it draws a fill from 0 to
      // value plus a small marker at the value position, which mirrors the
      // legacy CSS bar's "fill + top border at value" visual idiom.
      const barWrapper = html`<obc-bar-vertical
        .minValue=${0}
        .maxValue=${safeMax}
        .value=${this.value}
        .height=${this._cellHeight}
        .fixedAspectRatio=${true}
        .scaleReferenceSize=${SCALE_REFERENCE_SIZE}
        .paddingTop=${0}
        .paddingBottom=${0}
        .side=${ExternalScaleSide.right}
        .hasBar=${true}
        .hasScale=${false}
        .showLabels=${false}
        .barThickness=${barThickness}
        .fillMode=${FillMode.tint}
        .instrumentMode=${true}
        .borderRadius=${2}
        .advices=${this.hasAdvice ? this.advice : []}
        .advicePosition=${AdvicePosition.inner}
        style="width: 100%; height: 100%;"
      ></obc-bar-vertical>`;
      chartCell = html`
        <div class="bar-container bar-cell">
          ${hasSize ? barWrapper : null}
          ${this.hasGraphIcon ? graphIconOverlay : null}
        </div>
      `;
    }

    const frameClasses = classMap({
      'tank-frame': true,
      [`type-${this.type}`]: true,
      [`orientation-${this.orientation}`]: true,
      [this.medium]: true,
      compact: isCompact,
      static: this.static,
    });

    let middleContents: HTMLTemplateResult;
    if (this.static) {
      middleContents = html`<div class="static-readout">${readoutCell}</div>`;
    } else if (this.compact) {
      middleContents = chartCell;
    } else {
      middleContents = html`<div class="grid">
        ${tagCell}${badgesCell}${readoutCell}${chartCell}
      </div>`;
    }

    const tankFrame = html`
      <div class=${frameClasses} style="--percent: ${percent / 100}">
        ${this.renderCap('start')}
        <div class="middle">${middleContents}</div>
        ${this.renderCap('end')}
      </div>
    `;

    // Whole component is one interactive element. The halo (flat-mixin
    // border/background that appears on hover/pressed/focus) is painted on
    // the inner `.halo` wrapper via `visibleWrapperClass`, so it surrounds
    // only the bordered area:
    //   - non-compact: just the tank-frame
    //   - compact: badges + tank-frame (readout & tag fall OUTSIDE the halo,
    //     below it, growing the host height)
    const halo = html`
      <div class="halo">
        ${isCompact ? html`${badgesCell}${tankFrame}` : tankFrame}
      </div>
    `;

    let belowHalo: HTMLTemplateResult | null = null;
    if (this.static) {
      // Static: readout is centered inside the frame; only the tag goes below.
      belowHalo = tagCell;
    } else if (this.compact) {
      belowHalo = html`${readoutCell}${tagCell}`;
    }

    return html`
      ${this.static
        ? html`<div class="root" role="img" aria-label=${this.tag || 'Tank'}>
            ${halo}${belowHalo}
          </div>`
        : html`<button
            class="root"
            type="button"
            aria-label=${this.tag || 'Tank'}
          >
            ${halo}${belowHalo}
          </button>`}
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-tank': ObcAutomationTank;
  }
}
