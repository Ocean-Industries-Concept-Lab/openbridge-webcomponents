import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRoll} from './roll.js';
import './roll.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcRoll> = {
  title: 'Instruments/Roll',
  tags: ['autodocs', '6.0'],
  component: 'obc-roll',
  args: {
    width: 400,
    roll: -10,
    minAvgRoll: -10,
    maxAvgRoll: 10,
    maxRollAdvice: 15,
    triggerRollAdvice: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    pitch: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    roll: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcRoll>;

export default meta;
type Story = StoryObj<ObcRoll>;

export const Primary: Story = {
  args: {},
};
