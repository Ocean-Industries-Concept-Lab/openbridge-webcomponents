import {afterEach, describe, expect, it} from 'vitest';
import './norvar-boiler.js';
import {
  ObcNorvarBoiler,
  NorvarStationState,
  NorvarSymbolVariant,
  NorvarBoilerFuel,
} from './norvar-boiler.js';

describe('norvar-boiler', () => {
  let symbol: ObcNorvarBoiler;
  afterEach(() => symbol.remove());

  async function mount(props: Partial<ObcNorvarBoiler>) {
    symbol = document.createElement('norvar-boiler');
    Object.assign(symbol, props);
    document.body.append(symbol);
    await symbol.updateComplete;
    return symbol.shadowRoot!;
  }

  const icon = (root: ShadowRoot) =>
    root.querySelector('svg[slot="icon"]')!.innerHTML;
  const button = (root: ShadowRoot) =>
    root.querySelector('obc-automation-button')!;

  it.each(Object.values(NorvarBoilerFuel))(
    'draws %s differently per variant',
    async (fuel) => {
      const flat = icon(await mount({fuel}));
      symbol.remove();
      const button = icon(
        await mount({fuel, variant: NorvarSymbolVariant.regular})
      );
      expect(flat).not.toEqual(button);
    }
  );

  it('draws every fuel differently', async () => {
    const drawings = new Set<string>();
    for (const fuel of Object.values(NorvarBoilerFuel)) {
      drawings.add(icon(await mount({fuel})));
      symbol.remove();
    }
    symbol = document.createElement('norvar-boiler');
    expect(drawings.size).toBe(Object.values(NorvarBoilerFuel).length);
  });

  it('is flat by default and square as a button', async () => {
    expect(button(await mount({})).variant).toBe('flat');
    symbol.remove();
    expect(
      button(await mount({variant: NorvarSymbolVariant.regular})).variant
    ).toBe('square');
  });

  it('has a name while no tag is visible', async () => {
    expect(button(await mount({})).accessibleName).toBe('NORVAR boiler');
  });

  it.each([
    [{}, '--on-line-color'],
    [{state: NorvarStationState.running}, '--alert-running-color'],
    [
      {state: NorvarStationState.unmonitored},
      '--automation-symbol-static-line-color',
    ],
    [{alert: true}, '--alert-alarm-color'],
  ])('colours the symbol for %o', async (props, color) => {
    expect(icon(await mount(props))).toContain(color);
  });

  it('greys the button while unmonitored', async () => {
    const root = await mount({state: NorvarStationState.unmonitored});
    expect(button(root).static).toBe(true);
  });
});
