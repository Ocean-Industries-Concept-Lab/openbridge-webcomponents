import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcNotificationButton,
  NotificationButtonStyle,
  type NotificationButtonClickEvent,
} from './notification-button.js';
import './notification-button.js';
import '../button/button.js';

interface NotificationButtonArgs {
  buttonStyle: NotificationButtonStyle;
  count: number;
  showCount: boolean;
  isActive: boolean;
  ariaLabel: string;
}

const meta: Meta<typeof ObcNotificationButton> = {
  title:
    'Application Components/Notifications/Notification message/Notification button',
  tags: ['6.0'],
  component: 'obc-notification-button',
  decorators: [
    (story) =>
      html`<div
        style="padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 200px;"
      >
        ${story()}
      </div>`,
  ],
  args: {
    buttonStyle: NotificationButtonStyle.Flat,
    count: 0,
    showCount: true,
    isActive: false,
    ariaLabel: 'Notifications',
  },
  argTypes: {
    buttonStyle: {
      control: {type: 'select'},
      options: Object.values(NotificationButtonStyle),
      description:
        'Visual style of the button (Normal/Enhanced require isActive to be true)',
      table: {
        defaultValue: {summary: NotificationButtonStyle.Flat},
      },
    },
    count: {
      control: {type: 'range', min: 0, max: 150, step: 1},
      description: 'Notification count',
      table: {
        defaultValue: {summary: '0'},
      },
    },
    showCount: {
      control: {type: 'boolean'},
      description: 'Show notification count badge',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    isActive: {
      control: {type: 'boolean'},
      description: 'Active/selected state',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    ariaLabel: {
      control: {type: 'text'},
      description: 'Accessibility label',
      table: {
        defaultValue: {summary: 'Notifications'},
      },
    },
  },
} satisfies Meta<ObcNotificationButton>;

export default meta;
type Story = StoryObj<ObcNotificationButton>;

const renderButton = (args: NotificationButtonArgs) => html`
  <obc-notification-button
    buttonStyle="${args.buttonStyle}"
    count="${args.count}"
    ?showCount="${args.showCount}"
    ?isActive="${args.isActive}"
    ariaLabel="${args.ariaLabel}"
    @obc-click="${(e: CustomEvent<NotificationButtonClickEvent>) => {
      console.log(
        'Notification button clicked, count:',
        e.detail.count,
        'isActive:',
        e.detail.isActive
      );
    }}"
  >
  </obc-notification-button>
`;

export const FlatInactive: Story = {
  name: 'Flat (Inactive)',
  args: {
    isActive: false,
    count: 5, // Count is ignored when flat
    showCount: true,
  },
  render: renderButton,
};

export const FlatActive: Story = {
  name: 'Flat (Active)',
  args: {
    buttonStyle: NotificationButtonStyle.Flat,
    isActive: true,
  },
  render: renderButton,
};

export const NormalWithCounter: Story = {
  args: {
    count: 3,
    showCount: true,
    isActive: true,
    buttonStyle: NotificationButtonStyle.Normal,
  },
  render: renderButton,
};

export const NormalWithoutCounter: Story = {
  args: {
    buttonStyle: NotificationButtonStyle.Normal,
    showCount: false,
    isActive: true,
  },
  render: renderButton,
};

export const EnhancedWithCounter: Story = {
  args: {
    buttonStyle: NotificationButtonStyle.Enhanced,
    count: 3,
    showCount: true,
    isActive: true,
  },
  render: renderButton,
};

export const EnhancedWithoutCounter: Story = {
  args: {
    buttonStyle: NotificationButtonStyle.Enhanced,
    showCount: false,
    isActive: true,
  },
  render: renderButton,
};
