import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import './number-input-field.js';
import {
  ObcNumberInputField,
  ObcNumberInputFieldTextAlign,
} from './number-input-field.js';
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

  describe('readonly', () => {
    beforeEach(async () => {
      el.groupSeparator = ' ';
      el.decimalSeparator = '.';
      el.value = 1234.5;
      el.readonly = true;
      await el.updateComplete;
    });

    it('marks the native input readonly', () => {
      expect(input.readOnly).toBe(true);
    });

    it('flags the wrapper so the hover and pressed states are suppressed', () => {
      const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;
      expect(wrapper.classList.contains('readonly')).toBe(true);
    });

    it('keeps the grouped display on focus', async () => {
      const before = input.value;
      input.focus();
      await el.updateComplete;

      expect(input.value).toBe(before);
      expect(input.value).toContain(' ');
    });

    it('keeps its value across a focus/blur round trip', async () => {
      input.focus();
      await el.updateComplete;
      input.blur();
      await el.updateComplete;

      expect(el.value).toBe(1234.5);
    });
  });

  describe('caret placement', () => {
    const query = <T extends Element>(selector: string): T =>
      el.shadowRoot!.querySelector(selector) as T;

    const clickOn = (target: Element, clientX = 0): MouseEvent => {
      const event = new MouseEvent('click', {
        bubbles: true,
        composed: true,
        cancelable: true,
        clientX,
      });
      target.dispatchEvent(event);
      return event;
    };

    /** The caret is applied after the render that focusing schedules. */
    const settle = async () => {
      await el.updateComplete;
      await el.updateComplete;
    };

    beforeEach(async () => {
      // A fixed width keeps the label above the value rather than beside it, so the
      // geometry these tests assert on is deterministic.
      el.style.width = '260px';
      el.label = 'SV';
      el.unit = 'm/s';
      el.hasLeadingIcon = true;
      el.groupSeparator = ',';
      el.decimalSeparator = '.';
      el.maxFractionDigits = 6;
      el.value = 1234567.89;
      await el.updateComplete;
      input.blur();
      await el.updateComplete;
    });

    afterEach(() => {
      document.documentElement.style.removeProperty('zoom');
    });

    describe('clicks on the value', () => {
      it('leaves placement to the browser instead of computing an offset', async () => {
        input.focus();
        await el.updateComplete;
        input.setSelectionRange(3, 3);

        const event = clickOn(input, 100);
        await settle();

        expect(event.defaultPrevented).toBe(false);
        expect(input.selectionStart).toBe(3);
      });

      it('leaves placement to the browser under CSS zoom', async () => {
        document.documentElement.style.zoom = '0.75';
        input.focus();
        await el.updateComplete;
        input.setSelectionRange(4, 4);

        const event = clickOn(input, 100);
        await settle();

        expect(event.defaultPrevented).toBe(false);
        expect(input.selectionStart).toBe(4);
      });
    });

    describe('clicks on the surrounding chrome', () => {
      it('puts the caret after the value when the unit is clicked', async () => {
        clickOn(query('.unit-text'));
        await settle();

        expect(input.selectionStart).toBe(input.value.length);
      });

      it('puts the caret before the value when the leading icon is clicked', async () => {
        clickOn(query('.leading-icon'));
        await settle();

        expect(input.selectionStart).toBe(0);
      });

      it('puts the caret before the value when the label is clicked left of it', async () => {
        const box = input.getBoundingClientRect();
        clickOn(query('.label-text-container'), box.left - 20);
        await settle();

        expect(input.selectionStart).toBe(0);
      });

      it('puts the caret after the value when the label is clicked right of it', async () => {
        const box = input.getBoundingClientRect();
        clickOn(query('.label-text-container'), box.right + 20);
        await settle();

        expect(input.selectionStart).toBe(input.value.length);
      });

      it('focuses the input', async () => {
        clickOn(query('.unit-text'));
        await settle();

        expect(el.shadowRoot!.activeElement).toBe(input);
      });

      it('suppresses the default label activation', () => {
        const event = clickOn(query('.unit-text'));

        expect(event.defaultPrevented).toBe(true);
      });

      it('anchors to the end of the reformatted value, not the formatted one', async () => {
        const formattedLength = input.value.length;
        clickOn(query('.unit-text'));
        await settle();

        // Focusing drops the grouping, so the value is shorter than it was.
        expect(input.value.length).toBeLessThan(formattedLength);
        expect(input.selectionStart).toBe(input.value.length);
      });
    });

    describe('clicks on padding that wraps the value', () => {
      it('puts the caret before the value when clicked to its left', async () => {
        const box = input.getBoundingClientRect();
        clickOn(query('.label-container'), box.left - 20);
        await settle();

        expect(input.selectionStart).toBe(0);
      });

      it('puts the caret after the value when clicked to its right', async () => {
        const box = input.getBoundingClientRect();
        clickOn(query('.label-container'), box.right + 20);
        await settle();

        expect(input.selectionStart).toBe(input.value.length);
      });

      // A wrapper also reaches above and below the value, so a click can share the
      // value's horizontal range without being a click on it.
      it('puts the caret before the value when clicked over its left half', async () => {
        const box = input.getBoundingClientRect();
        clickOn(query('.label-container'), box.left + box.width * 0.25);
        await settle();

        expect(input.selectionStart).toBe(0);
      });

      it('puts the caret after the value when clicked over its right half', async () => {
        const box = input.getBoundingClientRect();
        clickOn(query('.label-container'), box.left + box.width * 0.75);
        await settle();

        expect(input.selectionStart).toBe(input.value.length);
      });
    });

    describe('under CSS zoom', () => {
      beforeEach(async () => {
        document.documentElement.style.zoom = '0.75';
        await el.updateComplete;
      });

      it('still puts the caret before the value for the leading icon', async () => {
        clickOn(query('.leading-icon'));
        await settle();

        expect(input.selectionStart).toBe(0);
      });

      it('still puts the caret after the value for the unit', async () => {
        clickOn(query('.unit-text'));
        await settle();

        expect(input.selectionStart).toBe(input.value.length);
      });

      it('resolves the same side as at zoom 1', async () => {
        clickOn(query('.leading-icon'));
        await settle();
        const zoomed = input.selectionStart;

        document.documentElement.style.removeProperty('zoom');
        input.blur();
        await el.updateComplete;
        clickOn(query('.leading-icon'));
        await settle();

        expect(zoomed).toBe(input.selectionStart);
      });
    });

    describe('inert states', () => {
      it('ignores clicks when disabled', async () => {
        el.disabled = true;
        await el.updateComplete;

        const event = clickOn(query('.unit-text'));

        expect(event.defaultPrevented).toBe(false);
      });

      it('ignores clicks when readonly', async () => {
        el.readonly = true;
        await el.updateComplete;

        const event = clickOn(query('.unit-text'));

        expect(event.defaultPrevented).toBe(false);
      });
    });

    describe('alignment variants', () => {
      const alignments = [
        ObcNumberInputFieldTextAlign.Right,
        ObcNumberInputFieldTextAlign.Center,
        ObcNumberInputFieldTextAlign.RightUnitOutside,
      ];

      for (const textAlign of alignments) {
        it(`anchors to the end from the unit when aligned ${textAlign}`, async () => {
          el.textAlign = textAlign;
          await el.updateComplete;

          clickOn(query('.unit-text'));
          await settle();

          expect(input.selectionStart).toBe(input.value.length);
        });

        it(`anchors to the start from the leading icon when aligned ${textAlign}`, async () => {
          el.textAlign = textAlign;
          await el.updateComplete;

          clickOn(query('.leading-icon'));
          await settle();

          expect(input.selectionStart).toBe(0);
        });
      }
    });

    it('does not throw when the field is empty', async () => {
      el.value = NaN;
      await el.updateComplete;

      clickOn(query('.unit-text'));
      await settle();

      expect(input.selectionStart).toBe(0);
    });
  });
});
