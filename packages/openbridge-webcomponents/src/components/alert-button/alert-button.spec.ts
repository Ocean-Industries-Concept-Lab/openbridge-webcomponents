import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html, type TemplateResult} from 'lit';
import './alert-button.js';
import {ObcAlertButton, ObcAlertButtonType} from './alert-button.js';
import type {ObcAlertButtonItem} from '../alert-button-item/alert-button-item.js';
import {AlertType, FlashingSpeed} from '../../types.js';

async function setup(
  template: TemplateResult = html`<obc-alert-button
    .nAlerts=${3}
    .alertType=${AlertType.Alarm}
    counter
    blinking
  ></obc-alert-button>`
) {
  const screen = render(template);
  const el = screen.container.querySelector(
    'obc-alert-button'
  ) as ObcAlertButton;
  await el.updateComplete;
  const item = el.shadowRoot!.querySelector(
    'obc-alert-button-item'
  ) as ObcAlertButtonItem;
  await item.updateComplete;
  return {el, item};
}

describe('obc-alert-button', () => {
  it('forwards the alert state to its item', async () => {
    const {item} = await setup(
      html`<obc-alert-button
        .nAlerts=${3}
        .alertType=${AlertType.Warning}
        .type=${ObcAlertButtonType.Enhanced}
        .flashingSpeed=${FlashingSpeed.Slow}
        counter
        blinking
        large
      ></obc-alert-button>`
    );

    expect([
      item.type,
      item.alertType,
      item.nAlerts,
      item.counter,
      item.blinking,
      item.flashingSpeed,
      item.fillHeight,
    ]).toEqual([
      ObcAlertButtonType.Enhanced,
      AlertType.Warning,
      3,
      true,
      true,
      FlashingSpeed.Slow,
      true,
    ]);
  });

  it('passes the flat breakpoint on as the item type', async () => {
    const {item} = await setup(
      html`<obc-alert-button
        .nAlerts=${3}
        .flatMaxBreakpointPx=${window.innerWidth + 1}
      ></obc-alert-button>`
    );

    expect(item.type).toBe(ObcAlertButtonType.Flat);
  });

  it('flashes through its item', async () => {
    const {el, item} = await setup();
    expect(item.getAnimations()).toHaveLength(1);
    expect(el.getAnimations()).toHaveLength(0);

    el.blinking = false;
    await el.updateComplete;
    await item.updateComplete;

    expect(item.getAnimations()).toHaveLength(0);
  });

  it('joins the item to the silence button', async () => {
    const {el, item} = await setup(
      html`<obc-alert-button
        .nAlerts=${3}
        showSilenceButton
      ></obc-alert-button>`
    );
    expect(item.hasAttribute('data-group-item-not-last')).toBe(true);

    el.showSilenceButton = false;
    await el.updateComplete;

    expect(item.hasAttribute('data-group-item-not-last')).toBe(false);
  });

  it('fires click-alert when the item is clicked', async () => {
    const {el, item} = await setup();
    let fired = 0;
    el.addEventListener('click-alert', () => fired++);

    item.shadowRoot!.querySelector('button')!.click();

    expect(fired).toBe(1);
  });

  it('names the silence button', async () => {
    const {el} = await setup(
      html`<obc-alert-button
        .nAlerts=${3}
        showSilenceButton
      ></obc-alert-button>`
    );

    expect(
      el
        .shadowRoot!.querySelector('.silence-button')!
        .getAttribute('aria-label')
    ).toBe('Silence');
  });
});
