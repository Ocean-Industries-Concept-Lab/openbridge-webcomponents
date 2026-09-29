/**
 * Geometry derived from a Corner segment. A corner stores only its two tangent
 * points and which corner of the square they span the elbow sits on; the pivot
 * and radius follow from that.
 */
import type {Corner, CornerDirection, Point} from './segment.js'

/** The elbow point — where the two arms would meet if the bend were sharp. */
export function cornerPivot(c: Corner): Point {
  const left = c.direction === 'TopLeft' || c.direction === 'BottomLeft'
  const top = c.direction === 'TopLeft' || c.direction === 'TopRight'
  return {
    x: left ? Math.min(c.from.x, c.to.x) : Math.max(c.from.x, c.to.x),
    y: top ? Math.min(c.from.y, c.to.y) : Math.max(c.from.y, c.to.y),
  }
}

/** Radius of the bend — the side of the square spanned by `from`/`to`. */
export function cornerRadius(c: Corner): number {
  return Math.abs(c.from.x - c.to.x)
}

/** Direction for a corner whose elbow is `pivot` and whose tangent points are
 *  `from`/`to` — the inverse of `cornerPivot`. */
export function cornerDirection(pivot: Point, from: Point, to: Point): CornerDirection {
  const left = pivot.x <= Math.min(from.x, to.x)
  const top = pivot.y <= Math.min(from.y, to.y)
  return top ? (left ? 'TopLeft' : 'TopRight') : (left ? 'BottomLeft' : 'BottomRight')
}
