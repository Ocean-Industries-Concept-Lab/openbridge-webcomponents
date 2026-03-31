import {SVGTemplateResult, nothing, svg} from 'lit';
import {TickmarkStyle, TickmarkType, tickmark} from './tickmark.js';

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
  hideMinTickmark?: boolean;
  hideMaxTickmark?: boolean;
}

export interface AngleAdvice {
  minAngle: number;
  maxAngle: number;
  type: AdviceType;
  hinted: boolean;
}

const margin = (344 - 328) / 2 + 8;
const deltaAngle = Math.atan2(margin, (344 + 328) / 2);

export function adviceMask(
  minAngle: number,
  maxAngle: number,
  fill: string,
  stroke: string,
  radiusOffset = 0
): SVGTemplateResult | typeof nothing {
  const spanRad = ((maxAngle - minAngle) * Math.PI) / 180;
  const da = Math.min(deltaAngle, spanRad * 0.15);
  if (spanRad <= da * 2) return nothing;

  const radl = (minAngle * Math.PI) / 180 + da;
  const radh = (maxAngle * Math.PI) / 180 - da;
  const r1 = 328 / 2 + radiusOffset;
  const r2 = 344 / 2 + radiusOffset;
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

export function renderAdvice(
  advice: AngleAdviceRaw,
  radiusOffset = 0
): SVGTemplateResult | typeof nothing {
  const spanRad = ((advice.maxAngle - advice.minAngle) * Math.PI) / 180;
  const da = Math.min(deltaAngle, spanRad * 0.15);
  if (spanRad <= da * 2) return nothing;

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
    if (radiusOffset > 0) {
      // Draw hatch lines directly as short segments crossing the enlarged
      // annular band. The radial-fan-tile approach (rotate + translate) causes
      // artifacts at large offsets because each tile's center orbits the origin,
      // making stripes cross the band at inconsistent widths/angles.
      //
      // Geometry is derived from the original pattern at base radius:
      //   - 45 tiles × 2 stripes = 90 crossings over 360° → 4° arc step
      //   - At base rAvg 168, arc spacing ≈ 11.73 px
      //   - Stripe slant ≈ 40.4° from radial direction
      //   - Perpendicular line width ≈ 4 px
      const r1z = 328 / 2 + radiusOffset;
      const r2z = 344 / 2 + radiusOffset;
      const rAvg = (r1z + r2z) / 2;
      const baseSpacing = (2 * Math.PI * 168) / 90;
      const nLines = Math.round((2 * Math.PI * rAvg) / baseSpacing);
      const slant = 0.705; // 40.4° from radial direction
      // Extend lines well beyond r1z/r2z so slanted endpoints fully cover
      // the annular band edges. The mask clips any overshoot.
      const rInner = r1z - 12;
      const rOuter = r2z + 12;
      const halfDelta = (Math.tan(slant) * (rOuter - rInner)) / (2 * rAvg);
      for (let j = 0; j < nLines; j++) {
        const theta = (j * 2 * Math.PI) / nLines;
        const x1 = rInner * Math.sin(theta - halfDelta);
        const y1 = -rInner * Math.cos(theta - halfDelta);
        const x2 = rOuter * Math.sin(theta + halfDelta);
        const y2 = -rOuter * Math.cos(theta + halfDelta);
        radialPattern.push(
          svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke=${mainColor} stroke-width="4"/>`
        );
      }
    } else {
      for (let i = 0; i < 180; i += 4) {
        radialPattern.push(svg`<g transform="rotate(${i}) translate(-256 -256) ">
            <path d="M369.167 64.7317L144 194.732L142 191.268L367.167 61.2676L369.167 64.7317ZM369.167 320.732L144 450.732L142 447.267L367.167 317.267L369.167 320.732Z" fill=${mainColor}/>
            </g>
            `);
      }
    }
    const maskId = `adviceMask-${advice.minAngle}-${advice.maxAngle}`;
    let tickmarkStyle = TickmarkStyle.regular;
    if (advice.state === AdviceState.regular) {
      tickmarkStyle = TickmarkStyle.regular;
    } else if (advice.state === AdviceState.triggered) {
      tickmarkStyle = TickmarkStyle.enhanced;
    }

    const maskStroke = radiusOffset > 0 ? 'none' : 'black';
    const maskShape = adviceMask(
      advice.minAngle,
      advice.maxAngle,
      'white',
      maskStroke,
      radiusOffset
    );
    const outlineShape = adviceMask(
      advice.minAngle,
      advice.maxAngle,
      'none',
      mainColor,
      radiusOffset
    );

    let mask;
    let fillRect;
    if (radiusOffset > 0) {
      const extent = 344 / 2 + radiusOffset + 32;
      mask = svg`<mask id=${maskId} maskUnits="userSpaceOnUse" x="${-extent}" y="${-extent}" width="${extent * 2}" height="${extent * 2}">${maskShape}</mask>`;
      fillRect = fillColor
        ? svg`<rect x="${-extent}" y="${-extent}" width="${extent * 2}" height="${extent * 2}" fill="${fillColor}"/>`
        : nothing;
    } else {
      mask = svg`<mask id=${maskId}>${maskShape}</mask>`;
      fillRect = fillColor
        ? svg`<rect x="-256" y="-256" width="512" height="512" fill="${fillColor}"/>`
        : nothing;
    }

    return svg`
            ${mask}
            <g mask="url(#${maskId})">
                ${fillRect}
                ${radialPattern}
            </g>
            ${outlineShape}
            ${
              advice.hideMinTickmark
                ? nothing
                : tickmark(advice.minAngle, {
                    size: TickmarkType.primary,
                    style: tickmarkStyle,
                    scale: 1,
                    inside: false,
                    textRadius: 0,
                    maxDigits: 0,
                    radiusOffset,
                  })
            }
            ${
              advice.hideMaxTickmark
                ? nothing
                : tickmark(advice.maxAngle, {
                    size: TickmarkType.primary,
                    style: tickmarkStyle,
                    scale: 1,
                    inside: false,
                    textRadius: 0,
                    maxDigits: 0,
                    radiusOffset,
                  })
            }
        `;
  } else {
    let mainColor;
    let tickmarkStyle;
    if (advice.state === AdviceState.hinted) {
      mainColor = 'var(--instrument-frame-tertiary-color)';
      tickmarkStyle = TickmarkStyle.regular;
    } else if (advice.state === AdviceState.regular) {
      mainColor = 'var(--instrument-regular-secondary-color)';
      tickmarkStyle = TickmarkStyle.regular;
    } else {
      mainColor = 'var(--instrument-enhanced-secondary-color)';
      tickmarkStyle = TickmarkStyle.regular;
    }
    return svg`
            ${adviceMask(advice.minAngle, advice.maxAngle, advice.state === AdviceState.triggered ? mainColor : 'none', mainColor, radiusOffset)}
            ${tickmark(advice.minAngle, {
              size: TickmarkType.primary,
              style: tickmarkStyle,
              scale: 1,
              inside: false,
              textRadius: 0,
              maxDigits: 0,
              radiusOffset,
            })}
            ${tickmark(advice.maxAngle, {
              size: TickmarkType.primary,
              style: tickmarkStyle,
              scale: 1,
              inside: false,
              textRadius: 0,
              maxDigits: 0,
              radiusOffset,
            })}
        `;
  }
}
