import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html, type TemplateResult} from 'lit';
import '../../main.css';
import './split-button.js';
import '../../icons/icon-command-request.js';
import type {ObcSplitButton} from './split-button.js';
import type {ObcButton} from '../button/button.js';
import type {ObcIconButton} from '../icon-button/icon-button.js';
import type {ObcContextMenuInput} from '../context-menu-input/context-menu-input.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

const options = [
  {value: 'a', label: 'Alpha'},
  {value: 'b', label: 'Bravo'},
];

async function setup(template: TemplateResult) {
  const screen = render(template);
  const el = screen.container.querySelector(
    'obc-split-button'
  ) as ObcSplitButton;
  await el.updateComplete;
  const primary = el.shadowRoot!.querySelector('obc-button') as ObcButton;
  const dropdown = el.shadowRoot!.querySelector(
    'obc-icon-button'
  ) as ObcIconButton;
  await primary.updateComplete;
  await dropdown.updateComplete;
  return {screen, el, primary, dropdown};
}

function menuOf(el: ObcSplitButton) {
  return el.shadowRoot!.querySelector(
    'obc-context-menu-input'
  ) as ObcContextMenuInput | null;
}

async function openMenu(el: ObcSplitButton, dropdown: ObcIconButton) {
  await userEvent.click(dropdown.shadowRoot!.querySelector('button')!);
  await el.updateComplete;
  const menu = menuOf(el)!;
  await menu.updateComplete;
  return menu;
}

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * A key on the dropdown's native button. The split button listens on the
 * icon button's host, so the event has to be composed to cross its shadow
 * root, as a real key press is.
 */
async function pressOnDropdown(
  el: ObcSplitButton,
  dropdown: ObcIconButton,
  key: string
) {
  dropdown
    .shadowRoot!.querySelector('button')!
    .dispatchEvent(
      new KeyboardEvent('keydown', {key, bubbles: true, composed: true})
    );
  await el.updateComplete;
  await nextTask();
}

describe('obc-split-button dropdown icon', () => {
  it('renders the chevron when nothing fills the dropdown-icon slot', async () => {
    const {el} = await setup(
      html`<obc-split-button .options=${options}></obc-split-button>`
    );
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(
      'slot[name="dropdown-icon"]'
    )!;

    expect(slot.assignedElements()).toHaveLength(0);
    expect(slot.querySelector('obi-arrow-flyout-google')).not.toBeNull();
  });

  it('shows a slotted icon inside the dropdown button instead of the chevron', async () => {
    const {dropdown} = await setup(
      html`<obc-split-button .options=${options}>
        <obi-command-request slot="dropdown-icon"></obi-command-request>
      </obc-split-button>`
    );
    const iconSlot =
      dropdown.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
    const shown = iconSlot
      .assignedElements({flatten: true})
      .map((node) => node.tagName.toLowerCase());

    expect(shown).toEqual(['obi-command-request']);
  });
});

describe('obc-split-button halves disabled separately', () => {
  it('primaryDisabled disables the primary half and keeps the menu usable', async () => {
    const {el, primary, dropdown} = await setup(
      html`<obc-split-button
        .options=${options}
        primaryDisabled
      ></obc-split-button>`
    );

    expect(primary.disabled).toBe(true);
    expect(primary.shadowRoot!.querySelector('button')!.disabled).toBe(true);
    expect(dropdown.disabled).toBe(false);

    await openMenu(el, dropdown);
    expect(menuOf(el)).not.toBeNull();
  });

  it('dropdownDisabled disables the dropdown half and keeps the primary action', async () => {
    const clicks: string[] = [];
    const {el, primary, dropdown} = await setup(
      html`<obc-split-button
        .options=${options}
        dropdownDisabled
        @click=${(event: CustomEvent<{action: string}>) =>
          clicks.push(event.detail.action)}
      ></obc-split-button>`
    );

    expect(dropdown.disabled).toBe(true);
    expect(primary.disabled).toBe(false);

    await userEvent.click(primary.shadowRoot!.querySelector('button')!);
    expect(clicks).toEqual(['primary']);

    await pressOnDropdown(el, dropdown, 'ArrowDown');
    expect(menuOf(el)).toBeNull();
  });

  it('disabled still disables both halves', async () => {
    const {primary, dropdown} = await setup(
      html`<obc-split-button .options=${options} disabled></obc-split-button>`
    );

    expect(primary.disabled).toBe(true);
    expect(dropdown.disabled).toBe(true);
  });

  it('Tab skips the disabled half', async () => {
    const {screen, dropdown} = await setup(
      html`<button id="before">before</button>
        <obc-split-button
          .options=${options}
          primaryDisabled
        ></obc-split-button>`
    );
    screen.container.querySelector<HTMLElement>('#before')!.focus();

    await userEvent.tab();

    expect(containsDeep(dropdown, deepActiveElement())).toBe(true);
  });
});

describe('obc-split-button keyboard', () => {
  it('ArrowDown on the dropdown opens the menu on its first item', async () => {
    const {el, dropdown} = await setup(
      html`<obc-split-button .options=${options}></obc-split-button>`
    );

    await pressOnDropdown(el, dropdown, 'ArrowDown');

    const menu = menuOf(el);
    expect(menu).not.toBeNull();
    expect(containsDeep(menu!, deepActiveElement())).toBe(true);
  });

  it('Escape closes the menu and returns focus to the dropdown half', async () => {
    const {el, dropdown} = await setup(
      html`<obc-split-button .options=${options}></obc-split-button>`
    );
    const menu = await openMenu(el, dropdown);
    await nextTask();
    expect(containsDeep(menu, deepActiveElement())).toBe(true);

    await userEvent.keyboard('{Escape}');
    await el.updateComplete;
    await nextTask();

    expect(menuOf(el)).toBeNull();
    expect(containsDeep(dropdown, deepActiveElement())).toBe(true);
  });
});

describe('obc-split-button menu placement', () => {
  const rightAligned = (inner: TemplateResult) =>
    html`<div style="display: flex; justify-content: flex-end; width: 600px">
      ${inner}
    </div>`;

  it('starts the menu at the dropdown half by default', async () => {
    const {el, dropdown} = await setup(
      rightAligned(
        html`<obc-split-button .options=${options}></obc-split-button>`
      )
    );
    const menu = await openMenu(el, dropdown);

    const menuRect = menu.getBoundingClientRect();
    expect(menuRect.left).toBeCloseTo(dropdown.getBoundingClientRect().left, 0);
    expect(menuRect.top).toBeCloseTo(el.getBoundingClientRect().bottom, 0);
  });

  it('openLeft ends the menu at the right edge of the button', async () => {
    const {el, dropdown} = await setup(
      rightAligned(
        html`<obc-split-button .options=${options} openLeft></obc-split-button>`
      )
    );
    const menu = await openMenu(el, dropdown);

    const menuRect = menu.getBoundingClientRect();
    expect(menuRect.right).toBeCloseTo(el.getBoundingClientRect().right, 0);
    expect(menuRect.top).toBeCloseTo(el.getBoundingClientRect().bottom, 0);
  });

  it('openLeft and openTop combine', async () => {
    const {el, dropdown} = await setup(
      html`<div style="padding-top: 300px">
        ${rightAligned(
          html`<obc-split-button
            .options=${options}
            openLeft
            openTop
          ></obc-split-button>`
        )}
      </div>`
    );
    const menu = await openMenu(el, dropdown);

    const menuRect = menu.getBoundingClientRect();
    expect(menuRect.right).toBeCloseTo(el.getBoundingClientRect().right, 0);
    expect(menuRect.bottom).toBeCloseTo(el.getBoundingClientRect().top, 0);
  });
});
