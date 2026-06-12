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

    it('preserves decimals on blur when maxFractionDigits is undefined', async () => {
      input.focus();
      input.value = '123.4512';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      input.blur();
      await el.updateComplete;

      expect(el.value).toBe(123.4512);
      expect(input.value).toBe('123.4512');
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

  describe('number formatting', () => {
    beforeEach(async () => {
      el.decimalSeparator = ',';
      el.groupSeparator = ' ';
      el.minFractionDigits = 2;
      el.maxFractionDigits = 2;
      el.value = 1234.5;
      await el.updateComplete;
    });

    it('formats display when not focused', () => {
      expect(input.value).toBe('1 234,50');
    });

    it('removes grouping on focus', async () => {
      input.focus();
      await el.updateComplete;

      expect(input.value).toBe('1234,50');
    });

    it('shows raw input while focused', async () => {
      input.focus();
      input.value = '10.';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      expect(input.value).toBe('10.');
    });

    it('formats on blur after editing', async () => {
      input.focus();
      input.value = '99,9';
      input.dispatchEvent(new InputEvent('input', {bubbles: true}));
      await el.updateComplete;

      input.blur();
      await el.updateComplete;

      expect(input.value).toBe('99,90');
      expect(el.value).toBe(99.9);
    });

    it('reformats when format properties change without focus', async () => {
      el.groupSeparator = "'";
      await el.updateComplete;

      expect(input.value).toBe("1'234,50");
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

  describe('beforeinput filtering', () => {
    function dispatchBeforeInput(
      target: HTMLInputElement,
      data: string | null,
      inputType = 'insertText'
    ): InputEvent {
      const event = new InputEvent('beforeinput', {
        data,
        inputType,
        cancelable: true,
        bubbles: true,
      });
      target.dispatchEvent(event);
      return event;
    }

    beforeEach(async () => {
      el.decimalSeparator = '.';
      el.groupSeparator = ',';
      input.focus();
      input.value = '';
      await el.updateComplete;
    });

    it('blocks letters', () => {
      const event = dispatchBeforeInput(input, 'a');
      expect(event.defaultPrevented).toBe(true);
    });

    it('blocks scientific notation', () => {
      input.value = '1';
      input.setSelectionRange(1, 1);
      const event = dispatchBeforeInput(input, 'e');
      expect(event.defaultPrevented).toBe(true);
    });

    it('blocks symbols', () => {
      const event = dispatchBeforeInput(input, '!');
      expect(event.defaultPrevented).toBe(true);
    });

    it('allows digits', () => {
      const event = dispatchBeforeInput(input, '1');
      expect(event.defaultPrevented).toBe(false);
    });

    it('allows decimal separator', () => {
      const event = dispatchBeforeInput(input, '.');
      expect(event.defaultPrevented).toBe(false);
    });

    it('allows comma when locale uses it', () => {
      const event = dispatchBeforeInput(input, ',');
      expect(event.defaultPrevented).toBe(false);
    });

    it('allows leading sign', () => {
      const event = dispatchBeforeInput(input, '-');
      expect(event.defaultPrevented).toBe(false);
    });

    it('allows deletions (null data)', () => {
      input.value = '12';
      input.setSelectionRange(2, 2);
      const event = dispatchBeforeInput(input, null, 'deleteContentBackward');
      expect(event.defaultPrevented).toBe(false);
    });

    it('blocks paste containing letters', () => {
      const event = new InputEvent('beforeinput', {
        data: null,
        inputType: 'insertFromPaste',
        cancelable: true,
        bubbles: true,
      });
      const dt = new DataTransfer();
      dt.setData('text/plain', '12abc34');
      Object.defineProperty(event, 'dataTransfer', {value: dt});
      input.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it('allows paste of numeric string with separators', () => {
      const event = new InputEvent('beforeinput', {
        data: null,
        inputType: 'insertFromPaste',
        cancelable: true,
        bubbles: true,
      });
      const dt = new DataTransfer();
      dt.setData('text/plain', '1,234.5');
      Object.defineProperty(event, 'dataTransfer', {value: dt});
      input.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it('honours custom decimalSeparator', async () => {
      el.decimalSeparator = ',';
      el.groupSeparator = ' ';
      await el.updateComplete;

      const dot = dispatchBeforeInput(input, '.');
      expect(dot.defaultPrevented).toBe(true);

      const comma = dispatchBeforeInput(input, ',');
      expect(comma.defaultPrevented).toBe(false);
    });

    it('honours custom validationPattern', async () => {
      el.validationPattern = '^[0-9]*$';
      await el.updateComplete;

      const minus = dispatchBeforeInput(input, '-');
      expect(minus.defaultPrevented).toBe(true);

      const digit = dispatchBeforeInput(input, '1');
      expect(digit.defaultPrevented).toBe(false);
    });

    it('does not block when disabled', async () => {
      el.disabled = true;
      await el.updateComplete;
      const event = dispatchBeforeInput(input, 'a');
      expect(event.defaultPrevented).toBe(false);
    });

    it('does not block when readonly', async () => {
      el.readonly = true;
      await el.updateComplete;
      const event = dispatchBeforeInput(input, 'a');
      expect(event.defaultPrevented).toBe(false);
    });
  });
});
