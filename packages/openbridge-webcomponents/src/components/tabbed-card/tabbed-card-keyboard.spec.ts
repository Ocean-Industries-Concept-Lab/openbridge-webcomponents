import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './tabbed-card.js';
import type {ObcTabbedCard} from './tabbed-card.js';
import {deepActiveElement, tabStops} from '../../internal/_test-utils.js';

/**
 * The APG Tabs pattern with automatic activation
 * (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): one tab stop on the
 * selected tab, Left and Right move and wrap, Home and End go to the ends,
 * and a tab is selected as soon as it has focus.
 */
async function setup() {
  const screen = render(
    html`<button id="before">before</button>
      <obc-tabbed-card nTabs="3" selectedTab="1">
        <span slot="tab-title-0">A</span>
        <span slot="tab-title-1">B</span>
        <span slot="tab-title-2">C</span>
        <p slot="tab-content-0">Panel A</p>
        <p slot="tab-content-1">Panel B</p>
        <p slot="tab-content-2">Panel C</p>
      </obc-tabbed-card>
      <button id="after">after</button>`
  );
  const card = screen.container.querySelector(
    'obc-tabbed-card'
  ) as ObcTabbedCard;
  await card.updateComplete;
  const tabs = Array.from(
    card.shadowRoot!.querySelectorAll<HTMLElement>('[role="tab"]')
  );
  const before = screen.container.querySelector('#before') as HTMLElement;
  const after = screen.container.querySelector('#after') as HTMLElement;
  return {card, tabs, before, after};
}

async function press(card: ObcTabbedCard, key: string) {
  await userEvent.keyboard(`{${key}}`);
  await card.updateComplete;
}

function state(card: ObcTabbedCard, tabs: HTMLElement[]) {
  return {
    focused: tabs.indexOf(deepActiveElement() as HTMLElement),
    selected: card.selectedTab,
  };
}

describe('obc-tabbed-card keyboard', () => {
  it('is one tab stop, on the selected tab, followed by its panel', async () => {
    const {card, tabs, before, after} = await setup();
    before.focus();
    expect(await tabStops(3)).toEqual([
      tabs[1],
      card.shadowRoot!.querySelector('#panel-1'),
      after,
    ]);
  });

  it('moves focus and selection with Left and Right, wrapping', async () => {
    const {card, tabs} = await setup();
    tabs[1].focus();
    await press(card, 'ArrowRight');
    expect(state(card, tabs)).toEqual({focused: 2, selected: 2});
    await press(card, 'ArrowRight');
    expect(state(card, tabs)).toEqual({focused: 0, selected: 0});
    await press(card, 'ArrowLeft');
    expect(state(card, tabs)).toEqual({focused: 2, selected: 2});
  });

  it('goes to the ends with Home and End', async () => {
    const {card, tabs} = await setup();
    tabs[1].focus();
    await press(card, 'End');
    expect(state(card, tabs)).toEqual({focused: 2, selected: 2});
    await press(card, 'Home');
    expect(state(card, tabs)).toEqual({focused: 0, selected: 0});
  });

  it('selects a tab, and shows its panel, as soon as it has focus', async () => {
    const {card, tabs} = await setup();
    tabs[2].focus();
    await card.updateComplete;
    expect(card.selectedTab).toBe(2);
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(
      (card.shadowRoot!.querySelector('#panel-2') as HTMLElement).hidden
    ).toBe(false);
  });

  it('points each tab at its panel, which its tab names', async () => {
    const {card, tabs} = await setup();
    for (const tab of tabs) {
      const panel = card.shadowRoot!.getElementById(
        tab.getAttribute('aria-controls')!
      );
      expect(panel?.getAttribute('aria-labelledby')).toBe(tab.id);
    }
  });
});
