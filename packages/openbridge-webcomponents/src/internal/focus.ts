/**
 * Focus queries that see through open shadow roots.
 *
 * `document.activeElement` and `querySelectorAll` both stop at a shadow
 * boundary, so a component that focuses a control it renders reads as
 * unfocused from outside, and a dialog cannot find the controls it has to
 * cycle between. These walk the composed tree instead.
 */

const TABBABLE_SELECTOR =
  'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]';

/** The focused element, following every open shadow root down. */
export function deepActiveElement(): Element | null {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/**
 * Whether `node` sits inside `root` in the composed tree.
 *
 * `Node.contains()` walks the DOM tree, where slotted light-DOM content is a
 * child of the host and not of the slot — so it answers no for exactly the
 * content a component projects into itself. This follows `assignedSlot` and
 * shadow hosts as well.
 */
export function composedContains(root: Node, node: Node | null): boolean {
  let current: Node | null = node;
  while (current) {
    if (current === root) return true;
    current =
      (current as Element).assignedSlot ??
      current.parentNode ??
      (current instanceof ShadowRoot ? current.host : null);
  }
  return false;
}

/**
 * Moves focus out of `hidden`, to the first fallback that will take it.
 *
 * Call it just before a region becomes `inert` or is taken out of the page.
 * The browser blurs whatever it hides, and focus lands on `<body>` a frame or
 * two later, so the next Tab press starts from the top of the document instead
 * of where the user was.
 *
 * Each candidate is tried and then checked, rather than inspected first: a
 * `disabled` button, a hidden one and an element with no tabindex all refuse
 * focus for different reasons, and the only reliable question is whether focus
 * actually left.
 */
export function releaseFocusBefore(
  hidden: Node,
  ...fallbacks: (HTMLElement | null | undefined)[]
): void {
  if (!composedContains(hidden, deepActiveElement())) return;
  for (const candidate of fallbacks) {
    if (!candidate) continue;
    candidate.focus();
    if (!composedContains(hidden, deepActiveElement())) return;
  }
}

function isTabbable(element: Element): element is HTMLElement {
  if (!element.matches(TABBABLE_SELECTOR)) return false;
  if ((element as HTMLElement).tabIndex < 0) return false;
  if ((element as HTMLButtonElement).disabled) return false;
  return element.getClientRects().length > 0;
}

/**
 * The elements under `root` a Tab press could land on, in rendered order:
 * shadow children before light children, light children only where a slot
 * places them.
 */
export function composedTabbables(root: Node): HTMLElement[] {
  const found: HTMLElement[] = [];
  const visit = (node: Node) => {
    if (node instanceof HTMLSlotElement) {
      node.assignedNodes({flatten: true}).forEach(visit);
      return;
    }
    if (node instanceof Element) {
      if (isTabbable(node)) found.push(node);
      if (node.shadowRoot) {
        Array.from(node.shadowRoot.childNodes).forEach(visit);
        return;
      }
    }
    Array.from(node.childNodes).forEach(visit);
  };
  visit(root);
  return found;
}
