import {afterEach, describe, expect, it} from 'vitest';
import './norvar-damper.js';
import {
  ObcNorvarDamper,
  NorvarStationState,
  NorvarSymbolVariant,
} from './norvar-damper.js';

describe('norvar-damper', () => {
  let damper: ObcNorvarDamper;
  afterEach(() => damper.remove());

  async function mount(props: Partial<ObcNorvarDamper>) {
    damper = document.createElement('norvar-damper');
    Object.assign(damper, props);
    document.body.append(damper);
    await damper.updateComplete;
    return damper.shadowRoot!;
  }

  const icon = (root: ShadowRoot) =>
    root.querySelector('svg[slot="icon"]')!.innerHTML;
  const button = (root: ShadowRoot) =>
    root.querySelector('obc-automation-button')!;

  it.each([
    [{open: true}, 'M12 5L12 19'],
    [{open: false}, 'M19 12L5 12'],
    [{regulating: true, open: true}, 'M16.9462 7.05168L7.04672 16.9512'],
    [{progress: true}, 'M16.9462 7.05168L7.04672 16.9512'],
  ])('draws the blade for %o', async (props, blade) => {
    expect(icon(await mount(props))).toContain(blade);
  });

  it('is flat by default and square as a button', async () => {
    expect(button(await mount({})).variant).toBe('flat');
    damper.remove();
    expect(
      button(await mount({variant: NorvarSymbolVariant.regular})).variant
    ).toBe('square');
  });

  it.each([
    [{open: true}, 'Open'],
    [{open: false}, 'Closed'],
  ])('reads out %o as %s', async (props, value) => {
    const root = await mount(props);
    expect(JSON.stringify(button(root).readouts)).toContain(value);
  });

  it('has no position readout while regulating', async () => {
    const root = await mount({regulating: true});
    expect(JSON.stringify(button(root).readouts)).not.toMatch(/Open|Closed/);
  });

  it('colours the symbol for its state', async () => {
    expect(icon(await mount({state: NorvarStationState.running}))).toContain(
      '--alert-running-color'
    );
  });

  it('has a name while no tag is visible', async () => {
    expect(button(await mount({})).accessibleName).toBe('NORVAR damper');
  });
});
