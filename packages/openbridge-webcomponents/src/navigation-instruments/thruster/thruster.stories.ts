import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcThruster} from './thruster';
import './thruster';
import {InstrumentState} from '../types';
import {html} from 'lit';
import { userEvent, within } from '@storybook/test';

const meta: Meta<typeof ObcThruster> = {
  title: 'Navigation instruments/Thruster',
  tags: ['autodocs'],
  component: 'obc-thruster',
  args: {containerSize: 320},
  argTypes: {
    thrust: {control: {type: 'range', min: -100, max: 100, step: 1}},
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

export const Demo: Story = {
  args: {
    amplitude: 1.5,
    noTransitions: true,
  },
  render: (args) => { 
    const thrust = 50;
    const setpoint = 30;

    return html`
    <obc-thruster
       data-testid="thruster"
      .thrust=${thrust}
      .setpoint=${setpoint}
      .autoAtSetpointDeadband=${2}
      ?noTransitions=${args.noTransitions}
      state=${InstrumentState.inCommand}
    ></obc-thruster>`
},
play: async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const thruster = canvas.getByTestId('thruster') as ObcThruster;

  const toSetpoint = () => {
    const timer = setInterval(() => {
      const diff = thruster.thrust - (thruster.setpoint ?? 30) > 0;
      const direction = diff ? -1 : 1;

      thruster.thrust += 5 / 60 * direction;
      if ( Math.abs(thruster.thrust - (thruster.setpoint ?? 30)) < 5 / 60){
        thruster.thrust = thruster.setpoint ?? 30;
        clearInterval(timer);
        aroundSetpoint();
      }
    }, 1000 / 60);
  };

  const aroundSetpoint = () => {
    const startTime = Date.now();
    const startThrust = thruster.thrust;
    const timer = setInterval(() => {
      thruster.thrust = startThrust + Math.sin((startTime - Date.now()) / 1000 * 3) * args.amplitude;
      if (Date.now() - startTime > 5_000) {
        clearInterval(timer);
        changeSetpoint();
      }
    }, 1000 / 60);
  }

  const changeSetpoint = () => {
    let newSetpoint = 30;
    let direction = -1;
    if (thruster.setpoint! < 50) {
      newSetpoint = 80;
      direction = 1;
    }

    console.log('newSetpoint', newSetpoint);

    const timer = setInterval(() => {
    thruster.setpoint! += 20/60 * direction;
    if (thruster.setpoint!*direction >= newSetpoint*direction) {
      thruster.setpoint = newSetpoint;
      clearInterval(timer);
      toSetpoint();
    }});
  }
  toSetpoint();
},
};
