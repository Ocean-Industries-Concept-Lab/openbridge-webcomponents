import type {Meta, StoryObj} from '@storybook/web-components';
import {CardListButton} from './card-list-button';
import './card-list-button';
import '../icon/icon';
import {iconIds} from '../../icons/names';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof CardListButton> = {
  title: 'Application/Card list button',
  tags: ['autodocs'],
  component: 'obc-card-list-button',
  args: {
    label: 'Button',
    leadingIcon: '01-placeholder',
  },
  argTypes: {
    label: {
      control: {type: 'text'},
    },
    leadingIcon: {
      options: iconIds,
      control: {type: 'select'},
    },
    trailingIcon: {
      options: iconIds,
      control: {type: 'select'},
    },
  },
  render: (args) => `<obc-card-list-button>
    ${
      args.leadingIcon
        ? `<obc-icon slot="leading-icon" icon=${args.leadingIcon} size="24"></obc-icon>`
        : ''
    }
    ${args.label}
    ${
      args.trailingIcon
        ? `<obc-icon slot="trailing-icon" icon=${args.trailingIcon} size="24"></obc-icon>`
        : ''
    }
    </obc-card-list-button>`,
} satisfies Meta<CardListButton>;

export default meta;
type Story = StoryObj<CardListButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Normal: Story = {
  args: {
    variant: 'normal',
    leadingIcon: '01-placeholder',
    trailingIcon: '01-placeholder',
  },
};
