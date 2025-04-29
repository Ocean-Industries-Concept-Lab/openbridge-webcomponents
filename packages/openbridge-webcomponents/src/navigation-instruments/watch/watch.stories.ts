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
    cutAngleStart: {control: {type: 'range', min: 0, max: 360, step: 1}},
    cutAngleEnd: {control: {type: 'range', min: 0, max: 360, step: 1}},
    padding: {control: {type: 'range', min: 0, max: 100, step: 1}},
    vesselImage: {
      control: {type: 'select'},
      options: Object.values(VesselImage),
    },
    vesselImageSize: {
      control: {type: 'select'},
      options: Object.values(VesselImageSize),
    },
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
    vesselImageSize: VesselImageSize.large,
    vesselImage: VesselImage.psvTop,
    vesselImageTransform: 'rotate(10deg)',
  },
  argTypes: {
    angleSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
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
    roundInsideCut: true,
    roundOutsideCut: true,
    cutAngleStart: 90,
    cutAngleEnd: 270,
  },
};

export const Cut: Story = {
  args: {
    roundInsideCut: false,
    roundOutsideCut: false,
    cutAngleStart: 90,
    cutAngleEnd: 270,
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

export const Off: Story = {
  args: {
    width: 400,
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    angleSetpoint: 90,
    state: 'off',
    watchCircleType: 'triple',
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
    width: 400,
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    angleSetpoint: 90,
    state: 'inCommand',
    watchCircleType: 'triple',
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

export const CutTriple: Story = {
  args: {
    width: 400,
    windSymbolRadius: 160,
    currentSymbolRadius: 160,
    roundInsideCut: true,
    roundOutsideCut: true,
    cutAngleStart: 90,
    cutAngleEnd: 270,
    watchCircleType: 'triple',
  },
};
