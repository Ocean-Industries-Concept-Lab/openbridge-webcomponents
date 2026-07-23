/**
 * Pure layout math for the shuffle-button mechanism: a selector whose selected
 * thumb always occupies the fixed center slot of a (2n-1)-slot row while the
 * remaining option thumbs keep their logical order on either side.
 */

export function clampPosition(positionCount: number, position: number): number {
  return Math.min(Math.max(Math.round(position), 0), positionCount - 1);
}

export function shuffleSlotCount(positionCount: number): number {
  return 2 * positionCount - 1;
}

export function shuffleWindowOffset(
  positionCount: number,
  selectedPosition: number
): number {
  return positionCount - 1 - clampPosition(positionCount, selectedPosition);
}
