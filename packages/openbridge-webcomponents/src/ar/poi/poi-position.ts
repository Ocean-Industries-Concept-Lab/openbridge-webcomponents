interface PoiXElement extends HTMLElement {
  x: number;
}

function hasFinitePoiX(element: HTMLElement): element is PoiXElement {
  const xValue = Reflect.get(element, 'x');
  return typeof xValue === 'number' && Number.isFinite(xValue);
}

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

  if (hasFinitePoiX(element)) {
    return element.x;
  }

  return 0;
}
