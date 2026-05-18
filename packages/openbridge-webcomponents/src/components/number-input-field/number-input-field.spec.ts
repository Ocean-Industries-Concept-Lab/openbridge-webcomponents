import {describe, it, expect, beforeEach, vi} from 'vitest';
import './number-input-field.js';
import {ObcNumberInputField} from './number-input-field.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-number-input-field', () => {
  let el: ObcNumberInputField;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const screen = render(
      html`<obc-number-input-field .value=${10.2}></obc-number-input-field>`
    );
    el = screen.baseElement.querySelector(
      'obc-number-input-field'
    ) as ObcNumberInputField;
    await el.updateComplete;
    input = el.shadowRoot!.querySelector('.value-input') as HTMLInputElement;
  });

  describe('value API', () => {
    it('exposes value as a number', () => {
      expect(el.value).toBe(10.2);
    });

    it('sets value to parsed number while preserving trailing decimal display', async () => {
      input.focus();
      input.value = '10.';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(el.value).toBe(10);
      expect(input.value).toBe('10.');
    });

    it('commits trailing decimal on blur', async () => {
      input.focus();
      input.value = '10.';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      input.blur();
      await el.updateComplete;

      expect(el.value).toBe(10);
      expect(input.value).toBe('10');
    });

    it('preserves decimal when editing 10.2 to 10.', async () => {
      input.focus();
      input.value = '10.';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(input.value).toBe('10.');
    });
  });

  describe('input event', () => {
    it('dispatches input with number payload on keystroke', async () => {
      const handler = vi.fn();
      el.addEventListener('input', handler);

      input.focus();
      input.value = '12.5';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0][0] as CustomEvent<{value: number}>;
      expect(event.detail.value).toBe(12.5);
    });

    it('dispatches input with 10 for trailing decimal input', async () => {
      const handler = vi.fn();
      el.addEventListener('input', handler);

      input.focus();
      input.value = '10.';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0][0] as CustomEvent<{value: number}>;
      expect(event.detail.value).toBe(10);
    });
  });

  describe('change event', () => {
    it('dispatches change on blur when committed value changed', async () => {
      const handler = vi.fn();
      el.addEventListener('change', handler);

      input.focus();
      input.value = '12.5';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      input.blur();
      await el.updateComplete;

      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0][0] as CustomEvent<{value: number}>;
      expect(event.detail.value).toBe(12.5);
    });

    it('does not dispatch change on blur when value is unchanged', async () => {
      const handler = vi.fn();
      el.addEventListener('change', handler);

      input.focus();
      input.blur();
      await el.updateComplete;

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('rejectUpdatesOnFocus', () => {
    beforeEach(async () => {
      el.rejectUpdatesOnFocus = true;
      await el.updateComplete;
    });

    it('keeps user-typed display when property is set while focused', async () => {
      input.focus();
      input.value = '99.9';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      el.value = 12.3;
      await el.updateComplete;

      expect(input.value).toBe('99.9');
    });
  });

  describe('rejectDuplicateUpdates', () => {
    beforeEach(async () => {
      el.rejectDuplicateUpdates = true;
      await el.updateComplete;
    });

    it('keeps user-typed display when property is set to same value while focused', async () => {
      input.focus();
      input.value = '10.';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      el.value = 10.2;
      await el.updateComplete;

      expect(input.value).toBe('10.');
    });
  });
});
