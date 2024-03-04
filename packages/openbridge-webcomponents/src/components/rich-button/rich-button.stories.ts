import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcRichButton} from './rich-button';
import './rich-button';
import {html} from 'lit';
import '../../icons/icon-01-placeholder';
import '../../icons/icon-02-chevron-right';

const meta: Meta<typeof ObcRichButton> = {
  title: 'Button/Rich button',
  tags: ['autodocs'],
  component: 'obc-rich-button',
  args: {
    position: 'regular',
  },
  parameters: {
    backgrounds: {
      default: 'container-section-color',
    },
  },
  argTypes: {
    position: {
      control: {type: 'select'},
      options: ['regular', 'top', 'bottom', 'center'],
    },
  },
  decorators: (story) => html`<div style="width: 400px;">${story()}</div>`,
  render: (args) =>
    html`<obc-rich-button position=${args.position}>
      <obi-01-placeholder slot="leading-icon"></obi-01-placeholder>
      <div slot="label">Title</div>
      <div slot="description">
        Description with multiple lines of text and more than one line of
        description
      </div>
      <obi-02-chevron-right slot="trailing-icon"></obi-02-chevron-right>
    </obc-rich-button> `,
} satisfies Meta<ObcRichButton>;

export default meta;
type Story = StoryObj<ObcRichButton>;

export const Regular: Story = {};

export const Top: Story = {
  args: {
    position: 'top',
  },
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
  },
};

export const Center: Story = {
  args: {
    position: 'center',
  },
};
