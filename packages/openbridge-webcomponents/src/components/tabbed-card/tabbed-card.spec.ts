import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './tabbed-card.js';
import type {ObcTabbedCard} from './tabbed-card.js';

async function setup() {
  const changes: number[] = [];
  const screen = render(
    html`<obc-tabbed-card
      nTabs="3"
      @tab-change=${(event: CustomEvent<{tab: number}>) =>
        changes.push(event.detail.tab)}
    >
      <span slot="tab-title-0">A</span>
      <span slot="tab-title-1">B</span>
      <span slot="tab-title-2">C</span>
    </obc-tabbed-card>`
  );
  const card = screen.container.querySelector(
    'obc-tabbed-card'
  ) as ObcTabbedCard;
  await card.updateComplete;
  const tabs = Array.from(
    card.shadowRoot!.querySelectorAll<HTMLElement>('[role="tab"]')
  );
  return {card, tabs, changes};
}

describe('obc-tabbed-card', () => {
  it('fires tab-change once when a tab is clicked', async () => {
    const {tabs, changes} = await setup();
    await userEvent.click(tabs[1]);
    expect(changes).toEqual([1]);
  });

  it('fires tab-change once per arrow key, and not for focus alone', async () => {
    const {tabs, changes} = await setup();
    tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(changes).toEqual([1]);
  });
});
