/**
 * Accessibility checks axe does not ship, run with the rest of `npm run test-a11y`.
 *
 * axe checks what ARIA requires. The APG patterns ask for more than that, and
 * the gaps it leaves are the ones this library has shipped: a tab row whose
 * close buttons were extra tab stops, a tab list with no name, and tab panels
 * nothing pointed at (#1312). Each rule here turns one of those into a
 * finding, and the axe baseline ratchet treats it like any other rule.
 *
 * - `obc-composite-one-tab-stop` — a composite widget (tab list, radio group,
 *   menu, listbox, tree, grid, toolbar) is one stop in the tab sequence; the
 *   arrow keys move inside it.
 * - `obc-composite-name` — a tab list, radio group, tree, tree grid, menu or
 *   menu bar has an accessible name, so a screen reader can say which one the
 *   user is in.
 * - `obc-tabpanel-link` — a tab panel has a name and a tab that points at it
 *   through `aria-controls`.
 *
 * The walk follows the tree as it renders: into shadow roots and through
 * slots to what they show.
 */
import axe, {type Spec, type VirtualNode} from 'axe-core';

const COMPOSITE_ROLES = [
  'tablist',
  'radiogroup',
  'menu',
  'menubar',
  'listbox',
  'tree',
  'treegrid',
  'grid',
  'toolbar',
];

const NAMED_COMPOSITE_ROLES = [
  'tablist',
  'radiogroup',
  'tree',
  'treegrid',
  'menu',
  'menubar',
];

const bySelector = (roles: string[]) =>
  roles.map((role) => `[role="${role}"]`).join(', ');

/** Children as the page renders them: a slot's assigned nodes, a host's shadow root. */
function renderedChildren(element: Element): Element[] {
  if (element instanceof HTMLSlotElement) {
    const assigned = element.assignedElements({flatten: true});
    return assigned.length > 0 ? assigned : Array.from(element.children);
  }
  return Array.from((element.shadowRoot ?? element).children);
}

function renderedParent(node: Element): Element | null {
  if (node.assignedSlot) return node.assignedSlot;
  const parent = node.parentNode;
  if (parent instanceof ShadowRoot) return parent.host;
  return parent instanceof Element ? parent : null;
}

function isInert(element: Element): boolean {
  for (let node: Element | null = element; node; node = renderedParent(node)) {
    if ((node as HTMLElement).inert) return true;
  }
  return false;
}

/** In the sequential tab order: focusable, not skipped, rendered, not inert. */
function isTabStop(element: Element): boolean {
  const html = element as HTMLElement;
  if (typeof html.tabIndex !== 'number' || html.tabIndex < 0) return false;
  if ((html as HTMLButtonElement).disabled) return false;
  const focusable =
    element.matches(
      'a[href], button, input, select, textarea, summary, iframe, [contenteditable=""], [contenteditable="true"]'
    ) || element.hasAttribute('tabindex');
  if (!focusable) return false;
  if (!html.checkVisibility({visibilityProperty: true})) return false;
  return !isInert(element);
}

/** Tab stops inside `root`, leaving nested composites to their own check. */
function tabStopsWithin(root: Element): Element[] {
  const stops: Element[] = [];
  const walk = (element: Element) => {
    for (const child of renderedChildren(element)) {
      const role = child.getAttribute('role');
      if (role && COMPOSITE_ROLES.includes(role)) continue;
      if (isTabStop(child)) stops.push(child);
      walk(child);
    }
  };
  walk(root);
  return stops;
}

/** Every element in the page, shadow trees included. */
function allElements(root: ParentNode = document): Element[] {
  const out: Element[] = [];
  for (const element of Array.from(root.querySelectorAll('*'))) {
    out.push(element);
    if (element.shadowRoot) out.push(...allElements(element.shadowRoot));
  }
  return out;
}

function nameOf(virtualNode: VirtualNode): string {
  return axe.commons.text.accessibleTextVirtual(virtualNode).trim();
}

export const obcA11yRules: Spec = {
  checks: [
    {
      id: 'obc-one-tab-stop',
      evaluate(node: Element) {
        const stops = tabStopsWithin(node);
        if (stops.length <= 1) return true;
        this.data({count: stops.length});
        this.relatedNodes(stops);
        return false;
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: 'The widget is one stop in the tab sequence',
          fail: 'The widget holds ${data.count} tab stops; its items should be reached with the arrow keys',
        },
      },
    },
    {
      id: 'obc-has-name',
      evaluate(_node: Element, _options: unknown, virtualNode: VirtualNode) {
        return nameOf(virtualNode) !== '';
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: 'The widget has an accessible name',
          fail: 'The widget has no accessible name (aria-label or aria-labelledby)',
        },
      },
    },
    {
      id: 'obc-tabpanel-controlled',
      evaluate(node: Element) {
        return allElements().some(
          (element) =>
            element.getAttribute('role') === 'tab' &&
            (element.ariaControlsElements ?? []).includes(node)
        );
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: 'A tab points at the panel through aria-controls',
          fail: 'No tab points at the panel through aria-controls',
        },
      },
    },
  ],
  rules: [
    {
      id: 'obc-composite-one-tab-stop',
      selector: bySelector(COMPOSITE_ROLES),
      all: ['obc-one-tab-stop'],
      tags: ['obc', 'keyboard'],
      metadata: {
        description:
          'A composite widget is one stop in the tab sequence (WAI-ARIA APG)',
        help: 'Composite widgets must hold a single tab stop',
      },
    },
    {
      id: 'obc-composite-name',
      selector: bySelector(NAMED_COMPOSITE_ROLES),
      all: ['obc-has-name'],
      tags: ['obc'],
      metadata: {
        description:
          'Tab lists, radio groups, trees and menus have an accessible name (WAI-ARIA APG)',
        help: 'Composite widgets must be named',
      },
    },
    {
      id: 'obc-tabpanel-link',
      selector: '[role="tabpanel"]',
      all: ['obc-has-name', 'obc-tabpanel-controlled'],
      tags: ['obc'],
      metadata: {
        description:
          'A tab panel is named and a tab points at it (WAI-ARIA APG Tabs)',
        help: 'Tab panels must be named and controlled by a tab',
      },
    },
  ],
};
