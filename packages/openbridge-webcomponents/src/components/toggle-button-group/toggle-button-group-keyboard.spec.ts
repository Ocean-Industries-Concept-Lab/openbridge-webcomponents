import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './toggle-button-group.js';
import '../toggle-button-option/toggle-button-option.js';
import type {ObcToggleButtonGroup} from './toggle-button-group.js';
import type {ObcToggleButtonOption} from '../toggle-button-option/toggle-button-option.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * A single-select group of buttons is a radio group to the keyboard
 * (https://www.w3.org/WAI/ARIA/apg/patterns/radio/): one tab stop on the
 * selected option, arrows move focus and selection together, wrapping.
 * With `externalControl` the arrows only ask, the way a click only asks.
 */
async function setup(externalControl = false) {
  const changes: string[] = [];
  const screen = render(
    html`<button id="before">before</button>
      <obc-toggle-button-group
        value="2"
        aria-label="Mode"
        .externalControl=${externalControl}
        @change=${(event: CustomEvent<{value: string}>) =>
          changes.push(event.detail.value)}
      >
        <obc-toggle-button-option value="1">One</obc-toggle-button-option>
        <obc-toggle-button-option value="2">Two</obc-toggle-button-option>
        <obc-toggle-button-option value="3" disabled
          >Three</obc-toggle-button-option
        >
        <obc-toggle-button-option value="4">Four</obc-toggle-button-option>
      </obc-toggle-button-group>
      <button id="after">after</button>`
  );
  const el = screen.container.querySelector(
    'obc-toggle-button-group'
  ) as ObcToggleButtonGroup;
  await el.updateComplete;
  await Promise.all(options(el).map((option) => option.updateComplete));
  return {el, changes};
}

function options(el: ObcToggleButtonGroup): ObcToggleButtonOption[] {
  return Array.from(el.querySelectorAll('obc-toggle-button-option'));
}

function focusedValue(el: ObcToggleButtonGroup): string | undefined {
  return options(el).find((option) => containsDeep(option, deepActiveElement()))
    ?.value;
}

describe('obc-toggle-button-group keyboard', () => {
  it('is one tab stop, entered on the selected option and left on the next Tab', async () => {
    const {el} = await setup();
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(focusedValue(el)).toBe('2');
    await userEvent.tab();
    expect(deepActiveElement()?.id).toBe('after');
  });

  it('moves focus and selection together on the arrow keys, skipping a disabled option', async () => {
    const {el, changes} = await setup();
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');
    expect(focusedValue(el)).toBe('4');
    expect(el.value).toBe('4');
    await userEvent.keyboard('{ArrowLeft}');
    expect(focusedValue(el)).toBe('2');
    expect(el.value).toBe('2');

    expect(changes).toEqual(['4', '2']);
  });

  it('wraps from the last option to the first', async () => {
    const {el} = await setup();
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowRight}');

    expect(el.value).toBe('1');
    expect(focusedValue(el)).toBe('1');
  });

  it('only asks for the next option under externalControl, like a click does', async () => {
    const {el, changes} = await setup(true);
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');

    expect(changes).toEqual(['4']);
    expect(el.value).toBe('2');
    expect(focusedValue(el)).toBe('2');
  });

  it('follows an accepted request under externalControl: focus and the tab stop move with the value', async () => {
    const {el, changes} = await setup(true);
    el.addEventListener('change', (event) => {
      el.value = (event as CustomEvent<{value: string}>).detail.value;
    });
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');
    await el.updateComplete;
    expect(el.value).toBe('4');
    expect(focusedValue(el)).toBe('4');
    await userEvent.keyboard('{ArrowRight}');
    await el.updateComplete;

    expect(el.value).toBe('1');
    expect(focusedValue(el)).toBe('1');
    expect(changes).toEqual(['4', '1']);
  });

  it('is a labelled radio group whose options carry aria-checked', async () => {
    const {el} = await setup();

    const group = el.shadowRoot!.querySelector('[role="radiogroup"]');
    expect(group?.getAttribute('aria-label')).toBe('Mode');
    const radios = options(el).map((option) =>
      option.shadowRoot!.querySelector('button')
    );
    expect(radios.map((radio) => radio?.getAttribute('role'))).toEqual([
      'radio',
      'radio',
      'radio',
      'radio',
    ]);
    expect(radios.map((radio) => radio?.getAttribute('aria-checked'))).toEqual([
      'false',
      'true',
      'false',
      'false',
    ]);
  });
});
