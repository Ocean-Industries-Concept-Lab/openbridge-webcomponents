import {describe, it, expect, beforeEach, vi} from 'vitest';
import './text-input-field.js';
import {ObcTextInputField, HTMLInputTypeAttribute} from './text-input-field.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-text-input-field', () => {
  let el: ObcTextInputField;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const screen = render(
      html`<obc-text-input-field value="hello"></obc-text-input-field>`
    );
    el = screen.baseElement.querySelector(
      'obc-text-input-field'
    ) as ObcTextInputField;
    await el.updateComplete;
    if (!el.shadowRoot) {
      console.error('Shadow root not found', el);
      throw new Error('Shadow root not found');
    }
    input = el.shadowRoot!.querySelector('.value-input') as HTMLInputElement;
    if (!input) {
      console.error('Input not found', el.shadowRoot);
      throw new Error('Input not found');
    }
  });

  describe('rejectUpdates', () => {
    beforeEach(async () => {
      el.rejectUpdates = true;
      await el.updateComplete;
    });
    it('keeps user-typed value when property is set back to previous', async () => {
      el.value = 'hello world';
      await el.updateComplete;

      expect(input.value).toBe('hello');
    });
  });

  describe('rejectUpdatesOnFocus', () => {
    beforeEach(async () => {
      el.rejectUpdatesOnFocus = true;
      await el.updateComplete;
    });
    it('keeps user-typed value when property is set back to previous value while focused', async () => {
      input.focus();
      input.value = 'hello world';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;
      el.value = 'hello';
      await el.updateComplete;

      expect(input.value).toBe('hello world');
    });
  });
  describe('rejectDuplicateUpdates', () => {
    beforeEach(async () => {
      el.rejectDuplicateUpdates = true;
      await el.updateComplete;
    });
    it('keeps user-typed value when property is set back to previous value while focused', async () => {
      input.focus();
      input.value = 'hello world';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(input.value).toBe('hello world');

      el.value = 'hello';
      await el.updateComplete;

      expect(input.value).toBe('hello world');
      expect(el.value).toBe('hello world');
    });

    it('updates the value when the property is set to a new value', async () => {
      input.focus();
      input.value = 'hello world';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(el.value).toBe('hello world');

      el.value = 'hello there';
      await el.updateComplete;

      expect(input.value).toBe('hello there');
      expect(el.value).toBe('hello there');
    });
  });

  describe('input handling', () => {
    it('updates el.value when user types in the input', async () => {
      input.value = 'hello world';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(el.value).toBe('hello world');
    });

    it('dispatches input event when user types', async () => {
      const inputHandler = vi.fn();
      el.addEventListener('input', inputHandler);

      input.value = 'hello world';
      input.dispatchEvent(
        new InputEvent('input', {bubbles: true, composed: true})
      );
      await el.updateComplete;

      expect(inputHandler).toHaveBeenCalled();
    });
  });

  describe('event dispatching', () => {
    let clearButton: HTMLButtonElement;

    beforeEach(async () => {
      el.hasClearButton = true;
      await el.updateComplete;
      clearButton = el.shadowRoot!.querySelector(
        '.trailing-icon-button'
      ) as HTMLButtonElement;
    });

    it('dispatches clear event when clear button is clicked', async () => {
      const clearHandler = vi.fn();
      el.addEventListener('clear', clearHandler);

      clearButton.click();
      await el.updateComplete;

      expect(clearHandler).toHaveBeenCalled();
    });

    it('dispatches input and change events when clear button is clicked', async () => {
      const inputHandler = vi.fn();
      const changeHandler = vi.fn();
      el.addEventListener('input', inputHandler);
      el.addEventListener('change', changeHandler);

      clearButton.click();
      await el.updateComplete;

      expect(inputHandler).toHaveBeenCalled();
      expect(changeHandler).toHaveBeenCalled();
    });

    it('returns focus to input after clear button is clicked', async () => {
      input.focus();
      expect(document.activeElement).toBe(el);
      expect(el.shadowRoot?.activeElement).toBe(input);

      clearButton.click();
      await el.updateComplete;

      expect(el.shadowRoot?.activeElement).toBe(input);
    });
  });

  describe('change event', () => {
    it('dispatches change event when input value changes and blur occurs', async () => {
      const changeHandler = vi.fn();
      el.addEventListener('change', changeHandler);

      input.value = 'new value';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      input.dispatchEvent(new Event('change', {bubbles: true}));
      await el.updateComplete;

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  describe('password visibility', () => {
    beforeEach(async () => {
      el.type = HTMLInputTypeAttribute.Password;
      el.value = 'secret';
      await el.updateComplete;
    });

    it('shows password toggle button when type is password', async () => {
      const toggleButton = el.shadowRoot!.querySelector(
        '.trailing-icon-button'
      ) as HTMLButtonElement;
      expect(toggleButton).toBeTruthy();
    });

    it('toggles input type between password and text when toggle is clicked', async () => {
      const toggleButton = el.shadowRoot!.querySelector(
        '.trailing-icon-button'
      ) as HTMLButtonElement;

      expect(input.type).toBe('password');

      toggleButton.click();
      await el.updateComplete;
      expect(input.type).toBe('text');

      toggleButton.click();
      await el.updateComplete;
      expect(input.type).toBe('password');
    });

    it('hides password toggle when disabled', async () => {
      el.disabled = true;
      await el.updateComplete;

      const toggleButton = el.shadowRoot!.querySelector(
        '.trailing-icon-button'
      ) as HTMLButtonElement;
      expect(toggleButton).toBeNull();
    });
  });

  describe('clear button', () => {
    let clearButton: HTMLButtonElement;
    beforeEach(async () => {
      el.hasClearButton = true;
      await el.updateComplete;
      clearButton = el.shadowRoot!.querySelector(
        '.trailing-icon-button'
      ) as HTMLButtonElement;
      if (!clearButton) {
        console.error('Clear button not found', el.shadowRoot);
        throw new Error('Clear button not found');
      }
    });
    it('clears the input value when the clear button is clicked', async () => {
      clearButton.click();

      await el.updateComplete;

      expect(input.value).toBe('');
      expect(el.value).toBe('');
    });
    it('clears when reject updates is true', async () => {
      el.rejectUpdates = true;
      await el.updateComplete;

      clearButton.click();

      await el.updateComplete;

      expect(input.value).toBe('');
      expect(el.value).toBe('');
    });
  });
});
