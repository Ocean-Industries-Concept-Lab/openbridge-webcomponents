import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './tree-navigation.js';
import '../tree-navigation-group/tree-navigation-group.js';
import '../tree-navigation-item/tree-navigation-item.js';
import type {ObcTreeNavigation} from './tree-navigation.js';
import type {ObcTreeNavigationItem} from '../tree-navigation-item/tree-navigation-item.js';
import {
  deepActiveElement,
  tabStops,
} from '../../internal/_keyboard-test-utils.js';

/**
 * Pins the [Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
 * keyboard table that `TreeRovingNavigator` implements. Type-ahead and `*` are
 * out of scope there, so nothing here asserts them.
 */

/** The size class carries the focus-frame width and the row touch target. */
beforeEach(() => {
  document.documentElement.classList.add('obc-component-size-regular');
});

afterEach(() => {
  document.documentElement.classList.remove('obc-component-size-regular');
});

async function setup() {
  const screen = render(
    html`<button id="before">before</button>
      <obc-tree-navigation>
        <obc-tree-navigation-item
          label="Alpha"
          .hasLeadingIcon=${false}
        ></obc-tree-navigation-item>
        <obc-tree-navigation-group label="Bravo" .hasIcon=${false}>
          <obc-tree-navigation-item
            label="Bravo one"
            .hasLeadingIcon=${false}
          ></obc-tree-navigation-item>
          <obc-tree-navigation-group label="Bravo two" .hasIcon=${false}>
            <obc-tree-navigation-item
              label="Bravo two one"
              .hasLeadingIcon=${false}
            ></obc-tree-navigation-item>
          </obc-tree-navigation-group>
        </obc-tree-navigation-group>
        <obc-tree-navigation-item
          label="Charlie"
          .hasLeadingIcon=${false}
        ></obc-tree-navigation-item>
      </obc-tree-navigation>
      <button id="after">after</button>`
  );
  const el = screen.container.querySelector(
    'obc-tree-navigation'
  ) as ObcTreeNavigation;
  await settle(el);
  return {el, screen};
}

/**
 * Expanding reflects an attribute that the container observes before it
 * re-points the roving tabindex, so a key that expands lands a turn later.
 */
async function settle(el: ObcTreeNavigation): Promise<void> {
  await el.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  await el.updateComplete;
}

/** Focus starts outside so the tree is entered the way a user reaches it. */
async function enterTree(el: ObcTreeNavigation): Promise<void> {
  (el.parentElement!.querySelector('#before') as HTMLElement).focus();
  await userEvent.tab();
}

/** The label of the row holding focus; the roving tabindex sits on its wrapper. */
function focusedLabel(): string | undefined {
  return deepActiveElement()?.querySelector('.label')?.textContent?.trim();
}

/**
 * The interactive wrapper of every on-screen row, group headers included. Rows
 * inside a collapsed group are left out: they are display:none, so their
 * tabindex says nothing about where Tab can land.
 */
function visibleWrappers(el: ObcTreeNavigation): HTMLElement[] {
  const items = Array.from(
    el.querySelectorAll<ObcTreeNavigationItem>('obc-tree-navigation-item')
  );
  const headers = Array.from(
    el.querySelectorAll('obc-tree-navigation-group')
  ).map((group) =>
    group.shadowRoot!.querySelector<ObcTreeNavigationItem>(
      'obc-tree-navigation-item'
    )
  );
  return [...items, ...headers].flatMap((item) => {
    const wrapper = item?.shadowRoot?.querySelector<HTMLElement>('.wrapper');
    return wrapper?.checkVisibility() ? [wrapper] : [];
  });
}

describe('obc-tree-navigation keyboard', () => {
  it('takes one tab stop for the whole tree', async () => {
    const {el} = await setup();
    (el.parentElement!.querySelector('#before') as HTMLElement).focus();

    const stops = await tabStops(2);

    expect(stops[0]?.querySelector('.label')?.textContent?.trim()).toBe(
      'Alpha'
    );
    expect((stops[1] as HTMLElement)?.id).toBe('after');
    expect(
      visibleWrappers(el).filter((wrapper) => wrapper.tabIndex === 0)
    ).toHaveLength(1);
  });

  it('moves focus to the next and previous visible rows on ArrowDown and ArrowUp', async () => {
    const {el} = await setup();
    await enterTree(el);

    await userEvent.keyboard('{ArrowDown}');
    const second = focusedLabel();
    await userEvent.keyboard('{ArrowDown}');
    const third = focusedLabel();
    await userEvent.keyboard('{ArrowUp}');

    expect([second, third, focusedLabel()]).toEqual([
      'Bravo',
      'Charlie',
      'Bravo',
    ]);
  });

  it('keeps focus on the first row when ArrowUp has nowhere to go', async () => {
    const {el} = await setup();
    await enterTree(el);

    await userEvent.keyboard('{ArrowUp}');

    expect(focusedLabel()).toBe('Alpha');
  });

  it('expands a collapsed group on ArrowRight, then moves to its first row', async () => {
    const {el} = await setup();
    await enterTree(el);
    await userEvent.keyboard('{ArrowDown}');

    await userEvent.keyboard('{ArrowRight}');
    await settle(el);
    const stillOnGroup = focusedLabel();
    await userEvent.keyboard('{ArrowRight}');

    expect(stillOnGroup).toBe('Bravo');
    expect(el.querySelector('obc-tree-navigation-group')).toHaveAttribute(
      'expanded'
    );
    expect(focusedLabel()).toBe('Bravo one');
  });

  it('collapses an expanded group on ArrowLeft, and moves to the parent from a row', async () => {
    const {el} = await setup();
    await enterTree(el);
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    await settle(el);
    await userEvent.keyboard('{ArrowRight}');

    await userEvent.keyboard('{ArrowLeft}');
    await settle(el);
    const onParent = focusedLabel();
    await userEvent.keyboard('{ArrowLeft}');
    await settle(el);

    expect(onParent).toBe('Bravo');
    expect(el.querySelector('obc-tree-navigation-group')).not.toHaveAttribute(
      'expanded'
    );
    expect(focusedLabel()).toBe('Bravo');
  });

  it('moves focus to the last and first rows on End and Home', async () => {
    const {el} = await setup();
    await enterTree(el);

    await userEvent.keyboard('{End}');
    const last = focusedLabel();
    await userEvent.keyboard('{Home}');

    expect([last, focusedLabel()]).toEqual(['Charlie', 'Alpha']);
  });

  it('activates the focused row with Enter and with Space', async () => {
    const {el} = await setup();
    const activations: string[] = [];
    for (const item of el.querySelectorAll('obc-tree-navigation-item')) {
      item.addEventListener('click', () => activations.push(item.label));
    }
    await enterTree(el);

    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{End}');
    await userEvent.keyboard(' ');

    expect(activations).toEqual(['Alpha', 'Charlie']);
  });

  it('shows the focus ring on the row the keyboard lands on', async () => {
    const {el} = await setup();
    await enterTree(el);
    const wrapper = deepActiveElement() as HTMLElement;
    const ring = getComputedStyle(
      wrapper.querySelector('.visible-wrapper') as HTMLElement
    );

    expect(wrapper.matches(':focus-visible')).toBe(true);
    expect(ring.outlineStyle).toBe('solid');
    expect(parseFloat(ring.outlineWidth)).toBeGreaterThan(0);
  });
});
