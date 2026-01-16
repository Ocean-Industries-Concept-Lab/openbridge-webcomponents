import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-trend.js';
import {AdviceType} from '../watch/advice.js';
import {BorderRadiusPosition} from '../types.js';
import {FillMode} from '../../building-blocks/bar-vertical/bar-vertical.js';

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
    scaleMinValue: {
      control: {type: 'number'},
    },
    scaleMaxValue: {
      control: {type: 'number'},
    },
    scaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleHasBar: {
      control: 'boolean',
    },
    hasScale: {
      control: 'boolean',
    },
    scaleHasAdvice: {
      control: 'boolean',
    },
    scaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    scaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
    },
  },
  args: {
    browserContainerWidth: 384,
    width: 384,
    height: 384,
    enhanced: false,
    scaleMinValue: 3.0,
    scaleMaxValue: 7.0,
    scaleValue: 5,
    scaleSetpoint: 5,
    scaleHasBar: true,
    hasScale: true,
    scaleHasAdvice: false,
    scaleFillMode: 'fill',
    scaleFillMin: 3,
    scaleFillMax: 5,
    scaleAdvicePosition: 'inner',
  },
  render: (args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${args.width}
      .height=${args.height}
      .enhanced=${args.enhanced}
      .scaleMinValue=${args.scaleMinValue}
      .scaleMaxValue=${args.scaleMaxValue}
      .scaleValue=${args.scaleValue}
      .scaleSetpoint=${args.scaleSetpoint}
      .scaleHasBar=${args.scaleHasBar}
      .hasScale=${args.hasScale}
      .scaleHasAdvice=${args.scaleHasAdvice}
      .scaleFillMode=${args.scaleFillMode}
      .scaleFillMin=${args.scaleFillMin}
      .scaleFillMax=${args.scaleFillMax}
      .scaleAdvicePosition=${args.scaleAdvicePosition}
      .scaleAdvice=${[
        {min: 3, max: 5, type: AdviceType.caution, hinted: true},
        {min: 6, max: 7, type: AdviceType.advice, hinted: false},
      ]}
      .scalePrimaryInterval=${1}
      .scaleSecondaryInterval=${0.5}
      .scaleTertiaryInterval=${0.125}
      .scaleHasPrimaryTickbars=${false}
      .scaleHasTertiaryTickbars=${false}
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
  argTypes: {
    width: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    height: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    enhanced: {
      control: 'boolean',
    },
    scaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleHasBar: {
      control: 'boolean',
    },
    hasScale: {
      control: 'boolean',
    },
    scaleHasAdvice: {
      control: 'boolean',
    },
    scaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    scaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
    },
  },
  args: {
    width: 384,
    height: 384,
    enhanced: false,
    scaleValue: 5,
    scaleSetpoint: 5,
    scaleHasBar: true,
    hasScale: true,
    scaleHasAdvice: false,
    scaleFillMode: 'fill',
    scaleFillMin: 3,
    scaleFillMax: 5,
    scaleAdvicePosition: 'inner',
    scaleReferenceSize: 384,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .scaleMinValue=${3.0}
      .scaleMaxValue=${7.0}
      .scaleValue=${_args.scaleValue}
      .scaleSetpoint=${_args.scaleSetpoint}
      .scaleHasBar=${_args.scaleHasBar}
      .hasScale=${_args.hasScale}
      .scaleHasAdvice=${_args.scaleHasAdvice}
      .scaleFillMode=${_args.scaleFillMode}
      .scaleFillMin=${_args.scaleFillMin}
      .scaleFillMax=${_args.scaleFillMax}
      .scaleAdvicePosition=${_args.scaleAdvicePosition}
      .scaleAdvice=${[
        {min: 3, max: 5, type: AdviceType.caution, hinted: true},
        {min: 6, max: 7, type: AdviceType.advice, hinted: false},
      ]}
      .scalePrimaryInterval=${1}
      .scaleSecondaryInterval=${0.5}
      .scaleTertiaryInterval=${0.125}
      .scaleHasPrimaryTickbars=${false}
      .scaleHasTertiaryTickbars=${false}
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
  argTypes: {
    width: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    height: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    enhanced: {
      control: 'boolean',
    },
    scaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleHasBar: {
      control: 'boolean',
    },
    hasScale: {
      control: 'boolean',
    },
    scaleHasAdvice: {
      control: 'boolean',
    },
    scaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    scaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
    },
  },
  args: {
    width: 384,
    height: 384,
    enhanced: false,
    scaleValue: 5,
    scaleSetpoint: 5,
    scaleHasBar: true,
    hasScale: true,
    scaleHasAdvice: false,
    scaleFillMode: 'fill',
    scaleFillMin: 3,
    scaleFillMax: 5,
    scaleAdvicePosition: 'inner',
    scaleReferenceSize: 240,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .scaleMinValue=${3.0}
      .scaleMaxValue=${7.0}
      .scaleValue=${_args.scaleValue}
      .scaleSetpoint=${_args.scaleSetpoint}
      .scaleHasBar=${_args.scaleHasBar}
      .hasScale=${_args.hasScale}
      .scaleHasAdvice=${_args.scaleHasAdvice}
      .scaleFillMode=${_args.scaleFillMode}
      .scaleFillMin=${_args.scaleFillMin}
      .scaleFillMax=${_args.scaleFillMax}
      .scaleAdvicePosition=${_args.scaleAdvicePosition}
      .scaleAdvice=${[
        {min: 3, max: 5, type: AdviceType.caution, hinted: true},
        {min: 6, max: 7, type: AdviceType.advice, hinted: false},
      ]}
      .scalePrimaryInterval=${1}
      .scaleSecondaryInterval=${0.5}
      .scaleTertiaryInterval=${0.125}
      .scaleHasPrimaryTickbars=${false}
      .scaleHasTertiaryTickbars=${false}
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
    scaleValue: 5,
    scaleSetpoint: 5,
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
              .enhanced=${false}
              .scaleMinValue=${3.0}
              .scaleMaxValue=${7.0}
              .scaleValue=${args.scaleValue}
              .scaleSetpoint=${args.scaleSetpoint}
              .scaleHasBar=${true}
              .hasScale=${true}
              .scalePrimaryInterval=${1}
              .scaleSecondaryInterval=${0.5}
              .scaleTertiaryInterval=${0.125}
              .scaleHasPrimaryTickbars=${false}
              .scaleHasTertiaryTickbars=${false}
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
              .enhanced=${false}
              .scaleMinValue=${3.0}
              .scaleMaxValue=${7.0}
              .scaleValue=${args.scaleValue}
              .scaleSetpoint=${args.scaleSetpoint}
              .scaleHasBar=${true}
              .hasScale=${true}
              .scalePrimaryInterval=${1}
              .scaleSecondaryInterval=${0.5}
              .scaleTertiaryInterval=${0.125}
              .scaleHasPrimaryTickbars=${false}
              .scaleHasTertiaryTickbars=${false}
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
              .enhanced=${false}
              .scaleMinValue=${3.0}
              .scaleMaxValue=${7.0}
              .scaleValue=${args.scaleValue}
              .scaleSetpoint=${args.scaleSetpoint}
              .scaleHasBar=${true}
              .hasScale=${true}
              .scalePrimaryInterval=${1}
              .scaleSecondaryInterval=${0.5}
              .scaleTertiaryInterval=${0.125}
              .scaleHasPrimaryTickbars=${false}
              .scaleHasTertiaryTickbars=${false}
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
  argTypes: {
    width: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    height: {
      control: {type: 'range', min: 128, max: 960, step: 10},
    },
    enhanced: {
      control: 'boolean',
    },
    scaleValue: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleSetpoint: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleHasBar: {
      control: 'boolean',
    },
    hasScale: {
      control: 'boolean',
    },
    scaleHasAdvice: {
      control: 'boolean',
    },
    scaleFillMode: {
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    scaleFillMin: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleFillMax: {
      control: {type: 'range', min: 3, max: 7, step: 0.1},
    },
    scaleAdvicePosition: {
      control: {type: 'radio'},
      options: ['inner', 'center', 'outer'],
    },
  },
  args: {
    width: 384,
    height: 384,
    enhanced: false,
    scaleValue: 5,
    scaleSetpoint: 5,
    scaleHasBar: true,
    hasScale: false,
    scaleHasAdvice: false,
    scaleFillMode: 'fill',
    scaleFillMin: 3,
    scaleFillMax: 5,
    scaleAdvicePosition: 'inner',
    scaleReferenceSize: 384,
  },
  render: (_args) => html`
    <obc-gauge-trend
      .data=${SAMPLE_DATA}
      .width=${_args.width}
      .height=${_args.height}
      .enhanced=${_args.enhanced}
      .scaleMinValue=${3.0}
      .scaleMaxValue=${7.0}
      .scaleValue=${_args.scaleValue}
      .scaleHasBar=${_args.scaleHasBar}
      .hasScale=${_args.hasScale}
      .scaleHasAdvice=${_args.scaleHasAdvice}
      .scaleFillMode=${_args.scaleFillMode}
      .scaleFillMin=${_args.scaleFillMin}
      .scaleFillMax=${_args.scaleFillMax}
      .scaleAdvicePosition=${_args.scaleAdvicePosition}
      .scaleAdvice=${[
        {min: 3, max: 5, type: AdviceType.caution, hinted: true},
        {min: 6, max: 7, type: AdviceType.advice, hinted: false},
      ]}
      .scalePrimaryInterval=${1}
      .scaleSecondaryInterval=${0.5}
      .scaleTertiaryInterval=${0.125}
      .scaleHasPrimaryTickbars=${false}
      .scaleHasTertiaryTickbars=${false}
      .scaleReferenceSize=${_args.scaleReferenceSize}
    >
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
    scaleValue: 5,
    scaleSetpoint: 5,
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
            fixedAspectRatioScaling=false (raw components)
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
          >
            <obc-bar-vertical
              slot="right-scale"
              .minValue=${3.0}
              .maxValue=${7.0}
              .height=${args.height}
              .scaleReferenceSize=${args.scaleReferenceSize}
              side="right"
              .hasScale=${true}
              .hasBar=${true}
              .barThickness=${48}
              .fillMode=${FillMode.fill}
              .value=${args.scaleValue}
              .setpoint=${args.scaleSetpoint}
              .primaryTickbarsInterval=${1}
              .secondaryTickbarsInterval=${0.5}
              .tertiaryTickbarsInterval=${0.125}
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
            .enhanced=${true}
            .scaleMinValue=${3.0}
            .scaleMaxValue=${7.0}
            .scaleValue=${args.scaleValue}
            .scaleSetpoint=${args.scaleSetpoint}
            .scaleHasBar=${true}
            .hasScale=${true}
            .scalePrimaryInterval=${1}
            .scaleSecondaryInterval=${0.5}
            .scaleTertiaryInterval=${0.125}
          ></obc-gauge-trend>
        </div>
      </div>
    `;
  },
};
