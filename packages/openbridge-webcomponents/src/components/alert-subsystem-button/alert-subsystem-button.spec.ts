import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './alert-subsystem-button.js';
import type {ObcAlertSubsystemButton} from './alert-subsystem-button.js';
import type {ObcIconButton} from '../icon-button/icon-button.js';
import type {ObcAlertCounterItem} from '../alert-counter-item/alert-counter-item.js';
import {tabStops} from '../../internal/_test-utils.js';

type ButtonProps = Partial<
  Pick<
    ObcAlertSubsystemButton,
    | 'counts'
    | 'hasAlert'
    | 'label'
    | 'disabled'
    | 'counterDisabled'
    | 'listDisabled'
  >
>;

async function setup(props: ButtonProps = {}) {
  const screen = render(
    html`<obc-alert-subsystem-button
      .counts=${props.counts ?? {countCaution: 2}}
      .hasAlert=${props.hasAlert ?? true}
      .label=${props.label ?? ''}
      .disabled=${props.disabled ?? false}
      .counterDisabled=${props.counterDisabled ?? false}
      .listDisabled=${props.listDisabled ?? false}
    ></obc-alert-subsystem-button>`
  );
  const el = screen.container.querySelector(
    'obc-alert-subsystem-button'
  ) as ObcAlertSubsystemButton;
  await el.updateComplete;
  const counterButton = el.shadowRoot!.querySelector(
    '[data-testid="counter-button"]'
  ) as HTMLButtonElement;
  const listButton = (
    el.shadowRoot!.querySelector('[data-testid="list-button"]') as ObcIconButton
  ).shadowRoot!.querySelector('button')!;
  return {el, counterButton, listButton};
}

describe('obc-alert-subsystem-button', () => {
  it('reports the counter and the list half as their own events, and lets no click out', async () => {
    const {el, counterButton, listButton} = await setup();
    const fired: string[] = [];
    for (const name of ['counter-click', 'alert-list-click', 'click']) {
      el.addEventListener(name, () => fired.push(name));
    }

    counterButton.click();
    listButton.click();

    expect(fired).toEqual(['counter-click', 'alert-list-click']);
  });

  it('disables the halves separately', async () => {
    const a = await setup({counterDisabled: true});
    expect([a.counterButton.disabled, a.listButton.disabled]).toEqual([
      true,
      false,
    ]);

    const b = await setup({listDisabled: true});
    expect([b.counterButton.disabled, b.listButton.disabled]).toEqual([
      false,
      true,
    ]);

    const c = await setup({disabled: true});
    expect([c.counterButton.disabled, c.listButton.disabled]).toEqual([
      true,
      true,
    ]);
  });

  it('passes the counts to the counter item and names the counter half', async () => {
    const {el, counterButton} = await setup({
      label: 'HVAC',
      counts: {countAlarm: 1, countCaution: 2},
    });
    const item = el.shadowRoot!.querySelector(
      'obc-alert-counter-item'
    ) as ObcAlertCounterItem;

    expect(item.counts).toEqual({countAlarm: 1, countCaution: 2});
    expect(counterButton.getAttribute('aria-label')).toBe(
      'HVAC, 1 Alarm, 2 Caution'
    );

    const empty = await setup({label: 'HVAC', hasAlert: false});
    expect(empty.counterButton.getAttribute('aria-label')).toBe(
      'HVAC, No alerts'
    );
  });

  it('is two tab stops', async () => {
    const screen = render(
      html`<button id="before">b</button>
        <obc-alert-subsystem-button></obc-alert-subsystem-button>`
    );
    await (
      screen.container.querySelector(
        'obc-alert-subsystem-button'
      ) as ObcAlertSubsystemButton
    ).updateComplete;
    (document.getElementById('before') as HTMLElement).focus();

    const stops = await tabStops(2);

    expect(
      stops.map((e) => e?.getAttribute('data-testid') ?? e?.tagName)
    ).toEqual(['counter-button', 'BUTTON']);
  });
});
