import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAzimuthThruster} from './azimuth-thruster';
import './azimuth-thruster';
import {InstrumentState, Size} from '../types';
import {beta6Decorator, widthDecorator} from '../../storybook-util';
import {AdviceType} from '../watch/advice';
import {PropellerType} from '../thruster/propeller';

const meta: Meta<typeof ObcAzimuthThruster> = {
  title: 'Navigation instruments/Azimuth thruster',
  tags: ['autodocs'],
  component: 'obc-azimuth-thruster',
  argTypes: {
    thrust: {control: {type: 'range', min: -100, max: 100, step: 1}},
    thrustSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    angle: {control: {type: 'range', min: -180, max: 180, step: 1}},
    angleSetpoint: {control: {type: 'range', min: -180, max: 180, step: 1}},
    state: {
      options: Object.values(InstrumentState),
    },
    topPropeller: {
      options: Object.values(PropellerType),
    },
    bottomPropeller: {
      options: Object.values(PropellerType),
    },
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
  },
  args: {
    width: 512,
    autoAtThrustSetpointDeadband: 1,
    autoAtAngleSetpointDeadband: 2,
    thrustSetpointAtZeroDeadband: 0.1,
  },
  decorators: [widthDecorator, beta6Decorator],
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
    angleAdvices: [
      {minAngle: 20, maxAngle: 50, type: AdviceType.advice, hinted: true},
      {minAngle: 60, maxAngle: 100, type: AdviceType.caution, hinted: true},
    ],
    thrustAdvices: [
      {min: 20, max: 50, type: AdviceType.advice, hinted: true},
      {min: 75, max: 100, type: AdviceType.caution, hinted: true},
      {min: -100, max: -75, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const InCommandAtSetpoint: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.inCommand,
  },
};

export const Pod: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.inCommand,
    topPropeller: PropellerType.single,
    bottomPropeller: PropellerType.cap,
  },
};

export const InCommandAtSetpointDisableAutoSetpoint: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 65,
    atThrustSetpoint: true,
    disableAutoAtThrustSetpoint: true,
    angle: 30,
    angleSetpoint: 35,
    atAngleSetpoint: true,
    disableAutoAtAngleSetpoint: true,
    state: InstrumentState.inCommand,
  },
};

export const SingleDirection: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.inCommand,
    singleDirection: true,
  },
};

export const SingleDirectionWithPropeller: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.inCommand,
    singleDirection: true,
    bottomPropeller: PropellerType.single,
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
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
  },
};

export const ActiveNoSetpoint: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: undefined,
    angle: 30,
    angleSetpoint: undefined,
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
