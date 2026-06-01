import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcBearingIndicator} from './bearing-indicator.js';
import './bearing-indicator.js';

const meta: Meta<typeof ObcBearingIndicator> = {
  title: 'Indicators/Bearing Indicator',
  tags: ['6.0'],
  component: 'obc-bearing-indicator',
  args: {},
  argTypes: {
    bearingDeg: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1,
      },
    },
  },
} satisfies Meta<ObcBearingIndicator>;

export default meta;
type Story = StoryObj<ObcBearingIndicator>;

export const Primary: Story = {
  args: {},
};
