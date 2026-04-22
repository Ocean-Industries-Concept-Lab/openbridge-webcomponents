/**
 * Shared CSS custom property constants and reading helpers for POI sizing.
 * Used by poi-group and poi-layer.
 */

export const POI_TOUCH_TARGET_VAR =
  '--maneuvering-components-poi-button-touch-target';
export const POI_VISUAL_TARGET_VAR =
  '--maneuvering-components-poi-button-visual-target-round';
export const POI_VISUAL_TARGET_OVERLAP_VAR =
  '--maneuvering-components-poi-button-visual-target-round-overlap';
export const POI_LARGE_VISUAL_TARGET_VAR =
  '--maneuvering-components-poi-button-large-visual-target-round';
export const POI_LARGE_VISUAL_TARGET_OVERLAP_VAR =
  '--maneuvering-components-poi-button-large-visual-target-round-overlap';

export function getCssVarAsNumber(
  el: Element,
  varName: string,
  fallback: number
): number {
  const raw = getComputedStyle(el).getPropertyValue(varName).trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getTouchTargetSize(el: Element): number {
  return getCssVarAsNumber(el, POI_TOUCH_TARGET_VAR, 48);
}

export function getVisualTargetSize(
  el: Element,
  isEnhanced: boolean,
  isOverlap: boolean
): number {
  if (isEnhanced) {
    return isOverlap
      ? getCssVarAsNumber(el, POI_LARGE_VISUAL_TARGET_OVERLAP_VAR, 36)
      : getCssVarAsNumber(el, POI_LARGE_VISUAL_TARGET_VAR, 52);
  }
  return isOverlap
    ? getCssVarAsNumber(el, POI_VISUAL_TARGET_OVERLAP_VAR, 32)
    : getCssVarAsNumber(el, POI_VISUAL_TARGET_VAR, 36);
}
