import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAppButton} from './app-button';
import './app-button';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';
import {html, unsafeCSS} from 'lit';

const meta: Meta<typeof ObcAppButton> = {
  title: 'Button/App button',
  tags: ['autodocs'],
  component: 'obc-app-button',
  args: {
    size: 'normal',
    icon: '06-ship',
    label: 'Button',
  },
  argTypes: {
    icon: {
      control: {type: 'select'},
      options: iconIds,
    },
    size: {
      control: {type: 'select'},
      options: ['normal', 'small'],
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
      size=${args.size}
      ?checked=${args.checked}
      label=${args.label}
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
