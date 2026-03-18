import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-floating-item.js';
import {ObcAlertFloatingItem} from './alert-floating-item.js';
import {
  ObcFloatingItemDirection,
  ObcFloatingItemType,
  ObcFloatingItemLineType,
} from '../floating-item/floating-item.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<ObcAlertFloatingItem> = {
  title: 'Application Components/Alerts/Alert Floating Item',
  component: 'obc-alert-floating-item',
  tags: ['6.1'],
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
    action2: false,
    hasTimestamp: true,
    hasDay: false,
  },
};

export default meta;
type Story = StoryObj<ObcAlertFloatingItem>;

interface AlertFloatingItemArgs {
  type: ObcFloatingItemType;
  lineType: ObcFloatingItemLineType;
  direction: ObcFloatingItemDirection;
  hasTimestamp: boolean;
  hasDay: boolean;
  action: boolean;
  action2: boolean;
}

type AlertFloatingItemTemplate = (
  args: AlertFloatingItemArgs
) => ReturnType<typeof html>;

const template: AlertFloatingItemTemplate = (args) => html`
  <obc-alert-floating-item
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
    <span slot="title">Alert title</span>
    <span slot="description">
      ${'A long message of more than one line of text and meaningful content.'}
    </span>
    ${args.hasTimestamp ? html`<span slot="time">09:12</span>` : ''}
    ${args.hasDay ? html`<span slot="day">Yesterday</span>` : ''}
    ${args.action ? html`<span slot="action">ACK</span>` : ''}
    ${args.action2 ? html`<span slot="action2">Undo</span>` : ''}
  </obc-alert-floating-item>
`;

export const AlertVerticalSingleRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const AlertVerticalMultiRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AlertVerticalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const AlertVerticalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AlertHorizontalSingleRegular: Story = {
  render: template,
  args: {},
};

export const AlertHorizontalMultiRegular: Story = {
  render: template,
  args: {
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AlertHorizontalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
  },
};

export const AlertHorizontalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AlertAllPropsOn: Story = {
  render: template,
  args: {
    action: true,
    action2: true,
    hasTimestamp: true,
    hasDay: true,
  },
};

export const AlertAllPropsOff: Story = {
  render: template,
  args: {
    action: false,
    action2: false,
    hasTimestamp: false,
    hasDay: false,
  },
};

export const AlertLongMessage: Story = {
  render: (args) => html`
    <obc-alert-floating-item
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
      <span slot="title">Important Alert</span>
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
    </obc-alert-floating-item>
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
