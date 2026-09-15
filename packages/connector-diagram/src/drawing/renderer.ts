/**
 * Draws the pipes. Each pipe is two strokes: a wider outline and a narrower fill
 * on top. It draws ALL the outlines first, then all the fills, so that where two
 * pipes meet the outlines merge cleanly instead of one cutting across the other.
 * End caps, flow arrows and direction chevrons are drawn last.
 */
import {DEFAULT_THEME, type ThemeVars} from '../model/types.js'
import type {Segment} from '../model/segment.js'
import {resolvePipeStroke} from './styles.js'
import {appendSegmentPath} from './segmentPath.js'
import {drawEndpoint, drawArrow, drawDirectionArrow} from './glyphs.js'

export interface RenderOptions {
  theme?: ThemeVars
  /** Clear the canvas first (default true). Pass false to draw ON TOP of existing
   *  content — e.g. an editor drawing a live preview over the committed diagram. */
  clear?: boolean
}

export function renderSegments(
  ctx: CanvasRenderingContext2D,
  segments: Segment[],
  opts: RenderOptions = {},
): void {
  const theme = opts.theme ?? DEFAULT_THEME
  if (opts.clear !== false) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.lineCap = 'butt'
  ctx.lineJoin = 'round'

  const strokeable = segments.filter(s => s.kind === 'straight' || s.kind === 'corner')

  // Pass 1 — outlines
  for (const s of strokeable) {
    const st = resolvePipeStroke(s.value, s.size, theme, s.mediumColor)
    ctx.setLineDash(st.dashPattern)
    ctx.beginPath()
    appendSegmentPath(ctx, s)
    ctx.strokeStyle = st.outlineColor
    ctx.lineWidth = st.outlineWeight
    ctx.stroke()
  }
  ctx.setLineDash([])

  // Pass 2 — fills (skip single-stroke closed values)
  for (const s of strokeable) {
    const st = resolvePipeStroke(s.value, s.size, theme, s.mediumColor)
    if (st.fillColor === null || st.fillWeight === null) continue
    ctx.beginPath()
    appendSegmentPath(ctx, s)
    ctx.strokeStyle = st.fillColor
    ctx.lineWidth = st.fillWeight
    ctx.stroke()
  }

  // Terminals and on-pipe direction chevrons
  for (const s of segments) {
    if (s.kind === 'endpoint') drawEndpoint(ctx, s, theme)
    else if (s.kind === 'arrow') drawArrow(ctx, s, theme)
    else if (s.kind === 'direction') drawDirectionArrow(ctx, s, theme)
  }
}
