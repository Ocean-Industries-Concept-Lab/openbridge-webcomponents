import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-menu-experimental.js';
import {ObcAlertMenuExperimental} from './alert-menu-experimental.js';
import '../alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {
  ObcAlertMenuItemExperimental,
  ObcAlertMenuItemExperimentalActionClickEvent,
} from '../alert-menu-item-experimental/alert-menu-item-experimental.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {iec62923StateAfterAction} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

function moveIec62923ItemToStateAfterAction(
  event: ObcAlertMenuItemExperimentalActionClickEvent
) {
  const item = event.currentTarget as ObcAlertMenuItemExperimental;
  item.state = iec62923StateAfterAction(item.state, event.detail.actionId);
}

const iec62923ItemsInEveryKindOfState = html`
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="active-unacknowledged"
    title="alarm"
    description="Active, unacknowledged"
    time="14:39:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="active-acknowledged"
    title="alarm"
    description="Active, acknowledged"
    time="14:38:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="rectified-unacknowledged"
    title="alarm"
    description="Rectified, unacknowledged"
    time="14:37:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="normal"
    title="alarm"
    description="Normal"
    time="14:36:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="caution"
    state="active"
    title="caution"
    description="Caution, takes no ACK"
    time="14:35:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="warning"
    state="active-unacknowledged-acknowledge-not-allowed"
    title="warning"
    description="Acknowledged elsewhere"
    time="14:34:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="warning"
    state="active-responsibility-transferred"
    title="warning"
    description="Responsibility transferred"
    time="14:33:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
`;

const meta: Meta<ObcAlertMenuExperimental> = {
  title: 'Application Components/Alerts/Alert Menu Experimental/IEC 62923',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-experimental',
  args: {
    canAckAll: true,
    showSilenceButton: true,
    showAlertListButton: true,
  },
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertMenuExperimental'),
          'iec62923AlertStandard'
        ),
      },
    },
  },
  render: (args) => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-menu-experimental
      .canAckAll=${args.canAckAll}
      .showSilenceButton=${args.showSilenceButton}
      .showAlertListButton=${args.showAlertListButton}
    >
      ${iec62923ItemsInEveryKindOfState}
    </obc-alert-menu-experimental>`;
  },
};

export default meta;
type Story = StoryObj<ObcAlertMenuExperimental>;

export const Regular: Story = {};

export const Empty: Story = {
  render: () => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-menu-experimental></obc-alert-menu-experimental>`;
  },
};
