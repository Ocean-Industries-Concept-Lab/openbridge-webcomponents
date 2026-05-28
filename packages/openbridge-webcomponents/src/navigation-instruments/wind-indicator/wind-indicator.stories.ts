import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  WindIndicatorDirection,
  WindIndicatorPriority,
  WindIndicatorType,
} from './wind-indicator.js';
import './wind-indicator.js';

type WindIndicatorArgs = {
  type: WindIndicatorType;
  direction: WindIndicatorDirection;
  priority: WindIndicatorPriority;
  currentWindSpeedKnots: number;
  rotationAngle: number;
  currentWindFromDirection: number;
  angle?: number;
  'wind-from-angle'?: number;
  'current-wind-from-direction'?: number;
  'rotation-angle'?: number;
  'current-wind-speed-knots'?: number;
  iconIndex?: number;
  accentColor?: string;
  windIconCache?: unknown;
  windFromAngle?: number;
};

const meta: Meta<WindIndicatorArgs> = {
  title: 'Indicators/Wind Indicator',
  tags: ['6.0'],
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  render: (args) => html`
    <obc-wind-indicator
      .type=${args.type}
      .direction=${args.direction}
      .priority=${args.priority}
      .currentWindSpeedKnots=${args.currentWindSpeedKnots}
      .rotationAngle=${args.rotationAngle}
      .currentWindFromDirection=${args.currentWindFromDirection}
    ></obc-wind-indicator>
  `,
  args: {
    currentWindFromDirection: 0,
    currentWindSpeedKnots: 35,
    type: WindIndicatorType.arrow,
    direction: WindIndicatorDirection.true,
    priority: WindIndicatorPriority.regular,
    rotationAngle: 0,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(WindIndicatorType),
    },
    direction: {
      control: {type: 'select'},
      options: Object.values(WindIndicatorDirection),
    },
    currentWindFromDirection: {
      name: 'Current Wind From Direction',
      description: 'Wind-from angle in degrees. 0/360 = wind from north.',
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    rotationAngle: {
      name: 'Rotation Angle',
      description:
        'Rotation angle of the frame in degrees. Used in relative mode.',
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    priority: {
      control: {type: 'select'},
      options: Object.values(WindIndicatorPriority),
    },
    currentWindSpeedKnots: {
      description:
        'Wind speed in knots. Mapped to barb icons in 5-kn steps (standard meteorological wind-barb convention).',
      control: {type: 'range', min: 0, max: 75, step: 1},
    },

    angle: {table: {disable: true}, control: false},
    windFromAngle: {table: {disable: true}, control: false},
    'wind-from-angle': {table: {disable: true}, control: false},
    'current-wind-from-direction': {table: {disable: true}, control: false},
    'rotation-angle': {table: {disable: true}, control: false},
    'current-wind-speed-knots': {table: {disable: true}, control: false},
    iconIndex: {table: {disable: true}, control: false},
    accentColor: {table: {disable: true}, control: false},
    windIconCache: {table: {disable: true}, control: false},
  },
} satisfies Meta<WindIndicatorArgs>;

export default meta;
type Story = StoryObj<WindIndicatorArgs>;

export const Arrow: Story = {
  args: {
    type: WindIndicatorType.arrow,
    direction: WindIndicatorDirection.true,
  },
};

export const ArrowRelative: Story = {
  args: {
    type: WindIndicatorType.arrow,
    direction: WindIndicatorDirection.relative,
  },
};

export const Shaft: Story = {
  args: {
    type: WindIndicatorType.shaft,
    direction: WindIndicatorDirection.true,
  },
};

export const ShaftRelative: Story = {
  args: {
    type: WindIndicatorType.shaft,
    direction: WindIndicatorDirection.relative,
  },
};

export const Labeled: Story = {
  args: {
    type: WindIndicatorType.labeled,
    direction: WindIndicatorDirection.true,
    priority: WindIndicatorPriority.regular,
    currentWindSpeedKnots: 60,
  },
};
