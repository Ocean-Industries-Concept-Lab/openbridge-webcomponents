export function getEffectivePoiX(element: HTMLElement): number {
  const cssVarX = Number.parseFloat(
    element.style.getPropertyValue('--obc-poi-data-x')
  );
  if (Number.isFinite(cssVarX)) {
    return cssVarX;
  }

  const inlineLeft = Number.parseFloat(element.style.left);
  if (Number.isFinite(inlineLeft)) {
    return inlineLeft;
  }

  if (typeof window !== 'undefined') {
    const computedLeft = Number.parseFloat(
      window.getComputedStyle(element).left || ''
    );
    if (Number.isFinite(computedLeft)) {
      return computedLeft;
    }
  }

  const fallbackX = (element as {x?: unknown}).x;
  if (typeof fallbackX === 'number' && Number.isFinite(fallbackX)) {
    return fallbackX;
  }

  return 0;
}
