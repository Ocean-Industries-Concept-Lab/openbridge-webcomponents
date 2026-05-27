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
  speedKnots: number;
  rotationAngle: number;
  windFromAngle: number;
  angle?: number;
  'wind-from-angle'?: number;
  'rotation-angle'?: number;
  'speed-knots'?: number;
  iconIndex?: number;
  accentColor?: string;
  windIconCache?: unknown;
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
      .speedKnots=${args.speedKnots}
      .rotationAngle=${args.rotationAngle}
      .windFromAngle=${args.windFromAngle}
    ></obc-wind-indicator>
  `,
  args: {
    windFromAngle: 0,
    speedKnots: 35,
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
    windFromAngle: {
      name: 'Wind From Angle',
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
    speedKnots: {
      name: 'Speed (knots)',
      description:
        'Wind speed in knots. Mapped to barb icons in 5 kn steps (half-barb = 5 kn, full barb = 10 kn). Capped at 70 kn.',
      control: {type: 'range', min: 0, max: 80, step: 1},
    },

    angle: {table: {disable: true}, control: false},
    'wind-from-angle': {table: {disable: true}, control: false},
    'rotation-angle': {table: {disable: true}, control: false},
    'speed-knots': {table: {disable: true}, control: false},
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
    speedKnots: 60,
  },
};
