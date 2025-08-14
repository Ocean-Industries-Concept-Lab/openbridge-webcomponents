import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcNotificationBadgeButton} from './notification-badge-button.js';
import '../../icons/icon-sound-muted-fill.js';
import './notification-badge-button.js';
import {html} from 'lit';
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcNotificationBadgeButton> = {
  title: 'UI Components/Buttons/Notification badge button',
  tags: ['autodocs'],
  component: 'obc-notification-badge-button',
} satisfies Meta<ObcNotificationBadgeButton>;

export default meta;
type Story = StoryObj<ObcNotificationBadgeButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Ack: Story = {
  render: () =>
    html` <obc-notification-badge-button> ACK </obc-notification-badge-button>`,
};

export const Mute: Story = {
  render: () =>
    html` <obc-notification-badge-button icon>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-badge-button>`,
};

export const MuteDisabled: Story = {
  render: () =>
    html` <obc-notification-badge-button icon disabled>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-badge-button>`,
};

export const MuteIndent: Story = {
  render: () =>
    html` <obc-notification-badge-button icon disabled indent>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-badge-button>`,
};

export const MuteOpenRight: Story = {
  render: () =>
    html` <obc-notification-badge-button icon openright>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-badge-button>`,
};

export const CornerLeft: Story = {
  render: () =>
    html` <obc-notification-badge-button icon cornerleft>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-badge-button>`,
};

export const CornerRight: Story = {
  render: () =>
    html` <obc-notification-badge-button icon cornerright>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-badge-button>`,
};
