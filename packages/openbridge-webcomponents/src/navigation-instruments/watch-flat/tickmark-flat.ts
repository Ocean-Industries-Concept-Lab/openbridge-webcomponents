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
    return 'var(--instrument-tick-mark-tertiary-color)';
  } else {
    return 'var(--instrument-tick-mark-primary-color)';
  }
}

export function tickmark(
  angle: number,
  tickmarkSize: TickmarkType,
  style: TickmarkStyle,
  visibleRange: number,
  text?: string
): SVGTemplateResult | SVGTemplateResult[] {
  const baseOffset = 5;
  const offset = (baseOffset * 35) / visibleRange;

  const textHeight = -40;
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

  const x = angle * offset;
  const colorName = tickmarkColor(style);
  const tick = svg`<line x1=${x} y1=${lineStartY} x2=${x} y2=${lineEndY} stroke=${colorName} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
  if (text) {
    const textY = lineEndY + textHeight;
    return [
      tick,
      svg`<text x=${x} y=${textY} class="label" text-anchor="middle">${text}</text>`,
    ];
  }

  return tick;
}
