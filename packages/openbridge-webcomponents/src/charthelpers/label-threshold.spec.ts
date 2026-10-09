import {describe, it, expect, afterEach} from 'vitest';
import {observeLabelThreshold} from './label-threshold.js';

const THRESHOLD_PX = 192;

function settle(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );
}

describe('observeLabelThreshold', () => {
  let observer: ResizeObserver | undefined;
  let el: HTMLDivElement | undefined;

  afterEach(() => {
    observer?.disconnect();
    el?.remove();
  });

  it('rebuilds only on a resize that crosses the threshold', async () => {
    el = document.createElement('div');
    el.style.height = '100px';
    document.body.append(el);
    const events: string[] = [];

    observer = observeLabelThreshold(
      el,
      () => (el?.clientHeight ?? 0) >= THRESHOLD_PX,
      {
        rebuild: () => events.push('rebuild'),
        update: () => events.push('update'),
      }
    );
    await settle();

    el.style.height = '300px';
    await settle();
    el.style.height = '320px';
    await settle();
    el.style.height = '50px';
    await settle();

    expect(events).toEqual(['update', 'rebuild', 'update', 'rebuild']);
  });

  it('rebuilds once when a target created without a size gets one', async () => {
    const parent = document.createElement('div');
    parent.style.display = 'none';
    el = document.createElement('div');
    el.style.height = '100px';
    parent.append(el);
    document.body.append(parent);
    const events: string[] = [];

    observer = observeLabelThreshold(
      el,
      () => (el?.clientHeight ?? 0) >= THRESHOLD_PX,
      {
        rebuild: () => events.push('rebuild'),
        update: () => events.push('update'),
      }
    );
    await settle();

    parent.style.display = 'block';
    await settle();
    el.style.height = '120px';
    await settle();
    parent.remove();

    expect(events).toEqual(['update', 'rebuild', 'update']);
  });
});
