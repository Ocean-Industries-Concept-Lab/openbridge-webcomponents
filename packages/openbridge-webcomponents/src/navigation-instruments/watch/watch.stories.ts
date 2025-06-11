import type {Meta, StoryObj} from '@storybook/web-components';
import {
  ObcWatch,
  VesselImage,
  VesselImageSize,
  WatchCircleType,
} from './watch.js';
import './watch.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceState, AdviceType} from './advice.js';
import {InstrumentState} from '../types.js';
import { TickmarkType } from './tickmark.js';

const meta: Meta<typeof ObcWatch> = {
  title: 'Building blocks/Watch',
  tags: ['autodocs'],
  component: 'obc-watch',
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 800, step: 10}},
    state: {control: {type: 'select'}, options: Object.values(InstrumentState)},
    watchCircleType: {
      control: {type: 'select'},
      options: Object.values(WatchCircleType),
    },
    areas: {control: {type: 'object'}},
    padding: {control: {type: 'range', min: 0, max: 100, step: 1}},
    vessels: {control: {type: 'object'}},
    wind: {control: {type: 'range', min: 0, max: 12, step: 1}},
    windFromDirectionDeg: {control: {type: 'range', min: 0, max: 360, step: 1}},
    windSymbolRadius: {control: {type: 'range', min: 0, max: 360, step: 1}},
    current: {control: {type: 'range', min: 0, max: 4, step: 1}},
    currentFromDirectionDeg: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    currentSymbolRadius: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
  args: {
    width: 400,
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcWatch>;

export default meta;
type Story = StoryObj<ObcWatch>;

export const InCommand: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.inCommand,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const WithVesselImage: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.inCommand,
    vessels: [
      {
        size: VesselImageSize.large,
        vesselImage: VesselImage.psvTop,
        transform: 'rotate(10deg)',
      },
    ],
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const WithBarAreas: Story = {
  args: {
    state: InstrumentState.inCommand,

    barAreas: [
      {
        startAngle: -90,
        endAngle: 0,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
    ],
    needles: [
      {
        angle: 0,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
    ],
    watchCircleType: WatchCircleType.double,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const WithStarboardPortIndicator: Story = {
  args: {
    state: InstrumentState.inCommand,
    starboardPortIndicator: true,
  },
};

export const WithWind: Story = {
  args: {
    wind: 10,
    windFromDirectionDeg: 116,
    padding: 70,
    windSymbolRadius: 190,
    current: 2,
    currentFromDirectionDeg: 238,
    currentSymbolRadius: 190,
    crosshairEnabled: true,
  },
};

export const Active: Story = {
  args: {
    angleSetpoint: 90,
    state: InstrumentState.active,
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const CutRounded: Story = {
  args: {
    areas: [
      {
        startAngle: 90,
        endAngle: 270,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ],
  },
};

export const Cut: Story = {
  args: {
    areas: [
      {
        startAngle: 90,
        endAngle: 270,
        roundInsideCut: false,
        roundOutsideCut: false,
      },
    ],
  },
};

export const Advice: Story = {
  args: {
    angleSetpoint: 90,
    advices: [
      {
        minAngle: 20,
        maxAngle: 50,
        type: AdviceType.advice,
        state: AdviceState.hinted,
      },
      {
        minAngle: 60,
        maxAngle: 100,
        type: AdviceType.advice,
        state: AdviceState.regular,
      },
      {
        minAngle: 110,
        maxAngle: 140,
        type: AdviceType.advice,
        state: AdviceState.triggered,
      },
      {
        minAngle: 190,
        maxAngle: 230,
        type: AdviceType.caution,
        state: AdviceState.hinted,
      },
      {
        minAngle: 240,
        maxAngle: 280,
        type: AdviceType.caution,
        state: AdviceState.regular,
      },
      {
        minAngle: 290,
        maxAngle: 320,
        type: AdviceType.caution,
        state: AdviceState.triggered,
      },
    ],
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
};

export const Tickmarks: Story = {
  args: {
    tickmarks: [
      // every 15 degrees
      ...Array.from({length: 24}, (_, i) => ({angle: i * 15, type: TickmarkType.secondary, text: `${i * 15}`})),
    ],
  },
};

export const TickmarksInside: Story = {
  args: {
    tickmarks: [
            ...Array.from({length: 24}, (_, i) => ({angle: i * 15, type: TickmarkType.secondary, text: `${i * 15}`})),

    ],
    tickmarksInside: true,
  },
};

export const Off: Story = {
  args: {
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    angleSetpoint: 90,
    state: InstrumentState.off,
    watchCircleType: WatchCircleType.triple,
  },

  argTypes: {
    angleSetpoint: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1,
      },
    },
  },
};

export const Tripple: Story = {
  args: {
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    angleSetpoint: 90,
    state: InstrumentState.inCommand,
    watchCircleType: WatchCircleType.triple,
  },

  argTypes: {
    angleSetpoint: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1,
      },
    },
  },
};

export const CutTripleWatch: Story = {
  args: {
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    areas: [
      {
        startAngle: 90,
        endAngle: 270,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ],
    watchCircleType: WatchCircleType.triple,
  },
};

export const MultiCut: Story = {
  args: {
    watchCircleType: WatchCircleType.double,
    areas: [
      {
        startAngle: 60,
        endAngle: 120,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
      {
        startAngle: 240,
        endAngle: 300,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
      {
        startAngle: 315,
        endAngle: 45,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
      {
        startAngle: 135,
        endAngle: 225,
        roundInsideCut: true,
        roundOutsideCut: true,
      },
    ],
    barAreas: [
      {
        startAngle: 70,
        endAngle: 110,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
      {
        startAngle: -10,
        endAngle: 10,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
      {
        startAngle: 190,
        endAngle: 170,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
      {
        startAngle: 240,
        endAngle: 300,
        fillColor: 'var(--instrument-enhanced-tertiary-color)',
      },
    ],
    needles: [
      {
        angle: 80,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 3,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 183,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
      {
        angle: 260,
        fillColor: 'var(--instrument-enhanced-secondary-color)',
        strokeColor: 'var(--border-silhouette-color)',
      },
    ],
    vessels: [
      {
        size: VesselImageSize.large,
        vesselImage: VesselImage.psvSide,
        transform: 'rotate(-10deg)',
      },
      {
        size: VesselImageSize.large,
        vesselImage: VesselImage.psvFore,
        transform: 'rotate(3deg)',
      },
    ],
  },
};
