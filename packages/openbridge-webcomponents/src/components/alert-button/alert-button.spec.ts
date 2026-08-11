import {describe, expect, it} from 'vitest';
import './alert-button.js';
import {ObcAlertButton} from './alert-button.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-alert-button blinking lifecycle', () => {
  async function setup() {
    const screen = render(html`<obc-alert-button></obc-alert-button>`);
    const el = screen.baseElement.querySelector(
      'obc-alert-button'
    ) as ObcAlertButton;
    await el.updateComplete;
    return el;
  }

  it('installs the blink animations on first render', async () => {
    const el = await setup();

    expect(el.getAnimations().length).toBeGreaterThan(0);
  });

  it('cancels the blink animations on disconnect', async () => {
    const el = await setup();

    el.parentElement!.removeChild(el);

    expect(el.getAnimations()).toHaveLength(0);
  });

  it('resumes blinking after disconnect and reconnect', async () => {
    const el = await setup();
    const parent = el.parentElement!;
    const initial = el.getAnimations().length;

    parent.removeChild(el);
    expect(el.getAnimations()).toHaveLength(0);

    // Reconnect without touching any property. firstUpdated() will not run
    // again, so this only passes if blinking is reinstalled on update.
    parent.appendChild(el);
    await el.updateComplete;

    expect(el.getAnimations()).toHaveLength(initial);
  });

  it('does not accumulate animations across repeated updates', async () => {
    const el = await setup();
    const initial = el.getAnimations().length;

    el.nAlerts = 3;
    await el.updateComplete;
    el.nAlerts = 5;
    await el.updateComplete;

    expect(el.getAnimations()).toHaveLength(initial);
  });
});
