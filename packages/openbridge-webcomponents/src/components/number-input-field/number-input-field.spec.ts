import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import {userEvent} from '@vitest/browser/context';
import '../../main.css';
import './number-input-field.js';
import {
  ObcNumberInputField,
  ObcNumberInputFieldChangeEvent,
  ObcNumberInputFieldTextAlign,
} from './number-input-field.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

const FONT_PROPS = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'fontStretch',
  'fontFeatureSettings',
  'fontVariantNumeric',
  'fontVariationSettings',
  'fontKerning',
  'letterSpacing',
  'wordSpacing',
  'textTransform',
] as const;

/**
 * Cumulative advance of `text` after each of its characters, measured on a
 * mirror span carrying `reference`'s computed font, so a test can aim a click
 * at a character or check a width without guessing glyph metrics.
 */
function textAdvances(reference: Element, text: string): number[] {
  if (!text) return [0];
  const font = getComputedStyle(reference);
  const mirror = document.createElement('span');
  for (const prop of FONT_PROPS) mirror.style[prop] = font[prop];
  mirror.style.position = 'absolute';
  mirror.style.visibility = 'hidden';
  mirror.style.whiteSpace = 'pre';
  mirror.textContent = text;
  document.body.appendChild(mirror);
  const node = mirror.firstChild as Text;
  const range = document.createRange();
  const advances = Array.from({length: text.length + 1}, (_, end) => {
    range.setStart(node, 0);
    range.setEnd(node, end);
    return range.getBoundingClientRect().width;
  });
  mirror.remove();
  return advances;
}

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

    /** Focusing reformats the value in a follow-up render. */
    const settle = async () => {
      await el.updateComplete;
      await el.updateComplete;
    };

    /**
     * A real click a quarter of the way into character `index`, so the nearest
     * caret boundary is `index`. The text is right-aligned and unpadded, so its
     * last boundary is the input's right edge.
     */
    const clickIntoChar = async (index: number) => {
      const box = input.getBoundingClientRect();
      const advances = textAdvances(input, input.value);
      const textLeft = box.right - advances[advances.length - 1];
      const from = textLeft + advances[index];
      const to = textLeft + advances[index + 1];
      await userEvent.click(input, {
        position: {x: from + (to - from) / 4 - box.left, y: box.height / 2},
      });
      await settle();
    };

    beforeEach(async () => {
      // A fixed-width inline-block host keeps the label above the value, so
      // the geometry is the same in every run.
      document.body.classList.add('obc-component-size-regular');
      el.style.cssText = 'display:inline-block;width:320px;';
      el.label = 'SV';
      el.unit = 'm/s';
      el.groupSeparator = '';
      el.decimalSeparator = '.';
      el.value = 1234567.89;
      await document.fonts.ready;
      await settle();
    });

    afterEach(() => {
      document.documentElement.style.removeProperty('zoom');
      document.body.classList.remove('obc-component-size-regular');
      document.body.classList.remove('obc-component-size-large');
    });

    it('lands on the clicked character', async () => {
      const landed: number[] = [];
      for (const index of [0, 4, 9]) {
        await clickIntoChar(index);
        landed.push(input.selectionStart ?? -1);
      }

      expect(input.value).toBe('1234567.89');
      expect(landed).toEqual([0, 4, 9]);
    });

    for (const zoom of [0.75, 1.25]) {
      it(`lands on the clicked character under CSS zoom ${zoom}`, async () => {
        document.documentElement.style.zoom = String(zoom);

        await clickIntoChar(4);

        expect(input.selectionStart).toBe(4);
      });
    }

    it('lands on the clicked character in the large size class', async () => {
      document.body.classList.replace(
        'obc-component-size-regular',
        'obc-component-size-large'
      );

      await clickIntoChar(4);

      expect(input.selectionStart).toBe(4);
    });

    it('keeps the clicked character through the ungrouping that focus applies', async () => {
      el.groupSeparator = ',';
      await settle();
      expect(input.value).toBe('1,234,567.89');

      await clickIntoChar(10);

      expect(input.value).toBe('1234567.89');
      expect(input.selectionStart).toBe(8);
    });

    it('keeps focus and the unfinished edit when the unit is clicked mid-edit', async () => {
      const changes: number[] = [];
      el.addEventListener('change', (e) =>
        changes.push((e as ObcNumberInputFieldChangeEvent).detail.value)
      );
      el.value = 12;
      await settle();
      await userEvent.click(input);
      await userEvent.keyboard('{End}.');
      await settle();
      expect(input.value).toBe('12.');

      await userEvent.click(query('.unit-text'));
      await settle();

      expect(el.shadowRoot!.activeElement).toBe(input);
      expect(input.value).toBe('12.');
      expect(changes).toEqual([]);
    });

    it('focuses the input when the label is clicked', async () => {
      await userEvent.click(query('.label-text'));
      await settle();

      expect(el.shadowRoot!.activeElement).toBe(input);
      expect(input.selectionStart).toBe(input.value.length);
    });

    it('leaves a disabled field unfocused when its unit is clicked', async () => {
      el.disabled = true;
      await settle();

      // Playwright follows the label to its disabled control and would wait.
      await userEvent.click(query('.unit-text'), {force: true});
      await settle();

      expect(el.shadowRoot!.activeElement).toBeNull();
    });

    it('is reached with Tab', async () => {
      await userEvent.tab();

      expect(el.shadowRoot!.activeElement).toBe(input);
    });
  });

  describe('center-aligned width', () => {
    const settle = async () => {
      await el.updateComplete;
      await el.updateComplete;
    };

    beforeEach(async () => {
      document.body.classList.add('obc-component-size-regular');
      el.style.cssText = 'display:inline-block;width:320px;';
      el.textAlign = ObcNumberInputFieldTextAlign.Center;
      el.unit = 'm/s';
      await document.fonts.ready;
      await settle();
    });

    afterEach(() => {
      document.body.classList.remove('obc-component-size-regular');
    });

    it('follows the value in the font it is rendered with', async () => {
      el.style.setProperty('--global-typography-font-family', 'serif');
      el.value = 1234567.89;
      await settle();

      const advances = textAdvances(input, input.value);
      const width = advances[advances.length - 1];
      expect(Math.abs(input.offsetWidth - width)).toBeLessThanOrEqual(1);
      expect(Math.abs(input.offsetWidth - width)).toBeLessThanOrEqual(1);
    });

    it('is as wide as its placeholder when empty', async () => {
      el.placeholder = '000.000';
      el.value = NaN;
      await settle();

      const advances = textAdvances(input, '000.000');
      const width = advances[advances.length - 1];
      expect(Math.abs(input.offsetWidth - width)).toBeLessThanOrEqual(1);
    });
  });
});
