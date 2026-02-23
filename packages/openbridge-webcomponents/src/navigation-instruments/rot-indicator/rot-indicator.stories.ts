import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRotIndicator} from './rot-indicator.js';
import './rot-indicator.js';

const meta: Meta<typeof ObcRotIndicator> = {
  title: 'Indicators/Rate of Turn Indicator',
  tags: ['6.0'],
  component: 'obc-rot-indicator',
  args: {},
  argTypes: {
    rotationsPerMinute: {
      control: {
        type: 'range',
        min: -3,
        max: 3,
        step: 0.1,
      },
    },
  },
} satisfies Meta<ObcRotIndicator>;

export default meta;
type Story = StoryObj<ObcRotIndicator>;

export const Primary: Story = {
  args: {},
};
