import {LitElement, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {Tickmark, TickmarkStyle, TickmarkType} from '../watch/tickmark.js';
import {
  OUTER_RING_RADIUS,
  WatchCircleType,
  innerRingRadiusFor,
} from '../watch/watch.js';
import {InstrumentState, Priority} from '../types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {customElement} from '../../decorator.js';
import {computeZoomToFitArcFrame} from '../../svghelpers/arc-frame.js';

export enum ObcRudderVariant {
  Bar = 'bar',
  Needle = 'needle',
}

/**
 * `<obc-rudder>` — Half-circle rudder angle indicator.
 *
 * `ObcRudder` renders a semicircular gauge (40% top-clipped) that displays
 * the current rudder angle with a configurable bar or needle variant. The
 * gauge maps rudder angles to the lower arc of an `<obc-watch>` and overlays
 * a domain-specific needle when the `needle` variant is selected. It inherits
 * a full setpoint property bundle from {@link SetpointMixin}, including
 * auto at-setpoint detection, dual-marker adjustment preview, and deadband
 * tuning.
 *
 * ## Features
 *
 * - **Two display variants**: `bar` (filled arc from zero, default) and
 *   `needle` (rotating pointer with silhouette stroke) via the `variant`
 *   property.
 * - **Symmetric range**: The gauge spans ±`maxAngle` around the 180° center
 *   (zero position at bottom).
 * - **State-aware colors**: Bar and needle colors adapt to the current
 *   `InstrumentState` (active, loading, off) and `Priority` (enhanced, regular).
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`,
 *   `autoAtSetpointDeadband`, `setpointOverride`, and all other setpoint
 *   properties are provided by `SetpointMixin` and forwarded to `<obc-watch>`.
 * - **Advice zones**: Pass an array of `AngleAdvice` objects to render
 *   caution/alert arcs; triggered state is derived from whether the setpoint
 *   falls inside the advice range.
 *
 * ## Usage Guidelines
 *
 * - Set `maxAngle` to define the symmetric ± range (default: 90°).
 * - Use `priority` to switch between regular and enhanced color palettes
 *   (default: `Priority.regular`).
 * - Use `state` to control the instrument color palette.
 * - Enable `showLabels` to show numeric angle labels at tickmarks.
 * - Enable `tickmarksInside` to render tickmarks inside the ring.
 * - Choose `variant` to switch between bar and needle display.
 *
 * ## Best Practices
 *
 * - Prefer `SetpointMixin` properties (`setpoint`, `touching`, etc.) over
 *   any legacy aliases — the mixin is the single source of truth.
 * - The top 40% is always clipped; overlay SVGs use the matching clipped
 *   viewBox (`-224 -44.8 448 268.8`) for layer alignment.
 *
 * ## Example
 *
 * ```html
 * <obc-rudder
 *   angle="12"
 *   maxAngle="45"
 *   variant="needle"
 *   state="in-command"
 *   showLabels
 *   setpoint="15"
 * ></obc-rudder>
 * ```
 *
 * @element obc-rudder
 */
@customElement('obc-rudder')
export class ObcRudder extends SetpointMixin(LitElement) {
  @property({type: Number}) angle = 0;
  @property({type: String}) variant: ObcRudderVariant = ObcRudderVariant.Bar;
  @property({type: Number}) maxAngle = 90;
  @property({type: Boolean}) showLabels: boolean = false;
  /** Whether to render tickmarks inside the ring. */
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Array, attribute: false}) advices: AngleAdvice[] = [];
  @property({type: Boolean}) zoomToFitArc: boolean = false;

  private _radiusOffset = 0;

  private get _needleTransform(): string {
    const rOff = this._radiusOffset;
    if (rOff > 0) {
      // The needle tip peaks ~160px below center (256) in the 512-based system.
      // Scale Y around center so the tip extends by radiusOffset, keeping the
      // same gap from the enlarged ring. Rotation is applied after the scale,
      // so the stretch follows the needle axis.
      const f = (160 + rOff) / 160;
      return `translate(-256, -256) rotate(${-this.angle} 256 256) translate(256, 256) scale(1, ${f}) translate(-256, -256)`;
    }
    return `translate(-256, -256) rotate(${-this.angle} 256 256)`;
  }

  getAngle(value: number) {
    return 180 - value;
  }

  get barColor() {
    if (this.variant === ObcRudderVariant.Needle) {
      if (
        this.state === InstrumentState.loading ||
        this.state === InstrumentState.off
      ) {
        return 'var(--instrument-frame-tertiary-color)';
      }
      return this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)';
    } else {
      if (
        this.state === InstrumentState.loading ||
        this.state === InstrumentState.off
      ) {
        return 'var(--instrument-frame-tertiary-color)';
      }
      return this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';
    }
  }

  renderNeedle() {
    if (this.variant === ObcRudderVariant.Bar) {
      return nothing;
    }
    let color: string;
    if (
      this.state === InstrumentState.loading ||
      this.state === InstrumentState.off
    ) {
      color = 'var(--instrument-frame-tertiary-color)';
    } else {
      color =
        this.priority === Priority.enhanced
          ? 'var(--instrument-enhanced-secondary-color)'
          : 'var(--instrument-regular-secondary-color)';
    }
    return svg`
      <path
        transform="${this._needleTransform}"
        d="M260.462 411.447C259.81 416.73 251.933 416.645 251.514 411.191L239.826 259.24C239.618 258.192 239.508 257.109 239.508 256C239.508 255.764 239.514 255.528 239.524 255.294L239.503 255.039L239.462 254.5H239.576C240.334 246.09 247.401 239.5 256.008 239.5C264.615 239.5 271.681 246.09 272.439 254.5H272.542L272.5 255.039L272.488 255.196C272.501 255.462 272.508 255.731 272.508 256C272.508 257.144 272.391 258.261 272.169 259.339L260.487 411.191L260.462 411.447Z"
        fill="${color}"
        stroke="var(--border-silhouette-color)"
      />
    `;
  }

  override render() {
    const maxAngle = Math.max(2, this.maxAngle);
    const areas = [
      {
        startAngle: 180 - maxAngle,
        endAngle: 180 + maxAngle,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ];

    const barAreas = [
      {
        startAngle: this.getAngle(0),
        endAngle: this.getAngle(this.angle),
        fillColor: this.barColor,
      },
    ];

    const setpointAngle =
      this.setpoint !== undefined ? 180 - this.setpoint : undefined;

    const tickmarks: Tickmark[] = [
      {
        angle: 180,
        type: TickmarkType.primary,
        text: this.showLabels ? '0' : undefined,
      },
      {
        angle: 180,
        type: TickmarkType.zeroLineThick,
        color: this.barColor,
      },
      {
        angle: 180 - maxAngle,
        type: TickmarkType.secondary,
        text: this.showLabels ? maxAngle.toFixed(0) : undefined,
      },
      {
        angle: 180 + maxAngle,
        type: TickmarkType.secondary,
        text: this.showLabels ? (-maxAngle).toFixed(0) : undefined,
      },
    ];

    let helpAngle: null | number = null;
    if (this.maxAngle > 70) {
      helpAngle = 45;
    } else if (this.maxAngle > 50) {
      helpAngle = 30;
    } else if (this.maxAngle > 40) {
      helpAngle = 22.5;
    }

    if (helpAngle !== null) {
      tickmarks.push({angle: 180 - helpAngle, type: TickmarkType.primary});
      tickmarks.push({angle: 180 + helpAngle, type: TickmarkType.primary});
    }

    const advices = this.advices.map<AngleAdviceRaw>((adv): AngleAdviceRaw => {
      const startAngle = 180 - adv.maxAngle;
      const endAngle = 180 - adv.minAngle;
      const isInRange =
        this.setpoint !== undefined &&
        this.setpoint >= adv.minAngle &&
        this.setpoint <= adv.maxAngle;
      let state;
      if (isInRange) {
        state = AdviceState.triggered;
      } else if (adv.hinted) {
        state = AdviceState.hinted;
      } else {
        state = AdviceState.regular;
      }
      return {
        minAngle: startAngle,
        maxAngle: endAngle,
        type: adv.type,
        state: state,
      };
    });

    let overlayViewBox: string;
    if (this.zoomToFitArc) {
      const ext = 48;
      const targetSize = (176 + ext) * 2;
      const frame = computeZoomToFitArcFrame({
        areas,
        outerRadius: OUTER_RING_RADIUS,
        innerRadius: innerRingRadiusFor(WatchCircleType.double),
        extension: ext,
        targetSize,
      });
      overlayViewBox = frame.viewBox;
      this._radiusOffset = frame.radiusOffset;
    } else {
      overlayViewBox = '-224 -44.8 448 268.8';
      this._radiusOffset = 0;
    }

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .clipTop=${this.zoomToFitArc ? 0 : 40}
          .zoomToFitArc=${this.zoomToFitArc}
          .areas=${areas}
          .angleSetpoint=${setpointAngle}
          .newAngleSetpoint=${this.newSetpoint !== undefined
            ? 180 - this.newSetpoint
            : undefined}
          .atAngleSetpoint=${this.computeAtSetpoint(this.angle)}
          .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .setpointOverride=${this.setpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .padding=${48}
          .tickmarks=${tickmarks}
          .tickmarksInside=${this.tickmarksInside}
          .tickmarkStyle=${this.tickmarkStyle}
          .watchCircleType=${WatchCircleType.double}
          .barAreas=${barAreas}
          .state=${this.state}
          .priority=${this.priority}
          .advices=${advices}
        ></obc-watch>
        <svg viewBox="${overlayViewBox}">${this.renderNeedle()}</svg>
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
    'obc-rudder': ObcRudder;
  }
}
