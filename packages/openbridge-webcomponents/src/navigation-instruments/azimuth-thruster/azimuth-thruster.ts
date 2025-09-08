import {LitElement, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {InstrumentState} from '../types.js';
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
  @property({type: Number}) angle = 0;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Boolean})
  atAngleSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) disableAutoAtAngleSetpoint: boolean = false;
  @property({type: Number}) autoAtAngleSetpointDeadband: number = 2;
  @property({type: Boolean}) detailedTickmarks: boolean = false;
  @property({type: Number}) labelAngle: number = 45;
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: Number}) thrust = 0;
  @property({type: Number}) thrustSetpoint: number | undefined;
  @property({type: Boolean})
  atThrustSetpoint: boolean = false;
  @property({type: Number}) thrustSetpointAtZeroDeadband: number = 0.1;
  @property({type: Boolean}) disableAutoAtThrustSetpoint: boolean = false;
  @property({type: Number}) autoAtThrustSetpointDeadband: number = 1;
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Number}) loading: number = 0;
  @property({type: Boolean}) noPadding: boolean = false;
  @property({type: Array, attribute: false}) angleAdvices: AngleAdvice[] = [];
  @property({type: Array, attribute: false}) thrustAdvices: LinearAdvice[] = [];
  @property({type: Boolean}) singleDirection: boolean = false;
  @property({type: String}) topPropeller: PropellerType = PropellerType.none;
  @property({type: String}) bottomPropeller: PropellerType = PropellerType.none;
  @property({type: Boolean}) starboardPortIndicator: boolean = false;

  get atAngleSetpointCalc() {
    if (this.angleSetpoint === undefined) {
      return false;
    }

    if (this.touching) {
      return false;
    }

    if (!this.disableAutoAtAngleSetpoint) {
      return (
        Math.abs(this.angle - this.angleSetpoint) <
        this.autoAtAngleSetpointDeadband
      );
    }
    return this.atAngleSetpoint;
  }

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
    if (!this.detailedTickmarks) {
      return [
        {
          angle: 0,
          type: TickmarkType.zeroLine,
          color: 'var(--instrument-frame-tertiary-color)',
        },
        {
          angle: 90,
          type: TickmarkType.primary,
          color: 'var(--instrument-frame-tertiary-color)',
        },
        {
          angle: 180,
          type: TickmarkType.primary,
          color: 'var(--instrument-frame-tertiary-color)',
        },
        {
          angle: 270,
          type: TickmarkType.primary,
          color: 'var(--instrument-frame-tertiary-color)',
        },
      ];
    }
    const tickmarks: Tickmark[] = [
      {
        angle: 0,
        type: TickmarkType.zeroLine,
        text: '0',
        color: 'var(--instrument-frame-tertiary-color)',
      },
    ];
    for (let i = this.labelAngle; i < 360; i += this.labelAngle) {
      const text = i <= 180 ? `${i}` : `${i - 360}`;
      tickmarks.push({
        angle: i,
        type: TickmarkType.primary,
        text,
        color: 'var(--instrument-frame-tertiary-color)',
      });
    }
    const existingTickmarks = tickmarks.map((t) => t.angle);
    for (let i = 0; i < 360; i += 5) {
      if (!existingTickmarks.includes(i)) {
        tickmarks.push({
          angle: i,
          type: TickmarkType.secondary,
          color: 'var(--instrument-tick-mark-secondary-color)',
        });
        existingTickmarks.push(i);
      }
    }
    for (let i = 0; i < 360; i += 1) {
      if (!existingTickmarks.includes(i)) {
        tickmarks.push({
          angle: i,
          type: TickmarkType.tertiary,
          color: 'var(--instrument-tick-mark-secondary-color)',
        });
        existingTickmarks.push(i);
      }
    }
    return tickmarks;
  }

  override render() {
    const rotateAngle = this.angle;

    const tickmarks = this.getTickmarks();

    let viewBox: string;
    if (this.noPadding) {
      viewBox = '-192 -192 384 384';
    } else if (this.detailedTickmarks && !this.tickmarksInside) {
      viewBox = '-236 -236 472 472';
    } else {
      viewBox = '-200 -200 400 400';
    }

    return svg`
      <div class="container">
      <obc-watch 
        .tickmarks=${tickmarks}
        .state=${this.state} 
        .angleSetpoint=${this.angleSetpoint}
        .atAngleSetpoint=${this.atAngleSetpointCalc}
        .tickmarksInside=${this.tickmarksInside}
        .padding=${ifDefined(this.noPadding ? 16 : undefined)}
        .advices=${this.angleAdviceRaw}
        .starboardPortIndicator=${this.starboardPortIndicator}
      ></obc-watch>
      <svg viewBox=${viewBox} xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(${rotateAngle})">
        ${thruster(this.thrust, this.thrustSetpoint, this.state, {
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
        })}
        </g>
        </svg>
      </div>
      </div>
      `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-azimuth-thruster': ObcAzimuthThruster;
  }
}
