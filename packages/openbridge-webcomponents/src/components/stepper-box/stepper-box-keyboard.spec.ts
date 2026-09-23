import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './stepper-box.js';
import type {ObcStepperBox} from './stepper-box.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * APG Spinbutton keys (https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/):
 * Up and Down step the value, Home and End go to the bounds. The keys work
 * wherever focus sits inside the stepper, on the field or on a step button.
 */
async function setup(overrides: Partial<ObcStepperBox> = {}) {
  const changes: (number | null)[] = [];
  const screen = render(
    html`<button id="before">before</button>
      <obc-stepper-box
        .value=${5}
        .min=${0}
        .max=${10}
        .stepUp=${2}
        .stepDown=${1}
        .readonly=${overrides.readonly ?? false}
        @change=${(event: CustomEvent<{value: number | null}>) =>
          changes.push(event.detail.value)}
      ></obc-stepper-box>`
  );
  const el = screen.container.querySelector('obc-stepper-box') as ObcStepperBox;
  await el.updateComplete;
  const field = el.shadowRoot!.querySelector(
    'obc-number-input-field'
  ) as HTMLElement;
  await (field as unknown as {updateComplete: Promise<unknown>}).updateComplete;
  return {el, changes, field};
}

function focusField(field: HTMLElement) {
  (field.shadowRoot!.querySelector('input') as HTMLElement).focus();
}

describe('obc-stepper-box keyboard', () => {
  it('steps the value up and down with the arrow keys from the field', async () => {
    const {el, changes, field} = await setup();
    focusField(field);

    await userEvent.keyboard('{ArrowUp}');
    expect(el.value).toBe(7);
    await userEvent.keyboard('{ArrowDown}');
    expect(el.value).toBe(6);

    expect(changes).toEqual([7, 6]);
  });

  it('goes to the bounds on End and Home from a step button, and stops there', async () => {
    const {el} = await setup();
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{End}');
    expect(el.value).toBe(10);
    await userEvent.keyboard('{ArrowUp}');
    expect(el.value).toBe(10);
    await userEvent.keyboard('{Home}');
    expect(el.value).toBe(0);
    await userEvent.keyboard('{ArrowDown}');
    expect(el.value).toBe(0);
  });

  it('steps from a focused step button as well', async () => {
    const {el} = await setup();
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(containsDeep(el, deepActiveElement())).toBe(true);
    await userEvent.keyboard('{ArrowUp}');

    expect(el.value).toBe(7);
  });

  it('leaves Home and End to the caret while focus is in the field', async () => {
    const {el, field} = await setup();
    focusField(field);

    await userEvent.keyboard('{End}');
    await userEvent.keyboard('{Home}');

    expect(el.value).toBe(5);
  });

  it('ignores the keys when readonly', async () => {
    const {el, changes, field} = await setup({readonly: true});
    focusField(field);

    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{ArrowDown}');

    expect(el.value).toBe(5);
    expect(changes).toEqual([]);
  });
});
