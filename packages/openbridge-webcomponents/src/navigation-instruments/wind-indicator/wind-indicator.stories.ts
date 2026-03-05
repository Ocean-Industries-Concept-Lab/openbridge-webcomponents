import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcWindIndicator} from './wind-indicator.js';
import './wind-indicator.js';

const meta: Meta<typeof ObcWindIndicator> = {
  title: 'Indicators/Wind Indicator',
  tags: ['6.0'],
  component: 'obc-wind-indicator',
  args: {
    angle: 90,
    speed: 10,
    northUp: true,
  },
  argTypes: {
    angle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    speed: {
      control: {type: 'range', min: 0, max: 12, step: 1},
    },
  },
} satisfies Meta<ObcWindIndicator>;

export default meta;
type Story = StoryObj<ObcWindIndicator>;

export const Default: Story = {};

export const NorthUp: Story = {
  args: {
    northUp: true,
  },
};

export const Relative: Story = {
  args: {
    northUp: false,
  },
};

export const NoWind: Story = {
  args: {
    speed: 0,
  },
};
