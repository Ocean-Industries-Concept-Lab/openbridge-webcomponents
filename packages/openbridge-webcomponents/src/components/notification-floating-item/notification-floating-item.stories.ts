import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './notification-floating-item.js';
import {ObcNotificationFloatingItem} from './notification-floating-item.js';
import {
  ObcFloatingItemDirection,
  ObcFloatingItemType,
  ObcFloatingItemLineType,
} from '../floating-item/floating-item.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<ObcNotificationFloatingItem> = {
  title: 'Application Components/Notifications/Notification Floating Item',
  component: 'obc-notification-floating-item',
  tags: ['6.0'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcFloatingItemType),
    },
    lineType: {
      control: 'select',
      options: Object.values(ObcFloatingItemLineType),
    },
    direction: {
      control: 'select',
      options: Object.values(ObcFloatingItemDirection),
    },
    action: {control: 'boolean'},
    action2: {control: 'boolean'},
    hasTimestamp: {control: 'boolean'},
    hasDay: {control: 'boolean'},
  },
  args: {
    type: ObcFloatingItemType.Regular,
    lineType: ObcFloatingItemLineType.singleLine,
    direction: ObcFloatingItemDirection.horizontal,
    action: true,
    action2: true,
    hasTimestamp: true,
    hasDay: false,
  },
};

export default meta;
type Story = StoryObj<ObcNotificationFloatingItem>;

interface NotificationFloatingItemArgs {
  type: ObcFloatingItemType;
  lineType: ObcFloatingItemLineType;
  direction: ObcFloatingItemDirection;
  hasTimestamp: boolean;
  hasDay: boolean;
  action: boolean;
  action2: boolean;
}

type NotificationFloatingItemTemplate = (
  args: NotificationFloatingItemArgs
) => ReturnType<typeof html>;

const template: NotificationFloatingItemTemplate = (args) => html`
  <obc-notification-floating-item
    .type=${args.type}
    .lineType=${args.lineType}
    .direction=${args.direction}
    .hasTimestamp=${args.hasTimestamp}
    .hasDay=${args.hasDay}
    .action=${args.action}
    .action2=${args.action2}
  >
    ${args.type === ObcFloatingItemType.Application
      ? html`<div slot="primary-icon"><obi-ship></obi-ship></div>`
      : ''}
    <span slot="title">Notification title</span>
    <span slot="description">
      ${'A notification message with meaningful content for the user.'}
    </span>
    ${args.hasTimestamp ? html`<span slot="time">09:12:46</span>` : ''}
    ${args.hasDay ? html`<span slot="day">Yesterday</span>` : ''}
    ${args.action ? html`<span slot="action">Close</span>` : ''}
    ${args.action2 ? html`<span slot="action2">Undo</span>` : ''}
  </obc-notification-floating-item>
`;

export const NotificationVerticalSingleRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const NotificationVerticalMultiRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const NotificationVerticalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const NotificationVerticalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const NotificationHorizontalSingleRegular: Story = {
  render: template,
  args: {},
};

export const NotificationHorizontalMultiRegular: Story = {
  render: template,
  args: {
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const NotificationHorizontalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
  },
};

export const NotificationHorizontalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const NotificationAllPropsOn: Story = {
  render: template,
  args: {
    action: true,
    action2: true,
    hasTimestamp: true,
    hasDay: true,
  },
};

export const NotificationAllPropsOff: Story = {
  render: template,
  args: {
    action: false,
    action2: false,
    hasTimestamp: false,
    hasDay: false,
  },
};

export const NotificationLongMessage: Story = {
  render: (args) => html`
    <obc-notification-floating-item
      .type=${args.type}
      .lineType=${ObcFloatingItemLineType.multiLine}
      .direction=${args.direction}
      .hasTimestamp=${args.hasTimestamp}
      .hasDay=${args.hasDay}
      .action=${args.action}
      .action2=${args.action2}
    >
      ${args.type === ObcFloatingItemType.Application
        ? html`<div slot="primary-icon"><obi-ship></obi-ship></div>`
        : ''}
      <span slot="title">Important Notification</span>
      <span slot="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
        Nullam ac erat ante. Phasellus hendrerit risus sed justo facilisis, nec
        elementum libero elementum. Duis sit amet tortor eu nunc vehicula
        pretium. Sed scelerisque, nunc at commodo pretium, mauris sapien
        consequat nisl, vitae egestas sapien justo a tellus. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
        vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat
        ante. Phasellus hendrerit risus sed justo facilisis, nec elementum
        libero elementum. Duis sit amet tortor eu nunc vehicula pretium. Sed
        scelerisque, nunc at commodo pretium, mauris sapien consequat nisl,
        vitae egestas sapien justo a tellus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
        vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante.
        Phasellus hendrerit risus sed justo facilisis, nec elementum libero
        elementum. Duis sit amet tortor eu nunc vehicula pretium. Sed
        scelerisque, nunc at commodo pretium, mauris sapien consequat nisl,
        vitae egestas sapien justo a tellus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
        vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante.
        Phasellus hendrerit risus sed justo facilisis, nec elementum libero
        elementum. Duis sit amet tortor eu nunc vehicula pretium. Sed
        scelerisque, nunc at commodo pretium, mauris sapien consequat nisl,
        vitae egestas sapien justo a tellus.
      </span>
    </obc-notification-floating-item>
  `,
  args: {
    type: ObcFloatingItemType.Regular,
    direction: ObcFloatingItemDirection.horizontal,
    hasTimestamp: false,
    hasDay: false,
    action: false,
    action2: false,
  },
};
