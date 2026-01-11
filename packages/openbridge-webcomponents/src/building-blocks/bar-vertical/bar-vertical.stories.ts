import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './bar-vertical.js';
import '../../bars-graphs/line-graph/line-graph.js';
import '../../bars-graphs/area-graph/area-graph.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import {
  ScaleType,
  FrameStyle,
  FillMode,
  AdvicePosition,
  VerticalSide,
  BorderRadiusPosition,
} from './bar-vertical.js';

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
  title: 'Building Blocks/Bar Vertical',
  tags: ['autodocs', '6.0'],
  component: 'obc-bar-vertical',
  parameters: {
    docs: {
      description: {
        component: `

This is a thin web-component wrapper around the pure SVG building-block renderer in \`external-scale.ts\`.

It sets up the outer \`<svg>\`/\`viewBox\` for a vertical scale and delegates rendering/layout to:
- \`computeExternalScaleLayout(...)\`
- \`renderExternalScale(config)\`

For renderer documentation see: **Building Blocks/External Scale**.`,
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
    height: {
      control: {type: 'range', min: 0, max: 512},
      description: 'Total height in pixels',
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
      control: {type: 'radio'},
      options: ['regular', 'condensed'],
      description: 'Scale display mode: regular or condensed (shorter ticks)',
    },
    frameStyle: {
      control: {type: 'radio'},
      options: ['regular', 'flat', 'framed', 'instrument'],
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
      control: {type: 'radio'},
      options: ['innerFirstChild', 'middleChild', 'outerLastChild'],
      description: 'Border radius position based on component layout',
    },
    borderRadiusPositionExternalScales: {
      control: {type: 'radio'},
      options: ['innerFirstChild', 'middleChild', 'outerLastChild'],
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
      description: 'Setpoint/input value to display as indicator',
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
      control: {type: 'radio'},
      options: ['inCommand', 'active', 'loading', 'off'],
      description: 'Instrument state (affects colors and setpoint appearance)',
    },
    side: {
      control: {type: 'radio'},
      options: ['left', 'right'],
      description: 'Which side this scale lives on',
    },
    advicePosition: {
      control: {type: 'radio'},
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
    height: 320,
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
    side: 'right',
    advicePosition: AdvicePosition.inner,
    advices: [],
  },
  render: (args) => html`
    <obc-bar-vertical
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .height=${args.height}
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
    </obc-bar-vertical>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DefaultRight: Story = {
  name: 'Default (right side, bar, labels, advice)',
  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    side: 'right',
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
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular
        </div>
        <div class="obc-component-size-regular">
          <obc-bar-vertical
            minValue="0"
            maxValue="100"
            height="320"
            side="right"
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
          ></obc-bar-vertical>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Medium
        </div>
        <div class="obc-component-size-medium">
          <obc-bar-vertical
            minValue="0"
            maxValue="100"
            height="320"
            side="right"
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
          ></obc-bar-vertical>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Large
        </div>
        <div class="obc-component-size-large">
          <obc-bar-vertical
            minValue="0"
            maxValue="100"
            height="320"
            side="right"
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
          ></obc-bar-vertical>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">XL</div>
        <div class="obc-component-size-xl">
          <obc-bar-vertical
            minValue="0"
            maxValue="100"
            height="320"
            side="right"
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
          ></obc-bar-vertical>
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
    height: 320,
    side: 'left',
    labels: true,
  },
};

export const WithBarRight: Story = {
  name: 'With bar (right side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
  },
};

export const WithBarLeft: Story = {
  name: 'With bar (left side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    side: 'left',
  },
};

export const NegativeRange: Story = {
  name: 'Negative range (-100 to 100)',

  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
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
    height: 320,
    primaryTickbarsInterval: 2,
    secondaryTickbarsInterval: 1,
    labels: true,
  },
};

// export const WithSetpointAtZero: Story = {
//   name: 'With setpoint at zero (within deadband)',
//   args: {
//     minValue: -100,
//     maxValue: 100,
//     height: 320,
//     setpoint: 0.3,
//     setpointAtZeroDeadband: 0.5,
//     hasBar: true,
//     enhanced: true,
//     primaryTickbarsInterval: 50,
//     secondaryTickbarsInterval: 10,
//     labels: true,
//   },
// };

export const WithBarFillRight: Story = {
  name: 'With bar fill (right side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 65,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
  },
};

export const WithBarFillLeft: Story = {
  name: 'With bar fill (left side)',

  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: false,
    value: 45,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    side: 'left',
  },
};

export const FillModeComparison: Story = {
  name: 'Fill mode comparison, enhanced (fill vs tint)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Fill Mode
        </div>
        <obc-bar-vertical
          minValue="0"
          maxValue="100"
          height="320"
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
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-bar-vertical
          minValue="0"
          maxValue="100"
          height="320"
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
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-bar-vertical
          minValue="0"
          maxValue="100"
          height="320"
          hasBar
          enhanced
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          .labels=${true}
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint mode with advice overlays',

  args: {
    minValue: -100,
    maxValue: 100,
    height: 370,
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
    height: 370,
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
    height: 370,
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
    height: 370,
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
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 50, // Current value
    setpoint: 50, // Setpoint marker at same position
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const WithSetpointAwayFromValue: Story = {
  name: 'With setpoint (value away from setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 30, // Current value
    setpoint: 70, // Setpoint marker at different position
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const StateComparison: Story = {
  name: 'State comparison (inCommand/active/loading/off)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          inCommand
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          hasBar
          enhanced
          value="50"
          setpoint="50"
          .labels=${true}
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          active
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          hasBar
          enhanced
          value="30"
          setpoint="70"
          .labels=${true}
          state="active"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          loading
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          hasBar
          enhanced
          value="-20"
          setpoint="40"
          .labels=${true}
          state="loading"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">off</div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          hasBar
          enhanced
          value="60"
          setpoint="-30"
          .labels=${true}
          state="off"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const VerticalRightScaleBackground: Story = {
  name: 'With scale background (Gauge style, right side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    side: 'right',
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

// Test Scenario Stories
export const TestScenario1_AutoAtSetpoint: Story = {
  name: 'Test: Auto at-setpoint detection',

  parameters: {
    docs: {
      description: {
        story: `This story demonstrates **automatic detection** of when your current value matches your target (setpoint). Think of it like a thermostat:

- **Setpoint** = your desired temperature (e.g., 50°)
- **Value** = current room temperature (e.g., 50°)
- **Deadband** = tolerance zone (±1°)

When the current value gets "close enough" to the setpoint (within the deadband), the system considers you "at setpoint" and the visual indicator **shrinks to 80% size** to show "we're there!"

#### Why the deadband?

Real-world values fluctuate. Without a deadband, the indicator would constantly flip between "at" and "away" states when hovering near the target (e.g., 49.9° → 50.1° → 49.8°...). The 1-unit deadband means: *"If we're within ±1 of the target, that's close enough!"*

#### Try it:
- Change \`value\` to **51** → Marker stays small (still within deadband: \`|51 - 50| = 1 ≤ 1\`)
- Change \`value\` to **52** → Marker grows to 100% (\`|52 - 50| = 2 > 1\` ❌ away from setpoint)
- Adjust \`autoAtSetpointDeadband\` to **10** → Almost always "at setpoint"
- Adjust \`autoAtSetpointDeadband\` to **0.1** → Almost never "at setpoint"`,
      },
    },
  },
  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 50, // Start at setpoint
    setpoint: 50,
    disableAutoAtSetpoint: false, // Auto mode
    autoAtSetpointDeadband: 1, // 1-unit tolerance
    state: 'inCommand',
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const TestScenario2_ManualAtSetpoint: Story = {
  name: 'Test: Manual at-setpoint control',

  parameters: {
    docs: {
      description: {
        story: `This story demonstrates **manual control** of the at-setpoint state, bypassing automatic detection.

#### When to use manual mode?

Sometimes you need to control the "at setpoint" visual state directly, independent of the actual value/setpoint relationship:

- **External logic**: Another system (PLC, control algorithm) determines "at setpoint" based on factors beyond simple distance (e.g., stability duration, rate of change)
- **UI testing**: Force the visual state for testing/demonstration without changing values
- **Custom deadband logic**: Implement asymmetric or non-linear deadband logic externally

#### How it works

- Set \`disableAutoAtSetpoint={true}\` to disable automatic calculation
- Control marker size via \`atSetpoint={true/false}\` property directly
- The component **ignores** \`value\`, \`setpoint\`, and \`autoAtSetpointDeadband\`

#### Current state

- **Value**: 30 (bar fill position)
- **Setpoint**: 70 (marker position)
- **Distance**: 40 units apart (clearly "away" by any measure)
- **atSetpoint**: ${false} (marker is normal size)

#### Try it:
- Toggle \`atSetpoint\` to **true** → Marker **shrinks to 80%** even though value is far from setpoint
- Toggle \`atSetpoint\` to **false** → Marker **grows to 100%**
- Change \`value\` to **70** (match setpoint) → Marker size **doesn't change** (manual mode ignores values)
- Set \`disableAutoAtSetpoint={false}\` → Switch back to auto mode (marker immediately reflects actual distance)`,
      },
    },
  },
  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 30, // Value at 30
    setpoint: 70, // Setpoint at 70 (far apart)
    disableAutoAtSetpoint: true, // Manual mode
    atSetpoint: false, // Manually set to false (try toggling to true!)
    state: 'inCommand',
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const TestScenario3_DeadbandTuning: Story = {
  name: 'Test: Deadband tuning',

  parameters: {
    docs: {
      description: {
        story: `This story demonstrates **tuning the deadband** to find the right tolerance for your application.

#### What is deadband tuning?

The deadband determines how close the value must be to the setpoint before the system considers you "at setpoint". Finding the right value is a balancing act:

- **Too small** (e.g., 0.1): Marker constantly flips between sizes due to minor fluctuations
- **Too large** (e.g., 10): Marker shows "at setpoint" even when significantly off target
- **Just right** (e.g., 1-5): Tolerates normal fluctuations while indicating when you're meaningfully off target

#### Current state

- **Value**: 45
- **Setpoint**: 50
- **Distance**: 5 units away
- **Deadband**: 1 unit
- **Result**: Marker is **large (100%)** because \`|45 - 50| = 5 > 1\` ❌

#### Tuning scenarios

| Deadband | Distance | At Setpoint? | Marker Size | Use Case |
|----------|----------|--------------|-------------|----------|
| **0.1** | 5 | ❌ No | 100% | High-precision control (tight tolerance) |
| **1** | 5 | ❌ No | 100% | **Current setting** - moderate precision |
| **5** | 5 | ✅ Yes | 80% | Exactly at boundary - edge case |
| **10** | 5 | ✅ Yes | 80% | Loose tolerance (accepts wide range) |

#### Try it:
- Set \`autoAtSetpointDeadband\` to **5** → Marker **shrinks** (exactly at boundary: \`5 ≤ 5\`)
- Set \`autoAtSetpointDeadband\` to **6** → Marker **shrinks** (well within: \`5 < 6\`)
- Set \`autoAtSetpointDeadband\` to **4** → Marker **stays large** (outside: \`5 > 4\`)
- Set \`autoAtSetpointDeadband\` to **10** → Marker **shrinks** (loose tolerance always "at")
- Set \`autoAtSetpointDeadband\` to **0.1** → Marker **stays large** (tight tolerance almost never "at")
- Change \`value\` to **49** → Distance becomes 1, test different deadbands around this value`,
      },
    },
  },
  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 45, // 5 units away from setpoint
    setpoint: 50,
    disableAutoAtSetpoint: false,
    autoAtSetpointDeadband: 1, // Try changing to 10 (at setpoint) or 0.1 (away)
    state: 'inCommand',
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const TestScenario5_ZeroSnapBehavior: Story = {
  name: 'Test: Zero snap behavior',

  parameters: {
    docs: {
      description: {
        story: `This story demonstrates **visual snapping to zero** when the setpoint is very close to zero, even if not exactly zero.

#### What is zero snap behavior?

In maritime and industrial control systems, zero is often a special reference point (e.g., neutral rudder, level flight, centered position). The \`setpointAtZeroDeadband\` creates a "snap zone" around zero where the setpoint marker **visually jumps to the zero line** for cleaner display, even though the actual setpoint value may be slightly off zero.

**Important distinction:**
- \`autoAtSetpointDeadband\`: Controls **marker size** (80% when "at setpoint")
- \`setpointAtZeroDeadband\`: Controls **marker position** (snaps to zero line when close)

#### Current state

- **Value**: 0 (bar fill at zero)
- **Setpoint**: 0.3 (slightly above zero)
- **Zero deadband**: 0.5
- **Result**: Marker **displays at zero** because \`|0.3 - 0| = 0.3 < 0.5\` ✅

#### Why snap to zero?

1. **Visual clarity**: Easier to see "near zero" vs "exactly zero" at a glance
2. **Reduces clutter**: Avoids tiny gaps between marker and zero line for values like 0.01, -0.02
3. **Emphasizes zero**: Zero is often a critical reference (neutral, balanced, centered)

#### Snap zone examples

| Setpoint | Deadband | Distance from Zero | Snaps to Zero? | Visual Position |
|----------|----------|-------------------|----------------|-----------------|
| **0.3** | 0.5 | 0.3 | ✅ Yes | At zero line |
| **0.3** | 0.2 | 0.3 | ❌ No | At 0.3 (actual) |
| **0.6** | 0.5 | 0.6 | ❌ No | At 0.6 (actual) |
| **-0.4** | 0.5 | 0.4 | ✅ Yes | At zero line |
| **0** | 0.5 | 0 | ✅ Yes | At zero line |

#### Try it:
- Set \`setpointAtZeroDeadband\` to **0.2** → Marker **moves to 0.3** (outside snap zone: \`0.3 > 0.2\`)
- Set \`setpointAtZeroDeadband\` to **1.0** → Marker **stays at zero** (wider snap zone: \`0.3 < 1.0\`)
- Change \`setpoint\` to **0.6** → Marker **moves to 0.6** (outside default zone: \`0.6 > 0.5\`)
- Change \`setpoint\` to **-0.4** → Marker **snaps to zero** (within zone: \`|-0.4| = 0.4 < 0.5\`)
- Change \`setpoint\` to **0** → Marker **stays at zero** (always snaps when exactly zero)`,
      },
    },
  },
  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
    labels: true,
    enhanced: true,
    value: 0,
    setpoint: 0.3, // Close to zero (should snap)
    setpointAtZeroDeadband: 0.5, // Try changing to 0.1 (no snap) or 1.0 (wider snap)
    state: 'inCommand',
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    fillMax: 0,
  },
};

export const EnhancedModeComparison: Story = {
  name: 'Enhanced mode comparison (regular vs enhanced)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular (right)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          hasBar
          value="35"
          setpoint="50"
          .labels=${true}
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          side="right"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Enhanced (right)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          hasBar
          enhanced
          value="60"
          setpoint="50"
          .labels=${true}
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          side="right"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Enhanced (left)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          hasBar
          enhanced
          value="-45"
          setpoint="-30"
          .labels=${true}
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          side="left"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const ScaleTypeComparison: Story = {
  name: 'Scale type comparison (regular vs condensed)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular
        </div>
        <obc-bar-vertical
          .minValue=${0}
          .maxValue=${100}
          .height=${320}
          .scaleType=${'regular'}
          .labels=${true}
          .primaryTickbarsInterval=${20}
          .secondaryTickbarsInterval=${10}
          .tertiaryTickbarsInterval=${2}
          .hasBar=${true}
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Condensed
        </div>
        <obc-bar-vertical
          .minValue=${0}
          .maxValue=${100}
          .height=${320}
          .scaleType=${'condensed'}
          .labels=${true}
          .primaryTickbarsInterval=${20}
          .secondaryTickbarsInterval=${10}
          .tertiaryTickbarsInterval=${2}
          .hasBar=${true}
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const ChartIntegrationRight: Story = {
  name: 'Chart integration (as external right axis)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    // External scale controls (vertical/right)
    vScaleHasBar: {control: 'boolean', description: 'Vertical scale: show bar'},
    vScaleLabels: {
      control: 'boolean',
      description: 'Vertical scale: show labels',
    },
    vScaleAdvices: {
      control: 'object',
      description: 'Vertical scale: advice overlays',
    },
    vScaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
      description: 'Vertical scale: fill mode',
    },
    vScaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
      description: 'Vertical scale: advice position',
    },
    vScaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: current value',
    },
    vScaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: setpoint',
    },
    vScaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: fill min',
    },
    vScaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: fill max',
    },
    vScaleBarThickness: {
      control: {type: 'range', min: 8, max: 64, step: 1},
      description: 'Vertical scale: bar thickness',
    },
  },
  args: {
    showPoints: true,
    showTickMarks: false,
    width: 480,
    height: 320,
    // Vertical scale defaults
    vScaleHasBar: true,
    vScaleLabels: true,
    vScaleAdvices: [
      {min: 3, max: 5, type: AdviceType.caution, hinted: true},
      {min: 6, max: 7, type: AdviceType.advice, hinted: false},
    ],
    vScaleFillMode: 'fill',
    vScaleAdvicePosition: 'inner',
    vScaleValue: 5,
    vScaleSetpoint: 5,
    vScaleFillMin: 3,
    vScaleFillMax: 5,
    vScaleBarThickness: 32,
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
      <obc-bar-vertical
        slot="right-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .height=${_args.height}
        .side=${'right'}
        .hasScale=${true}
        .labels=${_args.vScaleLabels}
        .hasBar=${_args.vScaleHasBar}
        .barThickness=${_args.vScaleBarThickness}
        .fillMode=${_args.vScaleFillMode === 'fill'
          ? FillMode.fill
          : FillMode.tint}
        .fillMin=${_args.vScaleFillMin}
        .fillMax=${_args.vScaleFillMax}
        .value=${_args.vScaleValue}
        .setpoint=${_args.vScaleSetpoint}
        .advices=${_args.vScaleAdvices}
        .advicePosition=${_args.vScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.vScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .primaryTickbarsInterval=${1}
        .secondaryTickbarsInterval=${0.5}
        .tertiaryTickbarsInterval=${0.125}
      ></obc-bar-vertical>
    </obc-line-graph>
  `,
};

export const ChartIntegrationRightBackground: Story = {
  name: 'Chart integration (as external right axis, scaleBackground)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    // External scale controls (vertical/right)
    vScaleHasBar: {control: 'boolean', description: 'Vertical scale: show bar'},
    vScaleLabels: {
      control: 'boolean',
      description: 'Vertical scale: show labels',
    },
    vScaleAdvices: {
      control: 'object',
      description: 'Vertical scale: advice overlays',
    },
    vScaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
      description: 'Vertical scale: fill mode',
    },
    vScaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
      description: 'Vertical scale: advice position',
    },
    vScaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: current value',
    },
    vScaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: setpoint',
    },
    vScaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: fill min',
    },
    vScaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: fill max',
    },
    vScaleBarThickness: {
      control: {type: 'range', min: 8, max: 64, step: 1},
      description: 'Vertical scale: bar thickness',
    },
  },
  args: {
    showPoints: true,
    showTickMarks: false,
    width: 480,
    height: 320,
    // Vertical scale defaults
    vScaleHasBar: true,
    vScaleLabels: true,
    vScaleAdvices: [
      {min: 3, max: 5, type: AdviceType.caution, hinted: true},
      {min: 6, max: 7, type: AdviceType.advice, hinted: false},
    ],
    vScaleFillMode: 'fill',
    vScaleAdvicePosition: 'inner',
    vScaleValue: 5,
    vScaleSetpoint: 5,
    vScaleFillMin: 3,
    vScaleFillMax: 5,
    vScaleBarThickness: 32,
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
      <obc-bar-vertical
        slot="right-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .height=${_args.height}
        .side=${'right'}
        .hasScale=${true}
        .labels=${_args.vScaleLabels}
        .hasBar=${_args.vScaleHasBar}
        .barThickness=${_args.vScaleBarThickness}
        .fillMode=${_args.vScaleFillMode === 'fill'
          ? FillMode.fill
          : FillMode.tint}
        .fillMin=${_args.vScaleFillMin}
        .fillMax=${_args.vScaleFillMax}
        .value=${_args.vScaleValue}
        .setpoint=${_args.vScaleSetpoint}
        .advices=${_args.vScaleAdvices}
        .advicePosition=${_args.vScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.vScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .primaryTickbarsInterval=${1}
        .secondaryTickbarsInterval=${0.5}
        .tertiaryTickbarsInterval=${0.125}
        .scaleBackground=${true}
      ></obc-bar-vertical>
    </obc-line-graph>
  `,
};

export const GaugeTrend: Story = {
  name: 'Chart integration (Gauge-trend style)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    width: {
      control: {type: 'range', min: 240, max: 960, step: 40},
      description: 'Chart width',
    },
    height: {
      control: {type: 'range', min: 240, max: 960, step: 40},
      description: 'Chart height',
    },
    enhanced: {
      control: 'boolean',
      description: 'Use enhanced color palette for chart and scales',
    },
    // External scale controls (vertical/right)
    vScaleHasBar: {control: 'boolean', description: 'Vertical scale: show bar'},
    vScaleLabels: {
      control: 'boolean',
      description: 'Vertical scale: show labels',
    },
    vScaleAdvices: {
      control: 'object',
      description: 'Vertical scale: advice overlays',
    },
    vScaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
      description: 'Vertical scale: fill mode',
    },
    vScaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
      description: 'Vertical scale: advice position',
    },
    vScaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: current value',
    },
    vScaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: setpoint',
    },
    vScaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: fill min',
    },
    vScaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
      description: 'Vertical scale: fill max',
    },
    vScaleBarThickness: {
      control: {type: 'range', min: 8, max: 64, step: 1},
      description: 'Vertical scale: bar thickness',
    },
  },
  args: {
    showPoints: true,
    showTickMarks: false,
    width: 480,
    height: 480,
    enhanced: false,
    // Vertical scale defaults
    vScaleHasBar: true,
    vScaleLabels: true,
    vScaleAdvices: [],
    vScaleFillMode: 'fill',
    vScaleAdvicePosition: 'inner',
    vScaleValue: 5,
    vScaleSetpoint: 5,
    vScaleFillMin: 3,
    vScaleFillMax: 5,
    vScaleBarThickness: 48,
  },
  render: (_args) => html`
    <obc-area-graph
      .data=${SAMPLE_DATA}
      .showPoints=${_args.showPoints}
      .showTickMarks=${_args.showTickMarks}
      .width=${_args.width}
      .height=${_args.height}
      .borderRadiusPosition=${BorderRadiusPosition.innerFirstChild}
      .borderRadiusPositionExternalScales=${BorderRadiusPosition.middleChild}
      .showGrid=${false}
      .fillMode=${'semitransparent'}
      .enhanced=${_args.enhanced}
    >
      <obc-bar-vertical
        slot="right-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .height=${_args.height}
        .side=${'right'}
        .hasScale=${true}
        .labels=${_args.vScaleLabels}
        .hasBar=${_args.vScaleHasBar}
        .barThickness=${_args.vScaleBarThickness}
        .fillMode=${_args.vScaleFillMode === 'fill'
          ? FillMode.fill
          : FillMode.tint}
        .fillMin=${_args.vScaleFillMin}
        .fillMax=${_args.vScaleFillMax}
        .value=${_args.vScaleValue}
        .setpoint=${_args.vScaleSetpoint}
        .advices=${_args.vScaleAdvices}
        .advicePosition=${_args.vScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.vScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .primaryTickbarsInterval=${1}
        .secondaryTickbarsInterval=${0.5}
        .tertiaryTickbarsInterval=${0.125}
        .scaleBackground=${true}
        .fixedAspectRatio=${true}
        .enhanced=${_args.enhanced}
      ></obc-bar-vertical>
    </obc-area-graph>
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
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding: 16px;
      height: 600px;
    `;

    // Create two containers
    const containerNormal = document.createElement('div');
    containerNormal.style.cssText = `
      border: 2px dashed var(--instrument-frame-tertiary-color);
      padding: 16px;
      resize: both;
      overflow: auto;
      min-width: 100px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
    `;

    const containerFixed = document.createElement('div');
    containerFixed.style.cssText = `
      border: 2px dashed var(--instrument-enhanced-primary-color);
      padding: 16px;
      resize: both;
      overflow: auto;
      min-width: 100px;
      min-height: 200px;
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
    const barNormal = document.createElement('obc-bar-vertical');
    barNormal.minValue = -20;
    barNormal.maxValue = 120;
    barNormal.height = 320;
    barNormal.hasBar = true;
    barNormal.hasScale = true;
    barNormal.labels = true;
    barNormal.value = 60;
    barNormal.setpoint = 80;
    barNormal.fillMode = FillMode.fill;
    barNormal.enhanced = false;
    barNormal.primaryTickbarsInterval = 20;
    barNormal.fixedAspectRatio = false;
    barNormal.style.cssText = 'flex: 1; width: 100%;';

    // Make barNormal responsive to container height changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerHeight = entry.contentRect.height;
        const labelHeight = labelNormal.offsetHeight;
        const padding = 32; // 16px top + 16px bottom from container padding
        const availableHeight = containerHeight - labelHeight - padding;
        if (availableHeight > 0) {
          barNormal.height = availableHeight;
        }
      }
    });
    resizeObserver.observe(containerNormal);

    // Fixed aspect ratio bar (scales as vector)
    const barFixed = document.createElement('obc-bar-vertical');
    barFixed.minValue = -20;
    barFixed.maxValue = 120;
    barFixed.height = 320;
    barFixed.hasBar = true;
    barFixed.hasScale = true;
    barFixed.labels = true;
    barFixed.value = 60;
    barFixed.setpoint = 80;
    barFixed.fillMode = FillMode.fill;
    barFixed.enhanced = true;
    barFixed.primaryTickbarsInterval = 20;
    barFixed.fixedAspectRatio = true;
    barFixed.style.cssText = 'flex: 1; width: 100%;';

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
 * Demonstrates `fixedAspectRatio=true` with a bar attached to a chart's edge.
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
      position: relative;
      width: 100%;
      height: calc(100% - 30px);
      background: var(--instrument-frame-primary-color);
      border: 1px solid var(--instrument-frame-tertiary-color);
      display: flex;
      justify-content: flex-end;
    `;

    // Container for the bar that ResizeObserver will watch
    const barContainer = document.createElement('div');
    barContainer.style.cssText = `
      height: 100%;
      width: 200px;
      display: flex;
      resize: horizontal;
      overflow: auto;
      min-width: 50px;
      max-width: 400px;
    `;

    const bar = document.createElement('obc-bar-vertical');
    bar.minValue = 0;
    bar.maxValue = 100;
    bar.height = 320;
    bar.hasBar = true;
    bar.hasScale = true;
    bar.labels = true;
    bar.value = 65;
    bar.setpoint = 50;
    bar.fillMode = FillMode.fill;
    bar.enhanced = true;
    bar.primaryTickbarsInterval = 10;
    bar.fixedAspectRatio = true;
    bar.side = VerticalSide.right;
    bar.style.cssText = `
      height: 100%;
      width: 100%;
      pointer-events: none;
    `;

    barContainer.appendChild(bar);
    chartArea.appendChild(barContainer);
    outerWrapper.appendChild(label);
    outerWrapper.appendChild(chartArea);

    return outerWrapper;
  },
};
