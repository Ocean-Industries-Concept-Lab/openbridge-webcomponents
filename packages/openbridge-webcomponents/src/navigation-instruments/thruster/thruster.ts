import {LitElement, svg, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {InstrumentState} from '../types';
import {LinearAdvice, LinearAdviceRaw, renderAdvice} from './advice';
import {AdviceState} from '../watch/advice';
import {TickmarkStyle} from '../watch/tickmark';
import {singleSidedTickmark} from './tickmark';
import {PropellerType, bottomPropeller, topPropeller} from './propeller';

/**
 * @element obc-thruster
 *
 * @prop {number} thrust - The thrust of the thruster in percent (-100 - +100)
 * @prop {boolean} touching - Highlight the thruster when the lever is being touched
 */
@customElement('obc-thruster')
export class ObcThruster extends LitElement {
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
  @property({type: Boolean}) singleDirection: boolean = false;
  @property({type: Boolean}) singleDirectionHalfSize: boolean = false;
  @property({type: Array}) advices: LinearAdvice[] = [];
  @property({type: String}) topPropeller: PropellerType = PropellerType.none;
  @property({type: String}) bottomPropeller: PropellerType = PropellerType.none;

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
        advices: this.advices,
        singleDirection: this.singleDirection,
        singleDirectionHalfSize: this.singleDirectionHalfSize,
        topPropeller: this.topPropeller,
        bottomPropeller: this.bottomPropeller,
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

function thrusterTop(
  height: number,
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean
) {
  const container = svg`
      <path transform="translate(0 -2)" d="M -44 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 72 a 8 8 0 0 1 8 8 V 0 Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  const track = svg`<rect width="40" height=${height} x="-20" y=${-2 - height} fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>`;

  const tickmarks = [];

  const nTicks = 2;
  const delta = height / nTicks;
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

  const barHeight = (height * value) / 100;
  const barY = -2 - barHeight;
  const bar = svg`<rect width="40" height=${barHeight} x="-20" y=${barY} fill=${colors.box} stroke=${colors.box} vector-effect="non-scaling-stroke"/>`;

  return [container, track, tickmarks, bar];
}

function thrusterTopSingleSided(
  height: number,
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean,
  advice: LinearAdviceRaw[],
  flipAdicePattern: boolean = false
) {
  const container = svg`
      <path transform="translate(0 -2)" d="M -32 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 48 a 8 8 0 0 1 8 8 V 0 Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  const track = svg`
      <path transform="translate(0 -2)" d="M -32 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 32 V 0 Z" fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;

  const tickmarks = hideTicks
    ? []
    : [singleSidedTickmark(height, 50, TickmarkStyle.hinted)];

  const barHeight = (height * value) / 100;
  const barY = -2 - barHeight;
  const maskId = flipAdicePattern ? 'thrusterBarMask1' : 'thrusterBarMask2';
  const bar = svg`
  <defs>
  <mask id=${maskId}>
  <path transform="translate(0 -2)" d="M -32 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 48 a 8 8 0 0 1 8 8 V 0 Z" fill="white" stroke="white" vector-effect="non-scaling-stroke"/>
  </defs>
  <rect mask="url(#${maskId})" width="40" height=${barHeight} x="-32" y=${barY} fill=${colors.box} stroke=${colors.box} vector-effect="non-scaling-stroke"/>`;
  const advicesSvg = advice.map((a) =>
    renderAdvice(height, a, flipAdicePattern)
  );

  return [container, track, tickmarks, bar, advicesSvg];
}

function thrusterBottom(
  height: number,
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean
) {
  const container = svg`
      <g transform="rotate(180)">
        ${thrusterTop(height, value, colors, hideTicks)}
      </g>
  `;
  return container;
}

function thrusterBottomSingleSided(
  height: number,
  value: number,
  colors: {box: string; container: string},
  hideTicks: boolean,
  advices: LinearAdviceRaw[]
) {
  const container = svg`
      <g transform="rotate(180) scale(-1,1)">
        ${thrusterTopSingleSided(height, value, colors, hideTicks, advices, true)}
      </g>
  `;
  return container;
}

function setpointSvg(
  height: number,
  value: number,
  setpointAtZero: boolean,
  colors: {fill: string; stroke: string},
  options: {
    inCommand: boolean;
    singleSided: boolean;
  }
) {
  const y = -(setpointAtZero
    ? 0
    : Math.sign(value) * ((height * Math.abs(value)) / 100 + 2));
  const extra = options.singleSided ? -12 : 0;
  let path;
  if (options.inCommand) {
    path =
      'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
  } else {
    path =
      'M18.5836 8L5.4086 8L11.9961 17.1526L18.5836 8ZM23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
  }
  return svg`
    <defs>
      <g id="thrusterSetpoint">
        <path fill-rule="evenodd" clip-rule="evenodd" transform="translate(24 -12) rotate(90)" d=${path} vector-effect="non-scaling-stroke"/>
      </g>
      <mask id="thrusterSetpointMask">
        <rect x="-20" y="-20" width="50" height="50" fill="white" />
        <use href="#thrusterSetpoint" fill="black" />
      </mask>
    </defs>
  <g transform="translate(0 ${y})">
    <use href="#thrusterSetpoint" fill=${colors.fill} stroke="none" transform="translate(${28 + extra} 0)"/>
    <use href="#thrusterSetpoint" mask="url(#thrusterSetpointMask)" transform="translate(${28 + extra} 0)" fill="none" stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    ${
      options.singleSided
        ? null
        : svg`
    <use href="#thrusterSetpoint" transform="rotate(180) translate(28 0)" fill=${colors.fill} stroke="none"/>
    <use href="#thrusterSetpoint" transform="rotate(180) translate(28 0)" mask="url(#thrusterSetpointMask)" fill="none" stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      `
    }
  </g>
  `;
}

export function thruster(
  thrust: number,
  setpoint: number | undefined,
  state: InstrumentState,
  options: {
    atSetpoint: boolean;
    tunnel: boolean;
    singleSided: boolean;
    singleDirection: boolean;
    singleDirectionHalfSize: boolean;
    setpointAtZeroDeadband: number;
    autoAtSetpoint: boolean;
    autoSetpointDeadband: number;
    touching: boolean;
    advices: LinearAdvice[];
    topPropeller: PropellerType;
    bottomPropeller: PropellerType;
  }
) {
  if (!options.singleSided && options.advices.length > 0) {
    throw new Error('Double sided thruster does not support advice');
  }

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

  const advices: LinearAdviceRaw[] = options.advices.map((a) => {
    const triggered = thrust >= a.min && thrust <= a.max;
    let state: AdviceState;
    if (triggered) {
      state = AdviceState.triggered;
    } else if (a.hinted) {
      state = AdviceState.hinted;
    } else {
      state = AdviceState.regular;
    }
    return {
      min: a.min,
      max: a.max,
      type: a.type,
      state,
    };
  });

  const topAdvices = advices.filter((a) => a.min >= 0);
  const bottomAdvices = advices
    .filter((a) => a.max <= 0)
    .map((a) => ({...a, min: -a.max, max: -a.min}));

  const thrusterSvg = [];
  const baseheight = options.topPropeller === PropellerType.none ? 134 : 106;
  const height = options.singleDirection ? baseheight * 2 : baseheight;
  if (options.singleSided) {
    thrusterSvg.push(
      thrusterTopSingleSided(
        height,
        Math.max(thrust, 0),
        {box: boxColor, container: containerBackgroundColor},
        hideTicks,
        topAdvices
      )
    );
    if (!(options.singleDirection || options.singleDirectionHalfSize)) {
      thrusterSvg.push(
        thrusterBottomSingleSided(
          height,
          Math.max(-thrust, 0),
          {box: boxColor, container: containerBackgroundColor},
          hideTicks,
          bottomAdvices
        )
      );
    }
    thrusterSvg.push(centerLine);
  } else {
    thrusterSvg.push(
      thrusterTop(
        height,
        Math.max(thrust, 0),
        {box: boxColor, container: containerBackgroundColor},
        hideTicks
      )
    );
    if (!options.singleDirection) {
      thrusterSvg.push(
        thrusterBottom(
          height,
          Math.max(-thrust, 0),
          {box: boxColor, container: containerBackgroundColor},
          hideTicks
        )
      );
    }
    thrusterSvg.push(centerLine);
  }
  if (setpoint !== undefined) {
    thrusterSvg.push(
      setpointSvg(
        height,
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
    let viewBox = '-80 -160 160 320';
    let y = -160;
    if (options.singleDirection) {
      viewBox = '-80 -300 160 320';
      y = -320;
    }
    const top = topPropeller(height, arrowColor, options.topPropeller);
    const bottom = bottomPropeller(
      options.singleDirectionHalfSize ? 0.5 : height,
      options.bottomPropeller
    );
    return svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox=${viewBox} x="-80" y=${y} width="160" height="320">
      ${top}
      ${bottom}
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
