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

const meta: Meta = {
  title: 'Instruments/Gauge Vertical',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-vertical',
  argTypes: {
    minValue: {control: {type: 'range', min: -100, max: 100}},
    maxValue: {control: {type: 'range', min: 0, max: 1000}},
    mainTickbars: {
      control: {type: 'object'},
      table: {type: {summary: 'number[] | undefined'}},
    },
    primaryTickbarsInterval: {control: {type: 'number', min: 1}},
    secondaryTickbarsInterval: {control: {type: 'number', min: 1}},
    tertiaryTickbarsInterval: {control: {type: 'number', min: 1}},
    hideLabels: {control: {type: 'boolean'}},
    borderRadiusPosition: {
      control: {type: 'select'},
      options: Object.values(BorderRadiusPosition),
    },
    enhanced: {control: {type: 'boolean'}},
    fillMode: {control: {type: 'radio'}, options: ['fill', 'tint']},
    fillMin: {control: {type: 'number'}},
    fillMax: {control: {type: 'number'}},
    value: {control: {type: 'range', min: -100, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    atSetpoint: {control: {type: 'boolean'}},
    disableAutoAtSetpoint: {control: {type: 'boolean'}},
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
    side: 'right',
    advices: [],
  },
  render: (args) => html`
    <obc-gauge-vertical
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
      .advices=${args.advices}
    >
    </obc-gauge-vertical>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DefaultRight: Story = {
  name: 'Default (right side, labels, advice)',
  args: {
    minValue: 0,
    maxValue: 100,
    side: 'right',

    tertiaryTickbarsInterval: 2,
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
          <obc-gauge-vertical
            minValue="0"
            maxValue="100"
            side="right"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
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

export const WithBarFillRight: Story = {
  name: 'With bar fill (right side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,

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
        <obc-gauge-vertical
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
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-vertical
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
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-vertical
          minValue="0"
          maxValue="100"
          enhanced
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-gauge-vertical>
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
    advices: [
      {min: 40, max: 60, type: AdviceType.caution, hinted: true},
      {min: -60, max: -40, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const WithAdvice: Story = {
  name: 'With advice overlays',

  args: {
    minValue: -100,
    maxValue: 100,

    value: 10,
    setpoint: 10,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: 2,
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
    value: 50, // Current value
    setpoint: 50, // Setpoint marker at same position
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    fillMin: 0,
    fillMax: 50,
  },
};

export const WithSetpointAwayFromValue: Story = {
  name: 'With setpoint (value away from setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,

    enhanced: true,
    value: 30, // Current value
    setpoint: 70, // Setpoint marker at different position
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const StateComparison: Story = {
  name: 'State comparison (inCommand/active/loading/off/focus)',

  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          inCommand
        </div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          enhanced
          value="50"
          setpoint="50"
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          active
        </div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          enhanced
          value="30"
          setpoint="70"
          state="active"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          loading
        </div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          enhanced
          value="-20"
          setpoint="40"
          state="loading"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">off</div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          enhanced
          value="60"
          setpoint="-30"
          state="off"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          adjusting/touching
        </div>
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          enhanced
          value="30"
          setpoint="30"
          .newSetpoint=${70}
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-vertical>
      </div>
    </div>
  `,
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
    enhanced: true,
    value: 50, // Start at setpoint
    setpoint: 50,
    disableAutoAtSetpoint: false, // Auto mode
    autoAtSetpointDeadband: 1, // 1-unit tolerance
    state: 'inCommand',
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    fillMin: 0,
    fillMax: 50,
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
    enhanced: true,
    value: 0,
    setpoint: 0.3, // Close to zero (should snap)
    setpointAtZeroDeadband: 0.5, // Try changing to 0.1 (no snap) or 1.0 (wider snap)
    state: 'inCommand',
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    fillMax: 0,
    // mainTickbars: [0],
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
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          value="35"
          setpoint="50"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
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
          enhanced
          value="60"
          setpoint="50"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
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
          enhanced
          value="-45"
          setpoint="-30"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          side="left"
        ></obc-gauge-vertical>
      </div>
    </div>
  `,
};
