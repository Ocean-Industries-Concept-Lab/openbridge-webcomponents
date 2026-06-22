import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  GaugeRadialSector,
  ObcGaugeRadial,
  ObcGaugeRadialType,
} from './gauge-radial.js';
import './gauge-radial.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {InstrumentState, Priority} from '../types.js';

type GaugeRadialStoryArgs = Partial<ObcGaugeRadial> & {
  width?: number;
  height?: number;
};

const meta = {
  title: 'Instruments/Gauge Radial',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-radial',
  decorators: [widthDecorator],
  args: {
    width: 400,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    height: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {control: 'select', options: Object.values(ObcGaugeRadialType)},
    sector: {control: 'select', options: Object.values(GaugeRadialSector)},
    priority: {control: 'select', options: Object.values(Priority)},
    state: {control: 'select', options: Object.values(InstrumentState)},
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    hasReadout: {control: 'boolean'},
    value: {control: 'number'},
    minValue: {control: 'number'},
    maxValue: {control: 'number'},
    primaryTickmarkInterval: {control: 'number'},
    secondaryTickmarkInterval: {control: 'number'},
    tertiaryTickmarkInterval: {control: 'number'},
    fractionDigits: {control: 'number'},
    label: {control: 'text'},
    unit: {control: 'text'},
    advices: {control: 'object'},
  },
} satisfies Meta<GaugeRadialStoryArgs>;

export default meta;
type Story = StoryObj<GaugeRadialStoryArgs>;

export const Positive: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
  },
};

export const Negative: Story = {
  args: {
    value: -50,
    maxValue: 100,
    minValue: -100,
    type: ObcGaugeRadialType.filled,
  },
};

export const EnhancedFilled: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    setpoint: 75,
  },
};

export const EnhancedBar: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.bar,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    setpoint: 75,
  },
};

export const EnhancedNeedle: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.needle,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    setpoint: 75,
  },
};

export const WithLabels: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    showLabels: true,
  },
};

export const WithAdvices: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    advices: [
      {
        minValue: 70,
        maxValue: 100,
        type: AdviceType.caution,
        hinted: true,
      },
      {
        minValue: 25,
        maxValue: 60,
        type: AdviceType.advice,
        hinted: true,
      },
    ],
  },
};

export const IrregularRange: Story = {
  args: {
    value: 300,
    minValue: 200,
    maxValue: 400,
    type: ObcGaugeRadialType.filled,
    showLabels: true,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 25,
  },
};

const sectorStoryArgs = {
  value: 50,
  minValue: 0,
  maxValue: 100,
  type: ObcGaugeRadialType.filled,
  showLabels: true,
} as const;

export const Sector270: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg270,
  },
};

export const Sector180: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg180,
  },
};

export const Sector180WithReadout: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg180,
    hasReadout: true,
    label: 'Label',
    unit: 'unit',
    value: 123,
  },
};

// Regression for the width-derived "Max-min" end-label inset: wide labels on
// both ends (-250 / 1000). The old per-side literals (11/6) broke for these;
// min/max are interval multiples so the end labels sit on the primary grid.
export const Sector180WideEndLabels: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg180,
    tickmarksInside: true,
    minValue: -250,
    maxValue: 1000,
    value: 500,
    primaryTickmarkInterval: 250,
    secondaryTickmarkInterval: 50,
  },
};

export const Sector90Left: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg90Left,
    width: 200,
  },
};

export const Sector90Right: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg90Right,
    width: 200,
  },
};

export const Sector90LeftWithReadout: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg90Left,
    hasReadout: true,
    label: 'Label',
    unit: 'unit',
    value: 123,
    width: 200,
  },
};

export const Sector90RightWithReadout: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg90Right,
    hasReadout: true,
    label: 'Label',
    unit: 'unit',
    value: 123,
    width: 200,
  },
};

export const ShortWideContainer: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg270,
    width: 600,
    height: 160,
  },
};

export const ShortWideContainer180: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg180,
    width: 600,
    height: 120,
  },
};

const readoutStoryArgs = {
  value: 123,
  minValue: 0,
  maxValue: 100,
  type: ObcGaugeRadialType.filled,
  sector: GaugeRadialSector.deg270,
  hasReadout: true,
  label: 'Label',
  unit: 'unit',
} as const;

export const WithReadout: Story = {
  args: readoutStoryArgs,
};

export const WithReadoutEnhanced: Story = {
  args: {
    ...readoutStoryArgs,
    priority: Priority.enhanced,
  },
};

export const WithReadoutNeedle: Story = {
  args: {
    ...readoutStoryArgs,
    type: ObcGaugeRadialType.needle,
  },
};

export const WideAdviceSpan: Story = {
  args: {
    value: 320,
    minValue: 200,
    maxValue: 400,
    type: ObcGaugeRadialType.filled,
    showLabels: true,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 25,
    advices: [
      {
        minValue: 230,
        maxValue: 390,
        type: AdviceType.caution,
        hinted: true,
      },
    ],
  },
};
