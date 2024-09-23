import {SVGTemplateResult, nothing, svg} from 'lit';
import {AdviceState, AdviceType} from '../watch/advice';
import {TickmarkStyle} from '../watch/tickmark';
import {singleSidedTickmark} from './tickmark';

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

function adviceMask(
  height: number,
  min: number,
  max: number,
  fill: string,
  stroke: string
): SVGTemplateResult {
  const width = 8;
  const x1 = 12;
  const x2 = x1 + width;
  const r = width / 2;
  const yL = (-min * height) / 100 - 2 * r - 2;
  const yH = (-max * height) / 100 + 2 * r - 2;

  const path = `M ${x1} ${yL} 
                    A ${r} ${r} 0 0 0 ${x2} ${yL}
                    V ${yH}
                    A ${r} ${r} 0 0 0 ${x1} ${yH}
                    Z`;
  return svg`<path d=${path} fill=${fill} stroke=${stroke} stroke-width="1" vector-effect="non-scaling-stroke" />`;
}

export function renderAdvice(
  height: number,
  advice: LinearAdviceRaw,
  flipDirection: boolean
): SVGTemplateResult {
  if (advice.type === AdviceType.caution) {
    let mainColor;
    let fillColor: string | null = null;
    if (advice.state === AdviceState.hinted) {
      mainColor = 'var(--instrument-frame-tertiary-color)';
    } else if (advice.state === AdviceState.regular) {
      mainColor = 'var(--instrument-tick-mark-tertiary-color)';
    } else {
      mainColor = 'var(--on-caution-active-color)';
      fillColor = 'var(--alert-caution-color)';
    }
    const pattern = [];
    const ypattern = flipDirection ? 50 : -50;
    for (let i = -100; i < 300; i += 16) {
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
                ${adviceMask(height, advice.min, advice.max, 'white', 'black')}
            </mask>
            <g mask="url(#${maskId})">
                ${fillColor ? svg`<rect x="-256" y="-512" width="512" height="1024" fill="${fillColor}"/>` : nothing}
                ${pattern}
            </g>
            ${adviceMask(height, advice.min, advice.max, 'none', mainColor)}
            ${singleSidedTickmark(height, advice.min, tickmarkStyle)}
            ${singleSidedTickmark(height, advice.max, tickmarkStyle)}
        `;
  } else {
    let strokeColor;
    let tickmarkStyle;
    let fillColor: string;
    if (advice.state === AdviceState.hinted) {
      strokeColor = 'var(--instrument-frame-tertiary-color)';
      fillColor = 'none';
      tickmarkStyle = TickmarkStyle.hinted;
    } else if (advice.state === AdviceState.regular) {
      strokeColor = 'var(--instrument-regular-secondary-color)';
      fillColor = 'none';
      tickmarkStyle = TickmarkStyle.regular;
    } else {
      strokeColor = 'var(--instrument-enhanced-secondary-color)';
      fillColor = strokeColor;
      tickmarkStyle = TickmarkStyle.regular;
    }
    return svg`
            ${adviceMask(height, advice.min, advice.max, fillColor, strokeColor)}
            ${singleSidedTickmark(height, advice.min, tickmarkStyle)}
            ${singleSidedTickmark(height, advice.max, tickmarkStyle)}
        `;
  }
}
