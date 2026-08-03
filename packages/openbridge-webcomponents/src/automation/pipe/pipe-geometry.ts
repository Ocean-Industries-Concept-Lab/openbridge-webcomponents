import {GRID, CORNER_RADIUS, STROKE_WEIGHTS, OVERLAP_HALF_GAP} from './pipe-styles.js';
import type {PipeDirection, PipeSize, PipeValue} from './pipe-types.js';

const C = GRID / 2; // 12 — the grid-centre anchor

export function straightPath(length: number, orientation: 'horizontal' | 'vertical'): string {
  const span = length * GRID;
  return orientation === 'horizontal'
    ? `M ${C} ${C} L ${C + span} ${C}`
    : `M ${C} ${C} L ${C} ${C + span}`;
}

// A pipe channel: the centreline `inner` path (stroked at the fill width, in
// the fill color) plus the two `walls` paths flanking it (each stroked at
// 1px, in the outline color) — the walled-channel render model from
// FIGMA-GROUND-TRUTH.md. `wallOffset` is the perpendicular distance from the
// centreline to each wall's own centreline: `fill/2 + 0.5`, which lands the
// 1px wall stroke's outer edge exactly on the measured outline width.
export interface PipeChannel {
  inner: string;
  walls: [string, string];
}

// Straight channel: the centreline plus two parallel offset lines. For a
// horizontal run the walls are horizontal lines offset in y; for a vertical
// run they are offset in x.
export function straightChannel(
  length: number,
  orientation: 'horizontal' | 'vertical',
  size: PipeSize
): PipeChannel {
  const span = length * GRID;
  const fill = STROKE_WEIGHTS[size].fill;
  const wallOffset = fill / 2 + 0.5;
  const inner = straightPath(length, orientation);
  const walls: [string, string] =
    orientation === 'horizontal'
      ? [
          `M ${C} ${C - wallOffset} L ${C + span} ${C - wallOffset}`,
          `M ${C} ${C + wallOffset} L ${C + span} ${C + wallOffset}`,
        ]
      : [
          `M ${C - wallOffset} ${C} L ${C - wallOffset} ${C + span}`,
          `M ${C + wallOffset} ${C} L ${C + wallOffset} ${C + span}`,
        ];
  return {inner, walls};
}

// Corner: pipe enters from the grid edge toward the centre, bends by `radius`,
// leaves toward `direction`. `sweep` chosen so the arc bulges away from the
// inner corner. Legs are one grid cell long.
export function cornerPath(_direction: PipeDirection, radius: number = CORNER_RADIUS): string {
  // Canonical corner: enters from the LEFT edge (x=0,y=12) heading right,
  // turns to leave toward `direction`. We build the "leave-bottom" case and
  // rely on the component's rotation wrapper for the four directions; here the
  // path itself encodes the leave-bottom geometry with the requested radius.
  const enterX = 0;
  const bendX = C;
  const bendY = C;
  const leaveY = GRID;
  // straight in, arc, straight out (down)
  const sweep = 1;
  return (
    `M ${enterX} ${bendY} ` +
    `L ${bendX - radius} ${bendY} ` +
    `A ${radius} ${radius} 0 0 ${sweep} ${bendX} ${bendY + radius} ` +
    `L ${bendX} ${leaveY}`
  );
}

// Corner channel: the centreline arc plus two concentric wall arcs sharing
// the SAME arc centre `(bendX-radius, bendY+radius)` as the centreline arc
// (verified: an arc of radius `r±wallOffset` from that shared centre, with
// the horizontal leg y-shifted and the vertical leg x-shifted by
// `wallOffset`, stays exactly `wallOffset` from the centreline everywhere).
// The INNER wall (radius `r1 = r - wallOffset`, hugging the pivot) shifts
// its horizontal leg toward the centre (`y = bendY + wallOffset`) and its
// vertical leg toward the centre (`x = bendX - wallOffset`); the OUTER wall
// (radius `r2 = r + wallOffset`) shifts the opposite way. Mirrors
// `corner-line.ts`'s `r1`/`r2` pattern, adapted to this file's enter-left/
// leave-bottom canonical orientation.
export function cornerChannel(
  _direction: PipeDirection,
  size: PipeSize,
  radius: number = CORNER_RADIUS
): PipeChannel {
  const fill = STROKE_WEIGHTS[size].fill;
  const wallOffset = fill / 2 + 0.5;
  const r1 = radius - wallOffset;
  const r2 = radius + wallOffset;
  const enterX = 0;
  const bendX = C;
  const bendY = C;
  const leaveY = GRID;
  const sweep = 1;
  const inner = cornerPath(_direction, radius);
  const walls: [string, string] = [
    `M ${enterX} ${bendY + wallOffset} ` +
      `L ${bendX - radius} ${bendY + wallOffset} ` +
      `A ${r1} ${r1} 0 0 ${sweep} ${bendX - wallOffset} ${bendY + radius} ` +
      `L ${bendX - wallOffset} ${leaveY}`,
    `M ${enterX} ${bendY - wallOffset} ` +
      `L ${bendX - radius} ${bendY - wallOffset} ` +
      `A ${r2} ${r2} 0 0 ${sweep} ${bendX + wallOffset} ${bendY + radius} ` +
      `L ${bendX + wallOffset} ${leaveY}`,
  ];
  return {inner, walls};
}

// ---------------------------------------------------------------------------
// Endpoint: an open-mouth pipe stub (walls+interior channel, matching
// `straightChannel`) meeting a perpendicular rounded-rectangle cap bar at the
// terminus — the Figma "medium open-flow endpoint" ground truth. Canonical
// orientation (direction 'left', unrotated): the cap bar is centred on the
// grid centre (12,12) toward the LEFT half of the cell, the stub's mouth is
// OPEN at the grid edge x=GRID (the connecting side), and the stub's walls
// run from that edge inward, stopping exactly at the cap's near edge (they
// never cross into or past the cap — the bug this replaces let the walls
// overshoot the cap and land the cap off-centre).
// ---------------------------------------------------------------------------

// The half-cell inward stub, shared by the endpoint cap and the arrowhead.
// Canonical orientation: terminus at x=0, running inward along y=12 to `end`
// (defaults to the grid centre, x=12, for the endpoint cap's use). For
// `obc-pipe-arrow`, callers must pass the selected head's `stubEnd` (see
// `arrowStubEnd`) instead of the default — the stub must stop AT the head's
// base column, not overshoot into/past the head's interior (measured against
// the Figma ground truth: the wall ends cleanly where the head begins, no
// wall pixels inside the chevron).
export function endpointStubPath(end: number = C): string {
  return `M 0 ${C} L ${end} ${C}`;
}

// Cap bar half-width/half-height per size — measured against the Figma
// reference (medium: half-width 3 -> 6px-wide bar spanning x=9..15;
// half-height ~10.5 -> ~21px-tall bar spanning y~1.5..22.5, taller than the
// pipe channel itself) and scaled with the fill stroke weight for the other
// sizes so the cap grows with the pipe.
const CAP_HALF_WIDTH: Record<PipeSize, number> = {small: 2, medium: 3, large: 4, xl: 5};
const CAP_HALF_HEIGHT: Record<PipeSize, number> = {
  small: 10,
  medium: 10.5,
  large: 9.5,
  xl: 8.5,
};
const CAP_CORNER_RADIUS = 2;

// The endpoint's pipe stub: an open-mouth walls+interior channel identical in
// convention to `straightChannel` (same `wallOffset` formula, so it lines up
// with a `obc-pipe-straight` run at the same size). The INTERIOR fill line
// (`inner`) spans from the grid edge (mouth, OPEN) all the way to the grid
// centre — past the cap's near edge and slightly INTO the cap body — so it
// blends seamlessly with the cap's own fill (same color, drawn under it;
// see `pipe-endpoint.ts`), matching the measured Figma ground truth where
// the interior is one unbroken white region from the tile edge through into
// the cap interior. The WALLS, unlike the interior, must NOT overshoot past
// the cap's near wall (a T-joint: a wall ending against another wall ends
// flush, never past it — overshooting leaves visible dark tick marks poking
// into the cap's white interior) — so they stop exactly at the cap's near
// edge (`C - CAP_HALF_WIDTH[size]`), the same x the open end of
// `endpointCapOutlinePath`'s break sits at.
export function endpointChannel(size: PipeSize): PipeChannel {
  const fill = STROKE_WEIGHTS[size].fill;
  const wallOffset = fill / 2 + 0.5;
  const capNearEdge = C - CAP_HALF_WIDTH[size];
  const inner = `M ${GRID} ${C} L ${C} ${C}`;
  const walls: [string, string] = [
    `M ${GRID} ${C - wallOffset} L ${capNearEdge} ${C - wallOffset}`,
    `M ${GRID} ${C + wallOffset} L ${capNearEdge} ${C + wallOffset}`,
  ];
  return {inner, walls};
}

// The perpendicular cap bar at the terminus: a rounded-rectangle centred on
// the grid centre (12,12), `2*CAP_HALF_WIDTH` wide and `2*CAP_HALF_HEIGHT`
// tall, with rounded outer corners. Returned as a single closed path so it
// can be filled like the other pieces' interior silhouettes. NOTE: this is
// the FILL shape only — do not stroke it directly, or the near (stub-facing)
// edge gets a border that Figma does not have. Use `endpointCapOutlinePath`
// for the 1px border stroke instead.
export function endpointCapPath(size: PipeSize): string {
  const hw = CAP_HALF_WIDTH[size];
  const hh = CAP_HALF_HEIGHT[size];
  const r = Math.min(CAP_CORNER_RADIUS, hw, hh);
  const left = C - hw;
  const right = C + hw;
  const top = C - hh;
  const bottom = C + hh;
  return (
    `M ${left} ${top + r} ` +
    `A ${r} ${r} 0 0 1 ${left + r} ${top} ` +
    `L ${right - r} ${top} ` +
    `A ${r} ${r} 0 0 1 ${right} ${top + r} ` +
    `L ${right} ${bottom - r} ` +
    `A ${r} ${r} 0 0 1 ${right - r} ${bottom} ` +
    `L ${left + r} ${bottom} ` +
    `A ${r} ${r} 0 0 1 ${left} ${bottom - r} ` +
    `Z`
  );
}

// The cap bar's 1px BORDER stroke — an OPEN path that omits the near
// (stub-facing) edge across the height of the connecting pipe channel, so no
// wall line crosses the join and the stub's interior flows continuously into
// the cap's interior. Matches the measured Figma ground truth: the cap's
// near edge only carries a border above/below the channel band (where the
// cap is taller than the pipe), never across it. `wallOffset` is the same
// half-channel-height used by `endpointChannel`'s walls, so the break lines
// up exactly with where the stub's walls meet the cap.
export function endpointCapOutlinePath(size: PipeSize, wallOffsetOverride?: number): string {
  const fill = STROKE_WEIGHTS[size].fill;
  const wallOffset = wallOffsetOverride ?? fill / 2 + 0.5;
  const hw = CAP_HALF_WIDTH[size];
  const hh = CAP_HALF_HEIGHT[size];
  const r = Math.min(CAP_CORNER_RADIUS, hw, hh);
  const left = C - hw;
  const right = C + hw;
  const top = C - hh;
  const bottom = C + hh;
  const channelTop = C - wallOffset;
  const channelBottom = C + wallOffset;
  // Two open subpaths, each starting at the break (channel band on the near
  // edge) and running the long way around (far edge + both rounded corner
  // pairs) back to the other side of the break — leaving the near edge
  // unstroked exactly across `channelTop`..`channelBottom`.
  return (
    `M ${left} ${channelTop} ` +
    `L ${left} ${top + r} ` +
    `A ${r} ${r} 0 0 1 ${left + r} ${top} ` +
    `L ${right - r} ${top} ` +
    `A ${r} ${r} 0 0 1 ${right} ${top + r} ` +
    `L ${right} ${bottom - r} ` +
    `A ${r} ${r} 0 0 1 ${right - r} ${bottom} ` +
    `L ${left + r} ${bottom} ` +
    `A ${r} ${r} 0 0 1 ${left} ${bottom - r} ` +
    `L ${left} ${channelBottom}`
  );
}

// ---------------------------------------------------------------------------
// Arrowhead: exact Figma bezier vectors, ported verbatim from
// connector-diagram/src/drawing/glyphs.ts. Canonical +x orientation, terminus
// shifted to the origin (translated by -GRID/2); direction is handled by the
// component's rotation wrapper, not here.
// ---------------------------------------------------------------------------

type PathOp =
  | {t: 'curve'; c1: [number, number]; c2: [number, number]; p: [number, number]}
  | {t: 'line'; p: [number, number]};

interface ArrowHead {
  start: [number, number];
  ops: PathOp[];
  stubEnd: number; // stub runs along y=12 from x=0 to x=stubEnd
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
};
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
};
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
};
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
};
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
};
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
};
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
};
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
};

function isClosedValue(value: PipeValue): boolean {
  return value === 'closed' || value === 'closed-dash';
}

function selectArrowHead(kind: 'arrow-out' | 'arrow-in', size: PipeSize, value: PipeValue): ArrowHead {
  // 'arrow-out' == going-to (flow leaves the device toward this endpoint);
  // 'arrow-in' == coming-from (flow enters the device from this endpoint).
  if (isClosedValue(value)) {
    if (kind === 'arrow-out') return size === 'xl' ? HEAD_CLOSED_GT_XL : HEAD_CLOSED_GT_NONXL;
    if (size === 'xl') return HEAD_CLOSED_CF_XL;
    return size === 'large' ? {...HEAD_CLOSED_CF_NONXL, stubEnd: 16} : HEAD_CLOSED_CF_NONXL;
  }
  if (kind === 'arrow-out') return size === 'xl' ? HEAD_GT_XL : HEAD_GT_NONXL;
  if (size === 'xl') return HEAD_CF_XL;
  return size === 'large' ? {...HEAD_CF_NONXL, stubEnd: 13} : HEAD_CF_NONXL;
}

// The x-coordinate (in the shared endpoint/stub 0-24 coordinate space, same
// convention as `endpointStubPath` — NOT shifted, unlike `arrowHeadPath`'s
// own path data) where the blending stub must end for the given head
// selection — measured against the Figma ground truth, where the stub wall
// stops exactly at the head's base/tip transition with no wall pixels
// overshooting into the head's interior. Callers pass this straight into
// `endpointStubPath(end)`; do not default to the grid centre for arrow heads
// (that overshoots every head shape).
export function arrowStubEnd(flow: 'arrow-in' | 'arrow-out', size: PipeSize, value: PipeValue): number {
  return selectArrowHead(flow, size, value).stubEnd;
}

// Builds the arrowhead `d` string (closed bezier shape only; the blending
// stub is drawn separately via endpointStubPath/head.stubEnd by the
// component layer). Every point is shifted by -GRID/2 so the terminus lands
// at the origin, matching the canonical endpoint/stub coordinate convention.
export function arrowHeadPath(flow: 'arrow-in' | 'arrow-out', size: PipeSize, value: PipeValue): string {
  const head = selectArrowHead(flow, size, value);
  const halfG = GRID / 2;
  const shift = (p: [number, number]): [number, number] => [p[0] - halfG, p[1] - halfG];
  const s = shift(head.start);
  let d = `M ${s[0]} ${s[1]} `;
  for (const op of head.ops) {
    if (op.t === 'line') {
      const p = shift(op.p);
      d += `L ${p[0]} ${p[1]} `;
    } else {
      const c1 = shift(op.c1);
      const c2 = shift(op.c2);
      const p = shift(op.p);
      d += `C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p[0]} ${p[1]} `;
    }
  }
  return `${d}Z`;
}

// ---------------------------------------------------------------------------
// Junctions: tee, cross, overlap. Per OPEN-ENDINGS-CORRECTION.md, each arm
// mouth (where the junction meets the tile edge) must be OPEN — two 1px
// walls run to the edge with NOTHING across the opening — and the interior
// is ONE continuous fill region with no internal walls crossing it. This
// replaces the earlier closed-silhouette model (a single filled+stroked
// polygon), which capped every mouth with a wall and blocked pipe
// connections.
//
// A `PipeJunction` separates the two concerns:
// - `interior`: a single filled path (the union of the arms at the fill
//   width) in `fillVar`, drawn with NO stroke — this is what makes the
//   interior continuous through the crossing/T (no wall can appear inside
//   it because there's nothing stroked there).
// - `walls`: a flat list of 1px-stroke path segments in `outlineVar`. Each
//   segment runs from a tile edge INWARD and STOPS at the fill-width
//   boundary of the crossing arm, so the wall breaks exactly where another
//   arm's interior opens into it (mirrors `line-cross.ts`'s CONNECTOR
//   variant: many short wall segments, never one drawn straight across an
//   opening).
// ---------------------------------------------------------------------------

export interface PipeJunction {
  interior: string;
  walls: string[];
}

// Full-width bar (the straight run) union a half-height stub dropping to
// one edge — a true T silhouette used as the JOINT INTERIOR fill (no
// stroke). Corners of the stub are rounded to match the corner radius, but
// clamped to half the stub's own half-width so a flat shoulder always
// survives on the bar's far edge before the fillet starts (see historical
// note below).
function teeInteriorPath(size: PipeSize, radius: number = CORNER_RADIUS): string {
  const fill = STROKE_WEIGHTS[size].fill;
  const h = fill / 2;
  const r = Math.min(radius, h / 2);
  const top = C - h;
  const bottom = C + h;
  const stubLeft = C - h;
  const stubRight = C + h;
  return (
    `M 0 ${top} ` +
    `L ${GRID} ${top} ` +
    `L ${GRID} ${bottom} ` +
    `L ${stubRight + r} ${bottom} ` +
    `A ${r} ${r} 0 0 1 ${stubRight} ${bottom + r} ` +
    `L ${stubRight} ${GRID} ` +
    `L ${stubLeft} ${GRID} ` +
    `L ${stubLeft} ${bottom + r} ` +
    `A ${r} ${r} 0 0 1 ${stubLeft - r} ${bottom} ` +
    `L 0 ${bottom} ` +
    `Z`
  );
}

// Backward-compatible alias: some callers/tests still refer to `teePath` as
// the shape to fill. It is now only the INTERIOR fill silhouette; the walls
// are drawn separately (see `teeJunction`) so mouths stay open.
export function teePath(size: PipeSize, radius: number = CORNER_RADIUS): string {
  return teeInteriorPath(size, radius);
}

// Plus-shaped union of a horizontal and vertical bar at the fill width —
// the JOINT INTERIOR fill (no stroke) for a cross. Square inner corners (no
// rounding at the crossing, matching the measured Figma cross).
function crossInteriorPath(size: PipeSize): string {
  const fill = STROKE_WEIGHTS[size].fill;
  const h = fill / 2;
  const top = C - h;
  const bottom = C + h;
  return (
    `M 0 ${top} ` +
    `L ${top} ${top} ` +
    `L ${top} 0 ` +
    `L ${bottom} 0 ` +
    `L ${bottom} ${top} ` +
    `L ${GRID} ${top} ` +
    `L ${GRID} ${bottom} ` +
    `L ${bottom} ${bottom} ` +
    `L ${bottom} ${GRID} ` +
    `L ${top} ${GRID} ` +
    `L ${top} ${bottom} ` +
    `L 0 ${bottom} ` +
    `Z`
  );
}

// Backward-compatible alias: interior-only fill silhouette for a cross; see
// `crossJunction` for the open-mouth walls.
export function crossPath(size: PipeSize): string {
  return crossInteriorPath(size);
}

// Wall offset from the centreline for a given size — same convention as
// `straightChannel`/`cornerChannel`: fill half-width plus the 1px stroke's
// own half-width, landing the wall's outer edge on the measured outline
// row.
function wallOffset(size: PipeSize): number {
  return STROKE_WEIGHTS[size].fill / 2 + 0.5;
}

// Half the 1px wall stroke's own width — the amount each wall segment's
// INNER endpoint (the end meeting a perpendicular wall at a junction corner,
// as opposed to the OUTER end reaching the open tile-edge mouth) must extend
// past the shared corner point so the two perpendicular 1px strokes'
// rectangular coverage fully paints the corner pixel with no notch. Two butt-
// capped 1px strokes that both stop exactly AT their shared corner point
// leave the far quarter of that corner pixel uncovered (verified: horizontal
// band covers x<=corner in the corner row, vertical band covers y<=corner in
// the corner column, so the quadrant beyond both stops is covered by
// neither) — extending each by `JOINT_OVERLAP` closes it, and the 1px
// same-color overlap this creates is invisible.
const JOINT_OVERLAP = 0.5;

// Four arms, each with two parallel wall segments running from the tile
// edge inward and STOPPING at the opposite arm's fill-width boundary (`top`/
// `bottom`), so every mouth is open (segments reach x=0/x=24/y=0/y=24 with
// nothing drawn across them) and every wall breaks at the junction (no
// segment spans the crossing). Each segment's inner end is extended by
// `JOINT_OVERLAP` past the corner it meets (see above) so the four inner
// L-joints are flush, with no notch. Interior is the plus fill silhouette,
// drawn with no stroke so the crossing itself has no wall.
export function crossJunction(size: PipeSize): PipeJunction {
  const o = wallOffset(size);
  const top = C - o;
  const bottom = C + o;
  const walls: string[] = [
    // Horizontal walls (y = top, y = bottom), broken over the vertical arm;
    // inner ends extended by JOINT_OVERLAP into the corner they share with a
    // vertical wall.
    `M 0 ${top} L ${top + JOINT_OVERLAP} ${top}`,
    `M ${bottom - JOINT_OVERLAP} ${top} L ${GRID} ${top}`,
    `M 0 ${bottom} L ${top + JOINT_OVERLAP} ${bottom}`,
    `M ${bottom - JOINT_OVERLAP} ${bottom} L ${GRID} ${bottom}`,
    // Vertical walls (x = top, x = bottom), broken over the horizontal arm;
    // inner ends extended by JOINT_OVERLAP into the corner they share with a
    // horizontal wall.
    `M ${top} 0 L ${top} ${top + JOINT_OVERLAP}`,
    `M ${top} ${bottom - JOINT_OVERLAP} L ${top} ${GRID}`,
    `M ${bottom} 0 L ${bottom} ${top + JOINT_OVERLAP}`,
    `M ${bottom} ${bottom - JOINT_OVERLAP} L ${bottom} ${GRID}`,
  ];
  return {interior: crossInteriorPath(size), walls};
}

// Straight bar (left/right arms) plus one perpendicular stub (bottom arm,
// canonical orientation — rotated by the component for other directions).
// The bar's two long walls (top/bottom of the bar) run edge-to-edge but
// BREAK over the stub opening on the bottom wall, so the bar's interior
// flows freely into the stub; the stub's own two walls run from the stub's
// open mouth (grid edge) up to the bar, open at the bottom and simply
// ENDING where they meet the bar's interior (no cap drawn there — the bar's
// fill silhouette already covers that seam, so nothing perpendicular closes
// it off). The two inner L-joints (where the bar's broken bottom wall meets
// each stub wall) get the same `JOINT_OVERLAP` extension as `crossJunction`'s
// inner corners, for the same reason: two butt-capped 1px strokes that both
// stop exactly at their shared corner point leave a quarter-pixel notch/step
// there otherwise.
export function teeJunction(size: PipeSize): PipeJunction {
  const o = wallOffset(size);
  const top = C - o;
  const bottom = C + o;
  const stubLeft = C - o;
  const stubRight = C + o;
  const walls: string[] = [
    // Bar top wall: full span, open mouths at both edges (no stub opens
    // into the top of the bar, so it does not need to break).
    `M 0 ${top} L ${GRID} ${top}`,
    // Bar bottom wall: BREAKS over the stub opening; inner ends extended by
    // JOINT_OVERLAP into the corner shared with each stub wall.
    `M 0 ${bottom} L ${stubLeft + JOINT_OVERLAP} ${bottom}`,
    `M ${stubRight - JOINT_OVERLAP} ${bottom} L ${GRID} ${bottom}`,
    // Stub walls: run from the bar's bottom-wall row down to the open
    // bottom mouth (grid edge) — nothing caps the far end. Inner ends
    // extended by JOINT_OVERLAP up into the corner shared with the bar wall.
    `M ${stubLeft} ${bottom - JOINT_OVERLAP} L ${stubLeft} ${GRID}`,
    `M ${stubRight} ${bottom - JOINT_OVERLAP} L ${stubRight} ${GRID}`,
  ];
  return {interior: teeInteriorPath(size), walls};
}

// Continuous run (both mouths open, walls run edge-to-edge unbroken since
// nothing crosses it) plus the other run split into two segments around a
// gap where it passes under (each segment's mouth is open at its own tile
// edge; the gap end is left open too — nothing caps it, so it reads as
// tucking under the continuous run rather than terminating). Mirrors the
// deprecated line-overlap's mask-rect gap sizing (`OVERLAP_HALF_GAP`),
// clamped so at least 1px of visible pipe survives on each side of the gap
// at large/xl stroke weights.
export function overlapJunction(size: PipeSize): PipeJunction {
  const o = wallOffset(size);
  const fill = STROKE_WEIGHTS[size].fill;
  const h = fill / 2;
  const margin = OVERLAP_HALF_GAP[size];
  const halfSpan = Math.min(margin + h, C - 1);
  const gapTop = C - halfSpan;
  const gapBottom = C + halfSpan;
  const left = C - o;
  const right = C + o;
  const crossTop = C - o;
  const crossBottom = C + o;
  const walls: string[] = [
    // Continuous (horizontal) run walls: edge-to-edge, unbroken.
    `M 0 ${crossTop} L ${GRID} ${crossTop}`,
    `M 0 ${crossBottom} L ${GRID} ${crossBottom}`,
    // Gapped (vertical) run walls: two segments each, open at the grid edge
    // and open at the gap (nothing spans the gap).
    `M ${left} 0 L ${left} ${gapTop}`,
    `M ${right} 0 L ${right} ${gapTop}`,
    `M ${left} ${gapBottom} L ${left} ${GRID}`,
    `M ${right} ${gapBottom} L ${right} ${GRID}`,
  ];
  const interior =
    `M 0 ${crossTop} L ${GRID} ${crossTop} L ${GRID} ${crossBottom} L 0 ${crossBottom} Z ` +
    `M ${left} 0 L ${right} 0 L ${right} ${gapTop} L ${left} ${gapTop} Z ` +
    `M ${left} ${gapBottom} L ${right} ${gapBottom} L ${right} ${GRID} L ${left} ${GRID} Z`;
  return {interior, walls};
}

// Backward-compatible alias returning just the gapped-run interior
// silhouette (the piece `overlapJunction` composes into `interior` above),
// kept for any existing callers/tests of the raw gap geometry.
export function overlapPath(size: PipeSize): string {
  const fill = STROKE_WEIGHTS[size].fill;
  const h = fill / 2;
  const margin = OVERLAP_HALF_GAP[size];
  const halfSpan = Math.min(margin + h, C - 1);
  const gapTop = C - halfSpan;
  const gapBottom = C + halfSpan;
  const left = C - h;
  const right = C + h;
  return (
    `M ${left} 0 ` +
    `L ${left} ${gapTop} ` +
    `L ${right} ${gapTop} ` +
    `L ${right} 0 ` +
    `Z ` +
    `M ${left} ${gapBottom} ` +
    `L ${left} ${GRID} ` +
    `L ${right} ${GRID} ` +
    `L ${right} ${gapBottom} ` +
    `Z`
  );
}
