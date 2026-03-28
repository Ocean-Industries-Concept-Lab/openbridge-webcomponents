import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRateOfTurn} from './rate-of-turn.js';
import './rate-of-turn.js';
import {RotType, RotPosition} from './rot-renderer.js';
import {WatchCircleType} from '../watch/watch.js';
import {Priority} from '../types.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcRateOfTurn> = {
  title: 'Instruments/Rate of Turn',
  tags: ['autodocs', '6.0'],
  component: 'obc-rate-of-turn',
  args: {
    rotationsPerMinute: 1,
    type: RotType.dots,
    position: RotPosition.scale,
    priority: Priority.regular,
    barStartAngle: 0,
    barEndAngle: 30,
    width: 400,
  },
  argTypes: {
    rotationsPerMinute: {
      control: {type: 'range', min: -10, max: 10, step: 0.1},
      description:
        'rotations per minute. NB: storybook recreates the component on change, which resets the animation.',
    },
    type: {control: 'select', options: Object.values(RotType)},
    position: {control: 'select', options: Object.values(RotPosition)},
    priority: {control: 'select', options: Object.values(Priority)},
    barStartAngle: {control: {type: 'range', min: -180, max: 180, step: 1}},
    barEndAngle: {control: {type: 'range', min: -180, max: 180, step: 1}},
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    dotColor: {table: {disable: true}},
    barBgColor: {table: {disable: true}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcRateOfTurn>;

export default meta;
type Story = StoryObj<ObcRateOfTurn>;

export const Dots: Story = {
  args: {},
};

export const DotsEnhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const DotsInnerCircle: Story = {
  args: {
    position: RotPosition.innerCircle,
    watchCircleType: WatchCircleType.triple,
  },
};

export const Bar: Story = {
  args: {
    type: RotType.bar,
    barStartAngle: 0,
    barEndAngle: 45,
  },
};

export const BarEnhanced: Story = {
  args: {
    type: RotType.bar,
    barStartAngle: 0,
    barEndAngle: 45,
    priority: Priority.enhanced,
  },
};

export const BarInnerCircle: Story = {
  args: {
    type: RotType.bar,
    position: RotPosition.innerCircle,
    barStartAngle: 0,
    barEndAngle: 30,
    watchCircleType: WatchCircleType.triple,
  },
};

export const Demo: Story = {
  render: () => {
    const rateOfTurn = document.createElement('obc-rate-of-turn');
    rateOfTurn.rotationsPerMinute = 10;
    let t = 0;
    setInterval(() => {
      rateOfTurn.rotationsPerMinute = Math.cos((t * 2 * Math.PI) / 20) * 10;
      t += 1;
    }, 1000);
    return rateOfTurn;
  },
};
