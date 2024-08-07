import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcRudder} from './rudder';
import './rudder';
import {beta6Decorator, widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcRudder> = {
  title: 'Navigation Instruments/Rudder',
  tags: ['autodocs'],
  component: 'obc-rudder',
  args: {
    width: 512,
    angle: 30,
    setpoint: 45,
    maxAngle: 90,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    angle: {control: {type: 'range', min: -90, max: 90, step: 1}},
    maxAngle: {control: {type: 'range', min: 1, max: 90, step: 1}},
    setpoint: {control: {type: 'range', min: -90, max: 90, step: 1}},
  },
  decorators: [widthDecorator, beta6Decorator],
} satisfies Meta<ObcRudder>;

export default meta;
type Story = StoryObj<ObcRudder>;

export const Primary: Story = {
  args: {},
};
