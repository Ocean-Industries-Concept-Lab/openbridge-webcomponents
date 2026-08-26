import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import './alert-menu-item.js';
import '../../icons/icon-engine.js';
import '../alert-icon/alert-icon.js';
import {
  ObcAlertMenuItem,
  ObcAlertMenuItemActionState,
  ObcAlertMenuItemStatus,
} from './alert-menu-item.js';

const meta: Meta<ObcAlertMenuItem> = {
  title: 'Application Components/Alerts/Alert Menu Item',
  component: 'obc-alert-menu-item',
  tags: ['autodocs', '6.0'],
  args: {
    title: 'Engine Temperature High',
    description: 'Port main engine temperature exceeds normal operating range',
    day: '',
    time: '14:30',
    status: ObcAlertMenuItemStatus.Unacknowledged,
    hasIcon: false,
    shelved: false,
    secondaryActionLabel: '',
    primaryActionState: ObcAlertMenuItemActionState.Enabled,
    secondaryActionState: ObcAlertMenuItemActionState.Enabled,
  },
  render: (args) => html`
    <obc-alert-menu-item
      .title=${args.title}
      .description=${args.description}
      .day=${args.day}
      .time=${args.time}
      .shelved=${args.shelved}
      .hasIcon=${args.hasIcon}
      .status=${args.status}
      .secondaryActionLabel=${args.secondaryActionLabel}
      .primaryActionState=${args.primaryActionState}
      .secondaryActionState=${args.secondaryActionState}
    >
      <obc-alert-icon slot="alert-icon" type="alarm" active></obc-alert-icon>
      ${args.hasIcon ? html`<obi-engine slot="icon"></obi-engine>` : nothing}
    </obc-alert-menu-item>
  `,
  argTypes: {
    title: {control: 'text'},
    description: {control: 'text'},
    day: {control: 'text'},
    time: {control: 'text'},
    status: {
      control: 'select',
      options: Object.values(ObcAlertMenuItemStatus),
    },
    hasIcon: {control: 'boolean'},
    shelved: {control: 'boolean'},
    secondaryActionLabel: {control: 'text'},
    primaryActionState: {
      control: 'select',
      options: Object.values(ObcAlertMenuItemActionState),
    },
    secondaryActionState: {
      control: 'select',
      options: Object.values(ObcAlertMenuItemActionState),
    },
  },
};

export default meta;
type Story = StoryObj<ObcAlertMenuItem>;

export const Default: Story = {
  args: {},
};

export const Shelved: Story = {
  args: {
    shelved: true,
  },
};

export const ShelvedWithIcon: Story = {
  args: {
    shelved: true,
    hasIcon: true,
  },
};

export const Acknowledged: Story = {
  args: {
    status: ObcAlertMenuItemStatus.Acknowledged,
  },
};

export const NoAckAlarm: Story = {
  args: {
    status: ObcAlertMenuItemStatus.NoAckAlarm,
  },
};

export const NoAckWarning: Story = {
  args: {
    status: ObcAlertMenuItemStatus.NoAckWarning,
  },
};

export const WithSecondaryAction: Story = {
  args: {
    secondaryActionLabel: 'Mute',
  },
};

export const SecondaryActionDisabled: Story = {
  args: {
    secondaryActionLabel: 'Mute',
    secondaryActionState: ObcAlertMenuItemActionState.Disabled,
  },
};

export const PrimaryActionNone: Story = {
  args: {
    secondaryActionLabel: 'Mute',
    primaryActionState: ObcAlertMenuItemActionState.None,
  },
};
