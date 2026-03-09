import {describe, it, expect, beforeEach} from 'vitest';
import './text-input-field.js';
import {ObcTextInputField} from './text-input-field.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-text-input-field rejectUpdates', () => {
  let el: ObcTextInputField;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const screen = render(
      html`<obc-text-input-field
        value="hello"
        .rejectUpdates=${true}
      ></obc-text-input-field>`
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
  it('keeps user-typed value when property is set back to previous', async () => {
    el.value = 'hello world';
    await el.updateComplete;

    expect(input.value).toBe('hello');
  });
});

describe('obc-text-input-field rejectUpdatesOnFocus', () => {
  let el: ObcTextInputField;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const screen = render(
      html`<obc-text-input-field
        value="hello"
        .rejectUpdatesOnFocus=${true}
      ></obc-text-input-field>`
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
describe('obc-text-input-field rejectDuplicateUpdates', () => {
  let el: ObcTextInputField;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const screen = render(
      html`<obc-text-input-field
        value="hello"
        .rejectDuplicateUpdates=${true}
      ></obc-text-input-field>`
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
