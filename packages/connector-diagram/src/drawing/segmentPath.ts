/**
 * Traces the centre line of one segment onto a canvas path. This is the single
 * definition of where a segment sits, shared by two callers: the renderer draws
 * it with rounded corners, and the hit-buffer draws it with sharp ones. It writes
 * to a tiny path interface so it can be tested without a real canvas.
 */
import {GRID} from '../model/types.js'
import type {Segment} from '../model/segment.js'
import {cornerPivot, cornerRadius} from '../model/corner.js'

export interface PathSink {
  moveTo(x: number, y: number): void
  lineTo(x: number, y: number): void
  arcTo?(x1: number, y1: number, x2: number, y2: number, radius: number): void
}

const DIR_VEC: Record<string, {dx: number; dy: number}> = {
  right: {dx: 1, dy: 0}, left: {dx: -1, dy: 0}, bottom: {dx: 0, dy: 1}, top: {dx: 0, dy: -1},
}

export function appendSegmentPath(sink: PathSink, seg: Segment, opts: {radius?: number} = {}): void {
  switch (seg.kind) {
    case 'straight':
      sink.moveTo(seg.x1, seg.y1); sink.lineTo(seg.x2, seg.y2)
      return
    case 'corner': {
      const r = opts.radius ?? cornerRadius(seg)
      const p = cornerPivot(seg)
      sink.moveTo(seg.from.x, seg.from.y)
      if (r > 0 && sink.arcTo) sink.arcTo(p.x, p.y, seg.to.x, seg.to.y, r)
      else { sink.lineTo(p.x, p.y); sink.lineTo(seg.to.x, seg.to.y) }
      return
    }
    case 'endpoint':
    case 'arrow': {
      // A short inward stub — enough for hit-testing; the visual cap/head is drawn
      // by the glyphs layer. Stub runs from the terminus inward (opposite direction).
      const v = DIR_VEC[seg.direction]
      sink.moveTo(seg.x, seg.y)
      sink.lineTo(seg.x - v.dx * (GRID / 2), seg.y - v.dy * (GRID / 2))
      return
    }
    case 'direction':
      // Sits ON a straight that is already in the path; nothing of its own to
      // stroke or hit-test.
      return
  }
}
