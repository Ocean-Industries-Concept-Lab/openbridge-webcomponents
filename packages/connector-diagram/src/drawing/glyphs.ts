/**
 * Draws the little shapes on the end of a pipe: the cap on a loose end, and the
 * flow arrowheads. They're drawn right at the pipe's end point, on top of the
 * pipe body. The arrowhead shapes are copied exactly from the Figma design.
 */
import {GRID, type PipeSize, type PipeValue, type Direction, type ThemeVars} from '../model/types.js'
import type {Endpoint, Arrow, DirectionArrow} from '../model/segment.js'
import {resolvePipeStroke} from './styles.js'

/** Every glyph's canonical artwork points +x; rotate by this to point `dir`. */
const ANGLE: Record<Direction, number> = {
  right:   0,
  left:    Math.PI,
  bottom:  Math.PI / 2,
  top:    -Math.PI / 2,
}

// ---------------------------------------------------------------------------
// Endpoint cap: pipe stub (half cell, inward) + perpendicular cap at terminus.
// ---------------------------------------------------------------------------

const ENDPOINT_OUT_CAP:  Record<PipeSize, number> = { small: 9, medium: 9, large: 9, xl: 11 }
const ENDPOINT_FILL_CAP: Record<PipeSize, number> = { small: 8, medium: 8, large: 8, xl: 10 }

export function drawEndpoint(
  ctx: CanvasRenderingContext2D,
  seg: Endpoint,
  theme: ThemeVars,
): void {
  const stroke = resolvePipeStroke(seg.value, seg.size, theme, seg.mediumColor)

  // seg.direction points OUTWARD; the canonical glyph caps to the +x side (stub
  // enters from the left), so rotate by the outward angle.
  const angle = ANGLE[seg.direction]

  const outCap  = ENDPOINT_OUT_CAP[seg.size]
  const fillCap = ENDPOINT_FILL_CAP[seg.size]
  const halfG   = GRID / 2

  ctx.save()
  ctx.translate(seg.x, seg.y)
  ctx.rotate(angle)
  ctx.lineCap = 'butt'
  ctx.lineJoin = 'miter'

  ctx.strokeStyle = stroke.outlineColor
  ctx.lineWidth = stroke.outlineWeight
  ctx.setLineDash(stroke.dashPattern)
  ctx.beginPath()
  ctx.moveTo(-halfG, 0); ctx.lineTo(0, 0)
  ctx.moveTo(0, -outCap); ctx.lineTo(0, outCap)
  ctx.stroke()
  ctx.setLineDash([])

  if (stroke.fillColor !== null && stroke.fillWeight !== null) {
    ctx.strokeStyle = stroke.fillColor
    ctx.lineWidth = stroke.fillWeight
    ctx.beginPath()
    ctx.moveTo(-halfG, 0); ctx.lineTo(0, 0)
    ctx.moveTo(0, -fillCap); ctx.lineTo(0, fillCap)
    ctx.stroke()
  }

  ctx.restore()
}

// ---------------------------------------------------------------------------
// Arrowhead: pipe stub + rounded-triangle arrowhead (exact Figma vector paths).
// ---------------------------------------------------------------------------

type PathOp =
  | {t: 'curve'; c1: [number, number]; c2: [number, number]; p: [number, number]}
  | {t: 'line'; p: [number, number]}

interface ArrowHead {
  start: [number, number]
  ops: PathOp[]
  stubEnd: number // stub runs along y=12 from x=0 to x=stubEnd
}

// going-to non-xl
const HEAD_GT_NONXL: ArrowHead = {
  start: [7.5, 4.93457],
  ops: [
    {t: 'curve', c1: [7.5, 4.13588], c2: [8.39013, 3.6595], p: [9.05469, 4.10254]},
    {t: 'line', p: [19.6533, 11.168]},
    {t: 'curve', c1: [20.247, 11.5638], c2: [20.247, 12.4362], p: [19.6533, 12.832]},
    {t: 'line', p: [9.05469, 19.8975]},
    {t: 'curve', c1: [8.39013, 20.3405], c2: [7.5, 19.8641], p: [7.5, 19.0654]},
    {t: 'line', p: [7.5, 4.93457]},
  ],
  stubEnd: 8,
}
const HEAD_GT_XL: ArrowHead = {
  start: [5.5, 1.9502],
  ops: [
    {t: 'curve', c1: [5.50024, 1.14521], c2: [6.40299, 0.670857], p: [7.06641, 1.12695]},
    {t: 'line', p: [21.6836, 11.1758]},
    {t: 'curve', c1: [22.2616, 11.5731], c2: [22.2616, 12.4269], p: [21.6836, 12.8242]},
    {t: 'line', p: [7.06641, 22.873]},
    {t: 'curve', c1: [6.40299, 23.3291], c2: [5.50024, 22.8548], p: [5.5, 22.0498]},
    {t: 'line', p: [5.5, 1.9502]},
  ],
  stubEnd: 6,
}
const HEAD_CF_NONXL: ArrowHead = {
  start: [19.5, 19.0654],
  ops: [
    {t: 'curve', c1: [19.5, 19.8641], c2: [18.6099, 20.3405], p: [17.9453, 19.8975]},
    {t: 'line', p: [7.34668, 12.832]},
    {t: 'curve', c1: [6.75296, 12.4362], c2: [6.75296, 11.5638], p: [7.34668, 11.168]},
    {t: 'line', p: [17.9453, 4.10254]},
    {t: 'curve', c1: [18.6099, 3.6595], c2: [19.5, 4.13588], p: [19.5, 4.93457]},
    {t: 'line', p: [19.5, 19.0654]},
  ],
  stubEnd: 10,
}
const HEAD_CF_XL: ArrowHead = {
  start: [20.5, 22.0498],
  ops: [
    {t: 'curve', c1: [20.4998, 22.8548], c2: [19.597, 23.3291], p: [18.9336, 22.873]},
    {t: 'line', p: [4.31641, 12.8242]},
    {t: 'curve', c1: [3.73845, 12.4269], c2: [3.73845, 11.5731], p: [4.31641, 11.1758]},
    {t: 'line', p: [18.9336, 1.12695]},
    {t: 'curve', c1: [19.597, 0.670855], c2: [20.4998, 1.14521], p: [20.5, 1.9502]},
    {t: 'line', p: [20.5, 22.0498]},
  ],
  stubEnd: 13,
}
const HEAD_CLOSED_GT_NONXL: ArrowHead = {
  start: [8, 4.93426],
  ops: [
    {t: 'line', p: [8, 12.4706]},
    {t: 'line', p: [8, 19.0657]},
    {t: 'curve', c1: [8, 19.4651], c2: [8.44507, 19.7033], p: [8.77735, 19.4818]},
    {t: 'line', p: [19.376, 12.416]},
    {t: 'curve', c1: [19.6728, 12.2181], c2: [19.6728, 11.7819], p: [19.376, 11.584]},
    {t: 'line', p: [8.77735, 4.51823]},
    {t: 'curve', c1: [8.44507, 4.29672], c2: [8, 4.53491], p: [8, 4.93426]},
  ],
  stubEnd: 8,
}
const HEAD_CLOSED_GT_XL: ArrowHead = {
  start: [6, 1.95051],
  ops: [
    {t: 'line', p: [6, 12.6471]},
    {t: 'line', p: [6, 22.0495]},
    {t: 'curve', c1: [6, 22.4521], c2: [6.45151, 22.6896], p: [6.78326, 22.4615]},
    {t: 'line', p: [21.4007, 12.412]},
    {t: 'curve', c1: [21.6897, 12.2133], c2: [21.6897, 11.7867], p: [21.4007, 11.588]},
    {t: 'line', p: [6.78326, 1.53849]},
    {t: 'curve', c1: [6.45151, 1.31042], c2: [6, 1.54792], p: [6, 1.95051]},
  ],
  stubEnd: 6,
}
const HEAD_CLOSED_CF_NONXL: ArrowHead = {
  start: [19, 19.0657],
  ops: [
    {t: 'line', p: [19, 11.5294]},
    {t: 'line', p: [19, 4.93426]},
    {t: 'curve', c1: [19, 4.53491], c2: [18.5549, 4.29672], p: [18.2227, 4.51823]},
    {t: 'line', p: [7.62404, 11.584]},
    {t: 'curve', c1: [7.32717, 11.7819], c2: [7.32717, 12.2181], p: [7.62404, 12.416]},
    {t: 'line', p: [18.2226, 19.4818]},
    {t: 'curve', c1: [18.5549, 19.7033], c2: [19, 19.4651], p: [19, 19.0657]},
  ],
  stubEnd: 10,
}
const HEAD_CLOSED_CF_XL: ArrowHead = {
  start: [20, 22.0495],
  ops: [
    {t: 'line', p: [20, 11.3529]},
    {t: 'line', p: [20, 1.95052]},
    {t: 'curve', c1: [20, 1.54793], c2: [19.5485, 1.31042], p: [19.2167, 1.5385]},
    {t: 'line', p: [4.5993, 11.588]},
    {t: 'curve', c1: [4.31032, 11.7867], c2: [4.31032, 12.2133], p: [4.5993, 12.412]},
    {t: 'line', p: [19.2167, 22.4615]},
    {t: 'curve', c1: [19.5485, 22.6896], c2: [20, 22.4521], p: [20, 22.0495]},
  ],
  stubEnd: 13,
}

function isClosedValue(value: PipeValue): boolean {
  return value === 'closed' || value === 'closed-dash'
}

function arrowHead(kind: 'going-to' | 'coming-from', size: PipeSize, value: PipeValue): ArrowHead {
  if (isClosedValue(value)) {
    if (kind === 'going-to') return size === 'xl' ? HEAD_CLOSED_GT_XL : HEAD_CLOSED_GT_NONXL
    if (size === 'xl') return HEAD_CLOSED_CF_XL
    return size === 'large' ? {...HEAD_CLOSED_CF_NONXL, stubEnd: 16} : HEAD_CLOSED_CF_NONXL
  }
  if (kind === 'going-to') return size === 'xl' ? HEAD_GT_XL : HEAD_GT_NONXL
  if (size === 'xl') return HEAD_CF_XL
  return size === 'large' ? {...HEAD_CF_NONXL, stubEnd: 13} : HEAD_CF_NONXL
}

function traceHead(ctx: CanvasRenderingContext2D, head: ArrowHead, halfG: number): void {
  const cx = (p: [number, number]): [number, number] => [p[0] - halfG, p[1] - halfG]
  const s = cx(head.start)
  ctx.moveTo(s[0], s[1])
  for (const op of head.ops) {
    if (op.t === 'line') {
      const p = cx(op.p)
      ctx.lineTo(p[0], p[1])
    } else {
      const c1 = cx(op.c1), c2 = cx(op.c2), p = cx(op.p)
      ctx.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], p[0], p[1])
    }
  }
  ctx.closePath()
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  seg: Arrow,
  theme: ThemeVars,
): void {
  const stroke = resolvePipeStroke(seg.value, seg.size, theme, seg.mediumColor)
  const closed = isClosedValue(seg.value)
  const head = arrowHead(seg.flow, seg.size, seg.value)
  const halfG = GRID / 2
  const angle = ANGLE[seg.direction]

  ctx.save()
  ctx.translate(seg.x, seg.y)
  ctx.rotate(angle)
  ctx.lineJoin = 'round'
  ctx.lineCap = 'butt'
  ctx.setLineDash([])

  // Head first (painted under the stub).
  ctx.beginPath()
  traceHead(ctx, head, halfG)
  ctx.fillStyle = stroke.fillColor ?? stroke.outlineColor
  ctx.fill()
  if (!closed) {
    ctx.lineWidth = 1
    ctx.strokeStyle = stroke.outlineColor
    ctx.stroke()
  }

  // Stub on top (blends the head base into the pipe). Always solid.
  const stubX1 = 0 - halfG
  const stubX2 = head.stubEnd - halfG
  ctx.beginPath(); ctx.moveTo(stubX1, 0); ctx.lineTo(stubX2, 0)
  ctx.strokeStyle = stroke.outlineColor
  ctx.lineWidth = stroke.outlineWeight
  ctx.stroke()
  if (!closed && stroke.fillColor !== null && stroke.fillWeight !== null) {
    ctx.beginPath(); ctx.moveTo(stubX1, 0); ctx.lineTo(stubX2, 0)
    ctx.strokeStyle = stroke.fillColor
    ctx.lineWidth = stroke.fillWeight
    ctx.stroke()
  }

  ctx.restore()
}

// ---------------------------------------------------------------------------
// Direction chevron: the flow-direction marker drawn ON the pipe (Figma
// OpenBridge 6.1 "direction arrow", node 45103-53419). The shape changes with
// the pipe size, not just its scale. Coordinates are relative to the cell
// centre, chevron pointing +x; drawArrow's rotation contract applies.
// ---------------------------------------------------------------------------

/** small/medium: a filled chevron polygon (Figma vector, cell-centred)… */
const DIRECTION_CHEVRON_SM: [number, number][] = [
  [-4.41011, -6], [1.5808, 0], [-4.41064, 6], [-1.5892, 6], [4.4108, 0], [-1.5892, -6],
]
/** …lifted off the pipe by a 1px halo traced just outside it. */
const DIRECTION_HALO_SM: [number, number][] = [
  [-1.3823, -6.5], [5.1177, 0], [-1.3823, 6.5], [-5.6167, 6.5],
  [-4.76416, 5.6465], [0.8735, 0], [-4.76416, -5.64648], [-5.61572, -6.5],
]
/** large/xl: a thick square-capped chevron stroke, masked to the pipe band.
 *  `points` is the open polyline, `width` its stroke width, `clipX` the half
 *  width of the mask cell (the band height comes from the pipe's stroke). */
const DIRECTION_STROKE: Record<'large' | 'xl', {points: [number, number][]; width: number; clipX: number}> = {
  large: {points: [[-3, -6], [3, 0], [-3, 6]],   width: 4, clipX: 6},
  xl:    {points: [[-7, -12], [5, 0], [-7, 12]], width: 6, clipX: 12},
}

function tracePolyline(ctx: CanvasRenderingContext2D, pts: [number, number][], close: boolean): void {
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  if (close) ctx.closePath()
}

export function drawDirectionArrow(
  ctx: CanvasRenderingContext2D,
  seg: DirectionArrow,
  theme: ThemeVars,
): void {
  const stroke = resolvePipeStroke(seg.value, seg.size, theme, seg.mediumColor)
  // Tertiary pipe colour on every pipe — closed ones included — except a
  // coloured medium, whose chevron takes the medium's border colour.
  const chevron = seg.value === 'medium-flow' ? stroke.outlineColor : theme.pipeOutlineColor

  ctx.save()
  ctx.translate(seg.x, seg.y)
  ctx.rotate(ANGLE[seg.direction])
  ctx.setLineDash([])

  if (seg.size === 'large' || seg.size === 'xl') {
    // Figma masks the chevron stroke with the pipe's own stroke band, so it
    // never pokes past the pipe edge — a closed pipe's thinner single stroke
    // trims it tighter.
    const {points, width, clipX} = DIRECTION_STROKE[seg.size]
    const halfBand = stroke.outlineWeight / 2
    ctx.beginPath()
    ctx.rect(-clipX, -halfBand, clipX * 2, halfBand * 2)
    ctx.clip()
    tracePolyline(ctx, points, false)
    ctx.strokeStyle = chevron
    ctx.lineWidth = width
    ctx.lineCap = 'square'
    ctx.lineJoin = 'miter'
    ctx.stroke()
  } else {
    tracePolyline(ctx, DIRECTION_CHEVRON_SM, true)
    ctx.fillStyle = chevron
    ctx.fill()
    tracePolyline(ctx, DIRECTION_HALO_SM, true)
    ctx.strokeStyle = theme.pipeDirectionHalo
    ctx.lineWidth = 1
    ctx.lineCap = 'butt'
    ctx.lineJoin = 'miter'
    ctx.stroke()
  }

  ctx.restore()
}
