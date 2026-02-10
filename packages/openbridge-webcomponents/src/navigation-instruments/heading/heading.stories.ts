import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {CompassDirection, ObcHeading} from './heading.js';
import './heading.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';

const meta: Meta<typeof ObcHeading> = {
  title: 'Instruments/Heading',
  tags: ['6.0'],
  component: 'obc-heading',
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
    headingSetpoint: 311,
    direction: CompassDirection.NorthUp,
    touching: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    headingSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
    direction: {
      control: {type: 'select'},
      options: Object.values(CompassDirection),
    },
    touching: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcHeading>;

export default meta;
type Story = StoryObj<ObcHeading>;

export const Primary: Story = {
  args: {
    headingSetpoint: undefined,
  },
};

export const Enhanced: Story = {
  args: {
    enhanced: true,
    headingSetpoint: 311,
  },
};
