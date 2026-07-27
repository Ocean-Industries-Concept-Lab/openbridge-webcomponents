import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcInstrumentRadial, ObcGaugeRadialType} from './instrument-radial.js';
import './instrument-radial.js';
import {
  playgroundColumn,
  resizableStoryBox,
  storyHint,
  widthDecorator,
} from '../../storybook-util.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';

type InstrumentRadialStoryArgs = Partial<ObcInstrumentRadial> & {
  width?: number;
  height?: number;
  /** Story-only: apply faceDiameter to every playground instance. */
  lockFaceDiameter?: boolean;
  // Manifest-derived entries that only exist to be hidden from the panel.
  minAngle?: unknown;
  maxAngle?: unknown;
};

const meta: Meta<InstrumentRadialStoryArgs> = {
  title: 'Building Blocks/Instrument Radial',
  tags: ['6.0'],
  component: 'obc-instrument-radial',
  decorators: [widthDecorator],
  args: {
    width: 400,
    getAngle: (v: number) => (v / 100) * 270 - 135,
  },
  argTypes: {
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
    tickmarksInside: {control: 'boolean'},
    showLabels: {control: 'boolean'},
    faceDiameter: {
      control: {type: 'range', min: 100, max: 600, step: 10},
      description:
        'Pins the outer-ring diameter in px (fixed intrinsic size, equal circumference across instruments). Clear to return to fill-the-container sizing.',
    },
    minAngle: {table: {disable: true}},
    maxAngle: {table: {disable: true}},
    // Only acts on labels at the horizontal ends (±90°), i.e. a 180° sweep.
    // Hidden by default; the MaxMinEndLabels story re-enables it.
    endLabelsMaxMin: {table: {disable: true}},
  },
} satisfies Meta<InstrumentRadialStoryArgs>;

export default meta;
type Story = StoryObj<InstrumentRadialStoryArgs>;

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
    getAngle: (v: number) => (v / 100) * 135,
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

// `endLabelsMaxMin` only repositions labels at the horizontal ends (±90°). This
// 180° sweep puts the min/max labels there, so toggling `endLabelsMaxMin` (and
// `tickmarksInside`) visibly moves them below/centered.
export const MaxMinEndLabels: Story = {
  args: {
    value: 50,
    maxValue: 100,
    minValue: 0,
    type: ObcGaugeRadialType.filled,
    showLabels: true,
    getAngle: (v: number) => (v / 100) * 180 - 90, // top 180° arc: 0 left, 100 right
    endLabelsMaxMin: true,
  },
  argTypes: {
    endLabelsMaxMin: {control: 'boolean', table: {disable: false}},
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

/**
 * The issue #1021 behavior at the building-block level: each dial reserves
 * room for its own labels when squeezed, so the 4-digit dial gets a wider
 * margin (and a smaller ring) than the 2-digit one — nothing is clipped.
 * Shrink further and labels hide entirely instead (the content-aware cap in
 * `svghelpers/radial-frame.ts`). See Instruments/Gauge Radial → *Label Room*
 * stories for the full dashboard scenario.
 */
export const LabelRoomFlexRow: Story = {
  name: 'Label Room — 2-Digit Vs 4-Digit Flex Row (#1021)',
  args: {
    width: 500,
    height: 220,
  },
  render: () => html`
    <div style="display: flex; gap: 8px; width: 100%; height: 100%;">
      ${[
        {max: 99, interval: 33},
        {max: 3600, interval: 900},
      ].map(
        (g) => html`
          <div style="flex: 1; min-width: 0;">
            <obc-instrument-radial
              .value=${g.max * 0.6}
              .maxValue=${g.max}
              .getAngle=${(v: number) => (v / g.max) * 270 - 135}
              .showLabels=${true}
              .primaryTickmarkInterval=${g.interval}
            ></obc-instrument-radial>
          </div>
        `
      )}
    </div>
  `,
};

/**
 * Same `faceDiameter` on both dials pins their ring circumference: the rings
 * are pixel-identical while the 4-digit dial's box grows wider for its
 * labels. This is the equal-circumference contract shared by all radial
 * instruments (and `obc-donut-chart`'s `fixedHeight`).
 */
export const EqualCircumferenceMixedDigits: Story = {
  name: 'Equal Circumference — Same FaceDiameter, Different Labels',
  args: {
    width: 600,
    height: 280,
    faceDiameter: 200,
  },
  render: (args) => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      ${[
        {max: 99, interval: 33},
        {max: 3600, interval: 900},
      ].map(
        (g) => html`
          <obc-instrument-radial
            style="display: block;"
            .value=${g.max * 0.6}
            .maxValue=${g.max}
            .getAngle=${(v: number) => (v / g.max) * 270 - 135}
            .faceDiameter=${args.faceDiameter ?? 200}
            .showLabels=${true}
            .primaryTickmarkInterval=${g.interval}
          ></obc-instrument-radial>
        `
      )}
    </div>
  `,
};

/**
 * Interactive sizing playground for the building block: drag the dashed box's
 * bottom-right corner to resize it. The first dial is pinned to a fixed
 * intrinsic size by the `faceDiameter` control, while the 4-digit dial and
 * the 180° sector adapt to the remaining flex space, reserving room for their
 * labels adaptively (issue #1021). Enable `lockFaceDiameter` to pin all three
 * to the same circumference — full circle and partial arcs alike. Related:
 * *Sizing Playground* stories under Building Blocks/Watch and
 * Instruments/Gauge Radial.
 */
export const SizingPlayground: Story = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 200,
    lockFaceDiameter: false,
  },
  argTypes: {
    lockFaceDiameter: {
      control: 'boolean',
      description:
        'Apply faceDiameter to every instance (equal circumference) instead of only the first.',
    },
  },
  render: (args) => {
    const instances = [
      {
        label: '2-digit, 270°',
        max: 99,
        interval: 33,
        getAngle: (v: number) => (v / 99) * 270 - 135,
        clipBottom: 0,
        endLabelsMaxMin: false,
      },
      {
        label: '4-digit, 270°',
        max: 3600,
        interval: 900,
        getAngle: (v: number) => (v / 3600) * 270 - 135,
        clipBottom: 0,
        endLabelsMaxMin: false,
      },
      {
        label: '2-digit, 180° sector',
        max: 99,
        interval: 33,
        getAngle: (v: number) => (v / 99) * 180 - 90,
        clipBottom: 44,
        endLabelsMaxMin: true,
      },
    ];
    const fd = (index: number) =>
      index === 0 || args.lockFaceDiameter ? args.faceDiameter : undefined;
    const caption = (index: number, label: string) =>
      fd(index) !== undefined
        ? `${label} — pinned ${fd(index)}px`
        : `${label} — adaptive (flex)`;
    return html`
      ${storyHint(
        'Drag the bottom-right corner of the dashed box to resize it. The first dial is pinned by the faceDiameter control; the 4-digit dial and the 180° sector adapt to the remaining flex space. Enable lockFaceDiameter to pin all three to the same circumference.'
      )}
      ${resizableStoryBox(
        html`
          ${instances.map((g, index) =>
            playgroundColumn(
              caption(index, g.label),
              html`
                <obc-instrument-radial
                  .value=${g.max * 0.6}
                  .maxValue=${g.max}
                  .getAngle=${g.getAngle}
                  .clipBottom=${g.clipBottom}
                  .endLabelsMaxMin=${g.endLabelsMaxMin}
                  .showLabels=${true}
                  .primaryTickmarkInterval=${g.interval}
                  .faceDiameter=${fd(index)}
                ></obc-instrument-radial>
              `,
              {pinned: fd(index) !== undefined}
            )
          )}
        `,
        {width: 760, height: 300}
      )}
    `;
  },
};
