import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcCurrent, CurrentType} from './current.js';
import './current.js';
import {Priority} from '../types.js';
import {widthDecorator} from '../../storybook-util.js';
import {topVessels} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcCurrent> = {
  title: 'Instruments/Current',
  tags: ['autodocs', 'experimental'],
  component: 'obc-current',
  decorators: [widthDecorator],
  args: {
    width: 400,
    type: CurrentType.vessel,
    currentSpeed: 3,
    currentFromDirection: 330,
    vesselHeadingDeg: 15,
    priority: Priority.regular,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1000, step: 1}},
    type: {
      control: 'inline-radio',
      options: [CurrentType.vessel, CurrentType.direction],
    },
    currentSpeed: {
      control: {type: 'range', min: 0, max: 4, step: 1},
      description: 'Current strength bucket (number of chevrons).',
    },
    currentFromDirection: {control: {type: 'range', min: 0, max: 360, step: 1}},
    vesselHeadingDeg: {control: {type: 'range', min: 0, max: 360, step: 1}},
    priority: {
      control: 'inline-radio',
      options: [Priority.regular, Priority.enhanced],
    },
    vesselImage: {
      control: 'select',
      options: topVessels,
    },
    hasPattern: {control: 'boolean'},
    waveLength: {
      control: {type: 'range', min: 0.25, max: 3, step: 0.05},
      description:
        'Wavelength multiplier on the design band spacing (1 = design).',
    },
    waveHeight: {
      control: {type: 'range', min: 0, max: 1, step: 0.05},
      description: 'Peak opacity the pattern bands fade up to.',
    },
    waveSpeed: {
      control: {type: 'range', min: -2, max: 2, step: 0.1},
      description:
        'Pattern drift in wavelengths per second, with the flow (0 = static).',
    },
  },
} satisfies Meta<ObcCurrent>;

export default meta;
type Story = StoryObj<ObcCurrent>;

export const Default: Story = {
  args: {},
};

export const Direction: Story = {
  args: {type: CurrentType.direction},
};

export const VesselEnhanced: Story = {
  args: {priority: Priority.enhanced},
};

export const DirectionEnhanced: Story = {
  args: {type: CurrentType.direction, priority: Priority.enhanced},
};

export const WithoutPattern: Story = {
  args: {hasPattern: false},
};

/** Denser, softer waves: half the design wavelength at reduced intensity. */
export const WaveTuned: Story = {
  args: {waveLength: 0.5, waveHeight: 0.6},
};

/**
 * The pattern drifts with the flow at `waveSpeed` wavelengths per second
 * (excluded from visual tests because it animates continuously).
 */
export const AnimatedWaves: Story = {
  tags: ['skip-test'],
  args: {waveSpeed: 0.4},
};
