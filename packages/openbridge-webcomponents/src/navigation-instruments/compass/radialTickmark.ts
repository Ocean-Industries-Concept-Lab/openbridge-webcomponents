import {SVGTemplateResult, svg} from 'lit';
import {TickmarkType, TickmarkStyle, tickmarkColor} from '../watch/tickmark';

export function radialTickmarks(
  minAngle: number,
  maxAngle: number,
  type: TickmarkType | undefined
): SVGTemplateResult[] {
  if (type === TickmarkType.main || type === TickmarkType.tertiary) {
    throw new Error(
      'Only secondary tickmarks or undefined tickmarks (dots) are supported'
    );
  }

  const origin = {x: 256, y: 256};
  const radius = 184;
  const strokeWidth = '1.2';
  const margin = 1.5;
  const colorName = tickmarkColor(TickmarkStyle.hinted);
  const tickWidth = type === TickmarkType.secondary ? 4 : 1;
  const tickmarks: SVGTemplateResult[] = [];

  const sinMin = Math.sin((minAngle * Math.PI) / 180);
  const cosMin = Math.cos((minAngle * Math.PI) / 180);
  const sinMax = Math.sin((maxAngle * Math.PI) / 180);
  const cosMax = Math.cos((maxAngle * Math.PI) / 180);

  const deltaIncrement = tickWidth * margin;

  for (let deltaR = 0; deltaR <= radius; deltaR += deltaIncrement) {
    const xMin = origin.x + sinMin * deltaR;
    const yMin = origin.y - cosMin * deltaR;
    const xMax = origin.x + sinMax * deltaR;
    const yMax = origin.y - cosMax * deltaR;

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
      const currentRadius = Math.min(deltaR + tickWidth, radius);
      const x2Min = origin.x + sinMin * currentRadius;
      const y2Min = origin.y - cosMin * currentRadius;
      const x2Max = origin.x + sinMax * currentRadius;
      const y2Max = origin.y - cosMax * currentRadius;

      tickmarks.push(
        svg`<line x1=${xMin} y1=${yMin} x2=${x2Min} y2=${y2Min} stroke=${colorName} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`
      );
      tickmarks.push(
        svg`<line x1=${xMax} y1=${yMax} x2=${x2Max} y2=${y2Max} stroke=${colorName} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`
      );

      if (currentRadius >= radius) break;
    }
  }

  return tickmarks;
}
