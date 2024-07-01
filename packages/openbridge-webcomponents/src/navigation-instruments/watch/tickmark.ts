import { SVGTemplateResult, svg } from "lit";

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
  
  export function tickmark(
    angle: number,
    tickmarkSize: TickmarkType,
    style: TickmarkStyle,
    scale: number,
    text?: string,
  ): SVGTemplateResult | SVGTemplateResult[] {
    let innerRadius: number = 328 / 2;
    let outerRadius: number = 368 / 2;
    const textRadius = outerRadius + 18 / scale;
    if (tickmarkSize === TickmarkType.secondary) {
      innerRadius = 164.5;
      outerRadius = 172.5;
    } else if ( tickmarkSize === TickmarkType.main ) {
      innerRadius = 320 / 2;
      outerRadius = 368 / 2;
    } else if (tickmarkSize === TickmarkType.tertiary) {
      throw new Error('Tertiary tickmarks are not supported');
    }
    let colorName = 'instrument-frame-tertiary-color';
    if (style === TickmarkStyle.regular) {
      colorName = 'instrument-tick-mark-tertiary-color';
    } else if (style === TickmarkStyle.enhanced) {
      colorName = 'instrument-tick-mark-primary-color';
    }
  
    const rad = (angle * Math.PI) / 180;
    const x1 = Math.sin(rad) * innerRadius;
    const y1 = -Math.cos(rad) * innerRadius;
    const x2 = Math.sin(rad) * outerRadius;
    const y2 = -Math.cos(rad) * outerRadius;
    const tick = svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--${colorName}" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
    if (text) {
      const textX = Math.sin(rad) * textRadius;
      const textY = -Math.cos(rad) * textRadius;
      return [
        tick,
        svg`<text x=${textX} y=${textY} class="label">${text}</text>`
      ];
    }
    return tick;
  }