import {afterEach, describe, expect, it} from 'vitest';
import './norvar-map-symbol.js';
import {
  ObcNorvarMapSymbol,
  NorvarMapSymbolType,
  NorvarMapSymbolVariant,
  NorvarStationState,
} from './norvar-map-symbol.js';

describe('norvar-map-symbol', () => {
  let symbol: ObcNorvarMapSymbol;
  afterEach(() => symbol.remove());

  async function mount(props: Partial<ObcNorvarMapSymbol>) {
    symbol = document.createElement('norvar-map-symbol');
    Object.assign(symbol, props);
    document.body.append(symbol);
    await symbol.updateComplete;
    return symbol.shadowRoot!;
  }

  it.each(Object.values(NorvarMapSymbolType))(
    'draws %s differently per variant',
    async (symbolType) => {
      const flat = (await mount({symbolType})).querySelector(
        'svg[slot="icon"]'
      )!.innerHTML;
      symbol.remove();
      const button = (
        await mount({symbolType, variant: NorvarMapSymbolVariant.regular})
      ).querySelector('svg[slot="icon"]')!.innerHTML;
      expect(flat).not.toEqual(button);
    }
  );

  it.each([
    [NorvarMapSymbolType.culvertWithGrate, 'square'],
    [NorvarMapSymbolType.culvert, 'square'],
    [NorvarMapSymbolType.precipitationStation, 'square'],
    [NorvarMapSymbolType.watercourseMeteringStation, 'square'],
    [NorvarMapSymbolType.discharge, 'regular'],
  ])('puts %s in a %s button', async (symbolType, variant) => {
    const root = await mount({
      symbolType,
      variant: NorvarMapSymbolVariant.regular,
    });
    expect(root.querySelector('obc-automation-button')!.variant).toBe(variant);
  });

  it('keeps the flat variant for every symbol', async () => {
    const root = await mount({symbolType: NorvarMapSymbolType.discharge});
    expect(root.querySelector('obc-automation-button')!.variant).toBe('flat');
  });

  it('has a name while no tag is visible', async () => {
    const root = await mount({});
    expect(root.querySelector('obc-automation-button')!.accessibleName).toBe(
      'NORVAR map symbol'
    );
  });

  it.each([
    [{}, '--automation-symbol-on-line-color'],
    [
      {state: NorvarStationState.running},
      '--automation-symbol-running-border-color',
    ],
    [
      {state: NorvarStationState.unmonitored},
      '--automation-symbol-static-line-color',
    ],
    [{alert: true}, '--alert-alarm-color'],
  ])('colours the symbol for %o', async (props, color) => {
    const root = await mount(props);
    expect(root.querySelector('svg[slot="icon"]')!.innerHTML).toContain(color);
  });

  it('greys the button while unmonitored', async () => {
    const root = await mount({state: NorvarStationState.unmonitored});
    expect(root.querySelector('obc-automation-button')!.static).toBe(true);
  });
});
