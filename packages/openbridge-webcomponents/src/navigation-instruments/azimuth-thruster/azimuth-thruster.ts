import {html, LitElement, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {
  applyPinnedHostSize,
  computeRadialFrame,
  estimateLabelWidthPx,
  measureContainerPx,
  observeInnerBox,
  type RadialFrame,
} from '../../svghelpers/radial-frame.js';
import {InstrumentState, Priority} from '../types.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import {thruster} from '../thruster/thruster.js';
import '../watch/watch.js';
import componentStyle from './azimuth-thruster.css?inline';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {Tickmark, TickmarkStyle, TickmarkType} from '../watch/tickmark.js';
import {LinearAdvice} from '../thruster/advice.js';
import {PropellerType} from '../thruster/propeller.js';
import {customElement} from '../../decorator.js';
import {
  hasPortStarboardElement,
  PORT_STARBOARD_DEFAULT_ELEMENTS,
  PortStarboardSides,
  PortStarboardElement,
  type PortStarboardSign,
  portStarboardSignOf,
  PortStarboardSource,
  portStarboardSourceSign,
} from '../../svghelpers/port-starboard.js';

function mapAngle0to360(angle: number): number {
  const a = angle % 360;
  if (a >= 0) {
    return a;
  } else {
    return a + 360;
  }
}

/**
 * @availableWhen newAngleSetpoint angleSetpoint!=undefined
 * @availableWhen atAngleSetpoint angleSetpoint!=undefined && autoAtAngleSetpoint==false
 * @availableWhen angleSetpointAtZeroDeadband angleSetpoint!=undefined
 * @availableWhen angleSetpointOverride angleSetpoint!=undefined
 * @availableWhen touching angleSetpoint!=undefined || thrustSetpoint!=undefined
 * @availableWhen autoAtAngleSetpoint angleSetpoint!=undefined
 * @availableWhen autoAtAngleSetpointDeadband angleSetpoint!=undefined && autoAtAngleSetpoint==true
 * @availableWhen animateSetpoint angleSetpoint!=undefined || thrustSetpoint!=undefined
 * @property primaryTickmarkInterval - Interval (in degrees) for primary tickmarks.
 *   When undefined or <= 0, no primary tickmarks are shown (only the zero line).
 *   Default 90 gives ticks at 0°, 90°, 180°, 270°.
 * @property secondaryTickmarkInterval - Interval (in degrees) for secondary tickmarks.
 *   When undefined or <= 0, no secondary tickmarks are shown.
 * @property tertiaryTickmarkInterval - Interval (in degrees) for tertiary tickmarks.
 *   When undefined or <= 0, no tertiary tickmarks are shown.
 * @availableWhen newThrustSetpoint thrustSetpoint!=undefined
 * @availableWhen atThrustSetpoint thrustSetpoint!=undefined && autoAtThrustSetpoint==false
 * @availableWhen thrustSetpointAtZeroDeadband thrustSetpoint!=undefined
 * @availableWhen thrustSetpointOverride thrustSetpoint!=undefined
 * @availableWhen autoAtThrustSetpoint thrustSetpoint!=undefined
 * @availableWhen autoAtThrustSetpointDeadband thrustSetpoint!=undefined && autoAtThrustSetpoint==true
 * @property faceDiameter - Outer-ring diameter in CSS pixels. When set, the instrument renders at a
 *   fixed intrinsic size derived from the ring, arc shape and label reserve —
 *   so instruments sharing the same value have identical ring circumference
 *   regardless of label width or arc extent (like obc-donut-chart's
 *   fixedHeight). When unset (default), the instrument fills its container.
 * @property portStarboard - Enables the maritime PORT/STBD (red/green) color mode: the face is split
 *   green (starboard) / red (port), and forward thrust renders green, reverse
 *   red. Additional to `priority`, and independent of
 *   `starboardPortIndicator` — both may be enabled together.
 * @property portStarboardElements - Which parts take part while `portStarboard` is on.
 *   Defaults to everything except the setpoint.
 * @availableWhen portStarboardElements portStarboard==true
 * @property portStarboardSides - Which halves the region tints paint while `portStarboard` is on.
 * @availableWhen portStarboardSides portStarboard==true
 * @stable
 */
@customElement('obc-azimuth-thruster')
export class ObcAzimuthThruster extends LitElement {
  private _thrustSetpointId = `azimuth-thrust-sp-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: Number}) angle = 0;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Number}) newAngleSetpoint: number | undefined;
  @property({type: Boolean})
  atAngleSetpoint: boolean = false;
  @property({type: Number}) angleSetpointAtZeroDeadband: number = 0.5;
  @property({type: Boolean}) angleSetpointOverride: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean, attribute: false}) autoAtAngleSetpoint: boolean =
    true;
  @property({type: Number}) autoAtAngleSetpointDeadband: number = 2;
  @property({type: Boolean}) animateSetpoint: boolean = false;
  @property({type: Number}) primaryTickmarkInterval: number | undefined = 90;
  @property({type: Number}) secondaryTickmarkInterval: number | undefined =
    undefined;
  @property({type: Number}) tertiaryTickmarkInterval: number | undefined =
    undefined;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: Number}) thrust = 0;
  @property({type: Number}) thrustSetpoint: number | undefined;
  @property({type: Number}) newThrustSetpoint: number | undefined;
  @property({type: Boolean})
  atThrustSetpoint: boolean = false;
  @property({type: Number}) thrustSetpointAtZeroDeadband: number = 0.1;
  @property({type: Boolean}) thrustSetpointOverride: boolean = false;
  @property({type: Boolean, attribute: false}) autoAtThrustSetpoint: boolean =
    true;
  @property({type: Number}) autoAtThrustSetpointDeadband: number = 1;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;

  private _angleSp = new SetpointBundle({
    angularWraparound: true,
    onAnimationEnd: () => this.requestUpdate(),
  });
  private _thrustSp = new SetpointBundle({
    defaultDeadband: 1,
    defaultZeroDeadband: 0.1,
    onAnimationEnd: () => this.requestUpdate(),
  });

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    // Sync public prefixed props → bundles
    this._angleSp.sync({
      setpoint: this.angleSetpoint,
      newSetpoint: this.newAngleSetpoint,
      atSetpoint: this.atAngleSetpoint,
      touching: this.touching,
      autoAtSetpoint: this.autoAtAngleSetpoint,
      autoAtSetpointDeadband: this.autoAtAngleSetpointDeadband,
      setpointAtZeroDeadband: this.angleSetpointAtZeroDeadband,
      setpointOverride: this.angleSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
    this._thrustSp.sync({
      setpoint: this.thrustSetpoint,
      newSetpoint: this.newThrustSetpoint,
      touching: this.touching,
      atSetpoint: this.atThrustSetpoint,
      autoAtSetpoint: this.autoAtThrustSetpoint,
      autoAtSetpointDeadband: this.autoAtThrustSetpointDeadband,
      setpointAtZeroDeadband: this.thrustSetpointAtZeroDeadband,
      setpointOverride: this.thrustSetpointOverride,
      animateSetpoint: this.animateSetpoint,
    });
  }
  @property({type: Number}) loading: number = 0;
  @property({type: Boolean, attribute: false}) hasLabelSpacer: boolean = true;
  @property({type: Array, attribute: false}) angleAdvices: AngleAdvice[] = [];
  @property({type: Array, attribute: false}) thrustAdvices: LinearAdvice[] = [];
  @property({type: Boolean}) singleDirection: boolean = false;
  @property({type: String}) topPropeller: PropellerType = PropellerType.none;
  @property({type: String}) bottomPropeller: PropellerType = PropellerType.none;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Boolean}) starboardPortIndicator: boolean = false;
  @property({type: Boolean}) portStarboard: boolean = false;
  @property({type: Array, attribute: false})
  portStarboardElements: PortStarboardElement[] = [
    ...PORT_STARBOARD_DEFAULT_ELEMENTS,
  ];
  /**
   * Which quantity decides the side: the thrust alone (`value`, the default —
   * green ahead, red astern), the pod orientation alone (`orientation`), or the
   * two combined into the direction actually being pushed (`resultant`).
   *
   * @availableWhen portStarboard==true
   * @experimental
   */
  @property({type: String}) portStarboardSource: PortStarboardSource =
    PortStarboardSource.value;
  @property({type: String}) portStarboardSides: PortStarboardSides =
    PortStarboardSides.both;
  @property({type: Number, attribute: 'face-diameter'})
  faceDiameter: number | undefined;

  private _frame: RadialFrame | undefined;

  /** Whether the host size styles were set by applyPinnedHostSize. */
  private _hostSizePinned = false;

  private _resizeController = new ResizeController(this, {});

  override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    observeInnerBox(this._resizeController, this.renderRoot);
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._hostSizePinned = applyPinnedHostSize(
      this,
      this._frame,
      this._hostSizePinned
    );
  }

  private get angleAdviceRaw(): AngleAdviceRaw[] {
    return this.angleAdvices.map((advice) => {
      const triggered =
        this.angleSetpoint !== undefined &&
        mapAngle0to360(this.angleSetpoint - advice.minAngle) < 180 &&
        mapAngle0to360(this.angleSetpoint - advice.maxAngle) > 180;
      let state: AdviceState;
      if (triggered) {
        state = AdviceState.triggered;
      } else if (advice.hinted) {
        state = AdviceState.hinted;
      } else {
        state = AdviceState.regular;
      }
      return {
        minAngle: advice.minAngle,
        maxAngle: advice.maxAngle,
        type: advice.type,
        state,
      };
    });
  }

  /**
   * Which half of the dial the angle setpoint sits in: starboard for
   * (0°, 180°), port for (180°, 360°), neutral exactly fore or aft.
   */
  private get angleSetpointPortStarboardSign(): PortStarboardSign {
    if (
      this.angleSetpoint === undefined ||
      !Number.isFinite(this.angleSetpoint)
    ) {
      return 0;
    }
    const angle = mapAngle0to360(this.angleSetpoint);
    if (angle === 0 || angle === 180) return 0;
    return angle < 180 ? 1 : -1;
  }

  /**
   * The side this instrument reads as, per {@link portStarboardSource}. Drives
   * the thrust bar and, through `portStarboardSides="active"`, the face and
   * band tints. The setpoint markers keep deriving from their own quantity —
   * the angle setpoint from where it sits on the dial, the thrust setpoint from
   * its own sign.
   */
  private get portStarboardValueSign(): PortStarboardSign {
    return portStarboardSourceSign(
      this.portStarboardSource,
      this.angle,
      this.thrust
    );
  }

  /** Thrust-setpoint sign, gated on the `setpoint` element opt-in. */
  private get thrustSetpointPortStarboardSign(): PortStarboardSign {
    return hasPortStarboardElement(
      this.portStarboard,
      this.portStarboardElements,
      PortStarboardElement.setpoint
    )
      ? portStarboardSignOf(this.thrustSetpoint)
      : 0;
  }

  private getTickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    const skipAngles: number[] = [];

    // Helper for signed label text (0-180 positive, 181-359 negative)
    const labelText = (angle: number): string | undefined => {
      if (!this.showLabels) return undefined;
      return angle <= 180 ? `${angle}` : `${angle - 360}`;
    };

    // Always add the zero line
    tickmarks.push({
      angle: 0,
      type: TickmarkType.zeroLine,
      text: this.showLabels ? '0' : undefined,
    });
    skipAngles.push(0);

    // Primary tickmarks — skip when undefined or <= 0 to prevent infinite loops
    const primaryInterval = this.primaryTickmarkInterval;
    if (
      primaryInterval !== undefined &&
      primaryInterval > 0 &&
      Number.isFinite(primaryInterval)
    ) {
      for (let i = primaryInterval; i < 360; i += primaryInterval) {
        if (skipAngles.includes(i)) continue;
        tickmarks.push({
          angle: i,
          type: TickmarkType.primary,
          text: labelText(i),
        });
        skipAngles.push(i);
      }
    }

    // Secondary tickmarks — skip when undefined or <= 0
    const secondaryInterval = this.secondaryTickmarkInterval;
    if (
      secondaryInterval !== undefined &&
      secondaryInterval > 0 &&
      Number.isFinite(secondaryInterval)
    ) {
      for (let i = 0; i < 360; i += secondaryInterval) {
        if (skipAngles.includes(i)) continue;
        tickmarks.push({
          angle: i,
          type: TickmarkType.secondary,
        });
        skipAngles.push(i);
      }
    }

    // Tertiary tickmarks — skip when undefined or <= 0
    const tertiaryInterval = this.tertiaryTickmarkInterval;
    if (
      tertiaryInterval !== undefined &&
      tertiaryInterval > 0 &&
      Number.isFinite(tertiaryInterval)
    ) {
      for (let i = 0; i < 360; i += tertiaryInterval) {
        if (skipAngles.includes(i)) continue;
        tickmarks.push({
          angle: i,
          type: TickmarkType.tertiary,
        });
        skipAngles.push(i);
      }
    }

    return tickmarks;
  }

  override render() {
    const rotateAngle = this.angle;

    const tickmarks = this.getTickmarks();

    const frame = computeRadialFrame({
      basePadding: this.hasLabelSpacer ? 24 : 16,
      labelWidthPx:
        this.hasLabelSpacer && !this.tickmarksInside
          ? estimateLabelWidthPx(tickmarks.map((t) => t.text))
          : 0,
      containerPx: measureContainerPx(this),
      faceDiameter: this.faceDiameter,
    });
    this._frame = frame;
    const shownTickmarks = frame.labelsHidden
      ? tickmarks.map((t) => ({...t, text: undefined}))
      : tickmarks;
    const viewBox = frame.viewBox;

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .arcFrame=${frame}
          .tickmarks=${shownTickmarks}
          .state=${this.state}
          .priority=${this.priority}
          .angleSetpoint=${this.angleSetpoint}
          .newAngleSetpoint=${this.newAngleSetpoint}
          .atAngleSetpoint=${this._angleSp.computeAtSetpoint(this.angle)}
          .angleSetpointAtZeroDeadband=${this.angleSetpointAtZeroDeadband}
          .setpointOverride=${this.angleSetpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .tickmarksInside=${this.tickmarksInside}
          .tickmarkStyle=${this.tickmarkStyle}
          .advices=${this.angleAdviceRaw}
          .starboardPortIndicator=${this.starboardPortIndicator}
          .portStarboard=${this.portStarboard}
          .portStarboardElements=${this.portStarboardElements}
          .portStarboardSides=${this.portStarboardSides}
          .portStarboardValueSign=${this.portStarboardValueSign}
          .setpointPortStarboardSign=${this.angleSetpointPortStarboardSign}
        ></obc-watch>
        <svg viewBox=${viewBox} xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(${rotateAngle})">
            ${thruster(
              this.thrust,
              this.thrustSetpoint,
              this.state,
              this.priority,
              {
                atSetpoint: this.atThrustSetpoint,
                singleSided: true,
                singleDirection: false,
                singleDirectionHalfSize: this.singleDirection,
                tunnel: false,
                autoAtSetpoint: this.autoAtThrustSetpoint,
                autoAtSetpointDeadband: this.autoAtThrustSetpointDeadband,
                setpointAtZeroDeadband: this.thrustSetpointAtZeroDeadband,
                touching: this.touching,
                advices: this.thrustAdvices,
                topPropeller: this.topPropeller,
                bottomPropeller: this.bottomPropeller,
                narrow: true,
                newSetpoint: this.newThrustSetpoint,
                setpointId: this._thrustSetpointId,
                animateSetpoint: this.animateSetpoint,
                departingNewSetpoint: this._thrustSp.departingNewSetpoint,
                setpointOverride: this.thrustSetpointOverride,
                portStarboard: {
                  enabled: this.portStarboard,
                  elements: this.portStarboardElements,
                  sign: this.portStarboardValueSign,
                },
                portStarboardSetpointSign: this.thrustSetpointPortStarboardSign,
              }
            )}
          </g>
        </svg>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._angleSp.dispose();
    this._thrustSp.dispose();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-azimuth-thruster': ObcAzimuthThruster;
  }
}
