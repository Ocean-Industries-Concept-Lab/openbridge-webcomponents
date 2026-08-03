import {svg, type TemplateResult} from 'lit';
import type {PipeStroke} from './pipe-styles.js';
import type {PipeChannel} from './pipe-geometry.js';

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
