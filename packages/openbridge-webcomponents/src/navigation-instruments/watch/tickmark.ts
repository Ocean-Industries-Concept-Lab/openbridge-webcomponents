import {SVGTemplateResult, svg} from 'lit';

export interface Tickmark {
  angle: number;
  type: TickmarkType;
  text?: string;
}

export enum TickmarkType {
  zeroLine = 'zeroLine',
  main = 'main',
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  textOnly = 'textOnly',
}

export enum TickmarkStyle {
  hinted = 'hinted',
  regular = 'regular',
  enhanced = 'enhanced',
}

export function tickmarkColor(style: TickmarkStyle): string {
  if (style === TickmarkStyle.hinted) {
    return 'var(--instrument-frame-tertiary-color)';
  } else if (style === TickmarkStyle.regular) {
    return 'var(--instrument-tick-mark-tertiary-color)';
  } else {
    return 'var(--instrument-tick-mark-primary-color)';
  }
}

export function tickmark(
  angle: number,
  tickmarkSize: TickmarkType,
  style: TickmarkStyle,
  scale: number,
  text: string | undefined,
  inside: boolean,
  textRadius: number
): SVGTemplateResult | SVGTemplateResult[] {
  // check if scale is not infinite
  if (scale === Infinity || scale <= 0) {
    throw new Error('Scale is not valid');
  }
  let innerRadius: number = 328 / 2;
  let outerRadius: number = 368 / 2;
  textRadius = textRadius + (16 / scale) * (inside ? -1 : 1);
  const rad = (angle * Math.PI) / 180;
  if (tickmarkSize === TickmarkType.secondary) {
    innerRadius = 164.5;
    outerRadius = 172.5;
  } else if (
    tickmarkSize === TickmarkType.main ||
    tickmarkSize === TickmarkType.zeroLine
  ) {
    innerRadius = 320 / 2;
    outerRadius = 368 / 2;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    throw new Error('Tertiary tickmarks are not supported');
  } else if (tickmarkSize === TickmarkType.textOnly) {
    const textX = Math.sin(rad) * textRadius;
    const textY = -Math.cos(rad) * textRadius;
    return [svg`<text x=${textX} y=${textY} class="label">${text}</text>`];
  }
  const colorName = tickmarkColor(style);

  const x1 = Math.sin(rad) * innerRadius;
  const y1 = -Math.cos(rad) * innerRadius;
  const x2 = Math.sin(rad) * outerRadius;
  const y2 = -Math.cos(rad) * outerRadius;
  const strokeWidth = tickmarkSize === TickmarkType.zeroLine ? 4 : 1;
  const tick = svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke=${colorName} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`;
  if (text) {
    let positionClass = "top";
    if (angle === 0) {
      positionClass = "top";
    } else if (angle < 180) {
      positionClass = "right";
    } else if (angle === 180) {
      positionClass = "bottom";
    } else {
      positionClass = "left";
    }

    const textX = Math.sin(rad) * textRadius;
    const textY = -Math.cos(rad) * textRadius;
    return [
      tick,
      svg`<text x=${textX} y=${textY} class="label ${positionClass} ${inside ? 'inside' : ''}">${text}</text>`,
    ];
  }
  return tick;
}
