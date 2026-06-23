import {beforeEach, describe, expect, it, vi} from 'vitest';
import './toggle-switch.js';
import {ObcToggleSwitch} from './toggle-switch.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-toggle-switch', () => {
  let el: ObcToggleSwitch;
  let input: HTMLInputElement;

  async function setup(markup = html`<obc-toggle-switch></obc-toggle-switch>`) {
    const screen = render(markup);
    el = screen.baseElement.querySelector(
      'obc-toggle-switch'
    ) as ObcToggleSwitch;
    await el.updateComplete;

    if (!el.shadowRoot) {
      console.error('Shadow root not found', el);
      throw new Error('Shadow root not found');
    }

    input = el.shadowRoot.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    if (!input) {
      console.error('Input not found', el.shadowRoot);
      throw new Error('Input not found');
    }
  }

  beforeEach(async () => {
    await setup();
  });

  it('defaults to unchecked', async () => {
    expect(el.checked).toBe(false);
    expect(input.checked).toBe(false);
  });

  describe('toggling (internal control)', () => {
    it('dispatches input event with next checked value', async () => {
      const handler = vi.fn();
      el.addEventListener('input', handler);

      input.click();
      await el.updateComplete;

      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0]?.[0] as CustomEvent<{
        checked: boolean;
      }>;
      expect(event.detail).toEqual({checked: true});
    });

    it('combination of click and js control', async () => {
      el.checked = true;
      await el.updateComplete;
      expect(el.checked).toBe(true);
      expect(input.checked).toBe(true);

      input.click();
      await el.updateComplete;

      expect(el.checked).toBe(false);
      expect(input.checked).toBe(false);

      input.click();
      await el.updateComplete;

      expect(el.checked).toBe(true);
      expect(input.checked).toBe(true);

      el.checked = false;
      await el.updateComplete;
      expect(el.checked).toBe(false);
      expect(input.checked).toBe(false);
    });

    it('updates checked when user toggles', async () => {
      input.click();
      await el.updateComplete;

      expect(el.checked).toBe(true);
      expect(input.checked).toBe(true);
    });
  });

  describe('externalControl', () => {
    beforeEach(async () => {
      el.externalControl = true;
      await el.updateComplete;
    });

    it('does not change checked when user toggles', async () => {
      expect(el.checked).toBe(false);
      expect(input.checked).toBe(false);

      input.click();
      await el.updateComplete;

      expect(el.checked).toBe(false);
      expect(input.checked).toBe(false);
    });

    it('still dispatches input event with suggested next state', async () => {
      const handler = vi.fn();
      el.addEventListener('input', handler);

      input.click();
      await el.updateComplete;

      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0]?.[0] as CustomEvent<{
        checked: boolean;
      }>;
      expect(event.detail).toEqual({checked: true});
    });
  });

  describe('disabled', () => {
    beforeEach(async () => {
      el.disabled = true;
      await el.updateComplete;
    });

    it('prevents toggling', async () => {
      expect(el.checked).toBe(false);
      expect(input.disabled).toBe(true);

      input.click();
      await el.updateComplete;

      expect(el.checked).toBe(false);
      expect(input.checked).toBe(false);
    });

    it('does not dispatch input event', async () => {
      const handler = vi.fn();
      el.addEventListener('input', handler);

      input.click();
      await el.updateComplete;

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
