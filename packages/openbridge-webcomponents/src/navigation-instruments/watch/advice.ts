import {SVGTemplateResult, nothing, svg} from 'lit';
import {TickmarkStyle, TickmarkType, tickmark} from './tickmark';

export enum AdviceType {
  advice = 'advice',
  caution = 'caution',
}

export enum AdviceState {
  regular = 'regular',
  hinted = 'hinted',
  triggered = 'triggered',
}

export interface AngleAdviceRaw {
  minAngle: number;
  maxAngle: number;
  type: AdviceType;
  state: AdviceState;
}

export interface AngleAdvice {
  minAngle: number;
  maxAngle: number;
  type: AdviceType;
  hinted: boolean;
}

const margin = (344 - 328) / 2 + 8;
const deltaAngle = Math.atan2(margin, (344 + 328) / 2);

function adviceMask(
  minAngle: number,
  maxAngle: number,
  fill: string,
  stroke: string
): SVGTemplateResult {
  const radl = (minAngle * Math.PI) / 180 + deltaAngle;
  const radh = (maxAngle * Math.PI) / 180 - deltaAngle;
  const r1 = 328 / 2;
  const r2 = 344 / 2;
  const R = (r2 - r1) / 2;
  const x1l = Math.sin(radl) * r1;
  const y1l = -Math.cos(radl) * r1;
  const x2l = Math.sin(radl) * r2;
  const y2l = -Math.cos(radl) * r2;

  const x1h = Math.sin(radh) * r1;
  const y1h = -Math.cos(radh) * r1;
  const x2h = Math.sin(radh) * r2;
  const y2h = -Math.cos(radh) * r2;

  const path = `M ${x1l} ${y1l} 
                    A ${r1} ${r1} 0 0 1 ${x1h} ${y1h}
                    A ${R} ${R} 0 0 0 ${x2h} ${y2h}
                    A ${r2} ${r2} 0 0 0 ${x2l} ${y2l}
                    A ${R} ${R} 0 0 0 ${x1l} ${y1l}
                    Z`;
  return svg`<path d=${path} fill=${fill} stroke=${stroke} stroke-width="1" vector-effect="non-scaling-stroke" />`;
}

export function renderAdvice(advice: AngleAdviceRaw): SVGTemplateResult {
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
    const radialPattern = [];
    for (let i = 0; i < 180; i += 4) {
      radialPattern.push(svg`<g transform="rotate(${i}) translate(-256 -256) ">
            <path d="M369.167 64.7317L144 194.732L142 191.268L367.167 61.2676L369.167 64.7317ZM369.167 320.732L144 450.732L142 447.267L367.167 317.267L369.167 320.732Z" fill=${mainColor}/>
            </g>
            `);
    }
    const maskId = `adviceMask-${advice.minAngle}-${advice.maxAngle}`;
    let tickmarkStyle = TickmarkStyle.hinted;
    if (advice.state === AdviceState.regular) {
      tickmarkStyle = TickmarkStyle.regular;
    } else if (advice.state === AdviceState.triggered) {
      tickmarkStyle = TickmarkStyle.enhanced;
    }

    return svg`
            <mask id=${maskId}>
                ${adviceMask(advice.minAngle, advice.maxAngle, 'white', 'black')}
            </mask>
            <g mask="url(#${maskId})">
                ${fillColor ? svg`<rect x="-256" y="-256" width="512" height="512" fill="${fillColor}"/>` : nothing}
                ${radialPattern}
            </g>
            ${adviceMask(advice.minAngle, advice.maxAngle, 'none', mainColor)}
            ${tickmark(advice.minAngle, TickmarkType.primary, tickmarkStyle, 1)}
            ${tickmark(advice.maxAngle, TickmarkType.primary, tickmarkStyle, 1)}
        `;
  } else {
    let mainColor;
    let tickmarkStyle;
    if (advice.state === AdviceState.hinted) {
      mainColor = 'var(--instrument-frame-tertiary-color)';
      tickmarkStyle = TickmarkStyle.hinted;
    } else if (advice.state === AdviceState.regular) {
      mainColor = 'var(--instrument-regular-secondary-color)';
      tickmarkStyle = TickmarkStyle.regular;
    } else {
      mainColor = 'var(--instrument-enhanced-secondary-color)';
      tickmarkStyle = TickmarkStyle.regular;
    }
    return svg`
            ${adviceMask(advice.minAngle, advice.maxAngle, advice.state === AdviceState.triggered ? mainColor : 'none', mainColor)}
            ${tickmark(advice.minAngle, TickmarkType.primary, tickmarkStyle, 1)}
            ${tickmark(advice.maxAngle, TickmarkType.primary, tickmarkStyle, 1)}
        `;
  }
}
