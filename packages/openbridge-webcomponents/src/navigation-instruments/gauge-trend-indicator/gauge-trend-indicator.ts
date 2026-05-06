import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './gauge-trend-indicator.css?inline';
import {customElement} from '../../decorator.js';

export enum ObcGaugeTrendIndicatorType {
  Fill = 'Fill',
  Point = 'Point',
}

const FRAME_X = 8;
const FRAME_Y = 8;
const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;
const FRAME_LEFT_RX = 2;
const FRAME_RIGHT_RX = 2;
const FRAME_STROKE_WIDTH = 1;
const FRAME_STROKE_INSET = FRAME_STROKE_WIDTH / 2;
const FRAME_RIGHT = FRAME_X + FRAME_WIDTH;
const FRAME_BOTTOM = FRAME_Y + FRAME_HEIGHT;
const GRAPH_WIDTH = 28;
const DIVIDER_X = FRAME_X + GRAPH_WIDTH;
const POINTER_RADIUS = 2;
const FRAME_PATH = createFramePath();

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function createFramePath() {
  const left = FRAME_X;
  const right = FRAME_X + FRAME_WIDTH;
  const top = FRAME_Y;
  const bottom = FRAME_Y + FRAME_HEIGHT;
  const innerLeft = left + FRAME_LEFT_RX;
  const innerRight = right - FRAME_RIGHT_RX;
  const topLeftY = top + FRAME_LEFT_RX;
  const topRightY = top + FRAME_RIGHT_RX;
  const bottomLeftY = bottom - FRAME_LEFT_RX;
  const bottomRightY = bottom - FRAME_RIGHT_RX;

  return [
    `M${innerLeft} ${top}`,
    `H${innerRight}`,
    `A${FRAME_RIGHT_RX} ${FRAME_RIGHT_RX} 0 0 1 ${right} ${topRightY}`,
    `V${bottomRightY}`,
    `A${FRAME_RIGHT_RX} ${FRAME_RIGHT_RX} 0 0 1 ${innerRight} ${bottom}`,
    `H${innerLeft}`,
    `A${FRAME_LEFT_RX} ${FRAME_LEFT_RX} 0 0 1 ${left} ${bottomLeftY}`,
    `V${topLeftY}`,
    `A${FRAME_LEFT_RX} ${FRAME_LEFT_RX} 0 0 1 ${innerLeft} ${top}`,
    'Z',
  ].join('');
}

/**
 * `<obc-gauge-trend-indicator>` – A compact gauge-trend indicator with fill and point variants.
 *
 * Renders a fixed 48 x 48 indicator derived from the gauge-trend instrument,
 * using a smooth trend graph, filled area, and a compact current-value cue on
 * the right edge.
 *
 * ## Features
 *
 * - **Gauge-trend scaling**: chart values use `chartMinValue`/`chartMaxValue`
 *   and fall back to `minValue`/`maxValue` like the larger trend instrument.
 * - **Current-value cue**: `value` drives the right-edge indicator and falls
 *   back to the last chart point when omitted.
 * - **Compact variants**: `Fill` renders a right-edge fill aligned to the
 *   frame border and `Point` renders a circular current-value marker.
 * - **Fixed footprint**: keeps a 48 x 48 layout suitable for instrument icons.
 *
 * ## Usage Guidelines
 *
 * - Use `type="Fill"` when the current value should read as a compact level bar.
 * - Use `type="Point"` when the current value should be highlighted by marker.
 * - Use `chartMinValue` and `chartMaxValue` when the graph should use a
 *   different range than the right-edge value indicator.
 *
 * @element obc-gauge-trend-indicator
 */
@customElement('obc-gauge-trend-indicator')
export class ObcGaugeTrendIndicator extends LitElement {
  @property({type: String})
  type: ObcGaugeTrendIndicatorType = ObcGaugeTrendIndicatorType.Fill;

  @property({type: Array})
  data: number[] = [];

  @property({type: Number})
  minValue = 0;

  @property({type: Number})
  maxValue = 100;

  @property({type: Number})
  chartMinValue?: number = undefined;

  @property({type: Number})
  chartMaxValue?: number = undefined;

  @property({type: Number})
  value?: number = undefined;

  private readonly idBase =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(16).slice(2);

  private get normalizedType(): ObcGaugeTrendIndicatorType {
    return this.type === ObcGaugeTrendIndicatorType.Point
      ? ObcGaugeTrendIndicatorType.Point
      : ObcGaugeTrendIndicatorType.Fill;
  }

  private get chartRange(): {min: number; max: number} {
    const chartMin = this.chartMinValue ?? this.minValue;
    const chartMax = this.chartMaxValue ?? this.maxValue;

    if (
      !Number.isFinite(chartMin) ||
      !Number.isFinite(chartMax) ||
      chartMin === chartMax
    ) {
      return {min: 0, max: 1};
    }

    return chartMin < chartMax
      ? {min: chartMin, max: chartMax}
      : {min: chartMax, max: chartMin};
  }

  private get valueRange(): {min: number; max: number} {
    if (
      !Number.isFinite(this.minValue) ||
      !Number.isFinite(this.maxValue) ||
      this.minValue === this.maxValue
    ) {
      return {min: 0, max: 1};
    }

    return this.minValue < this.maxValue
      ? {min: this.minValue, max: this.maxValue}
      : {min: this.maxValue, max: this.minValue};
  }

  private get lastDataValue(): number | undefined {
    const lastValue = this.data[this.data.length - 1];
    return Number.isFinite(lastValue) ? lastValue : undefined;
  }

  private get currentValue(): number {
    if (this.value !== undefined && Number.isFinite(this.value)) {
      return this.value;
    }

    if (
      this.lastDataValue !== undefined &&
      Number.isFinite(this.lastDataValue)
    ) {
      return this.lastDataValue;
    }

    return this.minValue;
  }

  private mapValueToY(
    value: number,
    range: {min: number; max: number},
    clampToRange = true
  ): number {
    const normalizedValue = clampToRange
      ? clamp(value, range.min, range.max)
      : value;
    const ratio = (normalizedValue - range.min) / (range.max - range.min || 1);

    return FRAME_Y + FRAME_HEIGHT - clamp(ratio, 0, 1) * FRAME_HEIGHT;
  }

  private get points(): Array<{x: number; y: number}> {
    if (!Array.isArray(this.data) || this.data.length === 0) {
      return [];
    }

    const range = this.chartRange;
    const graphStartX = FRAME_X;
    const graphEndX = FRAME_X + GRAPH_WIDTH;
    const step =
      this.data.length > 1
        ? (graphEndX - graphStartX) / (this.data.length - 1)
        : 0;

    return this.data.map((value, index) => ({
      x: graphStartX + step * index,
      y: this.mapValueToY(value, range),
    }));
  }

  private line(pointA: {x: number; y: number}, pointB: {x: number; y: number}) {
    const lengthX = pointB.x - pointA.x;
    const lengthY = pointB.y - pointA.y;

    return {
      length: Math.sqrt(lengthX * lengthX + lengthY * lengthY),
      angle: Math.atan2(lengthY, lengthX),
    };
  }

  private controlPoint(
    current: {x: number; y: number},
    previous?: {x: number; y: number},
    next?: {x: number; y: number},
    reverse = false
  ) {
    const p = previous ?? current;
    const n = next ?? current;
    const smoothing = 0.18;
    const line = this.line(p, n);
    const angle = line.angle + (reverse ? Math.PI : 0);
    const length = line.length * smoothing;

    return {
      x: current.x + Math.cos(angle) * length,
      y: current.y + Math.sin(angle) * length,
    };
  }

  private bezierCommand(
    point: {x: number; y: number},
    index: number,
    points: Array<{x: number; y: number}>
  ) {
    const previous = points[index - 1];
    const previousPrevious = points[index - 2];
    const next = points[index + 1];
    const start = this.controlPoint(previous ?? point, previousPrevious, point);
    const end = this.controlPoint(point, previous, next, true);

    return `C ${start.x} ${start.y}, ${end.x} ${end.y}, ${point.x} ${point.y}`;
  }

  private get linePath(): string {
    const points = this.points;
    if (points.length === 0) {
      return '';
    }

    return points.reduce((path, point, index, allPoints) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      return `${path} ${this.bezierCommand(point, index, allPoints)}`;
    }, '');
  }

  private get areaPath(): string {
    const points = this.points;
    if (points.length === 0) {
      return '';
    }

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    if (!firstPoint || !lastPoint) {
      return '';
    }

    return `${this.linePath} L ${DIVIDER_X} ${lastPoint.y} L ${DIVIDER_X} ${FRAME_BOTTOM} L ${firstPoint.x} ${FRAME_BOTTOM} Z`;
  }

  private get indicatorY(): number {
    return this.mapValueToY(this.currentValue, this.valueRange);
  }

  private createFillPath(y: number): string {
    const clampedY = clamp(y, FRAME_Y, FRAME_BOTTOM);
    const radius = FRAME_RIGHT_RX;

    if (clampedY >= FRAME_BOTTOM) {
      return '';
    }

    if (clampedY <= FRAME_Y + radius) {
      return [
        `M${DIVIDER_X} ${clampedY}`,
        `H${FRAME_RIGHT - radius}`,
        `A${radius} ${radius} 0 0 1 ${FRAME_RIGHT} ${FRAME_Y + radius}`,
        `V${FRAME_BOTTOM - radius}`,
        `A${radius} ${radius} 0 0 1 ${FRAME_RIGHT - radius} ${FRAME_BOTTOM}`,
        `H${DIVIDER_X}`,
        'Z',
      ].join('');
    }

    return [
      `M${DIVIDER_X} ${clampedY}`,
      `H${FRAME_RIGHT}`,
      `V${FRAME_BOTTOM - radius}`,
      `A${radius} ${radius} 0 0 1 ${FRAME_RIGHT - radius} ${FRAME_BOTTOM}`,
      `H${DIVIDER_X}`,
      'Z',
    ].join('');
  }

  private renderFill() {
    const path = this.createFillPath(this.indicatorY);

    return path
      ? svg`<path
          d=${path}
          class="indicator-fill"
          vector-effect="non-scaling-stroke"
        />`
      : nothing;
  }

  private createPointFillPath(y: number): string {
    const left = DIVIDER_X + FRAME_STROKE_INSET;
    const right = FRAME_RIGHT - FRAME_STROKE_INSET;
    const top = FRAME_Y + FRAME_STROKE_INSET;
    const bottom = FRAME_BOTTOM - FRAME_STROKE_INSET;
    const radius = Math.max(0, FRAME_RIGHT_RX - FRAME_STROKE_INSET);
    const clampedY = clamp(y, top, bottom);

    if (clampedY >= bottom) {
      return '';
    }

    if (clampedY <= top + radius) {
      return [
        `M${left} ${clampedY}`,
        `H${right - radius}`,
        `A${radius} ${radius} 0 0 1 ${right} ${top + radius}`,
        `V${bottom - radius}`,
        `A${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`,
        `H${left}`,
        'Z',
      ].join('');
    }

    return [
      `M${left} ${clampedY}`,
      `H${right}`,
      `V${bottom - radius}`,
      `A${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`,
      `H${left}`,
      'Z',
    ].join('');
  }

  private renderPointFill() {
    const path = this.createPointFillPath(this.indicatorY);

    return path
      ? svg`<path d=${path} class="indicator-point-fill" />`
      : nothing;
  }

  private renderPoint() {
    const y = this.indicatorY;

    return svg`
      ${this.renderPointFill()}
      <circle
        cx=${DIVIDER_X + POINTER_RADIUS}
        cy=${y}
        r=${POINTER_RADIUS}
        class="indicator-point"
      />
    `;
  }

  override render() {
    const frameClipId = `gauge-trend-indicator-frame-${this.idBase}`;
    const linePath = this.linePath;
    const areaPath = this.areaPath;
    const type = this.normalizedType;

    return html`
      <svg
        class="indicator"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id=${frameClipId} clipPathUnits="userSpaceOnUse">
            <path d=${FRAME_PATH} />
          </clipPath>
        </defs>

        <path
          d=${FRAME_PATH}
          class="frame-fill"
          vector-effect="non-scaling-stroke"
        />

        ${type === ObcGaugeTrendIndicatorType.Point && areaPath
          ? svg`<path
              d=${areaPath}
              class="area"
              clip-path="url(#${frameClipId})"
            />`
          : nothing}
        ${linePath
          ? svg`<path
              d=${linePath}
              class="line"
              clip-path="url(#${frameClipId})"
              vector-effect="non-scaling-stroke"
            />`
          : nothing}
        <path
          d="M${DIVIDER_X} ${FRAME_Y}V${FRAME_Y + FRAME_HEIGHT}"
          class="divider"
          vector-effect="non-scaling-stroke"
        />
        ${type === ObcGaugeTrendIndicatorType.Fill
          ? this.renderFill()
          : this.renderPoint()}

        <path
          d=${FRAME_PATH}
          class="frame-stroke"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-trend-indicator': ObcGaugeTrendIndicator;
  }
}
