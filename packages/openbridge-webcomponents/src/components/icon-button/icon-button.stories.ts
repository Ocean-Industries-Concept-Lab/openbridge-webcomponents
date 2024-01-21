import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit-html';
import {ObcIconButton} from './icon-button';
import './icon-button';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcIconButton> = {
  title: 'Button/Icon',
  tags: ['autodocs'],
  component: 'obc-icon-button',
  args: {
    icon: '01-placeholder',
    size: 'regular',
  },
  render: (args) => html`
    <obc-icon-button
      variant=${args.variant}
      size=${args.size}
      ?corner-left=${args.cornerLeft}
      ?corner-right=${args.cornerRight}
      ?active-color=${args.activeColor}
    >
      ${iconIdToIconHtml(args.icon)}
    </obc-icon-button>
  `,
  argTypes: {
    icon: {
      options: iconIds,
      control: {type: 'select'},
    },
    variant: {
      options: ['normal', 'flat', 'raised'],
      control: {type: 'select'},
    },
    size: {
      options: ['regular', 'large'],
      control: {type: 'select'},
    },
    cornerLeft: {
      control: {type: 'boolean'},
    },
    cornerRight: {
      control: {type: 'boolean'},
    },
    'active-color': {
      control: {type: 'boolean'},
    },
  },
} satisfies Meta<ObcIconButton>;

export default meta;
type Story = StoryObj<ObcIconButton>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Normal: Story = {
  args: {
    variant: 'normal',
  },
};

export const Large: Story = {
  args: {
    variant: 'normal',
    size: 'large',
  },
};

export const Raised: Story = {
  args: {
    variant: 'raised',
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
  },
};

export const CornerLeft: Story = {
  args: {
    variant: 'normal',
    cornerLeft: true,
  },
};

export const CornerRight: Story = {
  args: {
    variant: 'normal',
    cornerRight: true,
  },
};
