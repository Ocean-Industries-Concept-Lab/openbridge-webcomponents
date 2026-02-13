import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-trend.js';
import {AdviceType} from '../watch/advice.js';
import {
  FillMode,
  BorderRadiusPosition,
  ScaleType,
} from '../../building-blocks/bar-vertical/bar-vertical.js';

const SAMPLE_DATA = [
  {label: '00', value: 45},
  {label: '01', value: 52},
  {label: '02', value: 48},
  {label: '03', value: 55},
  {label: '04', value: 62},
  {label: '05', value: 58},
  {label: '06', value: 52},
  {label: '07', value: 40},
  {label: '08', value: 32},
  {label: '09', value: 37},
  {label: '10', value: 55},
  {label: '11', value: 68},
  {label: '12', value: 52},
  {label: '13', value: 48},
  {label: '14', value: 42},
  {label: '15', value: 38},
  {label: '16', value: 35},
  {label: '17', value: 32},
  {label: '18', value: 28},
  {label: '19', value: 30},
  {label: '20', value: 35},
  {label: '21', value: 40},
  {label: '22', value: 45},
  {label: '23', value: 50},
  {label: '24', value: 48},
  {label: '25', value: 48},
  {label: '26', value: 38},
  {label: '27', value: 35},
  {label: '28', value: 40},
  {label: '29', value: 45},
  {label: '30', value: 50},
];

const meta: Meta = {
  title: 'Instruments/Gauge Trend',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-trend',
  decorators: [
    (story, context) =>
      html`<div style="width: ${context.args.browserContainerWidth}px">
        ${story()}
      </div>`,
  ],

  argTypes: {
    // ═══════════════════════════════════════════════════════════════════════════
    // HIDDEN INHERITED PROPERTIES (from ObcChartLineBase)
    // These are locked/internal and should not be exposed in Storybook
    // ═══════════════════════════════════════════════════════════════════════════
    legend: {table: {disable: true}},
    showDebugOverlay: {table: {disable: true}},
    showGrid: {table: {disable: true}},
    showGridX: {table: {disable: true}},
    showGridY: {table: {disable: true}},
    showTickMarks: {table: {disable: true}},
    showPoints: {table: {disable: true}},
    xAxisType: {table: {disable: true}},
    yAxisPosition: {table: {disable: true}},
    lineMode: {table: {disable: true}},
    unit: {table: {disable: true}},
    timeDisplay: {table: {disable: true}},
    fixedAspectRatioScaling: {table: {disable: true}},
    instrumentMode: {table: {disable: true}},
    borderRadius: {table: {disable: true}},
    borderRadiusPosition: {table: {disable: true}},
    borderRadiusPositionExternalScales: {table: {disable: true}},
    yAxes: {table: {disable: true}},
    labels: {table: {disable: true}},
    colors: {table: {disable: true}},
    fill: {table: {disable: true}},
    // Note: fillMode is exposed as a gauge-trend property, don't hide it
    frameStyle: {table: {disable: true}}, // not applicable to gauge-trend
    stacked: {table: {disable: true}},
    xTicksLimit: {table: {disable: true}},
    xStepSize: {table: {disable: true}},
    yTicksLimit: {table: {disable: true}},
    yStepSize: {table: {disable: true}},
    datasets: {table: {disable: true}},
    // Internal methods/properties that might show up
    _barVerticalElement: {table: {disable: true}},
    _isFirstUpdate: {table: {disable: true}},
    bottomScaleSlot: {table: {disable: true}},
    leftScaleSlot: {table: {disable: true}},
    rightScaleSlot: {table: {disable: true}},
    topScaleSlot: {table: {disable: true}},
    updateBorderRadius: {table: {disable: true}},
    handleSlotChange: {table: {disable: true}},
    handleScaleDimensionsChanged: {table: {disable: true}},
    DEFAULT_TENSION: {table: {disable: true}},
    POINT_RADIUS: {table: {disable: true}},
    chart: {table: {disable: true}},
    themeObserver: {table: {disable: true}},

    // ═══════════════════════════════════════════════════════════════════════════
    // EXPOSED PROPERTIES
    // ═══════════════════════════════════════════════════════════════════════════
    browserContainerWidth: {
      control: {type: 'range', min: 128, max: 1200, step: 2},
    },
    width: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    height: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    enhanced: {
      control: 'boolean',
    },
    minValue: {
      control: {type: 'number'},
    },
    maxValue: {
      control: {type: 'number'},
    },
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
    setpoint: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
    newSetpoint: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: 'Pending setpoint during adjustment (shows dual markers)',
    },
    hasBar: {
      control: 'boolean',
    },
    hasScale: {
      control: 'boolean',
    },
    hasAdvice: {
      control: 'boolean',
    },
    fillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    fillMin: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
    fillMax: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
    chartFill: {
      control: 'boolean',
    },
    touching: {
      control: 'boolean',
    },
  },
  args: {
    browserContainerWidth: 384,
    width: 384,
    height: 384,
    enhanced: false,
    minValue: 0,
    maxValue: 100,
    value: 50,
    setpoint: 50,
    hasBar: true,
    hasScale: true,
    hasAdvice: false,
    fillMode: 'fill',
    fillMin: 0,
    // Note: fillMax intentionally omitted - in 'fill' mode it auto-derives from value
    chartFill: true,
    touching: false,
  },
  render: (args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${args.width}
      .height=${args.height}
      .enhanced=${args.enhanced}
      .chartFill=${args.chartFill}
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .value=${args.value}
      .setpoint=${args.setpoint}
      .newSetpoint=${args.newSetpoint}
      .touching=${args.touching}
      .hasBar=${args.hasBar}
      .hasScale=${args.hasScale}
      .hasAdvice=${args.hasAdvice}
      .fillMode=${args.fillMode}
      .fillMin=${args.fillMin}
      .fillMax=${args.fillMax ?? undefined}
      .advice=${[
        {min: 25, max: 45, type: AdviceType.caution, hinted: true},
        {min: 55, max: 75, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${10}
      .secondaryInterval=${5}
      .tertiaryInterval=${1}
    >
    </obc-gauge-trend>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const GaugeTrend: Story = {
  name: 'Gauge trend (default, scaleReferenceSize=384)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  args: {
    scaleReferenceSize: 384,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .chartFill=${_args.chartFill}
      .minValue=${_args.minValue ?? 0}
      .maxValue=${_args.maxValue ?? 100}
      .value=${_args.value}
      .setpoint=${_args.setpoint}
      .newSetpoint=${_args.newSetpoint}
      .touching=${_args.touching}
      .hasBar=${_args.hasBar}
      .hasScale=${_args.hasScale}
      .hasAdvice=${_args.hasAdvice}
      .fillMode=${_args.fillMode}
      .fillMin=${_args.fillMin}
      .fillMax=${_args.fillMax}
      .advice=${[
        {min: 25, max: 45, type: AdviceType.caution, hinted: true},
        {min: 55, max: 75, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${50}
      .secondaryInterval=${5}
      .scaleReferenceSize=${_args.scaleReferenceSize}
    >
    </obc-gauge-trend>
  `,
};

export const GaugeTrendScaleReferenceSize: Story = {
  name: 'Using scaleReferenceSize=240',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  args: {
    scaleReferenceSize: 240,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .chartFill=${_args.chartFill}
      .minValue=${_args.minValue ?? 0}
      .maxValue=${_args.maxValue ?? 100}
      .value=${_args.value}
      .setpoint=${_args.setpoint}
      .newSetpoint=${_args.newSetpoint}
      .touching=${_args.touching}
      .hasBar=${_args.hasBar}
      .hasScale=${_args.hasScale}
      .hasAdvice=${_args.hasAdvice}
      .fillMode=${_args.fillMode}
      .fillMin=${_args.fillMin}
      .fillMax=${_args.fillMax}
      .advice=${[
        {min: 25, max: 45, type: AdviceType.caution, hinted: true},
        {min: 55, max: 75, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${10}
      .secondaryInterval=${5}
      .tertiaryInterval=${1}
      .scaleReferenceSize=${_args.scaleReferenceSize}
    >
    </obc-gauge-trend>
  `,
};

/**
 * This story demonstrates how `scaleReferenceSize` works with `fixedAspectRatioScaling=true`.
 *
 * Three panels showing the same gauge-trend configuration:
 * - **Left**: `scaleReferenceSize=240` at 240px container (1:1 with Figma design)
 * - **Center**: `scaleReferenceSize=240` at 384px container (scaled up 1.6×)
 * - **Right**: `scaleReferenceSize=384` at 384px container (1:1 with Figma design)
 *
 * Notice how the left and right panels show the "native" size where the design matches
 * Figma 1:1, while the center panel shows the same 240px design scaled up to fit 384px.
 */
export const ScaleReferenceSizeComparison: StoryObj = {
  name: 'Scale reference size comparison',
  tags: ['!snapshot'],
  decorators: [(story) => story()],
  args: {
    browserContainerWidth: 1200,
    value: 50,
    setpoint: 50,
  },
  render: (args) => {
    return html`
      <style>
        .scale-comparison-wrapper {
          width: 100%;
          min-width: 1100px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 24px;
          padding: 16px;
          align-items: start;
        }
        .scale-comparison-instructions {
          grid-column: 1 / -1;
          font-family: var(--font-family-main);
          font-size: 13px;
          padding: 12px;
          background: var(--container-background-color);
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .scale-comparison-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .scale-comparison-box {
          border: 2px dashed var(--instrument-frame-tertiary-color);
          padding: 0;
          box-sizing: content-box;
        }
        .scale-comparison-label {
          font-family: var(--font-family-main);
          font-size: 12px;
          color: var(--instrument-frame-tertiary-color);
          margin-bottom: 8px;
          text-align: center;
        }
        .scale-comparison-sublabel {
          font-family: var(--font-family-main);
          font-size: 11px;
          color: var(--instrument-frame-tertiary-color);
          margin-top: 8px;
          text-align: center;
          opacity: 0.7;
        }
      </style>
      <div class="scale-comparison-wrapper">
        <div class="scale-comparison-instructions">
          <strong>Scale Reference Size Comparison</strong> — All three use
          <code>fixedAspectRatioScaling=true</code>. The
          <code>scaleReferenceSize</code> defines at what container size the
          design matches Figma 1:1.
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>
              <strong>Left:</strong> scaleReferenceSize=240, container=240px →
              Scale factor 1.0 (native size)
            </li>
            <li>
              <strong>Center:</strong> scaleReferenceSize=240, container=384px →
              Scale factor 1.6 (enlarged)
            </li>
            <li>
              <strong>Right:</strong> scaleReferenceSize=384, container=384px →
              Scale factor 1.0 (native size)
            </li>
          </ul>
        </div>

        <!-- Left: scaleReferenceSize=240 at 240px (1:1) -->
        <div class="scale-comparison-container">
          <div class="scale-comparison-label">
            scaleReferenceSize=240<br />container=240px
          </div>
          <div
            class="scale-comparison-box"
            style="width: 240px; height: 240px;"
          >
            <obc-gauge-trend
              .data=${SAMPLE_DATA}
              .width=${240}
              .height=${240}
              .scaleReferenceSize=${240}
              .chartFill=${true}
              .enhanced=${false}
              .minValue=${args.minValue ?? 0}
              .maxValue=${args.maxValue ?? 100}
              .value=${args.value}
              .setpoint=${args.setpoint}
              .hasBar=${true}
              .hasScale=${true}
              .secondaryInterval=${5}
            ></obc-gauge-trend>
          </div>
          <div class="scale-comparison-sublabel">Scale factor: 1.0</div>
        </div>

        <!-- Center: scaleReferenceSize=240 at 384px (scaled up) -->
        <div class="scale-comparison-container">
          <div class="scale-comparison-label">
            scaleReferenceSize=240<br />container=384px
          </div>
          <div
            class="scale-comparison-box"
            style="width: 384px; height: 384px;"
          >
            <obc-gauge-trend
              .data=${SAMPLE_DATA}
              .width=${384}
              .height=${384}
              .scaleReferenceSize=${240}
              .chartFill=${true}
              .enhanced=${false}
              .minValue=${args.minValue ?? 0}
              .maxValue=${args.maxValue ?? 100}
              .value=${args.value}
              .setpoint=${args.setpoint}
              .hasBar=${true}
              .hasScale=${true}
              .secondaryInterval=${5}
            ></obc-gauge-trend>
          </div>
          <div class="scale-comparison-sublabel">Scale factor: 1.6</div>
        </div>

        <!-- Right: scaleReferenceSize=384 at 384px (1:1) -->
        <div class="scale-comparison-container">
          <div class="scale-comparison-label">
            scaleReferenceSize=384<br />container=384px
          </div>
          <div
            class="scale-comparison-box"
            style="width: 384px; height: 384px;"
          >
            <obc-gauge-trend
              .data=${SAMPLE_DATA}
              .width=${384}
              .height=${384}
              .scaleReferenceSize=${384}
              .chartFill=${true}
              .enhanced=${false}
              .minValue=${args.minValue ?? 0}
              .maxValue=${args.maxValue ?? 100}
              .value=${args.value}
              .setpoint=${args.setpoint}
              .hasBar=${true}
              .hasScale=${true}
              .secondaryInterval=${5}
            ></obc-gauge-trend>
          </div>
          <div class="scale-comparison-sublabel">Scale factor: 1.0</div>
        </div>
      </div>
    `;
  },
};

export const GaugeTrendWithoutScale: Story = {
  name: 'Without scale',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  args: {
    hasScale: false,
    primaryInterval: 100,
    scaleReferenceSize: 384,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .chartFill=${_args.chartFill}
      .minValue=${_args.minValue ?? 0}
      .maxValue=${_args.maxValue ?? 100}
      .value=${_args.value}
      .hasBar=${_args.hasBar}
      .hasScale=${_args.hasScale}
      .hasAdvice=${_args.hasAdvice}
      .fillMode=${_args.fillMode}
      .fillMin=${_args.fillMin}
      .fillMax=${_args.fillMax}
      .advice=${[
        {min: 25, max: 45, type: AdviceType.caution, hinted: true},
        {min: 55, max: 75, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${100}
      .secondaryInterval=${5}
      .tertiaryInterval=${1}
      .scaleReferenceSize=${_args.scaleReferenceSize}
    >
    </obc-gauge-trend>
  `,
};

export const GaugeTrendWithoutBar: Story = {
  name: 'Without bar (scale only)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  args: {
    hasBar: false,
    chartFill: false,
    primaryInterval: 50,
    scaleReferenceSize: 384,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .chartFill=${_args.chartFill}
      .minValue=${_args.minValue ?? 0}
      .maxValue=${_args.maxValue ?? 100}
      .value=${_args.value}
      .setpoint=${_args.setpoint}
      .newSetpoint=${_args.newSetpoint}
      .touching=${_args.touching}
      .hasBar=${_args.hasBar}
      .hasScale=${_args.hasScale}
      .hasAdvice=${_args.hasAdvice}
      .fillMode=${_args.fillMode}
      .fillMin=${_args.fillMin}
      .fillMax=${_args.fillMax}
      .advice=${[
        {min: 25, max: 45, type: AdviceType.caution, hinted: true},
        {min: 55, max: 75, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${50}
      .secondaryInterval=${5}
      .scaleReferenceSize=${_args.scaleReferenceSize}
    >
      <!-- Note: highlightCurrentValue is auto-derived (true when hasBar=false) -->
    </obc-gauge-trend>
  `,
};

export const GaugeTrendWithAdvice: Story = {
  name: 'With advice overlays',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  args: {
    hasAdvice: true,
    primaryInterval: 20,
    secondaryInterval: 10,
    tertiaryInterval: 2,
    scaleReferenceSize: 384,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .chartFill=${_args.chartFill}
      .minValue=${_args.minValue ?? 0}
      .maxValue=${_args.maxValue ?? 100}
      .value=${_args.value}
      .setpoint=${_args.setpoint}
      .newSetpoint=${_args.newSetpoint}
      .touching=${_args.touching}
      .hasBar=${_args.hasBar}
      .hasScale=${_args.hasScale}
      .hasAdvice=${_args.hasAdvice}
      .fillMode=${_args.fillMode}
      .fillMin=${_args.fillMin}
      .fillMax=${_args.fillMax}
      .advice=${[
        {min: 70, max: 90, type: AdviceType.caution, hinted: true},
        {min: 10, max: 30, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${20}
      .secondaryInterval=${10}
      .tertiaryInterval=${2}
      .scaleReferenceSize=${_args.scaleReferenceSize}
    >
    </obc-gauge-trend>
  `,
};

/**
 * Demonstrates a non-standard scale range (25-75) that fits the SAMPLE_DATA values (28-68).
 *
 * This story shows:
 * - Custom scale range that isn't 0-100 or -100..100
 * - Chart y-axis automatically inherits from minValue/maxValue (no chartMinValue/chartMaxValue needed)
 * - Advice overlays positioned within the custom range
 * - Tint fill mode showing a specific value range
 *
 * The SAMPLE_DATA values naturally fit within this 25-75 range, demonstrating
 * how gauge-trend can be configured for domain-specific measurements.
 */
export const GaugeTrendCustomScaleRange: Story = {
  name: 'Custom scale range (25-75)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    minValue: {
      control: {type: 'number'},
      description:
        'Scale minimum (chart y-axis inherits this when chartMinValue is undefined)',
    },
    maxValue: {
      control: {type: 'number'},
      description:
        'Scale maximum (chart y-axis inherits this when chartMaxValue is undefined)',
    },
    value: {
      control: {type: 'range', min: 25, max: 75, step: 1},
    },
    setpoint: {
      control: {type: 'range', min: 25, max: 75, step: 1},
    },
    fillMin: {
      control: {type: 'range', min: 25, max: 75, step: 1},
    },
    fillMax: {
      control: {type: 'range', min: 25, max: 75, step: 1},
    },
  },
  args: {
    width: 384,
    height: 384,
    enhanced: true,
    minValue: 25,
    maxValue: 75,
    value: 50,
    setpoint: 55,
    hasBar: true,
    hasScale: true,
    hasAdvice: true,
    fillMode: 'tint',
    fillMin: 40,
    fillMax: 60,
    scaleReferenceSize: 384,
    chartFill: true,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .chartFill=${_args.chartFill}
      .minValue=${_args.minValue}
      .maxValue=${_args.maxValue}
      .value=${_args.value}
      .setpoint=${_args.setpoint}
      .newSetpoint=${_args.newSetpoint}
      .touching=${_args.touching}
      .hasBar=${_args.hasBar}
      .hasScale=${_args.hasScale}
      .hasAdvice=${_args.hasAdvice}
      .fillMode=${_args.fillMode}
      .fillMin=${_args.fillMin}
      .fillMax=${_args.fillMax}
      .advice=${[
        {min: 60, max: 70, type: AdviceType.caution, hinted: true},
        {min: 30, max: 40, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${10}
      .secondaryInterval=${5}
      .tertiaryInterval=${1}
      .scaleReferenceSize=${_args.scaleReferenceSize}
    >
    </obc-gauge-trend>
  `,
};

export const GaugeTrendLabelsOnly: Story = {
  name: 'Labels only (no bar, condensed scale)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  args: {
    hasBar: false,
    chartFill: false,
    primaryInterval: 100,
    secondaryInterval: 100,
    scaleReferenceSize: 384,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .chartFill=${_args.chartFill}
      .minValue=${_args.minValue ?? 0}
      .maxValue=${_args.maxValue ?? 100}
      .value=${_args.value}
      .hasBar=${_args.hasBar}
      .hasScale=${_args.hasScale}
      .hasAdvice=${_args.hasAdvice}
      .fillMode=${_args.fillMode}
      .fillMin=${_args.fillMin}
      .fillMax=${_args.fillMax}
      .advice=${[
        {min: 25, max: 45, type: AdviceType.caution, hinted: true},
        {min: 55, max: 75, type: AdviceType.advice, hinted: false},
      ]}
      .primaryInterval=${100}
      .secondaryInterval=${100}
      .scaleReferenceSize=${_args.scaleReferenceSize}
      .scaleType=${ScaleType.condensed}
    >
      <!-- Note: highlightCurrentValue is auto-derived (true when hasBar=false) -->
    </obc-gauge-trend>
  `,
};

/**
 * This story demonstrates the difference between:
 * - **Left**: `fixedAspectRatioScaling=false` — using raw area-graph with slotted bar-vertical
 * - **Right**: `fixedAspectRatioScaling=true` — using gauge-trend (which locks this to true internally)
 *
 * Use the width/height controls to change the aspect ratio. Drag container corners to resize.
 * - Left: Chart and scale stay at fixed pixel sizes regardless of container size. NOTE: this is not 'Gauge-trend' but a simple chart+vertical bar in a slot.
 * - Right: Chart fills container width, scale proportionally adjusts based on reference size
 */
export const FixedAspectRatioScalingComparison: StoryObj = {
  name: 'Fixed aspect ratio scaling comparison',
  tags: ['!snapshot'],
  decorators: [],
  args: {
    width: 384,
    height: 384,
    value: 50,
    setpoint: 50,
    scaleReferenceSize: 384,
  },
  render: (args) => {
    // Import required components dynamically
    import('../../bars-graphs/area-graph/area-graph.js');
    import('../../building-blocks/bar-vertical/bar-vertical.js');

    return html`
      <style>
        .comparison-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 16px;
          min-height: 700px;
        }
        .comparison-instructions {
          grid-column: 1 / -1;
          font-family: var(--font-family-main);
          font-size: 13px;
          padding: 12px;
          background: var(--container-background-color);
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .comparison-container {
          padding: 16px;
          resize: both;
          overflow: auto;
          min-width: 300px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
        }
        .container-normal {
          border: 2px dashed var(--instrument-frame-tertiary-color);
        }
        .container-fixed {
          border: 2px dashed var(--instrument-enhanced-primary-color);
        }
        .comparison-label {
          font-family: var(--font-family-main);
          font-size: 14px;
          margin-bottom: 8px;
          flex-shrink: 0;
        }
        .label-normal {
          color: var(--instrument-frame-tertiary-color);
        }
        .label-fixed {
          color: var(--instrument-enhanced-primary-color);
        }
      </style>
      <div class="comparison-wrapper">
        <div class="comparison-instructions">
          <strong>Instructions:</strong> Use width/height controls to change
          aspect ratio. Drag the corner of each container to resize.
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>
              <strong>Left (fixedAspectRatioScaling=false):</strong> Chart and
              scale stay at fixed ${args.width}×${args.height}px regardless of
              container size. NOTE: this is not 'Gauge-trend' but a simple
              chart+vertical bar in a slot.
            </li>
            <li>
              <strong>Right (fixedAspectRatioScaling=true):</strong> Chart fills
              container width, height computed from ${args.width}:${args.height}
              aspect ratio. Scale scales proportionally.
            </li>
          </ul>
        </div>

        <!-- Left: fixedAspectRatioScaling=false -->
        <div class="comparison-container container-normal">
          <div class="comparison-label label-normal">
            fixedAspectRatioScaling=false (raw components, looks like
            'Gauge-trend' but isn't. Check how .obc-component-size-* affects it
            vs. the right side actual 'Gauge-trend')
          </div>
          <obc-area-graph
            .data=${SAMPLE_DATA}
            .width=${args.width}
            .height=${args.height}
            .showGrid=${false}
            .enhanced=${false}
            .fixedAspectRatioScaling=${false}
            .borderRadiusPosition=${BorderRadiusPosition.innerFirstChild}
            .borderRadiusPositionExternalScales=${BorderRadiusPosition.middleChild}
            .showPoints=${true}
            .yAxes=${[
              {
                id: 'y',
                position: 'left' as const,
                min: 0,
                max: 100,
                grid: undefined,
              },
            ]}
          >
            <obc-bar-vertical
              slot="right-scale"
              .minValue=${args.minValue ?? 0}
              .maxValue=${args.maxValue ?? 100}
              .height=${args.height}
              .scaleReferenceSize=${args.scaleReferenceSize}
              side="right"
              .hasScale=${true}
              .hasBar=${true}
              .barThickness=${48}
              .fillMode=${FillMode.fill}
              .value=${args.value}
              .setpoint=${args.setpoint}
              .primaryTickbarsInterval=${10}
              .secondaryTickbarsInterval=${5}
              .tertiaryTickbarsInterval=${1}
              .scaleBackground=${true}
              .fixedAspectRatio=${false}
              .enhanced=${false}
            ></obc-bar-vertical>
          </obc-area-graph>
        </div>

        <!-- Right: fixedAspectRatioScaling=true (gauge-trend) -->
        <div class="comparison-container container-fixed">
          <div class="comparison-label label-fixed">
            fixedAspectRatioScaling=true (obc-gauge-trend)
          </div>
          <obc-gauge-trend
            style="width: 100%;"
            .data=${SAMPLE_DATA}
            .width=${args.width}
            .height=${args.height}
            .scaleReferenceSize=${args.scaleReferenceSize}
            .chartFill=${true}
            .enhanced=${true}
            .minValue=${args.minValue ?? 0}
            .maxValue=${args.maxValue ?? 100}
            .value=${args.value}
            .setpoint=${args.setpoint}
            .touching=${args.touching}
            .hasBar=${true}
            .hasScale=${true}
            .primaryInterval=${10}
            .secondaryInterval=${5}
            .tertiaryInterval=${1}
          ></obc-gauge-trend>
        </div>
      </div>
    `;
  },
};

/**
 * This story demonstrates realtime data shifting with three different visual configurations:
 * - **Left**: With bar (enhanced mode, tint fill)
 * - **Center**: Without bar (scale only, with current value dot)
 * - **Right**: Condensed scale (labels only, with current value dot)
 *
 * All three use the same shifting logic and data updates.
 */
export const RealtimeShifting: Story = {
  name: 'Realtime (shifting)',
  tags: ['!snapshot'],
  render: (_args) => {
    // Create wrapper container
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <style>
        .realtime-wrapper {
          display: flex;
          flex-direction: row;
          gap: 24px;
          padding: 16px;
          flex-wrap: wrap;
        }
        .realtime-column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .realtime-label {
          font-family: var(--font-family-main);
          font-size: 12px;
          color: var(--instrument-frame-tertiary-color);
          margin-bottom: 8px;
          text-align: center;
        }
      </style>
      <div class="realtime-wrapper">
        <div class="realtime-column">
          <div class="realtime-label">With bar (enhanced)</div>
          <div class="gauge-container-1"></div>
        </div>
        <div class="realtime-column">
          <div class="realtime-label">Without bar (scale only + dot)</div>
          <div class="gauge-container-2"></div>
        </div>
        <div class="realtime-column">
          <div class="realtime-label">Condensed scale (labels only + dot)</div>
          <div class="gauge-container-3"></div>
        </div>
      </div>
    `;

    // Create three gauge elements
    const gauge1 = document.createElement('obc-gauge-trend');
    const gauge2 = document.createElement('obc-gauge-trend');
    const gauge3 = document.createElement('obc-gauge-trend');

    // Initialize with data points cycling through values
    const dataPoints = SAMPLE_DATA.map((p) => ({
      label: p.label,
      value: p.value - 50, // Shift to -50..+50 range for -100..100 scale
    }));

    // Common properties for all gauges
    const commonProps = {
      data: [...dataPoints],
      width: 384,
      height: 384,
      minValue: -100,
      maxValue: 100,
      chartMinValue: -100,
      chartMaxValue: 100,
      hasScale: true,
    };

    // Gauge 1: With bar (enhanced mode) - existing example
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g1 = gauge1 as any;
    g1.data = commonProps.data;
    g1.width = commonProps.width;
    g1.height = commonProps.height;
    g1.chartFill = true;
    g1.enhanced = true;
    g1.minValue = commonProps.minValue;
    g1.maxValue = commonProps.maxValue;
    g1.chartMinValue = commonProps.chartMinValue;
    g1.chartMaxValue = commonProps.chartMaxValue;
    g1.hasBar = true;
    g1.hasScale = commonProps.hasScale;
    g1.fillMode = 'tint';
    g1.fillMin = 0;
    g1.fillMax = 50;
    g1.primaryInterval = 50;
    g1.secondaryInterval = 10;

    // Gauge 2: Without bar (scale only) - from GaugeTrendWithoutBar
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g2 = gauge2 as any;
    g2.data = [...dataPoints];
    g2.width = commonProps.width;
    g2.height = commonProps.height;
    g2.chartFill = false;
    g2.enhanced = false;
    g2.minValue = commonProps.minValue;
    g2.maxValue = commonProps.maxValue;
    g2.chartMinValue = commonProps.chartMinValue;
    g2.chartMaxValue = commonProps.chartMaxValue;
    g2.hasBar = false;
    g2.hasScale = commonProps.hasScale;
    g2.fillMode = 'fill';
    g2.fillMin = 0;
    g2.fillMax = 50;
    g2.primaryInterval = 50;
    g2.secondaryInterval = 5;
    // Note: highlightCurrentValue is auto-derived (true when hasBar=false)

    // Gauge 3: Condensed scale (labels only) - from GaugeTrendLabelsOnly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g3 = gauge3 as any;
    g3.data = [...dataPoints];
    g3.width = commonProps.width;
    g3.height = commonProps.height;
    g3.chartFill = false;
    g3.enhanced = false;
    g3.minValue = commonProps.minValue;
    g3.maxValue = commonProps.maxValue;
    g3.chartMinValue = commonProps.chartMinValue;
    g3.chartMaxValue = commonProps.chartMaxValue;
    g3.hasBar = false;
    g3.hasScale = commonProps.hasScale;
    g3.fillMode = 'fill';
    g3.fillMin = 0;
    g3.fillMax = 50;
    g3.primaryInterval = 100;
    g3.secondaryInterval = 100;
    g3.scaleType = ScaleType.condensed;
    // Note: highlightCurrentValue is auto-derived (true when hasBar=false)

    // Append gauges to containers
    wrapper.querySelector('.gauge-container-1')!.appendChild(gauge1);
    wrapper.querySelector('.gauge-container-2')!.appendChild(gauge2);
    wrapper.querySelector('.gauge-container-3')!.appendChild(gauge3);

    let valueIndex = 0;

    const interval = setInterval(() => {
      // Cycle through original SAMPLE_DATA values, shifted to -100..100 range
      valueIndex = (valueIndex + 1) % SAMPLE_DATA.length;
      const newValue = SAMPLE_DATA[valueIndex].value - 50;

      // Shift data: remove first, add new at end
      const currentData = [...dataPoints];
      currentData.shift();
      currentData.push({
        label: String(currentData.length),
        value: newValue,
      });
      dataPoints.length = 0;
      dataPoints.push(...currentData);

      const newData = [...dataPoints];

      // Update all three gauges with the same data
      // Note: fillMax auto-derives from value, so we only need to set value
      g1.data = newData;
      g1.value = newValue;

      g2.data = newData;
      g2.value = newValue;

      g3.data = newData;
      g3.value = newValue;
    }, 1000);

    // Clean up interval when element is removed
    const mo = new MutationObserver(() => {
      if (!document.body.contains(wrapper)) {
        clearInterval(interval);
        mo.disconnect();
      }
    });
    mo.observe(document.body, {childList: true, subtree: true});

    return wrapper;
  },
};
