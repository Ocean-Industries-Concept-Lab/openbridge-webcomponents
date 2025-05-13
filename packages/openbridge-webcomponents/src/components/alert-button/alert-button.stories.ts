import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertButton, ObcAlertButtonType} from './alert-button.js';
import {AlertType} from '../../types.js';
import './alert-button.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcAlertButton> = {
  title: 'Application/Alert button',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-button',
  args: {
    counter: true,
    width: 72,
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
    },
    width: {control: {type: 'range', min: 64, max: 1028, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcAlertButton>;

export default meta;
type Story = StoryObj<ObcAlertButton>;

export const DynamicSizingToFlat: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    flatMaxBreakpointPx: 600,
    silenceButtonMinBreakpointPx: 600,
    showSilenceButton: true,
    blinking: true,
    width: 112,
  },
};

export const DynamicSizingToHideSilence: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    flatMaxBreakpointPx: 0,
    silenceButtonMinBreakpointPx: 600,
    showSilenceButton: true,
    width: 112,
  },
};

export const Flat: Story = {
  args: {
    alertType: undefined,
    type: ObcAlertButtonType.Flat,
  },
};

export const Normal: Story = {
  args: {
    alertType: undefined,
    type: ObcAlertButtonType.Normal,
  },
};

export const FlatAlarm: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Flat,
    counter: false,
    nAlerts: 3,
  },
};

export const NormalAlarm: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
  },
};

export const NormalAlarmBlinking: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    blinking: true,
  },
};

export const EnhancedAlarm: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Enhanced,
    nAlerts: 3,
  },
};

export const EnhancedAlarmBlinking: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Enhanced,
    nAlerts: 3,
    blinking: true,
  },
};

export const NormalAlarmSilence: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    showSilenceButton: true,
    width: 128,
  },
};

export const NormalAlarmSilenceDisabled: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    showSilenceButton: true,
    silenceButtonDisabled: true,
    width: 128,
  },
};

export const NormalAlarmSilenceLarge: Story = {
  args: {
    alertType: AlertType.Alarm,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
    showSilenceButton: true,
    large: true,
    width: 128,
  },
};

export const FlatWarning: Story = {
  args: {
    alertType: AlertType.Warning,
    type: ObcAlertButtonType.Flat,
    nAlerts: 3,
  },
};

export const FlatWarningBlinking: Story = {
  args: {
    alertType: AlertType.Warning,
    type: ObcAlertButtonType.Flat,
    blinking: true,
    nAlerts: 3,
  },
};

export const NormalWarning: Story = {
  args: {
    alertType: AlertType.Warning,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
  },
};

export const EnhancedWarning: Story = {
  args: {
    alertType: AlertType.Warning,
    type: ObcAlertButtonType.Enhanced,
    nAlerts: 3,
  },
};

export const FlatCaution: Story = {
  args: {
    alertType: AlertType.Caution,
    type: ObcAlertButtonType.Flat,
    nAlerts: 3,
  },
};

export const NormalCaution: Story = {
  args: {
    alertType: AlertType.Caution,
    type: ObcAlertButtonType.Normal,
    nAlerts: 3,
  },
};

export const EnhancedCaution: Story = {
  args: {
    alertType: AlertType.Caution,
    type: ObcAlertButtonType.Enhanced,
    nAlerts: 3,
  },
};
