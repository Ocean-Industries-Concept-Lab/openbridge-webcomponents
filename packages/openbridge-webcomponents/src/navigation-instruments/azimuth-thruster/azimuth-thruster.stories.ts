import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcAzimuthThruster } from './azimuth-thruster';
import './azimuth-thruster';
import { InstrumentState, Size } from '../types';

const meta: Meta<typeof ObcAzimuthThruster> = {
  title: 'Navigation instruments/Azumuth thruster',
  tags: ['autodocs'],
  component: "obc-azimuth-thruster",
  args: {
  },
} satisfies Meta<ObcAzimuthThruster>;

export default meta;
type Story = StoryObj<ObcAzimuthThruster>;

export const InCommand: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 70,
    angle: 30,
    angleSetpoint: 40,
    state: InstrumentState.inCommand,
  },
}

export const InCommandAtSetpoint: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    atThrustSetpoint: true,
    angle: 30,
    angleSetpoint: 30,
    atAngleSetpoint: true,
    state: InstrumentState.inCommand,
  },
}

export const Active: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 70,
    angle: 30,
    angleSetpoint: 40,
    state: InstrumentState.active,
  },
}

export const ActiveAtSetpoint: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    atThrustSetpoint: true,
    angle: 30,
    angleSetpoint: 30,
    atAngleSetpoint: true,
    state: InstrumentState.active,
  },
}

export const Loading: Story = {
  args: {
    size: Size.large,
    thrust: 0,
    thrustSetpoint: 0,
    angle: 0,
    angleSetpoint: 0,
    state: InstrumentState.loading,
  },
}

export const Off: Story = {
  args: {
    size: Size.large,
    thrust: 0,
    thrustSetpoint: 0,
    angle: 0,
    angleSetpoint: 0,
    state: InstrumentState.off,
  },
}
