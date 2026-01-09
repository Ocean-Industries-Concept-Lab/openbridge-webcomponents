import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-horizontal.js';
import '../../bars-graphs/line-graph/line-graph.js';
import {AdviceType} from '../watch/advice.js';
import {
  FillMode,
  AdvicePosition,
  BorderRadiusPosition,
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
- \`barThickness\`: 48px
- \`borderRadius\`: 8px (matches obc-component-size-medium)
- \`scaleType\`: regular
- \`frameStyle\`: regular
- \`hasBar\`: true
- \`hasScale\`: true
- \`scaleBackground\`: true

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
    width: {
      control: {type: 'range', min: 0, max: 768},
      description: 'Total width in pixels',
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
      options: ['top', 'bottom'],
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
    width: 480,
    hasMainTickbars: true,
    mainTickbarsArray: [],
    hasPrimaryTickbars: true,
    hasSecondaryTickbars: true,
    hasTertiaryTickbars: true,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: undefined,
    hasLabels: true,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
    borderRadiusPositionExternalScales: undefined,
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
    side: 'bottom',
    advicePosition: AdvicePosition.inner,
    hasAdvice: true,
    advice: [],
  },
  render: (args) => html`
    <obc-gauge-horizontal
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .width=${args.width}
      .hasMainTickbars=${args.hasMainTickbars}
      .mainTickbarsArray=${args.mainTickbarsArray}
      .hasPrimaryTickbars=${args.hasPrimaryTickbars}
      .hasSecondaryTickbars=${args.hasSecondaryTickbars}
      .hasTertiaryTickbars=${args.hasTertiaryTickbars}
      .primaryTickbarsInterval=${args.primaryTickbarsInterval}
      .secondaryTickbarsInterval=${args.secondaryTickbarsInterval}
      .tertiaryTickbarsInterval=${args.tertiaryTickbarsInterval}
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
    width: 480,
    side: 'bottom',
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
            width="480"
            side="bottom"
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
            width="480"
            side="bottom"
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
            width="480"
            side="bottom"
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
          ></obc-gauge-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">XL</div>
        <div class="obc-component-size-xl">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            width="480"
            side="bottom"
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
    width: 480,
    side: 'top',
    hasLabels: true,
  },
};

export const WithBarBottom: Story = {
  name: 'With bar (bottom side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasLabels: true,
  },
};

export const WithBarTop: Story = {
  name: 'With bar (top side)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasLabels: true,
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
    hasLabels: true,
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
    hasLabels: true,
  },
};

export const WithBarFillBottom: Story = {
  name: 'With bar fill (bottom side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,
    width: 480,
    hasLabels: true,
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
    hasLabels: true,
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
          width="480"
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
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          width="480"
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
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          width="480"
          enhanced
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          hasSetpoint
          hasLabels
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
    width: 520,
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
    width: 520,
    hasLabels: true,
    hasAdvice: true,
    value: 10,
    setpoint: 10,
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
    width: 520,
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
    width: 520,
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
    width: 480,
    hasLabels: true,
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
    hasLabels: true,
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
          width="480"
          enhanced
          value="50"
          setpoint="50"
          hasSetpoint
          hasLabels
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
          width="480"
          enhanced
          value="30"
          setpoint="70"
          hasSetpoint
          hasLabels
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
          width="480"
          enhanced
          value="-20"
          setpoint="40"
          hasSetpoint
          hasLabels
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
          width="480"
          enhanced
          value="60"
          setpoint="-30"
          hasSetpoint
          hasLabels
          state="off"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
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
    const barNormal = document.createElement('obc-gauge-horizontal');
    barNormal.minValue = -20;
    barNormal.maxValue = 120;
    barNormal.width = 320;
    barNormal.hasLabels = true;
    barNormal.value = 60;
    barNormal.setpoint = 80;
    barNormal.hasSetpoint = true;
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
    const barFixed = document.createElement('obc-gauge-horizontal');
    barFixed.minValue = -20;
    barFixed.maxValue = 120;
    barFixed.width = 320;
    barFixed.hasLabels = true;
    barFixed.value = 60;
    barFixed.setpoint = 80;
    barFixed.hasSetpoint = true;
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
