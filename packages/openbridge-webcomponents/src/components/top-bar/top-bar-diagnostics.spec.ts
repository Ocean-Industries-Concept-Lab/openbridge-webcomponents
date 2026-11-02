import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './top-bar.js';
import type {ObcTopBar} from './top-bar.js';
import {tabStops} from '../../internal/_test-utils.js';

/**
 * The diagnostic button is consumer content, so the bar only has to place
 * it: after the alert area, before the dimming button, in every mode.
 */
async function setup(attrs: {settings?: boolean; inactive?: boolean} = {}) {
  const screen = render(
    html`<button id="before">before</button>
      <obc-top-bar
        appTitle="App"
        pageName="Page"
        showDimmingButton
        ?settings=${attrs.settings ?? false}
        ?inactive=${attrs.inactive ?? false}
      >
        <button slot="alerts" id="alert">alerts</button>
        <button slot="diagnostics" id="diagnostics">diagnostics</button>
      </obc-top-bar>`
  );
  const el = screen.container.querySelector('obc-top-bar') as ObcTopBar;
  await el.updateComplete;
  const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(
    'slot[name="diagnostics"]'
  );
  return {el, slot};
}

describe('obc-top-bar diagnostics slot', () => {
  it('sits after the alert area and before the dimming button', async () => {
    const {slot} = await setup();

    expect(slot!.assignedElements().map((e) => e.id)).toEqual(['diagnostics']);
    expect(slot!.previousElementSibling!.className).toBe('alert-container');
    expect(slot!.nextElementSibling!.classList.contains('dimming-button')).toBe(
      true
    );
  });

  it('is the tab stop after the alert area', async () => {
    await setup();
    (document.getElementById('alert') as HTMLElement).focus();

    const stops = await tabStops(1);

    expect(stops.map((e) => e?.id)).toEqual(['diagnostics']);
  });

  it('is rendered in settings and inactive modes', async () => {
    expect((await setup({settings: true})).slot).not.toBeNull();
    expect((await setup({inactive: true})).slot).not.toBeNull();
  });
});
