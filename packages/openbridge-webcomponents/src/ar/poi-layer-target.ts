export enum PoiDataVisualRectPreference {
  Largest = 'largest',
  Group = 'group',
  Anchor = 'anchor',
  Size = 'size',
}

export const POI_TARGET_ATTR = 'data-poi-target';

type PoiLayerTargetVisualElementPreference =
  | PoiDataVisualRectPreference.Group
  | PoiDataVisualRectPreference.Anchor
  | PoiDataVisualRectPreference.Size;

/**
 * Minimum contract for any element that can participate in
 * `obc-poi-layer` grouping / overlap / crossing / stack selection.
 *
 * Implement this interface and set `data-poi-target` on the host
 * element in `connectedCallback` to make a component layer-compatible.
 */
export interface PoiLayerTarget extends HTMLElement {
  /* Position — required by layer for positioning and grouping */
  x: number;
  y: number;
  buttonOffsetX: number;
  targetOffsetX: number;
  lineCompensationY: number;
  fixedTarget: boolean;

  /* State — read/written by layer and stack */
  selected: boolean;
  value: string;

  /* Visual query — used by layer for rect-based grouping */
  getVisualRect(preference: PoiDataVisualRectPreference): DOMRect;
  getVisualElement(
    preference: PoiLayerTargetVisualElementPreference
  ): HTMLElement;
  getPointerElement(): HTMLElement | null;

  /* Optional — layer/group code guards access before using */
  buttonY?: number | null;
  buttonType?: string;
  data?: unknown[];
  hasHeader?: boolean;
  animatePosition?: boolean;
}

export function isPoiLayerTarget(el: Element): el is PoiLayerTarget {
  return el.hasAttribute(POI_TARGET_ATTR);
}
