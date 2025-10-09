import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './advice-floating-item.js';
import {ObcAdviceFloatingItem} from './advice-floating-item.js';
import {
  ObcFloatingItemDirection,
  ObcFloatingItemType,
  ObcFloatingItemLineType,
} from '../floating-item/floating-item.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<ObcAdviceFloatingItem> = {
  title: 'Application Components/Notifications/Advice Floating Item',
  component: 'obc-advice-floating-item',
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
type Story = StoryObj<ObcAdviceFloatingItem>;

interface AdviceFloatingItemArgs {
  type: ObcFloatingItemType;
  lineType: ObcFloatingItemLineType;
  direction: ObcFloatingItemDirection;
  hasTimestamp: boolean;
  hasDay: boolean;
  action: boolean;
  action2: boolean;
}

type AdviceFloatingItemTemplate = (
  args: AdviceFloatingItemArgs
) => ReturnType<typeof html>;

const template: AdviceFloatingItemTemplate = (args) => html`
  <obc-advice-floating-item
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
    <span slot="title">Advice title</span>
    <span slot="description">
      ${'An advice message with meaningful content for the user.'}
    </span>
    ${args.hasTimestamp ? html`<span slot="time">09:12:46</span>` : ''}
    ${args.hasDay ? html`<span slot="day">Yesterday</span>` : ''}
    ${args.action ? html`<span slot="action">Close</span>` : ''}
    ${args.action2 ? html`<span slot="action2">Undo</span>` : ''}
  </obc-advice-floating-item>
`;

export const AdviceVerticalSingleRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const AdviceVerticalMultiRegular: Story = {
  render: template,
  args: {
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AdviceVerticalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
  },
};

export const AdviceVerticalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    direction: ObcFloatingItemDirection.vertical,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AdviceHorizontalSingleRegular: Story = {
  render: template,
  args: {},
};

export const AdviceHorizontalMultiRegular: Story = {
  render: template,
  args: {
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AdviceHorizontalSingleApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
  },
};

export const AdviceHorizontalMultiApplication: Story = {
  render: template,
  args: {
    type: ObcFloatingItemType.Application,
    lineType: ObcFloatingItemLineType.multiLine,
  },
};

export const AdviceAllPropsOn: Story = {
  render: template,
  args: {
    action: true,
    action2: true,
    hasTimestamp: true,
    hasDay: true,
  },
};

export const AdviceAllPropsOff: Story = {
  render: template,
  args: {
    action: false,
    action2: false,
    hasTimestamp: false,
    hasDay: false,
  },
};

export const AdviceLongMessage: Story = {
  render: (args) => html`
    <obc-advice-floating-item
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
      <span slot="title">Important Advice</span>
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
    </obc-advice-floating-item>
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
