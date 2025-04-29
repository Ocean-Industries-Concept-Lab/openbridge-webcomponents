import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcSpeedGauge} from './speed-gauge';
import './speed-gauge';
import {widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcSpeedGauge> = {
  title: 'Navigation Instruments/Speed gauge',
  tags: ['autodocs'],
  component: 'obc-speed-gauge',
  args: {
    minSpeed: -20,
    maxSpeed: 100,
    width: 512,
    speed: 50,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    speed: {control: {type: 'range', min: 0, max: 100, step: 1}},
    minSpeed: {control: {type: 'range', min: -20, max: 0, step: 1}},
    maxSpeed: {control: {type: 'range', min: 0, max: 100, step: 1}},
    speed: {control: {type: 'range', min: -20, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -20, max: 100, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcSpeedGauge>;

export default meta;
type Story = StoryObj<ObcSpeedGauge>;

export const Primary: Story = {
  args: {},
};
