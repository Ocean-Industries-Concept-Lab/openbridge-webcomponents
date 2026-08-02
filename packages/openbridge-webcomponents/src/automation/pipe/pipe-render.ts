import {svg, type TemplateResult} from 'lit';
import type {PipeStroke} from './pipe-styles.js';

// Renders a resolved PipeStroke as an outline path plus, when present, an
// inner fill path — the shared stroke-pair pattern used by every obc-pipe-*
// component (straight, corner, and future endpoint/junction members).
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
