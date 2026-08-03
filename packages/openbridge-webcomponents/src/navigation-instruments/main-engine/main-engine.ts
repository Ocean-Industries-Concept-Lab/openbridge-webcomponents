import {LitElement, html, unsafeCSS, svg, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './main-engine.css?inline';
import {InstrumentState, Priority} from '../types.js';
import {
  atSetpoint,
  convertThrustAdvices,
  thrusterColors,
  thrusterTopSingleSided,
  renderThrusterSetpoint,
} from '../thruster/thruster.js';
import {LinearAdvice} from '../thruster/advice.js';
import {customElement} from '../../decorator.js';
import {
  hasPortStarboardElement,
  PORT_STARBOARD_DEFAULT_ELEMENTS,
  PortStarboardElement,
  PortStarboardShade,
  type PortStarboardSign,
  portStarboardSignOf,
  resolvePortStarboardColor,
} from '../../svghelpers/port-starboard.js';

/**
 * @stable
 */
@customElement('obc-main-engine')
export class ObcMainEngine extends LitElement {
  private _thrustSetpointId = `me-thrust-sp-${Math.random().toString(36).slice(2, 9)}`;
  private _speedSetpointId = `me-speed-sp-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: Number}) thrust: number = 0;
  @property({type: Number}) thrustSetpoint: number | undefined;
  @property({type: Boolean}) thrustTouching: boolean = false;
  @property({type: Boolean}) atThrustSetpoint: boolean = false;
  @property({type: Number}) speed: number = 0;
  @property({type: Number}) speedSetpoint: number | undefined;
  @property({type: Boolean}) speedTouching: boolean = false;
  @property({type: Boolean}) atSpeedSetpoint: boolean = false;
  @property({type: Boolean, attribute: false}) autoAtThrustSetpoint: boolean =
    true;
  @property({type: Boolean, attribute: false}) autoAtSpeedSetpoint: boolean =
    true;
  @property({type: Number}) autoAtThrustSetpointDeadband: number = 1;
  @property({type: Number}) autoAtSpeedSetpointDeadband: number = 1;
  @property({type: Number}) thrustSetpointAtZeroDeadband: number = 0.5;
  @property({type: Number}) speedSetpointAtZeroDeadband: number = 0.5;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Array}) thrustAdvices: LinearAdvice[] = [];
  /**
   * Enables the maritime PORT/STBD (red/green) color mode: ahead thrust and
   * speed render green, astern red.
   */
  @property({type: Boolean}) portStarboard: boolean = false;
  /**
   * Which parts take part while `portStarboard` is on.
   * Defaults to everything except the setpoint.
   * @availableWhen portStarboard==true
   */
  @property({type: Array, attribute: false})
  portStarboardElements: PortStarboardElement[] = [
    ...PORT_STARBOARD_DEFAULT_ELEMENTS,
  ];

  /**
   * Setpoint-marker sign for one axis, gated on the `setpoint` element opt-in.
   * Each column signs from its own value, matching its bar.
   */
  private setpointPortStarboardSign(value: number): PortStarboardSign {
    return hasPortStarboardElement(
      this.portStarboard,
      this.portStarboardElements,
      PortStarboardElement.setpoint
    )
      ? portStarboardSignOf(value)
      : 0;
  }

  override render() {
    const thrustAtSetpoint = atSetpoint(this.thrust, this.thrustSetpoint, {
      atSetpoint: this.atThrustSetpoint,
      autoAtSetpoint: this.autoAtThrustSetpoint,
      autoAtSetpointDeadband: this.autoAtThrustSetpointDeadband,
      touching: this.thrustTouching,
    });
    const cThrust = thrusterColors(
      {
        atSetpoint: thrustAtSetpoint,
        touching: this.thrustTouching,
      },
      this.state,
      this.priority,
      {
        enabled: this.portStarboard,
        elements: this.portStarboardElements,
        sign: portStarboardSignOf(this.thrust),
      }
    );
    const speedAtSetpoint = atSetpoint(this.speed, this.speedSetpoint, {
      atSetpoint: this.atSpeedSetpoint,
      autoAtSetpoint: this.autoAtSpeedSetpoint,
      autoAtSetpointDeadband: this.autoAtSpeedSetpointDeadband,
      touching: this.speedTouching,
    });
    const cSpeed = thrusterColors(
      {
        atSetpoint: speedAtSetpoint,
        touching: this.speedTouching,
      },
      this.state,
      this.priority,
      {
        enabled: this.portStarboard,
        elements: this.portStarboardElements,
        sign: portStarboardSignOf(this.speed),
      }
    );
    const container = svg`<rect x="-80" y="-176" width="160" height="352" fill="var(--instrument-frame-primary-color)" stroke="var(--instrument-frame-tertiary-color)" rx="8"/>`;
    const border = svg`<rect x="-80" y="-176" width="160" height="352" fill="none" stroke="var(--instrument-frame-tertiary-color)" rx="8" vector-effect="non-scaling-stroke"/>`;
    const frameLeft = svg`<rect x="-56" y="-176" width="48" height="352" fill="var(--instrument-frame-secondary-color)" vector-effect="non-scaling-stroke" stroke="var(--instrument-frame-secondary-color)"/>`;
    const frameRight = svg`<rect x="8" y="-176" width="48" height="352" fill="var(--instrument-frame-secondary-color)" vector-effect="non-scaling-stroke" stroke="var(--instrument-frame-secondary-color)"/>`;
    const thrustCenter = svg`<rect x="8" y="-2" height="4" width="72" fill="${cThrust.zeroLineColor}" stroke=${cThrust.zeroLineColor} vector-effect="non-scaling-stroke"/>`;
    const {topAdvices: topThrustAdvice, bottomAdvices: bottomThrustAdvice} =
      convertThrustAdvices(this.thrustAdvices, this.thrustSetpoint);
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
          off: this.state === InstrumentState.off,
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
         off: this.state === InstrumentState.off,
       },
       bottomThrustAdvice
     )}</g>`;
    const thrustSetpoint =
      this.thrustSetpoint !== undefined
        ? svg`<g transform="translate(44, 0)">${renderThrusterSetpoint(
            174,
            this.thrustSetpoint,
            {
              state: this.state,
              priority: this.priority,
              atSetpoint: thrustAtSetpoint,
              touching: this.thrustTouching,
              setpointAtZeroDeadband: this.thrustSetpointAtZeroDeadband,
              singleSided: true,
              narrow: false,
              id: this._thrustSetpointId,
              portStarboardSign: this.setpointPortStarboardSign(this.thrust),
            }
          )}</g>`
        : nothing;

    const speedHeight = 352 * (this.speed / 100) + 2;
    const speedY = 176 - speedHeight;
    const speedBoxColor =
      resolvePortStarboardColor({
        enabled: this.portStarboard,
        elements: this.portStarboardElements,
        element: PortStarboardElement.bar,
        sign: portStarboardSignOf(this.speed),
        shade: PortStarboardShade.light,
      }) ??
      (this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)');
    const speedBox = svg`<rect x="-56" y=${speedY} width="48" height=${speedHeight} fill=${speedBoxColor} stroke=${speedBoxColor} vector-effect="non-scaling-stroke">`;
    const speedLine = svg`<rect x="-56" y=${speedY - 2} width="48" height="4" rx="2" fill=${cSpeed.boxColor} stroke=${cSpeed.boxColor}/>
`;
    const speedSetpoint =
      this.speedSetpoint !== undefined
        ? svg`<g transform="scale(-1 1) translate(44, 176)">${renderThrusterSetpoint(
            350,
            this.speedSetpoint,
            {
              state: this.state,
              priority: this.priority,
              atSetpoint: speedAtSetpoint,
              touching: this.speedTouching,
              setpointAtZeroDeadband: this.speedSetpointAtZeroDeadband,
              singleSided: true,
              narrow: false,
              id: this._speedSetpointId,
              portStarboardSign: this.setpointPortStarboardSign(this.speed),
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
