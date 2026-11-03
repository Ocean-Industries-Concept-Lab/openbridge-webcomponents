import {afterEach, describe, expect, it} from 'vitest';
import './electricity-battery.js';
import type {ObcElectricityBattery} from './electricity-battery.js';
import type {ObcAutomationButton} from '../automation-button/automation-button.js';

async function mount(props: Partial<ObcElectricityBattery>) {
  const battery = document.createElement('obc-electricity-battery');
  Object.assign(battery, props);
  document.body.append(battery);
  await battery.updateComplete;
  const inner = battery.shadowRoot!.querySelector(
    'obc-automation-button'
  ) as ObcAutomationButton;
  await inner.updateComplete;
  return {battery, button: inner.shadowRoot!.querySelector('button')!};
}

describe('electricity battery accessible name', () => {
  let battery: ObcElectricityBattery | undefined;
  afterEach(() => battery?.remove());

  it('leaves the name to the visible tag and state row', async () => {
    const mounted = await mount({tag: '#0012'});
    battery = mounted.battery;
    expect(mounted.button.hasAttribute('aria-label')).toBe(false);
  });

  it('names the button when the readout is hidden', async () => {
    const mounted = await mount({tag: '#0012', showReadoutStack: false});
    battery = mounted.battery;
    expect(mounted.button.getAttribute('aria-label')).toBe('Battery');
  });

  it('names the button and its state with only the state row', async () => {
    const on = await mount({tag: null, turnedOn: true});
    battery = on.battery;
    expect(on.button.getAttribute('aria-label')).toBe('Battery On');
    battery.remove();
    const off = await mount({tag: null, turnedOn: false});
    battery = off.battery;
    expect(off.button.getAttribute('aria-label')).toBe('Battery Off');
  });

  it('names the button without a tag or state row', async () => {
    const mounted = await mount({tag: null, showStatus: false});
    battery = mounted.battery;
    expect(mounted.button.getAttribute('aria-label')).toBe('Battery');
  });
});
