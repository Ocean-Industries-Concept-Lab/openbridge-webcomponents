import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPitchRoll, PitchRollPriorityElement} from './pitch-roll.js';
import './pitch-roll.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcPitchRoll> = {
  title: 'Instruments/Pitch Roll',
  tags: ['autodocs', '6.0'],
  component: 'obc-pitch-roll',
  args: {
    width: 400,
    pitch: 3,
    roll: -10,
    minAvgPitch: -6,
    maxAvgPitch: 6,
    minAvgRoll: -10,
    maxAvgRoll: 10,
    maxPitchAdvice: 5,
    maxRollAdvice: 15,
    triggerPitchAdvice: true,
    triggerRollAdvice: false,
    priority: Priority.enhanced,
    priorityElements: [
      PitchRollPriorityElement.pitch,
      PitchRollPriorityElement.roll,
    ],
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    pitch: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    roll: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(PitchRollPriorityElement),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitchRoll>;

export default meta;
type Story = StoryObj<ObcPitchRoll>;

export const Primary: Story = {
  args: {},
};
