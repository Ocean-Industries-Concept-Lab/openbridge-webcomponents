import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  DEFAULT_LONG_LAT_LEVELS,
  SpeedIndicatorType,
} from './speed-indicator.js';
import './speed-indicator.js';

type SpeedIndicatorStoryArgs = {
  type: SpeedIndicatorType;
  speed: number;
  maxSpeed: number;
  longLatLevels?: number[];
  debugLongLat: boolean;
  bowLevel: number;
  upperStarboardLevel: number;
  lowerStarboardLevel: number;
  sternLevel: number;
  lowerPortLevel: number;
  upperPortLevel: number;
};

const meta = {
  title: 'Indicators/Speed Indicator',
  tags: ['6.0', 'autodocs'],
  component: 'obc-speed-indicator',
  parameters: {
    layout: 'centered',
  },
  render: (args: SpeedIndicatorStoryArgs) => {
    const longLatLevels =
      args.type === SpeedIndicatorType.LongLat
        ? [
            args.bowLevel,
            args.upperStarboardLevel,
            args.lowerStarboardLevel,
            args.sternLevel,
            args.lowerPortLevel,
            args.upperPortLevel,
          ]
        : undefined;

    return html`
      <obc-speed-indicator
        .type=${args.type}
        .speed=${args.speed}
        .maxSpeed=${args.maxSpeed}
        .longLatLevels=${longLatLevels}
      ></obc-speed-indicator>
    `;
  },
  args: {
    type: SpeedIndicatorType.Needle,
    speed: 40,
    maxSpeed: 100,
    debugLongLat: false,
    bowLevel: DEFAULT_LONG_LAT_LEVELS[0],
    upperStarboardLevel: DEFAULT_LONG_LAT_LEVELS[1],
    lowerStarboardLevel: DEFAULT_LONG_LAT_LEVELS[2],
    sternLevel: DEFAULT_LONG_LAT_LEVELS[3],
    lowerPortLevel: DEFAULT_LONG_LAT_LEVELS[4],
    upperPortLevel: DEFAULT_LONG_LAT_LEVELS[5],
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(SpeedIndicatorType),
    },
    speed: {
      if: {arg: 'type', eq: SpeedIndicatorType.Needle},
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    maxSpeed: {
      if: {arg: 'type', eq: SpeedIndicatorType.Needle},
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
    },
    longLatLevels: {
      control: false,
      table: {disable: true},
    },
    debugLongLat: {
      control: false,
      table: {disable: true},
    },
    bowLevel: {
      name: 'Bow',
      if: {arg: 'debugLongLat', truthy: true},
      control: {type: 'range', min: 0, max: 3, step: 1},
    },
    upperStarboardLevel: {
      name: 'Upper Starboard',
      if: {arg: 'debugLongLat', truthy: true},
      control: {type: 'range', min: 0, max: 3, step: 1},
    },
    lowerStarboardLevel: {
      name: 'Lower Starboard',
      if: {arg: 'debugLongLat', truthy: true},
      control: {type: 'range', min: 0, max: 3, step: 1},
    },
    sternLevel: {
      name: 'Stern',
      if: {arg: 'debugLongLat', truthy: true},
      control: {type: 'range', min: 0, max: 3, step: 1},
    },
    lowerPortLevel: {
      name: 'Lower Port',
      if: {arg: 'debugLongLat', truthy: true},
      control: {type: 'range', min: 0, max: 3, step: 1},
    },
    upperPortLevel: {
      name: 'Upper Port',
      if: {arg: 'debugLongLat', truthy: true},
      control: {type: 'range', min: 0, max: 3, step: 1},
    },
  },
} satisfies Meta<SpeedIndicatorStoryArgs>;

export default meta;
type Story = StoryObj<SpeedIndicatorStoryArgs>;

export const Needle: Story = {
  args: {
    type: SpeedIndicatorType.Needle,
  },
};

export const LongLat: Story = {
  args: {
    type: SpeedIndicatorType.LongLat,
    debugLongLat: true,
    bowLevel: DEFAULT_LONG_LAT_LEVELS[0],
    upperStarboardLevel: DEFAULT_LONG_LAT_LEVELS[1],
    lowerStarboardLevel: DEFAULT_LONG_LAT_LEVELS[2],
    sternLevel: DEFAULT_LONG_LAT_LEVELS[3],
    lowerPortLevel: DEFAULT_LONG_LAT_LEVELS[4],
    upperPortLevel: DEFAULT_LONG_LAT_LEVELS[5],
  },
};
