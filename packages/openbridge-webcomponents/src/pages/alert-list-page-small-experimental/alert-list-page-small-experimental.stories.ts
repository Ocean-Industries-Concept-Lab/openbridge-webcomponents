import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-list-page-small-experimental.js';
import {
  ObcAlertListPageSmallExperimentalAckClickEvent,
  ObcAlertListPageSmallExperimental,
  ObcAlertListPageSmallExperimentalAckAllClickEvent,
} from './alert-list-page-small-experimental.js';
import {AlertFilterMode, canAcknowledge} from '../../alert-filter.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';

/** The standards the `standard` control offers, both built into the library. */
type BuiltInStandard = 'iec-62923' | 'isa-18.2' | undefined;
import {acknowledgeAlerts, alertsInEveryState} from '../../storybook-util.js';

const ack = (
  page: ObcAlertListPageSmallExperimental,
  acked: StandardAlert[]
) => {
  const ids = new Set(
    acked.filter((alert) => canAcknowledge(alert)).map((alert) => alert.id)
  );
  page.alerts = acknowledgeAlerts(page.alerts, ids);
};

const meta: Meta<ObcAlertListPageSmallExperimental> = {
  title: 'Pages/Alert List Small Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-page-small-experimental',
  args: {
    filterMode: AlertFilterMode.Active,
    hasShelved: true,
    hasBlocked: true,
    showTime: true,
  },
  argTypes: {
    standard: {
      control: {type: 'select'},
      options: ['iec-62923', 'isa-18.2'],
    },
    filterMode: {
      control: {type: 'select'},
      options: [
        AlertFilterMode.Active,
        AlertFilterMode.Unacked,
        AlertFilterMode.Shelved,
        AlertFilterMode.Blocked,
      ],
    },
  },
  render: (args) =>
    html`<obc-alert-list-page-small-experimental
      .standard=${args.standard}
      .filterMode=${args.filterMode}
      .hasShelved=${args.hasShelved}
      .hasBlocked=${args.hasBlocked}
      .showTime=${args.showTime}
      .alerts=${alertsInEveryState(args.standard as BuiltInStandard)}
      @ack-click=${(e: ObcAlertListPageSmallExperimentalAckClickEvent) =>
        ack(e.currentTarget as ObcAlertListPageSmallExperimental, [
          e.detail.alert,
        ])}
      @ack-all-visible-click=${(
        e: ObcAlertListPageSmallExperimentalAckAllClickEvent
      ) =>
        ack(
          e.currentTarget as ObcAlertListPageSmallExperimental,
          e.detail.alerts
        )}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-page-small-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertListPageSmallExperimental>;

export const Regular: Story = {};

export const Automation: Story = {
  args: {standard: 'isa-18.2'},
  parameters: {
    docs: {
      description: {
        story:
          'ISA-18.2 lets several alarms be acknowledged at once, so the page offers ACK visible. Under IEC 62923, the default, it does not: MSC.302 9.9 asks for one alarm at a time.',
      },
    },
  },
};

export const Unacked: Story = {
  args: {filterMode: AlertFilterMode.Unacked},
};

export const Empty: Story = {
  render: () =>
    html`<obc-alert-list-page-small-experimental
      hasShelved
      hasBlocked
      style="height: 100vh; display: block;"
    ></obc-alert-list-page-small-experimental>`,
};
