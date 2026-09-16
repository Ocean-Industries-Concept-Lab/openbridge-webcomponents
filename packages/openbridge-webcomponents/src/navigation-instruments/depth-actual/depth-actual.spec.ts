import {describe, it, expect, afterEach} from 'vitest';
import '../../main.css';
import './depth-actual.js';
import type {ObcDepthActual} from './depth-actual.js';

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

async function mount(configure: (el: ObcDepthActual) => void) {
  const host = document.createElement('div');
  host.style.cssText = 'width: 384px; height: 384px';
  document.body.appendChild(host);
  mounted.push(host);
  const el = document.createElement('obc-depth-actual');
  configure(el);
  host.appendChild(el);
  await el.updateComplete;
  return el;
}

const attr = (el: ObcDepthActual, selector: string, name: string) =>
  Number(el.shadowRoot!.querySelector(selector)!.getAttribute(name));
const labels = (el: ObcDepthActual) =>
  [...el.shadowRoot!.querySelectorAll('text.linear-label')].map((t) =>
    t.textContent?.trim()
  );

describe('obc-depth-actual ranges', () => {
  it('defaults to the Regular rung: waterline a sixth down, 25/5 ticks', async () => {
    const el = await mount((e) => {
      e.depth = 75;
    });
    expect(el.range.maxDepth).toBe(100);
    expect(attr(el, 'rect.water', 'y')).toBeCloseTo(-168 + 336 / 6, 5);
    expect(labels(el)).toEqual(['0', '25', '50', '75', '100']);
  });

  it('Shallow puts the waterline halfway and labels the air band', async () => {
    const el = await mount((e) => {
      e.maxDepth = 25;
      e.depth = 18.75;
    });
    expect(attr(el, 'rect.water', 'y')).toBe(0);
    expect(labels(el)).toEqual(['0', '25', '25']);
  });

  it('Deep puts the waterline at the frame top and hides the depth marker at the range end', async () => {
    const el = await mount((e) => {
      e.maxDepth = 1000;
      e.depth = 1000;
    });
    expect(attr(el, 'rect.water', 'y')).toBe(-168);
    expect(labels(el)).toEqual(['0', '250', '500', '750', '1000']);
    expect(el.shadowRoot!.querySelector('rect[rx="4"]')).toBeNull();
  });

  it('keeps instrumentRange as an alias of maxDepth', async () => {
    const el = await mount((e) => {
      e.instrumentRange = 50;
    });
    expect(el.maxDepth).toBe(50);
    expect(el.range.maxDepth).toBe(50);
    expect(el.range.airFraction).toBeCloseTo(1 / 6, 5);
  });

  it('auto-range steps with the depth', async () => {
    const el = await mount((e) => {
      e.autoRange = true;
      e.depth = 12;
    });
    expect(el.range.maxDepth).toBe(25);
    el.depth = 300;
    await el.updateComplete;
    expect(el.range.maxDepth).toBe(1000);
  });

  it('anchors the seabed pattern and the depth line at the depth', async () => {
    const el = await mount((e) => {
      e.depth = 50;
    });
    const y = -168 + 336 / 6 + 0.5 * (336 - 336 / 6);
    expect(attr(el, 'line.depth-line', 'y1')).toBeCloseTo(y, 5);
    expect(attr(el, 'rect.seabed', 'y')).toBeCloseTo(y, 5);
  });
});
