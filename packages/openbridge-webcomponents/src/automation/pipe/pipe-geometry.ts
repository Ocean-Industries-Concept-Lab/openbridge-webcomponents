import {GRID, CORNER_RADIUS} from './pipe-styles.js';
import type {PipeDirection} from './pipe-types.js';

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
