import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html, nothing} from 'lit';
import './diagnostic-button.js';
import type {ObcDiagnosticButton} from './diagnostic-button.js';
import type {ObcAlertButtonItem} from '../alert-button-item/alert-button-item.js';

async function setup(nAlerts = 3, activated = false, ariaLabel?: string) {
  const screen = render(
    html`<obc-diagnostic-button
      .nAlerts=${nAlerts}
      .activated=${activated}
      aria-label=${ariaLabel ?? nothing}
    ></obc-diagnostic-button>`
  );
  const el = screen.container.querySelector(
    'obc-diagnostic-button'
  ) as ObcDiagnosticButton;
  await el.updateComplete;
  const item = el.shadowRoot!.querySelector(
    'obc-alert-button-item'
  ) as ObcAlertButtonItem;
  await item.updateComplete;
  return {el, item, button: item.shadowRoot!.querySelector('button')!};
}

describe('obc-diagnostic-button', () => {
  it('forwards the count and the activated state to its item', async () => {
    const {item} = await setup(3, true);

    expect([item.nAlerts, item.counter, item.activated]).toEqual([
      3,
      true,
      true,
    ]);
  });

  it('draws the asterisk in the icon slot', async () => {
    const {item} = await setup();
    const slot =
      item.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')!;

    expect(slot.assignedElements().map((e) => e.tagName)).toEqual([
      'OBI-DIAGNOSTIC-BADGE',
    ]);
  });

  it('names itself after the count', async () => {
    expect((await setup(3)).button.getAttribute('aria-label')).toBe(
      'Diagnostics, 3'
    );
    expect((await setup(0)).button.getAttribute('aria-label')).toBe(
      'Diagnostics'
    );
    expect(
      (await setup(3, false, 'Health')).button.getAttribute('aria-label')
    ).toBe('Health');
  });

  it('forwards aria-expanded to its button, absent until set', async () => {
    const {el, item, button} = await setup();
    expect(button.hasAttribute('aria-expanded')).toBe(false);

    el.setAttribute('aria-expanded', 'true');
    await el.updateComplete;
    await item.updateComplete;

    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('reports a click', async () => {
    const {el, button} = await setup();
    let clicks = 0;
    el.addEventListener('click', () => clicks++);

    button.click();

    expect(clicks).toBe(1);
  });
});
