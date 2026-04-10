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
  ExternalScaleSide,
  BorderRadiusPosition,
  InstrumentState,
} from './bar-vertical.js';
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
  title: 'Bars and Graphs/Bar Vertical',
  tags: ['autodocs', '6.0'],
  component: 'obc-bar-vertical',
  argTypes: {
    minValue: {control: {type: 'range', min: -100, max: 100}},
    maxValue: {control: {type: 'range', min: 0, max: 1000}},
    height: {control: {type: 'range', min: 0, max: 512}},
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
    side: {control: {type: 'radio'}, options: ['left', 'right']},
    advicePosition: {
      control: {type: 'select'},
      options: ['center', 'inner', 'outer'],
    },
    advices: {control: {type: 'object'}},
  },
  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
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
    side: ExternalScaleSide.right,
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
    side: ExternalScaleSide.right,
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
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular
        </div>
        <div class="obc-component-size-regular">
          <obc-bar-vertical
            minValue="0"
            maxValue="100"
            height="520"
            side="right"
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
            hasBar
            setpoint="50"
            value="20"
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
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
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
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
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
            primaryTickmarkInterval="20"
            secondaryTickmarkInterval="10"
            tertiaryTickmarkInterval="2"
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
    side: ExternalScaleSide.left,
  },
};

export const WithBarRight: Story = {
  name: 'With Bar (right side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasBar: true,
  },
};

export const WithBarLeft: Story = {
  name: 'With Bar (left side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasBar: true,
    side: ExternalScaleSide.left,
  },
};

export const NegativeRange: Story = {
  name: 'Negative Range (-100 to 100)',

  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const SmallRange: Story = {
  name: 'Small Range (0 to 10)',

  args: {
    minValue: 0,
    maxValue: 10,
    height: 320,
    primaryTickmarkInterval: 2,
    secondaryTickmarkInterval: 1,
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
//     priority: Priority.enhanced,
//     primaryTickmarkInterval: 50,
//     secondaryTickmarkInterval: 10,
//     labels: true,
//   },
// };

export const WithBarFillRight: Story = {
  name: 'With Bar Fill (right side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasBar: true,
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
    height: 320,
    hasBar: true,
    priority: Priority.regular,
    value: 45,
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    side: ExternalScaleSide.left,
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
        <obc-bar-vertical
          minValue="0"
          maxValue="100"
          height="320"
          hasBar
          priority="enhanced"
          fillMode="${FillMode.fill}"
          fillMin="0"
          fillMax="65"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
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
          priority="enhanced"
          fillMode="${FillMode.tint}"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
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
          priority="enhanced"
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          primaryTickmarkInterval="20"
          secondaryTickmarkInterval="10"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint Mode With Advice Overlays',

  args: {
    minValue: -100,
    maxValue: 100,
    height: 370,
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
    height: 370,
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
    height: 370,
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
    height: 370,
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
    height: 320,
    hasBar: true,
    priority: Priority.enhanced,
    value: 50, // Current value
    setpoint: 50, // Setpoint marker at same position
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const WithSetpointAwayFromValue: Story = {
  name: 'With Setpoint (value away from setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
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
          <obc-bar-vertical
            minValue="-100"
            maxValue="100"
            height="320"
            hasBar
            priority="regular"
            value="30"
            setpoint="50"
            state="active"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-vertical>
        </div>
        <div style="text-align: center;">
          <obc-bar-vertical
            minValue="-100"
            maxValue="100"
            height="320"
            hasBar
            priority="enhanced"
            value="30"
            setpoint="50"
            state="active"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-vertical>
        </div>
      </div>

      <!-- loading row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div style="font-size: 12px; color: #888;">loading</div>
        <div style="text-align: center;">
          <obc-bar-vertical
            minValue="-100"
            maxValue="100"
            height="320"
            hasBar
            priority="regular"
            value="30"
            setpoint="50"
            state="loading"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-vertical>
        </div>
        <div style="text-align: center;">
          <obc-bar-vertical
            minValue="-100"
            maxValue="100"
            height="320"
            hasBar
            priority="enhanced"
            value="30"
            setpoint="50"
            state="loading"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-vertical>
        </div>
      </div>

      <!-- off row -->
      <div
        style="display: grid; grid-template-columns: 80px repeat(2, 1fr); gap: 16px; align-items: center;"
      >
        <div style="font-size: 12px; color: #888;">off</div>
        <div style="text-align: center;">
          <obc-bar-vertical
            minValue="-100"
            maxValue="100"
            height="320"
            hasBar
            priority="regular"
            value="30"
            setpoint="50"
            state="off"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-vertical>
        </div>
        <div style="text-align: center;">
          <obc-bar-vertical
            minValue="-100"
            maxValue="100"
            height="320"
            hasBar
            priority="enhanced"
            value="30"
            setpoint="50"
            state="off"
            primaryTickmarkInterval="50"
            secondaryTickmarkInterval="10"
          ></obc-bar-vertical>
        </div>
      </div>
    </div>
  `,
};

export const VerticalRightScaleBackground: Story = {
  name: 'With Scale Background (Gauge style, right side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    side: ExternalScaleSide.right,
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

// Test Scenario Stories
export const TestScenario1_AutoAtSetpoint: Story = {
  name: 'Test: Auto At-Setpoint Detection',

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
    priority: Priority.enhanced,
    value: 50, // Start at setpoint
    setpoint: 50,
    autoAtSetpoint: true, // Auto mode
    autoAtSetpointDeadband: 1, // 1-unit tolerance
    state: 'active',
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const TestScenario2_ManualAtSetpoint: Story = {
  name: 'Test: Manual At-Setpoint Control',

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

- Set \`autoAtSetpoint={false}\` to disable automatic calculation (manual mode)
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
- Set \`autoAtSetpoint={true}\` → Switch back to auto mode (marker immediately reflects actual distance)`,
      },
    },
  },
  args: {
    minValue: -100,
    maxValue: 100,
    height: 320,
    hasBar: true,
    priority: Priority.enhanced,
    value: 30, // Value at 30
    setpoint: 70, // Setpoint at 70 (far apart)
    autoAtSetpoint: false, // Manual mode
    atSetpoint: false, // Manually set to false (try toggling to true!)
    state: 'active',
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const TestScenario3_DeadbandTuning: Story = {
  name: 'Test: Deadband Tuning',

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
    priority: Priority.enhanced,
    value: 45, // 5 units away from setpoint
    setpoint: 50,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1, // Try changing to 10 (at setpoint) or 0.1 (away)
    state: 'active',
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
  },
};

export const TestScenario5_ZeroSnapBehavior: Story = {
  name: 'Test: Zero Snap Behavior',

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
    priority: Priority.enhanced,
    value: 0,
    setpoint: 0.3, // Close to zero (should snap)
    setpointAtZeroDeadband: 0.5, // Try changing to 0.1 (no snap) or 1.0 (wider snap)
    state: 'active',
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    fillMax: 0,
  },
};

export const EnhancedModeComparison: Story = {
  name: 'Enhanced Mode Comparison (regular vs enhanced)',

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
          primaryTickmarkInterval="50"
          secondaryTickmarkInterval="10"
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
          priority="enhanced"
          value="60"
          setpoint="50"
          primaryTickmarkInterval="50"
          secondaryTickmarkInterval="10"
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
          priority="enhanced"
          value="-45"
          setpoint="-30"
          primaryTickmarkInterval="50"
          secondaryTickmarkInterval="10"
          side="left"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const ScaleTypeComparison: Story = {
  name: 'Scale Type Comparison (regular vs condensed)',

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
          .primaryTickmarkInterval=${20}
          .secondaryTickmarkInterval=${10}
          .tertiaryTickmarkInterval=${2}
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
          .primaryTickmarkInterval=${20}
          .secondaryTickmarkInterval=${10}
          .tertiaryTickmarkInterval=${2}
          .hasBar=${true}
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Condensed (scaleBackground)
        </div>
        <obc-bar-vertical
          .minValue=${0}
          .maxValue=${100}
          .height=${320}
          .scaleType=${'condensed'}
          .primaryTickmarkInterval=${20}
          .secondaryTickmarkInterval=${10}
          .tertiaryTickmarkInterval=${2}
          .hasBar=${true}
          .scaleBackground=${true}
          .borderRadiusPosition=${BorderRadiusPosition.innerFirstChild}
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const ChartIntegrationRight: Story = {
  name: 'Chart Integration (as external right axis)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    // External scale controls (vertical/right)
    vScaleHasBar: {control: 'boolean', description: 'Vertical scale: show bar'},
    vScaleShowLabels: {
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
    vScaleShowLabels: true,
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
        .side=${ExternalScaleSide.right}
        .hasScale=${true}
        .showLabels=${_args.vScaleShowLabels}
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
        .primaryTickmarkInterval=${1}
        .secondaryTickmarkInterval=${0.5}
        .tertiaryTickmarkInterval=${0.125}
      ></obc-bar-vertical>
    </obc-line-graph>
  `,
};

export const ChartIntegrationRightBackground: Story = {
  name: 'Chart Integration (as external right axis, scaleBackground)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    // External scale controls (vertical/right)
    vScaleHasBar: {control: 'boolean', description: 'Vertical scale: show bar'},
    vScaleShowLabels: {
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
    vScaleShowLabels: true,
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
        .side=${ExternalScaleSide.right}
        .hasScale=${true}
        .showLabels=${_args.vScaleShowLabels}
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
        .primaryTickmarkInterval=${1}
        .secondaryTickmarkInterval=${0.5}
        .tertiaryTickmarkInterval=${0.125}
        .scaleBackground=${true}
      ></obc-bar-vertical>
    </obc-line-graph>
  `,
};

export const GaugeTrend: Story = {
  name: 'Chart Integration (Gauge-trend style)',
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
    priority: {
      control: 'select',
      options: Object.values(Priority),
      description: 'Use priority-based color palette for chart and scales',
    },
    // External scale controls (vertical/right)
    vScaleHasBar: {control: 'boolean', description: 'Vertical scale: show bar'},
    vScaleShowLabels: {
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
    priority: Priority.regular,
    // Vertical scale defaults
    vScaleHasBar: true,
    vScaleShowLabels: true,
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
      .priority=${_args.priority}
    >
      <obc-bar-vertical
        slot="right-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .height=${_args.height}
        .side=${ExternalScaleSide.right}
        .hasScale=${true}
        .showLabels=${_args.vScaleShowLabels}
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
        .primaryTickmarkInterval=${1}
        .secondaryTickmarkInterval=${0.5}
        .tertiaryTickmarkInterval=${0.125}
        .scaleBackground=${true}
        .fixedAspectRatio=${true}
        .priority=${_args.priority}
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
  tags: ['skip-test'],
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
    barNormal.value = 60;
    barNormal.setpoint = 80;
    barNormal.fillMode = FillMode.fill;
    barNormal.priority = Priority.regular;
    barNormal.primaryTickmarkInterval = 20;
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
    barFixed.value = 60;
    barFixed.setpoint = 80;
    barFixed.fillMode = FillMode.fill;
    barFixed.priority = Priority.enhanced;
    barFixed.primaryTickmarkInterval = 20;
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
