import {describe, expect, it} from 'vitest';
import './alert-icon.js';
import {ObcAlertIcon} from './alert-icon.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import {AlertType} from '../../types.js';

describe('obc-alert-icon blinking lifecycle', () => {
  async function setup(acknowledged = false) {
    const screen = render(
      html`<obc-alert-icon
        .alertType=${AlertType.Alarm}
        .acknowledged=${acknowledged}
      ></obc-alert-icon>`
    );
    const el = screen.baseElement.querySelector(
      'obc-alert-icon'
    ) as ObcAlertIcon;
    await el.updateComplete;
    return el;
  }

  function wrapperAnimations(el: ObcAlertIcon) {
    return el.getAnimations();
  }

  it('blinks for an unacknowledged blinking alert type', async () => {
    const el = await setup();

    expect(wrapperAnimations(el).length).toBeGreaterThan(0);
  });

  it('does not blink once acknowledged', async () => {
    const el = await setup(true);

    expect(wrapperAnimations(el)).toHaveLength(0);
  });

  it('stops blinking when the alert is acknowledged', async () => {
    const el = await setup();
    expect(wrapperAnimations(el).length).toBeGreaterThan(0);

    el.acknowledged = true;
    await el.updateComplete;

    expect(wrapperAnimations(el)).toHaveLength(0);
  });

  it('resumes blinking after disconnect and reconnect', async () => {
    const el = await setup();
    const parent = el.parentElement!;
    const initial = wrapperAnimations(el).length;
    expect(initial).toBeGreaterThan(0);

    parent.removeChild(el);
    expect(wrapperAnimations(el)).toHaveLength(0);

    // Reconnect without touching any property, so no Lit update is scheduled.
    parent.appendChild(el);
    await el.updateComplete;

    expect(wrapperAnimations(el)).toHaveLength(initial);
  });

  it('does not accumulate animations across repeated updates', async () => {
    const el = await setup();
    const initial = wrapperAnimations(el).length;

    el.active = true;
    await el.updateComplete;
    el.silenced = true;
    await el.updateComplete;

    expect(wrapperAnimations(el)).toHaveLength(initial);
  });
});
