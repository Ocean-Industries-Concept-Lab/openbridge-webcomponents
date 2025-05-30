import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcSpeedIndicator} from './speed-indicator.js';
import './speed-indicator.js';

const meta: Meta<typeof ObcSpeedIndicator> = {
  title: 'Navigation Instruments/Speed indicator',
  tags: ['6.0'],
  component: 'obc-speed-indicator',
  argTypes: {
    speed: {
      control: {
        type: 'range',
        min: -20,
        max: 100,
        step: 1,
      },
    },
    maxSpeed: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
  args: {},
} satisfies Meta<ObcSpeedIndicator>;

export default meta;
type Story = StoryObj<ObcSpeedIndicator>;

export const Primary: Story = {
  args: {},
};
