/**
 * Shared grouping attribute and inline style cleanup for POI targets.
 * Used by poi-layer-stack, poi-group, and poi-layer.
 */

const GROUPING_ATTRIBUTES = [
  'data-grouped',
  'data-joined-expanded',
  'data-pregrouped',
  'data-behind',
  'data-front',
  'data-front-exit',
  'data-exiting',
  'data-exit-lock',
] as const;

const GROUPING_STYLES = [
  'position',
  'width',
  'min-width',
  'height',
  'transform',
] as const;

const GROUPING_CSS_VARS = [
  '--obc-poi-group-overlap-height',
  '--obc-poi-group-overlap-shift',
  '--poi-size',
  '--obc-poi-target-icon-opacity',
  '--obc-poi-overlap',
  '--obc-poi-overlap-elements-opacity',
  '--obc-poi-label-opacity',
  '--obc-poi-label-visibility',
  '--obc-poi-overlap-pointer-events',
] as const;

export function clearTargetGroupingAttributes(target: HTMLElement) {
  for (const attr of GROUPING_ATTRIBUTES) {
    target.removeAttribute(attr);
  }
}

export function clearTargetGroupingStyles(target: HTMLElement) {
  for (const prop of GROUPING_STYLES) {
    target.style.removeProperty(prop);
  }
  for (const prop of GROUPING_CSS_VARS) {
    target.style.removeProperty(prop);
  }
}
