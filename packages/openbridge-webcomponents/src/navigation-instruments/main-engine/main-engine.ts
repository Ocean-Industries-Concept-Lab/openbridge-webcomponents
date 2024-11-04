import {LitElement, html, unsafeCSS, svg, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './main-engine.css?inline';
import {InstrumentState} from '../types';
import {
  atSetpoint,
  convertThrustAdvices,
  thrusterColors,
  thrusterTopSingleSided,
  setpointSvg,
} from '../thruster/thruster';
import {LinearAdvice} from '../thruster/advice';

@customElement('obc-main-engine')
export class ObcMainEngine extends LitElement {
  @property({type: Number}) thrust: number = 0;
  @property({type: Number}) thrustSetpoint: number | undefined;
  @property({type: Boolean}) thrustTouching: boolean = false;
  @property({type: Boolean}) atThrustSetpoint: boolean = false;
  @property({type: Number}) speed: number = 0;
  @property({type: Number}) speedSetpoint: number | undefined;
  @property({type: Boolean}) speedTouching: boolean = false;
  @property({type: Boolean}) atSpeedSetpoint: boolean = false;
  @property({type: Boolean}) disableAutoAtThrustSetpoint: boolean = false;
  @property({type: Boolean}) disableAutoAtSpeedSetpoint: boolean = false;
  @property({type: Number}) autoAtThrustSetpointDeadband: number = 1;
  @property({type: Number}) autoAtSpeedSetpointDeadband: number = 1;
  @property({type: Number}) thrustSetpointAtZeroDeadband: number = 0.5;
  @property({type: Number}) speedSetpointAtZeroDeadband: number = 0.5;
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Array}) thrustAdvices: LinearAdvice[] = [];

  override render() {
    const thrustSetpointAtZero =
      Math.abs(this.thrustSetpoint || 0) < this.thrustSetpointAtZeroDeadband;
    const speedSetpointAtZero =
      Math.abs(this.speedSetpoint || 0) < this.speedSetpointAtZeroDeadband;
    const thrustAtSetpoint = atSetpoint(this.thrust, this.thrustSetpoint, {
      atSetpoint: this.atThrustSetpoint,
      autoAtSetpoint: !this.disableAutoAtThrustSetpoint,
      autoSetpointDeadband: this.autoAtThrustSetpointDeadband,
      touching: this.thrustTouching,
    });
    const cThrust = thrusterColors(
      {
        atSetpoint: thrustAtSetpoint,
        touching: this.thrustTouching,
      },
      this.state
    );
    const speedAtSetpoint = atSetpoint(this.speed, this.speedSetpoint, {
      atSetpoint: this.atSpeedSetpoint,
      autoAtSetpoint: !this.disableAutoAtSpeedSetpoint,
      autoSetpointDeadband: this.autoAtSpeedSetpointDeadband,
      touching: this.speedTouching,
    });
    const cSpeed = thrusterColors(
      {
        atSetpoint: speedAtSetpoint,
        touching: this.speedTouching,
      },
      this.state
    );
    const container = svg`<rect x="-80" y="-176" width="160" height="352" fill="var(--instrument-frame-primary-color)" stroke="var(--instrument-frame-tertiary-color)" rx="8"/>`;
    const border = svg`<rect x="-80" y="-176" width="160" height="352" fill="none" stroke="var(--instrument-frame-tertiary-color)" rx="8" vector-effect="non-scaling-stroke"/>`;
    const frameLeft = svg`<rect x="-56" y="-176" width="48" height="352" fill="var(--instrument-frame-secondary-color)" vector-effect="non-scaling-stroke" stroke="var(--instrument-frame-secondary-color)"/>`;
    const frameRight = svg`<rect x="8" y="-176" width="48" height="352" fill="var(--instrument-frame-secondary-color)" vector-effect="non-scaling-stroke" stroke="var(--instrument-frame-secondary-color)"/>`;
    const thrustCenter = svg`<rect x="8" y="-2" height="4" width="72" fill="${cThrust.zeroLineColor}" stroke=${cThrust.zeroLineColor} vector-effect="non-scaling-stroke"/>`;
    const {topAdvices: topThrustAdvice, bottomAdvices: bottomThrustAdvice} =
      convertThrustAdvices(this.thrustAdvices, this.thrust);
    const thrustTop = svg`<g transform="translate(44, 0)">
      ${thrusterTopSingleSided(
        174,
        Math.max(this.thrust, 0),
        {box: cThrust.boxColor, container: ''},
        {
          hideContainer: true,
          hideTicks: cThrust.hideTicks,
          flipAdicePattern: false,
          narrow: false,
        },
        topThrustAdvice
      )}</g>`;
    const thrusterBottom = svg`<g transform="rotate(180) scale(-1,1) translate(44)">
     ${thrusterTopSingleSided(
       174,
       Math.max(-this.thrust, 0),
       {box: cThrust.boxColor, container: ''},
       {
         hideContainer: true,
         hideTicks: cThrust.hideTicks,
         flipAdicePattern: false,
         narrow: false,
       },
       bottomThrustAdvice
     )}</g>`;
    const thrustSetpoint =
      this.thrustSetpoint !== undefined
        ? svg`<g transform="translate(44, 0)">${setpointSvg(
            174,
            this.thrustSetpoint,
            thrustSetpointAtZero,
            {
              fill: cThrust.setPointColor,
              stroke: 'var(--border-silhouette-color)',
            },
            {
              inCommand: this.state === InstrumentState.inCommand,
              singleSided: true,
              narrow: false,
            }
          )}</g>`
        : nothing;

    const speedHeight = 352 * (this.speed / 100) + 2;
    const speedY = 176 - speedHeight;
    const speedBoxColor =
      this.state === InstrumentState.inCommand
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)';
    const speedBox = svg`<rect x="-56" y=${speedY} width="48" height=${speedHeight} fill=${speedBoxColor} stroke=${speedBoxColor} vector-effect="non-scaling-stroke">`;
    const speedLine = svg`<rect x="-56" y=${speedY - 2} width="48" height="4" rx="2" fill=${cSpeed.boxColor} stroke=${cSpeed.boxColor}/>
`;
    const speedSetpoint =
      this.speedSetpoint !== undefined
        ? svg`<g transform="scale(-1 1) translate(44, 176)">${setpointSvg(
            350,
            this.speedSetpoint,
            speedSetpointAtZero,
            {
              fill: cSpeed.setPointColor,
              stroke: 'var(--border-silhouette-color)',
            },
            {
              inCommand: this.state === InstrumentState.inCommand,
              singleSided: true,
              narrow: false,
            }
          )}</g>`
        : nothing;

    return html`
      <div class="container">
        <svg viewbox="-100 -200 200 400">
          ${container} ${frameLeft} ${frameRight} ${thrustCenter} ${thrustTop}
          ${thrusterBottom} ${speedBox} ${speedLine} ${border} ${thrustSetpoint}
          ${speedSetpoint}
        </svg>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-main-engine': ObcMainEngine;
  }
}
