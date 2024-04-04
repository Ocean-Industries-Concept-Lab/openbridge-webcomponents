import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcHorizontalPipe } from './horizontal-pipe';
import './horizontal-pipe';
import { html } from 'lit';

const meta: Meta<typeof ObcHorizontalPipe> = {
  title: 'Pipe/Horizontal pipe',
  tags: ['autodocs'],
  component: "obc-horizontal-pipe",
  args: {
  },
} satisfies Meta<ObcHorizontalPipe>;

export default meta;
type Story = StoryObj<ObcHorizontalPipe>;

export const Primary: Story = {
  args: {
    length: 3
  },
}

export const Complex: Story = {
  render: () => {
    return html`
      <style>
        .canvas {
          display: relative;
          width: 400px;
          height: 400px;
        }

        #pipe1 {
          position: absolute;
          top: 24px;
        }

        #pipe2 {
          position: absolute;
          top: calc(24px * 3);
          left: calc(24px * 5);
        }
      </style>
      <obc-horizontal-pipe length="5" id="pipe1"></obc-horizontal-pipe>
      <obc-horizontal-pipe length="2" id="pipe2"></obc-horizontal-pipe>
      `
  }
}