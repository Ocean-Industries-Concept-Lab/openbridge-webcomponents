import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAppButton, AppButtonSize} from './app-button.js';
import './app-button.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {html} from 'lit';

const meta: Meta<typeof ObcAppButton> = {
  title: 'UI Components/Buttons/App Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-app-button',
  args: {
    size: AppButtonSize.Normal,
    icon: 'ship',
    label: 'Button',
    showLabel: true,
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
    disabled: {
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
      .showLabel=${args.showLabel}
      ?integration=${args.integration}
      ?disabled=${args.disabled}
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

export const SmallHideLabel: Story = {
  args: {
    size: 'small',
    showLabel: false,
  },
};

export const Integration: Story = {
  args: {
    integration: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
