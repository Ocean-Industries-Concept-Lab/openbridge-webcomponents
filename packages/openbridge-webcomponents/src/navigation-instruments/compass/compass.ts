import {LitElement, PropertyValues, css, html, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {
  CogArrowStyle,
  HdgArrowStyle,
  cogArrow,
  hdgArrow,
} from '../course-arrows/course-arrows.js';
import {
  CompassCenterReadout,
  CompassReadoutSource,
  centerReadoutStyles,
  renderCenterReadouts,
  resolveCompassCenterReadouts,
} from '../readout/center-readout.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {
  applyPinnedHostSize,
  computeRadialFrame,
  measureContainerPx,
  NORTH_ARROW_WIDTH_PX,
  NSWE_LABEL_WIDTH_PX,
  type RadialFrame,
} from '../../svghelpers/radial-frame.js';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  RotType,
  RotPosition,
} from '../watch/watch.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import {ROT_ZERO_DEADBAND_DEG} from '../rate-of-turn/rot-renderer.js';
import {customElement} from '../../decorator.js';
import {InstrumentState, Priority} from '../types.js';
export {RotType};
export {HdgArrowStyle, CogArrowStyle};
export {CompassReadoutSource};
export type {CompassCenterReadout};

export enum CompassDirection {
  NorthUp = 'northUp',
  HeadingUp = 'headingUp',
  CourseUp = 'courseUp',
}

export enum CompassPriorityElement {
  hdg = 'hdg',
  cog = 'cog',
  rot = 'rot',
  wind = 'wind',
  current = 'current',
}

/**
 * `<obc-compass>` – Full-featured compass with HDG/COG arrows, rate-of-turn indicator, and environmental overlays.
 *
 * Renders a circular compass instrument that displays heading (HDG) and
 * course-over-ground (COG) as rotating arrows over a triple-ring watch face.
 * It supports wind and current indicators, a vessel silhouette, heading
 * setpoint with auto at-setpoint detection, advice zones, and a rate-of-turn
 * (ROT) dot indicator. The compass can be oriented north-up, heading-up, or
 * course-up.
 *
 * ## Features
 *
 * - **Direction modes**: `northUp` (default), `headingUp`, or `courseUp`
 *   via the `direction` property.
 * - **HDG / COG arrows**: Two styled arrows overlay the watch face,
 *   rotating independently.
 * - **Heading setpoint**: Optional setpoint marker with auto at-setpoint
 *   detection via `headingSetpoint`, `atHeadingSetpoint`, and deadband
 *   tuning properties.
 * - **Advice zones**: Pass `headingAdvices` to render caution/alert arcs;
 *   triggered state is derived from whether the current heading falls
 *   inside the advice range.
 * - **Rate of turn**: Animated ROT indicator driven by
 *   `rateOfTurnDegreesPerMinute` (deg/min, the maritime / AIS convention).
 *   Supports spinning dots (`rotType="dots"`) — the dot animation is
 *   amplified by `rotDotAnimationFactor` so small physical values still
 *   read at a glance — and a banana-shaped arc bar (`rotType="bar"`)
 *   showing the rate of turn as an arc anchored at the current heading.
 *   Bar extent is driven by the physical value only (gain is not applied).
 *   Position on the outer scale ring or inner circle via `rotPosition`.
 * - **Environmental overlays**: Wind speed/direction and current
 *   speed/direction indicators on the watch face.
 * - **Vessel image**: Configurable vessel silhouette centered on the
 *   compass, rotating with heading.
 * - **Arrow styles**: The HDG and COG arrows each select their look via
 *   `hdgArrowStyle` (`arrowHead` default, `needle`, `vector`, `beamLine`)
 *   and `cogArrowStyle` (`arrowHead` default, `needle`, `vector`,
 *   `velocityVector`).
 * - **Center readouts**: `centerReadouts` replaces the vessel with up to
 *   three readouts (first on top, the rest below a horizontal divider);
 *   values bind to the instrument's own inputs per entry `source`.
 * - **Color priority**: Set `priority` to `Priority.enhanced` to use the
 *   blue/enhanced color palette instead of the default gray/regular palette
 *   (default: `Priority.regular`).
 *
 * ## Usage Guidelines
 *
 * - Set `heading` and `courseOverGround` to the current sensor values
 *   in degrees.
 * - Use `direction` to control the compass orientation mode.
 * - Use `headingSetpoint` to show a target heading marker.
 * - Pass `headingAdvices` as an array of `AngleAdvice` objects for
 *   caution/alert zones.
 * - Set `currentWindSpeedKnots` / `windFromDirection` and `currentSpeed` /
 *   `currentFromDirection` to display environmental indicators.
 *
 * ## Example
 *
 * ```html
 * <obc-compass
 *   heading="45"
 *   courseOverGround="50"
 *   direction="northUp"
 *   headingSetpoint="90"
 *   priority="regular"
 *   vesselImage="genericTop"
 * ></obc-compass>
 * ```
 *
 *
 * @ignition-base-height: 512px
 * @ignition-base-width: 512px
 * @stable
 */
@customElement('obc-compass')
export class ObcCompass extends LitElement {
  /** The current heading of the vessel in degrees. */
  @property({type: Number}) heading = 0;
  /** The current course over ground in degrees. */
  @property({type: Number}) courseOverGround = 0;

  /** The set point for the heading in degrees. */
  @property({type: Number}) headingSetpoint: number | null = null;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Number}) newHeadingSetpoint: number | undefined;
  /**
   * Indicates if the vessel is at the heading set point.
   * @availableWhen headingSetpoint!=null && autoAtHeadingSetpoint==false
   */
  @property({type: Boolean}) atHeadingSetpoint: boolean = false;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Number}) headingSetpointAtZeroDeadband: number = 0.5;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Boolean}) headingSetpointOverride: boolean = false;
  /**
   * Enables automatic at heading set point calculation.
   * @availableWhen headingSetpoint!=null
   */
  @property({type: Boolean, attribute: false}) autoAtHeadingSetpoint: boolean =
    true;
  /**
   * The deadband for the heading set point in degrees.
   * @availableWhen headingSetpoint!=null && autoAtHeadingSetpoint==true
   */
  @property({type: Number}) autoAtHeadingSetpointDeadband: number = 2;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Boolean}) animateSetpoint: boolean = false;
  /**
   * Indicates if the compass is being touched.
   * @availableWhen headingSetpoint!=null
   */
  @property({type: Boolean}) touching: boolean = false;
  /** An array of angle advices for the compass. */
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];
  /**
   * The wind speed in knots.
   * @availableWhen windFromDirection!=null
   */
  @property({type: Number}) currentWindSpeedKnots: number | null = null;
  /**
   * The direction the wind is coming from in degrees.
   * @availableWhen currentWindSpeedKnots!=null
   */
  @property({type: Number}) windFromDirection: number | null = null;
  /**
   * The current speed, number of arrows.
   * @availableWhen currentFromDirection!=null
   */
  @property({type: Number}) currentSpeed: number | null = null;
  /**
   * The direction the current is coming from in degrees.
   * @availableWhen currentSpeed!=null
   */
  @property({type: Number}) currentFromDirection: number | null = null;
  /**
   * The image of the vessel. Hidden while `centerReadouts` is non-empty.
   * @availableWhen centerReadouts==[]
   */
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  /**
   * Center readouts replacing the vessel: the first entry renders on top,
   * the rest side by side below a horizontal divider. Values bind per entry
   * `source` (`hdg` → `heading`, `cog` → `courseOverGround`, `rot` →
   * `rateOfTurnDegreesPerMinute`, a dash when unset) and colors follow
   * `priorityElements`.
   */
  @property({type: Array, attribute: false})
  centerReadouts: CompassCenterReadout[] = [];
  /** HDG arrow style: `arrowHead` (default), `needle`, `vector`, or `beamLine`. */
  @property({type: String}) hdgArrowStyle: HdgArrowStyle =
    HdgArrowStyle.arrowHead;
  /** COG arrow style: `arrowHead` (default), `needle`, `vector`, or `velocityVector`. */
  @property({type: String}) cogArrowStyle: CogArrowStyle =
    CogArrowStyle.arrowHead;
  /**
   * Measured rate of turn in degrees per minute (positive = starboard).
   * Drives both the bar extent and (after multiplication by
   * `rotDotAnimationFactor`) the spinning dot animation.
   * When `undefined`, falls back to the deprecated `rotationsPerMinute`.
   */
  @property({type: Number}) rateOfTurnDegreesPerMinute: number | undefined;
  /**
   * Visual amplification applied only to the spinning dot animation
   * (not to the bar extent). Default `18` keeps the legacy visual feel
   * (≈1 rpm at 20°/min).
   * @availableWhen rotType==dots
   */
  @property({type: Number}) rotDotAnimationFactor: number = 18;
  /**
   * Legacy rate-of-turn input, in rotations per minute. When
   * `rateOfTurnDegreesPerMinute` is `undefined`, this value is used
   * (unconverted) as the fallback ROT, driving both the spinning dot ring
   * and the bar extent.
   * @deprecated Use `rateOfTurnDegreesPerMinute` (and optionally
   * `rotDotAnimationFactor`) instead. Takes effect only when
   * `rateOfTurnDegreesPerMinute` is `undefined`.
   */
  @property({type: Number}) rotationsPerMinute: number = 1;
  /** ROT display mode: `'dots'` (spinning dots, default) or `'bar'` (a rate-of-turn arc anchored at the current heading, its length proportional to the rate of turn). */
  @property({type: String}) rotType: RotType = RotType.dots;
  /** ROT track position: `'innerCircle'` (default) or `'scale'` (on the outer ring). */
  @property({type: String}) rotPosition: RotPosition = RotPosition.innerCircle;
  /**
   * Bar-extent reference value in **degrees per minute**. The bar fills the
   * full ±`rotArcExtent` arc when the measured ROT equals ±`rotMaxValue`.
   * Default `60` aligns with ES-TRIN 2025/1 Art. 3.02.
   *
   * Note: prior to the introduction of `rateOfTurnDegreesPerMinute` this
   * property was interpreted in rotations per minute. The unit changed when
   * the physical ROT API was introduced.
   * @availableWhen rotType==bar
   */
  @property({type: Number}) rotMaxValue: number = 60;
  /** @availableWhen rotType==bar */
  @property({type: Number}) rotArcExtent: number = 60;
  @property({type: Boolean}) rotPortStarboard: boolean = false;
  /** @availableWhen rotType==bar */
  @property({type: Number}) rotAtZeroDeadband: number = ROT_ZERO_DEADBAND_DEG;
  @property({type: String}) direction: CompassDirection =
    CompassDirection.NorthUp;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  /** Color priority: `Priority.enhanced` uses the blue/enhanced color palette, `Priority.regular` (default) uses the standard palette. */
  @property({type: String}) priority: Priority = Priority.regular;
  /** @availableWhen priority==enhanced */
  @property({type: Array, attribute: false})
  priorityElements: CompassPriorityElement[] = [CompassPriorityElement.hdg];
  /** Show compass NSEW labels and north arrow. */
  @property({type: Boolean}) showLabels: boolean = false;
  /** When true, labels and north arrow are placed inside the outer ring. */
  @property({type: Boolean}) tickmarksInside: boolean = false;
  /**
   * Outer-ring diameter in CSS pixels. When set, the instrument renders at a
   * fixed intrinsic size derived from the ring, arc shape and label reserve —
   * so instruments sharing the same value have identical ring circumference
   * regardless of label width or arc extent (like obc-donut-chart's
   * fixedHeight). When unset (default), the instrument fills its container.
   */
  @property({type: Number, attribute: 'face-diameter'})
  faceDiameter: number | undefined;

  private _headingSp = new SetpointBundle({
    angularWraparound: true,
    onAnimationEnd: () => this.requestUpdate(),
  });

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    this._headingSp.sync({
      setpoint: this.headingSetpoint ?? undefined,
      newSetpoint: this.newHeadingSetpoint,
      atSetpoint: this.atHeadingSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtHeadingSetpoint,
      autoAtSetpointDeadband: this.autoAtHeadingSetpointDeadband,
      setpointAtZeroDeadband: this.headingSetpointAtZeroDeadband,
      setpointOverride: this.headingSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._headingSp.dispose();
  }

  // @ts-expect-error TS6133: The controller ensures that the render
  // function is called on resize of the element
  private _resizeController = new ResizeController(this, {});

  /**
   * Resolved rate of turn in degrees per minute, used to compute the bar
   * extent. Prefers the new physical API; falls back to the deprecated
   * `rotationsPerMinute` so existing consumers keep their visuals during
   * the deprecation window.
   */
  private get _effectiveRotDegPerMin(): number {
    return this.rateOfTurnDegreesPerMinute ?? this.rotationsPerMinute;
  }

  /**
   * Pixel cost of the outside decor: the always-rendered north-arrow glyph
   * plus, only while shown, the NSWE labels (both keep a constant on-screen
   * size via `1/scale` terms). Feeds the frame's width-aware reserve,
   * replacing the former empirical `72 + delta(clientSize)` padding.
   * Wind/current symbols at their default radius are covered by the base
   * padding of 72.
   */
  private getOutsideDecorPx(): number {
    if (this.tickmarksInside) {
      return 0;
    }
    return NORTH_ARROW_WIDTH_PX + (this.showLabels ? NSWE_LABEL_WIDTH_PX : 0);
  }

  /** Whether the host size styles were set by applyPinnedHostSize. */
  private _hostSizePinned = false;
  private _frame: RadialFrame | undefined;

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this._frame,
      this._hostSizePinned
    );
  }

  private get angleAdviceRaw(): AngleAdviceRaw[] {
    return this.headingAdvices.map(({minAngle, maxAngle, hinted, type}) => {
      const state =
        this.heading >= minAngle && this.heading <= maxAngle
          ? AdviceState.triggered
          : hinted
            ? AdviceState.hinted
            : AdviceState.regular;
      return {minAngle, maxAngle, type, state};
    });
  }

  private priorityFor(element: CompassPriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  private colorFor(element: CompassPriorityElement): string | undefined {
    return this.priorityFor(element) === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : undefined;
  }

  private readoutPriorityFor(source: CompassReadoutSource): Priority {
    switch (source) {
      case CompassReadoutSource.hdg:
        return this.priorityFor(CompassPriorityElement.hdg);
      case CompassReadoutSource.cog:
        return this.priorityFor(CompassPriorityElement.cog);
      case CompassReadoutSource.rot:
        return this.priorityFor(CompassPriorityElement.rot);
    }
  }

  private get hasCenterReadouts(): boolean {
    return this.centerReadouts.length > 0;
  }

  private getRotation(): number | undefined {
    if (this.direction === CompassDirection.NorthUp) {
      return undefined;
    } else if (this.direction === CompassDirection.HeadingUp) {
      return -this.heading;
    } else if (this.direction === CompassDirection.CourseUp) {
      return -this.courseOverGround;
    }
    return undefined;
  }

  override render() {
    const tickmarks: Tickmark[] = [
      {angle: 0, type: TickmarkType.main},
      {angle: 90, type: TickmarkType.main},
      {angle: 180, type: TickmarkType.main},
      {angle: 270, type: TickmarkType.main},
    ];

    const frame = computeRadialFrame({
      basePadding: 72,
      labelWidthPx: this.getOutsideDecorPx(),
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
    });
    this._frame = frame;
    const viewBox = frame.viewBox;

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .arcFrame=${frame}
          .advices=${this.angleAdviceRaw}
          .tickmarks=${tickmarks}
          .state=${this.state}
          .watchCircleType=${WatchCircleType.triple}
          .showLabels=${this.showLabels && !frame.labelsHidden}
          .tickmarksInside=${this.tickmarksInside}
          .crosshairEnabled=${true}
          .northArrow=${!frame.labelsHidden}
          .angleSetpoint=${this.headingSetpoint ?? undefined}
          .newAngleSetpoint=${this.newHeadingSetpoint}
          .atAngleSetpoint=${this._headingSp.computeAtSetpoint(this.heading)}
          .angleSetpointAtZeroDeadband=${this.headingSetpointAtZeroDeadband}
          .setpointOverride=${this.headingSetpointOverride}
          .priority=${this.priority}
          .animateSetpoint=${this.animateSetpoint}
          .vessels=${this.hasCenterReadouts
            ? []
            : [
                {
                  size: VesselImageSize.medium,
                  vesselImage: this.vesselImage,
                  transform: `rotate(${this.heading}deg)`,
                },
              ]}
          .windKnots=${this.currentWindSpeedKnots}
          .windFromDirectionDeg=${this.windFromDirection}
          .windColor=${this.colorFor(CompassPriorityElement.wind)}
          .current=${this.currentSpeed}
          .currentFromDirectionDeg=${this.currentFromDirection}
          .currentColor=${this.colorFor(CompassPriorityElement.current)}
          .rotation=${this.getRotation()}
          .rotType=${this.rotType}
          .rotPosition=${this.rotPosition}
          .rotStartAngle=${this.heading + (this.getRotation() ?? 0)}
          .rotEndAngle=${this.heading +
          (this._effectiveRotDegPerMin / (this.rotMaxValue || 1)) *
            this.rotArcExtent +
          (this.getRotation() ?? 0)}
          .rotPriority=${this.priorityFor(CompassPriorityElement.rot)}
          .rotPortStarboard=${this.rotPortStarboard}
          .rotAtZeroDeadband=${this.rotAtZeroDeadband}
          .rateOfTurnDegreesPerMinute=${this.rateOfTurnDegreesPerMinute}
          .rotDotAnimationFactor=${this.rotDotAnimationFactor}
          .rotationsPerMinute=${this.rotationsPerMinute}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">
          ${hdgArrow(
            this.hdgArrowStyle,
            this.heading + (this.getRotation() ?? 0),
            this.priorityFor(CompassPriorityElement.hdg)
          )}
          ${cogArrow(
            this.cogArrowStyle,
            this.courseOverGround + (this.getRotation() ?? 0),
            this.priorityFor(CompassPriorityElement.cog)
          )}
        </svg>
        ${this.hasCenterReadouts
          ? html`<div class="center-readout-overlay">
              ${renderCenterReadouts(
                resolveCompassCenterReadouts(this.centerReadouts, {
                  heading: this.heading,
                  courseOverGround: this.courseOverGround,
                  rateOfTurnDegreesPerMinute: this.rateOfTurnDegreesPerMinute,
                  priorityFor: (source) => this.readoutPriorityFor(source),
                })
              )}
            </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = [
    centerReadoutStyles,
    css`
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

      .center-readout-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass': ObcCompass;
  }
}
