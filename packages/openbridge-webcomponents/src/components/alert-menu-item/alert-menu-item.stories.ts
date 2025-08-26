import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import './alert-menu-item.js';
import '../../icons/icon-engine.js';
import '../alert-icon/alert-icon.js';
import {ObcAlertMenuItem, ObcAlertMenuItemStatus} from './alert-menu-item.js';

interface AlertMenuItemArgs {
  title: string;
  description: string;
  day: string;
  time: string;
  hasIcon: boolean;
}

const meta: Meta<ObcAlertMenuItem & AlertMenuItemArgs> = {
  title: 'Application Components/Alerts/Alert menu item',
  component: 'obc-alert-menu-item',
  tags: ['autodocs', '6.0'],
  args: {
    hasDay: false,
    hasTime: true,
    title: 'Engine Temperature High',
    description: 'Port main engine temperature exceeds normal operating range',
    time: '14:30',
    status: ObcAlertMenuItemStatus.Unacknowledged,
  },
  render: (args) => html`
    <obc-alert-menu-item
      ?hasDay=${args.hasDay}
      ?hasTime=${args.hasTime}
      .shelved=${args.shelved}
      .hasIcon=${args.hasIcon}
      .status=${args.status}
    >
      <obc-alert-icon
        slot="alert-icon"
        type="alarm"
        status="unacknowledge"
      ></obc-alert-icon>
      ${args.hasIcon ? html`<obi-engine slot="icon"></obi-engine>` : nothing}
      <span slot="title">${args.title}</span>
      <span slot="description">${args.description}</span>
      <span slot="day">${args.day}</span>
      <span slot="time">${args.time}</span>
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
  },
};

export default meta;
type Story = StoryObj<ObcAlertMenuItem & AlertMenuItemArgs>;

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
