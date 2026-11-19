import {afterEach, describe, expect, it} from 'vitest';
import '../navigation-instruments/gauge-trend/gauge-trend.js';
import '../bars-graphs/line-graph/line-graph.js';
import type {ObcGaugeTrend} from '../navigation-instruments/gauge-trend/gauge-trend.js';
import type {ObcLineGraph} from '../bars-graphs/line-graph/line-graph.js';

const mounted: HTMLElement[] = [];

afterEach(() => {
  for (const el of mounted.splice(0)) el.remove();
});

const frames = (n = 3) =>
  new Promise<void>((resolve) => {
    const tick = (left: number) =>
      left === 0 ? resolve() : requestAnimationFrame(() => tick(left - 1));
    tick(n);
  });

async function mountGaugeTrend(configure: (el: ObcGaugeTrend) => void) {
  document.documentElement.classList.add('obc-component-size-regular');
  const host = document.createElement('div');
  host.style.cssText = 'width: 480px';
  document.body.appendChild(host);
  mounted.push(host);
  const el = document.createElement('obc-gauge-trend');
  el.width = 480;
  el.height = 320;
  el.data = [
    {label: 'a', value: 10},
    {label: 'b', value: 50},
    {label: 'c', value: 30},
  ];
  configure(el);
  host.appendChild(el);
  await el.updateComplete;
  await frames();
  return el;
}

describe('advice area plugin', () => {
  it('draws one area per advice that asks for it, inside the plot', async () => {
    const el = await mountGaugeTrend((gt) => {
      gt.hasAdvice = true;
      gt.value = 30;
      gt.advices = [
        {min: 20, max: 40, category: 'caution', showArea: true},
        {min: 60, max: 80, category: 'optimal'},
      ];
    });
    expect(el.lastAdviceAreas).toHaveLength(1);
    const [area] = el.lastAdviceAreas;
    expect(area.top).toBeGreaterThan(0);
    expect(area.bottom).toBeGreaterThan(area.top);
    expect(area.bottom).toBeLessThan(320);
  });

  it('draws nothing while hasAdvice is off', async () => {
    const el = await mountGaugeTrend((gt) => {
      gt.hasAdvice = false;
      gt.advices = [{min: 20, max: 40, category: 'caution', showArea: true}];
    });
    expect(el.lastAdviceAreas).toHaveLength(0);
  });

  it('is available on a plain line graph', async () => {
    const host = document.createElement('div');
    host.style.cssText = 'width: 480px';
    document.body.appendChild(host);
    mounted.push(host);
    const el = document.createElement('obc-line-graph') as ObcLineGraph;
    el.width = 480;
    el.height = 320;
    el.data = [
      {label: 'a', value: 10},
      {label: 'b', value: 50},
    ];
    el.advices = [{min: 20, max: 40, category: 'alarm', showArea: true}];
    host.appendChild(el);
    await el.updateComplete;
    await frames();
    expect(el.lastAdviceAreas).toHaveLength(1);
  });
});
