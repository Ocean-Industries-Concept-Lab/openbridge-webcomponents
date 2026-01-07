import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-vertical.js';
import '../../bars-graphs/line-graph/line-graph.js';
import '../../bars-graphs/area-graph/area-graph.js';
import {AdviceType} from '../watch/advice.js';
import {
  ScaleType,
  FrameStyle,
  FillMode,
  AdvicePosition,
  BorderRadiusPosition,
} from './gauge-vertical.js';

const meta: Meta = {
  title: 'Instruments/Gauge Vertical',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-vertical',
  parameters: {
    docs: {
      description: {
        component: `

Vertical gauge component – the same as **obc-bar-vertical** (both extend **external-scale.ts**) but with \`hasBar=true\`, \`scaleBackground=true\`, and \`hasScale=true\` always enabled.

This is a higher fidelity implementation of the concept shown in **instrument-linear.ts**, providing a complete gauge with container, scale background, tickmarks, labels, advice overlays, and setpoint marker.

This is a thin web-component wrapper around the pure SVG building-block renderer in \`external-scale.ts\`.

It sets up the outer \`<svg>\`/\`viewBox\` for a vertical scale and delegates rendering/layout to:
- \`computeExternalScaleLayout(...)\`
- \`renderExternalScale(config)\`

For renderer documentation see: **Building Blocks/External Scale**.

For a version where \`hasBar\` and \`scaleBackground\` are user-configurable, see **Building Blocks/Bar Vertical**.`,
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
    hasMainTickbars: {
      control: {type: 'boolean'},
      description: 'Show/hide main tickbars',
    },
    mainTickbarsArray: {
      control: {type: 'object'},
      description:
        'Array of values for main tickbars. Defaults to [minValue, 0, maxValue] if empty.',
    },
    hasPrimaryTickbars: {
      control: {type: 'boolean'},
      description: 'Show primary (longest) tickmarks',
    },
    hasSecondaryTickbars: {
      control: {type: 'boolean'},
      description: 'Show secondary (medium) tickmarks',
    },
    hasTertiaryTickbars: {
      control: {type: 'boolean'},
      description: 'Show tertiary (shortest) tickmarks',
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
    hasLabels: {
      control: {type: 'boolean'},
      description: 'Show numerical value labels at primary tickmarks',
    },
    borderRadiusPosition: {
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
    hasSetpoint: {
      control: {type: 'boolean'},
      description: 'Show setpoint indicator when setpoint is provided',
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
    hasAdvice: {
      control: {type: 'boolean'},
      description: 'Show advice/alert overlays when advice array is provided',
    },
    advice: {
      control: {type: 'object'},
      description: 'Advice/alert overlays with state and positioning',
    },
  },
  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    barThickness: 24,
    hasMainTickbars: true,
    mainTickbarsArray: [],
    hasPrimaryTickbars: true,
    hasSecondaryTickbars: true,
    hasTertiaryTickbars: true,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: undefined,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    hasLabels: true,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
    enhanced: false,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: undefined,
    setpoint: undefined,
    hasSetpoint: true,
    atSetpoint: false,
    disableAutoAtSetpoint: false,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: 'inCommand',
    side: 'right',
    advicePosition: AdvicePosition.inner,
    hasAdvice: true,
    advice: [],
  },
  render: (args) => html`
    <obc-gauge-vertical
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .height=${args.height}
      .barThickness=${args.barThickness}
      .hasMainTickbars=${args.hasMainTickbars}
      .mainTickbarsArray=${args.mainTickbarsArray}
      .hasPrimaryTickbars=${args.hasPrimaryTickbars}
      .hasSecondaryTickbars=${args.hasSecondaryTickbars}
      .hasTertiaryTickbars=${args.hasTertiaryTickbars}
      .primaryTickbarsInterval=${args.primaryTickbarsInterval}
      .secondaryTickbarsInterval=${args.secondaryTickbarsInterval}
      .tertiaryTickbarsInterval=${args.tertiaryTickbarsInterval}
      .scaleType=${args.scaleType}
      .frameStyle=${args.frameStyle}
      .hasLabels=${args.hasLabels}
      .borderRadiusPosition=${args.borderRadiusPosition}
      .enhanced=${args.enhanced}
      .fillMode=${args.fillMode}
      .fillMin=${args.fillMin}
      .fillMax=${args.fillMax}
      .value=${args.value}
      .setpoint=${args.setpoint}
      .hasSetpoint=${args.hasSetpoint}
      .atSetpoint=${args.atSetpoint}
      .disableAutoAtSetpoint=${args.disableAutoAtSetpoint}
      .autoAtSetpointDeadband=${args.autoAtSetpointDeadband}
      .setpointAtZeroDeadband=${args.setpointAtZeroDeadband}
      .state=${args.state}
      .side=${args.side}
      .advicePosition=${args.advicePosition}
      .hasAdvice=${args.hasAdvice}
      .advice=${args.advice}
    >
    </obc-gauge-vertical>
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
    hasLabels: true,
    tertiaryTickbarsInterval: 2,
    setpoint: 50,
    value: 40,
    hasAdvice: true,
    advice: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
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
            height="320"
            side="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
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
            height="320"
            side="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
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
            height="320"
            side="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
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
            height="320"
            side="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
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
    height: 320,
    side: 'left',
    hasLabels: true,
  },
};

export const WithBarRight: Story = {
  name: 'With bar (right side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasLabels: true,
  },
};

export const WithBarLeft: Story = {
  name: 'With bar (left side)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasLabels: true,
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
    hasLabels: true,
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
    hasLabels: true,
  },
};

export const WithBarFillRight: Story = {
  name: 'With bar fill (right side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,
    height: 320,
    hasLabels: true,
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
    hasLabels: true,
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
          height="320"
          enhanced
          fillMode="${FillMode.fill}"
          fillMin="0"
          fillMax="65"
          value="65"
          setpoint="70"
          hasSetpoint
          hasLabels
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
          height="320"
          enhanced
          fillMode="${FillMode.tint}"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          hasSetpoint
          hasLabels
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
          height="320"
          enhanced
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          hasSetpoint
          hasLabels
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
    height: 370,
    hasLabels: true,
    enhanced: true,
    fillMode: FillMode.tint,
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 30,
    hasAdvice: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advicePosition: AdvicePosition.center,
    advice: [
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
    hasLabels: true,
    hasAdvice: true,
    value: 10, // Current bar fill value
    setpoint: 10, // Setpoint marker (value equals setpoint, so atSetpoint will be true)
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: 2,
    advicePosition: AdvicePosition.inner,
    advice: [
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
    hasLabels: true,
    hasAdvice: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advicePosition: AdvicePosition.outer,
    advice: [
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
    hasLabels: true,
    hasAdvice: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advicePosition: AdvicePosition.center,
    advice: [
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
    hasLabels: true,
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
    hasLabels: true,
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
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          enhanced
          value="50"
          setpoint="50"
          hasSetpoint
          hasLabels
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
          height="320"
          enhanced
          value="30"
          setpoint="70"
          hasSetpoint
          hasLabels
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
          height="320"
          enhanced
          value="-20"
          setpoint="40"
          hasSetpoint
          hasLabels
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
          height="320"
          enhanced
          value="60"
          setpoint="-30"
          hasSetpoint
          hasLabels
          state="off"
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
    height: 320,
    hasLabels: true,
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
    hasLabels: true,
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
    hasLabels: true,
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
    hasLabels: true,
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
        <obc-gauge-vertical
          minValue="-100"
          maxValue="100"
          height="320"
          value="35"
          setpoint="50"
          hasSetpoint
          hasLabels
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
          height="320"
          enhanced
          value="60"
          setpoint="50"
          hasSetpoint
          hasLabels
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
          height="320"
          enhanced
          value="-45"
          setpoint="-30"
          hasSetpoint
          hasLabels
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          side="left"
        ></obc-gauge-vertical>
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
        <obc-gauge-vertical
          .minValue=${0}
          .maxValue=${100}
          .height=${320}
          .scaleType=${'regular'}
          .hasLabels=${true}
          .primaryTickbarsInterval=${20}
          .secondaryTickbarsInterval=${10}
          .tertiaryTickbarsInterval=${2}
        ></obc-gauge-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Condensed
        </div>
        <obc-gauge-vertical
          .minValue=${0}
          .maxValue=${100}
          .height=${320}
          .scaleType=${'condensed'}
          .hasLabels=${true}
          .primaryTickbarsInterval=${20}
          .secondaryTickbarsInterval=${10}
          .tertiaryTickbarsInterval=${2}
        ></obc-gauge-vertical>
      </div>
    </div>
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
    const barNormal = document.createElement('obc-gauge-vertical');
    barNormal.minValue = -20;
    barNormal.maxValue = 120;
    barNormal.height = 320;
    barNormal.hasLabels = true;
    barNormal.value = 60;
    barNormal.setpoint = 80;
    barNormal.hasSetpoint = true;
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
    const barFixed = document.createElement('obc-gauge-vertical');
    barFixed.minValue = -20;
    barFixed.maxValue = 120;
    barFixed.height = 320;
    barFixed.hasLabels = true;
    barFixed.value = 60;
    barFixed.setpoint = 80;
    barFixed.hasSetpoint = true;
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
