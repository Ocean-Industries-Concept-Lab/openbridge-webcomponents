import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRateOfTurn} from './rate-of-turn.js';
import './rate-of-turn.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcRateOfTurn> = {
  title: 'Navigation Instruments/Conning/Rate of turn/Rate of turn',
  tags: ['autodocs', '6.0'],
  component: 'obc-rate-of-turn',
  args: {
    rotationsPerMinute: 1,
    width: 400,
  },
  argTypes: {
    rotationsPerMinute: {
      control: {type: 'range', min: -2, max: 10, step: 0.1},
      description:
        'rotations per minute. NB: storybook recreates the component on change, which resets the animation.',
    },
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcRateOfTurn>;

export default meta;
type Story = StoryObj<ObcRateOfTurn>;

export const Primary: Story = {
  args: {},
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
