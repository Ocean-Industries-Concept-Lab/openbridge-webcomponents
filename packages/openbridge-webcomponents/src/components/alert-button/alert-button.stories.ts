import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertButton} from './alert-button';
import {AlertType} from '../../types';
import './alert-button';

const meta: Meta<typeof ObcAlertButton> = {
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
    alertType: {
      options: Object.values(AlertType),
      control: {type: 'select'},
    },
  },
} satisfies Meta<ObcAlertButton>;

export default meta;
type Story = StoryObj<ObcAlertButton>;

export const Alarm: Story = {
  args: {
    alertType: AlertType.Alarm,
  },
};

export const Warning: Story = {
  args: {
    alertType: AlertType.Warning,
  },
};

export const Caution: Story = {
  args: {
    alertType: AlertType.Caution,
  },
};

export const Running: Story = {
  args: {
    alertType: AlertType.Running,
  },
};

export const Command: Story = {
  args: {
    alertType: AlertType.Command,
  },
};

export const Notification: Story = {
  args: {
    alertType: AlertType.Notification,
  },
};

export const Regular: Story = {
  args: {
    alertType: AlertType.None,
  },
};

export const Flat: Story = {
  args: {
    alertType: AlertType.Flat,
  },
};

export const RegularNoCounter: Story = {
  args: {
    alertType: AlertType.None,
    counter: false,
  },
};

export const RegularStandalone: Story = {
  args: {
    alertType: AlertType.None,
    counter: true,
    standalone: true,
  },
};

export const RegularStandaloneNoCounter: Story = {
  args: {
    alertType: AlertType.None,
    counter: false,
    standalone: true,
  },
};
