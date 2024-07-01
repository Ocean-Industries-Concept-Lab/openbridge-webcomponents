import {svg} from 'lit';
import {TickmarkStyle, tickmarkColor} from '../watch/tickmark';

export function singleSidedTickmark(value: number, style: TickmarkStyle) {
  if (value >= 100) {
    return null;
  }
  const color = tickmarkColor(style);
  const y = (-value * 134) / 100 - 2;
  return svg`<line x1="12" x2="32" y1=${y}  y2=${y} stroke=${color} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}
