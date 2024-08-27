import {SVGTemplateResult, svg} from 'lit';
import {TickmarkType, TickmarkStyle, tickmarkColor} from '../watch/tickmark';

export function radialTickmarks(
  minAngle: number,
  maxAngle: number,
  type: TickmarkType | undefined
): SVGTemplateResult | SVGTemplateResult[] {
  if (type === TickmarkType.main || type === TickmarkType.tertiary) {
    throw new Error(
      'Only secondary tickmarks or undefined tickmarks (dots) are supported'
    );
  }

  const originX = 256;
  const originY = 256;
  const radius = 368 / 2;
  const strokeWidth = '1.2';
  const margin = 1.5;
  const colorName = tickmarkColor(TickmarkStyle.hinted);

  const minRad = (minAngle * Math.PI) / 180;
  const maxRad = (maxAngle * Math.PI) / 180;
  const width = type === TickmarkType.secondary ? 4 : 1;
  const tickmarks = [];

  const sinMin = Math.sin(minRad);
  const cosMin = Math.cos(minRad);
  const sinMax = Math.sin(maxRad);
  const cosMax = Math.cos(maxRad);

  let deltaR = 0;

  while (deltaR <= radius) {
    const xMin = originX + sinMin * deltaR;
    const yMin = originY - cosMin * deltaR;
    const xMax = originX + sinMax * deltaR;
    const yMax = originY - cosMax * deltaR;

    if (type === undefined) {
      const size = 1;
      tickmarks.push(
        svg`<rect 
          x=${xMin - size / 2} 
          y=${yMin - size / 2} 
          width=${size} 
          height=${size} 
          fill=${colorName} 
          transform="rotate(${minAngle} ${xMin} ${yMin})" 
          vector-effect="non-scaling-stroke"/>`
      );
      tickmarks.push(
        svg`<rect 
          x=${xMax - size / 2} 
          y=${yMax - size / 2} 
          width=${size} 
          height=${size} 
          fill=${colorName} 
          transform="rotate(${maxAngle} ${xMax} ${yMax})" 
          vector-effect="non-scaling-stroke"/>`
      );
    } else {
      const nextRadius = deltaR + width;
      const finalRadius = Math.min(nextRadius, radius);

      const x2Min = originX + sinMin * finalRadius;
      const y2Min = originY - cosMin * finalRadius;

      const x2Max = originX + sinMax * finalRadius;
      const y2Max = originY - cosMax * finalRadius;

      tickmarks.push(
        svg`<line x1=${xMin} y1=${yMin} x2=${x2Min} y2=${y2Min} stroke=${colorName} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`
      );
      tickmarks.push(
        svg`<line x1=${xMax} y1=${yMax} x2=${x2Max} y2=${y2Max} stroke=${colorName} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`
      );

      if (nextRadius >= radius) break;
    }

    deltaR += width * margin;
  }

  return tickmarks;
}
