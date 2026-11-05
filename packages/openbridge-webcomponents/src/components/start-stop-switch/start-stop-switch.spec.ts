import {afterEach, describe, expect, it} from 'vitest';
import './start-stop-switch.js';
import type {ObcStartStopSwitch} from './start-stop-switch.js';

const cleanup: Array<() => void> = [];
afterEach(() => {
  while (cleanup.length) cleanup.pop()!();
});

async function mount(zoom: number, checked: boolean) {
  const host = document.createElement('div');
  host.style.zoom = String(zoom);
  const startStopSwitch = document.createElement(
    'obc-start-stop-switch'
  ) as ObcStartStopSwitch;
  startStopSwitch.checked = checked;
  host.append(startStopSwitch);
  document.body.append(host);
  cleanup.push(() => host.remove());
  await startStopSwitch.updateComplete;
  const thumb =
    startStopSwitch.shadowRoot!.querySelector<HTMLElement>('.button')!;
  const track =
    startStopSwitch.shadowRoot!.querySelector<HTMLElement>('.button-track')!;
  const changes: boolean[] = [];
  startStopSwitch.addEventListener('change', (e) =>
    changes.push((e as CustomEvent<{checked: boolean}>).detail.checked)
  );
  return {toggle: startStopSwitch, thumb, track, changes};
}

async function press(toggle: ObcStartStopSwitch, thumb: HTMLElement) {
  const rect = thumb.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  thumb.dispatchEvent(
    new MouseEvent('mousedown', {clientX: x, bubbles: true, composed: true})
  );
  await toggle.updateComplete;
  return x;
}

async function moveTo(toggle: ObcStartStopSwitch, clientX: number) {
  window.dispatchEvent(new MouseEvent('mousemove', {clientX}));
  await toggle.updateComplete;
}

async function release(toggle: ObcStartStopSwitch) {
  window.dispatchEvent(new MouseEvent('mouseup'));
  await toggle.updateComplete;
}

describe('obc-start-stop-switch drag under CSS zoom (#1371)', () => {
  for (const zoom of [1, 1.687, 0.75]) {
    describe(`zoom ${zoom}`, () => {
      it('keeps the thumb under the pointer and inside the track when turning on', async () => {
        const {toggle, thumb, track, changes} = await mount(zoom, false);
        const startLeft = thumb.getBoundingClientRect().left;
        const x = await press(toggle, thumb);

        await moveTo(toggle, x + 10);
        expect(thumb.getBoundingClientRect().left - startLeft).toBeCloseTo(
          10,
          0
        );

        await moveTo(toggle, x + 1000);
        expect(thumb.getBoundingClientRect().right).toBeLessThanOrEqual(
          track.getBoundingClientRect().right + zoom + 0.5
        );

        await release(toggle);
        expect(toggle.checked).toBe(true);
        expect(changes).toEqual([true]);
      });

      it('keeps the thumb under the pointer and inside the track when turning off', async () => {
        const {toggle, thumb, track, changes} = await mount(zoom, true);
        const startLeft = thumb.getBoundingClientRect().left;
        const x = await press(toggle, thumb);

        await moveTo(toggle, x - 10);
        expect(startLeft - thumb.getBoundingClientRect().left).toBeCloseTo(
          10,
          0
        );

        await moveTo(toggle, x - 1000);
        expect(thumb.getBoundingClientRect().left).toBeGreaterThanOrEqual(
          track.getBoundingClientRect().left - zoom - 0.5
        );

        await release(toggle);
        expect(toggle.checked).toBe(false);
        expect(changes).toEqual([false]);
      });
    });
  }
});
