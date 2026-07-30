import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import compentStyle from './indicator-graph.css?inline';
import uPlot from 'uplot';
import {customElement} from '../../decorator.js';

export enum ObcIndicatorGraphSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum ObcIndicatorGraphPriority {
  regular = 'regular',
  enhanced = 'enhanced',
}

// showZeroLine is defaulted to true
export interface ObcIndicatorGraphLayout {
  size?: ObcIndicatorGraphSize;
  priority?: ObcIndicatorGraphPriority;
  y?: {min?: number; max?: number; showZeroLine?: boolean};
}

/**
 * @element obc-indicator-graph
 * @description A mini graph component
 *
 * @beta
 */
@customElement('obc-indicator-graph')
export class ObcIndicatorGraph extends LitElement {
  /** The data to display in the graph, first array is the x values, second array is the y values */
  @property({type: Array})
  data: [number[], number[]] = [[], []];

  @property({type: Object})
  layout: ObcIndicatorGraphLayout = {};

  @query('#chart')
  private chart!: HTMLDivElement;

  @state()
  private y: number | undefined = undefined;

  @state()
  private zeroLineY: number | undefined = undefined;

  private uplot: uPlot | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private getCssColor(name: string) {
    const color = getComputedStyle(this).getPropertyValue(name).trim();
    return color;
  }

  override firstUpdated() {
    const opts = {
      width: this.chart.clientWidth,
      height: this.chart.clientHeight,
      scales: {
        x: {time: false, show: false},
        y: {
          auto: true,
          show: false,
          range: this._range.bind(this),
        },
      },
      series: [
        {},
        {
          stroke: this._getStrokeColor(),
          width: this._getStrokeWidth(),
          points: {show: false},
        },
      ],
      axes: [
        {show: false},
        {ticks: {show: false}, show: false, grid: {show: false}},
      ],
      legend: {show: false},
      cursor: {show: false},
    };

    this.uplot = new uPlot(opts, this.data, this.chart);
    requestAnimationFrame(() => this.updateY());

    this.resizeObserver = new ResizeObserver(() => this.updateSize());
    this.resizeObserver.observe(this.chart);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.uplot?.destroy();
    this.uplot = null;
  }

  private updateSize() {
    if (!this.uplot) {
      return;
    }
    this.uplot.setSize({
      width: this.chart.clientWidth,
      height: this.chart.clientHeight,
    });
    this.updateY();
  }

  private _range(
    _self: uPlot,
    initMin: number,
    initMax: number,
    _scaleKey: string
  ): [number, number] {
    const {min: minY, max: maxY} = this.layout.y ?? {};
    const range = maxY ?? initMax - (minY ?? initMin);
    let min = minY ?? initMin - range * 0.1;
    if (minY === undefined && this.layout.y?.showZeroLine !== false) {
      min = Math.min(0, min);
    }
    return [min, maxY ?? initMax + range * 0.1] as [number, number];
  }

  private get _effectiveSize() {
    return this.layout.size ?? ObcIndicatorGraphSize.medium;
  }

  private get _effectivePriority() {
    return this.layout.priority ?? ObcIndicatorGraphPriority.regular;
  }

  private _getStrokeWidth() {
    switch (this._effectiveSize) {
      case ObcIndicatorGraphSize.small:
        return 1;
      case ObcIndicatorGraphSize.medium:
        return 1.5;
      case ObcIndicatorGraphSize.large:
        return 2;
    }
  }

  private _getStrokeColor() {
    switch (this._effectivePriority) {
      case ObcIndicatorGraphPriority.regular:
        return this.getCssColor('--element-neutral-color');
      case ObcIndicatorGraphPriority.enhanced:
        return this.getCssColor('--element-neutral-enhanced-color');
    }
  }

  updatePalette() {
    if (!this.uplot) {
      return;
    }
    const series = this.uplot.series[1];
    series.stroke = () => this._getStrokeColor();
    series.width = this._getStrokeWidth();
    this.uplot.redraw();
  }

  private updateY() {
    if (!this.uplot) {
      return;
    }
    const lastY = this.data[1][this.data[1].length - 1];
    // @ts-expect-error - valToPct is not a property of the Scale interface
    const yRatio = this.uplot.scales.y.valToPct(lastY);
    if (yRatio < 0 || yRatio > 1) {
      this.y = undefined;
    } else {
      this.y = yRatio * this.chart.clientHeight;
    }
    this.updateZeroLine();
  }

  private updateZeroLine() {
    if (!this.uplot) {
      return;
    }
    // @ts-expect-error - valToPct is not a property of the Scale interface
    const yRatio = this.uplot.scales.y.valToPct(0);
    if (yRatio < 0 || yRatio > 1) {
      this.zeroLineY = undefined;
      return;
    }
    this.zeroLineY = yRatio * this.chart.clientHeight;
  }

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('data') || changedProperties.has('layout')) {
      this.updatePalette();
      this.uplot?.setData(this.data);
      requestAnimationFrame(() => this.updateY());
    }
  }

  override render() {
    return html`
      <div
        class="chart-container ${this._effectivePriority} ${this
          ._effectiveSize}"
      >
        <div id="chart"></div>
        <div
          id="zero-line"
          style="transform: translateY(${-(this.zeroLineY ?? 0)}px);
          display: ${this.zeroLineY !== undefined ? 'block' : 'none'};
          "
        ></div>
        <div
          id="dot"
          style="transform: translateY(${-(this.y ?? 0)}px);
          display: ${this.y !== undefined ? 'block' : 'none'};
          "
        ></div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-indicator-graph': ObcIndicatorGraph;
  }
}
