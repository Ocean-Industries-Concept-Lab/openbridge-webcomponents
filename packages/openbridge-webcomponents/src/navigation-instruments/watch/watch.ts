import {LitElement, html, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {circle} from '../../svghelpers';

enum TickmarkType {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

function tickmarks(
  tickmarksDeg: number,
  tickmarkSize: TickmarkType,
  colorName: string
) {
  let innerRadius: number = 328 / 2;
  let outerRadius: number = 368 / 2;
  if (tickmarkSize === TickmarkType.secondary) {
    innerRadius = 164.5;
    outerRadius = 172.5;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    throw new Error('Tertiary tickmarks are not supported');
  }

  let svgPath = '';
  for (let i = tickmarksDeg; i < 360; i += tickmarksDeg) {
    const angle = (i * Math.PI) / 180;
    const x1 = Math.sin(angle) * innerRadius;
    const y1 = -Math.cos(angle) * innerRadius;
    const x2 = Math.sin(angle) * outerRadius;
    const y2 = -Math.cos(angle) * outerRadius;
    svgPath += `M ${x1} ${y1} L ${x2} ${y2} `;
  }
  return svg`<path d=${svgPath} stroke="var(--${colorName}" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

@customElement('obc-watch')
export class ObcWatch extends LitElement {
  @property({type: Boolean}) hideAllTickmarks = false;
  @property({type: Boolean}) off = false;
  @property({type: Number}) padding = 24;

  override render() {
    const width = (176 + this.padding) * 2;
    const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;

    return html`
      <svg width="100%" height="100%" viewBox=${viewBox}>
        <defs>
          <mask id="mask1" x="0" y="0" width="100%" height="100%">
            <rect x="-200" y="-200" width="400" height="400" fill="white" />
            <circle cx="0" cy="0" r="160" fill="black" />
          </mask>
        </defs>
        ${this.off
          ? null
          : svg`
        <circle
          cx="0"
          cy="0"
          r="184"
          fill="var(--instrument-frame-primary-color)"
          mask="url(#mask1)"
        />`}
        ${circle('innerRing', {
          radius: 320 / 2,
          strokeWidth: 1,
          strokeColor: 'var(--instrument-frame-tertiary-color)',
          strokePosition: 'center',
          fillColor: 'none',
        })}
        ${this.off
          ? null
          : circle('outerRing', {
              radius: 368 / 2,
              strokeWidth: 1,
              strokeColor: 'var(--instrument-frame-tertiary-color)',
              strokePosition: 'center',
              fillColor: 'none',
            })}
        ${this.hideAllTickmarks
          ? null
          : tickmarks(
              90,
              TickmarkType.primary,
              'instrument-frame-tertiary-color'
            )}
        ${this.hideAllTickmarks
          ? null
          : svg`
        <line
          x2="0"
          x1="0"
          y2="-160"
          y1="-184"
          stroke="var(--instrument-frame-tertiary-color)"
          vector-effect="non-scaling-stroke"
        />`}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watch': ObcWatch;
  }
}
