import {SVGTemplateResult, svg} from 'lit';

export enum ArrowStyle {
  HDG = 'HDG',
  COG = 'COG',
}

function getTipSVG(style: ArrowStyle, colorName: string): SVGTemplateResult {
  if (style === ArrowStyle.HDG) {
    return svg`<path d="M0 -12L-4.55371 -1.071L-9.10744 9.858C-9.44486 10.6678 -8.65036 11.4886 -7.83001 11.1777L0 8.21053L7.83001 11.1777C8.65036 11.4886 9.44486 10.6678 9.10744 9.858L0 -12Z" style="fill: ${colorName}" vector-effect="non-scaling-stroke"/>`;
  } else if (style === ArrowStyle.COG) {
    return svg`<path fill-rule="evenodd" clip-rule="evenodd" d="M-9.3584 10.2818C-9.7285 11.1629-8.7701 12.0114-7.9403 11.5373L0 8 7.9402 11.5373C8.77 12.0114 9.7284 11.1629 9.3583 10.2818L0-12-9.3584 10.2818ZM0-6.8351-6.3728 8.338 0 5.6965 6.3727 8.338 0-6.8351ZM8.9325 9.8008 8.9312 9.8 8.9325 9.8008Z" fill="${colorName}" vector-effect="non-scaling-stroke"/>`;
  } else {
    throw new Error(`Style: ${style} not supported`);
  }
}

export function arrow(
  style: ArrowStyle,
  angle: number,
  originX: number,
  originY: number
): SVGTemplateResult | SVGTemplateResult[] {
  const colorName = 'var(--instrument-enhanced-secondary-color)';

  // 250 and 350 are based on the width of the watch (see override() in watch.ts)
  const thickShaftLength: number = 270 / 2;
  const thinShaftLength: number = 350 / 2;
  const rad = (angle * Math.PI) / 180;

  const x2 = originX + Math.sin(rad) * thickShaftLength;
  const y2 = originY - Math.cos(rad) * thickShaftLength;

  const x3 = originX - Math.sin(rad) * thinShaftLength;
  const y3 = originY + Math.cos(rad) * thinShaftLength;

  let shaft: SVGTemplateResult[] = [];

  if (style === ArrowStyle.HDG) {
    shaft = [
      svg`<line x1=${originX} y1=${originY} x2=${x2} y2=${y2} stroke=${colorName} stroke-width="10" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>`,
      svg`<line x1=${originX} y1=${originY} x2=${x3} y2=${y3} stroke=${colorName} stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>`,
    ];
  } else if (style === ArrowStyle.COG) {
    shaft = [
      svg`<line x1=${originX} y1=${originY} x2=${x2} y2=${y2} stroke=${colorName} stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>`,
    ];
  }

  const circle = svg`<circle cx=${originX} cy=${originY} r="10" fill=${colorName} vector-effect="non-scaling-stroke"></circle>`;

  const tipSize = 80;
  const offset = 20;
  const tipOffsetX = Math.sin(rad) * offset;
  const tipOffsetY = -Math.cos(rad) * offset;

  // x2 - tipSize / 2 positions the center of the tip at (x2, y2)
  // we apply an offset to (approximately) position it at the end instead
  const tipX = x2 + tipOffsetX - tipSize / 2;
  const tipY = y2 + tipOffsetY - tipSize / 2;

  const arrowTip = svg`<svg x=${tipX} y=${tipY} width="${tipSize}" height="${tipSize}" viewBox="-17 -17 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(${angle} 0 0)">
        ${getTipSVG(style, colorName)}
      </g>
    </svg>`;

  return [...shaft, circle, arrowTip];
}
