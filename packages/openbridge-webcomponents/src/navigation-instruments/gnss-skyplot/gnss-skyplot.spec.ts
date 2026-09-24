import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './gnss-skyplot.js';
import {
  SatelliteConstellation,
  type ObcGnssSkyplot,
  type Satellite,
} from './gnss-skyplot.js';
import '../../main.css';

/** Elevation 0° sits on the outermost grid ring, 90° at the centre. */
const SCALE_RADIUS = 160;

async function markersOf(
  satellites: Satellite[],
  props: Partial<ObcGnssSkyplot> = {}
): Promise<SVGGElement[]> {
  const screen = render(
    html`<div style="width: 512px; height: 512px">
      <obc-gnss-skyplot
        .satellites=${satellites}
        .colorByConstellation=${props.colorByConstellation ?? false}
        .showLegend=${props.showLegend ?? false}
      ></obc-gnss-skyplot>
    </div>`
  );
  const el = screen.container.querySelector(
    'obc-gnss-skyplot'
  ) as ObcGnssSkyplot;
  await el.updateComplete;
  return [...el.shadowRoot!.querySelectorAll<SVGGElement>('g.marker')];
}

/** The `translate(x y)` a marker's group carries, in SVG units. */
function positionOf(marker: SVGGElement): {x: number; y: number} {
  const [x, y] = (marker.getAttribute('transform') ?? '')
    .replace(/^translate\(|\)$/g, '')
    .split(' ')
    .map(Number);
  return {x, y};
}

describe('obc-gnss-skyplot — elevation and azimuth place the marker', () => {
  it('puts the zenith at the centre and the horizon on the outer ring', async () => {
    const [zenith, horizon] = await markersOf([
      {id: 1, azimuth: 0, elevation: 90},
      {id: 2, azimuth: 0, elevation: 0},
    ]);
    expect(positionOf(zenith)).toEqual({x: 0, y: 0});
    expect(positionOf(horizon).y).toBeCloseTo(-SCALE_RADIUS, 5);
  });

  it('runs azimuth clockwise from north', async () => {
    const [north, east, south, west] = await markersOf([
      {id: 1, azimuth: 0, elevation: 45},
      {id: 2, azimuth: 90, elevation: 45},
      {id: 3, azimuth: 180, elevation: 45},
      {id: 4, azimuth: 270, elevation: 45},
    ]);
    const half = SCALE_RADIUS / 2;
    expect(positionOf(north).y).toBeCloseTo(-half, 5);
    expect(positionOf(east).x).toBeCloseTo(half, 5);
    expect(positionOf(south).y).toBeCloseTo(half, 5);
    expect(positionOf(west).x).toBeCloseTo(-half, 5);
  });

  it('clamps an elevation outside the visible sky onto the scale', async () => {
    const [below, above] = await markersOf([
      {id: 1, azimuth: 0, elevation: -20},
      {id: 2, azimuth: 0, elevation: 140},
    ]);
    expect(positionOf(below).y).toBeCloseTo(-SCALE_RADIUS, 5);
    expect(positionOf(above)).toEqual({x: 0, y: 0});
  });
});

describe('obc-gnss-skyplot — the legend follows the satellites', () => {
  it('lists the constellations present, in a fixed order', async () => {
    const screen = render(
      html`<div style="width: 512px; height: 512px">
        <obc-gnss-skyplot
          colorByConstellation
          showLegend
          .satellites=${
            [
              {
                id: 1,
                azimuth: 0,
                elevation: 30,
                constellation: SatelliteConstellation.beidou,
              },
              {
                id: 2,
                azimuth: 90,
                elevation: 30,
                constellation: SatelliteConstellation.gps,
              },
              {
                id: 3,
                azimuth: 180,
                elevation: 30,
                constellation: SatelliteConstellation.gps,
              },
            ] satisfies Satellite[]
          }
        ></obc-gnss-skyplot>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gnss-skyplot'
    ) as ObcGnssSkyplot;
    await el.updateComplete;
    const labels = [...el.shadowRoot!.querySelectorAll('.legend-label')].map(
      (n) => n.textContent
    );
    expect(labels).toEqual(['GPS', 'BeiDou']);
  });

  it('draws no legend for satellites that carry no constellation', async () => {
    const screen = render(
      html`<div style="width: 512px; height: 512px">
        <obc-gnss-skyplot
          colorByConstellation
          showLegend
          .satellites=${[{id: 1, azimuth: 0, elevation: 30}] satisfies Satellite[]}
        ></obc-gnss-skyplot>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-gnss-skyplot'
    ) as ObcGnssSkyplot;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.legend')).toBeNull();
  });
});
