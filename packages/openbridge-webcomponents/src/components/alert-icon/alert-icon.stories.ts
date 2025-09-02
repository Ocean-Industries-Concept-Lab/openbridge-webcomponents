import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAlertIcon} from './alert-icon.js';
import './alert-icon.js';
import {html} from 'lit';
import {AlertType} from '../../types.js';

const meta: Meta<typeof ObcAlertIcon> = {
  title: 'Application Components/Alerts/Alert icon',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-icon',
  args: {
    type: AlertType.Alarm,
    acknowledged: false,
    active: true,
    outline: false,
  },
  argTypes: {
    type: {
      control: {type: 'select', options: Object.values(AlertType)},
    },
    acknowledged: {
      control: {type: 'boolean'},
    },
    active: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html` <div style="width:64px;height:64px">
      <obc-alert-icon
        .type=${args.type}
        .acknowledged=${args.acknowledged}
        .active=${args.active}
        .outline=${args.outline}
      ></obc-alert-icon>
    </div>`,
} satisfies Meta<ObcAlertIcon>;

export default meta;
type Story = StoryObj<ObcAlertIcon>;

export const AlarmUnacknowledged: Story = {};

export const AlarmRectified: Story = {
  args: {
    type: AlertType.Alarm,
    acknowledged: true,
    active: false,
  },
};

export const AlarmAcknowledged: Story = {
  args: {
    type: AlertType.Alarm,
    acknowledged: true,
    active: true,
  },
};

export const WarningUnacknowledged: Story = {
  args: {
    type: AlertType.Warning,
    acknowledged: false,
    active: true,
  },
};

export const WarningRectified: Story = {
  args: {
    type: AlertType.Warning,
    acknowledged: true,
    active: false,
  },
};

export const WarningAcknowledged: Story = {
  args: {
    type: AlertType.Warning,
    acknowledged: true,
    active: true,
  },
};

export const Caution: Story = {
  args: {
    type: AlertType.Caution,
    acknowledged: false,
    active: true,
  },
};

export const AlarmOutline: Story = {
  args: {
    type: AlertType.Alarm,
    acknowledged: false,
    active: true,
    outline: true,
  },
};
