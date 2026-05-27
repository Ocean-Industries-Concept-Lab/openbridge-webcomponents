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
  currentWindSpeedBeaufort: number;
  rotationAngle: number;
  windFromAngle: number;
  angle?: number;
  'wind-from-angle'?: number;
  'rotation-angle'?: number;
  'current-wind-speed-beaufort'?: number;
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
      .currentWindSpeedBeaufort=${args.currentWindSpeedBeaufort}
      .rotationAngle=${args.rotationAngle}
      .windFromAngle=${args.windFromAngle}
    ></obc-wind-indicator>
  `,
  args: {
    windFromAngle: 0,
    currentWindSpeedBeaufort: 7,
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
    currentWindSpeedBeaufort: {
      name: 'Wind Speed (Beaufort)',
      description:
        'Wind force on the Beaufort scale. Matches the convention used by <obc-wind>.',
      control: {type: 'range', min: 0, max: 13, step: 1},
    },

    angle: {table: {disable: true}, control: false},
    'wind-from-angle': {table: {disable: true}, control: false},
    'rotation-angle': {table: {disable: true}, control: false},
    'current-wind-speed-beaufort': {table: {disable: true}, control: false},
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
    currentWindSpeedBeaufort: 12,
  },
};
