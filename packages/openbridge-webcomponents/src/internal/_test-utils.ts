import {userEvent} from '@vitest/browser/context';
import {composedContains, deepActiveElement} from './focus.js';

/**
 * Focus and key helpers for keyboard specs.
 *
 * `document.activeElement` stops at the outermost host, so a component that
 * focuses a control inside its shadow root looks unfocused from the test's
 * side. These walk the tree the way the browser's focus actually sits.
 */

export {deepActiveElement};

/**
 * Whether `node` sits under `ancestor`, crossing shadow boundaries and slots.
 * `Element.contains()` stops at a shadow root, so a host never "contains"
 * the control it renders.
 */
export const containsDeep = composedContains;

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
