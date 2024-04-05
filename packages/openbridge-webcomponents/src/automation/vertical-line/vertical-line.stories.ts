import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcVerticalLine } from './vertical-line';
import './vertical-line';
import '../horizontal-line/horizontal-line';
import { html } from 'lit';

const meta: Meta<typeof ObcVerticalLine> = {
  title: 'Line/Vertical line',
  tags: ['autodocs'],
  component: "obc-vertical-line",
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: { type: 'radio' }
    }
  }
} satisfies Meta<ObcVerticalLine>;

export default meta;
type Story = StoryObj<ObcVerticalLine>;

export const Primary: Story = {
  args: {
    length: 3
  },
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: { type: 'radio' }
    },
    lineType: {
      options: ['fluid', 'electric', 'air', 'connector'],
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

        #line1 {
          position: absolute;
          top: 24px;
        }

        #line2 {
          position: absolute;
          top: calc(24px * 3);
          left: calc(24px * 5);
        }
        #line3 {
          position: absolute;
          top: calc(24px * 3);
          left: calc(24px * 5);
        }
      </style>
      <div class="canvas">
        <obc-vertical-line length="5" id="line1"></obc-vertical-line>
        <obc-vertical-line length="2" id="line2"></obc-vertical-line>
        <obc-horizontal-line length="5" id="line3"></obc-horizontal-line>
      </div>
      `
  }
}