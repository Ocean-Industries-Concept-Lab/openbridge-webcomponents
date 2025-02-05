import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertTopbarElement} from './alert-topbar-element';
import './alert-topbar-element';
import {html} from 'lit';
import '../notification-message-item/notification-message-item';
import '../../icons/icon-alarm-unacknowledged-iec';
import '../../icons/icon-caution-color-iec';
import '../alert-icon/alert-icon';
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
    showAck: true,
    alertMuted: false,
    blinkAlarmValue: true,
    blinkWarningValue: true,
  },
  argTypes: {
    alertType: {
      options: Object.values(AlertType),
      control: {type: 'select'},
    },
  },
  render: (args) => html`
    <obc-alert-topbar-element
      .nAlerts=${args.nAlerts}
      .alertType=${args.alertType}
      .maxWidth=${args.maxWidth}
      .blinkAlarmValue=${args.blinkAlarmValue}
      .blinkWarningValue=${args.blinkWarningValue}
      .minimized=${args.minimized}
      .showAck=${args.showAck}
      .alertMuted=${args.alertMuted}
    >
      <obc-notification-message-item time="2023-01-01T13:37:01+01:00">
        <obc-alert-icon
          blinkvalue
          name="alarm-unack"
          slot="icon"
        ></obc-alert-icon>
        <div slot="message">This is a message</div>
      </obc-notification-message-item>
    </obc-alert-topbar-element>
  `,
} satisfies Meta<ObcAlertTopbarElement>;

export default meta;
type Story = StoryObj<ObcAlertTopbarElement>;

export const Full: Story = {};

export const Muted: Story = {
  args: {
    alertMuted: true,
  },
};

export const NoAck: Story = {
  args: {
    showAck: false,
  },
};

export const Caution: Story = {
  args: {
    alertType: AlertType.Caution,
    showAck: false,
  },
  render: (args) => html`
    <obc-alert-topbar-element
      .nAlerts=${args.nAlerts}
      .alertType=${args.alertType}
      .maxWidth=${args.maxWidth}
      .minimized=${args.minimized}
      .showAck=${args.showAck}
      .alertMuted=${args.alertMuted}
    >
      <obc-notification-message-item time="2023-01-01T13:37:01+01:00">
        <obi-caution-color-iec slot="icon" usecsscolor></obi-caution-color-iec>
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
      .nAlerts=${args.nAlerts}
      .alertType=${args.alertType}
      .maxWidth=${args.maxWidth}
      .minimized=${args.minimized}
    >
    </obc-alert-topbar-element>`,
};
