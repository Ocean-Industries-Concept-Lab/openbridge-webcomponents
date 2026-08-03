import {svg, type TemplateResult} from 'lit';
import type {PipeStroke} from './pipe-styles.js';
import type {PipeChannel, PipeJunction} from './pipe-geometry.js';

// Renders a resolved PipeStroke as an outline path plus, when present, an
// inner fill path — the shared stroke-pair pattern used by `obc-pipe-endpoint`
// and `obc-pipe-arrow`, whose per-piece (stub/cap/head) composition doesn't
// fit the single-channel shape `renderPipeChannel` expects.
export function renderPipeStrokes(d: string, stroke: PipeStroke): TemplateResult[] {
  const parts: TemplateResult[] = [
    svg`<path d=${d} fill="none" vector-effect="non-scaling-stroke"
      stroke="var(${stroke.outlineVar})" stroke-width=${stroke.outlineWeight}
      stroke-dasharray=${stroke.dashPattern.join(' ')} />`,
  ];
  if (stroke.fillVar !== null && stroke.fillWeight !== null) {
    parts.push(svg`<path d=${d} fill="none" vector-effect="non-scaling-stroke"
      stroke="var(${stroke.fillVar})" stroke-width=${stroke.fillWeight} />`);
  }
  return parts;
}

// Renders a resolved PipeStroke over a `PipeChannel` (a centreline `inner`
// path plus its two flanking `walls` paths) as the Figma walled-channel
// model: a fat interior stroke in the fill color, bordered by two 1px wall
// strokes in the outline color. This is the shared render path for
// `obc-pipe-straight` and `obc-pipe-corner`.
//
// For `closed`/`closed-dash` — where `resolvePipeStroke` returns a null
// `fillVar` — there is no separate interior/wall split; a single band is
// drawn at the fill width in the outline color (tertiary-inverted), with no
// wall lines, dashed for `closed-dash`. This matches the pre-existing closed
// appearance.
export function renderPipeChannel(channel: PipeChannel, stroke: PipeStroke): TemplateResult[] {
  if (stroke.fillVar === null || stroke.fillWeight === null) {
    return [
      svg`<path d=${channel.inner} fill="none" vector-effect="non-scaling-stroke"
        stroke="var(${stroke.outlineVar})" stroke-width=${stroke.outlineWeight}
        stroke-dasharray=${stroke.dashPattern.join(' ')} />`,
    ];
  }
  return [
    svg`<path d=${channel.inner} fill="none" vector-effect="non-scaling-stroke"
      stroke="var(${stroke.fillVar})" stroke-width=${stroke.fillWeight} />`,
    svg`<path d=${channel.walls[0]} fill="none" vector-effect="non-scaling-stroke"
      stroke="var(${stroke.outlineVar})" stroke-width="1" />`,
    svg`<path d=${channel.walls[1]} fill="none" vector-effect="non-scaling-stroke"
      stroke="var(${stroke.outlineVar})" stroke-width="1" />`,
  ];
}

// Renders a resolved PipeStroke over a `PipeJunction` (a filled `interior`
// path plus a flat list of 1px `walls` segments) as the open-mouth junction
// model from OPEN-ENDINGS-CORRECTION.md: a continuous interior fill with
// wall segments that stop at the tile edges and break at the crossing —
// never a closed silhouette that caps a mouth. This is the shared render
// path for `obc-pipe-cross`, `obc-pipe-tee`, and `obc-pipe-overlap`.
//
// For `closed`/`closed-dash` — where `resolvePipeStroke` returns a null
// `fillVar` — there is no separate interior/wall split; the interior is
// filled directly in the outline color (tertiary-inverted) with no wall
// segments drawn on top, matching the pre-existing closed appearance
// (a single solid band, dashed for `closed-dash` via the interior's own
// dash pattern... closed junctions have no meaningful dash axis, so the
// interior is drawn solid for both — dashing a 2-D fill region isn't
// applicable the way it is for a 1-D centreline).
export function renderPipeJunction(junction: PipeJunction, stroke: PipeStroke): TemplateResult[] {
  if (stroke.fillVar === null || stroke.fillWeight === null) {
    return [svg`<path d=${junction.interior} fill="var(${stroke.outlineVar})" stroke="none" />`];
  }
  const parts: TemplateResult[] = [
    svg`<path d=${junction.interior} fill="var(${stroke.fillVar})" stroke="none" />`,
  ];
  for (const wall of junction.walls) {
    parts.push(svg`<path d=${wall} fill="none" vector-effect="non-scaling-stroke"
      stroke="var(${stroke.outlineVar})" stroke-width="1" />`);
  }
  return parts;
}
