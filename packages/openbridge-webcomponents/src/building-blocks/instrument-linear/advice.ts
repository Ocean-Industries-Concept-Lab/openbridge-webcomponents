import {SVGTemplateResult, nothing, svg} from 'lit';
import {
  AdviceState,
  AdviceType,
} from '../../navigation-instruments/watch/advice.js';
import {
  tickmarkColor,
  TickmarkStyle,
} from '../../navigation-instruments/watch/tickmark.js';
import {valueToY} from './instrument-linear.js';

export interface LinearAdviceRaw {
  min: number;
  max: number;
  type: AdviceType;
  state: AdviceState;
}

export interface LinearAdvice {
  min: number;
  max: number;
  type: AdviceType;
  hinted: boolean;
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
  const x2 = x1 + width + offset;
  const r = width / 2;
  const yL = valueToY(min, minValue, maxValue, height) - 2 * r;
  const yH = valueToY(max, minValue, maxValue, height) + 2 * r;

  const path = `M ${x1 + offset} ${yL} 
                    A ${r} ${r} 0 0 0 ${x2} ${yL}
                    V ${yH}
                    A ${r} ${r} 0 0 0 ${x1 + offset} ${yH}
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
  x1,
}: {
  height: number;
  scaleWidth: number;
  minValue: number;
  maxValue: number;
  value: number;
  style: TickmarkStyle;
  x1: number;
}) {
  if (value >= maxValue || value <= minValue) {
    return null;
  }
  const color = tickmarkColor(style);
  const y = valueToY(value, minValue, maxValue, height);
  return svg`<line x1=${x1 - 2} x2=${x1 + scaleWidth} y1=${y}  y2=${y} stroke=${color} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

export function renderAdvice(
  height: number,
  minValue: number,
  maxValue: number,
  barWidth: number,
  scaleWidth: number,
  advice: LinearAdviceRaw
): SVGTemplateResult {
  const x1 = barWidth / 2 - scaleWidth;

  const x1Tickmark = -barWidth / 2;
  const x2Tickmark = barWidth / 2 - scaleWidth;
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
    for (let i = -16 * 8; i < 16 * 14; i += 16) {
      pattern.push(svg`<g transform="translate(0 ${-i}) ">
            <path d="M 50 0 L 0 ${ypattern}" stroke=${mainColor} stroke-width="6"/>
            </g>
            `);
    }
    const maskId = `adviceMask-${advice.min}-${advice.max}`;
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
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.min, style: tickmarkStyle, x1})}
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.max, style: tickmarkStyle, x1})}
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
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.min, style: tickmarkStyle, x1})}
            ${singleSidedTickmark({height, scaleWidth, minValue, maxValue, value: advice.max, style: tickmarkStyle, x1})}
            ${ticks}
        `;
  }
}
