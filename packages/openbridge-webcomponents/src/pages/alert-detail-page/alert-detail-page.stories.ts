import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcAlertDetailPage } from './alert-detail-page.js';
import './alert-detail-page.js';
import '../../components/alert-icon/alert-icon.js';
import '../../icons/icon-alert-category-a.js';
import { html } from 'lit';

const meta: Meta<typeof ObcAlertDetailPage> = {
  title: 'Pages/Alert detail page',
  tags: ['6.0'],
  component: "obc-alert-detail-page",
  args: {
    canShelf: true,
    canAck: true,
    hasReadoutGraph: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => {
    return html`
      <obc-alert-detail-page .canShelf=${args.canShelf} .canAck=${args.canAck} .hasReadoutGraph=${args.hasReadoutGraph}>
        <obc-alert-icon slot="icon" name="alarm-unack"></obc-alert-icon>
        <span slot="title">Alert title</span>
        <span slot="description">Description here. This alert has been triggered due to a dected anomaly.</span>
        <span slot="tag-value">#000000</span>
        <obi-icon-alert-category-a slot="category-value"></obi-icon-alert-category-a>
        <span slot="activated-value">09:12:45</span>
        <span slot="timer-value">12s</span>
    </obc-alert-detail-page>
    `;
  },
} satisfies Meta<ObcAlertDetailPage>;

export default meta;
type Story = StoryObj<ObcAlertDetailPage>;

export const Primary: Story = {
  args: {
  },
}