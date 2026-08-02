import {GRID, CORNER_RADIUS, STROKE_WEIGHTS, OVERLAP_HALF_GAP} from './pipe-styles.js';
import type {PipeDirection, PipeSize, PipeValue} from './pipe-types.js';

const C = GRID / 2; // 12 — the grid-centre anchor

export function straightPath(length: number, orientation: 'horizontal' | 'vertical'): string {
  const span = length * GRID;
  return orientation === 'horizontal'
    ? `M ${C} ${C} L ${C + span} ${C}`
    : `M ${C} ${C} L ${C} ${C + span}`;
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

// ---------------------------------------------------------------------------
// Endpoint cap: pipe stub (half cell, inward) + perpendicular cap at terminus.
// Ported from connector-diagram/src/drawing/glyphs.ts (drawEndpoint).
// ---------------------------------------------------------------------------

const ENDPOINT_OUT_CAP: Record<PipeSize, number> = {small: 9, medium: 9, large: 9, xl: 11};
const ENDPOINT_FILL_CAP: Record<PipeSize, number> = {small: 8, medium: 8, large: 8, xl: 10};

// The half-cell inward stub, shared by the endpoint cap and the arrowhead.
// Canonical orientation: terminus at x=0, running inward to x=12 along y=12.
export function endpointStubPath(): string {
  return `M 0 ${C} L ${C} ${C}`;
}

// The perpendicular (or breakoff-tilted) cap stroke at the terminus (x=0).
// `layer` selects the OUT (outline) or FILL half-length; `variant` selects a
// straight ('cap') or ~30°-tilted ('breakoff') cap.
export function endpointCapPath(
  size: PipeSize,
  variant: 'cap' | 'breakoff' = 'cap',
  layer: 'outline' | 'fill' = 'outline'
): string {
  const halfLength = layer === 'fill' ? ENDPOINT_FILL_CAP[size] : ENDPOINT_OUT_CAP[size];
  const tilt = variant === 'breakoff' ? Math.PI / 6 : 0;
  const scale = 1 / Math.cos(tilt);
  const c = halfLength * scale;
  const dx = Math.sin(tilt) * c;
  const dy = Math.cos(tilt) * c;
  return `M ${dx} ${C - dy} L ${-dx} ${C + dy}`;
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
// Junctions: tee, cross, overlap. Adapted from the deprecated
// three-way-line / line-cross / line-overlap components, whose footprint math
// used `width = lineWidth + 1`, `h = width / 2`; here `width` is the pipe's
// outline stroke weight (STROKE_WEIGHTS[size].outline) and the tee's inner
// corners are rounded by CORNER_RADIUS instead of left square.
// ---------------------------------------------------------------------------

// Straight run (full grid width) with a perpendicular branch dropping from
// the centre band to the bottom edge. Footprint 24x24, anchored at centre.
// Mirrors the deprecated three-way-line's `c = 13 - h` inner-corner-length
// trick, but rounds the inner corners with `radius` instead of a hard turn.
export function teePath(size: PipeSize, radius: number = CORNER_RADIUS): string {
  const w = STROKE_WEIGHTS[size].outline;
  const h = w / 2;
  const r = Math.min(radius, C - h);
  const top = C - h;
  const bottom = C + h;
  const branchLeft = C - h;
  const branchRight = C + h;
  return (
    `M 0 ${top} ` +
    `L ${GRID} ${top} ` +
    `L ${GRID} ${bottom} ` +
    `L ${branchRight + r} ${bottom} ` +
    `A ${r} ${r} 0 0 1 ${branchRight} ${bottom + r} ` +
    `L ${branchRight} ${GRID} ` +
    `L ${branchLeft} ${GRID} ` +
    `L ${branchLeft} ${bottom + r} ` +
    `A ${r} ${r} 0 0 1 ${branchLeft - r} ${bottom} ` +
    `L 0 ${bottom} ` +
    `Z`
  );
}

// Two straights crossing at the grid centre, returned as a single `d` with
// two subpaths (horizontal bar, then vertical bar) — mirrors the deprecated
// line-cross's plus-shaped outline but kept as two overlapping rects rather
// than one rounded plus, since the pipe cross has no rounded corners.
export function crossPath(size: PipeSize): string {
  const w = STROKE_WEIGHTS[size].outline;
  const h = w / 2;
  const top = C - h;
  const bottom = C + h;
  return (
    `M 0 ${top} L ${GRID} ${top} L ${GRID} ${bottom} L 0 ${bottom} Z ` +
    `M ${top} 0 L ${bottom} 0 L ${bottom} ${GRID} L ${top} ${GRID} Z`
  );
}

// Vertical run hopping over a horizontal run: the horizontal run is solid,
// the vertical run is a single masked path with a gap around the crossing.
// Mirrors the deprecated line-overlap's mask rect: gap at
// `y = 12 - 2 - h`, height `width + 4`, sized here by OVERLAP_HALF_GAP
// instead of the fixed `2`/`4` constants so the gap scales with pipe size.
// The natural half-span (margin + h) can exceed the grid centre at
// large/xl stroke weights, which would collapse or invert the two visible
// vertical segments; clamp it so at least 1px of visible pipe survives on
// each side of the gap (mirrors the `Math.min(radius, C - h)` clamp in
// teePath).
export function overlapPath(size: PipeSize): string {
  const w = STROKE_WEIGHTS[size].outline;
  const h = w / 2;
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
