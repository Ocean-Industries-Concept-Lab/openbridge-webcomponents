import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import '../hydraulic-valve-4-3/hydraulic-valve-4-3.js';
import type {ObcHydraulicValve43} from '../hydraulic-valve-4-3/hydraulic-valve-4-3.js';
import type {PositionSelectedEvent} from './shuffle-button-base.js';
import {deepActiveElement, tabStops} from '../../internal/_test-utils.js';

interface Harness {
  el: ObcHydraulicValve43;
  requested: number[];
}

/**
 * Renders the three-position valve with a neighbour to tab onto, so the
 * group's tab-stop count is observable.
 *
 * Selection is controlled, so `position-selected` is wired back into
 * `selectedPosition` the way the stories do; `confirmSelection: false` plays
 * the host that has not confirmed yet.
 */
async function setup(
  selectedPosition = 1,
  {confirmSelection = true} = {}
): Promise<Harness> {
  const requested: number[] = [];
  const screen = render(
    html`<obc-hydraulic-valve-4-3
        .selectedPosition=${selectedPosition}
        @position-selected=${(event: PositionSelectedEvent) => {
          requested.push(event.detail.position);
          if (confirmSelection) {
            (event.target as ObcHydraulicValve43).selectedPosition =
              event.detail.position;
          }
        }}
      ></obc-hydraulic-valve-4-3>
      <button id="after">after</button>`
  );
  const el = screen.container.querySelector(
    'obc-hydraulic-valve-4-3'
  ) as ObcHydraulicValve43;
  await el.updateComplete;
  return {el, requested};
}

function thumbs(el: ObcHydraulicValve43): HTMLButtonElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll('button.thumb'));
}

function checkedStates(el: ObcHydraulicValve43): (string | null)[] {
  return thumbs(el).map((thumb) => thumb.getAttribute('aria-checked'));
}

describe('obc-hydraulic-valve-4-3 keyboard', () => {
  it('takes one tab stop for the whole group, landing on the selected position', async () => {
    const {el} = await setup(1);

    const [insideGroup, pastGroup] = await tabStops(2);

    expect(insideGroup).toBe(thumbs(el)[1]);
    expect((pastGroup as HTMLElement).id).toBe('after');
  });

  it('shows the focus ring when the group is entered with Tab', async () => {
    const {el} = await setup(1);

    await userEvent.tab();

    expect(thumbs(el)[1].matches(':focus-visible')).toBe(true);
  });

  it('moves focus and selection to the next position on ArrowRight and ArrowDown', async () => {
    const {el} = await setup(0);
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');
    await el.updateComplete;

    expect(el.selectedPosition).toBe(1);
    expect(deepActiveElement()).toBe(thumbs(el)[1]);

    await userEvent.keyboard('{ArrowDown}');
    await el.updateComplete;

    expect(el.selectedPosition).toBe(2);
    expect(deepActiveElement()).toBe(thumbs(el)[2]);
  });

  it('moves focus and selection to the previous position on ArrowLeft and ArrowUp', async () => {
    const {el} = await setup(2);
    await userEvent.tab();

    await userEvent.keyboard('{ArrowLeft}');
    await el.updateComplete;

    expect(el.selectedPosition).toBe(1);
    expect(deepActiveElement()).toBe(thumbs(el)[1]);

    await userEvent.keyboard('{ArrowUp}');
    await el.updateComplete;

    expect(el.selectedPosition).toBe(0);
    expect(deepActiveElement()).toBe(thumbs(el)[0]);
  });

  it('wraps around at both ends of the group', async () => {
    const {el} = await setup(2);
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');
    await el.updateComplete;

    expect(el.selectedPosition).toBe(0);

    await userEvent.keyboard('{ArrowLeft}');
    await el.updateComplete;

    expect(el.selectedPosition).toBe(2);
  });

  it('checks a focused-but-unchecked position on Space', async () => {
    const {el} = await setup(1);
    await userEvent.tab();
    thumbs(el)[2].focus();

    await userEvent.keyboard(' ');
    await el.updateComplete;

    expect(el.selectedPosition).toBe(2);
    expect(checkedStates(el)).toEqual(['false', 'false', 'true']);
  });

  it('marks only the selected position aria-checked', async () => {
    const {el} = await setup(0);

    expect(checkedStates(el)).toEqual(['true', 'false', 'false']);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    await el.updateComplete;

    expect(checkedStates(el)).toEqual(['false', 'true', 'false']);
  });

  it('requests a position without checking it until the host confirms', async () => {
    const {el, requested} = await setup(1, {confirmSelection: false});
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');
    await el.updateComplete;

    expect(requested).toEqual([2]);
    expect(el.selectedPosition).toBe(1);
    expect(checkedStates(el)).toEqual(['false', 'true', 'false']);
  });
});

describe('obc-hydraulic-valve-4-3 names', () => {
  it('names each position, so a radio announces more than its index', async () => {
    const {el} = await setup();

    expect(thumbs(el).map((thumb) => thumb.getAttribute('aria-label'))).toEqual(
      ['Position 1', 'Position 2', 'Position 3']
    );
  });
});
