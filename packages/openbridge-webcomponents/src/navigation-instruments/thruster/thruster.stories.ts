import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcThruster} from './thruster';
import './thruster';
import {InstrumentState} from '../types';
import {html} from 'lit';
import {widthDecorator} from '../../storybook-util';
import {AdviceType} from '../watch/advice';

const meta: Meta<typeof ObcThruster> = {
  title: 'Navigation instruments/Thruster',
  tags: ['autodocs'],
  component: 'obc-thruster',
  args: {width: 320},
  argTypes: {
    thrust: {control: {type: 'range', min: -100, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
  },
  decorators: [widthDecorator],
  parameters: {
    badges: ['beta6'],
  },
} satisfies Meta<ObcThruster>;

export default meta;
type Story = StoryObj<ObcThruster>;

export const InCommand: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.inCommand,
  },
};

export const SingleSided: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.inCommand,
    singleSided: true,
  },
};

export const SingleSidedWithAdvice: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.inCommand,
    singleSided: true,
    advices: [
      {min: 20, max: 50, type: AdviceType.advice, hinted: true},
      {min: 60, max: 100, type: AdviceType.caution, hinted: true},
      {min: -100, max: -60, type: AdviceType.caution, hinted: true},
    ],
  },
};

/** Set setpoint to undefined to hide the setpoint */
export const NoSetpoint: Story = {
  args: {
    thrust: 50,
    setpoint: undefined,
    state: InstrumentState.inCommand,
  },
};

export const Tunnel: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.inCommand,
    tunnel: true,
  },
  decorators: [
    (story, contex) => {
      return html`<div style="width: ${contex.args.containerSize}px">
        ${story()}
      </div>`;
    },
  ],
};

export const InCommandAtSetpoint: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    state: InstrumentState.inCommand,
  },
};

/**
 *  Mode is used to highlight that the controller (lever) is being touched by the operator
 * This is used to make it easy for the operator to see which thruster is connected to the controller.
 */
export const InCommandTouching: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    state: InstrumentState.inCommand,
    touching: true,
  },
};

export const InCommandAtSetpointManual: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    state: InstrumentState.inCommand,
    atSetpoint: true,
    disableAutoAtSetpoint: true,
  },
};

export const Active: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
  },
};

export const ActiveAtSetpoint: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    atSetpoint: true,
    state: InstrumentState.active,
  },
};

export const Loading: Story = {
  args: {
    thrust: 0,
    setpoint: 0,
    state: InstrumentState.loading,
  },
};

export const Off: Story = {
  args: {
    thrust: 0,
    setpoint: 0,
    state: InstrumentState.off,
  },
};
