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

export const AlarmStandalone: Story = {
  args: {
    alertType: AlertType.Alarm,
    standalone: true,
  },
};

export const Alarm3digits: Story = {
  args: {
    alertType: AlertType.Alarm,
    nAlerts: 100,
  },
};

export const Alarm3digitsStandalone: Story = {
  args: {
    alertType: AlertType.Alarm,
    nAlerts: 100,
    standalone: true,
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

export const RegularIdle: Story = {
  args: {
    alertType: AlertType.Alarm,
    nAlerts: 0,
    standalone: false,
  },
};

export const Notification: Story = {
  args: {
    alertType: AlertType.Notification,
  },
};

export const Standalone: Story = {
  args: {
    alertType: AlertType.Alarm,
    nAlerts: 2,
    counter: true,
    standalone: true,
  },
};

export const StandaloneIdle: Story = {
  args: {
    alertType: AlertType.Alarm,
    nAlerts: 0,
    standalone: true,
    flatWhenIdle: false,
  },
};

export const StandaloneIdleFlat: Story = {
  args: {
    alertType: AlertType.Alarm,
    nAlerts: 0,
    standalone: true,
    flatWhenIdle: true,
  },
};

export const RegularStandaloneNoCounter: Story = {
  args: {
    alertType: AlertType.Alarm,
    nAlerts: 1,
    counter: false,
    standalone: true,
  },
};
