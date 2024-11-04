import {SVGTemplateResult, svg} from 'lit';

export interface Tickmark {
  angle: number;
  type: TickmarkType;
  text?: string;
}

export enum TickmarkType {
  main = 'main',
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
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
    return 'var(--instrument-tick-mark-secondary-color)';
  } else {
    return 'var(--instrument-tick-mark-primary-color)';
  }
}

export function tickmark(
  angle: number,
  tickmarkSize: TickmarkType,
  style: TickmarkStyle,
  text?: string
): SVGTemplateResult | SVGTemplateResult[] {
  const textHeight = -32;
  let lineStartY: number = -35;
  let lineEndY: number = -34;

  if (tickmarkSize === TickmarkType.secondary) {
    lineStartY = -24;
    lineEndY = lineStartY + 8;
  } else if (tickmarkSize === TickmarkType.main) {
    lineEndY = lineStartY + 20;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    throw new Error('Tertiary tickmarks are not supported');
  }

  const colorName = tickmarkColor(style);
  const tick = svg`<line x1=${angle} y1=${lineStartY} x2=${angle} y2=${lineEndY} stroke=${colorName} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  if (text) {
    const textY = lineEndY + textHeight;
    return [
      tick,
      svg`<text x=${angle} y=${textY} class="label" text-anchor="middle">${text}</text>`,
    ];
  }

  return tick;
}
