import {describe, it, expect, afterEach} from 'vitest';
import '../pump/pump.js';
import '../switch/switch.js';
import type {ObcPump} from '../pump/pump.js';
import type {ObcSwitch} from '../switch/switch.js';
import {AutomationButtonState} from './automation-button.js';

type Device = ObcPump | ObcSwitch;

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

async function mount(tag: string, configure: (el: Device) => void) {
  const el = document.createElement(tag) as Device;
  configure(el);
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  return el;
}

const state = (el: Device) =>
  (
    el.shadowRoot!.querySelector('obc-automation-button') as unknown as {
      state: AutomationButtonState;
    }
  ).state;

describe.each(['obc-pump', 'obc-switch'])('%s turnedOn', (tag) => {
  it('turns the device on', async () => {
    const el = await mount(tag, (e) => {
      e.turnedOn = true;
    });
    expect(state(el)).toBe(AutomationButtonState.open);
  });

  it('keeps the 1.x `on` attribute working on the first render', async () => {
    const el = await mount(tag, (e) => e.setAttribute('on', ''));
    expect(el.turnedOn).toBe(true);
    expect(state(el)).toBe(AutomationButtonState.open);
  });

  it('follows `on` when it is set or removed later', async () => {
    const el = await mount(tag, (e) => e.setAttribute('on', ''));
    el.removeAttribute('on');
    await el.updateComplete;
    expect(el.turnedOn).toBe(false);
    el.on = true;
    await el.updateComplete;
    expect(state(el)).toBe(AutomationButtonState.open);
  });

  // The generated Vue wrapper writes every prop's creation-time value back on
  // its second render; for `on` that value is undefined.
  it('leaves turnedOn alone when `on` is written back unset', async () => {
    const el = await mount(tag, (e) => {
      e.turnedOn = true;
    });
    el.on = undefined;
    await el.updateComplete;
    expect(el.turnedOn).toBe(true);
    expect(state(el)).toBe(AutomationButtonState.open);
  });
});
