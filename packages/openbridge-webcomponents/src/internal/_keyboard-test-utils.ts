import {userEvent} from '@vitest/browser/context';

/**
 * Focus and key helpers for keyboard specs.
 *
 * `document.activeElement` stops at the outermost host, so a component that
 * focuses a control inside its shadow root looks unfocused from the test's
 * side. These walk the tree the way the browser's focus actually sits.
 */

/** The focused element, following every open shadow root down. */
export function deepActiveElement(): Element | null {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/** Presses Tab `count` times and records where focus lands each time. */
export async function tabStops(count: number): Promise<(Element | null)[]> {
  const stops: (Element | null)[] = [];
  for (let step = 0; step < count; step++) {
    await userEvent.tab();
    stops.push(deepActiveElement());
  }
  return stops;
}

/** The elements of `root` that the browser would stop on when tabbing. */
export function tabbableWithin(root: ParentNode): Element[] {
  return Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}
