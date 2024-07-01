import {LitElement, svg, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Size, InstrumentState} from '../types';

/**
 * @element obc-thruster
 *
 * @prop {Size} size - The size of the thruster
 * @prop {number} thrust - The thrust of the thruster in percent (-100 - +100)
 * @prop {boolean} touching - Highlight the thruster when the lever is being touched
 */
@customElement('obc-thruster')
export class ObcThruster extends LitElement {
  @property({type: String}) size: Size = Size.medium;
  @property({type: Number}) thrust: number = 0;
  @property({type: Number}) setpoint: number | undefined;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) atSetpoint: boolean = false;
  @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;
  @property({type: Number}) autoAtSetpointDeadband: number = 1;
  @property({type: Number}) setpointAtZeroDeadband: number = 0.5;
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Boolean}) tunnel: boolean = false;
  @property({type: Boolean}) singleSided: boolean = false;

  override render() {
    return html`<div class="container">
      ${thruster(this.thrust, this.setpoint, this.state, {
        atSetpoint: this.atSetpoint,
        tunnel: this.tunnel,
        setpointAtZeroDeadband: this.setpointAtZeroDeadband,
        autoAtSetpoint: !this.disableAutoAtSetpoint,
        autoSetpointDeadband: this.autoAtSetpointDeadband,
        touching: this.touching,
        singleSided: this.singleSided,
      })}
    </div>`;
  }

  static override styles = css`
    .container {
      height: 100%;
      width: 100%;
    }

    .container > svg {
      height: 100%;
      width: 100%;
    }
  `;
}
const containerHeight = 134;

function thrusterTop(
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean
) {
  const container = svg`
      <path transform="translate(0 -2)" d="M -44 0  v -126  a 8 8 0 0 1 8 -8 h 72 a 8 8 0 0 1 8 8 V 0 Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  const track = svg`<rect width="40" height="134" x="-20" y="-136" fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>`;

  const tickmarks = [];

  const nTicks = 2;
  const delta = containerHeight / nTicks;
  if (!hideTicks) {
    for (let i = 1; i < nTicks; i++) {
      tickmarks.push(
        svg`<line x1="-24" x2="-44" y1=${-i * delta - 2}  y2=${
          -i * delta - 2
        } stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
      tickmarks.push(
        svg`<line  x1="24"  x2="44" y1=${-i * delta - 2}  y2=${
          -i * delta - 2
        } stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
    }
  }

  const barHeight = (134 * value) / 100;
  const barY = -136 + 134 - barHeight;
  const bar = svg`<rect width="40" height=${barHeight} x="-20" y=${barY} fill=${colors.box} stroke=${colors.box} vector-effect="non-scaling-stroke"/>`;

  return [container, track, tickmarks, bar];
}

function thrusterTopSingleSided(
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean
) {
  const container = svg`
      <path transform="translate(0 -2)" d="M -32 0  v -126  a 8 8 0 0 1 8 -8 h 48 a 8 8 0 0 1 8 8 V 0 Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  const track = svg`
      <path transform="translate(0 -2)" d="M -32 0  v -126  a 8 8 0 0 1 8 -8 h 32 V 0 Z" fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;

  const tickmarks = [];

  const nTicks = 2;
  const delta = containerHeight / nTicks;
  if (!hideTicks) {
    for (let i = 1; i < nTicks; i++) {
      tickmarks.push(
        svg`<line  x1="12"  x2="32" y1=${-i * delta - 2}  y2=${
          -i * delta - 2
        } stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
    }
  }

  const barHeight = (134 * value) / 100;
  const barY = -136 + 134 - barHeight;
  const bar = svg`<rect width="40" height=${barHeight} x="-32" y=${barY} fill=${colors.box} stroke=${colors.box} vector-effect="non-scaling-stroke"/>`;

  return [container, track, tickmarks, bar];
}

function thrusterBottom(
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean
) {
  const container = svg`
      <g transform="rotate(180)">
        ${thrusterTop(value, colors, hideTicks)}
      </g>
  `;
  return container;
}

function thrusterBottomSingleSided(
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean
) {
  const container = svg`
      <g transform="rotate(180) scale(-1,1)">
        ${thrusterTopSingleSided(value, colors, hideTicks)}
      </g>
  `;
  return container;
}

function arrowTop(arrowColor: string) {
  return svg`
<path transform="translate(-15 -156)" d="M0.707007 14.2929L14.9999 0L29.2928 14.2929C29.9228 14.9229 29.4766 16 28.5857 16H1.41412C0.523211 16 0.0770419 14.9229 0.707007 14.2929Z" fill=${arrowColor}/>`;
}

function setpointSvg(
  value: number,
  setpointAtZero: boolean,
  colors: {fill: string; stroke: string},
  options: {
    inCommand: boolean;
    singleSided: boolean;
  }
) {
  const y =
    -14 +
    -(setpointAtZero
      ? 0
      : Math.sign(value) * ((containerHeight * Math.abs(value)) / 100 + 2));
  let extra = options.singleSided ? -12 : 0;
  let path1, path2;
  if (options.inCommand) {
    path1 = "M79.4207 13.1845C79.1596 13.3724 79.0049 13.6744 79.0049 13.9961C79.0049 14.3178 79.1596 14.6198 79.4207 14.8077L95.4207 26.3235C97.668 27.941 101.005 26.4604 101.005 23.5926L101.005 4.39959C101.005 1.53179 97.668 0.0512117 95.4207 1.66865L79.4207 13.1845Z"
    path2="M24.5793 14.8155C24.8404 14.6276 24.9951 14.3256 24.9951 14.0039C24.9951 13.6822 24.8404 13.3802 24.5793 13.1923L8.57928 1.67645C6.33203 0.059019 2.99512 1.5396 2.99512 4.40739L2.99512 23.6004C2.99512 26.4682 6.33203 27.9488 8.57928 26.3314L24.5793 14.8155Z";
   } else {
    extra -= 12;
    path1 = "M91.4158 13.1845C91.1548 13.3724 91 13.6744 91 13.9961C91 14.3178 91.1548 14.6198 91.4158 14.8077L107.416 26.3235C109.663 27.941 113 26.4604 113 23.5926L113 4.39959C113 1.5318 109.663 0.0512136 107.416 1.66865L91.4158 13.1845ZM107 18.6318L100.559 13.9961L107 9.36042L107 18.6318Z";
    path2 = "M36.5842 14.8155C36.8452 14.6276 37 14.3256 37 14.0039C37 13.6822 36.8452 13.3802 36.5842 13.1923L20.5842 1.67645C18.3369 0.0590192 15 1.5396 15 4.40739L15 23.6004C15 26.4682 18.3369 27.9488 20.5842 26.3314L36.5842 14.8155ZM21 9.36823L27.4408 14.0039L21 18.6396L21 9.36823Z"
   } 
   
   return svg`
    <defs>
      <path id="thrusterSetpointInCommand1" d=${path1} vector-effect="non-scaling-stroke"/>  
      <mask id="clipThrusterSetpointInCommand1">
        <rect x="-50" y="-50" width="200" height="200" fill="white" />
        <use href="#thrusterSetpointInCommand1" fill="black" />
      </mask>
      <path id="thrusterSetpointInCommand2" d=${path2} vector-effect="non-scaling-stroke"/>
      <mask id="clipThrusterSetpointInCommand2">
        <rect x="-50" y="-50" width="200" height="200" fill="white" />
        <use href="#thrusterSetpointInCommand2" fill="black" />
      </mask>
    </defs>
  <g transform="translate(${-52 + extra} ${y})">
    <use href="#thrusterSetpointInCommand1" fill=${colors.fill} stroke="none"/>
    <use href="#thrusterSetpointInCommand1" mask="url(#clipThrusterSetpointInCommand1)" fill="none" stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    ${options.singleSided ? null : svg`
    <use href="#thrusterSetpointInCommand2" fill=${colors.fill} stroke="none"/>
    <use href="#thrusterSetpointInCommand2" mask="url(#clipThrusterSetpointInCommand2)" fill="none" stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      `}
  </g>`;
}

export function thruster(
  thrust: number,
  setpoint: number | undefined,
  state: InstrumentState,
  options: {
    atSetpoint: boolean;
    tunnel: boolean;
    singleSided: boolean;
    setpointAtZeroDeadband: number;
    autoAtSetpoint: boolean;
    autoSetpointDeadband: number;
    touching: boolean;
  }
) {
  if (options.autoAtSetpoint && setpoint !== undefined) {
    options.atSetpoint =
      Math.abs(thrust - setpoint) < options.autoSetpointDeadband;
  }

  if (options.touching) {
    options.atSetpoint = false;
  }

  let boxColor = 'var(--instrument-enhanced-secondary-color)';
  let setPointColor = 'var(--instrument-enhanced-primary-color)';
  let arrowColor = 'var(--instrument-regular-secondary-color)';
  let containerBackgroundColor = 'var(--instrument-frame-primary-color)';
  let zeroLineColor = 'var(--instrument-enhanced-secondary-color)';
  let hideTicks = false;
  if (options.atSetpoint) {
    setPointColor = boxColor;
  }
  if (state === InstrumentState.active) {
    boxColor = 'var(--instrument-regular-secondary-color)';
    zeroLineColor = 'var(--instrument-regular-secondary-color)';
    setPointColor = 'var(--instrument-regular-primary-color)';
    arrowColor = 'var(--instrument-regular-secondary-color)';
    if (options.atSetpoint) {
      setPointColor = boxColor;
    }
  } else if (state === InstrumentState.loading) {
    boxColor = 'transparent';
    setPointColor = 'var(--instrument-frame-tertiary-color)';
    zeroLineColor = 'var(--instrument-frame-tertiary-color)';
    arrowColor = 'var(--instrument-regular-secondary-color)';
    thrust = 0;
    hideTicks = true;
    if (setpoint !== undefined) {
      setpoint = 0;
    }
  } else if (state === InstrumentState.off) {
    boxColor = 'transparent';
    setPointColor = 'var(--instrument-frame-tertiary-color)';
    arrowColor = 'var(--instrument-frame-tertiary-color)';
    zeroLineColor = 'var(--instrument-frame-tertiary-color)';
    thrust = 0;
    hideTicks = true;
    containerBackgroundColor = 'transparent';
    if (setpoint !== undefined) {
      setpoint = 0;
    }
  }

  const centerLine = options.singleSided
    ? svg`<rect x="-32" y="-2" width="64" height="4" stroke-width="1" fill=${zeroLineColor} stroke=${zeroLineColor} vector-effect="non-scaling-stroke"/>`
    : svg`
    <rect x="-44" y="-2" width="88" height="4" stroke-width="1" fill=${zeroLineColor} stroke=${zeroLineColor} vector-effect="non-scaling-stroke"/>
  `;

  const setpointAtZero =
    Math.abs(setpoint || 0) < options.setpointAtZeroDeadband;

  const thrusterSvg = options.singleSided
    ? [
        thrusterTopSingleSided(
          Math.max(thrust, 0),
          {box: boxColor, container: containerBackgroundColor},
          hideTicks
        ),
        thrusterBottomSingleSided(
          Math.max(-thrust, 0),
          {box: boxColor, container: containerBackgroundColor},
          hideTicks
        ),
        centerLine,
      ]
    : [
        thrusterTop(
          Math.max(thrust, 0),
          {box: boxColor, container: containerBackgroundColor},
          hideTicks
        ),
        thrusterBottom(
          Math.max(-thrust, 0),
          {box: boxColor, container: containerBackgroundColor},
          hideTicks
        ),
        centerLine,
      ];
  if (setpoint !== undefined) {
    thrusterSvg.push(
      setpointSvg(
        setpoint,
        setpointAtZero,
        {
          fill: setPointColor,
          stroke: 'var(--border-silhouette-color)',
        },
        {
          inCommand: state === InstrumentState.inCommand,
          singleSided: options.singleSided,
        }
      )
    );
  }

  if (options.tunnel) {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-160 -64  320 128" x="-160" y="-64">
        <g transform="rotate(90)">
          ${thrusterSvg}
        </g>
      </svg>`;
  } else {
    thrusterSvg.push(arrowTop(arrowColor));
    return svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-64 -160 128 320" x="-64" y="-160">
      ${thrusterSvg}
    </svg>
  `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-thruster': ObcThruster;
  }
}
