import { LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Size, InstrumentState } from '../types';

/**
 * @element obc-thruster
 *
 * @prop {Size} size - The size of the thruster
 * @prop {number} thrust - The thrust of the thruster in percent (-100 - +100)
 */
@customElement('obc-thruster')
export class ObcThruster extends LitElement {
  @property({ type: String }) size: Size = Size.medium;
  @property({ type: Number }) thrust: number = 0;
  @property({ type: Number }) setpoint: number | undefined;
  @property({ type: Boolean, attribute: 'at-setpoint' }) atSetpoint: boolean =
    false;
  @property({ type: Boolean, attribute: 'setpoint-at-zero' })
  setpointAtZero: boolean = false;
  @property({ type: String }) state: InstrumentState = InstrumentState.inCommand;
  @property({ type: Boolean }) tunnel: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Boolean }) off: boolean = false;

  override render() {
    return thruster(this.thrust, this.setpoint, this.state, {
      atSetpoint: this.atSetpoint,
      tunnel: this.tunnel,
      setpointAtZero: this.setpointAtZero,
    });
  }
}
const containerHeight = 134;

function thrusterTop(
  value: number,
  colors: { box: string; container: string },
  hideTicks: boolean
) {
  const container = svg`
      <path transform="translate(-33 -137)" d="M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V135H1V9Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  const track = svg`<rect width="32" height="134" x="-16" y="-136" fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>`;

  const tickmarks = [];

  const nTicks = 4;
  const delta = containerHeight / nTicks;
  if (!hideTicks) {
    for (let i = 1; i < nTicks; i++) {
      tickmarks.push(
        svg`<line x1="-20" x2="-28" y1=${-i * delta - 2}  y2=${-i * delta - 2
          } stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
      tickmarks.push(
        svg`<line  x1="20"  x2="28" y1=${-i * delta - 2}  y2=${-i * delta - 2
          } stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
    }
  }

  const barHeight = (134 * value) / 100;
  const barY = -136 + 134 - barHeight;
  const bar = svg`<rect width="32" height=${barHeight} x="-16" y=${barY} fill=${colors.box} stroke=${colors.box} vector-effect="non-scaling-stroke"/>`;

  return [container, track, tickmarks, bar];
}

function thrusterBottom(
  value: number,
  colors: { box: string; container: string },
  hideTicks: boolean
) {
  const container = svg`
      <g transform="rotate(180)">
        ${thrusterTop(value, colors, hideTicks)}
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
  colors: { fill: string; stroke: string }
) {
  const y =
    -12 +
    -(setpointAtZero
      ? 0
      : Math.sign(value) * ((containerHeight * Math.abs(value)) / 100 + 2));
  return svg`
  <g transform="translate(-40 ${y})">
    <path d="M59.4001 11.1999C59.1483 11.3887 59 11.6852 59 12C59 12.3148 59.1483 12.6113 59.4001 12.8001L72.2001 22.3966C74.1773 23.879 77 22.4692 77 19.9971L77 4.0029C77 1.53076 74.1773 0.121035 72.2001 1.60338L59.4001 11.1999Z" fill=${colors.fill} stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    <path d="M20.5999 12.8001C20.8517 12.6113 21 12.3148 21 12C21 11.6852 20.8517 11.3887 20.5999 11.1999L7.79986 1.60338C5.82268 0.121036 3 1.53075 3 4.0029L3 19.9971C3 22.4692 5.82268 23.879 7.79986 22.3966L20.5999 12.8001Z" fill=${colors.fill} stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  </g>
`;
}

export function thruster(
  thrust: number,
  setpoint: number | undefined,
  state: InstrumentState,
  options: { atSetpoint: boolean; tunnel: boolean; setpointAtZero: boolean }
) {
  let boxColor = 'var(--instrument-enhanced-secondary-color)';
  let setPointColor = boxColor;
  let arrowColor = 'var(--instrument-tick-mark-primary-color)';
  let containerBackgroundColor = 'var(--instrument-frame-primary-color)';
  let zeroLineColor = 'var(--instrument-enhanced-secondary-color)';
  let hideTicks = false;
  if (options.atSetpoint) {
    setPointColor = 'var(--instrument-frame-tertiary-color)';
  }
  if (state === InstrumentState.active) {
    boxColor = 'var(--instrument-regular-secondary-color)';
    zeroLineColor = 'var(--instrument-regular-secondary-color)';
    setPointColor = boxColor;
    arrowColor = 'var(--instrument-regular-secondary-color)';
    if (options.atSetpoint) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
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

  const centerLine = svg`
    <rect x="-32" y="-2" width="64" height="4" fill=${zeroLineColor} stroke=${zeroLineColor}/>
  `;

  const thrusterSvg = [thrusterTop(
    Math.max(thrust, 0),
    { box: boxColor, container: containerBackgroundColor },
    hideTicks
  ),
  thrusterBottom(
    Math.max(-thrust, 0),
    { box: boxColor, container: containerBackgroundColor },
    hideTicks
  ),
    centerLine];
  if (setpoint !== undefined) {
    thrusterSvg.push(setpointSvg(setpoint, options.setpointAtZero, {
      fill: setPointColor,
      stroke: 'var(--border-silhouette-color)',
    }))
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
