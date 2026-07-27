import {svg, SVGTemplateResult} from 'lit';

/**
 * Chevron band paths of the 96x96 speed-arrows canvas, innermost band first
 * (band 0 is closest to the vessel when pointing away from it).
 * Shared by obc-speed-arrows and obc-speed-directions.
 */
export const CHEVRON_PATHS = [
  'M48.0004 56L76.0004 72L76.0004 88L48.0004 72L20 88L20.0004 72L48.0004 56Z',
  'M76.0004 48L48.0004 32L20.0004 48L20 64L48.0004 48L76.0004 64L76.0004 48Z',
  'M76.0004 24L48.0004 8L20.0004 24L20 40L48.0004 24L76.0004 40L76.0004 24Z',
] as const;

export function renderChevronBand(
  path: string,
  fill: string,
  stroke: string
): SVGTemplateResult {
  return svg`
<path d=${path} fill=${fill}/>
<path d=${path} vector-effect="non-scaling-stroke" stroke=${stroke} stroke-linecap="square"/>`;
}
