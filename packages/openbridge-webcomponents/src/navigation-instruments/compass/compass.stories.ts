import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCompass} from './compass';
import './compass';
import {widthDecorator} from '../../storybook-util';
import {AdviceType} from '../watch/advice';

const meta: Meta<typeof ObcCompass> = {
  title: 'Navigation Instruments/Compass',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass',
  args: {
    width: 512,
    heading: 311,
    courseOverGround: 338,
    headingAdvices: [
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
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcCompass>;

export default meta;
type Story = StoryObj<ObcCompass>;

export const Primary: Story = {
  args: {},
};
