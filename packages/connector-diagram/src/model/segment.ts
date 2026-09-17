import type {PipeValue, PipeSize, Direction, MediumColor} from './types.js'

export interface Point { x: number; y: number }

interface SegBase {
  connectionId: string
  value: PipeValue
  size: PipeSize
  /** Colours the medium-flow style (open pipe in medium view). */
  mediumColor?: MediumColor
  /** Draw-only geometry (e.g. the port-to-centre stub hidden under a
   * component): rendered, but never hit-testable — a press on a component's
   * body centre is not a press "on the pipe". */
  decorative?: boolean
}

/** A straight run between two exact axis-aligned points (x1==x2 || y1==y2). */
export interface Straight extends SegBase {
  kind: 'straight'
  x1: number; y1: number; x2: number; y2: number
}

/** Which corner of the square spanned by a Corner's `from`/`to` the elbow sits on. */
export type CornerDirection = 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight'

/** A rounded 90° bend between the tangent points `from` and `to`. `direction`
 *  names which corner of the square spanned by `from`/`to` the elbow (pivot)
 *  sits on; the radius is the square's side. See `cornerPivot`/`cornerRadius`. */
export interface Corner extends SegBase {
  kind: 'corner'
  from: Point
  to: Point
  direction: CornerDirection
}

/** A loose (free) terminus — drawn with the T end-cap. `direction` points outward. */
export interface Endpoint extends SegBase {
  kind: 'endpoint'
  x: number; y: number
  direction: Direction
}

/** A flow arrowhead at a terminus. `direction` = the end's OUTWARD direction
 *  (like Endpoint); the glyph decides which way its head points — `going-to`
 *  heads outward, `coming-from` heads back into the pipe. */
export interface Arrow extends SegBase {
  kind: 'arrow'
  x: number; y: number
  direction: Direction
  flow: 'going-to' | 'coming-from'
}

/** A flow-direction chevron drawn ON the pipe, part-way along it (see
 *  Connection.direction / directionPosition). `direction` is the way the
 *  chevron POINTS. Purely decorative: never hit-testable. */
export interface DirectionArrow extends SegBase {
  kind: 'direction'
  x: number; y: number
  direction: Direction
}

export type Segment = Straight | Corner | Endpoint | Arrow | DirectionArrow
