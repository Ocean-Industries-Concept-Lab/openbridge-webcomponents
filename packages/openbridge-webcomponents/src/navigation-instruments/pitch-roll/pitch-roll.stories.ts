import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPitchRoll} from './pitch-roll';
import './pitch-roll';
import {widthDecorator} from '../../storybook-util';
import {AdviceType, AdviceState} from '../watch/advice';
const meta: Meta<typeof ObcPitchRoll> = {
  title: 'Navigation Instruments/Pitch Roll',
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
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    pitch: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    roll: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitchRoll>;

export default meta;
type Story = StoryObj<ObcPitchRoll>;

export const Primary: Story = {
  args: {},
};
