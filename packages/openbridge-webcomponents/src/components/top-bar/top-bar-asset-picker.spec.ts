import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './top-bar.js';
import type {ObcTopBar} from './top-bar.js';
import {tabStops} from '../../internal/_test-utils.js';

/**
 * The picker is consumer content, so the bar only has to place it: after the
 * page name, before the command button, and not at all in settings mode.
 */
async function setup(settings = false) {
  const screen = render(
    html`<button id="before">before</button>
      <obc-top-bar appTitle="App" pageName="Page" ?settings=${settings}>
        <button slot="asset-picker" id="picker">Merd B</button>
        <button slot="command-button" id="command">command</button>
      </obc-top-bar>`
  );
  const el = screen.container.querySelector('obc-top-bar') as ObcTopBar;
  await el.updateComplete;
  const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(
    'slot[name="asset-picker"]'
  );
  return {el, slot};
}

describe('obc-top-bar asset-picker slot', () => {
  it('sits between the page name and the command button', async () => {
    const {slot} = await setup();

    expect(slot!.assignedElements().map((e) => e.id)).toEqual(['picker']);
    expect(slot!.previousElementSibling!.className).toBe('page-name');
    expect((slot!.nextElementSibling as HTMLSlotElement).name).toBe(
      'command-button'
    );
  });

  it('is the tab stop after the menu button', async () => {
    await setup();
    (document.getElementById('before') as HTMLElement).focus();

    const stops = await tabStops(3);

    expect(stops.map((e) => e?.id)).toEqual(['', 'picker', 'command']);
  });

  it('is not rendered in settings mode', async () => {
    const {slot} = await setup(true);

    expect(slot).toBeNull();
  });
});
