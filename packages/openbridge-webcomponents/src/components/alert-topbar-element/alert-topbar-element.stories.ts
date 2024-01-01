import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertTopbarElement} from './alert-topbar-element';
import './alert-topbar-element';
import {html} from 'lit';
import '../notification-message-item/notification-message-item';
import '../../icons/icon-14-alarm-unack';
import '../../icons/icon-14-caution-color';
import {AlertType} from '../../types';

const meta: Meta<typeof ObcAlertTopbarElement> = {
  title: 'Application/Alert topbar element',
  tags: ['autodocs'],
  component: 'obc-alert-topbar-element',
  args: {
    nAlerts: 1,
    alertType: AlertType.Alarm,
    maxWidth: 480,
    minimized: false,
  },
  argTypes: {
    alertType: {
      options: Object.values(AlertType),
      control: {type: 'select'},
    },
  },
  render: (args) => html`
    <obc-alert-topbar-element
      n-alerts=${args.nAlerts}
      alert-type=${args.alertType}
      max-width=${args.maxWidth}
      ?minimized=${args.minimized}
    >
      <obc-notification-message-item
        time="2023-01-01T13:37:01+01:00"
        slot="alert-message"
      >
        <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
        <div slot="message">This is a message</div>
      </obc-notification-message-item>
    </obc-alert-topbar-element>
  `,
} satisfies Meta<ObcAlertTopbarElement>;

export default meta;
type Story = StoryObj<ObcAlertTopbarElement>;

export const Full: Story = {};

export const Caution: Story = {
  args: {
    alertType: AlertType.Caution,
  },
  render: (args) => html`
    <obc-alert-topbar-element
      n-alerts=${args.nAlerts}
      alert-type=${args.alertType}
      max-width=${args.maxWidth}
      ?minimized=${args.minimized}
      ?show-ack=${args.showAck}
    >
      <obc-notification-message-item
        time="2023-01-01T13:37:01+01:00"
        slot="alert-message"
      >
        <obi-14-caution-color slot="icon" use-css-color></obi-14-caution-color>
        <div slot="message">This is a message</div>
      </obc-notification-message-item>
    </obc-alert-topbar-element>
  `,
};

export const Minimized: Story = {
  args: {
    minimized: true,
  },
};

export const NoAlerts: Story = {
  args: {
    nAlerts: 0,
    alertType: AlertType.None,
  },
  render: (args) =>
    html` <obc-alert-topbar-element
      n-alerts=${args.nAlerts}
      alert-type=${args.alertType}
      max-width=${args.maxWidth}
      ?minimized=${args.minimized}
      show-ack
    >
    </obc-alert-topbar-element>`,
};
