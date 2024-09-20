import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCompass} from './compass';
import './compass';
import {beta6Decorator, widthDecorator} from '../../storybook-util';
import {AdviceType} from '../watch/advice';

const meta: Meta<typeof ObcCompass> = {
  title: 'Navigation Instruments/Compass',
  tags: ['autodocs'],
  component: 'obc-compass',
  args: {
    width: 512,
    heading: 311,
    padding: 72,
    courseOverGround: 338,
    headingAdvices: [
      {minAngle: 60, maxAngle: 100, type: AdviceType.caution, hinted: true},
      {
        minAngle: 20,
        maxAngle: 50,
        type: AdviceType.advice,
        hinted: false,
      },
    ],
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    padding: {control: {type: 'range', min: 0, max: 200, step: 1}},
  },
  decorators: [widthDecorator, beta6Decorator],
} satisfies Meta<ObcCompass>;

export default meta;
type Story = StoryObj<ObcCompass>;

export const Primary: Story = {
  args: {},
};
