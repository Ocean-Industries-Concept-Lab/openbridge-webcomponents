import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {AlertDetailPageType, ObcAlertDetailPage} from './alert-detail-page.js';
import './alert-detail-page.js';
import '../../components/alert-icon/alert-icon.js';
import '../../icons/icon-alert-category-a.js';
import '../../icons/icon-alarm-badge-outline.js';
import {html} from 'lit';
import {Alert, AlertCategory, AlertType} from '../../types.js';

const alert: Alert = {
  tagId: '#000000',
  id: '1',
  source: 'Source',
  text: 'Description here. This alert has been triggered due to a detected anomaly.',
  acknowledged: false,
  active: true,
  type: AlertType.Alarm,
  time: new Date('2024-01-15T14:32:15Z'),
  category: AlertCategory.a,
};

const meta: Meta<typeof ObcAlertDetailPage> = {
  title: 'Pages/Alert detail page',
  tags: ['6.0'],
  component: 'obc-alert-detail-page',
  args: {
    hasActions: true,
    hasReadoutGraph: true,
    hasTagId: true,
    hasCategory: true,
    hasActivated: true,
    hasTimer: true,
    alert: alert,
    // mock timeSinceFormatter for consistent snapshots
    timeSinceFormatter: (_time: Date) => {
      return '12s';
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(AlertDetailPageType),
    },
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        .type=${args.type}
        .alert=${args.alert}
        .hasActions=${args.hasActions}
        .hasReadoutGraph=${args.hasReadoutGraph}
        .hasTagId=${args.hasTagId}
        .hasCategory=${args.hasCategory}
        .hasActivated=${args.hasActivated}
        .hasTimer=${args.hasTimer}
        .hasAcknowledged=${args.hasAcknowledged}
        .hasAcknowledgedBy=${args.hasAcknowledgedBy}
        .hasRectified=${args.hasRectified}
        .hasShelvingTimer=${args.hasShelvingTimer}
        .hasShelvedBy=${args.hasShelvedBy}
        .timeSinceFormatter=${args.timeSinceFormatter}
        style="height: ${args.type === AlertDetailPageType.page
          ? 'calc(100vh - 2rem)'
          : 'unset'}; display: block;"
      >
        <div
          slot="readout-graph"
          style="height: 200px; width: 100%; background: hsl(210, 100%, 90%);"
        ></div>
        <obc-button slot="action" fullWidth> Shelf </obc-button>
        <obc-button slot="action" fullWidth variant="raised">ACK </obc-button>
      </obc-alert-detail-page>
    `;
  },
} satisfies Meta<ObcAlertDetailPage>;

export default meta;
type Story = StoryObj<ObcAlertDetailPage>;

export const Page: Story = {
  args: {
    type: AlertDetailPageType.page,
    height: '100vh',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Card: Story = {
  args: {
    type: AlertDetailPageType.card,
  },
};

export const Modal: Story = {
  args: {
    type: AlertDetailPageType.modal,
  },
};

export const Resolved: Story = {
  args: {
    type: AlertDetailPageType.modal,
    alert: {
      ...alert,
      active: {
        rectifiedTime: new Date('2024-01-15T14:36:15Z'),
      },
      acknowledged: {
        acknowledgedBy: 'John Doe',
        acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
      },
    },
    hasAcknowledged: true,
    hasAcknowledgedBy: true,
    hasRectified: true,
    hasTimer: undefined,
    hasActions: undefined,
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        .type=${args.type}
        .alert=${args.alert}
        .hasActions=${args.hasActions}
        .hasReadoutGraph=${args.hasReadoutGraph}
        .hasTagId=${args.hasTagId}
        .hasCategory=${args.hasCategory}
        .hasActivated=${args.hasActivated}
        .hasTimer=${args.hasTimer}
        .hasAcknowledged=${args.hasAcknowledged}
        .hasAcknowledgedBy=${args.hasAcknowledgedBy}
        .hasRectified=${args.hasRectified}
        .hasShelvingTimer=${args.hasShelvingTimer}
        .hasShelvedBy=${args.hasShelvedBy}
        .timeSinceFormatter=${args.timeSinceFormatter}
        style="height: ${args.height}; display: block;"
      >
        <div
          slot="readout-graph"
          style="height: 200px; width: 100%; background: hsl(210, 100%, 90%);"
        ></div>
      </obc-alert-detail-page>
    `;
  },
};

export const Shelved: Story = {
  args: {
    type: AlertDetailPageType.modal,
    alert: {
      ...alert,
      shelved: {
        shelvedStartTime: new Date('2024-01-15T14:34:00Z'),
        shelvedBy: 'John Doe',
      },
    },
    hasShelvedBy: true,
    hasShelvingTimer: true,
    hasTimer: undefined,
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        .type=${args.type}
        .alert=${args.alert}
        .hasNote=${args.hasNote}
        .hasActions=${args.hasActions}
        .hasReadoutGraph=${args.hasReadoutGraph}
        .hasTagId=${args.hasTagId}
        .hasCategory=${args.hasCategory}
        .hasActivated=${args.hasActivated}
        .hasTimer=${args.hasTimer}
        .hasAcknowledged=${args.hasAcknowledged}
        .hasAcknowledgedBy=${args.hasAcknowledgedBy}
        .hasRectified=${args.hasRectified}
        .hasShelvingTimer=${args.hasShelvingTimer}
        .hasShelvedBy=${args.hasShelvedBy}
        .timeSinceFormatter=${args.timeSinceFormatter}
        style="height: ${args.height}; display: block;"
      >
        <obc-alert-icon slot="icon" type="alarm" active></obc-alert-icon>
        <div
          slot="readout-graph"
          style="height: 200px; width: 100%; background: hsl(210, 100%, 90%);"
        ></div>
        <obc-button slot="action" fullWidth> Unshelve </obc-button>
        <obc-button slot="action" fullWidth variant="raised">ACK </obc-button>
      </obc-alert-detail-page>
    `;
  },
};

export const Blocked: Story = {
  args: {
    type: AlertDetailPageType.modal,
    alert: {
      ...alert,
      acknowledged: {
        acknowledgedBy: 'John Doe',
        acknowledgedAt: new Date('2024-01-15T14:34:00Z'),
      },
      blocked: {
        blockedStartTime: new Date('2024-01-15T14:34:00Z'),
        blockedBy: 'John Doe',
      },
      note: 'Some description or note that states why the alert is blocked.',
    },
    hasNote: true,
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        .alert=${args.alert}
        .type=${args.type}
        .hasNote=${args.hasNote}
        .hasActions=${args.hasActions}
        .hasReadoutGraph=${args.hasReadoutGraph}
        .hasTagId=${args.hasTagId}
        .hasCategory=${args.hasCategory}
        .hasActivated=${args.hasActivated}
        .hasTimer=${args.hasTimer}
        .hasAcknowledged=${args.hasAcknowledged}
        .hasAcknowledgedBy=${args.hasAcknowledgedBy}
        .hasRectified=${args.hasRectified}
        .hasShelvingTimer=${args.hasShelvingTimer}
        .hasShelvedBy=${args.hasShelvedBy}
        .timeSinceFormatter=${args.timeSinceFormatter}
        style="height: ${args.height}; display: block;"
      >
        <div
          slot="readout-graph"
          style="height: 200px; width: 100%; background: hsl(210, 100%, 90%);"
        ></div>
        <obc-button slot="action" fullWidth> Review </obc-button>
        <obc-button slot="action" fullWidth>Unblock </obc-button>
      </obc-alert-detail-page>
    `;
  },
};

export const NoReadoutGraph: Story = {
  args: {
    type: AlertDetailPageType.modal,
    hasReadoutGraph: undefined,
  },
};
