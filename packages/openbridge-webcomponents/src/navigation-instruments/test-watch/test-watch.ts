import {LitElement, html, svg} from 'lit';
import {customElement} from 'lit/decorators.js';
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
  let innerRadius = 200 - 24;
  let outerRadius = 200;
  if (tickmarkSize === TickmarkType.primary) {
    throw new Error('Primary tickmarks are not supported');
  }
  if (tickmarkSize === TickmarkType.secondary) {
    innerRadius = 164.5;
    outerRadius = 172.5;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    throw new Error('Tertiary tickmarks are not supported');
  }

  let svgPath = '';
  for (let i = 0; i < 360; i += tickmarksDeg) {
    const angle = (i * Math.PI) / 180;
    const x1 = Math.cos(angle) * innerRadius;
    const y1 = Math.sin(angle) * innerRadius;
    const x2 = Math.cos(angle) * outerRadius;
    const y2 = Math.sin(angle) * outerRadius;
    svgPath += `M ${x1} ${y1} L ${x2} ${y2} `;
  }
  return svg`<path d=${svgPath} stroke="var(--${colorName}" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

@customElement('obc-test-watch')
export class ObcTestWatch extends LitElement {
  override render() {
    return html`
      <svg width="100%" height="100%" viewBox="-200 -200 400 400">
        <defs>
          <mask id="mask1" x="0" y="0" width="100%" height="100%">
            <rect x="-200" y="-200" width="400" height="400" fill="white" />
            <circle cx="0" cy="0" r="160" fill="black" />
          </mask>
        </defs>
        <circle
          cx="0"
          cy="0"
          r="176"
          fill="var(--instrument-frame-primary-color)"
          mask="url(#mask1)"
        />
        ${circle('innerRing', {
          radius: 320 / 2,
          strokeWidth: 1,
          strokeColor: 'var(--instrument-frame-tertiary-color)',
          strokePosition: 'center',
          fillColor: 'none',
        })}
        ${circle('outerRing', {
          radius: 352 / 2,
          strokeWidth: 1,
          strokeColor: 'var(--instrument-frame-tertiary-color)',
          strokePosition: 'center',
          fillColor: 'none',
        })}
        ${tickmarks(
          90,
          TickmarkType.secondary,
          'instrument-frame-tertiary-color'
        )}
        <line
          x2="0"
          x1="0"
          y2="-160"
          y1="-176"
          stroke="var(--instrument-frame-tertiary-color)"
          vector-effect="non-scaling-stroke"
        />
        <line
          x2="0"
          x1="0"
          y2="160"
          y1="176"
          stroke="var(--instrument-frame-tertiary-color)"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-test-watch': ObcTestWatch;
  }
}
