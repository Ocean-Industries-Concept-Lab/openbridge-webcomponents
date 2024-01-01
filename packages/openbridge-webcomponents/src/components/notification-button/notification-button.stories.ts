import type {Meta, StoryObj} from '@storybook/web-components';
import {NotificationButton} from './notification-button';
import '../../icons/icon-14-mute';
import './notification-button';
import {html} from 'lit';
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof NotificationButton> = {
  title: 'Button/Notification button',
  tags: ['autodocs'],
  component: 'obc-notification-button',
} satisfies Meta<NotificationButton>;

export default meta;
type Story = StoryObj<NotificationButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Ack: Story = {
  render: () => html` <obc-notification-button> ACK </obc-notification-button>`,
};

export const Mute: Story = {
  render: () =>
    html` <obc-notification-button icon>
      <obi-14-mute></obi-14-mute>
    </obc-notification-button>`,
};

export const MuteDisabled: Story = {
  render: () =>
    html` <obc-notification-button icon disabled>
      <obi-14-mute></obi-14-mute>
    </obc-notification-button>`,
};

export const MuteIndent: Story = {
  render: () =>
    html` <obc-notification-button icon disabled indent>
      <obi-14-mute></obi-14-mute>
    </obc-notification-button>`,
};

export const MuteOpenRight: Story = {
  render: () =>
    html` <obc-notification-button icon open-right>
      <obi-14-mute></obi-14-mute>
    </obc-notification-button>`,
};

export const CornerLeft: Story = {
  render: () =>
    html` <obc-notification-button icon corner-left>
      <obi-14-mute></obi-14-mute>
    </obc-notification-button>`,
};

export const CornerRight: Story = {
  render: () =>
    html` <obc-notification-button icon corner-right>
      <obi-14-mute></obi-14-mute>
    </obc-notification-button>`,
};
