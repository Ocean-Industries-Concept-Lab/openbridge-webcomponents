import {LitElement, css, html, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {InstrumentState} from '../types.js';

export enum PropulsionAzimuthIndicatorType {
  enhanced = 'enhanced',
  regular = 'regular',
}

const VIEW_SIZE = 48;
const CX = VIEW_SIZE / 2;
const CY = VIEW_SIZE / 2;
const DEG_TO_RAD = Math.PI / 180;

const LUBBER_PATH =
  'M4.12242 0.209381L0.0940147 5.84915C-0.142367 6.18008 0.0941955 6.63977 0.500882 6.63977H8.55769C8.96438 6.63977 9.20094 6.18008 8.96456 5.84915L4.93615 0.209381C4.73674 -0.0697936 4.32183 -0.0697937 4.12242 0.209381Z';
const LUBBER_X = 19.47068;
const LUBBER_Y = 1.36035;
const LUBBER_TOP_Y = LUBBER_Y + 0.209381;

const TRACK_W = 8;
const TRACK_H = 28;
const TRACK_RADIUS = 2;
const TRACK_LOCAL_CX = TRACK_W / 2;
const TRACK_LOCAL_CY = TRACK_H / 2;
const TRACK_ORIGIN_X = CX - TRACK_LOCAL_CX;
const TRACK_ORIGIN_Y = CY - TRACK_LOCAL_CY;

const BAR_H = 8;
const BAR_W = 8;
const BAR_STROKE_WIDTH = 1;
const BAR_DRAW_W = BAR_W;
const BAR_DRAW_H = BAR_H;
const BAR_X = 0;
const CENTER_BAR_H = 2;
const BAR_HALF = BAR_H / 2;
const BAR_END_INSET = 2;
const BAR_MIN_CY = BAR_END_INSET + BAR_HALF;
const BAR_MAX_CY = TRACK_H - BAR_END_INSET - BAR_HALF;
const BAR_CENTER_NEUTRAL = (BAR_MIN_CY + BAR_MAX_CY) / 2;
const BAR_HALF_SPAN = (BAR_MAX_CY - BAR_MIN_CY) / 2;

function normalizeAngle360(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

function circlePoint(radius: number, angle: number): {x: number; y: number} {
  const radians = (angle - 90) * DEG_TO_RAD;
  return {
    x: CX + radius * Math.cos(radians),
    y: CY + radius * Math.sin(radians),
  };
}

function arcSegmentPath(
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = circlePoint(radius, startAngle);
  const end = circlePoint(radius, endAngle);
  const delta = (endAngle - startAngle + 360) % 360;
  const largeArcFlag = delta > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function topCircleSideIntersection(
  radius: number,
  cutY: number,
  cutHalfX: number,
  slopeXPerY: number
): {deltaX: number; y: number; angle: number} {
  const lineXAtZero = cutHalfX - slopeXPerY * cutY;
  const a = slopeXPerY * slopeXPerY + 1;
  const b = 2 * slopeXPerY * lineXAtZero - 2 * CY;
  const c = lineXAtZero * lineXAtZero + CY * CY - radius * radius;
  const y = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const deltaX = lineXAtZero + slopeXPerY * y;

  return {
    deltaX,
    y,
    angle: Math.asin(deltaX / radius) / DEG_TO_RAD,
  };
}

/**
 * `<obc-propulsion-azimuth-indicator>` – A compact circular indicator with a top reference mark, rotating face, vertical level track, and centered value bar.
 *
 * Renders a **48×48** graphic: outer ring, top reference triangle, a pill-shaped vertical track, and a square value block. **`azimuth`** rotates the **track + value bar** around the center while keeping the outer ring and top reference mark fixed.
 *
 * ## Features
 *
 * - **Variants:** `enhanced` and `regular` select the secondary palette token for the value bar.
 * - **Azimuth:** Degrees; rotation is applied around the **48×48** view center to the track layer, **`value`** moves the bar along the track’s local vertical axis.
 * - **Value:** Normalized **−1…1**; **0** centers the bar on the reference line, **−1** and **1** clamp to the inner ends of the track.
 *
 * ## Usage Guidelines
 *
 * Use for a small combined direction and magnitude cue next to numeric readouts. For a full azimuth instrument with scales and setpoints, use **`obc-azimuth-thruster`** instead.
 */
@customElement('obc-propulsion-azimuth-indicator')
export class ObcPropulsionAzimuthIndicator extends LitElement {
  @property({type: String}) type: PropulsionAzimuthIndicatorType =
    PropulsionAzimuthIndicatorType.enhanced;

  @property({type: Boolean, attribute: 'has-silhouette'}) hasSilhouette = false;

  @property({type: Number}) azimuth = 0;

  @property({type: Number}) value = 0;

  @property({type: String}) state: InstrumentState = InstrumentState.active;

  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
    }

    svg {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
  `;

  private get accentColor(): string {
    return this.type === PropulsionAzimuthIndicatorType.regular
      ? 'var(--instrument-regular-secondary-color)'
      : 'var(--instrument-enhanced-secondary-color)';
  }

  private get isOffState(): boolean {
    return this.state === InstrumentState.off;
  }

  private get barCenterLocalY(): number {
    const v = Number.isFinite(this.value) ? this.value : 0;
    const clamped = Math.max(-1, Math.min(1, v));
    return BAR_CENTER_NEUTRAL + clamped * BAR_HALF_SPAN;
  }

  private get barRectY(): number {
    return this.barCenterLocalY - BAR_HALF;
  }

  private renderSilhouette() {
    if (!this.hasSilhouette || this.isOffState) return null;

    const silhouetteStrokeWidth = 0.5;
    const silhouetteCircleR = 20;
    const lubberPeakX = 24;
    const lubberPeakY = 0.2;
    const lubberSideSlope = 4.0284053 / 5.639769;
    const lubberGap = (1 - lubberPeakY) * lubberSideSlope * 2;
    const lubberCutY = LUBBER_TOP_Y - lubberGap;
    const lubberCutHalfX = lubberGap;
    const lubberBase = topCircleSideIntersection(
      silhouetteCircleR,
      lubberCutY,
      lubberCutHalfX,
      lubberSideSlope
    );
    const lubberLeftX = CX - lubberBase.deltaX;
    const lubberLeftY = lubberBase.y;
    const lubberRightX = CX + lubberBase.deltaX;
    const lubberRightY = lubberLeftY;
    const lubberCutLeftX = lubberPeakX - lubberCutHalfX;
    const lubberCutRightX = lubberPeakX + lubberCutHalfX;
    const gapHalfAngle = 6;
    const silhouetteArcPath = [
      arcSegmentPath(silhouetteCircleR, lubberBase.angle, 90 - gapHalfAngle),
      arcSegmentPath(silhouetteCircleR, 90 + gapHalfAngle, 180 - gapHalfAngle),
      arcSegmentPath(silhouetteCircleR, 180 + gapHalfAngle, 270 - gapHalfAngle),
      arcSegmentPath(
        silhouetteCircleR,
        270 + gapHalfAngle,
        360 - lubberBase.angle
      ),
    ].join(' ');

    return svg`
      <path
        d="${silhouetteArcPath}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${silhouetteStrokeWidth}"
        vector-effect="non-scaling-stroke"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <path
        d="M ${lubberLeftX} ${lubberLeftY} L ${lubberCutLeftX} ${lubberCutY} L ${lubberCutRightX} ${lubberCutY} L ${lubberRightX} ${lubberRightY}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${silhouetteStrokeWidth}"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `;
  }

  private renderStaticFrame() {
    return svg`
      <path
        d="${LUBBER_PATH}"
        transform="translate(${LUBBER_X} ${LUBBER_Y})"
        fill="var(--instrument-frame-tertiary-color)"
      />
      <circle
        cx="${CX}"
        cy="${CY}"
        r="18"
        fill="var(--instrument-frame-primary-color)"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderTrackAndBar() {
    return svg`
      <g transform="translate(${TRACK_ORIGIN_X} ${TRACK_ORIGIN_Y})">
        <rect
          x="0"
          y="0"
          width="${TRACK_W}"
          height="${TRACK_H}"
          rx="${TRACK_RADIUS}"
          fill="${
            this.isOffState ? 'none' : 'var(--instrument-frame-secondary-color)'
          }"
          stroke="${
            this.isOffState
              ? 'var(--instrument-frame-tertiary-color)'
              : 'var(--instrument-frame-secondary-color)'
          }"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
        ${
          this.isOffState
            ? svg`
                <rect
                  x="0"
                  y="${TRACK_LOCAL_CY - CENTER_BAR_H / 2}"
                  width="${TRACK_W}"
                  height="${CENTER_BAR_H}"
                  fill="var(--instrument-frame-tertiary-color)"
                />
              `
            : svg`
                <rect
                  x="${BAR_X}"
                  y="${this.barRectY}"
                  width="${BAR_DRAW_W}"
                  height="${BAR_DRAW_H}"
                  fill="${this.accentColor}"
                  stroke="${this.accentColor}"
                  stroke-width="${BAR_STROKE_WIDTH}"
                  vector-effect="non-scaling-stroke"
                />
              `
        }
      </g>
    `;
  }

  override render() {
    const rotation = normalizeAngle360(this.azimuth);
    return html`
      <svg
        viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderSilhouette()} ${this.renderStaticFrame()}
        <g transform="rotate(${rotation} ${CX} ${CY})">
          ${this.renderTrackAndBar()}
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-propulsion-azimuth-indicator': ObcPropulsionAzimuthIndicator;
  }
}
