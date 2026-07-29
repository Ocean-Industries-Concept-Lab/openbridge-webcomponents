import {LitElement, PropertyValues, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import '../watch/watch.js';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  type WatchVessel,
} from '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
} from '../../svghelpers/radial-frame.js';

export enum PitchRollYawType {
  /** Combined attitude dot only — no vessel image. */
  level = 'level',
  /** Vessel image, motion envelope circle and a live yaw bar from 0°. */
  actualMotion = 'actual-motion',
  /** Vessel image with a trail of past attitude samples. */
  historicalMotion = 'historical-motion',
}

/** One past attitude sample for the `historical-motion` trail. */
export interface PitchRollSample {
  pitch: number;
  roll: number;
}

/** Inner edge of the ring band; also the outermost polar-grid radius. */
const PITCH_ROLL_SCALE_RADIUS = 160;
/** Number of evenly spaced polar-grid divisions inside the ring. */
const GRID_DIVISIONS = 4;
/** Radius of the small circle marking the face centre. */
const CENTER_CIRCLE_RADIUS = 12;
/** Centre radius of the yaw band/dot track on the scale (matches the ROT bar). */
const SCALE_TRACK_RADIUS = 172;
/** Half thickness of the yaw trend band. */
const BAND_HALF_THICKNESS = 8;
/** Radius of the yaw dot and the attitude dot. */
const DOT_RADIUS = 8;
/** Radius of the halo behind the attitude dot in the `level` variant. */
const LEVEL_HALO_RADIUS = 24;
/** Radius of one trail sample dot in the `historical-motion` variant. */
const TRAIL_DOT_RADIUS = 3;

const LABEL_TEXTS = ['0', '90', '180', '-90'] as const;

/**
 * `<obc-pitch-roll-yaw>` – Polar attitude instrument combining pitch, roll
 * and yaw in a single circular face. Pitch and roll place a dot on a polar
 * grid (up = positive pitch, right = positive roll); yaw is shown on the
 * outer scale, which spans −180° (left, counter-clockwise) to +180° with 0°
 * at the top.
 *
 * ## Features / Variants
 *
 * - **`type`:** `level` (default) shows the attitude dot with a halo and a
 *   yaw trend band with a current-yaw dot on the scale; `actual-motion` adds
 *   a top-view vessel image, an optional motion-envelope circle
 *   (`motionRadius`) and replaces the trend band with a live yaw bar swept
 *   from 0° to `yaw`; `historical-motion` shows the vessel image with a trail
 *   of past attitude samples (`motionHistory`) plus the yaw trend band.
 * - **Scale range:** `range` sets the pitch/roll value at the outermost grid
 *   circle; the dot is clamped to the grid edge beyond it.
 * - **Yaw trend band:** `minAvgYaw`/`maxAvgYaw` render a rounded band on the
 *   scale in the `level` and `historical-motion` variants.
 * - **Labels:** `showLabels` adds 0/90/180/-90 labels outside the scale.
 * - **Priority:** `priority` switches every indication between the `regular`
 *   and `enhanced` palette.
 *
 * ## Usage Guidelines
 *
 * Use when combined attitude and yaw deviation should be monitored in one
 * compact face. For per-axis arc instruments use `obc-pitch-roll` or
 * `obc-pitch-roll-heave`; for heading against a compass card use
 * `obc-compass`.
 *
 * @experimental
 */
@customElement('obc-pitch-roll-yaw')
export class ObcPitchRollYaw extends LitElement {
  @property({type: String}) type: PitchRollYawType = PitchRollYawType.level;
  /** Pitch in degrees; positive moves the attitude dot up. */
  @property({type: Number}) pitch = 0;
  /** Roll in degrees; positive moves the attitude dot right. */
  @property({type: Number}) roll = 0;
  /**
   * Yaw deviation in degrees on the ±180° scale (0° = top, positive =
   * clockwise). Shown as a dot on the scale in the `level` and
   * `historical-motion` variants and as the end of the live yaw bar in the
   * `actual-motion` variant.
   */
  @property({type: Number}) yaw = 0;
  /** @availableWhen type!='actual-motion' */
  @property({type: Number}) minAvgYaw = 0;
  /** @availableWhen type!='actual-motion' */
  @property({type: Number}) maxAvgYaw = 0;
  /** Pitch/roll value at the outermost grid circle. Default `20`. */
  @property({type: Number}) range = 20;
  /**
   * Radius of the motion-envelope circle in the same unit as `pitch`/`roll`.
   * Hidden when `0`.
   * @availableWhen type=='actual-motion'
   */
  @property({type: Number}) motionRadius = 0;
  /**
   * Past attitude samples, oldest first; rendered as a fading trail.
   * @availableWhen type=='historical-motion'
   */
  @property({type: Array, attribute: false})
  motionHistory: PitchRollSample[] = [];
  /** @availableWhen type!='level' */
  @property({type: String}) vesselImage: VesselImage = VesselImage.psvTop;
  @property({type: String}) priority: Priority = Priority.regular;
  /** When `true`, shows 0/90/180/-90 labels outside the scale. */
  @property({type: Boolean}) showLabels = false;

  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  private get isEnhanced(): boolean {
    return this.priority === Priority.enhanced;
  }

  private get secondaryColor(): string {
    return this.isEnhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get tertiaryColor(): string {
    return this.isEnhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get safeRange(): number {
    return Number.isFinite(this.range) && this.range > 0 ? this.range : 1;
  }

  /** Attitude sample position in SVG units, clamped to the grid edge. */
  private attitudePoint(pitch: number, roll: number): {x: number; y: number} {
    const scale = PITCH_ROLL_SCALE_RADIUS / this.safeRange;
    let x = roll * scale;
    let y = -pitch * scale;
    const magnitude = Math.hypot(x, y);
    if (magnitude > PITCH_ROLL_SCALE_RADIUS) {
      x *= PITCH_ROLL_SCALE_RADIUS / magnitude;
      y *= PITCH_ROLL_SCALE_RADIUS / magnitude;
    }
    return {x, y};
  }

  private scalePoint(angle: number): {x: number; y: number} {
    const rad = (angle * Math.PI) / 180;
    return {
      x: SCALE_TRACK_RADIUS * Math.sin(rad),
      y: -SCALE_TRACK_RADIUS * Math.cos(rad),
    };
  }

  /** Polar reference grid: evenly spaced circles, centre circle, crosshair. */
  private renderGrid() {
    const stroke = 'var(--instrument-frame-tertiary-color)';
    const circles = [];
    for (let i = 1; i < GRID_DIVISIONS; i++) {
      circles.push(svg`
        <circle
          cx="0"
          cy="0"
          r=${(PITCH_ROLL_SCALE_RADIUS * i) / GRID_DIVISIONS}
          fill="none"
          stroke=${stroke}
          vector-effect="non-scaling-stroke"
        />
      `);
    }
    return svg`
      ${circles}
      <circle
        cx="0"
        cy="0"
        r=${CENTER_CIRCLE_RADIUS}
        fill="none"
        stroke=${stroke}
        vector-effect="non-scaling-stroke"
      />
      <line
        x1=${-PITCH_ROLL_SCALE_RADIUS}
        y1="0"
        x2=${PITCH_ROLL_SCALE_RADIUS}
        y2="0"
        stroke=${stroke}
        vector-effect="non-scaling-stroke"
      />
      <line
        x1="0"
        y1=${-PITCH_ROLL_SCALE_RADIUS}
        x2="0"
        y2=${PITCH_ROLL_SCALE_RADIUS}
        stroke=${stroke}
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderMotionEnvelope() {
    if (this.type !== PitchRollYawType.actualMotion || this.motionRadius <= 0) {
      return nothing;
    }
    const radius = Math.min(
      (this.motionRadius / this.safeRange) * PITCH_ROLL_SCALE_RADIUS,
      PITCH_ROLL_SCALE_RADIUS
    );
    return svg`
      <circle
        cx="0"
        cy="0"
        r=${radius}
        fill=${this.tertiaryColor}
        stroke="var(--instrument-frame-primary-color)"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderTrail() {
    if (this.type !== PitchRollYawType.historicalMotion) {
      return nothing;
    }
    const samples = Array.isArray(this.motionHistory) ? this.motionHistory : [];
    const count = samples.length;
    return samples.map((sample, index) => {
      const {x, y} = this.attitudePoint(sample.pitch, sample.roll);
      const opacity = count > 1 ? 0.15 + (0.7 * index) / (count - 1) : 0.85;
      return svg`
        <circle
          cx=${x}
          cy=${y}
          r=${TRAIL_DOT_RADIUS}
          fill=${this.tertiaryColor}
          opacity=${opacity}
        />
      `;
    });
  }

  /** Rounded yaw trend band from `minAvgYaw` to `maxAvgYaw` on the scale. */
  private renderYawBand() {
    if (this.type === PitchRollYawType.actualMotion) {
      return nothing;
    }
    let extent = this.maxAvgYaw - this.minAvgYaw;
    if (extent < 0) {
      extent += 360;
    }
    if (extent === 0) {
      return nothing;
    }
    const start = this.scalePoint(this.minAvgYaw);
    const end = this.scalePoint(this.minAvgYaw + Math.min(extent, 359.9));
    const largeArc = extent > 180 ? 1 : 0;
    return svg`
      <path
        d="M ${start.x} ${start.y} A ${SCALE_TRACK_RADIUS} ${SCALE_TRACK_RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}"
        fill="none"
        stroke=${this.tertiaryColor}
        stroke-width=${BAND_HALF_THICKNESS * 2}
        stroke-linecap="round"
      />
    `;
  }

  /** Current-yaw dot on the scale (design's "actual": face-colored 2px ring). */
  private renderYawDot() {
    if (this.type === PitchRollYawType.actualMotion) {
      return nothing;
    }
    const {x, y} = this.scalePoint(this.yaw);
    return svg`
      <circle
        cx=${x}
        cy=${y}
        r=${DOT_RADIUS}
        fill=${this.secondaryColor}
        stroke="var(--instrument-frame-primary-color)"
        stroke-width="2"
      />
    `;
  }

  /**
   * Live yaw bar for `actual-motion`: a tertiary-colored band on the scale
   * track swept from 0° to `yaw`, its moving end marked by a secondary-colored
   * dot (the design's "ROT-actual" marker). The fixed 0° end is cut flat.
   */
  private renderActualYawBar() {
    if (this.type !== PitchRollYawType.actualMotion) {
      return nothing;
    }
    const {x, y} = this.scalePoint(this.yaw);
    const dot = svg`
      <circle cx=${x} cy=${y} r=${DOT_RADIUS} fill=${this.secondaryColor} />
    `;
    if (Math.abs(this.yaw) < 0.5) {
      return dot;
    }
    const start = this.scalePoint(Math.min(0, this.yaw));
    const end = this.scalePoint(Math.max(0, this.yaw));
    const largeArc = Math.abs(this.yaw) > 180 ? 1 : 0;
    return svg`
      <path
        d="M ${start.x} ${start.y} A ${SCALE_TRACK_RADIUS} ${SCALE_TRACK_RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}"
        fill="none"
        stroke=${this.tertiaryColor}
        stroke-width=${BAND_HALF_THICKNESS * 2}
        stroke-linecap="butt"
      />
      ${dot}
    `;
  }

  private renderAttitudeDot() {
    const {x, y} = this.attitudePoint(this.pitch, this.roll);
    const dot = svg`
      <circle
        cx=${x}
        cy=${y}
        r=${DOT_RADIUS}
        fill=${this.secondaryColor}
        stroke="var(--instrument-frame-primary-color)"
        stroke-width="2"
      />
    `;
    if (this.type === PitchRollYawType.level) {
      return svg`
        <circle cx=${x} cy=${y} r=${LEVEL_HALO_RADIUS} fill=${this.tertiaryColor} />
        ${dot}
      `;
    }
    return dot;
  }

  override render() {
    const frame = computeRadialFrame({
      basePadding: 24,
      labelWidthPx: this.showLabels ? estimateLabelWidthPx(LABEL_TEXTS) : 0,
      containerPx: measureContainerPx(this),
    });

    const showLabels = this.showLabels && !frame.labelsHidden;
    const tickmarks: Tickmark[] = [0, 90, 180, 270].map((angle, index) => ({
      angle,
      type: TickmarkType.main,
      text: showLabels ? LABEL_TEXTS[index] : undefined,
    }));

    const vessels: WatchVessel[] =
      this.type === PitchRollYawType.level
        ? []
        : [
            {
              size: VesselImageSize.medium,
              vesselImage: this.vesselImage,
              transform: '',
            },
          ];

    return html`
      <div class="container">
        <svg viewBox=${frame.viewBox}>
          ${this.renderGrid()} ${this.renderTrail()}
          ${this.renderMotionEnvelope()}
        </svg>
        <obc-watch
          .arcFrame=${frame}
          .watchCircleType=${WatchCircleType.single}
          .tickmarks=${tickmarks}
          .vessels=${vessels}
          .priority=${this.priority}
        ></obc-watch>
        <svg viewBox=${frame.viewBox}>
          ${this.renderYawBand()} ${this.renderActualYawBar()}
          ${this.renderYawDot()} ${this.renderAttitudeDot()}
        </svg>
      </div>
    `;
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pitch-roll-yaw': ObcPitchRollYaw;
  }
}
