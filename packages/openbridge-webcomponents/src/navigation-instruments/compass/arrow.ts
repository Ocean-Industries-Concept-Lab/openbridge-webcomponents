import {SVGTemplateResult, svg} from 'lit';

export function arrow(
  angle: number,
  originX: number,
  originY: number
): SVGTemplateResult | SVGTemplateResult[] {
  const colorName = 'var(--instrument-enhanced-secondary-color)';
  const innerRadiusX: number = 310 / 2;
  const innerRadiusY: number = 350 / 2;
  const rad = (angle * Math.PI) / 180;

  const x2 = originX + Math.sin(rad) * innerRadiusX;
  const y2 = originY - Math.cos(rad) * innerRadiusX;

  const x3 = originX - Math.sin(rad) * innerRadiusY;
  const y3 = originY + Math.cos(rad) * innerRadiusY;

  const shaft = [
    svg`<line x1=${originX} y1=${originY} x2=${x2} y2=${y2} stroke=${colorName} stroke-width="12" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>`,
    svg`<line x1=${originX} y1=${originY} x2=${x3} y2=${y3} stroke=${colorName} stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>`,
  ];

  const circle = svg`<circle cx=${originX} cy=${originY} r="12" fill=${colorName} vector-effect="non-scaling-stroke"></circle>`;

  const size = 75;
  const tipX = x2 - size / 2;
  const tipY = y2 - size / 2;

  const arrowTip = svg`<svg x=${tipX} y=${tipY} width="${size}" height="${size}" viewBox="-17 -17 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(${angle} 0 0)">
      <path d="M0 -12L-4.55371 -1.071L-9.10744 9.858C-9.44486 10.6678 -8.65036 11.4886 -7.83001 11.1777L0 8.21053L7.83001 11.1777C8.65036 11.4886 9.44486 10.6678 9.10744 9.858L0 -12Z" style="fill: ${colorName}" vector-effect="non-scaling-stroke"/>
    </g>
  </svg>`;

  return [...shaft, circle, arrowTip];
}
