import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './rudder-indicator.css?inline';

export enum RudderIndicatorState {
  InCommand = 'in-command',
  NotInCommand = 'not-in-command',
  Off = 'off',
}

const VIEW_SIZE = 48;
const FRAME_PATH =
  'M34.4002 0.5C35.5047 0.5 36.4117 1.39828 36.2892 2.49604C35.8386 6.53556 34.0299 10.3261 31.1281 13.2279C27.7524 16.6036 23.1741 18.5 18.4002 18.5C13.6263 18.5 9.04789 16.6036 5.67224 13.2279C2.77043 10.3261 0.961718 6.53556 0.511107 2.49604C0.388651 1.39828 1.29559 0.500003 2.40016 0.500002L34.4002 0.5Z';
const FRAME_X = 5.5;
const FRAME_Y = 15;
const FRAME_CENTER_X = 18.4002;
const FRAME_TOP_Y = 0.5;

interface Point {
  x: number;
  y: number;
}

type Cubic = readonly [Point, Point, Point, Point];

const SILHOUETTE_OFFSET = 1.7;
const SILHOUETTE_BOTTOM_GAP = 6;
const SILHOUETTE_CURVE_STEPS = 16;
const FRAME_CURVE: readonly Cubic[] = [
  [
    {x: 34.4002, y: 0.5},
    {x: 35.5047, y: 0.5},
    {x: 36.4117, y: 1.39828},
    {x: 36.2892, y: 2.49604},
  ],
  [
    {x: 36.2892, y: 2.49604},
    {x: 35.8386, y: 6.53556},
    {x: 34.0299, y: 10.3261},
    {x: 31.1281, y: 13.2279},
  ],
  [
    {x: 31.1281, y: 13.2279},
    {x: 27.7524, y: 16.6036},
    {x: 23.1741, y: 18.5},
    {x: FRAME_CENTER_X, y: 18.5},
  ],
  [
    {x: FRAME_CENTER_X, y: 18.5},
    {x: 13.6263, y: 18.5},
    {x: 9.04789, y: 16.6036},
    {x: 5.67224, y: 13.2279},
  ],
  [
    {x: 5.67224, y: 13.2279},
    {x: 2.77043, y: 10.3261},
    {x: 0.961718, y: 6.53556},
    {x: 0.511107, y: 2.49604},
  ],
  [
    {x: 0.511107, y: 2.49604},
    {x: 0.388651, y: 1.39828},
    {x: 1.29559, y: 0.500003},
    {x: 2.40016, y: 0.500002},
  ],
];

const BASE_CENTER_LINE_PATH = 'M1 0V18';
const BASE_CENTER_LINE_X = 23;
const BASE_CENTER_LINE_Y = 15;
const NEEDLE_PIVOT_X = BASE_CENTER_LINE_X + 1;
const NEEDLE_PIVOT_Y = BASE_CENTER_LINE_Y + 1;
const ACTIVE_SECTOR_RADIUS = 13.1;

const ARROW_PATH = 'M-3 -1A3 3 0 0 1 3 -1L0.6 12.565Q0 13.35 -0.6 12.565Z';
const INPUT_LINEAR_PATH =
  'M4 0.6L7.37 6.17C7.89 7.04 7.26 8 6.24 8H1.76C0.74 8 0.11 7.04 0.63 6.17Z';
const INPUT_LINEAR_VIEWBOX_SIZE = 8;
const INPUT_LINEAR_WIDTH = 7;
const INPUT_LINEAR_HEIGHT = 7;
const INPUT_LINEAR_HALF_WIDTH = INPUT_LINEAR_WIDTH / 2;
const INPUT_LINEAR_HALF_HEIGHT = INPUT_LINEAR_HEIGHT / 2;
const INPUT_LINEAR_SCALE_X = INPUT_LINEAR_WIDTH / INPUT_LINEAR_VIEWBOX_SIZE;
const INPUT_LINEAR_SCALE_Y = INPUT_LINEAR_HEIGHT / INPUT_LINEAR_VIEWBOX_SIZE;
const INPUT_LINEAR_ARC_CENTER_X = NEEDLE_PIVOT_X;
const INPUT_LINEAR_ARC_CENTER_Y = NEEDLE_PIVOT_Y;
const INPUT_LINEAR_ARC_RADIUS = 15;
const INPUT_LINEAR_ANGLE_OFFSET = 0;
const INPUT_LINEAR_RADIAL_OFFSET = 0.6;
const INPUT_LINEAR_TANGENTIAL_OFFSET = 0;
const ACTIVE_CENTER_LINE_PATH =
  'M0 18.973V1.19209e-07L2 0V18.973C1.66785 18.9909 1.33443 19 1.00009 19C0.665681 19 0.33221 18.9909 0 18.973Z';
const ACTIVE_CENTER_LINE_X = 23;
const ACTIVE_CENTER_LINE_Y = 15;

let nextFrameClipId = 0;

function cubicPoint(curve: Cubic, t: number): Point {
  const [p0, p1, p2, p3] = curve;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;

  return {
    x:
      mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x,
    y:
      mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y,
  };
}

function cubicDerivative(curve: Cubic, t: number): Point {
  const [p0, p1, p2, p3] = curve;
  const mt = 1 - t;

  return {
    x:
      3 * mt * mt * (p1.x - p0.x) +
      6 * mt * t * (p2.x - p1.x) +
      3 * t * t * (p3.x - p2.x),
    y:
      3 * mt * mt * (p1.y - p0.y) +
      6 * mt * t * (p2.y - p1.y) +
      3 * t * t * (p3.y - p2.y),
  };
}

function offsetCurvePoint(curve: Cubic, t: number): Point {
  const point = cubicPoint(curve, t);
  const derivative = cubicDerivative(curve, t);
  const length = Math.hypot(derivative.x, derivative.y);

  return {
    x: point.x + (derivative.y / length) * SILHOUETTE_OFFSET,
    y: point.y - (derivative.x / length) * SILHOUETTE_OFFSET,
  };
}

function interpolateAtX(start: Point, end: Point, x: number): Point {
  const ratio = (x - start.x) / (end.x - start.x);

  return {
    x,
    y: start.y + (end.y - start.y) * ratio,
  };
}

function formatPathNumber(value: number): string {
  return Number(value.toFixed(3)).toString();
}

function pointsToPath(points: readonly Point[]): string {
  const [start, ...rest] = points;
  const path = [`M${formatPathNumber(start.x)} ${formatPathNumber(start.y)}`];

  for (const point of rest) {
    path.push(`L${formatPathNumber(point.x)} ${formatPathNumber(point.y)}`);
  }

  return path.join('');
}

function createSilhouettePaths(): readonly [string, string] {
  const points: Point[] = [];

  for (const curve of FRAME_CURVE) {
    for (let step = 0; step <= SILHOUETTE_CURVE_STEPS; step += 1) {
      if (points.length > 0 && step === 0) {
        continue;
      }

      points.push(offsetCurvePoint(curve, step / SILHOUETTE_CURVE_STEPS));
    }
  }

  const leftThreshold = FRAME_CENTER_X - SILHOUETTE_BOTTOM_GAP / 2;
  const rightThreshold = FRAME_CENTER_X + SILHOUETTE_BOTTOM_GAP / 2;
  const rightPoints: Point[] = [];
  const leftPoints: Point[] = [];

  for (let index = 0; index < points.length - 1; index += 1) {
    const point = points[index];
    const nextPoint = points[index + 1];

    if (point.x >= rightThreshold) {
      rightPoints.push(point);
    }

    if (point.x > rightThreshold && nextPoint.x <= rightThreshold) {
      rightPoints.push(interpolateAtX(point, nextPoint, rightThreshold));
    }

    if (point.x > leftThreshold && nextPoint.x <= leftThreshold) {
      leftPoints.push(interpolateAtX(point, nextPoint, leftThreshold));
    }

    if (point.x <= leftThreshold) {
      leftPoints.push(point);
    }
  }

  leftPoints.push(points[points.length - 1]);

  return [pointsToPath(leftPoints), pointsToPath(rightPoints)];
}

const SILHOUETTE_PATHS = createSilhouettePaths();

function clampAngle(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(-90, Math.min(90, value));
}

function pointOnArc(
  angleDeg: number,
  radius: number,
  centerX: number,
  centerY: number
): {x: number; y: number} {
  // Keep the same angular convention as `obc-rudder`:
  // 0° = bottom, +90° = right, -90° = left.
  const radians = (angleDeg * Math.PI) / 180;
  return {
    x: centerX + Math.sin(radians) * radius,
    y: centerY + Math.cos(radians) * radius,
  };
}

/**
 * `<obc-rudder-indicator>` – Compact rudder status indicator with current angle and setpoint.
 *
 * Renders a fixed **48×48** rudder cue with a framed half-bowl, a current rudder
 * marker, and a setpoint input marker. The component is intended as a compact
 * status indicator derived from the larger `obc-rudder` presentation.
 *
 * ## Features
 *
 * - **Inputs:** `angle` and `setpoint` are clamped to **-90…90**; `angle` drives the
 *   teardrop needle on the arc.
 * - **States:** `in-command`, `not-in-command`, and `off` control the color and
 *   visibility of the active layers.
 * - **Optional silhouette:** `hasSilhouette` adds a silhouette stroke behind the
 *   frame.
 *
 * ## Usage Guidelines
 *
 * Use when the UI needs a compact rudder cue next to readouts or controls. Use
 * `obc-rudder` when the full semicircular scale, labels, and watch-based
 * setpoint treatment are required.
 */
@customElement('obc-rudder-indicator')
export class ObcRudderIndicator extends LitElement {
  private readonly frameClipId = `obc-rudder-indicator-frame-clip-${nextFrameClipId++}`;
  private readonly silhouetteClipId = `obc-rudder-indicator-silhouette-clip-${nextFrameClipId++}`;

  @property({type: Number}) angle = 0;

  @property({type: Number}) setpoint = 0;

  @property({type: String}) state: RudderIndicatorState =
    RudderIndicatorState.InCommand;

  @property({type: Boolean}) hasSilhouette = false;

  static override styles = unsafeCSS(componentStyle);

  private get isActive(): boolean {
    return this.state !== RudderIndicatorState.Off;
  }

  private get isInCommand(): boolean {
    return this.state === RudderIndicatorState.InCommand;
  }

  private get activeColor(): string {
    if (this.state === RudderIndicatorState.Off) {
      return 'var(--instrument-frame-tertiary-color)';
    }

    return this.isInCommand
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get activeTrackColor(): string {
    if (this.state === RudderIndicatorState.Off) {
      return 'var(--instrument-frame-tertiary-color)';
    }

    return this.isInCommand
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private renderSilhouette() {
    if (!this.hasSilhouette || this.state === RudderIndicatorState.Off) {
      return nothing;
    }

    return svg`
      <g clip-path="url(#${this.silhouetteClipId})">
        ${SILHOUETTE_PATHS.map(
          (path) => svg`
            <path
              d="${path}"
              transform="translate(${FRAME_X} ${FRAME_Y})"
              fill="none"
              stroke="var(--instrument-frame-tertiary-color)"
              stroke-width="0.5"
              vector-effect="non-scaling-stroke"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          `
        )}
      </g>
    `;
  }

  private renderBaseTrack() {
    return svg`
      <path
        d="${BASE_CENTER_LINE_PATH}"
        transform="translate(${BASE_CENTER_LINE_X} ${BASE_CENTER_LINE_Y})"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderActiveTrack() {
    if (!this.isActive) {
      return nothing;
    }

    return svg`
      <path
        d="${ACTIVE_CENTER_LINE_PATH}"
        transform="translate(${ACTIVE_CENTER_LINE_X} ${ACTIVE_CENTER_LINE_Y})"
        fill="${this.activeTrackColor}"
      />
    `;
  }

  private renderAngleSector() {
    if (!this.isActive) {
      return nothing;
    }

    const angle = clampAngle(this.angle);
    if (Math.abs(angle) < 0.01) {
      return nothing;
    }

    const zero = pointOnArc(
      0,
      ACTIVE_SECTOR_RADIUS,
      NEEDLE_PIVOT_X,
      NEEDLE_PIVOT_Y
    );
    const end = pointOnArc(
      angle,
      ACTIVE_SECTOR_RADIUS,
      NEEDLE_PIVOT_X,
      NEEDLE_PIVOT_Y
    );
    const sweepFlag = angle < 0 ? 1 : 0;
    const sectorPath = [
      `M ${NEEDLE_PIVOT_X} ${NEEDLE_PIVOT_Y}`,
      `L ${zero.x} ${zero.y}`,
      `A ${ACTIVE_SECTOR_RADIUS} ${ACTIVE_SECTOR_RADIUS} 0 0 ${sweepFlag} ${end.x} ${end.y}`,
      'Z',
    ].join(' ');

    return svg`
      <g clip-path="url(#${this.frameClipId})">
        <path
          d="${sectorPath}"
          fill="${this.activeTrackColor}"
        />
      </g>
    `;
  }

  private renderAngleNeedle() {
    const angle = this.isActive ? clampAngle(this.angle) : 0;
    const rotation = -angle;

    return svg`
      <g
        transform="translate(${NEEDLE_PIVOT_X} ${NEEDLE_PIVOT_Y}) rotate(${rotation})"
      >
        <path
          d="${ARROW_PATH}"
          fill="${this.activeColor}"
        />
      </g>
    `;
  }

  private renderInputLinear() {
    if (!this.isActive || this.state !== RudderIndicatorState.NotInCommand) {
      return nothing;
    }

    const setpoint = clampAngle(this.setpoint);
    const positionAngle = setpoint + INPUT_LINEAR_ANGLE_OFFSET;
    const markerBase = pointOnArc(
      positionAngle,
      INPUT_LINEAR_ARC_RADIUS + INPUT_LINEAR_RADIAL_OFFSET,
      INPUT_LINEAR_ARC_CENTER_X,
      INPUT_LINEAR_ARC_CENTER_Y
    );
    const tangentRadians = (positionAngle * Math.PI) / 180;
    const tangentX = Math.cos(tangentRadians);
    const tangentY = -Math.sin(tangentRadians);
    const markerX = markerBase.x + tangentX * INPUT_LINEAR_TANGENTIAL_OFFSET;
    const markerY = markerBase.y + tangentY * INPUT_LINEAR_TANGENTIAL_OFFSET;

    return svg`
      <g transform="translate(${markerX} ${markerY}) rotate(${-setpoint})">
        <g
          transform="translate(${-INPUT_LINEAR_HALF_WIDTH} ${-INPUT_LINEAR_HALF_HEIGHT}) scale(${INPUT_LINEAR_SCALE_X} ${INPUT_LINEAR_SCALE_Y})"
        >
          <path
            d="${INPUT_LINEAR_PATH}"
            fill="var(--instrument-regular-secondary-color)"
            stroke="var(--border-silhouette-color)"
            stroke-width="1"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </g>
      </g>
    `;
  }

  override render() {
    return html`
      <svg
        viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="${this.frameClipId}">
            <path
              d="${FRAME_PATH}"
              transform="translate(${FRAME_X} ${FRAME_Y})"
            />
          </clipPath>
          <clipPath id="${this.silhouetteClipId}">
            <rect
              x="0"
              y="${FRAME_Y + FRAME_TOP_Y - 0.8}"
              width="${VIEW_SIZE}"
              height="${VIEW_SIZE}"
            />
          </clipPath>
        </defs>
        ${this.renderSilhouette()}
        <path
          d="${FRAME_PATH}"
          transform="translate(${FRAME_X} ${FRAME_Y})"
          fill="var(--instrument-frame-primary-color)"
        />
        ${this.renderAngleSector()} ${this.renderBaseTrack()}
        ${this.renderActiveTrack()}
        <path
          d="${FRAME_PATH}"
          transform="translate(${FRAME_X} ${FRAME_Y})"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
        ${this.renderAngleNeedle()} ${this.renderInputLinear()}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rudder-indicator': ObcRudderIndicator;
  }
}
