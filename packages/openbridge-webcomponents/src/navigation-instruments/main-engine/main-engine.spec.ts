import {describe, it, expect, afterEach} from 'vitest';
import './main-engine.js';
import type {ObcMainEngine} from './main-engine.js';

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

async function mount(configure: (el: ObcMainEngine) => void) {
  const el = document.createElement('obc-main-engine');
  configure(el);
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  return el;
}

describe('obc-main-engine advices', () => {
  it('draws each column from its own list, named by the mask prefix', async () => {
    const el = await mount((e) => {
      e.thrust = 60;
      e.speed = 70;
      e.thrustAdvices = [{min: -60, max: -20, category: 'caution'}];
      e.speedAdvices = [{min: 90, max: 100, category: 'caution'}];
    });
    const masks = [...el.shadowRoot!.querySelectorAll('mask')].map((m) => m.id);
    expect(masks.some((id) => id.includes('-bottom-'))).toBe(true);
    expect(masks.some((id) => id.includes('-speed-'))).toBe(true);
    expect(masks.some((id) => id.includes('-top-'))).toBe(false);
  });

  it('triggers the speed band on the speed reading and the thrust band on thrust', async () => {
    const el = await mount((e) => {
      e.thrust = 10;
      e.speed = 70;
      e.thrustAdvices = [{min: 40, max: 80, category: 'optimal'}];
      e.speedAdvices = [{min: 55, max: 85, category: 'optimal'}];
    });
    const fills = [...el.shadowRoot!.querySelectorAll('path')].map((p) =>
      p.getAttribute('fill')
    );
    // One optimal band triggered (solid enhanced fill), the other at rest (frame fill).
    expect(
      fills.filter((f) => f === 'var(--instrument-enhanced-secondary-color)')
        .length
    ).toBe(1);
  });
});
