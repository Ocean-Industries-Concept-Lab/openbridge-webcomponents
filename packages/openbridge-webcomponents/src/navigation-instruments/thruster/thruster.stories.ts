import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcThruster} from './thruster.js';
import './thruster.js';
import {InstrumentState, Priority} from '../types.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {PropellerType} from './propeller.js';

const meta: Meta<typeof ObcThruster> = {
  title: 'Instruments/Thruster',
  tags: ['autodocs', '6.0'],
  component: 'obc-thruster',
  args: {width: 320},
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    thrust: {control: {type: 'range', min: -100, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    newSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    touching: {control: 'boolean'},
    state: {
      options: Object.values(InstrumentState),
    },
    topPropeller: {
      options: Object.values(PropellerType),
    },
    bottomPropeller: {
      options: Object.values(PropellerType),
    },
    priority: {control: 'select', options: Object.values(Priority)},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcThruster>;

export default meta;
type Story = StoryObj<ObcThruster>;

export const InCommand: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
};

export const SingleSided: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    singleSided: true,
  },
};

export const PullingPod: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    singleSided: true,
    topPropeller: PropellerType.single,
    bottomPropeller: PropellerType.cap,
  },
};

export const PushingPod: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    singleSided: true,
    topPropeller: PropellerType.cap,
    bottomPropeller: PropellerType.single,
  },
};

export const SingleSidedWithAdvice: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    singleSided: true,
    advices: [
      {min: 20, max: 50, type: AdviceType.advice, hinted: true},
      {min: 60, max: 100, type: AdviceType.caution, hinted: true},
      {min: -100, max: -60, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const SingleDirection: Story = {
  args: {
    singleDirection: true,
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
};

export const SingleDirectionSingleSidedWithAdvice: Story = {
  args: {
    singleDirection: true,
    singleSided: true,
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    advices: [
      {min: 20, max: 50, type: AdviceType.advice, hinted: true},
      {min: 60, max: 100, type: AdviceType.caution, hinted: true},
    ],
  },
};

/** Set setpoint to undefined to hide the setpoint */
export const NoSetpoint: Story = {
  args: {
    thrust: 50,
    setpoint: undefined,
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
};

export const Tunnel: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    tunnel: true,
  },
};

export const TunnelSingleSided: Story = {
  args: {
    thrust: 0,
    setpoint: 0,
    state: InstrumentState.off,
    tunnel: true,
    singleSided: true,
  },
};

export const InCommandAtSetpoint: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    state: InstrumentState.active,
    priority: Priority.enhanced,
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
    state: InstrumentState.active,
    priority: Priority.enhanced,
    touching: true,
  },
};

export const InCommandAtSetpointManual: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    atSetpoint: true,
    autoAtSetpoint: false,
  },
};

export const NotInCommand: Story = {
  args: {
    thrust: 50,
    setpoint: 30,
    state: InstrumentState.active,
    priority: Priority.regular,
  },
};

export const NotInCommandAtSetpoint: Story = {
  args: {
    thrust: 50,
    setpoint: 50,
    atSetpoint: true,
    state: InstrumentState.active,
    priority: Priority.regular,
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
