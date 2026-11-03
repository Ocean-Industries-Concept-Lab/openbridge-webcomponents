import {afterEach, describe, expect, it} from 'vitest';
import './norvar-valve.js';
import {ObcNorvarValve, NorvarValveActuator} from './norvar-valve.js';

const RUNNING = '--automation-symbol-running-background-color';
const CAUTION = '--alert-caution-color';
const ALARM = '--alert-alarm-color';

describe('norvar-valve', () => {
  let valve: ObcNorvarValve;
  afterEach(() => valve.remove());

  async function mount(props: Partial<ObcNorvarValve>) {
    valve = document.createElement('norvar-valve');
    Object.assign(valve, props);
    document.body.append(valve);
    await valve.updateComplete;
    return valve.shadowRoot!;
  }

  function symbol(root: ShadowRoot): string {
    return root.querySelector('svg[slot="icon"]')!.innerHTML;
  }

  it('fills the middle field of an open valve only', async () => {
    expect(symbol(await mount({open: true}))).toContain(RUNNING);
    valve.remove();
    expect(symbol(await mount({open: false}))).not.toContain(RUNNING);
  });

  it('shows the middle position while in progress, also on an open valve', async () => {
    const drawn = symbol(await mount({open: true, progress: true}));
    expect(drawn).toContain(CAUTION);
    expect(drawn).not.toContain(RUNNING);
  });

  it.each([
    {open: false, progress: false, mark: null},
    {open: true, progress: false, mark: RUNNING},
    {open: false, progress: true, mark: CAUTION},
  ])('keeps the position visible in alarm: %o', async ({mark, ...props}) => {
    const drawn = symbol(await mount({...props, alert: true}));
    expect(drawn).toContain(ALARM);
    if (mark) {
      expect(drawn).toContain(mark);
    }
  });

  it('draws no state colours on a static valve', async () => {
    const drawn = symbol(await mount({open: true, alert: true, static: true}));
    expect(drawn).not.toContain(RUNNING);
    expect(drawn).not.toContain(ALARM);
  });

  it('has no handle without an actuator', async () => {
    const root = await mount({actuator: NorvarValveActuator.none});
    expect(root.querySelector('[slot="handle"]')).toBeNull();
  });

  it('draws the handle of a chosen actuator', async () => {
    const root = await mount({actuator: NorvarValveActuator.solenoid});
    expect(root.querySelector('svg[slot="handle"]')).not.toBeNull();
  });
});
