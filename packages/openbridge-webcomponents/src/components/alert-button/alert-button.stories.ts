import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertButton, ObcAlertButtonType} from './alert-button.js';
import {AlertType} from '../../types.js';
import './alert-button.js';

const meta: Meta<typeof ObcAlertButton> = {
  title: 'Application/Alert button',
  tags: ['autodocs'],
  component: 'obc-alert-button',
  args: {
    counter: true,
  },
  argTypes: {
    nAlerts: {
      control: {type: 'number', min: 0, max: 99},
    },
    counter: {
      control: {type: 'boolean'},
    },
    alertType: {
      options: Object.values(AlertType),
      control: {type: 'select'},
    },
    type: {
      options: Object.values(ObcAlertButtonType),
      control: {type: 'select'},
    }
  },
} satisfies Meta<ObcAlertButton>;

export default meta;
type Story = StoryObj<ObcAlertButton>;

export const Flat: Story = {
  args: {
    alertType: undefined,
    type: ObcAlertButtonType.Flat,
  },
}

export const Normal: Story = {
  args: {
    alertType: undefined,
    type: ObcAlertButtonType.Normal,
  },
}

export const FlatAlarm: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Flat,
    counter: false,
    nAlerts: 3,
  },
}

export const NormalAlarm: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
  },
}

export const EnhancedAlarm: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Enhanced,
    nAlerts: 3,
  },
}

export const NormalAlarmSilence: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    showSilenceButton: true,
  },
}

export const NormalAlarmSilenceDisabled: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    showSilenceButton: true,
    silenceButtonDisabled: true,
  },
}

export const FlatWarning: Story = {
  args: {
    alertType: AlertType.Warning,
    type: ObcAlertButtonType.Flat,
    nAlerts: 3,
  },
}

export const NormalWarning: Story = {
  args: {
    alertType: AlertType.Warning,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
  },
}

export const EnhancedWarning: Story = {
  args: {
    alertType: AlertType.Warning,
    type: ObcAlertButtonType.Enhanced,
    nAlerts: 3,
  },
}

export const FlatCaution: Story = {
  args: {
    alertType: AlertType.Caution,
    type: ObcAlertButtonType.Flat,
    nAlerts: 3,
  },
}

export const NormalCaution: Story = {
  args: {
    alertType: AlertType.Caution,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
  },
}

export const EnhancedCaution: Story = {
  args: {
    alertType: AlertType.Caution,
    type: ObcAlertButtonType.Enhanced,
    nAlerts: 3,
  },
}