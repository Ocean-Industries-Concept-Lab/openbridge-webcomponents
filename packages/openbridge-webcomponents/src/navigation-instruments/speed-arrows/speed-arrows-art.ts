/**
 * Shared chevron art for stepped speed indicators.
 *
 * All paths are authored on a 96x96 canvas with the chevrons pointing up and
 * stacked in three horizontal bands; consumers place them with their own
 * `translate`/`rotate`/`scale` transforms (`obc-speed-arrows` rotates the
 * whole 96 box per direction, `obc-speed-directions` scales the box into its
 * placement cells and bar tips).
 *
 * `renderChevronBand(path, fill, stroke)` renders one band as the canonical
 * two-path fragment: a filled path plus a non-scaling-stroke outline path
 * with square line caps — the exact markup `obc-speed-arrows` historically
 * inlined, so its rendering stays byte-identical.
 */
import {svg, SVGTemplateResult} from 'lit';

/**
 * Chevron band paths of the 96x96 speed-arrows canvas, innermost band first
 * (band 0 is closest to the vessel when pointing away from it).
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
