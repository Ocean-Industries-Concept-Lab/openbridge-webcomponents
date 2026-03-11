import {describe, it, expect, beforeEach, vi} from 'vitest';
import './textarea-field.js';
import {ObcTextareaField} from './textarea-field.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-textarea-field', () => {
  let el: ObcTextareaField;
  let textarea: HTMLTextAreaElement;

  beforeEach(async () => {
    const screen = render(
      html`<obc-textarea-field value="hello"></obc-textarea-field>`
    );
    el = screen.baseElement.querySelector(
      'obc-textarea-field'
    ) as ObcTextareaField;
    await el.updateComplete;
    if (!el.shadowRoot) {
      console.error('Shadow root not found', el);
      throw new Error('Shadow root not found');
    }
    textarea = el.shadowRoot!.querySelector(
      '.input-field'
    ) as HTMLTextAreaElement;
    if (!textarea) {
      console.error('Textarea not found', el.shadowRoot);
      throw new Error('Textarea not found');
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

      expect(textarea.value).toBe('hello');
    });
  });

  describe('rejectUpdatesOnFocus', () => {
    beforeEach(async () => {
      el.rejectUpdatesOnFocus = true;
      await el.updateComplete;
    });
    it('keeps user-typed value when property is set back to previous value while focused', async () => {
      textarea.focus();
      textarea.value = 'hello world';
      textarea.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;
      el.value = 'hello';
      await el.updateComplete;

      expect(textarea.value).toBe('hello world');
    });
  });

  describe('rejectDuplicateUpdates', () => {
    beforeEach(async () => {
      el.rejectDuplicateUpdates = true;
      await el.updateComplete;
    });
    it('keeps user-typed value when property is set back to previous value while focused', async () => {
      textarea.focus();
      textarea.value = 'hello world';
      textarea.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(textarea.value).toBe('hello world');

      el.value = 'hello';
      await el.updateComplete;

      expect(textarea.value).toBe('hello world');
      expect(el.value).toBe('hello world');
    });

    it('updates the value when the property is set to a new value', async () => {
      textarea.focus();
      textarea.value = 'hello world';
      textarea.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(el.value).toBe('hello world');

      el.value = 'hello there';
      await el.updateComplete;

      expect(textarea.value).toBe('hello there');
      expect(el.value).toBe('hello there');
    });
  });

  describe('input handling', () => {
    it('updates el.value when user types in the input', async () => {
      textarea.value = 'hello world';
      textarea.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(el.value).toBe('hello world');
    });

    it('dispatches input event when user types', async () => {
      const inputHandler = vi.fn();
      el.addEventListener('input', inputHandler);

      textarea.value = 'hello world';
      textarea.dispatchEvent(
        new InputEvent('input', {bubbles: true, composed: true})
      );
      await el.updateComplete;

      expect(inputHandler).toHaveBeenCalled();
    });
  });

  describe('change event', () => {
    it('dispatches change event when input value changes and blur occurs', async () => {
      const changeHandler = vi.fn();
      el.addEventListener('change', changeHandler);

      textarea.value = 'new value';
      textarea.dispatchEvent(new InputEvent('input', {bubbles: true}));
      textarea.dispatchEvent(new Event('change', {bubbles: true}));
      await el.updateComplete;

      expect(changeHandler).toHaveBeenCalled();
    });
  });
});
