import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcNotificationButton} from './notification-button';
import '../../icons/icon-sound-muted-fill';
import './notification-button';
import {html} from 'lit';
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcNotificationButton> = {
  title: 'Button/Notification button',
  tags: ['autodocs'],
  component: 'obc-notification-button',
} satisfies Meta<ObcNotificationButton>;

export default meta;
type Story = StoryObj<ObcNotificationButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Ack: Story = {
  render: () => html` <obc-notification-button> ACK </obc-notification-button>`,
};

export const Mute: Story = {
  render: () =>
    html` <obc-notification-button icon>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-button>`,
};

export const MuteDisabled: Story = {
  render: () =>
    html` <obc-notification-button icon disabled>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-button>`,
};

export const MuteIndent: Story = {
  render: () =>
    html` <obc-notification-button icon disabled indent>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-button>`,
};

export const MuteOpenRight: Story = {
  render: () =>
    html` <obc-notification-button icon openright>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-button>`,
};

export const CornerLeft: Story = {
  render: () =>
    html` <obc-notification-button icon cornerleft>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-button>`,
};

export const CornerRight: Story = {
  render: () =>
    html` <obc-notification-button icon cornerright>
      <obi-sound-muted-fill></obi-sound-muted-fill>
    </obc-notification-button>`,
};
