import {afterEach, describe, expect, it} from 'vitest';
import './norvar-air-filter.js';
import {
  ObcNorvarAirFilter,
  NorvarStationState,
  NorvarSymbolVariant,
} from './norvar-air-filter.js';

describe('norvar-air-filter', () => {
  let symbol: ObcNorvarAirFilter;
  afterEach(() => symbol.remove());

  async function mount(props: Partial<ObcNorvarAirFilter>) {
    symbol = document.createElement('norvar-air-filter');
    Object.assign(symbol, props);
    document.body.append(symbol);
    await symbol.updateComplete;
    return symbol.shadowRoot!;
  }

  const icon = (root: ShadowRoot) =>
    root.querySelector('svg[slot="icon"]')!.innerHTML;
  const button = (root: ShadowRoot) =>
    root.querySelector('obc-automation-button')!;

  it('draws differently per variant', async () => {
    const flat = icon(await mount({}));
    symbol.remove();
    const button = icon(await mount({variant: NorvarSymbolVariant.regular}));
    expect(flat).not.toEqual(button);
  });

  it('is flat by default and square as a button', async () => {
    expect(button(await mount({})).variant).toBe('flat');
    symbol.remove();
    expect(
      button(await mount({variant: NorvarSymbolVariant.regular})).variant
    ).toBe('square');
  });

  it('has a name while no tag is visible', async () => {
    expect(button(await mount({})).accessibleName).toBe('NORVAR air filter');
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
