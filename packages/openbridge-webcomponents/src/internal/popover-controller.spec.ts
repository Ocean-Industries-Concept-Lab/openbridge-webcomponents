import {userEvent} from '@vitest/browser/context';
import {afterEach, describe, expect, it} from 'vitest';
import '../components/brilliance-menu/brilliance-menu.js';
import type {ObcBrillianceMenu} from '../components/brilliance-menu/brilliance-menu.js';
import {bindPopoverTrigger} from './popover-controller.js';

/**
 * Driven through a real host rather than a fixture element: `lit labs gen`
 * wraps every module-scope LitElement subclass it finds, spec files included,
 * and the wrapper it emits for one (`tagName: 'undefined'`) fails the wrapper
 * packages' build.
 */

const cleanup: Array<() => void> = [];
afterEach(() => {
  while (cleanup.length) cleanup.pop()!();
});

/** The popover `toggle` event is queued, not dispatched synchronously. */
const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0));

let nextRow = 0;

async function fixture(softDismiss = true) {
  const top = nextRow;
  nextRow = (nextRow + 40) % 120;

  const root = document.createElement('div');
  root.style.cssText = `position:fixed;left:0;top:${top}px;z-index:1`;
  root.innerHTML = `
    <button id="trigger">trigger</button>
    <button id="outside">outside</button>
    <obc-brilliance-menu></obc-brilliance-menu>`;
  document.body.append(root);
  cleanup.push(() => root.remove());

  const panel = root.querySelector<ObcBrillianceMenu>('obc-brilliance-menu')!;
  // Clear of the buttons, so a real click lands where the test aims.
  panel.style.cssText = 'position:fixed;left:320px;top:320px';
  panel.softDismiss = softDismiss;
  await panel.updateComplete;

  return {
    panel,
    trigger: root.querySelector<HTMLButtonElement>('#trigger')!,
    outside: root.querySelector<HTMLButtonElement>('#outside')!,
  };
}

const isOpen = (el: Element) => el.matches(':popover-open');

async function show(panel: ObcBrillianceMenu) {
  panel.open = true;
  await panel.updateComplete;
  await nextTask();
}

describe('PopoverController', () => {
  it('leaves the host alone until softDismiss is set', async () => {
    const {panel} = await fixture(false);
    expect(panel.hasAttribute('popover')).toBe(false);
    expect(getComputedStyle(panel).display).not.toBe('none');
  });

  it('opting in makes the host a popover', async () => {
    const {panel} = await fixture();
    expect(panel.getAttribute('popover')).toBe('auto');
  });

  it('open shows and hides the popover', async () => {
    const {panel} = await fixture();

    await show(panel);
    expect(isOpen(panel)).toBe(true);

    panel.open = false;
    await panel.updateComplete;
    expect(isOpen(panel)).toBe(false);
  });

  it('opting back out restores the host to normal flow', async () => {
    const {panel} = await fixture();
    await show(panel);

    panel.softDismiss = false;
    await panel.updateComplete;

    expect(panel.hasAttribute('popover')).toBe(false);
    expect(getComputedStyle(panel).display).not.toBe('none');
  });

  it('a click outside closes it, writes open back and fires close', async () => {
    const {panel, outside} = await fixture();
    let closes = 0;
    panel.addEventListener('close', () => closes++);

    await show(panel);
    await userEvent.click(outside);
    await nextTask();

    expect(isOpen(panel)).toBe(false);
    expect(panel.open).toBe(false);
    expect(closes).toBe(1);
  });

  it('the dismissing click still reaches the element underneath', async () => {
    const {panel, outside} = await fixture();
    let clicks = 0;
    outside.addEventListener('click', () => clicks++);

    await show(panel);
    await userEvent.click(outside);
    await nextTask();

    expect(isOpen(panel)).toBe(false);
    // The whole point of light dismiss over a backdrop div: one click, not a
    // dead one (#1293).
    expect(clicks).toBe(1);
  });

  it('a click inside leaves it open', async () => {
    const {panel} = await fixture();
    await show(panel);

    await userEvent.click(panel);
    await nextTask();

    expect(isOpen(panel)).toBe(true);
    expect(panel.open).toBe(true);
  });

  it('Escape closes it and writes open back', async () => {
    const {panel} = await fixture();
    await show(panel);

    await userEvent.keyboard('{Escape}');
    await nextTask();

    expect(isOpen(panel)).toBe(false);
    expect(panel.open).toBe(false);
  });

  it('does not fire close when the consumer closes it', async () => {
    const {panel} = await fixture();
    let closes = 0;
    panel.addEventListener('close', () => closes++);

    await show(panel);
    panel.open = false;
    await panel.updateComplete;
    await nextTask();

    expect(closes).toBe(0);
  });

  it('opening a second panel closes the first', async () => {
    const first = await fixture();
    const second = await fixture();

    await show(first.panel);
    await show(second.panel);

    expect(isOpen(second.panel)).toBe(true);
    expect(isOpen(first.panel)).toBe(false);
    expect(first.panel.open).toBe(false);
  });

  it('survives a disconnect and reconnect while open', async () => {
    const {panel} = await fixture();
    const parent = panel.parentElement!;

    await show(panel);

    panel.remove();
    parent.append(panel);
    await panel.updateComplete;
    await nextTask();

    expect(isOpen(panel)).toBe(true);
  });
});

describe('bindPopoverTrigger', () => {
  it('a pointer click toggles the panel open and shut', async () => {
    const {panel, trigger} = await fixture();
    cleanup.push(bindPopoverTrigger(trigger, panel));

    await userEvent.click(trigger);
    await nextTask();
    expect(isOpen(panel)).toBe(true);

    // Without the guard this is the stuck-open case: light dismiss closes the
    // panel on pointerdown and a naive handler reopens it on click (#1293).
    await userEvent.click(trigger);
    await nextTask();
    expect(isOpen(panel)).toBe(false);

    await userEvent.click(trigger);
    await nextTask();
    expect(isOpen(panel)).toBe(true);
  });

  it('a keyboard activation toggles too', async () => {
    const {panel, trigger} = await fixture();
    cleanup.push(bindPopoverTrigger(trigger, panel));

    trigger.focus();
    await userEvent.keyboard('{Enter}');
    await nextTask();
    expect(isOpen(panel)).toBe(true);

    trigger.focus();
    await userEvent.keyboard('{Enter}');
    await nextTask();
    expect(isOpen(panel)).toBe(false);
  });

  it('reopens after a dismissing click elsewhere', async () => {
    const {panel, trigger, outside} = await fixture();
    cleanup.push(bindPopoverTrigger(trigger, panel));

    await userEvent.click(trigger);
    await nextTask();
    await userEvent.click(outside);
    await nextTask();
    expect(isOpen(panel)).toBe(false);

    await userEvent.click(trigger);
    await nextTask();
    expect(isOpen(panel)).toBe(true);
  });

  it('the disposer unbinds the trigger', async () => {
    const {panel, trigger} = await fixture();
    bindPopoverTrigger(trigger, panel)();

    await userEvent.click(trigger);
    await nextTask();
    expect(isOpen(panel)).toBe(false);
  });
});

describe('trigger-opened panel keeps its state', () => {
  it('survives an unrelated property change while open', async () => {
    const {panel, trigger} = await fixture();
    cleanup.push(bindPopoverTrigger(trigger, panel));

    await userEvent.click(trigger);
    await nextTask();
    expect(isOpen(panel)).toBe(true);

    // Any reactive property runs the controller's sync(); it must not read a
    // stale `open` and close a popover the trigger just opened.
    panel.brightness = 42;
    await panel.updateComplete;
    await nextTask();

    expect(isOpen(panel)).toBe(true);
    expect(panel.open).toBe(true);
  });

  it('survives a property change in the same task as the click', async () => {
    const {panel, trigger} = await fixture();
    cleanup.push(bindPopoverTrigger(trigger, panel));

    // No task boundary, so the queued `toggle` has not run yet and only the
    // synchronous write in bindPopoverTrigger can keep sync() honest.
    await userEvent.click(trigger);
    panel.brightness = 7;
    await panel.updateComplete;
    await nextTask();

    expect(isOpen(panel)).toBe(true);
    expect(panel.open).toBe(true);
  });

  it('mirrors a direct open in the same task as a property change', async () => {
    const {panel} = await fixture();

    // No task boundary, so the queued `toggle` has not run when the Lit
    // update's microtask reaches sync().
    panel.showPopover();
    panel.brightness = 3;
    await panel.updateComplete;
    await nextTask();

    expect(isOpen(panel)).toBe(true);
    expect(panel.open).toBe(true);
  });

  it('mirrors an open that nothing set `open` for', async () => {
    const {panel} = await fixture();

    // What a `popovertarget` invoker or a direct showPopover() call does.
    panel.showPopover();
    await nextTask();

    expect(panel.open).toBe(true);

    panel.brightness = 9;
    await panel.updateComplete;
    expect(isOpen(panel)).toBe(true);
  });
});
