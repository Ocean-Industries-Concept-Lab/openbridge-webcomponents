import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAzimuthThruster} from './azimuth-thruster';
import './azimuth-thruster';
import {InstrumentState, Size} from '../types';
import {html} from 'lit';

const meta: Meta<typeof ObcAzimuthThruster> = {
  title: 'Navigation instruments/Azimuth thruster',
  tags: ['autodocs'],
  component: 'obc-azimuth-thruster',
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    thrust: {control: {type: 'range', min: -100, max: 100, step: 1}},
    thrustSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    angle: {control: {type: 'range', min: -180, max: 180, step: 1}},
    angleSetpoint: {control: {type: 'range', min: -180, max: 180, step: 1}},
  },
  args: {
    width: 512,
  },
  render: (args) => html`
    <div style="width: ${args.width}px; height: ${args.width}px">
      <obc-azimuth-thruster
        .size=${args.size}
        .thrust=${args.thrust}
        .thrustSetpoint=${args.thrustSetpoint}
        .angle=${args.angle}
        .angleSetpoint=${args.angleSetpoint}
        .state=${args.state}
        .atThrustSetpoint=${args.atThrustSetpoint}
        .atAngleSetpoint=${args.atAngleSetpoint}
        .loading=${args.loading}
      ></obc-azimuth-thruster>
    </div>
  `,
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
};

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
};

export const Active: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 70,
    angle: 30,
    angleSetpoint: 40,
    state: InstrumentState.active,
  },
};

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
};

export const Loading: Story = {
  args: {
    size: Size.large,
    thrust: 0,
    thrustSetpoint: 0,
    angle: 0,
    angleSetpoint: 0,
    state: InstrumentState.loading,
    loading: 60,
  },
};

export const Off: Story = {
  args: {
    size: Size.large,
    thrust: 0,
    thrustSetpoint: 0,
    angle: 0,
    angleSetpoint: 0,
    state: InstrumentState.off,
  },
};
