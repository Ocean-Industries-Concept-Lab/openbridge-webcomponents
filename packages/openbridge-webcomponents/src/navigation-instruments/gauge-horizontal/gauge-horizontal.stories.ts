import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-horizontal.js';
import '../../bars-graphs/line-graph/line-graph.js';
import {AdviceType} from '../watch/advice.js';
import {
  FillMode,
  AdvicePosition,
  BorderRadiusPosition,
  InstrumentState,
} from './gauge-horizontal.js';

const meta: Meta = {
  title: 'Instruments/Gauge Horizontal',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-horizontal',
  parameters: {
    docs: {
      description: {
        component: `

Horizontal gauge component – the same as **obc-bar-horizontal** (both extend **external-scale.ts**) but with several properties fixed for consistent gauge appearance:

**Fixed properties (not configurable):**
- \`width\`: 384px
- \`paddingLeft\`/\`paddingRight\`: 32px
- \`barThickness\`: 48px
- \`tickThickness\`: 28px
- \`labelThickness\`: 60px
- \`borderRadius\`: 8px (matches obc-component-size-medium)
- \`scaleType\`: regular
- \`frameStyle\`: regular
- \`hasBar\`: true
- \`hasScale\`: true
- \`scaleBackground\`: true
- \`fixedAspectRatio\`: true (always scales proportionally)

This is a higher fidelity implementation of the concept shown in **instrument-linear.ts**, providing a complete gauge with container, scale background, tickmarks, labels, advice overlays, and setpoint marker.

This is a thin web-component wrapper around the pure SVG building-block renderer in \`external-scale.ts\`.

It sets up the outer \`<svg>\`/\`viewBox\` for a horizontal scale and delegates rendering/layout to:
- \`computeExternalScaleLayout(...)\`
- \`renderExternalScale(config)\`

For renderer documentation see: **Building Blocks/External Scale**.

For a version where these properties are user-configurable, see **Building Blocks/Bar Horizontal**.`,
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
    mainTickbars: {
      control: {type: 'object'},
      table: {type: {summary: 'number[] | undefined'}},
      description:
        'Array of values for main tickbars. When undefined no main tickbars shown, when empty array [] defaults to [minValue, 0, maxValue].',
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
    hideLabels: {
      control: {type: 'boolean'},
      description: 'Hide numerical value labels at primary tickmarks',
    },
    borderRadiusPosition: {
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
        'Setpoint/input value to display as indicator (when undefined, setpoint is off)',
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
        'Advice/alert overlays with state and positioning (when undefined or empty, no advice shown)',
    },
  },
  args: {
    minValue: 0,
    maxValue: 100,
    mainTickbars: [],
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: undefined,
    hideLabels: false,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
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
    <obc-gauge-horizontal
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .mainTickbars=${args.mainTickbars}
      .primaryTickbarsInterval=${args.primaryTickbarsInterval}
      .secondaryTickbarsInterval=${args.secondaryTickbarsInterval}
      .tertiaryTickbarsInterval=${args.tertiaryTickbarsInterval}
      .hideLabels=${args.hideLabels}
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
    </obc-gauge-horizontal>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DefaultBottom: Story = {
  name: 'Default (bottom side, bar, labels, advice)',
  args: {
    minValue: 0,
    maxValue: 100,
    side: 'bottom',

    tertiaryTickbarsInterval: 2,
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
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Medium
        </div>
        <div class="obc-component-size-medium">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Large
        </div>
        <div class="obc-component-size-large">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">XL</div>
        <div class="obc-component-size-xl">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
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
    side: 'top',
  },
};

export const WithBarBottom: Story = {
  name: 'With bar (bottom side)',

  args: {
    minValue: 0,
    maxValue: 100,
  },
};

export const WithBarTop: Story = {
  name: 'With bar (top side)',

  args: {
    minValue: 0,
    maxValue: 100,

    side: 'top',
  },
};

export const NegativeRange: Story = {
  name: 'Negative range (-100 to 100)',

  args: {
    minValue: -100,
    maxValue: 100,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const SmallRange: Story = {
  name: 'Small range (0 to 10)',

  args: {
    minValue: 0,
    maxValue: 10,
    primaryTickbarsInterval: 2,
    secondaryTickbarsInterval: 1,
  },
};

export const WithBarFillBottom: Story = {
  name: 'With bar fill (bottom side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,

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
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          enhanced
          fillMode="${FillMode.fill}"
          fillMin="0"
          fillMax="65"
          value="65"
          setpoint="70"
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          enhanced
          fillMode="${FillMode.tint}"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          enhanced
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint mode with advice overlays',

  args: {
    minValue: -100,
    maxValue: 100,

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
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="50"
          setpoint="50"
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          active
        </div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="30"
          setpoint="70"
          state="active"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          loading
        </div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="-20"
          setpoint="40"
          state="loading"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">off</div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="60"
          setpoint="-30"
          state="off"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
    </div>
  `,
};
