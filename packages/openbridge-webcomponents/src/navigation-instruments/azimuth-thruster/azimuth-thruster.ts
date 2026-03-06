import {html, LitElement, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {InstrumentState, Priority} from '../types.js';
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';
import {thruster} from '../thruster/thruster.js';
import '../watch/watch.js';
import componentStyle from './azimuth-thruster.css?inline';
import {ifDefined} from 'lit/directives/if-defined.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {LinearAdvice} from '../thruster/advice.js';
import {PropellerType} from '../thruster/propeller.js';
import {customElement} from '../../decorator.js';

function mapAngle0to360(angle: number): number {
  const a = angle % 360;
  if (a >= 0) {
    return a;
  } else {
    return a + 360;
  }
}

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
  @property({type: Boolean}) disableAutoAtAngleSetpoint: boolean = false;
  @property({type: Number}) autoAtAngleSetpointDeadband: number = 2;
  @property({type: Boolean}) animateSetpoint: boolean = false;
  /**
   * Interval (in degrees) for primary tickmarks.
   * When undefined or <= 0, no primary tickmarks are shown (only the zero line).
   * Default 90 gives ticks at 0°, 90°, 180°, 270°.
   */
  @property({type: Number}) primaryTickmarkInterval: number | undefined = 90;
  /**
   * Interval (in degrees) for secondary tickmarks.
   * When undefined or <= 0, no secondary tickmarks are shown.
   */
  @property({type: Number}) secondaryTickmarkInterval: number | undefined =
    undefined;
  /**
   * Interval (in degrees) for tertiary tickmarks.
   * When undefined or <= 0, no tertiary tickmarks are shown.
   */
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
  @property({type: Boolean}) disableAutoAtThrustSetpoint: boolean = false;
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
      disableAutoAtSetpoint: this.disableAutoAtAngleSetpoint,
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
      disableAutoAtSetpoint: this.disableAutoAtThrustSetpoint,
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
  @property({type: Boolean}) starboardPortIndicator: boolean = false;

  private get angleAdviceRaw(): AngleAdviceRaw[] {
    return this.angleAdvices.map((advice) => {
      let triggered = false;

      triggered =
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
      color: 'var(--instrument-frame-tertiary-color)',
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
          color: 'var(--instrument-frame-tertiary-color)',
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
          color: 'var(--instrument-tick-mark-secondary-color)',
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
          color: 'var(--instrument-tick-mark-secondary-color)',
        });
        skipAngles.push(i);
      }
    }

    return tickmarks;
  }

  override render() {
    const rotateAngle = this.angle;

    const tickmarks = this.getTickmarks();

    let viewBox: string;
    if (!this.hasLabelSpacer) {
      viewBox = '-192 -192 384 384';
    } else if (this.showLabels && !this.tickmarksInside) {
      viewBox = '-236 -236 472 472';
    } else {
      viewBox = '-200 -200 400 400';
    }

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .tickmarks=${tickmarks}
          .state=${this.state}
          .priority=${this.priority}
          .angleSetpoint=${this.angleSetpoint}
          .newAngleSetpoint=${this.newAngleSetpoint}
          .atAngleSetpoint=${this._angleSp.computeAtSetpoint(this.angle)}
          .angleSetpointAtZeroDeadband=${this.angleSetpointAtZeroDeadband}
          .setpointOverride=${this.angleSetpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .tickmarksInside=${this.tickmarksInside}
          padding=${ifDefined(!this.hasLabelSpacer ? 16 : undefined)}
          .advices=${this.angleAdviceRaw}
          .starboardPortIndicator=${this.starboardPortIndicator}
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
                autoAtSetpoint: !this.disableAutoAtThrustSetpoint,
                autoSetpointDeadband: this.autoAtThrustSetpointDeadband,
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
