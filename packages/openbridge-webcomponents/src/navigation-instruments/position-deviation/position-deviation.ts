import {LitElement, PropertyValues, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import '../watch/watch.js';
import {WatchCircleType} from '../watch/watch.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';
import {
  NORTH_ARROW_WIDTH_PX,
  computeRadialFrame,
  measureContainerPx,
  observeInnerBox,
} from '../../svghelpers/radial-frame.js';
import {directionIndicator, setpointMarker} from './shapes.js';

export enum PositionDeviationOrientation {
  /** North stays at the top; the heading arrow rotates. */
  northUp = 'northUp',
  /** Heading stays at the top; the compass card rotates. */
  headingUp = 'headingUp',
}

export enum PositionDeviationPriority {
  enhanced = 'enhanced',
  regular = 'regular',
  caution = 'caution',
  alarm = 'alarm',
}

/** Radius of the caution-limit ring when it anchors the scale. */
const CAUTION_RING_RADIUS = 73;
/** Radius of the alarm-limit ring when it anchors the scale. */
const ALARM_RING_RADIUS = 94;
/** Largest radius the deviation circle may grow to (inner edge of the band). */
const MAX_DEVIATION_RADIUS = 112;
/** Radial extent of the line towards the setpoint. */
const SETPOINT_LINE_INNER_RADIUS = 20;
const SETPOINT_LINE_OUTER_RADIUS = 116;
/** Radius of the dot marking the setpoint position on the line. */
const SETPOINT_DOT_RADIUS = 5.5;

interface DeviationPalette {
  /** Heading arrow, setpoint line and setpoint marker. */
  indication: string;
  /** Setpoint dot fill. */
  dot: string;
  /** Deviation circle fill. */
  fill: string;
  /** Deviation circle outline. */
  fillStroke: string;
}

const PALETTES: Record<PositionDeviationPriority, DeviationPalette> = {
  [PositionDeviationPriority.enhanced]: {
    indication: 'var(--instrument-enhanced-secondary-color)',
    dot: 'var(--instrument-enhanced-primary-color)',
    fill: 'var(--instrument-enhanced-tertiary-color)',
    fillStroke: 'var(--instrument-enhanced-primary-color)',
  },
  [PositionDeviationPriority.regular]: {
    indication: 'var(--instrument-regular-secondary-color)',
    dot: 'var(--instrument-regular-secondary-color)',
    fill: 'var(--instrument-regular-tertiary-color)',
    fillStroke: 'var(--instrument-regular-secondary-color)',
  },
  [PositionDeviationPriority.caution]: {
    indication: 'var(--instrument-regular-secondary-color)',
    dot: 'var(--instrument-regular-secondary-color)',
    fill: 'var(--alert-caution-tint-color)',
    fillStroke: 'var(--on-caution-active-color)',
  },
  [PositionDeviationPriority.alarm]: {
    indication: 'var(--instrument-regular-secondary-color)',
    dot: 'var(--instrument-regular-secondary-color)',
    fill: 'var(--alert-alarm-tint-color)',
    fillStroke: 'var(--alert-alarm-color)',
  },
};

/**
 * `<obc-position-deviation>` – Radial instrument showing how far the current
 * position has drifted from a position setpoint. The distance to the setpoint
 * is drawn as a filled circle around the centre, so the deviation magnitude
 * is readable regardless of direction, while a thin line with a dot marks the
 * setpoint's actual bearing and distance (the dot is kept at the line's inner
 * end for deviations too small to reach it, so it never disappears into the
 * centre rosette). Dotted and solid limit rings show the caution and alarm
 * distances; non-positive or non-finite limits hide their ring, and the scale
 * anchors to the outermost valid limit.
 *
 * ## Features / Variants
 *
 * - **`orientation`:** `northUp` (default) keeps north at the top and rotates
 *   the heading arrow; the N/E/S/W labels sit inside the ring and a plain
 *   north triangle hangs from the ring top. `headingUp` keeps the heading
 *   arrow pointing up and rotates the compass card: the labels move outside
 *   the ring and follow the card (staying upright), and north is marked by a
 *   compact triangle on the ring with an "N" on top.
 * - **`priority`:** `enhanced` renders the indications in the enhanced accent
 *   palette; `regular` in neutral greys; `caution` and `alarm` tint the
 *   deviation circle with the corresponding alert colors.
 * - **Limits:** `cautionLimit` and `alarmLimit` (same unit as `deviation`)
 *   place the dotted caution ring and solid alarm ring. `hasAlarmLimit`
 *   (JS property) hides the alarm ring and anchors the scale to the caution
 *   ring instead.
 * - **Labels:** `showLabels` (JS property) toggles the N/E/S/W labels.
 *
 * ## Usage Guidelines
 *
 * Use when station keeping or track keeping requires monitoring drift from a
 * commanded position. For heading against a compass card use `obc-compass`;
 * for combined attitude monitoring use `obc-pitch-roll-yaw`.
 *
 * ## Best Practices
 *
 * - Provide positive, finite limits with `cautionLimit < alarmLimit`; a
 *   non-positive or non-finite limit hides its ring, and an inverted pair
 *   anchors the scale to the larger value.
 * - Keep `deviation` in the same unit as the limits — the component only
 *   scales values relative to the limit rings, it does not convert units.
 * - Choose `northUp` when the surrounding view is geographically referenced
 *   (chart-style displays); choose `headingUp` when the operator monitors
 *   drift relative to the vessel's own heading (conning-style displays).
 *
 * @experimental
 */
@customElement('obc-position-deviation')
export class ObcPositionDeviation extends LitElement {
  @property({type: String})
  orientation: PositionDeviationOrientation =
    PositionDeviationOrientation.northUp;
  @property({type: String})
  priority: PositionDeviationPriority = PositionDeviationPriority.regular;
  /** Heading in degrees (0 = north, clockwise). */
  @property({type: Number}) heading = 0;
  /** Distance from the current position to the setpoint, in the same unit as the limits. */
  @property({type: Number}) deviation = 0;
  /** Bearing from the current position towards the setpoint in degrees (0 = north, clockwise). */
  @property({type: Number}) setpointBearing = 0;
  /** Deviation at which the dotted caution ring is drawn; hidden when not a positive finite number. */
  @property({type: Number}) cautionLimit = 15;
  /** Deviation at which the solid alarm ring is drawn; hidden when not a positive finite number. */
  @property({type: Number}) alarmLimit = 20;
  /** When `false`, hides the alarm ring and anchors the scale to the caution ring. */
  @property({type: Boolean, attribute: false}) hasAlarmLimit = true;
  /** When `true`, shows the N/E/S/W labels on the compass card. */
  @property({type: Boolean, attribute: false}) showLabels = true;

  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  private get palette(): DeviationPalette {
    return (
      PALETTES[this.priority] ?? PALETTES[PositionDeviationPriority.regular]
    );
  }

  private get watchPriority(): Priority {
    return this.priority === PositionDeviationPriority.enhanced
      ? Priority.enhanced
      : Priority.regular;
  }

  /** `cautionLimit` when it is a positive finite number, otherwise undefined (ring hidden). */
  private get safeCautionLimit(): number | undefined {
    return Number.isFinite(this.cautionLimit) && this.cautionLimit > 0
      ? this.cautionLimit
      : undefined;
  }

  /** `alarmLimit` when shown and a positive finite number, otherwise undefined (ring hidden). */
  private get safeAlarmLimit(): number | undefined {
    return this.hasAlarmLimit &&
      Number.isFinite(this.alarmLimit) &&
      this.alarmLimit > 0
      ? this.alarmLimit
      : undefined;
  }

  /**
   * SVG units per deviation unit, anchored to the outermost visible limit
   * ring. The anchor uses the largest valid limit so an inverted pair
   * (caution above alarm) still keeps both rings on the face.
   */
  private get radiusPerUnit(): number {
    const anchorLimit =
      this.safeAlarmLimit !== undefined
        ? Math.max(this.safeAlarmLimit, this.safeCautionLimit ?? 0)
        : this.safeCautionLimit;
    const anchorRadius =
      this.safeAlarmLimit !== undefined
        ? ALARM_RING_RADIUS
        : CAUTION_RING_RADIUS;
    return anchorRadius / (anchorLimit ?? 1);
  }

  private toRadius(value: number): number {
    const radius = Number.isFinite(value) ? value * this.radiusPerUnit : 0;
    return Math.min(Math.max(radius, 0), MAX_DEVIATION_RADIUS);
  }

  private renderDeviationZone() {
    const palette = this.palette;
    return svg`
      <circle
        cx="0"
        cy="0"
        r=${this.toRadius(this.deviation)}
        fill=${palette.fill}
        stroke=${palette.fillStroke}
        vector-effect="non-scaling-stroke"
      />
      ${
        this.safeCautionLimit !== undefined
          ? svg`
            <circle
              cx="0"
              cy="0"
              r=${this.toRadius(this.safeCautionLimit)}
              fill="none"
              stroke="var(--instrument-tick-mark-tertiary-color)"
              stroke-dasharray="2 4"
              vector-effect="non-scaling-stroke"
            />`
          : nothing
      }
      ${
        this.safeAlarmLimit !== undefined
          ? svg`
            <circle
              cx="0"
              cy="0"
              r=${this.toRadius(this.safeAlarmLimit)}
              fill="none"
              stroke="var(--instrument-tick-mark-tertiary-color)"
              vector-effect="non-scaling-stroke"
            />`
          : nothing
      }
    `;
  }

  private renderSetpoint(angle: number) {
    const palette = this.palette;
    const dotRadius = Math.max(
      this.toRadius(this.deviation),
      SETPOINT_LINE_INNER_RADIUS
    );
    return svg`
      <g transform="rotate(${angle})">
        <line
          x1="0"
          y1=${-SETPOINT_LINE_INNER_RADIUS}
          x2="0"
          y2=${-SETPOINT_LINE_OUTER_RADIUS}
          stroke=${palette.indication}
          stroke-width="2"
        />
        <circle
          cx="0"
          cy=${-dotRadius}
          r=${SETPOINT_DOT_RADIUS}
          fill=${palette.dot}
          stroke="var(--border-silhouette-color)"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  override render() {
    const frame = computeRadialFrame({
      basePadding: 72,
      labelWidthPx: NORTH_ARROW_WIDTH_PX,
      containerPx: measureContainerPx(this),
    });

    const headingUp =
      this.orientation === PositionDeviationOrientation.headingUp;
    const rotation = headingUp ? -this.heading : undefined;
    const cardRotation = rotation ?? 0;
    const headingAngle = this.heading + cardRotation;
    const bearingAngle = this.setpointBearing + cardRotation;

    return html`
      <div class="container">
        <obc-watch
          .arcFrame=${frame}
          .watchCircleType=${WatchCircleType.double}
          .crosshairEnabled=${true}
          .showLabels=${this.showLabels && !frame.labelsHidden}
          .tickmarksInside=${!headingUp}
          .insideLabelsFlush=${true}
          .northArrow=${!frame.labelsHidden}
          .northMarker=${headingUp}
          .rotation=${rotation}
          .priority=${this.watchPriority}
        ></obc-watch>
        <svg viewBox=${frame.viewBox}>
          ${this.renderDeviationZone()}
          ${directionIndicator(headingAngle, this.palette.indication)}
          ${this.renderSetpoint(bearingAngle)}
          ${setpointMarker(bearingAngle, this.palette.indication)}
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
    'obc-position-deviation': ObcPositionDeviation;
  }
}
