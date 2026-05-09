/**
 * Shared visual-state helpers for POI overlap styling.
 * Used by poi-group and poi-layer to apply/clear identical CSS variable sets.
 */

export function applyPoiVisualState(
  target: HTMLElement,
  overlap: boolean,
  sizePx: number
) {
  target.style.setProperty('--poi-size', `${sizePx}px`);
  target.style.setProperty(
    '--obc-poi-target-icon-opacity',
    overlap ? '0' : '1'
  );
  target.style.setProperty('--obc-poi-overlap', overlap ? '1' : '0');
  target.style.setProperty(
    '--obc-poi-overlap-elements-opacity',
    overlap ? '0' : '1'
  );
  target.style.setProperty('--obc-poi-label-opacity', overlap ? '0' : '1');
  target.style.setProperty(
    '--obc-poi-label-visibility',
    overlap ? 'hidden' : 'visible'
  );
  target.style.setProperty(
    '--obc-poi-overlap-pointer-events',
    overlap ? 'none' : 'auto'
  );
}

export function clearPoiVisualState(target: HTMLElement) {
  target.style.removeProperty('--poi-size');
  target.style.removeProperty('--obc-poi-target-icon-opacity');
  target.style.removeProperty('--obc-poi-overlap');
  target.style.removeProperty('--obc-poi-overlap-elements-opacity');
  target.style.removeProperty('--obc-poi-label-opacity');
  target.style.removeProperty('--obc-poi-label-visibility');
  target.style.removeProperty('--obc-poi-overlap-pointer-events');
}
