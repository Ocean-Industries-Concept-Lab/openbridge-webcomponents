import {userEvent} from '@vitest/browser/context';
import {afterEach, describe, expect, it} from 'vitest';
import './context-menu-input.js';
import type {ObcContextMenuInput} from './context-menu-input.js';

const cleanup: Array<() => void> = [];
afterEach(() => {
  while (cleanup.length) cleanup.pop()!();
});

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0));

async function mount() {
  const root = document.createElement('div');
  document.body.append(root);
  cleanup.push(() => root.remove());

  const menu = document.createElement(
    'obc-context-menu-input'
  ) as ObcContextMenuInput;
  menu.options = [
    {value: 'a', label: 'Alpha'},
    {value: 'b', label: 'Bravo'},
  ];
  menu.softDismiss = true;
  root.append(menu);
  await menu.updateComplete;

  menu.open = true;
  await menu.updateComplete;
  await nextTask();
  return menu;
}

describe('obc-context-menu-input under softDismiss', () => {
  it('Escape closes it when a menu item has focus', async () => {
    const menu = await mount();
    let closes = 0;
    menu.addEventListener('close', () => closes++);

    // The component's own keydown handler returns early with no options, so
    // an empty menu never reaches its Escape branch.
    menu.focusFirstItem();
    await nextTask();

    await userEvent.keyboard('{Escape}');
    await nextTask();

    expect(menu.matches(':popover-open')).toBe(false);
    expect(menu.open).toBe(false);
    expect(closes).toBe(1);
  });
});
