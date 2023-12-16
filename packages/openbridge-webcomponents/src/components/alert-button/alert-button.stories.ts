import type {Meta, StoryObj} from '@storybook/web-components';
import {AlertButton, AlertType} from './alert-button';
import './alert-button';

const meta: Meta<typeof AlertButton> = {
  title: 'Application/Alert button',
  tags: ['autodocs'],
  component: 'obc-alert-button',
  args: {
    nAlerts: 2,
    counter: true,
    standalone: false,
  },
  argTypes: {
    nAlerts: {
      control: {type: 'number', min: 0, max: 99},
    },
    counter: {
      control: {type: 'boolean'},
    },
    standalone: {
      control: {type: 'boolean'},
    },
    type: {
      options: Object.values(AlertType),
      control: {type: 'select'},
    },
  },
} satisfies Meta<AlertButton>;

export default meta;
type Story = StoryObj<AlertButton>;

export const Alarm: Story = {
  args: {
    type: AlertType.Alarm,
  },
};

export const Warning: Story = {
  args: {
    type: AlertType.Warning,
  },
};

export const Caution: Story = {
  args: {
    type: AlertType.Caution,
  },
};

export const Running: Story = {
  args: {
    type: AlertType.Running,
  },
};

export const Command: Story = {
  args: {
    type: AlertType.Command,
  },
};

export const Notification: Story = {
  args: {
    type: AlertType.Notification,
  },
};

export const Regular: Story = {
  args: {
    type: AlertType.Regular,
  },
};

export const Flat: Story = {
  args: {
    type: AlertType.Flat,
  },
};

export const RegularNoCounter: Story = {
  args: {
    type: AlertType.Regular,
    counter: false,
  },
};

export const RegularStandalone: Story = {
  args: {
    type: AlertType.Regular,
    counter: true,
    standalone: true,
  },
};

export const RegularStandaloneNoCounter: Story = {
  args: {
    type: AlertType.Regular,
    counter: false,
    standalone: true,
  },
};
