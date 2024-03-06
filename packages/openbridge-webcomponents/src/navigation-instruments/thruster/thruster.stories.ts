import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcThruster} from './thruster';
import './thruster';
import {InstrumentState} from '../types';
import {html} from 'lit';

const meta: Meta<typeof ObcThruster> = {
  title: 'Navigation instruments/Thruster',
  tags: ['autodocs'],
  component: 'obc-thruster',
  args: {containerSize: 320},
  argTypes: {
    setpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
  },
  decorators: [
    (story, contex) => {
      return html`<div
        style="height: ${contex.args.containerSize}px; width: fit-content;"
      >
        ${story()}
      </div>`;
    },
  ],
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
