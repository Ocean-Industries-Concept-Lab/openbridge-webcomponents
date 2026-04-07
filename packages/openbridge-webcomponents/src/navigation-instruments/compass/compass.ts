import {LitElement, PropertyValues, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../watch/watch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {arrow, ArrowStyle} from './arrow.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  RotType,
  RotPosition,
} from '../watch/watch.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import {customElement} from '../../decorator.js';
import {InstrumentState, Priority} from '../types.js';
export {RotType};

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
 * - **Rate of turn**: Animated ROT indicator driven by `rotationsPerMinute`.
 *   Supports spinning dots (`rotType="dots"`) and a banana-shaped arc bar
 *   (`rotType="bar"`) showing the HDG→COG span. Position on the outer
 *   scale ring or inner circle via `rotPosition`.
 * - **Environmental overlays**: Wind speed/direction and current
 *   speed/direction indicators on the watch face.
 * - **Vessel image**: Configurable vessel silhouette centered on the
 *   compass, rotating with heading.
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
 * - Set `windSpeed` / `windFromDirection` and `currentSpeed` /
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
 * @property {number} heading - The current heading of the vessel in degrees.
 * @property {number} courseOverGround - The current course over ground in degrees.
 * @property {number | null} headingSetpoint - The set point for the heading in degrees.
 * @property {boolean} atHeadingSetpoint - Indicates if the vessel is at the heading set point.
 * @property {boolean} autoAtHeadingSetpoint - Enables automatic at heading set point calculation.
 * @property {number} autoAtHeadingSetpointDeadband - The deadband for the heading set point in degrees.
 * @property {boolean} touching - Indicates if the compass is being touched.
 * @property {Array<AngleAdvice>} headingAdvices - An array of angle advices for the compass.
 * @property {number | null} windSpeed - The wind speed in beaufort scale number.
 * @property {number | null} windFromDirection - The direction the wind is coming from in degrees.
 * @property {number | null} currentSpeed - The current speed, number of arrows.
 * @property {number | null} currentFromDirection - The direction the current is coming from in degrees.
 * @property {VesselImage} vesselImage - The image of the vessel.
 * @property {number} rotationsPerMinute - The number of rotations per minute for the rate of turn controller.
 * @property {RotType} rotType - ROT display mode: `'dots'` (spinning dots, default) or `'bar'` (arc bar from HDG to COG).
 * @property {RotPosition} rotPosition - ROT track position: `'innerCircle'` (default) or `'scale'` (on the outer ring).
 * @property {Priority} priority - Color priority: `Priority.enhanced` uses the blue/enhanced color palette, `Priority.regular` (default) uses the standard palette.
 *
 * @ignition-base-height: 512px
 * @ignition-base-width: 512px
 */
@customElement('obc-compass')
export class ObcCompass extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;

  @property({type: Number}) headingSetpoint: number | null = null;
  @property({type: Number}) newHeadingSetpoint: number | undefined;
  @property({type: Boolean}) atHeadingSetpoint: boolean = false;
  @property({type: Number}) headingSetpointAtZeroDeadband: number = 0.5;
  @property({type: Boolean}) headingSetpointOverride: boolean = false;
  @property({type: Boolean, attribute: false}) autoAtHeadingSetpoint: boolean =
    true;
  @property({type: Number}) autoAtHeadingSetpointDeadband: number = 2;
  @property({type: Boolean}) animateSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];
  @property({type: Number}) windSpeed: number | null = null;
  @property({type: Number}) windFromDirection: number | null = null;
  @property({type: Number}) currentSpeed: number | null = null;
  @property({type: Number}) currentFromDirection: number | null = null;
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  @property({type: Number}) rotationsPerMinute: number = 1;
  @property({type: String}) rotType: RotType = RotType.dots;
  @property({type: String}) rotPosition: RotPosition = RotPosition.innerCircle;
  @property({type: Number}) rotMaxValue: number = 10;
  @property({type: Number}) rotArcExtent: number = 60;
  @property({type: String}) direction: CompassDirection =
    CompassDirection.NorthUp;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array, attribute: false})
  priorityElements: CompassPriorityElement[] = [CompassPriorityElement.hdg];
  /** Show compass NSEW labels and north arrow. */
  @property({type: Boolean}) showLabels: boolean = false;
  /** When true, labels and north arrow are placed inside the outer ring. */
  @property({type: Boolean}) tickmarksInside: boolean = false;

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

  private getPadding() {
    const size = Math.min(this.clientHeight, this.clientWidth);
    const deltaWidth = 512 - size;
    const steps = deltaWidth / 128;
    let deltaPadding;
    if (deltaWidth > 0) {
      deltaPadding = steps * 48;
    } else {
      deltaPadding = steps * 6;
    }

    return 72 + deltaPadding;
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

    const padding = this.getPadding();
    const width = (176 + padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .padding=${padding}
          .advices=${this.angleAdviceRaw}
          .tickmarks=${tickmarks}
          .state=${this.state}
          .watchCircleType=${WatchCircleType.triple}
          .showLabels=${this.showLabels}
          .tickmarksInside=${this.tickmarksInside}
          .crosshairEnabled=${true}
          .northArrow=${true}
          .angleSetpoint=${this.headingSetpoint ?? undefined}
          .newAngleSetpoint=${this.newHeadingSetpoint}
          .atAngleSetpoint=${this._headingSp.computeAtSetpoint(this.heading)}
          .angleSetpointAtZeroDeadband=${this.headingSetpointAtZeroDeadband}
          .setpointOverride=${this.headingSetpointOverride}
          .priority=${this.priority}
          .animateSetpoint=${this.animateSetpoint}
          .vessels=${[
            {
              size: VesselImageSize.medium,
              vesselImage: this.vesselImage,
              transform: `rotate(${this.heading}deg)`,
            },
          ]}
          .wind=${this.windSpeed}
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
          (this.rotationsPerMinute / (this.rotMaxValue || 1)) *
            this.rotArcExtent +
          (this.getRotation() ?? 0)}
          .rotPriority=${this.priorityFor(CompassPriorityElement.rot)}
          .rotationsPerMinute=${this.rotationsPerMinute}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">
          ${arrow(
            ArrowStyle.HDG,
            this.heading + (this.getRotation() ?? 0),
            this.priorityFor(CompassPriorityElement.hdg)
          )}
          ${arrow(
            ArrowStyle.COG,
            this.courseOverGround + (this.getRotation() ?? 0),
            this.priorityFor(CompassPriorityElement.cog)
          )}
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

    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass': ObcCompass;
  }
}
