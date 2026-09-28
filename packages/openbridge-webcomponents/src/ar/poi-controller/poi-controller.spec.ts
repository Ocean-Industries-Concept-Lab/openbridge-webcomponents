import {afterEach, describe, expect, it} from 'vitest';
import './poi-controller.js';
import type {ObcPoiController} from './poi-controller.js';
import type {PoiBase} from '../poi/poi-base.js';

const MEDIA =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>'
  );

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-poi-controller filter cutoffs', () => {
  it('returns reused targets to their default when an override is cleared', async () => {
    document.body.innerHTML = `
      <obc-poi-controller style="display: block; width: 640px; height: 360px">
        <img slot="media" alt="" src="${MEDIA}" />
        <obc-poi-layer-stack slot="stack">
          <obc-poi-layer data-controller-layer="background"></obc-poi-layer>
        </obc-poi-layer-stack>
      </obc-poi-controller>
    `;
    const controller = document.querySelector(
      'obc-poi-controller'
    ) as ObcPoiController;
    await (document.querySelector('img') as HTMLImageElement).decode();
    const defaults = document.createElement('obc-poi-data') as PoiBase;

    controller.xFilterCutoffHz = 0;
    controller.yFilterCutoffHz = 0;
    controller.detections = [{id: 'a', x: 320, y: 180}];
    await controller.updateComplete;
    await nextFrame();
    const target = controller.querySelector('obc-poi-data') as PoiBase;
    expect(target).not.toBeNull();
    expect(target.xFilterCutoffHz).toBe(0);
    expect(target.yFilterCutoffHz).toBe(0);

    controller.xFilterCutoffHz = null;
    controller.yFilterCutoffHz = null;
    controller.detections = [{id: 'a', x: 330, y: 180}];
    await controller.updateComplete;
    await nextFrame();
    expect(controller.querySelector('obc-poi-data')).toBe(target);
    expect(target.xFilterCutoffHz).toBe(defaults.xFilterCutoffHz);
    expect(target.yFilterCutoffHz).toBe(defaults.yFilterCutoffHz);
  });
});
