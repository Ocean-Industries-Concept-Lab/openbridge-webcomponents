import {describe, it, expect, beforeEach, vi} from 'vitest';
import './stepper-box.js';
import {ObcStepperBox} from './stepper-box.js';
import {ObcNumberInputField} from '../number-input-field/number-input-field.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-stepper-box', () => {
  let el: ObcStepperBox;
  let field: ObcNumberInputField;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const screen = render(
      html`<obc-stepper-box
        .value=${10}
        .min=${0}
        .max=${100}
      ></obc-stepper-box>`
    );
    el = screen.baseElement.querySelector('obc-stepper-box') as ObcStepperBox;
    await el.updateComplete;
    field = el.shadowRoot!.querySelector(
      'obc-number-input-field'
    ) as ObcNumberInputField;
    await field.updateComplete;
    input = field.shadowRoot!.querySelector('.value-input') as HTMLInputElement;
  });

  const type = async (text: string) => {
    input.focus();
    input.value = text;
    input.dispatchEvent(new InputEvent('input', {bubbles: true}));
    await field.updateComplete;
    await el.updateComplete;
  };

  const blur = async () => {
    input.blur();
    await field.updateComplete;
    await el.updateComplete;
  };

  describe('input event', () => {
    it('dispatches input with the raw text on every keystroke', async () => {
      const handler = vi.fn();
      el.addEventListener('input', handler);

      await type('12');
      await type('12.');

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler.mock.calls[0][0].detail).toEqual({value: '12'});
      expect(handler.mock.calls[1][0].detail).toEqual({value: '12.'});
      expect(el.value).toBe(12);
    });

    it('does not dispatch change while editing', async () => {
      const handler = vi.fn();
      el.addEventListener('change', handler);

      await type('12');
      await type('12.5');

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('change event', () => {
    it('dispatches change once when the edit is committed', async () => {
      const handler = vi.fn();
      el.addEventListener('change', handler);

      await type('12.5');
      await blur();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail).toEqual({value: 12.5});
      expect(el.value).toBe(12.5);
    });

    it('does not dispatch change when the committed value is unchanged', async () => {
      const handler = vi.fn();
      el.addEventListener('change', handler);

      await type('10');
      await blur();

      expect(handler).not.toHaveBeenCalled();
    });

    it('commits null when the field is cleared', async () => {
      const handler = vi.fn();
      el.addEventListener('change', handler);

      await type('');
      await blur();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail).toEqual({value: null});
      expect(el.value).toBeNull();
    });
  });

  describe('step buttons', () => {
    it('dispatches up and change', async () => {
      const up = vi.fn();
      const change = vi.fn();
      el.addEventListener('up', up);
      el.addEventListener('change', change);

      el.up();
      await el.updateComplete;

      expect(el.value).toBe(11);
      expect(up.mock.calls[0][0].detail).toEqual({value: 11});
      expect(change.mock.calls[0][0].detail).toEqual({value: 11});
    });

    it('dispatches down and change', async () => {
      const down = vi.fn();
      const change = vi.fn();
      el.addEventListener('down', down);
      el.addEventListener('change', change);

      el.down();
      await el.updateComplete;

      expect(el.value).toBe(9);
      expect(down.mock.calls[0][0].detail).toEqual({value: 9});
      expect(change.mock.calls[0][0].detail).toEqual({value: 9});
    });
  });

  describe('value update rejection', () => {
    it('forwards the rejection properties to the number input field', async () => {
      el.rejectUpdatesOnFocus = true;
      el.rejectUpdates = true;
      el.rejectDuplicateUpdates = true;
      await el.updateComplete;

      expect(field.rejectUpdatesOnFocus).toBe(true);
      expect(field.rejectUpdates).toBe(true);
      expect(field.rejectDuplicateUpdates).toBe(true);
    });

    it('keeps the typed text when an external value update arrives while focused', async () => {
      el.rejectUpdatesOnFocus = true;
      await el.updateComplete;

      await type('42');
      el.value = 10;
      await el.updateComplete;
      await field.updateComplete;

      expect(input.value).toBe('42');
    });
  });
});
