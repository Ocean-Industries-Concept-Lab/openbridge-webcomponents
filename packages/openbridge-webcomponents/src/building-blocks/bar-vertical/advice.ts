import {SVGTemplateResult, nothing, svg} from 'lit';
import {
  AdviceState,
  AdviceType,
} from '../../navigation-instruments/watch/advice.js';
import {
  tickmarkColor,
  TickmarkStyle,
} from '../../navigation-instruments/watch/tickmark.js';
import {valueToY} from '../../svghelpers/stroke-aware.js';

export interface VerticalBarAdviceRaw {
  min: number;
  max: number;
  type: AdviceType;
  state: AdviceState;
}

export interface VerticalBarAdvice {
  min: number;
  max: number;
  type: AdviceType;
  hinted: boolean;
}

/**
 * Convert advice with hinted flag to advice with dynamic state based on setpoint position.
 * Similar to convertThrustAdvices in thruster component.
 */
export function convertVerticalBarAdvices(
  advices: VerticalBarAdvice[],
  setpoint: number | undefined
): VerticalBarAdviceRaw[] {
  return advices.map((a) => {
    const triggered =
      setpoint !== undefined && setpoint >= a.min && setpoint <= a.max;
    let state: AdviceState;
    if (triggered) {
      state = AdviceState.triggered;
    } else if (a.hinted) {
      state = AdviceState.hinted;
    } else {
      state = AdviceState.regular;
    }
    return {
      min: a.min,
      max: a.max,
      type: a.type,
      state,
    };
  });
}

function adviceMask({
  height,
  minValue,
  maxValue,
  min,
  max,
  fill,
  stroke,
  x1,
}: {
  height: number;
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  fill: string;
  stroke: string;
  x1: number;
}): SVGTemplateResult {
  const width = 8;
  const offset = 4;
  const r = width / 2;
  const yL = valueToY(min, minValue, maxValue, height) - 2 * r;
  const yH = valueToY(max, minValue, maxValue, height) + 2 * r;

  // Calculate mask boundaries based on position
  // Right: mask from x1+4 to x1+12
  // Left: mask from x1+4 to x1+12 (x1 is already negative and positioned correctly)
  const xLeft = x1 + offset;
  const xRight = x1 + width + offset;

  const path = `M ${xLeft} ${yL} 
                    A ${r} ${r} 0 0 0 ${xRight} ${yL}
                    V ${yH}
                    A ${r} ${r} 0 0 0 ${xLeft} ${yH}
                    Z`;
  return svg`<path d=${path} fill=${fill} stroke=${stroke} stroke-width="1" vector-effect="non-scaling-stroke" />`;
}

export function singleSidedTickmark({
  height,
  scaleWidth,
  minValue,
  maxValue,
  value,
  style,
  tickmarksBaseX,
  position,
}: {
  height: number;
  scaleWidth: number;
  minValue: number;
  maxValue: number;
  value: number;
  style: TickmarkStyle;
  tickmarksBaseX: number;
  position: 'left' | 'right';
}) {
  if (value >= maxValue || value <= minValue) {
    return null;
  }
  const color = tickmarkColor(style);
  const y = valueToY(value, minValue, maxValue, height);

  // Calculate tickmark position matching bar-vertical.ts generateTickmarks()
  // Tickmarks start at tickmarksBaseX + 4px gap (right) or tickmarksBaseX - 4px gap (left)
  const tickmarkGap = 4;
  const tickmarksX =
    position === 'right'
      ? tickmarksBaseX + tickmarkGap
      : tickmarksBaseX - tickmarkGap;
  const x2 =
    position === 'right' ? tickmarksX + scaleWidth : tickmarksX - scaleWidth;

  return svg`<line x1=${tickmarksX} x2=${x2} y1=${y}  y2=${y} stroke=${color} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

export function renderAdvice(
  height: number,
  minValue: number,
  maxValue: number,
  barWidth: number,
  scaleWidth: number,
  position: 'left' | 'right',
  advicePosition: 'center' | 'inner' | 'outer',
  advice: VerticalBarAdviceRaw,
  tickmarksBaseX: number
): SVGTemplateResult {
  // Calculate x1 based on position and advicePosition
  // 3-stripe model: [bar][tickmarks][labels] on right, [labels][tickmarks][bar] on left
  // Note: adviceMask draws from (x1+4) to (x1+12), making an 8px wide shape
  // So x1 should be the left edge minus 4px offset
  let x1: number;

  if (advicePosition === 'center') {
    // A) Center of the white bar (barWidth configurable, typically 24px or wider)
    // For 8px advice centered: should be at x = (barWidth/2 - 4) to (barWidth/2 + 4)
    // Since mask draws from x1+4, we need x1+4 = barWidth/2 - 4, so x1 = barWidth/2 - 8
    const adviceWidth = 8;
    const centerOffset = barWidth / 2 - adviceWidth / 2;
    x1 = position === 'right' ? centerOffset - 4 : -barWidth + centerOffset - 4;
  } else if (advicePosition === 'inner') {
    // B) Inside tickmarks band, aligned with tickmark start (4px gap from bar/base edge)
    // Right: Tickmarks at tickmarksBaseX+4, advice mask left edge (x1+4) aligns, so x1 = tickmarksBaseX
    // Left: Tickmarks at tickmarksBaseX-4, advice mask right edge (x1+12) aligns, so x1 = tickmarksBaseX-16
    x1 = position === 'right' ? tickmarksBaseX : tickmarksBaseX - 16;
  } else {
    // C) Inside tickmarks band, NOT covering minor tickmarks (second 12px of 24px tickmarks band)
    // Centered in second half: x = barWidth+14 to barWidth+22 (center of barWidth+12 to barWidth+24)
    // Since mask draws from x1+4, we need x1+4 = barWidth+14, so x1 = barWidth+10
    x1 = position === 'right' ? barWidth + 10 : -barWidth - scaleWidth + 14;
  }

  // Dashed tickmarks always span the full bar width
  const x1Tickmark = position === 'right' ? 0 : -barWidth;
  const x2Tickmark = position === 'right' ? barWidth : 0;
  const ticks: SVGTemplateResult[] = [];
  if (advice.min > minValue) {
    const yMin = valueToY(advice.min, minValue, maxValue, height);
    ticks.push(svg`<line x1=${x1Tickmark} x2=${x2Tickmark} y1=${yMin} y2=${yMin} 
                    stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke" 
                    stroke-dasharray="4 4"/>`);
  }
  if (advice.max < maxValue) {
    const yMax = valueToY(advice.max, minValue, maxValue, height);
    ticks.push(svg`<line x1=${x1Tickmark} x2=${x2Tickmark} y1=${yMax} y2=${yMax} 
                    stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke" 
                    stroke-dasharray="4 4"/>`);
  }

  if (advice.type === AdviceType.caution) {
    let mainColor;
    let fillColor: string = 'var(--instrument-frame-primary-color)';
    if (advice.state === AdviceState.hinted) {
      mainColor = 'var(--instrument-frame-tertiary-color)';
    } else if (advice.state === AdviceState.regular) {
      mainColor = 'var(--instrument-tick-mark-tertiary-color)';
    } else {
      mainColor = 'var(--on-caution-active-color)';
      fillColor = 'var(--alert-caution-color)';
    }
    const pattern = [];
    const ypattern = 50;
    // Center the pattern around the advice mask position
    // Pattern draws from x=0 to x=50, so translate it to center on the mask
    // Mask is at x1+4 to x1+12 (center at x1+8)
    const patternOffsetX = x1 + 8 - 25; // Center pattern (50px wide) on mask center
    for (let i = -16 * 8; i < 16 * 14; i += 16) {
      pattern.push(svg`<g transform="translate(${patternOffsetX} ${-i}) ">
            <path d="M 50 0 L 0 ${ypattern}" stroke=${mainColor} stroke-width="6"/>
            </g>
            `);
    }
    const maskId = `adviceMask-${advice.min}-${advice.max}-${Math.random().toString(36).substr(2, 9)}`;
    let tickmarkStyle = TickmarkStyle.hinted;
    if (advice.state === AdviceState.regular) {
      tickmarkStyle = TickmarkStyle.regular;
    } else if (advice.state === AdviceState.triggered) {
      tickmarkStyle = TickmarkStyle.enhanced;
    }

    return svg`
            <mask id=${maskId}>
                ${adviceMask({height, minValue, maxValue, min: advice.min, max: advice.max, fill: 'white', stroke: 'black', x1})}
            </mask>
            <g mask="url(#${maskId})">
                ${fillColor ? svg`<rect x="-256" y="-512" width="512" height="1024" fill="${fillColor}"/>` : nothing}
                ${pattern}
            </g>
            ${adviceMask({height, minValue, maxValue, min: advice.min, max: advice.max, fill: 'none', stroke: mainColor, x1})}
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.min, style: tickmarkStyle, tickmarksBaseX, position})}
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.max, style: tickmarkStyle, tickmarksBaseX, position})}
            ${ticks}
        `;
  } else {
    let strokeColor;
    let tickmarkStyle;
    let fillColor: string;
    if (advice.state === AdviceState.hinted) {
      strokeColor = 'var(--instrument-frame-tertiary-color)';
      fillColor = 'var(--instrument-frame-primary-color)';
      tickmarkStyle = TickmarkStyle.hinted;
    } else if (advice.state === AdviceState.regular) {
      strokeColor = 'var(--instrument-regular-secondary-color)';
      fillColor = 'var(--instrument-frame-primary-color)';
      tickmarkStyle = TickmarkStyle.regular;
    } else {
      strokeColor = 'var(--instrument-enhanced-secondary-color)';
      fillColor = strokeColor;
      tickmarkStyle = TickmarkStyle.regular;
    }
    return svg`
            ${adviceMask({height, minValue, maxValue, min: advice.min, max: advice.max, fill: fillColor, stroke: strokeColor, x1})}
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.min, style: tickmarkStyle, tickmarksBaseX, position})}
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.max, style: tickmarkStyle, tickmarksBaseX, position})}
            ${ticks}
        `;
  }
}
