import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcVerticalPipe } from './vertical-pipe';
import './vertical-pipe';
import '../horizontal-pipe/horizontal-pipe';
import { html } from 'lit';

const meta: Meta<typeof ObcVerticalPipe> = {
  title: 'Pipe/Vertical pipe',
  tags: ['autodocs'],
  component: "obc-vertical-pipe",
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: { type: 'radio' }
    }
  }
} satisfies Meta<ObcVerticalPipe>;

export default meta;
type Story = StoryObj<ObcVerticalPipe>;

export const Primary: Story = {
  args: {
    length: 3
  },
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: { type: 'radio' }
    }
  }
}

export const Complex: Story = {
  render: () => {
    return html`
      <style>
        .canvas {
          position: relative;
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
        #pipe3 {
          position: absolute;
          top: calc(24px * 3);
          left: calc(24px * 5);
        }
      </style>
      <div class="canvas">
        <obc-vertical-pipe length="5" id="pipe1"></obc-vertical-pipe>
        <obc-vertical-pipe length="2" id="pipe2"></obc-vertical-pipe>
        <obc-horizontal-pipe length="5" id="pipe3"></obc-horizontal-pipe>
      </div>
      `
  }
}