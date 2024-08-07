import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcWatch} from './watch';
import './watch';
import {widthDecorator} from '../../storybook-util';
import {AdviceState, AdviceType} from './advice';
import {InstrumentState} from '../types';

const meta: Meta<typeof ObcWatch> = {
  title: 'Building blocks/Watch',
  tags: ['autodocs'],
  component: 'obc-watch',
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 800, step: 10}},
    cutAngleStart: {control: {type: 'range', min: 0, max: 360, step: 1}},
    cutAngleEnd: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
  args: {
    width: 400,
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcWatch>;

export default meta;
type Story = StoryObj<ObcWatch>;

export const InCommand: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.inCommand,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const Active: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.active,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const CutRounded: Story = {
  args: {
    roundInsideCut: true,
    roundOutsideCut: true,
    cutAngleStart: 90,
    cutAngleEnd: 270,
  },
};

export const Cut: Story = {
  args: {
    roundInsideCut: false,
    roundOutsideCut: false,
    cutAngleStart: 90,
    cutAngleEnd: 270,
  },
};

export const Advice: Story = {
  args: {
    angleSetpoint: 90,
    advices: [
      {
        minAngle: 20,
        maxAngle: 50,
        type: AdviceType.advice,
        state: AdviceState.hinted,
      },
      {
        minAngle: 60,
        maxAngle: 100,
        type: AdviceType.advice,
        state: AdviceState.regular,
      },
      {
        minAngle: 110,
        maxAngle: 140,
        type: AdviceType.advice,
        state: AdviceState.triggered,
      },
      {
        minAngle: 190,
        maxAngle: 230,
        type: AdviceType.caution,
        state: AdviceState.hinted,
      },
      {
        minAngle: 240,
        maxAngle: 280,
        type: AdviceType.caution,
        state: AdviceState.regular,
      },
      {
        minAngle: 290,
        maxAngle: 320,
        type: AdviceType.caution,
        state: AdviceState.triggered,
      },
    ],
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};
