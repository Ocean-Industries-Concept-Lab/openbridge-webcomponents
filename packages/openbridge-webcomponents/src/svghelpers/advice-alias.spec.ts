import {describe, it, expect, afterEach} from 'vitest';
import '../navigation-instruments/compass/compass.js';
import '../navigation-instruments/speed-gauge/speed-gauge.js';
import '../navigation-instruments/heave/heave.js';
import '../navigation-instruments/main-engine/main-engine.js';
import type {LitElement} from 'lit';
import type {AdviceInput} from './advice.js';

type Host = LitElement & {advices: AdviceInput[]} & Record<string, unknown>;

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

async function mount(tag: string, configure: (el: Host) => void) {
  const el = document.createElement(tag) as Host;
  configure(el);
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  return el;
}

const LIST: AdviceInput[] = [{min: 10, max: 20, category: 'caution'}];

// The generated Vue wrapper reads every property at creation and writes those
// values back on its second render: the unset name as undefined, the set one
// as its creation-time default. Both sequences are played here.
describe.each([
  ['obc-compass', 'headingAdvices'],
  ['obc-speed-gauge', 'speedAdvices'],
  ['obc-heave', 'advice'],
  ['obc-main-engine', 'thrustAdvices'],
])('%s %s alias', (tag, alias) => {
  it('sets advices through the alias', async () => {
    const el = await mount(tag, (e) => {
      e[alias] = LIST;
    });
    expect(el.advices).toBe(LIST);
  });

  it('keeps advices when the unset alias is written back', async () => {
    const el = await mount(tag, (e) => {
      e.advices = LIST;
    });
    el[alias] = undefined;
    await el.updateComplete;
    expect(el.advices).toBe(LIST);
  });

  it('keeps the alias list when the creation-time advices are written back', async () => {
    const el = await mount(tag, (e) => {
      e[alias] = LIST;
    });
    el.advices = [];
    await el.updateComplete;
    expect(el.advices).toBe(LIST);
  });
});
