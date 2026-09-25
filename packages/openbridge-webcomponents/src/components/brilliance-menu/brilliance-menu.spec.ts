import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './brilliance-menu.js';
import type {ObcBrillianceMenu} from './brilliance-menu.js';
import type {ObcTabRow} from '../tab-row/tab-row.js';

async function settle(root: ParentNode): Promise<void> {
  const elements = Array.from(root.querySelectorAll('*')) as (Element & {
    updateComplete?: Promise<unknown>;
  })[];
  await Promise.all(elements.map((element) => element.updateComplete));
  for (const element of elements) {
    if (element.shadowRoot) await settle(element.shadowRoot);
  }
}

async function setup() {
  const screen = render(
    html`<obc-brilliance-menu variant="tabbed"></obc-brilliance-menu>`
  );
  const menu = screen.container.querySelector(
    'obc-brilliance-menu'
  ) as ObcBrillianceMenu;
  await settle(screen.container);
  const row = menu.shadowRoot!.querySelector('obc-tab-row') as ObcTabRow;
  return {menu, row};
}

function tabControl(row: ObcTabRow, index: number): HTMLElement {
  const item = row.shadowRoot!.querySelectorAll('obc-tab-item')[index];
  return item.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
}

describe('obc-brilliance-menu tabbed', () => {
  it('keeps the tab row events inside the menu', async () => {
    const {row} = await setup();
    const reached: string[] = [];
    const record = (event: Event) => reached.push(event.type);
    const names = ['tab-click', 'tab-selected', 'tab-closed', 'add-new-tab'];
    names.forEach((name) => document.addEventListener(name, record));
    try {
      await userEvent.click(tabControl(row, 1));
    } finally {
      names.forEach((name) => document.removeEventListener(name, record));
    }
    expect(reached).toEqual([]);
  });

  it('shows its panels through the tab row, each linked to its tab', async () => {
    const {menu, row} = await setup();
    expect(menu.shadowRoot!.querySelectorAll('[role="tabpanel"]')).toHaveLength(
      0
    );
    const panels = Array.from(
      row.shadowRoot!.querySelectorAll<HTMLElement>('[role="tabpanel"]')
    );
    expect(panels.map((panel) => panel.getAttribute('aria-label'))).toEqual([
      'Brilliance',
      'Day/Night',
    ]);
    expect(tabControl(row, 0).ariaControlsElements).toEqual([panels[0]]);
    expect(tabControl(row, 1).ariaControlsElements).toEqual([panels[1]]);
  });

  it("names its tab list in the menu's own words", async () => {
    const {row} = await setup();
    expect(
      row
        .shadowRoot!.querySelector('[role="tablist"]')!
        .getAttribute('aria-label')
    ).toBe('Display');
  });

  it('switches panels when the other tab is selected', async () => {
    const {row} = await setup();
    await userEvent.click(tabControl(row, 1));
    await settle(row.shadowRoot!);
    const panels = Array.from(
      row.shadowRoot!.querySelectorAll<HTMLElement>('[role="tabpanel"]')
    );
    expect(panels.map((panel) => panel.hidden)).toEqual([true, false]);
  });
});
