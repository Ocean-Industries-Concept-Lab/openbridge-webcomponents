import type { Meta, StoryObj } from '@storybook/web-components';
import { Slider } from './Slider';
import './Slider';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof Slider> = {
  title: 'Input/Slider',
  tags: ['autodocs'],
  component: "ob-slider",
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
    },
    step: {
      control: { type: 'number', min: 1, max: 100, step: 1 },
    },
    
    iconLeft: {
      options: ['01-placeholder', '04-brilliance-low', '04-brilliance-high'],
      control: { type: 'select' },
    },
    iconRight: {
      options: ['01-placeholder', '04-brilliance-low', '04-brilliance-high'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<Slider>;

export default meta;
type Story = StoryObj<Slider>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    value: 20,
    step: 5,
    iconLeft: '04-brilliance-low',
    iconRight: '04-brilliance-high',
  },
};