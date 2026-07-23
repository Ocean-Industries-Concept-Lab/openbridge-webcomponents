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
import {VesselImage, VesselImageSize, WatchCircleType} from '../watch/watch.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import {Priority} from '../types.js';
import {customElement} from '../../decorator.js';
export {HdgArrowStyle, CogArrowStyle};
export {CompassReadoutSource};
export type {CompassCenterReadout};

export enum CompassDirection {
  NorthUp = 'northUp',
  HeadingUp = 'headingUp',
  CourseUp = 'courseUp',
}

export enum HeadingPriorityElement {
  hdg = 'hdg',
  cog = 'cog',
}

/**
 * `<obc-heading>` – Heading instrument with HDG/COG arrows over a single-ring
 * watch face, with optional vessel silhouette and center readouts.
 *
 * Renders a circular instrument that displays heading (HDG) and course over
 * ground (COG) as rotating arrows. It supports a heading setpoint with auto
 * at-setpoint detection, advice zones, north-up/heading-up/course-up
 * orientation, an optional vessel image, and center readouts replacing the
 * vessel.
 *
 * ## Features
 *
 * - **Direction modes**: `northUp` (default), `headingUp`, or `courseUp`
 *   via the `direction` property.
 * - **HDG / COG arrows**: Two arrows overlay the watch face, rotating
 *   independently; their look is selected per arrow via `hdgArrowStyle`
 *   (`needle` default, `arrowHead`, `vector`, `beamLine`) and
 *   `cogArrowStyle` (`needle` default, `arrowHead`, `vector`,
 *   `velocityVector`).
 * - **Vessel image**: Optional vessel silhouette via `vesselImage`
 *   (hidden by default), centered and rotating with heading.
 * - **Center readouts**: `centerReadouts` replaces the vessel with up to
 *   three readouts (first on top, the rest below a horizontal divider);
 *   values bind to the instrument's own inputs per entry `source`.
 * - **Heading setpoint**: Optional setpoint marker with auto at-setpoint
 *   detection via `headingSetpoint`, `atHeadingSetpoint`, and deadband
 *   tuning properties.
 * - **Advice zones**: Pass `headingAdvices` to render caution/alert arcs.
 * - **Color priority**: Set `priority` to `Priority.enhanced` and select
 *   the accented elements via `priorityElements`.
 *
 * ## Usage Guidelines
 *
 * - Set `heading` and `courseOverGround` to the current sensor values in
 *   degrees.
 * - Use `obc-compass` instead when rate-of-turn, wind or current overlays
 *   are needed — this instrument is the reduced heading-focused variant.
 *
 * ## Example
 *
 * ```html
 * <obc-heading
 *   heading="45"
 *   courseOverGround="50"
 *   direction="northUp"
 *   headingSetpoint="90"
 * ></obc-heading>
 * ```
 *
 * @ignition-base-height: 512px
 * @ignition-base-width: 512px
 * @stable
 */
@customElement('obc-heading')
export class ObcHeading extends LitElement {
  @property({type: Number}) heading = 0;
  @property({type: Number}) courseOverGround = 0;

  @property({type: Number}) headingSetpoint: number | null = null;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Number}) newHeadingSetpoint: number | undefined;
  /** @availableWhen headingSetpoint!=null && autoAtHeadingSetpoint==false */
  @property({type: Boolean}) atHeadingSetpoint: boolean = false;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Number}) headingSetpointAtZeroDeadband: number = 0.5;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Boolean}) headingSetpointOverride: boolean = false;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Boolean, attribute: false}) autoAtHeadingSetpoint: boolean =
    true;
  /** @availableWhen headingSetpoint!=null && autoAtHeadingSetpoint==true */
  @property({type: Number}) autoAtHeadingSetpointDeadband: number = 2;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Boolean}) animateSetpoint: boolean = false;
  /** @availableWhen headingSetpoint!=null */
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Array, attribute: false}) headingAdvices: AngleAdvice[] = [];
  @property({type: String}) direction: CompassDirection =
    CompassDirection.NorthUp;
  @property({type: String}) priority: Priority = Priority.regular;
  /** @availableWhen priority==enhanced */
  @property({type: Array, attribute: false})
  priorityElements: HeadingPriorityElement[] = [HeadingPriorityElement.hdg];
  /**
   * The vessel silhouette shown in the center, rotating with heading. When
   * unset (default) no vessel is shown; hidden while `centerReadouts` is
   * non-empty.
   */
  @property({type: String}) vesselImage: VesselImage | undefined;
  /**
   * Center readouts replacing the vessel: the first entry renders on top,
   * the rest side by side below a horizontal divider. Values bind per entry
   * `source` (`hdg` → `heading`, `cog` → `courseOverGround`; `rot` has no
   * input on this instrument and renders a dash) and colors follow
   * `priorityElements`.
   */
  @property({type: Array, attribute: false})
  centerReadouts: CompassCenterReadout[] = [];
  /** HDG arrow style: `needle` (default), `arrowHead`, `vector`, or `beamLine`. */
  @property({type: String}) hdgArrowStyle: HdgArrowStyle = HdgArrowStyle.needle;
  /** COG arrow style: `needle` (default), `arrowHead`, `vector`, or `velocityVector`. */
  @property({type: String}) cogArrowStyle: CogArrowStyle = CogArrowStyle.needle;
  /** Show compass NSEW labels. */
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
   * Pixel cost of the outside decor: the always-rendered north-arrow glyph
   * plus, only while shown, the NSWE labels (both keep a constant on-screen
   * size via `1/scale` terms). Feeds the frame's width-aware reserve,
   * replacing the former empirical `72 + delta(clientSize)` padding.
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

  private priorityFor(element: HeadingPriorityElement): Priority {
    const selected = Array.isArray(this.priorityElements)
      ? this.priorityElements
      : [];
    return selected.includes(element) ? this.priority : Priority.regular;
  }

  private readoutPriorityFor(source: CompassReadoutSource): Priority {
    if (source === CompassReadoutSource.hdg) {
      return this.priorityFor(HeadingPriorityElement.hdg);
    }
    if (source === CompassReadoutSource.cog) {
      return this.priorityFor(HeadingPriorityElement.cog);
    }
    return Priority.regular;
  }

  private get hasCenterReadouts(): boolean {
    return this.centerReadouts.length > 0;
  }

  /**
   * The face gains the double-band ring while center content (vessel or
   * readouts) is shown, per the design's vessel/center-label faces.
   */
  private get watchCircleType(): WatchCircleType {
    return this.vesselImage !== undefined || this.hasCenterReadouts
      ? WatchCircleType.double
      : WatchCircleType.single;
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
          .watchCircleType=${this.watchCircleType}
          .vessels=${this.vesselImage !== undefined && !this.hasCenterReadouts
            ? [
                {
                  size: VesselImageSize.medium,
                  vesselImage: this.vesselImage,
                  transform: `rotate(${this.heading}deg)`,
                },
              ]
            : []}
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
          .rotation=${this.getRotation()}
        >
        </obc-watch>
        <svg viewBox="${viewBox}">
          ${hdgArrow(
            this.hdgArrowStyle,
            this.heading + (this.getRotation() ?? 0),
            this.priorityFor(HeadingPriorityElement.hdg)
          )}
          ${cogArrow(
            this.cogArrowStyle,
            this.courseOverGround + (this.getRotation() ?? 0),
            this.priorityFor(HeadingPriorityElement.cog)
          )}
        </svg>
        ${this.hasCenterReadouts
          ? html`<div class="center-readout-overlay">
              ${renderCenterReadouts(
                resolveCompassCenterReadouts(this.centerReadouts, {
                  heading: this.heading,
                  courseOverGround: this.courseOverGround,
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
    'obc-heading': ObcHeading;
  }
}
