import {afterEach, describe, expect, it} from 'vitest';
import './norvar-water-station.js';
import {
  ObcNorvarWaterStation,
  NorvarWaterStationType,
  NorvarWaterStationVariant,
  NorvarStationState,
} from './norvar-water-station.js';

describe('norvar-water-station', () => {
  let station: ObcNorvarWaterStation;
  afterEach(() => station.remove());

  async function mount(props: Partial<ObcNorvarWaterStation>) {
    station = document.createElement('norvar-water-station');
    Object.assign(station, props);
    document.body.append(station);
    await station.updateComplete;
    return station.shadowRoot!;
  }

  it.each(Object.values(NorvarWaterStationType))(
    'draws %s differently per variant',
    async (stationType) => {
      const flat = (await mount({stationType})).querySelector(
        'svg[slot="icon"]'
      )!.innerHTML;
      station.remove();
      const button = (
        await mount({stationType, variant: NorvarWaterStationVariant.square})
      ).querySelector('svg[slot="icon"]')!.innerHTML;
      expect(flat).not.toEqual(button);
    }
  );

  it('draws a silhouette on the flat variant only', async () => {
    const flat = await mount({});
    expect(flat.querySelector('svg[slot="icon-silhouette"]')).not.toBeNull();
    station.remove();
    const button = await mount({variant: NorvarWaterStationVariant.square});
    expect(button.querySelector('svg[slot="icon-silhouette"]')).toBeNull();
  });

  it('reports no on or off state', async () => {
    const root = await mount({});
    const button = root.querySelector('obc-automation-button')!;
    expect(button.readouts).toEqual([]);
  });

  it('has a name while no tag is visible', async () => {
    const root = await mount({});
    expect(root.querySelector('obc-automation-button')!.accessibleName).toBe(
      'NORVAR water station'
    );
    station.remove();
    const tagged = await mount({tag: '#1'});
    expect(
      tagged.querySelector('obc-automation-button')!.accessibleName
    ).toBeNull();
  });

  it.each([
    [{}, '--automation-symbol-on-border-color'],
    [
      {state: NorvarStationState.running},
      '--automation-symbol-running-background-color',
    ],
    [
      {state: NorvarStationState.unmonitored},
      '--automation-symbol-static-background-color',
    ],
    [{state: NorvarStationState.running, alert: true}, '--alert-alarm-color'],
    [{alert: true, static: true}, '--automation-medium-fresh-water'],
  ])('colours the symbol for %o', async (props, color) => {
    const root = await mount(props);
    expect(root.querySelector('svg[slot="icon"]')!.innerHTML).toContain(color);
  });
});
