import {SVGTemplateResult, svg} from 'lit';

export enum ArrowStyle {
  HDG = 'HDG',
  COG = 'COG',
}

function getTipSVG(style: ArrowStyle, colorName: string): SVGTemplateResult {
  if (style === ArrowStyle.HDG) {
    return svg`<path d="M 9.0523 72.1511 L 27.7691 27.5875 L 46.4857 72.1511 C 47.2258 73.9134 45.309 75.6104 43.6495 74.662 L 27.769 67.5875 L 11.8885 74.6621 C 10.229 75.6103 8.3122 73.9133 9.0523 72.1511 Z" style="fill: ${colorName}" vector-effect="non-scaling-stroke"/>`;
  } else if (style === ArrowStyle.COG) {
    return svg`<path fill-rule="evenodd" clip-rule="evenodd" transform="translate(15, 9.5)" d="M0.283211 44.5636C-0.456941 46.3259 1.4599 48.0229 3.11945 47.0746L18.9999 40L34.8804 47.0746C36.54 48.0229 38.4568 46.3259 37.7166 44.5636L18.9999 0L0.283211 44.5636ZM18.9999 10.3297L6.25443 40.6761L18.9999 35.393L31.7454 40.6761L18.9999 10.3297ZM36.865 43.6016L36.8624 43.6001L36.865 43.6016Z" fill="${colorName}" vector-effect="non-scaling-stroke"/>`;
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
  const thickShaftLength: number = 250 / 2;
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

  const arrowTip = svg`<svg x=${tipX} y=${tipY} width="${tipSize}" height="${tipSize}" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(${angle} 0 0)">
        ${getTipSVG(style, colorName)}
      </g>
    </svg>`;

  return [...shaft, circle, arrowTip];
}
