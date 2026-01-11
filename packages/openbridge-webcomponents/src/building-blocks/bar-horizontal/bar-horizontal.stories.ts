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
  HorizontalSide,
  BorderRadiusPosition,
  InstrumentState,
} from './bar-horizontal.js';

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
  title: 'Building Blocks/Bar Horizontal',
  tags: ['autodocs', '6.0'],
  component: 'obc-bar-horizontal',
  parameters: {
    docs: {
      description: {
        component: `

This is a thin web-component wrapper around the pure SVG building-block renderer in \`external-scale.ts\`.

It sets up the outer \`<svg>\`/\`viewBox\` for a horizontal scale and delegates rendering/layout to:
- \`computeExternalScaleLayout(...)\`
- \`renderExternalScale(config)\`

For renderer documentation see: **Building Blocks/External Scale**.

For more test cases (Auto at-setpoint detection, Manual at-setpoint control, Deadband tuning and Zero snap behavior) see: **Building Blocks/Bar Vertical**.`,
      },
    },
  },
  argTypes: {
    minValue: {
      control: {type: 'range', min: -100, max: 100},
      description: 'Minimum scale value (manual mode)',
    },
    maxValue: {
      control: {type: 'range', min: 0, max: 1000},
      description: 'Maximum scale value (manual mode)',
    },
    width: {
      control: {type: 'range', min: 0, max: 768},
      description: 'Total width in pixels',
    },
    barThickness: {
      control: {type: 'range', min: 8, max: 48},
      description: 'Bar/fill thickness in pixels',
    },
    hasScale: {
      control: {type: 'boolean'},
      description: 'Show scale tickmarks',
    },
    mainTickbars: {
      control: {type: 'object'},
      table: {type: {summary: 'number[] | undefined'}},
      description:
        'Array of values for main tickbars. When undefined, no main tickbars shown. When empty array [], defaults to [minValue, 0, maxValue].',
    },
    primaryTickbarsInterval: {
      control: {type: 'number', min: 1},
      description:
        'Interval for primary (longest) tickmarks with labels (minimum 1)',
    },
    secondaryTickbarsInterval: {
      control: {type: 'number', min: 1},
      description: 'Interval for secondary (medium) tickmarks (minimum 1)',
    },
    tertiaryTickbarsInterval: {
      control: {type: 'number', min: 1},
      description: 'Interval for tertiary (shortest) tickmarks (minimum 1)',
    },
    scaleType: {
      control: {type: 'select'},
      options: Object.values(ScaleType),
      description: 'Scale display mode: regular or condensed (shorter ticks)',
    },
    frameStyle: {
      control: {type: 'select'},
      options: Object.values(FrameStyle),
      description:
        'Frame style: regular (4px gap for all), flat (main tickmarks touch edge), framed, or instrument',
    },
    labels: {
      control: {type: 'boolean'},
      description: 'Show numerical value labels at primary tickmarks',
    },
    hasBar: {
      control: {type: 'boolean'},
      description: 'Show bar',
    },
    scaleBackground: {
      control: {type: 'boolean'},
      description: 'Show background behind the scale tickmarks',
    },
    borderRadiusPosition: {
      control: {type: 'select'},
      options: Object.values(BorderRadiusPosition),
      description: 'Border radius position based on component layout',
    },
    borderRadiusPositionExternalScales: {
      control: {type: 'select'},
      options: Object.values(BorderRadiusPosition),
      description: 'Border radius position based on component layout',
    },
    enhanced: {
      control: {type: 'boolean'},
      description:
        'Enhanced visual mode: when true, uses enhanced instrument colors for bar fill and setpoint',
    },
    fillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
      description: 'Fill visualization mode: fill or tint',
    },
    fillMin: {
      control: {type: 'number'},
      description: 'Minimum fill value for tint mode (defaults to 0)',
    },
    fillMax: {
      control: {type: 'number'},
      description: 'Maximum fill value for tint mode (defaults to value)',
    },
    value: {
      control: {type: 'range', min: -100, max: 100, step: 1},
      description: 'Current value (bar fill level)',
    },
    setpoint: {
      control: {type: 'range', min: -100, max: 100, step: 1},
      description:
        'Setpoint/input value to display as indicator. When undefined, no setpoint shown.',
    },
    atSetpoint: {
      control: {type: 'boolean'},
      description:
        'Whether value is at setpoint (manual override when disableAutoAtSetpoint=true)',
    },
    disableAutoAtSetpoint: {
      control: {type: 'boolean'},
      description:
        'Disable automatic atSetpoint calculation based on value and deadband',
    },
    autoAtSetpointDeadband: {
      control: {type: 'number', min: 0, max: 10, step: 0.5},
      description:
        'Deadband for automatic atSetpoint detection (when disableAutoAtSetpoint=false)',
    },
    setpointAtZeroDeadband: {
      control: {type: 'number', min: 0, max: 5, step: 0.1},
      description: 'Deadband around zero for setpoint positioning',
    },
    state: {
      control: {type: 'select'},
      options: Object.values(InstrumentState),
    },
    side: {
      control: {type: 'radio'},
      options: ['top', 'bottom'],
      description: 'Which side this scale lives on',
    },
    advicePosition: {
      control: {type: 'select'},
      options: ['center', 'inner', 'outer'],
      description:
        'Advice overlay positioning: center (in bar), inner (covers minor ticks), outer (no overlap)',
    },
    advices: {
      control: {type: 'object'},
      description:
        'Advice/alert overlays with state and positioning. When undefined or empty, no advice shown.',
    },
  },
  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    barThickness: 24,
    hasScale: true,
    mainTickbars: [],
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: undefined,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    labels: true,
    hasBar: false,
    scaleBackground: false,
    borderRadiusPosition: undefined,
    borderRadiusPositionExternalScales: undefined,
    enhanced: false,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: undefined,
    setpoint: undefined,
    atSetpoint: false,
    disableAutoAtSetpoint: false,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: 'inCommand',
    side: 'bottom',
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
      .mainTickbars=${args.mainTickbars}
      .primaryTickbarsInterval=${args.primaryTickbarsInterval}
      .secondaryTickbarsInterval=${args.secondaryTickbarsInterval}
      .tertiaryTickbarsInterval=${args.tertiaryTickbarsInterval}
      .scaleType=${args.scaleType}
      .frameStyle=${args.frameStyle}
      .labels=${args.labels}
      .hasBar=${args.hasBar}
      .scaleBackground=${args.scaleBackground}
      .borderRadiusPosition=${args.borderRadiusPosition}
      .enhanced=${args.enhanced}
      .fillMode=${args.fillMode}
      .fillMin=${args.fillMin}
      .fillMax=${args.fillMax}
      .value=${args.value}
      .setpoint=${args.setpoint}
      .atSetpoint=${args.atSetpoint}
      .disableAutoAtSetpoint=${args.disableAutoAtSetpoint}
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
    side: 'bottom',
    labels: true,
    tertiaryTickbarsInterval: 2,
    hasBar: true,
    setpoint: 50,
    value: 40,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
};

export const ComponentSizeComparison: Story = {
  name: 'Component size comparison (regular/medium/large/xl)',

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
            .labels=${true}
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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
            .labels=${true}
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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
            .labels=${true}
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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
            .labels=${true}
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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
    side: 'top',
    labels: true,
  },
};

export const WithBarBottom: Story = {
  name: 'With bar (bottom side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasBar: true,
    labels: true,
  },
};

export const WithBarTop: Story = {
  name: 'With bar (top side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasBar: true,
    labels: true,
    side: 'top',
  },
};

export const NegativeRange: Story = {
  name: 'Negative range (-100 to 100)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 480,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    labels: true,
  },
};

export const SmallRange: Story = {
  name: 'Small range (0 to 10)',

  args: {
    minValue: 0,
    maxValue: 10,
    width: 480,
    primaryTickbarsInterval: 2,
    secondaryTickbarsInterval: 1,
    labels: true,
  },
};

export const WithBarFillBottom: Story = {
  name: 'With bar fill (bottom side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 65,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
  },
};

export const WithBarFillTop: Story = {
  name: 'With bar fill (top side)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 480,
    hasBar: true,
    labels: true,
    enhanced: false,
    value: 45,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    side: 'top',
  },
};

export const FillModeComparison: Story = {
  name: 'Fill mode comparison, enhanced (fill vs tint)',

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
          enhanced
          fillMode="${FillMode.fill}"
          fillMin="0"
          fillMax="65"
          value="65"
          setpoint="70"
          .labels=${true}
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
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
          enhanced
          fillMode="${FillMode.tint}"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          .labels=${true}
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
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
          enhanced
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          .labels=${true}
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-bar-horizontal>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint mode with advice overlays',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    labels: true,
    hasBar: true,
    enhanced: true,
    fillMode: FillMode.tint,
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 30,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advicePosition: AdvicePosition.center,
    advices: [
      {min: 40, max: 60, type: AdviceType.caution, hinted: true},
      {min: -60, max: -40, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const WithAdviceInner: Story = {
  name: 'With advice overlays (inner positioning)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    labels: true,
    hasBar: true,
    value: 10,
    setpoint: 10,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: 2,
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
  name: 'With advice overlays (outer positioning)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    labels: true,
    hasBar: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
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
  name: 'With advice overlays (center positioning)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 520,
    labels: true,
    hasBar: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
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
  name: 'With setpoint (value at setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 480,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 50,
    setpoint: 50,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const WithSetpointAwayFromValue: Story = {
  name: 'With setpoint (value away from setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,
    width: 480,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 30,
    setpoint: 70,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const SetpointStateComparison: Story = {
  name: 'State comparison (inCommand/active/loading/off)',

  render: () => html`
    <div
      style="display: flex; flex-direction:column; gap: 40px; align-items: flex-start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          inCommand
        </div>
        <obc-bar-horizontal
          minValue="-100"
          maxValue="100"
          width="480"
          hasBar
          enhanced
          value="50"
          setpoint="50"
          .labels=${true}
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          active
        </div>
        <obc-bar-horizontal
          minValue="-100"
          maxValue="100"
          width="480"
          hasBar
          enhanced
          value="30"
          setpoint="70"
          .labels=${true}
          state="active"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          loading
        </div>
        <obc-bar-horizontal
          minValue="-100"
          maxValue="100"
          width="480"
          hasBar
          enhanced
          value="-20"
          setpoint="40"
          .labels=${true}
          state="loading"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">off</div>
        <obc-bar-horizontal
          minValue="-100"
          maxValue="100"
          width="480"
          hasBar
          enhanced
          value="60"
          setpoint="-30"
          .labels=${true}
          state="off"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-horizontal>
      </div>
    </div>
  `,
};

export const ScaleTypeComparison: Story = {
  name: 'Scale type comparison (regular vs condensed)',

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
          .labels=${true}
          .primaryTickbarsInterval=${20}
          .secondaryTickbarsInterval=${10}
          .tertiaryTickbarsInterval=${2}
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
          .labels=${true}
          .primaryTickbarsInterval=${20}
          .secondaryTickbarsInterval=${10}
          .tertiaryTickbarsInterval=${2}
          .hasBar=${true}
        ></obc-bar-horizontal>
      </div>
    </div>
  `,
};

export const HorizontalBottomScaleBackground: Story = {
  name: 'With scale background (Gauge style, bottom side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    side: 'bottom',
    hasBar: true,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
    scaleBackground: true,
    labels: true,
    enhanced: true,
    value: 40,
    // setpoint: 50,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: 2,
    advices: [],
  },
};

export const ChartIntegrationBottom: Story = {
  name: 'Chart integration (as external bottom axis)',
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
    hScaleLabels: {
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
    hScaleLabels: true,
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
        .side=${'bottom'}
        .hasScale=${true}
        .labels=${_args.hScaleLabels}
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
        .primaryTickbarsInterval=${1}
        .secondaryTickbarsInterval=${0.5}
        .tertiaryTickbarsInterval=${0.125}
      ></obc-bar-horizontal>
    </obc-line-graph>
  `,
};

export const ChartIntegrationBottomBackground: Story = {
  name: 'Chart integration (as external bottom axis, scaleBackground)',
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
    hScaleLabels: {
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
    hScaleLabels: true,
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
        .side=${'bottom'}
        .hasScale=${true}
        .labels=${_args.hScaleLabels}
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
        .primaryTickbarsInterval=${1}
        .secondaryTickbarsInterval=${0.5}
        .tertiaryTickbarsInterval=${0.125}
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
  tags: ['!snapshot'],
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
    barNormal.labels = true;
    barNormal.value = 60;
    barNormal.setpoint = 80;
    // setpoint is now shown when defined
    barNormal.fillMode = FillMode.fill;
    barNormal.enhanced = false;
    barNormal.primaryTickbarsInterval = 20;
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
    barFixed.labels = true;
    barFixed.value = 60;
    barFixed.setpoint = 80;
    // setpoint is now shown when defined
    barFixed.fillMode = FillMode.fill;
    barFixed.enhanced = true;
    barFixed.primaryTickbarsInterval = 20;
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

/**
 * Demonstrates `fixedAspectRatio=true` with a bar attached to a chart's bottom edge.
 * As the container resizes, the bar scales proportionally while maintaining
 * its aspect ratio and label readability.
 */
export const FixedAspectRatioChartIntegration: StoryObj = {
  tags: ['!snapshot'],
  render: () => {
    const outerWrapper = document.createElement('div');
    outerWrapper.style.cssText = `
      border: 2px dashed var(--instrument-enhanced-secondary-color);
      padding: 16px;
      resize: both;
      overflow: auto;
      min-width: 300px;
      min-height: 300px;
      max-width: 800px;
      max-height: 600px;
      width: 600px;
      height: 400px;
    `;

    const label = document.createElement('div');
    label.textContent =
      'Resize this container - bar scales proportionally (fixedAspectRatio=true)';
    label.style.cssText = `
      font-family: var(--font-family-main);
      font-size: 14px;
      color: var(--instrument-enhanced-secondary-color);
      margin-bottom: 8px;
    `;

    const chartArea = document.createElement('div');
    chartArea.style.cssText = `
      width: 100%;
      height: calc(100% - 30px);
      background: var(--instrument-frame-primary-color);
      border: 1px solid var(--instrument-frame-tertiary-color);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    `;

    // Container for the bar that ResizeObserver will watch
    const barContainer = document.createElement('div');
    barContainer.style.cssText = `
      width: 100%;
      height: 200px;
      display: flex;
      resize: vertical;
      overflow: auto;
      min-height: 50px;
      max-height: 400px;
    `;

    const bar = document.createElement('obc-bar-horizontal');
    bar.minValue = 0;
    bar.maxValue = 100;
    bar.width = 320;
    bar.hasBar = true;
    bar.hasScale = true;
    bar.labels = true;
    bar.value = 65;
    bar.setpoint = 50;
    // setpoint is now shown when defined
    bar.fillMode = FillMode.fill;
    bar.enhanced = true;
    bar.primaryTickbarsInterval = 10;
    bar.fixedAspectRatio = true;
    bar.side = HorizontalSide.bottom;
    bar.style.cssText = `
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    barContainer.appendChild(bar);
    chartArea.appendChild(barContainer);
    outerWrapper.appendChild(label);
    outerWrapper.appendChild(chartArea);

    return outerWrapper;
  },
};
