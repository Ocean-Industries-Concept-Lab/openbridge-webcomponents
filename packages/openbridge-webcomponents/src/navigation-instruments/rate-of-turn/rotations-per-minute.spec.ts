import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html, type TemplateResult} from 'lit';
import type {LitElement} from 'lit';
import './rate-of-turn.js';
import '../compass/compass.js';
import '../compass-flat/compass-flat.js';
import '../compass-sector/compass-sector.js';
import {RotType} from './rot-renderer.js';

type RotHost = LitElement & {
  rotationsPerMinute: number;
  rateOfTurnDegreesPerMinute: number | undefined;
};

/**
 * One controller, four renderings: each host forwards its rate of turn to a
 * watch (or the flat strip), which owns the spinning dots.
 */
const HOSTS: {tag: string; watchTag: string; template: TemplateResult}[] = [
  {
    tag: 'obc-compass',
    watchTag: 'obc-watch',
    template: html`<obc-compass .rotType=${RotType.dots}></obc-compass>`,
  },
  {
    tag: 'obc-compass-flat',
    watchTag: 'obc-watch-flat',
    template: html`<obc-compass-flat
      .rotType=${RotType.dots}
    ></obc-compass-flat>`,
  },
  {
    tag: 'obc-compass-sector',
    watchTag: 'obc-watch',
    template: html`<obc-compass-sector
      .rotType=${RotType.dots}
    ></obc-compass-sector>`,
  },
  {
    tag: 'obc-rate-of-turn',
    watchTag: 'obc-watch',
    template: html`<obc-rate-of-turn
      .rotType=${RotType.dots}
    ></obc-rate-of-turn>`,
  },
];

async function mount(host: (typeof HOSTS)[number]): Promise<{
  el: RotHost;
  watch: RotHost;
  spinner: () => Animation | undefined;
}> {
  const screen = render(
    html`<div style="width: 400px; height: 400px">${host.template}</div>`
  );
  const el = screen.container.querySelector(host.tag) as RotHost;
  await el.updateComplete;
  const watch = el.shadowRoot!.querySelector(host.watchTag) as RotHost;
  await watch.updateComplete;
  const spinner = () =>
    (
      watch.shadowRoot!.querySelector('#rot-spinner') as SVGGElement | null
    )?.getAnimations()[0];
  return {el, watch, spinner};
}

for (const host of HOSTS) {
  describe(`${host.tag} with no rate-of-turn input`, () => {
    it('does not spin the dots', async () => {
      const {el, watch, spinner} = await mount(host);
      expect(el.rateOfTurnDegreesPerMinute).toBeUndefined();
      expect(el.rotationsPerMinute).toBe(0);
      expect(watch.rotationsPerMinute).toBe(0);
      expect(spinner()?.playState).toBe('paused');
    });

    it('still spins them for the deprecated rotationsPerMinute', async () => {
      const {el, watch, spinner} = await mount(host);
      el.rotationsPerMinute = 1;
      await el.updateComplete;
      await watch.updateComplete;
      expect(spinner()?.playState).toBe('running');
    });
  });

  describe(`${host.tag} with rateOfTurnDegreesPerMinute set`, () => {
    it('spins the dots', async () => {
      const {el, watch, spinner} = await mount(host);
      el.rateOfTurnDegreesPerMinute = 360;
      await el.updateComplete;
      await watch.updateComplete;
      expect(spinner()?.playState).toBe('running');
    });

    it('wins over the deprecated rotationsPerMinute', async () => {
      const {el, watch, spinner} = await mount(host);
      el.rotationsPerMinute = 1;
      el.rateOfTurnDegreesPerMinute = 0;
      await el.updateComplete;
      await watch.updateComplete;
      expect(spinner()?.playState).toBe('paused');
    });
  });
}
