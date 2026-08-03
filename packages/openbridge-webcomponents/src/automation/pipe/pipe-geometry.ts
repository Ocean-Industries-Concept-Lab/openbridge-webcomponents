import {GRID, CORNER_RADIUS, OVERLAP_HALF_GAP} from './pipe-styles.js';
import type {PipeSize, PipeValue} from './pipe-types.js';

const C = GRID / 2; // 12 — the grid-centre anchor

// ---------------------------------------------------------------------------
// Every pipe piece is a CENTRELINE path stroked twice — an outline-weight
// pass in the border color, then a fill-weight pass in the fill color over
// it — exactly how the Figma "Connectors" component set constructs each
// glyph (verified against the raw per-variant `outline`/`fill` vector pairs:
// e.g. the large tee is `M0 12H12 M24 12H12 M12 12V24` stroked at 10, then
// the same path stroked at 8). Since outline and fill weights differ by 2 at
// every size, the visible border is always 1px per side. Subpaths end flush
// (butt caps) at the tile edges, so every mouth is open — an abutting piece's
// strokes continue seamlessly across the boundary. For `closed`/`closed-dash`
// (no fill pass) the single outline-weight pass carries the dash pattern, and
// the arm subpaths are drawn from the tile edge INWARD so the dash phase is
// anchored at the mouths, matching the Figma closed-dash vectors.
// ---------------------------------------------------------------------------

export function straightPath(
  length: number,
  orientation: 'horizontal' | 'vertical'
): string {
  const span = length * GRID;
  return orientation === 'horizontal'
    ? `M ${C} ${C} L ${C + span} ${C}`
    : `M ${C} ${C} L ${C} ${C + span}`;
}

// Corner centreline: enters from the LEFT edge (x=0,y=12) heading right,
// bends by `radius`, leaves toward the BOTTOM edge. The component's rotation
// wrapper reuses this one leave-bottom shape for all four directions. `sweep`
// chosen so the arc bulges away from the inner corner.
export function cornerPath(radius: number = CORNER_RADIUS): string {
  const enterX = 0;
  const bendX = C;
  const bendY = C;
  const leaveY = GRID;
  const sweep = 1;
  return (
    `M ${enterX} ${bendY} ` +
    `L ${bendX - radius} ${bendY} ` +
    `A ${radius} ${radius} 0 0 ${sweep} ${bendX} ${bendY + radius} ` +
    `L ${bendX} ${leaveY}`
  );
}

// Tee centreline (canonical orientation: straight run left-right, branch
// dropping to the bottom edge — rotated by the component for the other
// directions). Subpath structure copied from the Figma tee vector: the two
// run arms are drawn from their tile edge in to the centre (anchoring the
// closed-dash phase at the mouths), the branch from the centre out.
export function teePath(): string {
  return `M 0 ${C} L ${C} ${C} M ${GRID} ${C} L ${C} ${C} M ${C} ${C} L ${C} ${GRID}`;
}

// Cross centreline. Subpath structure copied from the Figma cross vector:
// horizontal arms edge-in, vertical arms centre-out.
export function crossPath(): string {
  return `M 0 ${C} L ${C} ${C} M ${GRID} ${C} L ${C} ${C} M ${C} ${C} L ${C} 0 M ${C} ${C} L ${C} ${GRID}`;
}

// ---------------------------------------------------------------------------
// Endpoint: a pipe stub meeting a perpendicular BAR at the terminus, both
// drawn as ONE T-shaped path stroked twice — an outline-weight pass then a
// fill-weight pass — the same two-pass centreline model every other pipe
// piece uses (verified against the Figma "Type=endpoint, Value=open flow"
// vectors, all four sizes: the glyph is literally `M<mouth> H<centre>
// V<barTop> M<centre> V<barBottom>` stroked at the size's outline then fill
// weight). The bar's rounded ends come from `stroke-linecap="round"` on
// MEDIUM only; small, large & xl use butt caps (see `endpointLineCap`). This
// replaces the earlier rounded-rectangle "cap" model, which drew the cap as
// a separate filled shape and left a seam where its fill met the stub's
// fill.
//
// Canonical orientation (direction 'left', unrotated): the connection mouth
// is OPEN at the LEFT grid edge (x=0), the stub runs inward along y=12 to the
// bar at the grid centre (x=12), and the bar runs vertically through (12,12).
// ---------------------------------------------------------------------------

// The half-cell inward stub, shared by the endpoint and the arrowhead.
// Canonical orientation: mouth at x=0, running inward along y=12 to `end`
// (defaults to the grid centre, x=12). For `obc-pipe-arrow`, callers pass the
// selected head's `stubEnd` (see `arrowStubEnd`) so the stub stops at the
// head's base column, not overshooting into the chevron.
export function endpointStubPath(end: number = C): string {
  return `M 0 ${C} L ${end} ${C}`;
}

// Per-size bar half-length (path endpoint distance from the grid centre)
// measured directly from the Figma endpoint vectors, separately for the
// OUTLINE and FILL passes (the two passes use slightly different bar lengths
// in Figma). Combined with the linecap these reproduce the exact bar extent:
// e.g. medium outline bar spans y=12±8 with a round cap of half-width 3, so
// the visible bar reaches y=1..23; small, large & xl use butt caps so the
// path endpoint IS the visible end (xl half=11 -> visible y=1..23).
export const ENDPOINT_BAR_HALF_OUTLINE: Record<PipeSize, number> = {
  small: 9,
  medium: 8,
  large: 9,
  xl: 11,
};
export const ENDPOINT_BAR_HALF_FILL: Record<PipeSize, number> = {
  small: 8,
  medium: 8,
  large: 8,
  xl: 10,
};

// Only the medium Figma endpoint bar uses a round linecap; small, large, and
// xl use butt caps (verified against the raw endpoint `outline` vectors —
// only the medium SVG carries `stroke-linecap="round"`). A round cap on xl,
// whose 14px stroke would add a 7px radius past each bar end, balloons the
// bar well outside the 24px tile.
export function endpointLineCap(size: PipeSize): 'round' | 'butt' {
  return size === 'medium' ? 'round' : 'butt';
}

// ---------------------------------------------------------------------------
// Arrowhead: exact bezier vectors from the Figma "Connectors" set's
// "going to" (GT, tip pointing +x) and "comming from" (CF, tip pointing -x)
// variants. Canonical orientation, terminus shifted to the origin (translated
// by -GRID/2); direction is handled by the component's rotation wrapper, not
// here.
// ---------------------------------------------------------------------------

type PathOp =
  | {
      t: 'curve';
      c1: [number, number];
      c2: [number, number];
      p: [number, number];
    }
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
    {
      t: 'curve',
      c1: [7.5, 4.13588],
      c2: [8.39013, 3.6595],
      p: [9.05469, 4.10254],
    },
    {t: 'line', p: [19.6533, 11.168]},
    {
      t: 'curve',
      c1: [20.247, 11.5638],
      c2: [20.247, 12.4362],
      p: [19.6533, 12.832],
    },
    {t: 'line', p: [9.05469, 19.8975]},
    {t: 'curve', c1: [8.39013, 20.3405], c2: [7.5, 19.8641], p: [7.5, 19.0654]},
    {t: 'line', p: [7.5, 4.93457]},
  ],
  stubEnd: 8,
};
const HEAD_GT_XL: ArrowHead = {
  start: [5.5, 1.9502],
  ops: [
    {
      t: 'curve',
      c1: [5.50024, 1.14521],
      c2: [6.40299, 0.670857],
      p: [7.06641, 1.12695],
    },
    {t: 'line', p: [21.6836, 11.1758]},
    {
      t: 'curve',
      c1: [22.2616, 11.5731],
      c2: [22.2616, 12.4269],
      p: [21.6836, 12.8242],
    },
    {t: 'line', p: [7.06641, 22.873]},
    {
      t: 'curve',
      c1: [6.40299, 23.3291],
      c2: [5.50024, 22.8548],
      p: [5.5, 22.0498],
    },
    {t: 'line', p: [5.5, 1.9502]},
  ],
  stubEnd: 6,
};
const HEAD_CF_NONXL: ArrowHead = {
  start: [19.5, 19.0654],
  ops: [
    {
      t: 'curve',
      c1: [19.5, 19.8641],
      c2: [18.6099, 20.3405],
      p: [17.9453, 19.8975],
    },
    {t: 'line', p: [7.34668, 12.832]},
    {
      t: 'curve',
      c1: [6.75296, 12.4362],
      c2: [6.75296, 11.5638],
      p: [7.34668, 11.168],
    },
    {t: 'line', p: [17.9453, 4.10254]},
    {
      t: 'curve',
      c1: [18.6099, 3.6595],
      c2: [19.5, 4.13588],
      p: [19.5, 4.93457],
    },
    {t: 'line', p: [19.5, 19.0654]},
  ],
  stubEnd: 10,
};
const HEAD_CF_XL: ArrowHead = {
  start: [20.5, 22.0498],
  ops: [
    {
      t: 'curve',
      c1: [20.4998, 22.8548],
      c2: [19.597, 23.3291],
      p: [18.9336, 22.873],
    },
    {t: 'line', p: [4.31641, 12.8242]},
    {
      t: 'curve',
      c1: [3.73845, 12.4269],
      c2: [3.73845, 11.5731],
      p: [4.31641, 11.1758],
    },
    {t: 'line', p: [18.9336, 1.12695]},
    {
      t: 'curve',
      c1: [19.597, 0.670855],
      c2: [20.4998, 1.14521],
      p: [20.5, 1.9502],
    },
    {t: 'line', p: [20.5, 22.0498]},
  ],
  stubEnd: 13,
};
const HEAD_CLOSED_GT_NONXL: ArrowHead = {
  start: [8, 4.93426],
  ops: [
    {t: 'line', p: [8, 12.4706]},
    {t: 'line', p: [8, 19.0657]},
    {
      t: 'curve',
      c1: [8, 19.4651],
      c2: [8.44507, 19.7033],
      p: [8.77735, 19.4818],
    },
    {t: 'line', p: [19.376, 12.416]},
    {
      t: 'curve',
      c1: [19.6728, 12.2181],
      c2: [19.6728, 11.7819],
      p: [19.376, 11.584],
    },
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
    {
      t: 'curve',
      c1: [6, 22.4521],
      c2: [6.45151, 22.6896],
      p: [6.78326, 22.4615],
    },
    {t: 'line', p: [21.4007, 12.412]},
    {
      t: 'curve',
      c1: [21.6897, 12.2133],
      c2: [21.6897, 11.7867],
      p: [21.4007, 11.588],
    },
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
    {
      t: 'curve',
      c1: [19, 4.53491],
      c2: [18.5549, 4.29672],
      p: [18.2227, 4.51823],
    },
    {t: 'line', p: [7.62404, 11.584]},
    {
      t: 'curve',
      c1: [7.32717, 11.7819],
      c2: [7.32717, 12.2181],
      p: [7.62404, 12.416],
    },
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
    {
      t: 'curve',
      c1: [20, 1.54793],
      c2: [19.5485, 1.31042],
      p: [19.2167, 1.5385],
    },
    {t: 'line', p: [4.5993, 11.588]},
    {
      t: 'curve',
      c1: [4.31032, 11.7867],
      c2: [4.31032, 12.2133],
      p: [4.5993, 12.412],
    },
    {t: 'line', p: [19.2167, 22.4615]},
    {t: 'curve', c1: [19.5485, 22.6896], c2: [20, 22.4521], p: [20, 22.0495]},
  ],
  stubEnd: 13,
};

function isClosedValue(value: PipeValue): boolean {
  return value === 'closed' || value === 'closed-dash';
}

function selectArrowHead(
  kind: 'arrow-out' | 'arrow-in',
  size: PipeSize,
  value: PipeValue
): ArrowHead {
  // 'arrow-out' == going-to (flow leaves the device toward this endpoint);
  // 'arrow-in' == coming-from (flow enters the device from this endpoint).
  if (isClosedValue(value)) {
    if (kind === 'arrow-out')
      return size === 'xl' ? HEAD_CLOSED_GT_XL : HEAD_CLOSED_GT_NONXL;
    if (size === 'xl') return HEAD_CLOSED_CF_XL;
    return size === 'large'
      ? {...HEAD_CLOSED_CF_NONXL, stubEnd: 16}
      : HEAD_CLOSED_CF_NONXL;
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
export function arrowStubEnd(
  flow: 'arrow-in' | 'arrow-out',
  size: PipeSize,
  value: PipeValue
): number {
  return selectArrowHead(flow, size, value).stubEnd;
}

// Builds the arrowhead `d` string (closed bezier shape only; the blending
// stub is drawn separately via endpointStubPath/head.stubEnd by the
// component layer). Every point is shifted by -GRID/2 so the terminus lands
// at the origin, matching the canonical endpoint/stub coordinate convention.
export function arrowHeadPath(
  flow: 'arrow-in' | 'arrow-out',
  size: PipeSize,
  value: PipeValue
): string {
  const head = selectArrowHead(flow, size, value);
  const halfG = GRID / 2;
  const shift = (p: [number, number]): [number, number] => [
    p[0] - halfG,
    p[1] - halfG,
  ];
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

// Overlap: a crossing where one run passes over the other without
// connecting. Per the Figma "overlap" vectors (all four sizes), it is TWO
// paths stroked twice (outline-weight pass then fill-weight pass), the same
// stroke model as the straight/endpoint:
//   - `continuous`: the run that passes OVER — a full-length line through the
//     tile centre, unbroken.
//   - `gapped`: the run that passes UNDER — the same line split into two
//     segments with a gap at the centre, so the continuous run reads as
//     lying on top.
// Canonical orientation (matches the Figma vector): the VERTICAL run is
// continuous, the HORIZONTAL run is gapped. The gap half-width is
// `OVERLAP_HALF_GAP[size]` (small 4, medium 5, large 7, xl 9 — measured: the
// horizontal segments end at x = 12 ± that value). The component rotates the
// pair 90° for the other `direction`.
export interface OverlapPaths {
  continuous: string;
  gapped: string;
}

export function overlapPaths(size: PipeSize): OverlapPaths {
  const gap = OVERLAP_HALF_GAP[size];
  return {
    continuous: `M ${C} 0 L ${C} ${GRID}`,
    gapped: `M ${GRID} ${C} L ${C + gap} ${C} M ${C - gap} ${C} L 0 ${C}`,
  };
}
