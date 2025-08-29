import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  AlertDetailPageAlertStatus,
  AlertDetailPageType,
  ObcAlertDetailPage,
} from './alert-detail-page.js';
import './alert-detail-page.js';
import '../../components/alert-icon/alert-icon.js';
import '../../icons/icon-alert-category-a.js';
import '../../icons/icon-alarm-badge-outline.js';
import {html} from 'lit';
import {spread} from '@open-wc/lit-helpers';

const meta: Meta<typeof ObcAlertDetailPage> = {
  title: 'Pages/Alert detail page',
  tags: ['6.0'],
  component: 'obc-alert-detail-page',
  args: {
    alertStatus: AlertDetailPageAlertStatus.active,
    hasActions: true,
    hasReadoutGraph: true,
    hasTagId: true,
    hasCategory: true,
    hasActivated: true,
    hasTimer: true,
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(AlertDetailPageType),
    },
    alertStatus: {
      control: {
        type: 'select',
      },
      options: Object.values(AlertDetailPageAlertStatus),
    },
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        ${spread(args)}
        style="height: ${args.type === AlertDetailPageType.page
          ? 'calc(100vh - 2rem)'
          : 'unset'}; display: block;"
      >
        <obc-alert-icon
          slot="icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">Alert title</span>
        <span slot="description"
          >Description here. This alert has been triggered due to a detected
          anomaly.</span
        >
        <span slot="tag-value">#000000</span>
        <obi-alert-category-a slot="category-value"></obi-alert-category-a>
        <span slot="activated-value">09:12:45</span>
        <span slot="timer-value">12s</span>
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
    alertStatus: AlertDetailPageAlertStatus.resolved,
    hasAcknowledged: true,
    hasAcknowledgedBy: true,
    hasRectified: true,
    hasTimer: undefined,
    hasActions: undefined,
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        ${spread(args)}
        style="height: ${args.height}; display: block;"
      >
        <obi-alarm-badge-outline slot="icon"></obi-alarm-badge-outline>
        <span slot="title">Alert title</span>
        <span slot="description"
          >Description here. This alert has been triggered due to a dected
          anomaly.</span
        >
        <span slot="tag-value">#000000</span>
        <obi-alert-category-a slot="category-value"></obi-alert-category-a>
        <span slot="activated-value">09:12:45</span>
        <span slot="acknowledged-value">09:17:23</span>
        <span slot="acknowledged-by-value">John Doe</span>
        <span slot="rectified-value">09:18:00</span>
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
    alertStatus: AlertDetailPageAlertStatus.shelved,
    hasShelvedBy: true,
    hasShelvingTimer: true,
    hasTimer: undefined,
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        ${spread(args)}
        style="height: ${args.height}; display: block;"
      >
        <obc-alert-icon
          slot="icon"
          type="alarm"
          status="unacknowledged"
        ></obc-alert-icon>
        <span slot="title">Alert title</span>
        <span slot="description"
          >Description here. This alert has been triggered due to a dected
          anomaly.</span
        >
        <span slot="tag-value">#000000</span>
        <obi-alert-category-a slot="category-value"></obi-alert-category-a>
        <span slot="activated-value">09:12:45</span>
        <span slot="shelving-timer-value">12s</span>
        <span slot="shelved-by-value">John Doe</span>
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
    alertStatus: AlertDetailPageAlertStatus.blocked,
    hasSubdescription: true,
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page
        ${spread(args)}
        style="height: ${args.height}; display: block;"
      >
        <obi-alarm-badge-outline slot="icon"></obi-alarm-badge-outline>
        <span slot="title">Alert title</span>
        <span slot="description"
          >Description here. This alert has been triggered due to a dected
          anomaly.</span
        >
        <span slot="subdescription-label">Blocked alert note</span>
        <span slot="subdescription"
          >Some description or note that states why the alert is blocked.</span
        >
        <span slot="tag-value">#000000</span>
        <obi-alert-category-a slot="category-value"></obi-alert-category-a>
        <span slot="activated-value">09:12:45</span>
        <span slot="timer-value">12s</span>
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
