import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './floating-item.js';
import {
  ObcFloatingItem,
  ObcFloatingItemDirection,
  ObcFloatingItemType,
  ObcFloatingItemLineType,
} from './floating-item.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<ObcFloatingItem> = {
  title: 'UI Components/Message and Alerts/Floating Item',
  component: 'obc-floating-item',
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
type Story = StoryObj<ObcFloatingItem>;

interface FloatingMessageArgs {
  type: ObcFloatingItemType;
  lineType: ObcFloatingItemLineType;
  direction: ObcFloatingItemDirection;
  hasTimestamp: boolean;
  hasDay: boolean;
  action: boolean;
  action2: boolean;
}

type FloatingMessageTemplate = (
  args: FloatingMessageArgs
) => ReturnType<typeof html>;

const template: FloatingMessageTemplate = (args) => html`
  <obc-floating-item
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
      ${'A long message of more than one line of text and meaningful content.'}
    </span>
    ${args.hasTimestamp ? html`<span slot="time">09:12:46</span>` : ''}
    ${args.hasDay ? html`<span slot="day">Yesterday</span>` : ''}
    ${args.action ? html`<span slot="action">Close</span>` : ''}
    ${args.action2 ? html`<span slot="action2">Undo</span>` : ''}
  </obc-floating-item>
`;

export const VerticalSingleRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const VerticalMultiRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const VerticalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const VerticalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const HorizontalSingleRegular: Story = {
  render: template,
  args: {},
};

export const HorizontalMultiRegular: Story = {
  render: template,
  args: {
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const HorizontalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
  },
};

export const HorizontalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    lineType: ObcFloatingItemLineType.multiLine,
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

export const TooLongMessage: Story = {
  render: (args) => html`
    <obc-floating-item
      .type=${args.type}
      .lineType=${ObcFloatingItemLineType.multiLine}
      .direction=${args.direction}
      .hasTimestamp=${args.hasTimestamp}
      .hasDay=${args.hasDay}
      .action=${args.action}
      .action2=${args.action2}
    >
      <div slot="primary-icon"><obi-ship></obi-ship></div>
      <div slot="secondary-icon"><obi-placeholder></obi-placeholder></div>
      <span slot="title">Message title </span>
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
    </obc-floating-item>
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
