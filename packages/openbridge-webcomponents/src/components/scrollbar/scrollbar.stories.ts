import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcScrollbar} from './scrollbar.js';
import './scrollbar.js';
import {html} from 'lit';

const meta: Meta<typeof ObcScrollbar> = {
  title: 'UI Components/Menus and navigation/Scrollbar',
  tags: ['autodocs', '6.0'],
  component: 'obc-scrollbar',
  args: {
    type: 'wide',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['wide', 'normal', 'thin'],
    },
  },
  render: (args) => {
    return html`
      <obc-scrollbar style="height: 500px" class="obc-${args.type}-scrollbar">
        <div
          style="height: 1000px; width: 100%; background: linear-gradient(blue, red);"
        ></div>
      </obc-scrollbar>
    `;
  },
} satisfies Meta<ObcScrollbar>;

export default meta;
type Story = StoryObj<ObcScrollbar>;

export const Wide: Story = {
  args: {
    type: 'wide',
  },
};

export const Normal: Story = {
  args: {
    type: 'normal',
  },
};

export const Thin: Story = {
  args: {
    type: 'thin',
  },
};
