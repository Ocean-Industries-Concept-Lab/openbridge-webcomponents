import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCardListButton} from './card-list-button';
import './card-list-button';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcCardListButton> = {
  title: 'Application/Card list button',
  tags: ['autodocs'],
  component: 'obc-card-list-button',
  args: {
    label: 'Button',
    leadingIcon: 'placeholder',
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
  render: (args) =>
    html`<obc-card-list-button>
      ${args.leadingIcon
        ? iconIdToIconHtml(args.leadingIcon, {size: 24, slot: 'leading-icon'})
        : ''}
      ${args.label}
      ${args.trailingIcon
        ? iconIdToIconHtml(args.trailingIcon, {size: 24, slot: 'trailing-icon'})
        : ''}
    </obc-card-list-button>`,
} satisfies Meta<ObcCardListButton>;

export default meta;
type Story = StoryObj<ObcCardListButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Normal: Story = {
  args: {
    variant: 'normal',
    leadingIcon: 'placeholder',
    trailingIcon: 'placeholder',
  },
};
