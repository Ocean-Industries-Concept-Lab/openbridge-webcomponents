import {afterEach, describe, expect, it} from 'vitest';
import './slide-button.js';
import type {ObcSlideButton} from './slide-button.js';

const cleanup: Array<() => void> = [];
afterEach(() => {
  while (cleanup.length) cleanup.pop()!();
});

async function mount(zoom: number) {
  const host = document.createElement('div');
  host.style.zoom = String(zoom);
  const slideButton = document.createElement(
    'obc-slide-button'
  ) as ObcSlideButton;
  host.append(slideButton);
  document.body.append(host);
  cleanup.push(() => host.remove());
  await slideButton.updateComplete;
  const handle = slideButton.shadowRoot!.querySelector<HTMLElement>(
    '.button-touch-target'
  )!;
  const thumb =
    slideButton.shadowRoot!.querySelector<HTMLElement>('.slide-button')!;
  const track =
    slideButton.shadowRoot!.querySelector<HTMLElement>('.visual-container')!;
  const slides: number[] = [];
  slideButton.addEventListener('slide', () => slides.push(1));
  return {slideButton, handle, thumb, track, slides};
}

async function press(slideButton: ObcSlideButton, handle: HTMLElement) {
  const rect = handle.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  handle.dispatchEvent(
    new MouseEvent('mousedown', {clientX: x, bubbles: true, composed: true})
  );
  await slideButton.updateComplete;
  return x;
}

async function moveTo(slideButton: ObcSlideButton, clientX: number) {
  window.dispatchEvent(new MouseEvent('mousemove', {clientX}));
  await slideButton.updateComplete;
}

async function release(slideButton: ObcSlideButton) {
  window.dispatchEvent(new MouseEvent('mouseup'));
  await slideButton.updateComplete;
}

/** The distance the thumb can travel, in viewport px at the mounted zoom. */
function travel(thumb: HTMLElement, track: HTMLElement) {
  return (
    track.getBoundingClientRect().width - thumb.getBoundingClientRect().width
  );
}

describe('obc-slide-button drag under CSS zoom (#1371)', () => {
  for (const zoom of [1, 1.687, 0.75]) {
    describe(`zoom ${zoom}`, () => {
      it('keeps the thumb under the pointer and inside the track', async () => {
        const {slideButton, handle, thumb, track} = await mount(zoom);
        const startLeft = handle.getBoundingClientRect().left;
        const x = await press(slideButton, handle);

        await moveTo(slideButton, x + 10);
        expect(handle.getBoundingClientRect().left - startLeft).toBeCloseTo(
          10,
          0
        );

        await moveTo(slideButton, x + 1000);
        expect(thumb.getBoundingClientRect().right).toBeLessThanOrEqual(
          track.getBoundingClientRect().right + zoom + 0.5
        );
        await release(slideButton);
      });

      it('does not slide when released before the threshold', async () => {
        const {slideButton, handle, thumb, track, slides} = await mount(zoom);
        const x = await press(slideButton, handle);
        await moveTo(slideButton, x + travel(thumb, track) * 0.7);
        await release(slideButton);
        expect(slides).toEqual([]);
      });

      it('slides once when released past the threshold', async () => {
        const {slideButton, handle, thumb, track, slides} = await mount(zoom);
        const x = await press(slideButton, handle);
        await moveTo(slideButton, x + travel(thumb, track) * 0.9);
        await release(slideButton);
        expect(slides).toEqual([1]);
      });
    });
  }
});
