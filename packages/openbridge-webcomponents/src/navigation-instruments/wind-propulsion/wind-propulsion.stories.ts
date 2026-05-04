import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcWindPropulsion} from './wind-propulsion.js';
import './wind-propulsion.js';
import {InstrumentState, Priority} from '../types.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {SailType} from '../watch/sail-type.js';
import {WindPropulsionPriorityElement} from './wind-propulsion.js';

const meta: Meta<typeof ObcWindPropulsion> = {
  title: 'Instruments/Wind Propulsion',
  tags: ['autodocs', '6.0'],
  component: 'obc-wind-propulsion',
  argTypes: {
    forceAngle: {control: {type: 'range', min: -180, max: 180, step: 1}},
    sailAngle: {control: {type: 'range', min: -180, max: 180, step: 1}},
    sailAngleSetpoint: {
      control: {type: 'range', min: -180, max: 180, step: 1},
    },
    force: {control: {type: 'range', min: 0, max: 1000, step: 1}},
    maxForce: {control: {type: 'range', min: 1, max: 1000, step: 1}},
    state: {
      control: 'select',
      options: Object.values(InstrumentState),
    },
    priority: {
      control: 'select',
      options: Object.values(Priority),
    },
    sailType: {
      control: 'select',
      options: Object.values(SailType),
    },
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
    priorityElements: {
      control: 'check',
      options: Object.values(WindPropulsionPriorityElement),
    },
    touching: {control: 'boolean'},
    currentWindSpeedBeaufort: {
      control: {type: 'range', min: 0, max: 12, step: 1},
    },
    currentWindFromDirection: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
  },
  args: {
    width: 512,
    touching: false,
    tickmarkStyle: TickmarkStyle.regular,
    autoAtSailAngleSetpointDeadband: 2,
    sailAngleSetpointAtZeroDeadband: 0.5,
    sailType: SailType.solidSail,
    priorityElements: [],
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcWindPropulsion>;

export default meta;
type Story = StoryObj<ObcWindPropulsion>;

export const Default: Story = {
  args: {
    sailAngle: 0,
    forceAngle: 30,
    force: 50,
    sailAngleSetpoint: 10,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    priorityElements: [WindPropulsionPriorityElement.forceBar],
  },
};

export const WithAdvices: Story = {
  args: {
    sailAngle: 30,
    forceAngle: 45,
    force: 70,
    sailAngleSetpoint: 40,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    sailAngleAdvices: [
      {minAngle: 20, maxAngle: 50, type: AdviceType.advice, hinted: true},
      {minAngle: 60, maxAngle: 100, type: AdviceType.caution, hinted: true},
    ],
    priorityElements: [WindPropulsionPriorityElement.forceBar],
  },
};

export const AtSetpoint: Story = {
  args: {
    sailAngle: 30,
    forceAngle: 45,
    force: 60,
    sailAngleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
};

export const WithLabels: Story = {
  args: {
    sailAngle: 30,
    forceAngle: 45,
    force: 60,
    sailAngleSetpoint: 40,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    showLabels: true,
  },
};

export const WithLabelsInside: Story = {
  args: {
    sailAngle: 30,
    forceAngle: 45,
    force: 60,
    sailAngleSetpoint: 40,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    showLabels: true,
    tickmarksInside: true,
  },
};

export const WithWind: Story = {
  args: {
    sailAngle: 0,
    forceAngle: 30,
    force: 50,
    sailAngleSetpoint: 10,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    currentWindSpeedBeaufort: 5,
    currentWindFromDirection: 270,
    priorityElements: [WindPropulsionPriorityElement.forceBar],
  },
};

export const Loading: Story = {
  args: {
    sailAngle: 0,
    forceAngle: 0,
    force: 0,
    sailAngleSetpoint: undefined,
    state: InstrumentState.loading,
  },
};

export const Off: Story = {
  args: {
    sailAngle: 0,
    forceAngle: 0,
    force: 0,
    sailAngleSetpoint: undefined,
    state: InstrumentState.off,
  },
};
