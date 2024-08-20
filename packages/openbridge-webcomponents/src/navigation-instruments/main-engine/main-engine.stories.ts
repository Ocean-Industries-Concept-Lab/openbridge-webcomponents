import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcMainEngine } from './main-engine';
import './main-engine';
import { beta6Decorator, widthDecorator } from '../../storybook-util';
import { InstrumentState } from '../types';

const meta: Meta<typeof ObcMainEngine> = {
  title: 'Navigation instruments/Main Engine',
  tags: ['autodocs'],
  component: "obc-main-engine",
  args: {
    width: 352,
    thrust: 50,
    thrustSetpoint: 30,
    speed: 50,
    speedSetpoint: 30,
  },
  argTypes: {
    width: { control: { type: 'range', min: 32, max: 1028, step: 1 } },
    thrust: { control: { type: 'range', min: -100, max: 100, step: 1 } },
    thrustSetpoint: { control: { type: 'range', min: -100, max: 100, step: 1 } },
    speed: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    speedSetpoint: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    state: {
      options: Object.values(InstrumentState),
    },
  },
  decorators: [widthDecorator, beta6Decorator],
} satisfies Meta<ObcMainEngine>;

export default meta;
type Story = StoryObj<ObcMainEngine>;

export const inCommand: Story = {
  args: {
    state: InstrumentState.inCommand,
  },
}

export const active: Story = {
  args: {
    state: InstrumentState.active,
  },
}