import {describe, it, expect, beforeEach} from 'vitest';
import './text-input-field.js';
import {ObcTextInputField} from './text-input-field.js';
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
