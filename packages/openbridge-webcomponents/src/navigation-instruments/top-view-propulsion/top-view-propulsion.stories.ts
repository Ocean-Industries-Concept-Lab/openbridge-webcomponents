import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTopViewPropulsion,
  TopViewPropulsionType,
} from './top-view-propulsion.js';
import './top-view-propulsion.js';
import {InstrumentState, Priority} from '../types.js';
import {widthDecorator} from '../../storybook-util.js';
import {topPropellers} from '../watch/propellers/storybook-helper.js';
import {TickmarkStyle} from '../watch/tickmark.js';

const meta: Meta<typeof ObcTopViewPropulsion> = {
  title: 'Instruments/Top View Propulsion',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-top-view-propulsion',
  args: {
    width: 384,
    priority: Priority.enhanced,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    faceDiameter: {control: {type: 'range', min: 100, max: 600, step: 10}},
    power: {control: {type: 'range', min: -100, max: 100, step: 1}},
    powerSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    loading: {control: {type: 'range', min: 0, max: 100, step: 1}},
    type: {control: 'select', options: Object.values(TopViewPropulsionType)},
    rpm: {control: {type: 'range', min: -100, max: 100, step: 1}},
    rpmSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    pitch: {control: {type: 'range', min: -100, max: 100, step: 1}},
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
    propeller: {control: 'select', options: topPropellers},
    tickmarkStyle: {control: 'select', options: Object.values(TickmarkStyle)},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcTopViewPropulsion>;

export default meta;
type Story = StoryObj<ObcTopViewPropulsion>;

export const PowerAtSetpoint: Story = {
  args: {
    power: 62.5,
    powerSetpoint: 62.5,
  },
};

export const PowerInput: Story = {
  args: {
    power: 62.5,
    powerSetpoint: 62.5,
    touching: true,
  },
};

export const PowerReady: Story = {
  args: {
    power: 0,
    powerSetpoint: 0,
  },
};

export const PowerNotAtSetpoint: Story = {
  args: {
    power: 40,
    powerSetpoint: 62.5,
  },
};

export const PowerRegularPriority: Story = {
  args: {
    power: 62.5,
    powerSetpoint: 62.5,
    priority: Priority.regular,
  },
};

export const PowerNegative: Story = {
  args: {
    power: -35,
    powerSetpoint: -35,
  },
};

export const PowerLoading: Story = {
  args: {
    power: 0,
    powerSetpoint: 0,
    state: InstrumentState.loading,
    loading: 65,
  },
};

export const PowerOff: Story = {
  args: {
    power: 0,
    powerSetpoint: 0,
    state: InstrumentState.off,
  },
};

export const Propellers: Story = {
  args: {
    power: 62.5,
    powerSetpoint: 62.5,
    propeller: topPropellers[5],
  },
};

export const PitchRpmAtSetpoint: Story = {
  args: {
    type: TopViewPropulsionType.pitchRpm,
    rpm: 62.5,
    rpmSetpoint: 62.5,
    pitch: 85,
  },
};

export const PitchRpmRegularPriority: Story = {
  args: {
    type: TopViewPropulsionType.pitchRpm,
    rpm: 62.5,
    rpmSetpoint: 62.5,
    pitch: 85,
    priority: Priority.regular,
  },
};

export const PitchRpmNegative: Story = {
  args: {
    type: TopViewPropulsionType.pitchRpm,
    rpm: -40,
    rpmSetpoint: -40,
    pitch: -60,
  },
};

export const PitchRpmOff: Story = {
  args: {
    type: TopViewPropulsionType.pitchRpm,
    rpm: 0,
    rpmSetpoint: 0,
    pitch: 0,
    state: InstrumentState.off,
  },
};
