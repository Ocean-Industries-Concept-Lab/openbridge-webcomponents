import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './floating-message.js';
import {
  ObcFloatingMessage,
  ObcFloatingMessageDirection,
  ObcFloatingMessageType,
  ObcFloatingMessageLineType,
} from './floating-message';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<ObcFloatingMessage> = {
  title: 'Application/Floating Message',
  component: 'obc-floating-message',
  tags: ['6.0'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcFloatingMessageType),
    },
    lineType: {
      control: 'select',
      options: Object.values(ObcFloatingMessageLineType),
    },
    direction: {
      control: 'select',
      options: Object.values(ObcFloatingMessageDirection),
    },
    action: { control: 'boolean' },
    action2: { control: 'boolean' },
    hasTimestamp: { control: 'boolean' },
    hasDay: { control: 'boolean' },
  },
  args: {
    type: ObcFloatingMessageType.Regular,
    lineType: ObcFloatingMessageLineType.singleLine,
    direction: ObcFloatingMessageDirection.horizontal,
    action: true,
    action2: true,
    hasTimestamp: true,
    hasDay: false,
  },
};

export default meta;
type Story = StoryObj<ObcFloatingMessage>;

const template = (args: any) => html`
  <obc-floating-message
    .type=${args.type}
    .lineType=${args.lineType}
    .direction=${args.direction}
    .hasTimestamp=${args.hasTimestamp}
    .hasDay=${args.hasDay}
    .action=${args.action}
    .action2=${args.action2}
  >
    <div slot="primary-icon"><obi-ship></obi-ship></div>
    <div slot="secondary-icon"><obi-placeholder></obi-placeholder></div>
    <span slot="title">Message title</span>
    <span slot="description">
      ${"A long message of more than one line of text and meaningful content."}
    </span>
    ${args.hasTimestamp ? html`<span slot="time">09:12:46</span>` : ''}
    ${args.hasDay ? html`<span slot="day">Yesterday</span>` : ''}
    ${args.action ? html`<span slot="action">Close</span>` : ''}
    ${args.action2 ? html`<span slot="action2">Undo</span>` : ''}
  </obc-floating-message>
`;

export const VerticalSingleRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingMessageDirection.vertical,
  },
};

export const VerticalMultiRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingMessageDirection.vertical,
    lineType: ObcFloatingMessageLineType.multiLine,
  },
};

export const VerticalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingMessageType.Application,
    direction: ObcFloatingMessageDirection.vertical,
  },
};

export const VerticalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingMessageType.Application,
    direction: ObcFloatingMessageDirection.vertical,
    lineType: ObcFloatingMessageLineType.multiLine,
  },
};

export const HorizontalSingleRegular: Story = {
  render: template,
  args: {},
};

export const HorizontalMultiRegular: Story = {
  render: template,
  args: {
    lineType: ObcFloatingMessageLineType.multiLine,
  },
};


export const HorizontalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingMessageType.Application,
  },
};

export const HorizontalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingMessageType.Application,
    lineType: ObcFloatingMessageLineType.multiLine,
  },
};

export const TooLongMessage: Story = {
  render: template,
  args: {
    action: false,
    action2: false,
    hasTimestamp: false,
    hasDay: false,
    lineType: ObcFloatingMessageLineType.multiLine,
    
  },
};


export const AllPropsOn: Story = {
  render: template,
  args: {
    action: true,
    action2: true,
    hasTimestamp: true,
    hasDay: true,
  },
};

export const AllPropsOff: Story = {
  render: template,
  args: {
    action: false,
    action2: false,
    hasTimestamp: false,
    hasDay: false,
  },
};
