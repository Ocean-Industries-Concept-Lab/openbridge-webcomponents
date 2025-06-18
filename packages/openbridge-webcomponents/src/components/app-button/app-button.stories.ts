import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAppButton, AppButtonSize} from './app-button.js';
import './app-button.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {html} from 'lit';

const meta: Meta<typeof ObcAppButton> = {
  title: 'Button/App button',
  tags: ['autodocs', '6.0'],
  component: 'obc-app-button',
  args: {
    size: AppButtonSize.Normal,
    icon: 'ship',
    label: 'Button',
  },
  argTypes: {
    icon: {
      control: {type: 'select'},
      options: iconIds,
    },
    size: {
      control: {type: 'select'},
      options: Object.values(AppButtonSize),
    },
    label: {
      control: {type: 'text'},
    },
    checked: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => {
    const icon = args.icon
      ? iconIdToIconHtml(args.icon, {size: 24, slot: 'icon'})
      : '';
    return html`<obc-app-button
      .size=${args.size}
      ?checked=${args.checked}
      .label=${args.label}
      >${icon}</obc-app-button
    >`;
  },
} satisfies Meta<ObcAppButton>;

export default meta;
type Story = StoryObj<ObcAppButton>;

export const Primary: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
