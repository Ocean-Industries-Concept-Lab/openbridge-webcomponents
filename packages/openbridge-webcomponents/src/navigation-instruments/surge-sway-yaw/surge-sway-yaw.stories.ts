import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSurgeSwayYaw, SurgeSwayYawType} from './surge-sway-yaw.js';
import './surge-sway-yaw.js';
import {widthDecorator} from '../../storybook-util.js';
import {InstrumentState, Priority} from '../types.js';

const meta: Meta<typeof ObcSurgeSwayYaw> = {
  title: 'Instruments/Surge Sway Yaw',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-surge-sway-yaw',
  args: {
    width: 384,
    type: SurgeSwayYawType.input,
    surge: 0,
    sway: 0,
    yaw: 0,
    surgeSetpoint: 60,
    swaySetpoint: 75,
    yawSetpoint: 0,
    touching: false,
    animateSetpoint: false,
    primaryTickmarkInterval: 45,
    secondaryTickmarkInterval: 15,
    tertiaryTickmarkInterval: 5,
    showLabels: false,
    state: InstrumentState.active,
    priority: Priority.regular,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {control: 'select', options: Object.values(SurgeSwayYawType)},
    surge: {control: {type: 'range', min: -100, max: 100, step: 1}},
    sway: {control: {type: 'range', min: -100, max: 100, step: 1}},
    yaw: {control: {type: 'range', min: -180, max: 180, step: 1}},
    surgeSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    swaySetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    yawSetpoint: {control: {type: 'range', min: -180, max: 180, step: 1}},
    newSurgeSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    newSwaySetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    newYawSetpoint: {control: {type: 'range', min: -180, max: 180, step: 1}},
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcSurgeSwayYaw>;

export default meta;
type Story = StoryObj<ObcSurgeSwayYaw>;

export const Input: Story = {
  args: {},
};

export const InputEnhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const InputOutput: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 50,
    sway: 60,
    yaw: 35,
  },
};

export const InputOutputEnhanced: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 50,
    sway: 60,
    yaw: 35,
    priority: Priority.enhanced,
  },
};

export const NegativeValues: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: -40,
    sway: -70,
    yaw: -25,
    surgeSetpoint: -50,
    swaySetpoint: -80,
    yawSetpoint: -30,
  },
};

export const AtSetpoints: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 60,
    sway: 75,
    yaw: 30,
    surgeSetpoint: 60,
    swaySetpoint: 75,
    yawSetpoint: 30,
  },
};

export const AdjustingSetpoints: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 50,
    sway: 60,
    yaw: 35,
    newSurgeSetpoint: 80,
    newSwaySetpoint: 30,
    newYawSetpoint: 60,
  },
};

export const NoSetpoints: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 50,
    sway: 60,
    yaw: 35,
    surgeSetpoint: undefined,
    swaySetpoint: undefined,
    yawSetpoint: undefined,
  },
};

export const WithLabels: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 50,
    sway: 60,
    yaw: 35,
    showLabels: true,
  },
};

export const Loading: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 50,
    sway: 60,
    yaw: 35,
    state: InstrumentState.loading,
  },
};

export const Off: Story = {
  args: {
    type: SurgeSwayYawType.inputOutput,
    surge: 50,
    sway: 60,
    yaw: 35,
    state: InstrumentState.off,
  },
};
