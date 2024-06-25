import { LitElement, svg, unsafeCSS, nothing, TemplateResult } from 'lit';
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
    let setPointColor = 'var(--instrument-enhanced-primary-color)';
    if (this.atAngleSetpointCalc) {
      setPointColor = 'var(--instrument-enhanced-secondary-color)';
    }
    if (this.state === InstrumentState.active) {
      setPointColor = 'var(--instrument-regular-primary-color)';
      if (this.atAngleSetpointCalc) {
        setPointColor = 'var(--instrument-regular-secondary-color)';
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

    let angleSetpoint: TemplateResult | typeof nothing = nothing;
    if (this.angleSetpoint === undefined) {
      /* empty */
    } else if (this.state === InstrumentState.inCommand) {
      angleSetpoint = svg`<g transform="rotate(${this.angleSetpoint}) translate(-48 -256) ">
        <path d="M47.1845 88.5803C47.3724 88.8413 47.6744 88.9961 47.9961 88.9961C48.3178 88.9961 48.6198 88.8413 48.8077 88.5803L60.3235 72.5803C61.941 70.333 60.4604 66.9961 57.5926 66.9961L38.3996 66.9961C35.5318 66.9961 34.0512 70.333 35.6686 72.5803L47.1845 88.5803Z" vector-effect="non-scaling-stroke" fill=${setPointColor} stroke="var(--border-silhouette-color)" stroke-width="2" stroke-linejoin="round" />
          </g>
      `;
    } else {
      angleSetpoint = svg`<g transform="rotate(${this.angleSetpoint}) translate(-48 -256) ">
        <path d="M47.1845 92.5842C47.3724 92.8452 47.6744 93 47.9961 93C48.3178 93 48.6198 92.8452 48.8077 92.5842L60.3235 76.5842C61.941 74.3369 60.4604 71 57.5926 71L38.3996 71C35.5318 71 34.0512 74.3369 35.6686 76.5842L47.1845 92.5842ZM52.6318 77L47.9961 83.4408L43.3604 77L52.6318 77Z" vector-effect="non-scaling-stroke" fill=${setPointColor} stroke="var(--border-silhouette-color)" stroke-width="2" stroke-linejoin="round"  />
          </g>
          `;
    }

    return svg`
      <div class="container">
      <obc-watch ?hideAllTickmarks=${!watchfaceTicksOn} ?off=${this.state === InstrumentState.off
      }
        padding=${ifDefined(this.noPadding ? 8 : undefined)}
      ></obc-watch>
      <svg viewBox=${viewBox} xmlns="http://www.w3.org/2000/svg">
         ${angleSetpoint}
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
