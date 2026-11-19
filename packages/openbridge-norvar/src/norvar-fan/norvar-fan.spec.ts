import {afterEach, describe, expect, it} from 'vitest';
import './norvar-fan.js';
import {
  ObcNorvarFan,
  MotorizedVariant,
  NorvarAvailability,
} from './norvar-fan.js';

describe('norvar-fan', () => {
  let device: ObcNorvarFan;
  afterEach(() => device.remove());

  async function mount(props: Partial<ObcNorvarFan>) {
    device = document.createElement('norvar-fan');
    Object.assign(device, props);
    document.body.append(device);
    await device.updateComplete;
    return device.shadowRoot!;
  }

  const icon = (root: ShadowRoot) =>
    root.querySelector('svg[slot="icon"]')!.innerHTML;
  const button = (root: ShadowRoot) =>
    root.querySelector('obc-automation-button')!;

  it('is flat by default and round as a button', async () => {
    expect(button(await mount({})).variant).toBe('flat');
    device.remove();
    expect(
      button(await mount({variant: MotorizedVariant.regular})).variant
    ).toBe('regular');
  });

  it('changes shape when it starts', async () => {
    const stopped = icon(await mount({}));
    device.remove();
    const running = icon(await mount({turnedOn: true}));
    expect(running).not.toEqual(stopped);
  });

  it.each([
    [{turnedOn: true}, '--automation-symbol-running-background-color', true],
    [{}, '--automation-symbol-off-background-color', false],
    [
      {turnedOn: true, availability: NorvarAvailability.disabled},
      '--automation-symbol-static-background-color',
      false,
    ],
    [{turnedOn: true, alert: true}, '--alert-alarm-color', true],
    [{alert: true}, '--alert-alarm-color', false],
  ])('colours %o and sets the on button to %s', async (props, color, on) => {
    const root = await mount(props);
    expect(icon(root)).toContain(color);
    expect(button(root).state).toBe(on ? 'open' : 'closed');
  });

  it('stands still while disabled, whatever turnedOn says', async () => {
    const stopped = icon(
      await mount({availability: NorvarAvailability.disabled})
    );
    device.remove();
    const disabledRunning = icon(
      await mount({turnedOn: true, availability: NorvarAvailability.disabled})
    );
    expect(disabledRunning).toEqual(stopped);
  });

  it('crosses the symbol out while the safety switch is off', async () => {
    const disabled = icon(
      await mount({availability: NorvarAvailability.disabled})
    );
    device.remove();
    const safetyOff = icon(
      await mount({availability: NorvarAvailability.safetyOff})
    );
    expect(safetyOff.match(/<path/g)!.length).toBe(
      disabled.match(/<path/g)!.length + 1
    );
  });

  it('names the availability in the readout', async () => {
    const root = await mount({
      tag: '#1',
      availability: NorvarAvailability.safetyOff,
    });
    expect(JSON.stringify(button(root).readouts)).toContain('Not ready');
  });

  it('has a name while no tag is visible', async () => {
    expect(button(await mount({})).accessibleName).toBe('NORVAR fan');
  });
});
