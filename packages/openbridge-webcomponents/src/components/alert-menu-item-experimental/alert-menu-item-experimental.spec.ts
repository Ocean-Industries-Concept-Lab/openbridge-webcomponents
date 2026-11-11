import {afterEach, describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-menu-item-experimental.js';
import type {
  ObcAlertMenuItemExperimental,
  ObcAlertMenuItemExperimentalActionClickEvent,
} from './alert-menu-item-experimental.js';
import type {ObcMessageMenuItem} from '../message-menu-item/message-menu-item.js';
import type {AlertStandard} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';

async function setup(
  standard: AlertStandard,
  criticality: string,
  state: string
) {
  setAlertStandard(standard);
  const screen = render(
    html`<obc-alert-menu-item-experimental
      .criticality=${criticality}
      .state=${state}
    ></obc-alert-menu-item-experimental>`
  );
  const el = screen.container.querySelector(
    'obc-alert-menu-item-experimental'
  ) as ObcAlertMenuItemExperimental;
  await el.updateComplete;
  const messageItem = el.shadowRoot!.querySelector(
    'obc-message-menu-item'
  ) as ObcMessageMenuItem;
  return {el, messageItem};
}

const actionButtonLabels = (messageItem: ObcMessageMenuItem) => [
  messageItem.primaryActionLabel,
  messageItem.secondaryActionLabel,
];

afterEach(() => setAlertStandard(undefined));

describe('obc-alert-menu-item-experimental', () => {
  it('shows one button where its state offers one action', async () => {
    const {messageItem} = await setup(
      iec62923AlertStandard,
      'alarm',
      'active-unacknowledged'
    );
    expect(actionButtonLabels(messageItem)).toEqual(['ACK', '']);
  });

  it('shows two buttons where its state offers two actions', async () => {
    const {messageItem} = await setup(
      isa182AlertStandard,
      'high',
      'unacknowledged'
    );
    expect(actionButtonLabels(messageItem)).toEqual(['ACK', 'Shelve']);
  });

  it('reports the id of the clicked action', async () => {
    const {el, messageItem} = await setup(
      isa182AlertStandard,
      'high',
      'unacknowledged'
    );
    const clickedActionIds: string[] = [];
    el.addEventListener('action-click', (event) =>
      clickedActionIds.push(
        (event as ObcAlertMenuItemExperimentalActionClickEvent).detail.actionId
      )
    );
    messageItem.dispatchEvent(new CustomEvent('primary-action-click'));
    messageItem.dispatchEvent(new CustomEvent('secondary-action-click'));
    expect(clickedActionIds).toEqual(['acknowledge', 'shelve']);
  });

  it('shows the glyph its standard defines where the state offers no action', async () => {
    const {el, messageItem} = await setup(
      iec62923AlertStandard,
      'warning',
      'active-unacknowledged-acknowledge-not-allowed'
    );
    expect(actionButtonLabels(messageItem)).toEqual(['', '']);
    expect(
      el.shadowRoot!.querySelector('.glyph-shown-instead-of-actions > *')
        ?.localName
    ).toBe('obi-warning-noack-iec');
  });

  it('draws the icon of its criticality and state', async () => {
    const {el} = await setup(iec62923AlertStandard, 'caution', 'active');
    const icon = el.shadowRoot!.querySelector('obc-alert-icon-experimental')!;
    expect([icon.criticality, icon.state]).toEqual(['caution', 'active']);
  });

  it('follows a state change', async () => {
    const {el, messageItem} = await setup(
      iec62923AlertStandard,
      'alarm',
      'active-unacknowledged'
    );
    el.state = 'active-acknowledged';
    await el.updateComplete;
    expect(actionButtonLabels(messageItem)).toEqual(['', '']);
  });
});
