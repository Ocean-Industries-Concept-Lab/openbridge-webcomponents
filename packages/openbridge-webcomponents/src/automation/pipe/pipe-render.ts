import {svg, type TemplateResult} from 'lit';
import type {PipeStroke} from './pipe-styles.js';

// The single shared render primitive for the whole obc-pipe-* family: every
// piece is one or more centreline paths stroked twice — an outline-weight
// pass in the border color, then (for states with a fill) a fill-weight pass
// in the fill color over it — matching how the Figma "Connectors" vectors
// are constructed. The outline pass carries the dash pattern, so
// `closed`/`closed-dash` (where `resolvePipeStroke` returns a null fill)
// render as a single solid/dashed stroke.
//
// `renderPipeStrokes(d, stroke)` strokes one path. When a piece is built
// from SEVERAL paths whose z-order must interleave per pass (the overlap's
// gapped under-run and continuous over-run), use the multi-path form
// `renderLayeredPipeStrokes([under, over], stroke)`: it draws the outline
// pass over every path before the fill pass, so the later path's fill covers
// the earlier path's outline at the crossing.
export function renderLayeredPipeStrokes(
  ds: string[],
  stroke: PipeStroke
): TemplateResult[] {
  const parts: TemplateResult[] = ds.map(
    (d) => svg`<path d=${d} fill="none" vector-effect="non-scaling-stroke"
      stroke="var(${stroke.outlineVar})" stroke-width=${stroke.outlineWeight}
      stroke-dasharray=${stroke.dashPattern.join(' ')} />`
  );
  if (stroke.fillVar !== null && stroke.fillWeight !== null) {
    for (const d of ds) {
      parts.push(svg`<path d=${d} fill="none" vector-effect="non-scaling-stroke"
        stroke="var(${stroke.fillVar})" stroke-width=${stroke.fillWeight} />`);
    }
  }
  return parts;
}

export function renderPipeStrokes(
  d: string,
  stroke: PipeStroke
): TemplateResult[] {
  return renderLayeredPipeStrokes([d], stroke);
}
