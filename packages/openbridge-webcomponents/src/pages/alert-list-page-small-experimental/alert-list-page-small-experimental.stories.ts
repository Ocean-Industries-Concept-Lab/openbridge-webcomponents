import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-list-page-small-experimental.js';
import {
  ObcAlertListPageSmallExperimental,
  ObcAlertListPageSmallExperimentalAckAllClickEvent,
  ObcAlertListPageSmallExperimentalActionClickEvent,
} from './alert-list-page-small-experimental.js';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {
  alertsInEveryKindOfStateOfTheConfiguredStandard,
  applyActionToAlerts,
  drawStoryWithAlertStandard,
  type StoryAlert,
} from '../../storybook-util.js';

const applyAction = (
  page: ObcAlertListPageSmallExperimental,
  alerts: StandardAlert[],
  actionId: string
) => {
  page.alerts = applyActionToAlerts(
    page.alerts as StoryAlert[],
    new Set(alerts.map((alert) => alert.id)),
    actionId
  );
};

const alertsOfTheConfiguredStandard = (): StandardAlert[] =>
  alertsInEveryKindOfStateOfTheConfiguredStandard();

const meta: Meta<ObcAlertListPageSmallExperimental> = {
  title: 'Pages/Alert List Small Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-page-small-experimental',
  beforeEach: drawStoryWithAlertStandard('iec-62923'),
  args: {
    filterId: 'active',
    showTime: true,
  },
  render: (args) =>
    html`<obc-alert-list-page-small-experimental
      .filterId=${args.filterId}
      .showTime=${args.showTime}
      .alerts=${alertsOfTheConfiguredStandard()}
      @action-click=${(
        event: ObcAlertListPageSmallExperimentalActionClickEvent
      ) =>
        applyAction(
          event.currentTarget as ObcAlertListPageSmallExperimental,
          [event.detail.alert],
          event.detail.actionId
        )}
      @ack-all-visible-click=${(
        event: ObcAlertListPageSmallExperimentalAckAllClickEvent
      ) =>
        applyAction(
          event.currentTarget as ObcAlertListPageSmallExperimental,
          event.detail.alerts,
          ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
        )}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-page-small-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertListPageSmallExperimental>;

export const Regular: Story = {};

export const Automation: Story = {
  beforeEach: drawStoryWithAlertStandard('isa-18.2'),
  parameters: {
    docs: {
      description: {
        story:
          'ISA-18.2 lets several alarms be acknowledged at once, so the page offers ACK visible, and its dropdown lists the five filters the standard declares. Under IEC 62923, as in the other stories, there is no ACK visible: MSC.302 9.9 asks for one alarm at a time.',
      },
    },
  },
};

export const Unacked: Story = {
  args: {filterId: 'unacked'},
};

export const Empty: Story = {
  render: () =>
    html`<obc-alert-list-page-small-experimental
      style="height: 100vh; display: block;"
    ></obc-alert-list-page-small-experimental>`,
};
