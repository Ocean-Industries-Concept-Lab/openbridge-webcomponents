/**
 * Shape builders for the Connectors stories — produce real grid-free Segment[]
 * that, drawn by renderSegments, reproduce each Figma connector shape.
 */
import {GRID, CORNER_RADIUS, type PipeValue, type PipeSize, type Direction, type MediumColor} from '../../model/types.js'
import type {Segment, CornerDirection} from '../../model/segment.js'

const R = CORNER_RADIUS
const M = GRID / 2

const S = (connectionId: string, value: PipeValue, size: PipeSize, x1: number, y1: number, x2: number, y2: number): Segment =>
  ({kind: 'straight', connectionId, value, size, x1, y1, x2, y2})

export function horizontal(value: PipeValue, size: PipeSize, cells: number): Segment[] {
  return [S('s', value, size, 0, M, GRID * cells, M)]
}
export function vertical(value: PipeValue, size: PipeSize, cells: number): Segment[] {
  return [S('s', value, size, M, 0, M, GRID * cells)]
}

/** Corner variant names match the old glyph set (the two arms present). */
export type CornerName = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export function corner(name: CornerName, value: PipeValue, size: PipeSize, box: number): Segment[] {
  const c = box / 2
  const hx = name === 'bottom-left' || name === 'top-left' ? 1 : -1   // right arm : left arm
  const vy = name === 'top-left' || name === 'top-right' ? -1 : 1     // up arm : down arm
  const from = {x: c + hx * R, y: c}
  const to   = {x: c, y: c + vy * R}
  // The elbow sits at the box centre, opposite the two arms.
  const direction: CornerDirection = `${vy < 0 ? 'Bottom' : 'Top'}${hx > 0 ? 'Left' : 'Right'}`
  return [
    S('s', value, size, c + hx * c, c, from.x, from.y),
    {kind: 'corner', connectionId: 's', value, size, from, to, direction},
    S('s', value, size, to.x, to.y, c, c + vy * c),
  ]
}

/** Cross = two pipes meeting with NO gap (rendered without overlap-splitting). */
export function cross(value: PipeValue, size: PipeSize, box: number): Segment[] {
  const c = box / 2
  return [S('h', value, size, 0, c, box, c), S('v', value, size, c, 0, c, box)]
}

export function endpoint(direction: Direction, value: PipeValue, size: PipeSize): Segment[] {
  return [{kind: 'endpoint', connectionId: 's', value, size, x: M, y: M, direction}]
}

export function arrow(flow: 'going-to' | 'coming-from', direction: Direction, value: PipeValue, size: PipeSize): Segment[] {
  return [{kind: 'arrow', connectionId: 's', value, size, x: M, y: M, direction, flow}]
}

/** One cell of pipe along the chevron's axis with the direction chevron on it. */
export function directionArrow(direction: Direction, value: PipeValue, size: PipeSize, mediumColor?: MediumColor): Segment[] {
  const along = direction === 'left' || direction === 'right'
  const pipe = along ? S('s', value, size, 0, M, GRID, M) : S('s', value, size, M, 0, M, GRID)
  return [
    {...pipe, mediumColor},
    {kind: 'direction', connectionId: 's', value, size, mediumColor, x: M, y: M, direction, decorative: true},
  ]
}
