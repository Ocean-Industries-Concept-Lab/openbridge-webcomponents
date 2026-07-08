import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  GaugeRadialHorizontalAlignment,
  GaugeRadialSector,
  GaugeRadialVerticalAlignment,
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
    horizontalAlignment: {
      control: 'select',
      options: Object.values(GaugeRadialHorizontalAlignment),
    },
    verticalAlignment: {
      control: 'select',
      options: Object.values(GaugeRadialVerticalAlignment),
    },
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

export const ShortWideAlignedLeft: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg270,
    width: 600,
    height: 160,
    horizontalAlignment: GaugeRadialHorizontalAlignment.left,
  },
};

export const ShortWideAlignedRight: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg270,
    width: 600,
    height: 160,
    horizontalAlignment: GaugeRadialHorizontalAlignment.right,
  },
};

export const TallNarrowAlignedTop: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg270,
    width: 200,
    height: 500,
    verticalAlignment: GaugeRadialVerticalAlignment.top,
  },
};

export const TallNarrowAlignedBottom: Story = {
  args: {
    ...sectorStoryArgs,
    sector: GaugeRadialSector.deg270,
    width: 200,
    height: 500,
    verticalAlignment: GaugeRadialVerticalAlignment.bottom,
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

const labelRoomRow = html`
  <div style="display: flex; gap: 8px; width: 100%; height: 100%;">
    ${[
      {label: 'Load', max: 100},
      {label: 'Torque', max: 100},
      {label: 'Throttle', max: 100},
      {label: 'RPM', max: 3600},
    ].map(
      (g) => html`
        <div style="flex: 1; min-width: 0;">
          <obc-gauge-radial
            .value=${g.max * 0.6}
            .maxValue=${g.max}
            .showLabels=${true}
            .primaryTickmarkInterval=${g.max / 4}
            .secondaryTickmarkInterval=${g.max / 20}
            .hasReadout=${true}
            .label=${g.label}
          ></obc-gauge-radial>
        </div>
      `
    )}
  </div>
`;

export const LabelRoomFourDigitRow: Story = {
  name: 'Label Room — Mixed 2/4-Digit Flex Row (#1021)',
  args: {
    width: 800,
    height: 200,
  },
  render: () => labelRoomRow,
};

export const LabelRoomDegradationRow: Story = {
  name: 'Label Room — Hide Past Reserve Cap (#1021)',
  args: {
    width: 800,
    height: 140,
  },
  render: () => labelRoomRow,
};

export const EqualCircumferenceMixedArcs: Story = {
  name: 'Equal Circumference — Same FaceDiameter Across Sectors',
  args: {
    width: 900,
    height: 320,
  },
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: flex-start;">
      ${[
        GaugeRadialSector.deg270,
        GaugeRadialSector.deg180,
        GaugeRadialSector.deg90Left,
        GaugeRadialSector.deg90Right,
      ].map(
        (sector) => html`
          <obc-gauge-radial
            .sector=${sector}
            .value=${60}
            .maxValue=${100}
            .faceDiameter=${180}
            .showLabels=${true}
            .primaryTickmarkInterval=${25}
            .secondaryTickmarkInterval=${5}
          ></obc-gauge-radial>
        `
      )}
    </div>
  `,
};

export const EqualCircumferenceMixedDigits: Story = {
  name: 'Equal Circumference — 2-Digit Vs 4-Digit, Same FaceDiameter',
  args: {
    width: 700,
    height: 300,
  },
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      ${[
        {label: 'Load', max: 99, interval: 33},
        {label: 'RPM', max: 3600, interval: 900},
      ].map(
        (g) => html`
          <obc-gauge-radial
            .value=${g.max * 0.6}
            .maxValue=${g.max}
            .faceDiameter=${200}
            .showLabels=${true}
            .primaryTickmarkInterval=${g.interval}
            .hasReadout=${true}
            .label=${g.label}
          ></obc-gauge-radial>
        `
      )}
    </div>
  `,
};

export const EqualCircumferenceResizable: Story = {
  name: 'Equal Circumference — Fixed Intrinsic Size (Resizable)',
  tags: ['skip-test'],
  render: () => html`
    <div
      style="resize: both; overflow: auto; border: 1px dashed var(--instrument-frame-tertiary-color, gray); width: 560px; height: 280px; display: flex; gap: 8px; align-items: flex-start;"
    >
      ${[
        {sector: GaugeRadialSector.deg270, max: 100, interval: 25},
        {sector: GaugeRadialSector.deg180, max: 3600, interval: 900},
      ].map(
        (g) => html`
          <obc-gauge-radial
            .sector=${g.sector}
            .value=${g.max * 0.6}
            .maxValue=${g.max}
            .faceDiameter=${180}
            .showLabels=${true}
            .primaryTickmarkInterval=${g.interval}
          ></obc-gauge-radial>
        `
      )}
    </div>
  `,
};

export const LabelRoomTallNarrow: Story = {
  name: 'Label Room — Tall Narrow 4-Digit (#1021)',
  args: {
    value: 2400,
    minValue: 0,
    maxValue: 3600,
    showLabels: true,
    primaryTickmarkInterval: 900,
    secondaryTickmarkInterval: 300,
    width: 160,
    height: 400,
  },
};

export const LabelRoomInsideLabels: Story = {
  name: 'Label Room — Inside Labels Keep The Base Box (#1021)',
  args: {
    value: 2400,
    minValue: 0,
    maxValue: 3600,
    showLabels: true,
    tickmarksInside: true,
    primaryTickmarkInterval: 900,
    secondaryTickmarkInterval: 300,
    width: 200,
    height: 200,
  },
};
