import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcRotIndicator} from './rot-indicator';
import './rot-indicator';

const meta: Meta<typeof ObcRotIndicator> = {
  title: 'Navigation instruments/Rot indicator',
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
