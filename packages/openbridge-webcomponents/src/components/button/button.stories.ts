import type {Meta, StoryObj} from '@storybook/web-components';
import {Button} from './button';
import './button';
import '../icon/icon';
import {iconIds} from '../../icons';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Button/Button',
  tags: ['autodocs'],
  component: 'obc-button',
  args: {
    size: 'regular',
    label: 'Button',
    icon: '01-placeholder',
    fullWidth: false,
  },
  argTypes: {
    variant: {
      options: ['normal', 'flat', 'raised'],
      control: {type: 'select'},
    },
    size: {
      options: ['regular', 'large'],
      control: {type: 'select'},
    },
    fullWidth: {
      control: {type: 'boolean'},
    },
    label: {
      control: {type: 'text'},
    },
    leadingIcon: {
      options: iconIds,
      control: { type: 'select' },
    },
    trailingIcon: {
      options: iconIds,
      control: {type: 'select'},
    },
  },
  render: (args) => `<obc-button variant=${args.variant} size=${args.size} ${
    args.fullWidth ? 'full-width' : ''
  }>
    ${
      args.icon
        ? `<obc-icon slot="leading-icon" icon=${args.icon} size="24"></obc-icon>`
        : ''
    }
    ${args.label}</obc-button>`,
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<Button>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Normal: Story = {
  args: {
    variant: 'normal',
  },
};

export const NormalNoIcon: Story = {
  args: {
    variant: 'normal',
    icon: undefined,
  },
};

export const NormalFullWidth: Story = {
  args: {
    variant: 'normal',
    fullWidth: true,
  },
};

export const NormalFullWidthBothIcon: Story = {
  args: {
    variant: 'normal',
    fullWidth: true,
    trailingIcon: "01-placeholder"
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
  },
};

export const Raised: Story = {
  args: {
    variant: 'raised',
  },
};

export const NormalLarge: Story = {
  args: {
    variant: 'normal',
    size: 'large',
  },
};
