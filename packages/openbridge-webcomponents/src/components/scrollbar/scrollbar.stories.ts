import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcScrollbar} from './scrollbar.js';
import './scrollbar.js';
import {html} from 'lit';

const meta: Meta<typeof ObcScrollbar> = {
  title: 'UI Components/Menus and Navigation/Scrollbar',
  tags: ['autodocs', '6.0'],
  component: 'obc-scrollbar',
  args: {
    type: 'wide',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'obc-wide-scrollbar',
        'obc-normal-scrollbar',
        'obc-thin-scrollbar',
      ],
      description:
        'Type of scrollbar NB: Add this as a CSS class to the scrollbar element, this is not a property of the component.',
      table: {
        category: 'CSS class',
      },
    },
  },
  render: (args) => {
    return html`
      <obc-scrollbar style="height: 500px" class=${args.type}>
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
    type: 'obc-wide-scrollbar',
  },
};

export const Normal: Story = {
  args: {
    type: 'obc-normal-scrollbar',
  },
};

export const Thin: Story = {
  args: {
    type: 'obc-thin-scrollbar',
  },
};
