import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcThruster} from './thruster';
import './thruster';
import {InstrumentState} from '../types';

const meta: Meta<typeof ObcThruster> = {
  title: 'Navigation instruments/Thruster',
  tags: ['autodocs'],
  component: 'obc-thruster',
  args: {},
  argTypes: {
    setpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
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

export const Tunnel: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.inCommand,
    tunnel: true,
  },
};

export const InCommandAtSetpoint: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    atSetpoint: true,
    state: InstrumentState.inCommand,
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
