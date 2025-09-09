import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcChatMessage} from './chat-message.js';
import './chat-message.js';
import {html} from 'lit';

const meta: Meta<typeof ObcChatMessage> = {
  title: 'UI Components/Chat/Chat Message',
  tags: ['6.0'],
  component: 'obc-chat-message',
  args: {
    showName: true,
    showDate: true,
    name: 'John Doe',
    date: new Date('2025-01-01T12:00:00Z'),
  },
  argTypes: {
    showName: {
      control: {type: 'boolean'},
    },
    showDate: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => {
    return html`
      <obc-chat-message
        .showName=${args.showName}
        .showDate=${args.showDate}
        .name=${args.name}
        .date=${args.date}
        .self=${args.self}
      >
        A long message with a lot of text that is longer than two lines of text.
        wow so long. now it is long moahahhaha
      </obc-chat-message>
    `;
  },
} satisfies Meta<ObcChatMessage>;

export default meta;
type Story = StoryObj<ObcChatMessage>;

export const Self: Story = {
  args: {
    self: true,
    showName: false,
  },
};

export const Other: Story = {
  args: {
    self: false,
  },
};

export const Chats: Story = {
  render: () => html`
    <obc-chat-message
      position="top"
      self
      .date=${new Date('2025-01-01T12:00:00Z')}
      showDate
    >
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>
    <obc-chat-message
      position="middle"
      self
      .date=${new Date('2025-01-01T12:00:00Z')}
    >
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>
    <obc-chat-message
      position="bottom"
      self
      .date=${new Date('2025-01-01T12:00:00Z')}
    >
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>

    <obc-chat-message
      position="top"
      .date=${new Date('2025-01-01T12:00:00Z')}
      showName
      name="John Doe"
      showDate
    >
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>
    <obc-chat-message
      position="middle"
      .date=${new Date('2025-01-01T12:00:00Z')}
    >
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>
    <obc-chat-message
      position="bottom"
      .date=${new Date('2025-01-01T12:00:00Z')}
    >
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>

    <obc-chat-message self .date=${new Date('2025-01-01T12:00:00Z')} showDate>
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>
    <obc-chat-message
      position="single"
      .date=${new Date('2025-01-01T12:00:00Z')}
    >
      A long message with a lot of text that is longer than two lines of text.
      wow so long. now it is long moahahhaha
    </obc-chat-message>
  `,
};
