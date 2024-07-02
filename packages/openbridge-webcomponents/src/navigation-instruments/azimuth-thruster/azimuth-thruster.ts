import {LitElement, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Size, InstrumentState} from '../types';
import {thruster} from '../thruster/thruster';
import '../watch/watch';
import componentStyle from './azimuth-thruster.css?inline';
import {ifDefined} from 'lit/directives/if-defined.js';
import {AdviceState, AngleAdvice, AngleAdviceRaw} from '../watch/advice';
import {Tickmark, TickmarkType} from '../watch/tickmark';
import {LinearAdvice} from '../thruster/advice';

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
  @property({type: String}) size: Size = Size.medium;
  @property({type: Number}) angle = 0;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Boolean})
  atAngleSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) disableAutoAtAngleSetpoint: boolean = false;
  @property({type: Number}) autoAtAngleSetpointDeadband: number = 2;

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
      const triggered =
        mapAngle0to360(this.angle) >= mapAngle0to360(advice.minAngle) 
        && mapAngle0to360(this.angle) <= mapAngle0to360(advice.maxAngle);
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

  override render() {
    const rotateAngle = this.angle;

    const watchfaceTicksOn =
      this.state === InstrumentState.active ||
      this.state === InstrumentState.inCommand;

    let tickmarks: Tickmark[] = [];
    if (watchfaceTicksOn) {
      tickmarks = [
        {angle: 0, type: TickmarkType.main},
        {angle: 90, type: TickmarkType.primary},
        {angle: 180, type: TickmarkType.primary},
        {angle: 270, type: TickmarkType.primary},
      ];
    }

    const viewBox = this.noPadding ? '-184 -184 368 368' : '-200 -200 400 400';

    return svg`
      <div class="container">
      <obc-watch 
        .tickmarks=${tickmarks}
        .state=${this.state} 
        .angleSetpoint=${this.angleSetpoint}
        .atAngleSetpoint=${this.atAngleSetpointCalc}
        .padding=${ifDefined(this.noPadding ? 8 : undefined)}
        .advices=${this.angleAdviceRaw}
      ></obc-watch>
      <svg viewBox=${viewBox} xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(${rotateAngle})">
      <svg  width="128" height="320" y ="-160" x="-64" viewBox="-64 -160 128 320">
        ${thruster(this.thrust, this.thrustSetpoint, this.state, {
          atSetpoint: this.atThrustSetpoint,
          singleSided: true,
          tunnel: false,
          autoAtSetpoint: !this.disableAutoAtThrustSetpoint,
          autoSetpointDeadband: this.autoAtThrustSetpointDeadband,
          setpointAtZeroDeadband: this.thrustSetpointAtZeroDeadband,
          touching: this.touching,
          advices: this.thrustAdvices,
        })}
        </svg>
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
