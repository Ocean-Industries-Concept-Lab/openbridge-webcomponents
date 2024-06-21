import { LitElement, svg, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Size, InstrumentState } from '../types';
import { thruster } from '../thruster/thruster';
import '../watch/watch';
import componentStyle from './azimuth-thruster.css?inline';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('obc-azimuth-thruster')
export class ObcAzimuthThruster extends LitElement {
  @property({ type: String }) size: Size = Size.medium;
  @property({ type: Number }) angle = 0;
  @property({ type: Number }) angleSetpoint: number | undefined;
  @property({ type: Boolean })
  atAngleSetpoint: boolean = false;
  @property({ type: Boolean }) touching: boolean = false;
  @property({ type: Boolean }) disableAutoAtAngleSetpoint: boolean = false;
  @property({ type: Number }) autoAtAngleSetpointDeadband: number = 2;

  @property({ type: Number }) thrust = 0;
  @property({ type: Number }) thrustSetpoint: number | undefined;
  @property({ type: Boolean })
  atThrustSetpoint: boolean = false;
  @property({ type: Number }) thrustSetpointAtZeroDeadband: number = 0.1;
  @property({ type: Boolean }) disableAutoAtThrustSetpoint: boolean = false;
  @property({ type: Number }) autoAtThrustSetpointDeadband: number = 1;
  @property({ type: String }) state: InstrumentState = InstrumentState.inCommand;
  @property({ type: Number }) loading: number = 0;
  @property({ type: Boolean }) noPadding: boolean = false;

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

  override render() {
    const rotateAngle = this.angle;
    let setPointColor = 'var(--instrument-enhanced-secondary-color)';
    if (this.atAngleSetpointCalc) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    }
    if (this.state === InstrumentState.active) {
      setPointColor = 'var(--instrument-regular-secondary-color)';
      if (this.atAngleSetpointCalc) {
        setPointColor = 'var(--instrument-frame-tertiary-color)';
      }
    } else if (this.state === InstrumentState.loading) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    } else if (this.state === InstrumentState.off) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    }

    const watchfaceTicksOn =
      this.state === InstrumentState.active ||
      this.state === InstrumentState.inCommand;

    const viewBox = this.noPadding ? '-184 -184 368 368' : '-200 -200 400 400';

    return svg`
      <div class="container">
      <obc-watch ?hideAllTickmarks=${!watchfaceTicksOn} ?off=${this.state === InstrumentState.off
      }
        padding=${ifDefined(this.noPadding ? 8 : undefined)}
      ></obc-watch>
      <svg viewBox=${viewBox} xmlns="http://www.w3.org/2000/svg">
        ${this.angleSetpoint !== undefined
        ? svg`
            <g transform="rotate(${this.angleSetpoint}) translate(-12 -192) ">
              <path d="M11.1999 28.6018C11.3887 28.8537 11.6852 29.002 12 29.002C12.3148 29.002 12.6113 28.8537 12.8001 28.6018L22.3966 15.8018C23.879 13.8246 22.4692 11.002 19.9971 11.002L4.0029 11.002C1.53076 11.002 0.121035 13.8246 1.60338 15.8018L11.1999 28.6018Z" vector-effect="non-scaling-stroke" fill=${setPointColor} stroke="#F7F7F7" stroke-width="2" stroke-linejoin="round"/>
            </g>
        `
        : null
      }
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
