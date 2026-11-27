import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-vertical.js';
import '../../bars-graphs/line-graph/line-graph.js';
import '../../bars-graphs/area-graph/area-graph.js';
import {AdviceType} from '../watch/advice.js';
import {
  FillMode,
  BorderRadiusPosition,
  InstrumentState,
} from './gauge-vertical.js';
import {Priority} from '../types.js';

const meta: Meta = {
  title: 'Instruments/Gauge Vertical',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-vertical',
  argTypes: {
    // Fixed by design and not API; the manifest lists the fields, so the
    // table would otherwise show dead controls.
    height: {table: {disable: true}},
    paddingTop: {table: {disable: true}},
    paddingBottom: {table: {disable: true}},
    barThickness: {table: {disable: true}},
    tickThickness: {table: {disable: true}},
    labelThickness: {table: {disable: true}},
    scaleType: {table: {disable: true}},
    frameStyle: {table: {disable: true}},
    borderRadius: {table: {disable: true}},
    hasBar: {table: {disable: true}},
    hasScale: {table: {disable: true}},
    scaleBackground: {table: {disable: true}},
    advicePosition: {table: {disable: true}},
    fixedAspectRatio: {control: {type: 'boolean'}},
    scaleReferenceSize: {control: {type: 'range', min: 96, max: 768, step: 8}},
    minValue: {control: {type: 'range', min: -100, max: 100}},
    maxValue: {control: {type: 'range', min: 0, max: 1000}},
    reverse: {control: {type: 'boolean'}},
    mainTickmarks: {
      control: {type: 'object'},
      table: {type: {summary: 'number[] | undefined'}},
    },
    primaryTickmarkInterval: {control: {type: 'number', min: 1}},
    secondaryTickmarkInterval: {control: {type: 'number', min: 1}},
    tertiaryTickmarkInterval: {control: {type: 'number', min: 1}},
    showLabels: {control: {type: 'boolean'}},
    borderRadiusPosition: {
      control: {type: 'select'},
      options: Object.values(BorderRadiusPosition),
    },
    priority: {control: 'select', options: Object.values(Priority)},
    fillMode: {control: {type: 'radio'}, options: ['fill', 'tint']},
    fillMin: {control: {type: 'number'}},
    fillMax: {control: {type: 'number'}},
    value: {control: {type: 'range', min: -100, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    newSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    atSetpoint: {control: {type: 'boolean'}},
    autoAtSetpoint: {control: {type: 'boolean'}},
    autoAtSetpointDeadband: {
      control: {type: 'number', min: 0, max: 10, step: 0.5},
    },
    setpointAtZeroDeadband: {
      control: {type: 'number', min: 0, max: 5, step: 0.1},
    },
    state: {control: {type: 'select'}, options: Object.values(InstrumentState)},
    side: {control: {type: 'radio'}, options: ['left', 'right']},
    advices: {control: {type: 'object'}},
  },
  args: {
    fixedAspectRatio: false,
    scaleReferenceSize: 384,
    minValue: 0,
    maxValue: 100,
    reverse: false,
    mainTickmarks: [],
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: undefined,
    showLabels: true,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
    priority: Priority.regular,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: undefined,
    setpoint: undefined,
    newSetpoint: undefined,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: 'active',
    side: 'right',
    advices: [],
  },
  // A fixed-aspect gauge fills its host, so the toggle only shows something
  // inside a sized box; off, the gauge renders bare and the baselines hold.
  render: (args) => {
    const gauge = html`<obc-gauge-vertical
      .fixedAspectRatio=${args.fixedAspectRatio}
      .scaleReferenceSize=${args.scaleReferenceSize ?? 384}
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .reverse=${args.reverse}
      .mainTickmarks=${args.mainTickmarks}
      .primaryTickmarkInterval=${args.primaryTickmarkInterval}
      .secondaryTickmarkInterval=${args.secondaryTickmarkInterval}
      .tertiaryTickmarkInterval=${args.tertiaryTickmarkInterval}
      .showLabels=${args.showLabels}
      .borderRadiusPosition=${args.borderRadiusPosition}
      .priority=${args.priority}
      .fillMode=${args.fillMode}
      .fillMin=${args.fillMin}
      .fillMax=${args.fillMax}
      .value=${args.value}
      .setpoint=${args.setpoint}
      .newSetpoint=${args.newSetpoint}
      .atSetpoint=${args.atSetpoint}
      .autoAtSetpoint=${args.autoAtSetpoint}
      .autoAtSetpointDeadband=${args.autoAtSetpointDeadband}
      .setpointAtZeroDeadband=${args.setpointAtZeroDeadband}
      .state=${args.state}
      .side=${args.side}
      .advices=${args.advices}
    >
    </obc-gauge-vertical>`;
    return args.fixedAspectRatio
      ? html`<div style="height: 480px">${gauge}</div>`
      : gauge;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DefaultRight: Story = {
  name: 'Default (right side, labels, advice)',
  args: {
    minValue: 0,
    maxValue: 100,
    side: 'right',

    tertiaryTickmarkInterval: 2,
    setpoint: 50,
    value: 40,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
};

export const ComponentSizeComparison: Story = {
  name: 'Component Size Comparison (regular/medium/large/xl)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular
        </div>
        <div class="obc-component-size-regular">
          <obc-gauge-vertical
            minValue="0"
            maxValue="100"
            side="right"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-vertical>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Medium
        </div>
        <div class="obc-component-size-medium">
          <obc-gauge-vertical
            minValue="0"
            maxValue="100"
            side="right"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-vertical>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Large
        </div>
        <div class="obc-component-size-large">
          <obc-gauge-vertical
            minValue="0"
            maxValue="100"
            side="right"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-vertical>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">XL</div>
        <div class="obc-component-size-xl">
          <obc-gauge-vertical
            minValue="0"
            maxValue="100"
            side="right"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-vertical>
        </div>
      </div>
    </div>
  `,
};

export const DefaultLeft: Story = {
  name: 'Default (left side, labels)',

  args: {
    minValue: 0,
    maxValue: 100,
    side: 'left',
  },
};

export const NegativeRange: Story = {
  name: 'Negative Range (-100 to 100)',

  args: {
    minValue: -100,
    maxValue: 100,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const SmallRange: Story = {
  name: 'Small Range (0 to 10)',

  args: {
    minValue: 0,
    maxValue: 10,
    primaryTickmarkInterval: 2,
    secondaryTickmarkInterval: 1,
  },
};

export const WithBarFillRight: Story = {
  name: 'With Bar Fill (right side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,

    priority: Priority.enhanced,
    value: 65,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
  },
};

export const WithBarFillLeft: Story = {
  name: 'With Bar Fill (left side)',

  args: {
    minValue: -100,
    maxValue: 100,

    priority: Priority.regular,
    value: 45,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    side: 'left',
  },
};

export const FillModeComparison: Story = {
  name: 'Fill Mode Comparison, Enhanced (fill vs tint)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Fill Mode
        </div>
        <obc-gauge-vertical
          minValue="0"
          maxValue="100"
          priority="enhanced"
          fillMode="${FillMode.fill}"
          fillMin="0"
          fillMax="65"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-vertical
          minValue="0"
          maxValue="100"
          priority="enhanced"
          fillMode="${FillMode.tint}"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-vertical
          minValue="0"
          maxValue="100"
          priority="enhanced"
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
        ></obc-gauge-vertical>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint Mode With Advice Overlays',

  args: {
    minValue: -100,
    maxValue: 100,

    priority: Priority.enhanced,
    fillMode: FillMode.tint,
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 30,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    advices: [
      {min: 40, max: 60, type: AdviceType.caution, hinted: true},
      {min: -60, max: -40, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const WithAdvice: Story = {
  name: 'With Advice Overlays',

  args: {
    minValue: -100,
    maxValue: 100,

    value: 10,
    setpoint: 10,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    advices: [
      {min: 80, max: 100, type: AdviceType.caution, hinted: true},
      {min: 50, max: 70, type: AdviceType.caution, hinted: false},
      {min: 20, max: 40, type: AdviceType.caution, hinted: true},
      {min: -20, max: 20, type: AdviceType.advice, hinted: true},
      {min: -40, max: -20, type: AdviceType.advice, hinted: false},
      {min: -60, max: -40, type: AdviceType.advice, hinted: true},
    ],
  },
};

export const WithSetpointAtValue: Story = {
  name: 'With Setpoint (value at setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,
    priority: Priority.enhanced,
    value: 50, // Current value
    setpoint: 50, // Setpoint marker at same position
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    fillMin: 0,
    fillMax: 50,
  },
};

export const WithSetpointAwayFromValue: Story = {
  name: 'With Setpoint (value away from setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,

    priority: Priority.enhanced,
    value: 30, // Current value
    setpoint: 70, // Setpoint marker at different position
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const StateComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div></div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          regular
        </div>
        <div
          style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
        >
          enhanced
        </div>
      </div>

      <!-- active row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div style="font-size: 12px; color: #888;">active</div>
        <div style="text-align: center;">
          <obc-gauge-vertical
            minValue="-100"
            maxValue="100"
            priority="regular"
            value="30"
            setpoint="50"
            state="active"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-gauge-vertical>
        </div>
        <div style="text-align: center;">
          <obc-gauge-vertical
            minValue="-100"
            maxValue="100"
            priority="enhanced"
            value="30"
            setpoint="50"
            state="active"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-gauge-vertical>
        </div>
      </div>

      <!-- loading row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div style="font-size: 12px; color: #888;">loading</div>
        <div style="text-align: center;">
          <obc-gauge-vertical
            minValue="-100"
            maxValue="100"
            priority="regular"
            value="30"
            setpoint="50"
            state="loading"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-gauge-vertical>
        </div>
        <div style="text-align: center;">
          <obc-gauge-vertical
            minValue="-100"
            maxValue="100"
            priority="enhanced"
            value="30"
            setpoint="50"
            state="loading"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-gauge-vertical>
        </div>
      </div>

      <!-- off row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div style="font-size: 12px; color: #888;">off</div>
        <div style="text-align: center;">
          <obc-gauge-vertical
            minValue="-100"
            maxValue="100"
            priority="regular"
            value="30"
            setpoint="50"
            state="off"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-gauge-vertical>
        </div>
        <div style="text-align: center;">
          <obc-gauge-vertical
            minValue="-100"
            maxValue="100"
            priority="enhanced"
            value="30"
            setpoint="50"
            state="off"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-gauge-vertical>
        </div>
      </div>
    </div>
  `,
};

export const EnhancedModeComparison: Story = {
  name: 'Enhanced Mode Comparison (regular vs enhanced)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular (right)
        </div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          value="35"
          setpoint="50"
          primaryTickmarkInterval="50"
          secondaryTickmarkInterval="10"
          side="right"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Enhanced (right)
        </div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          priority="enhanced"
          value="60"
          setpoint="50"
          primaryTickmarkInterval="50"
          secondaryTickmarkInterval="10"
          side="right"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Enhanced (left)
        </div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          priority="enhanced"
          value="-45"
          setpoint="-30"
          primaryTickmarkInterval="50"
          secondaryTickmarkInterval="10"
          side="left"
        ></obc-gauge-vertical>
      </div>
    </div>
  `,
};

export const Reversed: Story = {
  name: 'Reversed (0 at Top, Depth 0 to 75 m)',
  parameters: {
    docs: {
      description: {
        story:
          '`reverse` puts `minValue` at the top so a quantity measured downward is plotted with positive numbers. The bar fills from `fillMin` (0, the surface) down to `value`.',
      },
    },
  },
  args: {
    minValue: 0,
    maxValue: 75,
    reverse: true,
    value: 65.3,
    fillMin: 0,
    fillMax: undefined,
    setpoint: 70,
    primaryTickmarkInterval: 25,
    secondaryTickmarkInterval: 5,
    advices: [{min: 65, max: 75, type: AdviceType.caution, hinted: false}],
  },
};

/**
 * `obc-gauge-vertical` is a fixed-config gauge: it draws at the design's 384 px
 * reference height with the bar, tick and label bands at their design
 * thickness. That number is where the drawing is 1:1, not a layout limit.
 *
 * - **fixedAspectRatio=false (default)**: a 384 px tall SVG, whatever the box does.
 * - **fixedAspectRatio=true**: the whole gauge scales to the height of its host
 *   like a vector image and the labels keep their font size; `scaleReferenceSize`
 *   is the host height at which it is 1:1. Size the host, the gauge fills it.
 *
 * For a scale whose length follows the layout while the bands keep their design
 * thickness, use `obc-bar-vertical` with `height` from a ResizeObserver, as the
 * automation tank and the chart slots do.
 *
 * Drag the corner of each box to resize it.
 */
export const FixedAspectRatioComparison: StoryObj = {
  tags: ['skip-test'],
  render: () => html`
    <style>
      .far-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        padding: 16px;
        height: 600px;
      }
      .far-box {
        display: flex;
        flex-direction: column;
        padding: 16px;
        border: 2px dashed var(--instrument-frame-tertiary-color);
        resize: both;
        overflow: auto;
        min-width: 100px;
        min-height: 200px;
      }
      .far-box-fixed {
        border-color: var(--instrument-enhanced-primary-color);
      }
      .far-label {
        flex-shrink: 0;
        margin-bottom: 8px;
        font-family: var(--font-family-main);
        font-size: 14px;
        color: var(--instrument-frame-tertiary-color);
      }
      .far-box-fixed .far-label {
        color: var(--instrument-enhanced-primary-color);
      }
      .far-box obc-gauge-vertical {
        flex: 1;
        min-height: 0; /* lets the fixed-aspect gauge shrink with the box */
      }
    </style>
    <div class="far-wrapper">
      <div class="far-box">
        <div class="far-label">
          fixedAspectRatio=false (default): 384 px tall, whatever the box does
        </div>
        <obc-gauge-vertical
          .minValue=${-20}
          .maxValue=${120}
          .value=${60}
          .setpoint=${80}
          .primaryTickmarkInterval=${20}
          .advices=${[{min: 60, max: 80, type: AdviceType.caution, hinted: true}]}
          .priority=${Priority.regular}
        ></obc-gauge-vertical>
      </div>
      <div class="far-box far-box-fixed">
        <div class="far-label">
          fixedAspectRatio=true: fills the box height, labels keep their size
        </div>
        <obc-gauge-vertical
          .fixedAspectRatio=${true}
          .minValue=${-20}
          .maxValue=${120}
          .value=${60}
          .setpoint=${80}
          .primaryTickmarkInterval=${20}
          .advices=${[{min: 60, max: 80, type: AdviceType.caution, hinted: true}]}
          .priority=${Priority.enhanced}
        ></obc-gauge-vertical>
      </div>
    </div>
  `,
};
