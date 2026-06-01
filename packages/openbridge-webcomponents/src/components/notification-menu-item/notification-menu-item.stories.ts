import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcNotificationMenuItem} from './notification-menu-item.js';
import './notification-menu-item.js';
import {html} from 'lit';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';

const meta: Meta<typeof ObcNotificationMenuItem> = {
  title: 'Application Components/Notifications/Notification Menu Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-notification-menu-item',
  args: {
    title: 'Notification title',
    description:
      'A long notification message of more than one line of text and meaningful content. Sometimes it might be quite long and that is ok.',
    day: 'Yesterday',
    time: '09:12:34',
    primaryActionLabel: 'Action',
    secondaryActionLabel: 'Action 2',
    size: ObcMessageMenuItemSize.SingleLine,
    open: false,
    hasIcon: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: [
        ObcMessageMenuItemSize.SingleLine,
        ObcMessageMenuItemSize.DoubleLine,
      ],
    },
  },
  render: (args) => {
    return html`
      <obc-notification-menu-item
        .title=${args.title}
        .description=${args.description}
        .day=${args.day}
        .time=${args.time}
        .primaryActionLabel=${args.primaryActionLabel}
        .secondaryActionLabel=${args.secondaryActionLabel}
        .size=${args.size}
        .open=${args.open}
        .hasIcon=${args.hasIcon}
        @primary-action-click=${() => console.log('Primary action clicked')}
        @secondary-action-click=${() => console.log('Secondary action clicked')}
        @item-click=${() => console.log('Item clicked')}
      >
      </obc-notification-menu-item>
    `;
  },
} satisfies Meta<ObcNotificationMenuItem>;

export default meta;
type Story = StoryObj<ObcNotificationMenuItem>;

export const SingleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.SingleLine,
  },
};

export const DoubleLine: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
  },
};

export const Open: Story = {
  args: {
    size: ObcMessageMenuItemSize.DoubleLine,
    open: true,
  },
};

export const WithOneAction: Story = {
  args: {
    primaryActionLabel: 'Action',
    secondaryActionLabel: '',
  },
};

export const NoActions: Story = {
  args: {
    primaryActionLabel: '',
    secondaryActionLabel: '',
  },
};
