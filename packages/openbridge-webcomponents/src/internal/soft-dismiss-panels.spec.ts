import {userEvent} from '@vitest/browser/context';
import {afterEach, describe, expect, it} from 'vitest';
import '../components/alert-menu/alert-menu.js';
import '../components/app-menu/app-menu.js';
import '../components/brilliance-menu/brilliance-menu.js';
import '../components/command-menu/command-menu.js';
import '../components/system-menu/system-menu.js';
import '../components/user-menu/user-menu.js';
import type {SoftDismissHost} from './popover-controller.js';

/**
 * The panels the top bar opens. They share no base class, so the only thing
 * keeping them in step is this spec (#1293).
 */
const PANELS = [
  'obc-alert-menu',
  'obc-app-menu',
  'obc-brilliance-menu',
  'obc-command-menu',
  'obc-system-menu',
  'obc-user-menu',
] as const;

const cleanup: Array<() => void> = [];
afterEach(() => {
  while (cleanup.length) cleanup.pop()!();
});

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0));

async function mount(tag: string) {
  const root = document.createElement('div');
  root.innerHTML = `<button id="outside">outside</button><${tag}></${tag}>`;
  document.body.append(root);
  cleanup.push(() => root.remove());

  // The panel is in the top layer once open, so the button it is clicked away
  // from has to sit somewhere the panel does not cover.
  const outside = root.querySelector<HTMLButtonElement>('#outside')!;
  outside.style.cssText = 'position:fixed;left:4px;top:4px;z-index:1';

  const panel = root.querySelector(tag) as SoftDismissHost;
  panel.style.cssText = 'position:fixed;left:300px;top:300px';
  await panel.updateComplete;
  return {panel, outside};
}

describe.each(PANELS)('%s soft dismiss', (tag) => {
  it('is untouched until it opts in', async () => {
    const {panel} = await mount(tag);
    expect(panel.hasAttribute('popover')).toBe(false);
    expect(getComputedStyle(panel).display).not.toBe('none');
  });

  it('opting in carries popover="auto" and open shows it', async () => {
    const {panel} = await mount(tag);

    panel.softDismiss = true;
    await panel.updateComplete;
    expect(panel.getAttribute('popover')).toBe('auto');

    panel.open = true;
    await panel.updateComplete;
    await nextTask();
    expect(panel.matches(':popover-open')).toBe(true);
  });

  it('the UA popover chrome is reset away', async () => {
    const {panel} = await mount(tag);
    panel.softDismiss = true;
    panel.open = true;
    await panel.updateComplete;
    await nextTask();

    // Without the reset the UA sheet paints a border, padding and a Canvas
    // background around the panel.
    const style = getComputedStyle(panel);
    expect(style.borderTopWidth).toBe('0px');
    expect(style.paddingTop).toBe('0px');
    expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('the consumer keeps control of where it sits', async () => {
    const {panel} = await mount(tag);
    panel.softDismiss = true;
    panel.open = true;
    await panel.updateComplete;
    await nextTask();

    // The UA `inset: 0; margin: auto` would centre it; the reset leaves the
    // consumer's own offsets — set in `mount` — in charge.
    const rect = panel.getBoundingClientRect();
    expect(Math.round(rect.left)).toBe(300);
    expect(Math.round(rect.top)).toBe(300);
  });

  it('a click outside closes it and reports it', async () => {
    const {panel, outside} = await mount(tag);
    let closes = 0;
    panel.addEventListener('close', () => closes++);

    panel.softDismiss = true;
    panel.open = true;
    await panel.updateComplete;
    await nextTask();

    await userEvent.click(outside);
    await nextTask();

    expect(panel.matches(':popover-open')).toBe(false);
    expect(panel.open).toBe(false);
    expect(closes).toBe(1);
  });

  it('Escape closes it', async () => {
    const {panel} = await mount(tag);
    panel.softDismiss = true;
    panel.open = true;
    await panel.updateComplete;
    await nextTask();

    await userEvent.keyboard('{Escape}');
    await nextTask();

    expect(panel.open).toBe(false);
  });
});
