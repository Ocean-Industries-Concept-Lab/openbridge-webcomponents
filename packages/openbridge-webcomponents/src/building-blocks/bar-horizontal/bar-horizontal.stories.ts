import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './bar-horizontal.js';
import '../../bars-graphs/line-graph/line-graph.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import {
  ScaleType,
  FrameStyle,
  FillMode,
  AdvicePosition,
  ExternalScaleSide,
  BorderRadiusPosition,
  InstrumentState,
} from './bar-horizontal.js';
import {Priority} from '../../navigation-instruments/types.js';

const SAMPLE_DATA = [
  {label: 'Jan', value: 3.5},
  {label: 'Feb', value: 4.2},
  {label: 'Mar', value: 5},
  {label: 'Apr', value: 4},
  {label: 'May', value: 7},
  {label: 'Jun', value: 3},
  {label: 'Jul', value: 4.6},
  {label: 'Aug', value: 3.2},
  {label: 'Sep', value: 5.2},
  {label: 'Oct', value: 4.2},
  {label: 'Nov', value: 4.8},
  {label: 'Dec', value: 6},
];

const meta: Meta = {
  title: 'Bars and Graphs/Bar Horizontal',
  tags: ['autodocs', '6.0'],
  component: 'obc-bar-horizontal',
  argTypes: {
    minValue: {control: {type: 'range', min: -100, max: 100}},
    maxValue: {control: {type: 'range', min: 0, max: 1000}},
    width: {control: {type: 'range', min: 0, max: 768}},
    barThickness: {control: {type: 'range', min: 8, max: 48}},
    hasScale: {control: {type: 'boolean'}},
    mainTickmarks: {
      control: {type: 'object'},
      table: {type: {summary: 'number[] | undefined'}},
    },
    primaryTickmarkInterval: {control: {type: 'number', min: 1}},
    secondaryTickmarkInterval: {control: {type: 'number', min: 1}},
    tertiaryTickmarkInterval: {control: {type: 'number', min: 1}},
    scaleType: {
      control: {type: 'select'},
      options: Object.values(ScaleType),
    },
    frameStyle: {
      control: {type: 'select'},
      options: Object.values(FrameStyle),
    },
    showLabels: {control: {type: 'boolean'}},
    hasBar: {control: {type: 'boolean'}},
    scaleBackground: {control: {type: 'boolean'}},
    borderRadiusPosition: {
      control: {type: 'select'},
      options: Object.values(BorderRadiusPosition),
    },
    borderRadiusPositionExternalScales: {
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
    state: {
      control: {type: 'select'},
      options: Object.values(InstrumentState),
    },
    side: {control: {type: 'radio'}, options: ['top', 'bottom']},
    advicePosition: {
      control: {type: 'select'},
      options: ['center', 'inner', 'outer'],
    },
    advices: {control: {type: 'object'}},
  },
  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    barThickness: 24,
    hasScale: true,
    mainTickmarks: [],
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: undefined,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    showLabels: true,
    hasBar: false,
    scaleBackground: false,
    borderRadiusPosition: undefined,
    borderRadiusPositionExternalScales: undefined,
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
    side: ExternalScaleSide.bottom,
    advicePosition: AdvicePosition.inner,
    advices: [],
  },
  render: (args) => html`
    <obc-bar-horizontal
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .width=${args.width}
      .barThickness=${args.barThickness}
      .hasScale=${args.hasScale}
      .mainTickmarks=${args.mainTickmarks}
      .primaryTickmarkInterval=${args.primaryTickmarkInterval}
      .secondaryTickmarkInterval=${args.secondaryTickmarkInterval}
      .tertiaryTickmarkInterval=${args.tertiaryTickmarkInterval}
      .scaleType=${args.scaleType}
      .frameStyle=${args.frameStyle}
      .showLabels=${args.showLabels}
      .hasBar=${args.hasBar}
      .scaleBackground=${args.scaleBackground}
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
      .advicePosition=${args.advicePosition}
      .advices=${args.advices}
    >
    </obc-bar-horizontal>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DefaultBottom: Story = {
  name: 'Default (bottom side, bar, labels, advice)',
  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    side: ExternalScaleSide.bottom,
    tertiaryTickmarkInterval: 2,
    hasBar: true,
    setpoint: 50,
    value: 40,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
};

export const ComponentSizeComparison: Story = {
  name: 'Component Size Comparison (regular/medium/large/xl)',

  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 40px; align-items: flex-start;"
    >
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular
        </div>
        <div class="obc-component-size-regular">
          <obc-bar-horizontal
            minValue="0"
            maxValue="100"
            width="480"
            side="bottom"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            hasBar
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-bar-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Medium
        </div>
        <div class="obc-component-size-medium">
          <obc-bar-horizontal
            minValue="0"
            maxValue="100"
            width="480"
            side="bottom"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            hasBar
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-bar-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Large
        </div>
        <div class="obc-component-size-large">
          <obc-bar-horizontal
            minValue="0"
            maxValue="100"
            width="480"
            side="bottom"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            hasBar
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-bar-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">XL</div>
        <div class="obc-component-size-xl">
          <obc-bar-horizontal
            minValue="0"
            maxValue="100"
            width="480"
            side="bottom"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            hasBar
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-bar-horizontal>
        </div>
      </div>
    </div>
  `,
};

export const DefaultTop: Story = {
  name: 'Default (top side, labels)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    side: ExternalScaleSide.top,
  },
};

export const WithBarBottom: Story = {
  name: 'With Bar (bottom side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasBar: true,
  },
};

export const WithBarTop: Story = {
  name: 'With Bar (top side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasBar: true,
    side: ExternalScaleSide.top,
  },
};

export const NegativeRange: Story = {
  name: 'Negative Range (-100 to 100)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 480,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const SmallRange: Story = {
  name: 'Small Range (0 to 10)',

  args: {
    minValue: 0,
    maxValue: 10,
    width: 480,
    primaryTickmarkInterval: 2,
    secondaryTickmarkInterval: 1,
  },
};

export const WithBarFillBottom: Story = {
  name: 'With Bar Fill (bottom side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasBar: true,
    priority: Priority.enhanced,
    value: 65,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
  },
};

export const WithBarFillTop: Story = {
  name: 'With Bar Fill (top side)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 480,
    hasBar: true,
    priority: Priority.regular,
    value: 45,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    side: ExternalScaleSide.top,
  },
};

export const FillModeComparison: Story = {
  name: 'Fill Mode Comparison, Enhanced (fill vs tint)',

  render: () => html`
    <div
      style="display: flex; flex-direction:column; gap: 40px; align-items: flex-start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Fill Mode
        </div>
        <obc-bar-horizontal
          minValue="0"
          maxValue="100"
          width="480"
          hasBar
          priority="enhanced"
          fillMode="${FillMode.fill}"
          fillMin="0"
          fillMax="65"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
        ></obc-bar-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-bar-horizontal
          minValue="0"
          maxValue="100"
          width="480"
          hasBar
          priority="enhanced"
          fillMode="${FillMode.tint}"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
        ></obc-bar-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-bar-horizontal
          minValue="0"
          maxValue="100"
          width="480"
          hasBar
          priority="enhanced"
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
        ></obc-bar-horizontal>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint Mode With Advice Overlays',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    hasBar: true,
    priority: Priority.enhanced,
    fillMode: FillMode.tint,
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 30,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    advicePosition: AdvicePosition.center,
    advices: [
      {min: 40, max: 60, type: AdviceType.caution, hinted: true},
      {min: -60, max: -40, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const WithAdviceInner: Story = {
  name: 'With Advice Overlays (inner positioning)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    hasBar: true,
    value: 10,
    setpoint: 10,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    advicePosition: AdvicePosition.inner,
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

export const WithAdviceOuter: Story = {
  name: 'With Advice Overlays (outer positioning)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    hasBar: true,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    advicePosition: AdvicePosition.outer,
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

export const WithAdviceCenter: Story = {
  name: 'With Advice Overlays (center positioning)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    hasBar: true,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    advicePosition: AdvicePosition.center,
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
    width: 480,
    hasBar: true,
    priority: Priority.enhanced,
    value: 50,
    setpoint: 50,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const WithSetpointAwayFromValue: Story = {
  name: 'With Setpoint (value away from setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 480,
    hasBar: true,
    priority: Priority.enhanced,
    value: 30,
    setpoint: 70,
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
        <div>
          <obc-bar-horizontal
            minValue="-100"
            maxValue="100"
            width="480"
            hasBar
            priority="regular"
            value="30"
            setpoint="50"
            state="active"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-horizontal>
        </div>
        <div>
          <obc-bar-horizontal
            minValue="-100"
            maxValue="100"
            width="480"
            hasBar
            priority="enhanced"
            value="30"
            setpoint="50"
            state="active"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-horizontal>
        </div>
      </div>

      <!-- loading row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div style="font-size: 12px; color: #888;">loading</div>
        <div>
          <obc-bar-horizontal
            minValue="-100"
            maxValue="100"
            width="480"
            hasBar
            priority="regular"
            value="30"
            setpoint="50"
            state="loading"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-horizontal>
        </div>
        <div>
          <obc-bar-horizontal
            minValue="-100"
            maxValue="100"
            width="480"
            hasBar
            priority="enhanced"
            value="30"
            setpoint="50"
            state="loading"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-horizontal>
        </div>
      </div>

      <!-- off row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div style="font-size: 12px; color: #888;">off</div>
        <div>
          <obc-bar-horizontal
            minValue="-100"
            maxValue="100"
            width="480"
            hasBar
            priority="regular"
            value="30"
            setpoint="50"
            state="off"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-horizontal>
        </div>
        <div>
          <obc-bar-horizontal
            minValue="-100"
            maxValue="100"
            width="480"
            hasBar
            priority="enhanced"
            value="30"
            setpoint="50"
            state="off"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-horizontal>
        </div>
      </div>
    </div>
  `,
};

export const ScaleTypeComparison: Story = {
  name: 'Scale Type Comparison (regular vs condensed)',

  render: () => html`
    <div
      style="display: flex; flex-direction:column; gap: 40px; align-items: flex-start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular
        </div>
        <obc-bar-horizontal
          .minValue=${0}
          .maxValue=${100}
          .width=${480}
          .scaleType=${ScaleType.regular}
          .primaryTickmarkInterval=${20}
          .secondaryTickmarkInterval=${10}
          .tertiaryTickmarkInterval=${2}
          .hasBar=${true}
        ></obc-bar-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Condensed
        </div>
        <obc-bar-horizontal
          .minValue=${0}
          .maxValue=${100}
          .width=${480}
          .scaleType=${ScaleType.condensed}
          .primaryTickmarkInterval=${20}
          .secondaryTickmarkInterval=${10}
          .tertiaryTickmarkInterval=${2}
          .hasBar=${true}
        ></obc-bar-horizontal>
      </div>
    </div>
  `,
};

export const HorizontalBottomScaleBackground: Story = {
  name: 'With Scale Background (Gauge style, bottom side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    side: ExternalScaleSide.bottom,
    hasBar: true,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
    scaleBackground: true,
    priority: Priority.enhanced,
    value: 40,
    // setpoint: 50,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    advices: [],
  },
};

export const ChartIntegrationBottom: Story = {
  name: 'Chart Integration (as external bottom axis)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    // External scale controls (horizontal/bottom)
    hScaleHasBar: {
      control: 'boolean',
      description: 'Horizontal scale: show bar',
    },
    hScaleShowLabels: {
      control: 'boolean',
      description: 'Horizontal scale: show labels',
    },
    hScaleAdvices: {
      control: 'boolean',
      description: 'Horizontal scale: show advice overlays',
    },
    hScaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
      description: 'Horizontal scale: fill mode',
    },
    hScaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
      description: 'Horizontal scale: advice position',
    },
    hScaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: current value',
    },
    hScaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: setpoint',
    },
    hScaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: fill min',
    },
    hScaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: fill max',
    },
    hScaleBarThickness: {
      control: {type: 'range', min: 8, max: 64, step: 1},
      description: 'Horizontal scale: bar thickness',
    },
  },
  args: {
    showPoints: true,
    showTickMarks: false,
    width: 480,
    height: 320,
    // Horizontal scale defaults
    hScaleHasBar: true,
    hScaleShowLabels: true,
    hScaleAdvices: true,
    hScaleFillMode: 'fill',
    hScaleAdvicePosition: 'inner',
    hScaleValue: 5,
    hScaleSetpoint: 5,
    hScaleFillMin: 0,
    hScaleFillMax: 4,
    hScaleBarThickness: 32,
  },
  render: (_args) => html`
    <obc-line-graph
      .data=${SAMPLE_DATA}
      .showPoints=${_args.showPoints}
      .showTickMarks=${_args.showTickMarks}
      .showGrid=${true}
      .showGridX=${true}
      .showGridY=${true}
      .width=${_args.width}
      .height=${_args.height}
      .borderRadiusPositionExternalScales=${BorderRadiusPosition.outerLastChild}
    >
      <obc-bar-horizontal
        slot="bottom-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .width=${_args.width}
        .side=${ExternalScaleSide.bottom}
        .hasScale=${true}
        .showLabels=${_args.hScaleShowLabels}
        .hasBar=${_args.hScaleHasBar}
        .barThickness=${_args.hScaleBarThickness}
        .fillMode=${_args.hScaleFillMode === 'fill'
          ? FillMode.fill
          : FillMode.tint}
        .fillMin=${_args.hScaleFillMin}
        .fillMax=${_args.hScaleFillMax}
        .value=${_args.hScaleValue}
        .setpoint=${_args.hScaleSetpoint}
        .advicePosition=${_args.hScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.hScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .advices=${_args.hScaleAdvices
          ? [
              {min: 2, max: 5, type: AdviceType.caution, hinted: true},
              {min: 8, max: 9.5, type: AdviceType.advice, hinted: false},
            ]
          : []}
        .primaryTickmarkInterval=${1}
        .secondaryTickmarkInterval=${0.5}
        .tertiaryTickmarkInterval=${0.125}
      ></obc-bar-horizontal>
    </obc-line-graph>
  `,
};

export const ChartIntegrationBottomBackground: Story = {
  name: 'Chart Integration (as external bottom axis, scaleBackground)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    // External scale controls (horizontal/bottom)
    hScaleHasBar: {
      control: 'boolean',
      description: 'Horizontal scale: show bar',
    },
    hScaleShowLabels: {
      control: 'boolean',
      description: 'Horizontal scale: show labels',
    },
    hScaleAdvices: {
      control: 'boolean',
      description: 'Horizontal scale: show advice overlays',
    },
    hScaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
      description: 'Horizontal scale: fill mode',
    },
    hScaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
      description: 'Horizontal scale: advice position',
    },
    hScaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: current value',
    },
    hScaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: setpoint',
    },
    hScaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: fill min',
    },
    hScaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Horizontal scale: fill max',
    },
    hScaleBarThickness: {
      control: {type: 'range', min: 8, max: 64, step: 1},
      description: 'Horizontal scale: bar thickness',
    },
  },
  args: {
    showPoints: true,
    showTickMarks: false,
    width: 480,
    height: 320,
    // Horizontal scale defaults
    hScaleHasBar: true,
    hScaleShowLabels: true,
    hScaleAdvices: true,
    hScaleFillMode: 'fill',
    hScaleAdvicePosition: 'inner',
    hScaleValue: 5,
    hScaleSetpoint: 5,
    hScaleFillMin: 0,
    hScaleFillMax: 4,
    hScaleBarThickness: 32,
  },
  render: (_args) => html`
    <obc-line-graph
      .data=${SAMPLE_DATA}
      .showPoints=${_args.showPoints}
      .showTickMarks=${_args.showTickMarks}
      .showGrid=${true}
      .showGridX=${true}
      .showGridY=${true}
      .width=${_args.width}
      .height=${_args.height}
      .borderRadiusPositionExternalScales=${BorderRadiusPosition.middleChild}
    >
      <obc-bar-horizontal
        slot="bottom-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .width=${_args.width}
        .side=${ExternalScaleSide.bottom}
        .hasScale=${true}
        .showLabels=${_args.hScaleShowLabels}
        .hasBar=${_args.hScaleHasBar}
        .barThickness=${_args.hScaleBarThickness}
        .fillMode=${_args.hScaleFillMode === 'fill'
          ? FillMode.fill
          : FillMode.tint}
        .fillMin=${_args.hScaleFillMin}
        .fillMax=${_args.hScaleFillMax}
        .value=${_args.hScaleValue}
        .setpoint=${_args.hScaleSetpoint}
        .advicePosition=${_args.hScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.hScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .advices=${[
          {min: 2, max: 5, type: AdviceType.caution, hinted: true},
          {min: 8, max: 9.5, type: AdviceType.advice, hinted: false},
        ]}
        .primaryTickmarkInterval=${1}
        .secondaryTickmarkInterval=${0.5}
        .tertiaryTickmarkInterval=${0.125}
        .scaleBackground=${true}
      ></obc-bar-horizontal>
    </obc-line-graph>
  `,
};

/**
 * When `fixedAspectRatio=true`, the component scales proportionally (like CSS transform:scale)
 * based on container size, while keeping label font-size constant.
 *
 * - **false (default)**: Dimensions react to component properties
 * - **true**: "Freezes" internal calculations and scales the entire component as a vector
 *
 * This story demonstrates both modes side-by-side with resizable containers.
 */
export const FixedAspectRatioComparison: StoryObj = {
  tags: ['skip-test'],
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap: 32px;
      padding: 16px;
      width: 800px;
    `;

    // Create two containers
    const containerNormal = document.createElement('div');
    containerNormal.style.cssText = `
      border: 2px dashed var(--instrument-frame-tertiary-color);
      padding: 16px;
      resize: both;
      overflow: auto;
      min-width: 200px;
      min-height: 100px;
      display: flex;
      flex-direction: column;
    `;

    const containerFixed = document.createElement('div');
    containerFixed.style.cssText = `
      border: 2px dashed var(--instrument-enhanced-primary-color);
      padding: 16px;
      resize: both;
      overflow: auto;
      min-width: 200px;
      min-height: 100px;
      display: flex;
      flex-direction: column;
    `;

    const labelNormal = document.createElement('div');
    labelNormal.textContent = 'fixedAspectRatio=false (default)';
    labelNormal.style.cssText = `
      font-family: var(--font-family-main);
      font-size: 14px;
      color: var(--instrument-frame-tertiary-color);
      margin-bottom: 8px;
    `;

    const labelFixed = document.createElement('div');
    labelFixed.textContent = 'fixedAspectRatio=true (vector scaling)';
    labelFixed.style.cssText = `
      font-family: var(--font-family-main);
      font-size: 14px;
      color: var(--instrument-enhanced-primary-color);
      margin-bottom: 8px;
    `;

    // Normal bar (responsive to CSS variables)
    const barNormal = document.createElement('obc-bar-horizontal');
    barNormal.minValue = -20;
    barNormal.maxValue = 120;
    barNormal.width = 320;
    barNormal.hasBar = true;
    barNormal.hasScale = true;
    barNormal.value = 60;
    barNormal.setpoint = 80;
    // setpoint is now shown when defined
    barNormal.fillMode = FillMode.fill;
    barNormal.priority = Priority.regular;
    barNormal.primaryTickmarkInterval = 20;
    barNormal.fixedAspectRatio = false;
    barNormal.style.cssText = 'flex: 1; height: 100%;';

    // Make barNormal responsive to container width changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        const padding = 32; // 16px left + 16px right from container padding
        const availableWidth = containerWidth - padding;
        if (availableWidth > 0) {
          barNormal.width = availableWidth;
        }
      }
    });
    resizeObserver.observe(containerNormal);

    // Fixed aspect ratio bar (scales as vector)
    const barFixed = document.createElement('obc-bar-horizontal');
    barFixed.minValue = -20;
    barFixed.maxValue = 120;
    barFixed.width = 320;
    barFixed.hasBar = true;
    barFixed.hasScale = true;
    barFixed.value = 60;
    barFixed.setpoint = 80;
    // setpoint is now shown when defined
    barFixed.fillMode = FillMode.fill;
    barFixed.priority = Priority.enhanced;
    barFixed.primaryTickmarkInterval = 20;
    barFixed.fixedAspectRatio = true;
    barFixed.style.cssText = 'flex: 1; height: 100%;';

    containerNormal.appendChild(labelNormal);
    containerNormal.appendChild(barNormal);
    containerFixed.appendChild(labelFixed);
    containerFixed.appendChild(barFixed);

    wrapper.appendChild(containerNormal);
    wrapper.appendChild(containerFixed);

    return wrapper;
  },
};
