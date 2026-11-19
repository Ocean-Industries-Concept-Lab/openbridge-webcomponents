import {afterEach, describe, expect, it} from 'vitest';
import './norvar-heat-exchanger.js';
import {
  ObcNorvarHeatExchanger,
  NorvarStationState,
  NorvarSymbolVariant,
  NorvarHeatExchangerType,
} from './norvar-heat-exchanger.js';

describe('norvar-heat-exchanger', () => {
  let symbol: ObcNorvarHeatExchanger;
  afterEach(() => symbol.remove());

  async function mount(props: Partial<ObcNorvarHeatExchanger>) {
    symbol = document.createElement('norvar-heat-exchanger');
    Object.assign(symbol, props);
    document.body.append(symbol);
    await symbol.updateComplete;
    return symbol.shadowRoot!;
  }

  const icon = (root: ShadowRoot) =>
    root.querySelector('svg[slot="icon"]')!.innerHTML;
  const button = (root: ShadowRoot) =>
    root.querySelector('obc-automation-button')!;

  it.each(Object.values(NorvarHeatExchangerType))(
    'draws %s differently per variant',
    async (heatExchangerType) => {
      const flat = icon(await mount({heatExchangerType}));
      symbol.remove();
      const button = icon(
        await mount({heatExchangerType, variant: NorvarSymbolVariant.regular})
      );
      expect(flat).not.toEqual(button);
    }
  );

  it('draws every heatExchangerType differently', async () => {
    const drawings = new Set<string>();
    for (const heatExchangerType of Object.values(NorvarHeatExchangerType)) {
      drawings.add(icon(await mount({heatExchangerType})));
      symbol.remove();
    }
    symbol = document.createElement('norvar-heat-exchanger');
    expect(drawings.size).toBe(Object.values(NorvarHeatExchangerType).length);
  });

  it('is flat by default and square as a button', async () => {
    expect(button(await mount({})).variant).toBe('flat');
    symbol.remove();
    expect(
      button(await mount({variant: NorvarSymbolVariant.regular})).variant
    ).toBe('square');
  });

  it('has a name while no tag is visible', async () => {
    expect(button(await mount({})).accessibleName).toBe(
      'NORVAR heat exchanger'
    );
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
