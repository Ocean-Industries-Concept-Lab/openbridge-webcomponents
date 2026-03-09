import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSpeedGauge, ObcSpeedGaugeNeedleType} from './speed-gauge.js';
import './speed-gauge.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcSpeedGauge> = {
  title: 'Instruments/Speed Gauge',
  tags: ['autodocs', '6.0'],
  component: 'obc-speed-gauge',
  args: {
    minSpeed: -20,
    maxSpeed: 100,
    width: 512,
    speed: 50,
    priority: Priority.enhanced,
    touching: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    speed: {control: {type: 'range', min: -20, max: 100, step: 1}},
    minSpeed: {control: {type: 'range', min: -20, max: 0, step: 1}},
    maxSpeed: {control: {type: 'range', min: 0, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -20, max: 100, step: 1}},
    touching: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcSpeedGauge>;

export default meta;
type Story = StoryObj<ObcSpeedGauge>;

export const Enhanced: Story = {
  args: {priority: Priority.enhanced, setpoint: 40},
};
export const Regular: Story = {
  args: {priority: Priority.regular},
};

export const Labels: Story = {
  args: {showLabels: true},
};

export const NeedleBar: Story = {
  args: {needleType: ObcSpeedGaugeNeedleType.bar},
};

export const Advices: Story = {
  args: {
    speedAdvices: [
      {minSpeed: 5, maxSpeed: 10, type: AdviceType.advice, hinted: true},
      {minSpeed: 20, maxSpeed: 100, type: AdviceType.caution, hinted: true},
    ],
    speed: 25,
  },
};

export const Readout: Story = {
  args: {
    showReadout: true,
  },
};
