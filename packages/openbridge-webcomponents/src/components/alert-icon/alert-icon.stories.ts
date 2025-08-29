import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAlertIcon} from './alert-icon.js';
import './alert-icon.js';
import {html} from 'lit';
import {AlertStatus, AlertType} from '../../types.js';

const meta: Meta<typeof ObcAlertIcon> = {
  title: 'Application Components/Alerts/Alert icon',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-icon',
  args: {
    type: AlertType.Alarm,
    status: AlertStatus.Unacknowledged,
  },
  argTypes: {
    type: {
      control: {type: 'select', options: Object.values(AlertType)},
    },
    status: {
      control: {type: 'select', options: Object.values(AlertStatus)},
    },
  },
  render: (args) =>
    html` <div style="width:64px;height:64px">
      <obc-alert-icon
        .type=${args.type}
        .status=${args.status}
      ></obc-alert-icon>
    </div>`,
} satisfies Meta<ObcAlertIcon>;

export default meta;
type Story = StoryObj<ObcAlertIcon>;

export const AlarmUnacknowledged: Story = {};

export const AlarmRectified: Story = {
  args: {
    type: AlertType.Alarm,
    status: AlertStatus.Rectified,
  },
};

export const AlarmAcknowledged: Story = {
  args: {
    type: AlertType.Alarm,
    status: AlertStatus.Acknowledged,
  },
};

export const WarningUnacknowledged: Story = {
  args: {
    type: AlertType.Warning,
    status: AlertStatus.Unacknowledged,
  },
};

export const WarningRectified: Story = {
  args: {
    type: AlertType.Warning,
    status: AlertStatus.Rectified,
  },
};

export const WarningAcknowledged: Story = {
  args: {
    type: AlertType.Warning,
    status: AlertStatus.Acknowledged,
  },
};

export const Caution: Story = {
  args: {
    type: AlertType.Caution,
    status: AlertStatus.Unacknowledged,
  },
};
