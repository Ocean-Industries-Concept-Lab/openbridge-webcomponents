import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './bar-vertical.js';
import '../../bars-graphs/area-graph/area-graph.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';

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
  argTypes: {
    minValue: {
      control: {type: 'range', min: -100, max: 100},
      description: 'Minimum scale value (manual mode)',
    },
    maxValue: {
      control: {type: 'range', min: 0, max: 1000},
      description: 'Maximum scale value (manual mode)',
    },
    fixedHeight: {
      control: {type: 'range', min: 0, max: 512},
      description: 'Bar height in pixels (manual mode)',
    },
    barWidth: {
      control: {type: 'range', min: 8, max: 48},
      description: 'Bar/fill area width in pixels (configurable)',
    },
    hasScale: {
      control: {type: 'boolean'},
      description: 'Show scale tickmarks',
    },
    hasMainTickbars: {
      control: {type: 'boolean'},
      description: 'Show first/last tickmarks at min/max values',
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
      description:
        'Scale display mode: regular (all ticks) or condensed (hide secondary, shorter ticks)',
    },
    scaleStyle: {
      control: {type: 'radio'},
      options: ['regular', 'flat'],
      description:
        'Scale style mode: regular (4px gap for all) or flat (main tickmarks touch edge)',
    },
    hasLabels: {
      control: {type: 'boolean'},
      description: 'Show numerical value labels at primary tickmarks',
    },
    hasBar: {
      control: {type: 'boolean'},
      description: 'Show bar',
    },
    enhanced: {
      control: {type: 'boolean'},
      description:
        'Enhanced visual mode: when true, uses enhanced instrument colors for bar fill and setpoint',
    },
    fillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
      description:
        'Fill visualization mode: fill (0 to value) or tint (fillMin to fillMax with marker line at value)',
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
    position: {
      control: {type: 'radio'},
      options: ['left', 'right'],
      description: 'Side positioning: affects layout order',
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
    fixedHeight: 320,
    barWidth: 24,
    hasScale: true,
    hasMainTickbars: true,
    hasPrimaryTickbars: true,
    hasSecondaryTickbars: true,
    hasTertiaryTickbars: true,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: undefined,
    scaleType: 'regular',
    scaleStyle: 'regular',
    hasLabels: true,
    hasBar: false,
    enhanced: false,
    fillMode: 'fill',
    fillMin: undefined,
    fillMax: undefined,
    value: undefined,
    setpoint: undefined,
    hasSetpoint: true,
    atSetpoint: false,
    disableAutoAtSetpoint: false,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: 'inCommand',
    position: 'right',
    advicePosition: 'inner',
    hasAdvice: true,
    advice: [],
  },
  render: (args) => html`
    <obc-bar-vertical
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .fixedHeight=${args.fixedHeight}
      .barWidth=${args.barWidth}
      .hasScale=${args.hasScale}
      .hasMainTickbars=${args.hasMainTickbars}
      .hasPrimaryTickbars=${args.hasPrimaryTickbars}
      .hasSecondaryTickbars=${args.hasSecondaryTickbars}
      .hasTertiaryTickbars=${args.hasTertiaryTickbars}
      .primaryTickbarsInterval=${args.primaryTickbarsInterval}
      .secondaryTickbarsInterval=${args.secondaryTickbarsInterval}
      .tertiaryTickbarsInterval=${args.tertiaryTickbarsInterval}
      .scaleType=${args.scaleType}
      .scaleStyle=${args.scaleStyle}
      .hasLabels=${args.hasLabels}
      .hasBar=${args.hasBar}
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
      .position=${args.position}
      .advicePosition=${args.advicePosition}
      .hasAdvice=${args.hasAdvice}
      .advice=${args.advice}
    >
    </obc-bar-vertical>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const BasicRight: Story = {
  name: 'Basic (right side, with labels)',
  args: {
    minValue: 0,
    maxValue: 100,
    fixedHeight: 320,
    position: 'right',
    hasLabels: true,
    tertiaryTickbarsInterval: 2,
    hasBar: true,
    setpoint: 50,
    value: 40,
    hasAdvice: true,
    advice: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
};

export const ComponentSizeComparison: Story = {
  name: 'Component size comparison (regular/medium/large/xl)',
  tags: ['!snapshot'],
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
            fixedHeight="320"
            position="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            hasBar
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
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
            fixedHeight="320"
            position="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            hasBar
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
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
            fixedHeight="320"
            position="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            hasBar
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-bar-vertical>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Extra Large
        </div>
        <div class="obc-component-size-xl">
          <obc-bar-vertical
            minValue="0"
            maxValue="100"
            fixedHeight="320"
            position="right"
            hasLabels
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            hasBar
            setpoint="50"
            value="40"
            hasAdvice
            .advice=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-bar-vertical>
        </div>
      </div>
    </div>
  `,
};

export const BasicLeft: Story = {
  name: 'Basic (left side, with labels)',
  tags: ['!snapshot'],
  args: {
    minValue: 0,
    maxValue: 100,
    fixedHeight: 320,
    position: 'left',
    hasLabels: true,
  },
};

export const WithBarRight: Story = {
  name: 'With bar (right side)',
  tags: ['!snapshot'],
  args: {
    minValue: 0,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
    hasLabels: true,
  },
};

export const WithBarLeft: Story = {
  name: 'With bar (left side)',
  tags: ['!snapshot'],
  args: {
    minValue: 0,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
    hasLabels: true,
    position: 'left',
  },
};

export const NegativeRange: Story = {
  name: 'Negative range (-100 to 100)',
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    hasLabels: true,
  },
};

export const SmallRange: Story = {
  name: 'Small range (0 to 10)',
  tags: ['!snapshot'],
  args: {
    minValue: 0,
    maxValue: 10,
    fixedHeight: 320,
    primaryTickbarsInterval: 2,
    secondaryTickbarsInterval: 1,
    hasLabels: true,
  },
};

// export const WithSetpointAtZero: Story = {
//   name: 'With setpoint at zero (within deadband)',
//   args: {
//     minValue: -100,
//     maxValue: 100,
//     fixedHeight: 320,
//     setpoint: 0.3,
//     hasSetpoint: true,
//     setpointAtZeroDeadband: 0.5,
//     hasBar: true,
//     enhanced: true,
//     primaryTickbarsInterval: 50,
//     secondaryTickbarsInterval: 10,
//     hasLabels: true,
//   },
// };

export const WithBarFillRight: Story = {
  name: 'With bar fill (from zero to value, right side)',
  tags: ['!snapshot'],
  args: {
    minValue: 0,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
    hasLabels: true,
    enhanced: true,
    value: 65,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
  },
};

export const WithBarFillLeft: Story = {
  name: 'With bar fill (from zero to value, left side)',
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
    hasLabels: true,
    enhanced: false,
    value: 45,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    position: 'left',
  },
};

export const FillModeComparison: Story = {
  name: 'Fill mode comparison (fill vs tint)',
  tags: ['!snapshot'],
  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Fill Mode (0 to value)
        </div>
        <obc-bar-vertical
          minValue="0"
          maxValue="100"
          fixedHeight="320"
          hasBar
          enhanced
          fillMode="fill"
          value="65"
          setpoint="70"
          hasSetpoint
          hasLabels
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode (fillMin to fillMax, marker at value)
        </div>
        <obc-bar-vertical
          minValue="0"
          maxValue="100"
          fixedHeight="320"
          hasBar
          enhanced
          fillMode="tint"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          hasSetpoint
          hasLabels
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode (defaults: 0 to value)
        </div>
        <obc-bar-vertical
          minValue="0"
          maxValue="100"
          fixedHeight="320"
          hasBar
          enhanced
          fillMode="tint"
          value="65"
          setpoint="70"
          hasSetpoint
          hasLabels
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint mode with advice overlays',
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 370,
    hasLabels: true,
    hasBar: true,
    enhanced: true,
    fillMode: 'tint',
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 30,
    hasAdvice: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advicePosition: 'center',
    advice: [
      {min: 40, max: 60, type: AdviceType.caution, hinted: true},
      {min: -60, max: -40, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const WithAdviceInner: Story = {
  name: 'With advice overlays (inner positioning)',
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 370,
    hasLabels: true,
    hasBar: true,
    hasAdvice: true,
    value: 10, // Current bar fill value
    setpoint: 10, // Setpoint marker (value equals setpoint, so atSetpoint will be true)
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: 2,
    advicePosition: 'inner',
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
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 370,
    hasLabels: true,
    hasBar: true,
    hasAdvice: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advicePosition: 'outer',
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
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 370,
    hasLabels: true,
    hasBar: true,
    hasAdvice: true,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advicePosition: 'center',
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
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
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
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
    hasLabels: true,
    enhanced: true,
    value: 30, // Current value
    setpoint: 70, // Setpoint marker at different position
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const SetpointStateComparison: Story = {
  name: 'Setpoint state comparison (inCommand/active/loading/off)',
  tags: ['!snapshot'],
  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          inCommand (at setpoint)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          fixedHeight="320"
          hasBar
          enhanced
          value="50"
          setpoint="50"
          hasSetpoint
          hasLabels
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          active (away from setpoint)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          fixedHeight="320"
          hasBar
          enhanced
          value="30"
          setpoint="70"
          hasSetpoint
          hasLabels
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
          fixedHeight="320"
          hasBar
          enhanced
          value="-20"
          setpoint="40"
          hasSetpoint
          hasLabels
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
          fixedHeight="320"
          hasBar
          enhanced
          value="60"
          setpoint="-30"
          hasSetpoint
          hasLabels
          state="off"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

// Test Scenario Stories
export const TestScenario1_AutoAtSetpoint: Story = {
  name: 'Test: Auto at-setpoint detection',
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
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
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
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
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
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
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
    hasLabels: true,
    enhanced: true,
    value: 0,
    setpoint: 0.3, // Close to zero (should snap)
    setpointAtZeroDeadband: 0.5, // Try changing to 0.1 (no snap) or 1.0 (wider snap)
    state: 'inCommand',
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const TestScenario6_DynamicValueTracking: Story = {
  name: 'Test: Dynamic value tracking (simulate manual control)',
  tags: ['!snapshot'],
  args: {
    minValue: -100,
    maxValue: 100,
    fixedHeight: 320,
    hasBar: true,
    hasLabels: true,
    enhanced: true,
    value: 50, // Start at 50
    setpoint: 70, // Target is 70,
    disableAutoAtSetpoint: false,
    autoAtSetpointDeadband: 2, // 2-unit deadband
    state: 'active', // Active state (operational mode)
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const EnhancedModeComparison: Story = {
  name: 'Enhanced mode comparison (regular vs enhanced)',
  tags: ['!snapshot'],
  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular (right)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          fixedHeight="320"
          hasBar
          value="35"
          setpoint="50"
          hasSetpoint
          hasLabels
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          position="right"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Enhanced (right)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          fixedHeight="320"
          hasBar
          enhanced
          value="60"
          setpoint="50"
          hasSetpoint
          hasLabels
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          position="right"
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Enhanced (left)
        </div>
        <obc-bar-vertical
          minValue="-100"
          maxValue="100"
          fixedHeight="320"
          hasBar
          enhanced
          value="-45"
          setpoint="-30"
          hasSetpoint
          hasLabels
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
          position="left"
        ></obc-bar-vertical>
      </div>
    </div>
  `,
};

export const ScaleTypeComparison: Story = {
  name: 'Scale type comparison (regular vs condensed)',
  tags: ['!snapshot'],
  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular (all ticks)
        </div>
        <obc-bar-vertical
          .minValue=${0}
          .maxValue=${100}
          .fixedHeight=${320}
          .scaleType=${'regular'}
          .hasLabels=${true}
          .primaryTickbarsInterval=${20}
          .secondaryTickbarsInterval=${10}
          .tertiaryTickbarsInterval=${2}
          .hasBar=${true}
        ></obc-bar-vertical>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Condensed (secondary/tertiary hidden)
        </div>
        <obc-bar-vertical
          .minValue=${0}
          .maxValue=${100}
          .fixedHeight=${320}
          .scaleType=${'condensed'}
          .hasLabels=${true}
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
  name: 'Chart integration (right axis overlay)',
  tags: ['!snapshot'],
  render: (_args) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '20px';

    // Info panel at the top
    const infoPanel = document.createElement('div');
    infoPanel.style.padding = '16px';
    infoPanel.style.background = '#1a1a1a';
    infoPanel.style.border = '1px solid #333';
    infoPanel.style.borderRadius = '4px';
    infoPanel.style.fontFamily = 'monospace';
    infoPanel.style.fontSize = '12px';
    infoPanel.style.color = '#ccc';
    infoPanel.innerHTML =
      '<p style="margin: 0 0 8px 0; font-weight: bold;">📊 Bar Vertical Sync (updates on data/resize):</p>';

    const scaleInfoList = document.createElement('ul');
    scaleInfoList.style.margin = '0';
    scaleInfoList.style.padding = '0 0 0 20px';
    scaleInfoList.style.listStyle = 'none';
    infoPanel.appendChild(scaleInfoList);

    // Chart wrapper with bar overlay
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '480px';

    // Create chart
    const chart = document.createElement('obc-area-graph');
    chart.data = SAMPLE_DATA;
    chart.showTickMarks = false; // Hide Chart.js built-in axis
    chart.fixedHeight = 320;
    chart.fillMode = 'semitransparent';
    chart.yStepSize = 2; // Force 2-unit intervals
    chart.yTicksLimit = 6;
    // chart.showTickMarks = true;

    // Create vertical bar overlay
    const bar = document.createElement('obc-bar-vertical');
    bar.hasLabels = true;
    bar.scaleStyle = 'flat';
    bar.tertiaryTickbarsInterval = 0.125; // Use 0.5 to show between primary (2) and secondary (1)
    bar.position = 'right';
    bar.style.position = 'absolute';
    bar.style.pointerEvents = 'none';
    bar.hasAdvice = true;
    bar.setpoint = 5.5;
    bar.advicePosition = 'inner';
    bar.advice = [
      {min: 5, max: 6, type: AdviceType.caution, hinted: true},
      {min: 4, max: 5, type: AdviceType.advice, hinted: true},
    ];

    // Sync bar with chart scales
    chart.addEventListener('scales-updated', (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      bar.scaleInfo = detail;

      // Position bar at chart's right edge (canvas width - right padding)
      const baselineX = detail.canvas.width - detail.padding.right;
      bar.style.left = `${baselineX}px`;
      bar.style.top = '0';
      bar.style.height = `${detail.canvas.height}px`;

      // Update info panel
      const {y, padding, canvas, config} = detail;
      scaleInfoList.innerHTML = `
        <li>• <strong>Y-axis:</strong> ${y.min.toFixed(1)} → ${y.max.toFixed(1)} [${y.top}px → ${y.bottom}px]</li>
        <li>• <strong>Canvas:</strong> ${canvas.width}px × ${canvas.height}px</li>
        <li>• <strong>Padding:</strong> T:${padding.top} R:${padding.right} B:${padding.bottom} L:${padding.left}</li>
        <li>• <strong>Bar total height:</strong> ${bar.computedHeight}px (matches canvas.height)</li>
        <li>• <strong>Bar chart area:</strong> ${y.bottom - y.top}px (matches y-axis range)</li>
        <li>• <strong>Config:</strong> yTicks:${config.yTicksLimit ?? 'auto'} yStep:${config.yStepSize ?? 'auto'}</li>
        <li>• <strong>Tertiary interval:</strong> ${bar.tertiaryTickbarsInterval ?? 'undefined'}</li>
      `;
    });

    wrapper.appendChild(chart);
    wrapper.appendChild(bar);
    container.appendChild(infoPanel);
    container.appendChild(wrapper);

    return container;
  },
};

export const ChartIntegrationLeft: Story = {
  name: 'Chart integration (left axis overlay)',
  tags: ['!snapshot'],
  render: (_args) => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '480px';

    // Create chart
    const chart = document.createElement('obc-area-graph');
    chart.data = SAMPLE_DATA;
    chart.showTickMarks = false; // Hide Chart.js built-in axis
    chart.fixedHeight = 320;
    chart.fillMode = 'semitransparent';
    chart.yAxisPosition = 'left';
    chart.yStepSize = 2;
    chart.yTicksLimit = 6;

    // Create vertical bar overlay
    const bar = document.createElement('obc-bar-vertical');
    bar.hasLabels = true;
    bar.position = 'left';
    bar.style.position = 'absolute';
    bar.style.pointerEvents = 'none';

    bar.tertiaryTickbarsInterval = 0.125;
    bar.hasAdvice = true;
    bar.setpoint = 5.5;
    bar.advicePosition = 'inner';
    bar.advice = [
      {min: 5, max: 6, type: AdviceType.caution, hinted: true},
      {min: 4, max: 5, type: AdviceType.advice, hinted: true},
    ];

    // Sync bar with chart scales
    chart.addEventListener('scales-updated', (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      bar.scaleInfo = detail;

      // Position bar so its right edge (baseline) aligns with chart's left edge
      // Bar extends left from this point
      bar.style.right = `${detail.canvas.width - detail.padding.left}px`;
      bar.style.top = '0';
      bar.style.height = `${detail.canvas.height}px`;
    });

    wrapper.appendChild(chart);
    wrapper.appendChild(bar);

    return wrapper;
  },
};

export const ChartIntegrationBothSides: Story = {
  name: 'Chart integration (both left and right axes)',
  tags: ['!snapshot'],
  render: (_args) => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '480px';

    // Create chart
    const chart = document.createElement('obc-area-graph');
    chart.data = SAMPLE_DATA;
    chart.showTickMarks = false; // Hide Chart.js built-in axis
    chart.fixedHeight = 320;
    chart.fillMode = 'semitransparent';
    chart.yStepSize = 2;
    chart.yTicksLimit = 6;

    // Create left bar overlay
    const leftBar = document.createElement('obc-bar-vertical');
    leftBar.hasLabels = true;
    leftBar.position = 'left';
    leftBar.style.position = 'absolute';
    leftBar.style.pointerEvents = 'none';
    leftBar.tertiaryTickbarsInterval = 0.125;

    // Create right bar overlay
    const rightBar = document.createElement('obc-bar-vertical');
    rightBar.hasLabels = true;
    rightBar.position = 'right';
    rightBar.style.position = 'absolute';
    rightBar.style.pointerEvents = 'none';
    rightBar.tertiaryTickbarsInterval = 0.125;

    // Sync both bars with chart scales
    chart.addEventListener('scales-updated', (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      leftBar.scaleInfo = detail;
      rightBar.scaleInfo = detail;

      // Position bars at chart edges (padding boundaries)
      // Left bar: right edge at left padding boundary (extends left)
      leftBar.style.right = `${detail.canvas.width - detail.padding.left}px`;
      leftBar.style.top = '0';
      leftBar.style.height = `${detail.canvas.height}px`;

      // Right bar: left edge at right padding boundary (extends right)
      rightBar.style.left = `${detail.canvas.width - detail.padding.right}px`;
      rightBar.style.top = '0';
      rightBar.style.height = `${detail.canvas.height}px`;
    });

    wrapper.appendChild(chart);
    wrapper.appendChild(leftBar);
    wrapper.appendChild(rightBar);

    return wrapper;
  },
};

export const ChartIntegrationWithFillRanges: Story = {
  name: 'Chart integration with advice overlays (inner positioning)',
  tags: ['!snapshot'],
  render: (_args) => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '480px';

    // Create chart
    const chart = document.createElement('obc-area-graph');
    chart.data = SAMPLE_DATA;
    chart.showTickMarks = false;
    chart.fixedHeight = 320;
    chart.fillMode = 'threshold';
    chart.yStepSize = 2;
    chart.yTicksLimit = 6;

    // Create vertical bar overlay with advice overlays
    const bar = document.createElement('obc-bar-vertical');
    bar.hasLabels = true;
    bar.position = 'right';
    bar.hasBar = true;
    bar.advicePosition = 'center';
    bar.setpoint = 5; // Dynamic advice state based on setpoint position
    bar.advice = [
      {min: 6, max: 7, type: AdviceType.caution, hinted: true},
      {min: 4.5, max: 5.5, type: AdviceType.advice, hinted: false},
      {min: 3, max: 4, type: AdviceType.caution, hinted: true},
    ];
    bar.style.position = 'absolute';
    bar.style.pointerEvents = 'none';

    // Sync bar with chart scales
    chart.addEventListener('scales-updated', (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      bar.scaleInfo = detail;

      // Position bar at chart's right edge (canvas width - right padding)
      const baselineX = detail.canvas.width - detail.padding.right;
      bar.style.left = `${baselineX}px`;
      bar.style.top = '0';
      bar.style.height = `${detail.canvas.height}px`;
    });

    wrapper.appendChild(chart);
    wrapper.appendChild(bar);

    return wrapper;
  },
};

export const ChartIntegrationRealtime: Story = {
  name: 'Chart integration with realtime data (shifting)',
  tags: ['!snapshot'],
  render: (_args) => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '480px';

    // Create chart
    const chart = document.createElement('obc-area-graph');
    chart.showTickMarks = false;
    chart.fixedHeight = 320;
    chart.fillMode = 'semitransparent';
    chart.xAxisType = 'time';
    chart.timeDisplay = 'minutes';
    chart.yStepSize = 2;

    // Initialize with past time-based data (spread over the last N minutes)
    const minuteMs = 60 * 1000;
    const windowMinutes = SAMPLE_DATA.length; // 12 minutes window
    let currentTime = Date.now();

    // Use exact values from SAMPLE_DATA to keep y-axis stable
    let valueIndex = 0;
    let dataPoints = SAMPLE_DATA.map((p, i) => ({
      x: currentTime - (windowMinutes - 1 - i) * minuteMs,
      y: p.value,
    }));

    chart.datasets = [{label: 'Realtime', data: dataPoints}];

    // Create vertical bar overlay
    const bar = document.createElement('obc-bar-vertical');
    bar.hasLabels = true;
    bar.position = 'right';
    bar.style.position = 'absolute';
    bar.style.pointerEvents = 'none';

    // Sync bar with chart scales (will update automatically on data change)
    chart.addEventListener('scales-updated', (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      bar.scaleInfo = detail;

      // Position bar at chart's right edge (canvas width - right padding)
      const baselineX = detail.canvas.width - detail.padding.right;
      bar.style.left = `${baselineX}px`;
      bar.style.top = '0';
      bar.style.height = `${detail.canvas.height}px`;
    });

    const interval = setInterval(() => {
      // Cycle through SAMPLE_DATA values to keep y-axis stable
      valueIndex = (valueIndex + 1) % SAMPLE_DATA.length;
      const newValue = SAMPLE_DATA[valueIndex].value;

      // Advance time by 1 minute to maintain consistent spacing
      currentTime += minuteMs;

      // Add new point and shift window
      dataPoints = [...dataPoints.slice(1), {x: currentTime, y: newValue}];
      chart.datasets = [{label: 'Realtime', data: dataPoints}];
    }, 2000);

    // Clean up interval when element is removed
    const mo = new MutationObserver(() => {
      if (!document.body.contains(chart)) {
        clearInterval(interval);
        mo.disconnect();
      }
    });
    mo.observe(document.body, {childList: true, subtree: true});

    wrapper.appendChild(chart);
    wrapper.appendChild(bar);

    return wrapper;
  },
};
