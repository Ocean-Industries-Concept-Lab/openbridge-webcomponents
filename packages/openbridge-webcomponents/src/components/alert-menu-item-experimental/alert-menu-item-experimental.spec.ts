import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-menu-item-experimental.js';
import type {
  ObcAlertMenuItemExperimental,
  ObcAlertMenuItemExperimentalActionClickEvent,
} from './alert-menu-item-experimental.js';
import type {ObcMessageMenuItem} from '../message-menu-item/message-menu-item.js';

async function setup(standard: string, criticality: string, state: string) {
  const screen = render(
    html`<obc-alert-menu-item-experimental
      .standard=${standard}
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

describe('obc-alert-menu-item-experimental', () => {
  it('shows a button for each action its state offers', async () => {
    const acknowledgeOnly = await setup(
      'iec-62923',
      'alarm',
      'active-unacknowledged'
    );
    const acknowledgeAndShelve = await setup(
      'isa-18.2',
      'high',
      'unacknowledged'
    );
    expect([
      actionButtonLabels(acknowledgeOnly.messageItem),
      actionButtonLabels(acknowledgeAndShelve.messageItem),
    ]).toEqual([
      ['ACK', ''],
      ['ACK', 'Shelve'],
    ]);
  });

  it('reports the id of the clicked action', async () => {
    const {el, messageItem} = await setup('isa-18.2', 'high', 'unacknowledged');
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
      'iec-62923',
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
    const {el} = await setup('iec-62923', 'caution', 'active');
    const icon = el.shadowRoot!.querySelector('obc-alert-icon-experimental')!;
    expect([icon.standard, icon.criticality, icon.state]).toEqual([
      'iec-62923',
      'caution',
      'active',
    ]);
  });

  it('follows a state change', async () => {
    const {el, messageItem} = await setup(
      'iec-62923',
      'alarm',
      'active-unacknowledged'
    );
    el.state = 'active-acknowledged';
    await el.updateComplete;
    expect(actionButtonLabels(messageItem)).toEqual(['', '']);
  });
});
