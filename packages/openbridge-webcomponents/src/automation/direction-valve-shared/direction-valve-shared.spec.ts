import {afterEach, describe, expect, it} from 'vitest';
import '../non-return-valve/non-return-valve.js';
import type {ObcNonReturnValve} from '../non-return-valve/non-return-valve.js';
import type {ObcAutomationButton} from '../automation-button/automation-button.js';

async function mount(tag: string | null, showReadoutStack = true) {
  const valve = document.createElement('obc-non-return-valve');
  valve.tag = tag;
  valve.showReadoutStack = showReadoutStack;
  document.body.append(valve);
  await valve.updateComplete;
  const inner = valve.shadowRoot!.querySelector(
    'obc-automation-button'
  ) as ObcAutomationButton;
  await inner.updateComplete;
  return {valve, button: inner.shadowRoot!.querySelector('button')!};
}

describe('direction valve accessible name', () => {
  let valve: ObcNonReturnValve | undefined;
  afterEach(() => valve?.remove());

  it('names the button after the valve without a tag', async () => {
    const mounted = await mount(null);
    valve = mounted.valve;
    expect(mounted.button.getAttribute('aria-label')).toBe('Non-return valve');
  });

  it('leaves the name to a visible tag', async () => {
    const mounted = await mount('#0012');
    valve = mounted.valve;
    expect(mounted.button.hasAttribute('aria-label')).toBe(false);
  });

  it('names the button when the tag is hidden', async () => {
    const mounted = await mount('#0012', false);
    valve = mounted.valve;
    expect(mounted.button.getAttribute('aria-label')).toBe('Non-return valve');
  });
});
