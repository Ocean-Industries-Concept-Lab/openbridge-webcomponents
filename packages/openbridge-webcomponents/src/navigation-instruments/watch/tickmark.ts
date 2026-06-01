import {SVGTemplateResult, svg} from 'lit';

export interface Tickmark {
  angle: number;
  type: TickmarkType;
  text?: string;
  color?: string;
}

export enum TickmarkType {
  zeroLineThick = 'zeroLineThick',
  zeroLine = 'zeroLine',
  main = 'main',
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  textOnly = 'textOnly',
}

export enum TickmarkStyle {
  regular = 'regular',
  enhanced = 'enhanced',
}

export function tickmarkColor(
  style: TickmarkStyle,
  tickmarkType?: TickmarkType
): string {
  if (style === TickmarkStyle.regular) {
    return 'var(--instrument-tick-mark-tertiary-color)';
  } else {
    if (tickmarkType === TickmarkType.tertiary) {
      return 'var(--instrument-tick-mark-secondary-color)';
    }
    return 'var(--instrument-tick-mark-primary-color)';
  }
}

export function tickmark(
  angle: number,
  {
    size,
    style,
    scale,
    text,
    inside,
    textRadius,
    rotation,
    maxDigits,
    color,
    radiusOffset = 0,
  }: {
    size: TickmarkType;
    style: TickmarkStyle;
    scale: number;
    text?: string;
    inside: boolean;
    textRadius: number;
    rotation?: number;
    maxDigits: number;
    color?: string;
    radiusOffset?: number;
  }
): SVGTemplateResult | SVGTemplateResult[] {
  // check if scale is not infinite
  if (scale === Infinity || scale < 0) {
    throw new Error('Tick scale is not valid');
  }
  const rOff = radiusOffset;
  let innerRadius: number;
  let outerRadius: number;
  textRadius = textRadius + (3 / scale + 3) * (inside ? -1 : 1);
  const rad = (angle * Math.PI) / 180;
  if (size === TickmarkType.primary) {
    innerRadius = 328 / 2 + rOff;
    outerRadius = 368 / 2 + rOff;
  } else if (size === TickmarkType.secondary) {
    innerRadius = 328 / 2 + rOff;
    outerRadius = 344 / 2 + rOff;
  } else if (size === TickmarkType.main || size === TickmarkType.zeroLine) {
    innerRadius = 320 / 2 + rOff;
    outerRadius = 368 / 2 + rOff;
  } else if (size === TickmarkType.zeroLineThick) {
    innerRadius = 224 / 2 + rOff;
    outerRadius = 368 / 2 + rOff;
  } else if (size === TickmarkType.tertiary) {
    innerRadius = 328 / 2 + rOff;
    outerRadius = 336 / 2 + rOff;
  } else {
    return [textSvg(text ?? '', angle, inside, scale, textRadius)];
  }

  // When inside, anchor ticks at the outer ring edge and grow inward,
  // preserving the same gap from the ring edge as the outside case.
  // Outside: gap = innerRadius - RING2 (320/2). E.g. secondary: 164 - 160 = 4px gap.
  // Inside: mirror that gap from the outer ring (368/2).
  if (inside) {
    const outerRingRadius = 368 / 2 + rOff;
    const ring2Radius = 320 / 2 + rOff;
    const tickLength = outerRadius - innerRadius;
    const gapFromRingEdge = Math.max(0, innerRadius - ring2Radius);
    outerRadius = outerRingRadius - gapFromRingEdge;
    innerRadius = outerRadius - tickLength;
  }
  const colorName = color ?? tickmarkColor(style, size);

  const x1 = Math.sin(rad) * innerRadius;
  const y1 = -Math.cos(rad) * innerRadius;
  const x2 = Math.sin(rad) * outerRadius;
  const y2 = -Math.cos(rad) * outerRadius;
  const strokeWidth =
    size === TickmarkType.zeroLine || size === TickmarkType.zeroLineThick
      ? 4
      : 1;
  const tick = svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke=${colorName} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`;
  if (text) {
    if (rotation === undefined) {
      return [tick, textSvg(text, angle, inside, scale, textRadius)];
    } else {
      const newRadius =
        textRadius + ((4 / scale + 5) * (inside ? -1 : 1) * maxDigits) / 2;
      const textX = Math.sin(rad) * newRadius;
      const textY = -Math.cos(rad) * newRadius;
      return [
        tick,
        svg`<text x=${textX} y=${textY} class="label rotate ${inside ? 'inside' : ''}" transform="rotate(${-rotation})" transform-origin="${textX} ${textY}">${text}</text>`,
      ];
    }
  }
  return tick;
}

function textSvg(
  text: string,
  angle: number,
  inside: boolean,
  scale: number,
  textRadius: number
) {
  let positionClass;
  if (angle === 0) {
    positionClass = 'top';
  } else if (angle < 180 && angle > 0) {
    positionClass = 'right';
  } else if (angle === 180) {
    positionClass = 'bottom';
  } else {
    positionClass = 'left';
  }
  const rad = (angle * Math.PI) / 180;
  const insideGain = inside ? -1 : 1;
  const yOffset = (7 / scale) * insideGain;
  const xOffset = (6 / scale) * insideGain;

  let textX = Math.sin(rad) * (textRadius + xOffset);
  if (angle > 180) {
    textX += (4 / scale) * insideGain;
  } else if (angle < 180 && angle > 0) {
    textX -= (4 / scale) * insideGain;
  }
  const textY = -Math.cos(rad) * (textRadius + yOffset);
  return svg`<text x=${textX} y=${textY} class="label ${positionClass} ${inside ? 'inside' : ''}">${text}</text>`;
}
