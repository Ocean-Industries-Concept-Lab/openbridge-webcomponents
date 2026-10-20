import {afterEach, describe, expect, it} from 'vitest';
import './top-bar.js';
import type {ObcTopBar} from './top-bar.js';

const cleanup: Array<() => void> = [];
afterEach(() => {
  while (cleanup.length) cleanup.pop()!();
});

async function mount(init: (bar: ObcTopBar) => void = () => {}) {
  const bar = document.createElement('obc-top-bar') as ObcTopBar;
  init(bar);
  document.body.append(bar);
  cleanup.push(() => bar.remove());
  await bar.updateComplete;
  const button = bar.shadowRoot!.querySelector<HTMLElement>('.more-button')!;
  return {bar, button};
}

describe('obc-top-bar more button', () => {
  it('fires more-button-clicked and the deprecated left-more-button-clicked', async () => {
    const {bar, button} = await mount();
    const events: string[] = [];
    bar.addEventListener('more-button-clicked', () =>
      events.push('more-button-clicked')
    );
    bar.addEventListener('left-more-button-clicked', () =>
      events.push('left-more-button-clicked')
    );
    button.click();
    expect(events).toEqual(['more-button-clicked', 'left-more-button-clicked']);
  });

  it('exposes both the more-button and the deprecated left-more-button part', async () => {
    const {button} = await mount();
    expect(button.part.contains('more-button')).toBe(true);
    expect(button.part.contains('left-more-button')).toBe(true);
  });

  it('moreButtonActivated activates the button', async () => {
    const {bar, button} = await mount((bar) => {
      bar.moreButtonActivated = true;
    });
    expect(button.hasAttribute('activated')).toBe(true);
    bar.moreButtonActivated = false;
    await bar.updateComplete;
    expect(button.hasAttribute('activated')).toBe(false);
  });

  it('the deprecated leftMoreButtonActivated still activates the button', async () => {
    const {bar, button} = await mount((bar) => {
      bar.setAttribute('leftMoreButtonActivated', '');
    });
    expect(bar.moreButtonActivated).toBe(true);
    expect(button.hasAttribute('activated')).toBe(true);
    bar.leftMoreButtonActivated = false;
    await bar.updateComplete;
    expect(button.hasAttribute('activated')).toBe(false);
  });
});
