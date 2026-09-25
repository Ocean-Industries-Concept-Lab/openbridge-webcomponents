import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './tab-row.js';
import type {ObcTabRow, TabData} from './tab-row.js';

/**
 * The tab–panel half of the APG Tabs pattern
 * (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), and the events the row
 * lets out.
 */
const tabs: TabData[] = [
  {id: 'one', title: 'One'},
  {id: 'two', title: 'Two'},
];

const panelSlot = (id: string) => `tab-${id}-panel`;

async function setup({hasPanels = false} = {}) {
  const screen = render(
    html`<obc-tab-row
      .tabs=${tabs}
      .selectedTabId=${'one'}
      .hasPanels=${hasPanels}
    >
      <div slot=${panelSlot('one')}>First</div>
      <div slot=${panelSlot('two')}>Second</div>
    </obc-tab-row>`
  );
  const el = screen.container.querySelector('obc-tab-row') as ObcTabRow;
  await el.updateComplete;
  await Promise.all(
    Array.from(
      el.shadowRoot!.querySelectorAll('obc-tab-item'),
      (item) =>
        (item as unknown as {updateComplete: Promise<unknown>}).updateComplete
    )
  );
  await el.updateComplete;
  return el;
}

function tabControl(el: ObcTabRow, index: number): HTMLElement {
  const item = el.shadowRoot!.querySelectorAll('obc-tab-item')[index];
  return item.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
}

function panels(el: ObcTabRow): HTMLElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll('[role="tabpanel"]'));
}

describe('obc-tab-row', () => {
  it('reports a click as tab-selected and keeps tab-click inside the row', async () => {
    const el = await setup();
    const reached: string[] = [];
    const record = (event: Event) => reached.push(event.type);
    document.addEventListener('tab-click', record);
    document.addEventListener('tab-selected', record);
    try {
      await userEvent.click(tabControl(el, 1));
    } finally {
      document.removeEventListener('tab-click', record);
      document.removeEventListener('tab-selected', record);
    }
    expect(reached).toEqual(['tab-selected']);
  });

  it('renders no panels unless hasPanels is set', async () => {
    const el = await setup();
    expect(panels(el)).toEqual([]);
  });

  it('renders a panel per tab, named after it, and shows the selected one', async () => {
    const el = await setup({hasPanels: true});
    const rendered = panels(el);
    expect(rendered.map((panel) => panel.getAttribute('aria-label'))).toEqual([
      'One',
      'Two',
    ]);
    expect(rendered.map((panel) => panel.hidden)).toEqual([false, true]);
    expect(
      rendered.map(
        (panel) =>
          panel.querySelector('slot')!.assignedElements()[0]?.textContent
      )
    ).toEqual(['First', 'Second']);
  });

  it('points each tab at its panel', async () => {
    const el = await setup({hasPanels: true});
    const [first, second] = panels(el);
    expect(tabControl(el, 0).ariaControlsElements).toEqual([first]);
    expect(tabControl(el, 1).ariaControlsElements).toEqual([second]);
  });

  it('shows the panel of the tab the user selects', async () => {
    const el = await setup({hasPanels: true});
    await userEvent.click(tabControl(el, 1));
    await el.updateComplete;
    expect(panels(el).map((panel) => panel.hidden)).toEqual([true, false]);
  });
});
