import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import type {ObcAreaGraph} from './area-graph.js';
import './area-graph.js';
import '../../building-blocks/bar-vertical/bar-vertical.js';
import '../../building-blocks/bar-horizontal/bar-horizontal.js';
import {
  FillMode,
  AdvicePosition,
} from '../../building-blocks/external-scale/external-scale.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import {
  Priority,
  BorderRadiusPosition,
} from '../../navigation-instruments/types.js';

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

const SAMPLE_MULTI_DATASETS = [
  {
    label: 'Sensor A',
    data: [
      {x: '2025-01-01', y: 10},
      {x: '2025-01-02', y: 12},
      {x: '2025-01-03', y: 11},
      {x: '2025-01-04', y: 8},
      {x: '2025-01-05', y: 7},
      {x: '2025-01-06', y: 11},
      {x: '2025-01-07', y: 9},
      {x: '2025-01-08', y: 14},
      {x: '2025-01-09', y: 17},
    ],
  },
  {
    label: 'Sensor B',
    data: [
      {x: '2025-01-01', y: 1},
      {x: '2025-01-02', y: 2},
      {x: '2025-01-03', y: 5},
      {x: '2025-01-04', y: 3},
      {x: '2025-01-05', y: 10},
      {x: '2025-01-06', y: 14},
      {x: '2025-01-07', y: 12},
      {x: '2025-01-08', y: 6},
      {x: '2025-01-09', y: 3},
    ],
  },
  {
    label: 'Sensor C',
    data: [
      {x: '2025-01-01', y: 1},
      {x: '2025-01-02', y: 2},
      {x: '2025-01-03', y: 2},
      {x: '2025-01-04', y: 2},
      {x: '2025-01-05', y: 1},
      {x: '2025-01-06', y: 1},
      {x: '2025-01-07', y: 1},
      {x: '2025-01-08', y: 2},
      {x: '2025-01-09', y: 1},
    ],
  },
];

const meta: Meta = {
  title: 'Bars and Graphs/Area Graph',
  component: 'obc-area-graph',
  tags: ['autodocs', '6.0'],
  render: (_args) => html`
    <obc-area-graph
      .data=${_args.data}
      .datasets=${_args.datasets}
      .labels=${_args.labels}
      .lineMode=${_args.lineMode}
      .colors=${_args.colors}
      .xAxisType=${_args.xAxisType}
      .yAxisPosition=${_args.yAxisPosition}
      .showGrid=${_args.showGrid}
      .showGridX=${_args.showGridX}
      .showGridY=${_args.showGridY}
      .showTickMarks=${_args.showTickMarks}
      .xTicksLimit=${_args.xTicksLimit}
      .xStepSize=${_args.xStepSize}
      .yTicksLimit=${_args.yTicksLimit}
      .yStepSize=${_args.yStepSize}
      .showPoints=${_args.showPoints}
      .fillMode=${_args.fillMode}
      .stacked=${_args.stacked}
      .legend=${_args.legend}
      .priority=${_args.priority}
      .showDebugOverlay=${_args.showDebugOverlay}
      .width=${_args.width}
      .height=${_args.height}
    ></obc-area-graph>
  `,
  argTypes: {
    // Data sources
    data: {control: 'object'},
    datasets: {control: 'object'},
    labels: {control: 'object'},

    // Axis and layout
    xAxisType: {control: {type: 'radio'}, options: ['category', 'time']},
    yAxisPosition: {control: {type: 'radio'}, options: ['left', 'right']},
    showGrid: {control: 'boolean'},
    showGridX: {control: 'boolean'},
    showGridY: {control: 'boolean'},
    showTickMarks: {control: 'boolean'},
    xTicksLimit: {control: {type: 'number'}},
    xStepSize: {control: {type: 'number'}},
    yTicksLimit: {control: {type: 'number'}},
    yStepSize: {control: {type: 'number'}},

    lineMode: {
      control: {type: 'radio'},
      options: ['smooth', 'straight', 'stepped'],
    },
    timeDisplay: {control: {type: 'radio'}, options: ['minutes', 'date']},
    showPoints: {control: 'boolean'},
    fillMode: {
      control: {type: 'radio'},
      options: ['semitransparent', 'solid', 'threshold'],
    },
    stacked: {control: 'boolean'},
    colors: {control: 'object'},
    legend: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
    showDebugOverlay: {control: 'boolean'},
    width: {control: {type: 'range', min: 192, max: 1024}},
    height: {control: {type: 'range', min: 48, max: 512}},
  },
  args: {
    data: SAMPLE_DATA,
    datasets: undefined,
    labels: undefined,
    xAxisType: 'category',
    yAxisPosition: 'left',
    showGrid: true, // Component defaults to false, but stories show grid by default
    showGridX: true, // Component defaults to false, but stories show grid by default
    showGridY: true, // Component defaults to false, but stories show grid by default
    showTickMarks: true, // Component defaults to false, but stories show tick marks by default
    xTicksLimit: undefined,
    xStepSize: undefined,
    yTicksLimit: undefined,
    yStepSize: undefined,
    showPoints: false,
    fillMode: 'semitransparent',
    lineMode: 'smooth',
    timeDisplay: 'minutes',
    stacked: false,
    colors: [],
    legend: false,
    priority: Priority.enhanced,
    showDebugOverlay: false,
    width: 480,
    height: 320,
  },
};

export default meta;

type Story = StoryObj;

export const Semitransparent: Story = {
  name: 'Semitransparent area graph (default)',
};

export const SemitransparentExternalScales: Story = {
  name: 'Semitransparent area graph (with external scales)',
  tags: ['skip-test'],
  argTypes: {
    priority: {
      control: 'select',
      options: Object.values(Priority),
      description: 'Use priority-based color palette for chart and scales',
    },
    // External scale controls (vertical/left)
    vScaleHasBar: {control: 'boolean', description: 'Vertical scale: show bar'},
    vScaleShowLabels: {
      control: 'boolean',
      description: 'Vertical scale: show labels',
    },
    vScaleAdvices: {
      control: 'boolean',
      description: 'Vertical scale: show advice overlays',
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
    // External scale controls (horizontal/bottom)
    hScaleHasBar: {
      control: 'boolean',
      description: 'Horizontal scale: show bar',
    },
    hScaleShowLabels: {
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
      control: {type: 'range', min: 0, max: 11, step: 0.5},
      description: 'Horizontal scale: current value',
    },
    hScaleSetpoint: {
      control: {type: 'range', min: 0, max: 11, step: 0.5},
      description: 'Horizontal scale: setpoint',
    },
    hScaleFillMin: {
      control: {type: 'range', min: 0, max: 11, step: 0.5},
      description: 'Horizontal scale: fill min',
    },
    hScaleFillMax: {
      control: {type: 'range', min: 0, max: 11, step: 0.5},
      description: 'Horizontal scale: fill max',
    },
  },
  args: {
    showPoints: true,
    showTickMarks: false,
    width: 480,
    height: 320,
    priority: Priority.enhanced,
    // Vertical scale defaults
    vScaleHasBar: false,
    vScaleShowLabels: true,
    vScaleAdvices: true,
    vScaleFillMode: 'fill',
    vScaleAdvicePosition: 'inner',
    vScaleValue: 5,
    vScaleSetpoint: 5,
    vScaleFillMin: 3,
    vScaleFillMax: 5,
    // Horizontal scale defaults
    hScaleHasBar: false,
    hScaleShowLabels: true,
    hScaleAdvices: true,
    hScaleFillMode: 'tint',
    hScaleAdvicePosition: 'inner',
    hScaleValue: 6,
    hScaleSetpoint: 8.5,
    hScaleFillMin: 2,
    hScaleFillMax: 8,
  },
  render: (_args) => html`
    <obc-area-graph
      .data=${SAMPLE_DATA}
      .showPoints=${_args.showPoints}
      .showTickMarks=${_args.showTickMarks}
      .showGrid=${true}
      .showGridX=${true}
      .showGridY=${true}
      .width=${_args.width}
      .height=${_args.height}
      .priority=${_args.priority}
      .borderRadiusPositionExternalScales=${BorderRadiusPosition.outerLastChild}
    >
      <obc-bar-vertical
        slot="left-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .height=${_args.height}
        .side=${'left'}
        .hasScale=${true}
        .showLabels=${_args.vScaleShowLabels}
        .hasBar=${_args.vScaleHasBar}
        .fillMode=${_args.vScaleFillMode === 'fill'
          ? FillMode.fill
          : FillMode.tint}
        .fillMin=${_args.vScaleFillMin}
        .fillMax=${_args.vScaleFillMax}
        .value=${_args.vScaleValue}
        .setpoint=${_args.vScaleSetpoint}
        .advicePosition=${_args.vScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.vScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .advices=${_args.vScaleAdvices
          ? [
              {min: 3, max: 5, type: AdviceType.caution, hinted: true},
              {min: 6, max: 7, type: AdviceType.advice, hinted: false},
            ]
          : []}
        .primaryTickmarkInterval=${1}
        .secondaryTickmarkInterval=${0.5}
        .tertiaryTickmarkInterval=${0.125}
        .priority=${_args.priority}
      ></obc-bar-vertical>
      <obc-bar-horizontal
        slot="bottom-scale"
        .minValue=${0}
        .maxValue=${11}
        .width=${_args.width}
        .side=${'bottom'}
        .hasScale=${true}
        .showLabels=${_args.hScaleShowLabels}
        .hasBar=${_args.hScaleHasBar}
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
        .advices=${_args.hScaleAdvices
          ? [
              {min: 3, max: 5, type: AdviceType.caution, hinted: true},
              {min: 8, max: 10, type: AdviceType.advice, hinted: false},
            ]
          : []}
        .primaryTickmarkInterval=${2}
        .secondaryTickmarkInterval=${1}
        .tertiaryTickmarkInterval=${0.25}
        .priority=${_args.priority}
      ></obc-bar-horizontal>
    </obc-area-graph>
  `,
};

export const WithPoints: Story = {
  name: 'With points area graph',
  args: {
    showPoints: true,
  },
};

export const StraightLine: Story = {
  name: 'Straight area graph',
  args: {
    lineMode: 'straight',
  },
};

export const SteppedLine: Story = {
  name: 'Stepped area graph',
  args: {
    lineMode: 'stepped',
  },
};

export const Solid: Story = {
  name: 'Solid area graph',
  args: {
    fillMode: 'solid',
  },
};

export const Threshold: Story = {
  name: 'Threshold area graph',
  args: {
    fillMode: 'threshold',
  },
};

export const Stacked: Story = {
  name: 'Stacked area graph',
  args: {
    showGridY: false,
    fillMode: 'solid',
    stacked: true,
    legend: true,
    datasets: SAMPLE_MULTI_DATASETS,
  },
};

export const MultiSeriesTime: Story = {
  name: 'Multi-series area graph',
  args: {
    showGridY: false,
    datasets: SAMPLE_MULTI_DATASETS,
    legend: true,
  },
};

export const MinHeight: Story = {
  name: 'Minimal height area graph (48px)',
  args: {
    width: 72,
    height: 48,
  },
};

export const ThresholdHeightSize: Story = {
  name: 'Threshold height area graph (192px, where labels appear)',
  args: {
    width: 288,
    height: 192,
  },
};

export const NoLabelsNoTicks: Story = {
  name: 'No labels/ticks area graph (but yes 32px padding for optional points)',
  args: {
    showTickMarks: false,
    width: 288,
    height: 192,
    fillMode: 'semitransparent',
    showPoints: true,
  },
};

export const WithLegend: Story = {
  name: 'With legend area graph',
  args: {
    legend: true,
  },
};

export const MultiAxis: Story = {
  name: 'Multi-axis area graph (left and right y-axes)',
  render: (_args) => {
    const multiAxisDatasets: NonNullable<ObcAreaGraph['datasets']> = [
      {
        label: 'Temperature',
        data: [
          {x: 'Jan', y: 20},
          {x: 'Feb', y: 25},
          {x: 'Mar', y: 30},
          {x: 'Apr', y: 28},
          {x: 'May', y: 35},
          {x: 'Jun', y: 40},
          {x: 'Jul', y: 38},
          {x: 'Aug', y: 42},
          {x: 'Sep', y: 45},
          {x: 'Oct', y: 50},
          {x: 'Nov', y: 48},
          {x: 'Dec', y: 52},
        ],
        yAxisID: 'y-temp',
      },
      {
        label: 'Pressure',
        data: [
          {x: 'Jan', y: 2},
          {x: 'Feb', y: 3},
          {x: 'Mar', y: 2.5},
          {x: 'Apr', y: 4},
          {x: 'May', y: 3.5},
          {x: 'Jun', y: 5},
          {x: 'Jul', y: 4.5},
          {x: 'Aug', y: 6},
          {x: 'Sep', y: 5.5},
          {x: 'Oct', y: 7},
          {x: 'Nov', y: 6.5},
          {x: 'Dec', y: 8},
        ],
        yAxisID: 'y-pressure',
      },
    ];
    return html`
      <obc-area-graph
        .yAxes=${[
          {id: 'y-temp', position: 'left' as const, min: 0, max: 100},
          {id: 'y-pressure', position: 'right' as const, min: 0, max: 10},
        ]}
        .datasets=${multiAxisDatasets}
        .legend=${true}
        .showGrid=${true}
        .showGridX=${true}
        .showGridY=${true}
        .showTickMarks=${true}
        .showDebugOverlay=${_args.showDebugOverlay}
        .width=${_args.width}
        .height=${_args.height}
        .priority=${_args.priority}
      ></obc-area-graph>
    `;
  },
};
export const CustomColors: Story = {
  args: {
    datasets: SAMPLE_MULTI_DATASETS,
    colors: ['#e74c3c', '#3498db', '#2ecc71'],
    legend: true,
    showGrid: true,
    showGridX: true,
    showGridY: true,
    showTickMarks: true,
  },
};

export const RealtimeSqueezing: Story = {
  name: 'Realtime (squeezing)',
  tags: ['skip-test'],
  render: (_args) => {
    const chart = document.createElement('obc-area-graph');
    chart.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
    chart.showDebugOverlay = _args.showDebugOverlay;
    chart.showGrid = true;
    chart.showGridX = true;
    chart.showGridY = true;
    chart.showTickMarks = true;
    chart.height = _args.height;
    chart.width = _args.width;
    chart.priority = _args.priority;

    setInterval(() => {
      const last = chart.data[chart.data.length - 1] || {value: 3};
      const newValue = Math.max(
        1,
        last.value + Math.floor(Math.random() * 10 - 5)
      );
      const newPoint = {
        label: new Date().toLocaleTimeString(),
        value: newValue,
      };
      // Append the new datapoint while keeping existing data
      chart.data = [...chart.data, newPoint];
    }, 2000);

    return chart;
  },
};

export const RealtimeShifting: Story = {
  name: 'Realtime (shifting)',
  tags: ['skip-test'],
  render: (_args) => {
    const chart = document.createElement('obc-area-graph');
    chart.showDebugOverlay = _args.showDebugOverlay;
    chart.showGrid = true;
    chart.showGridX = true;
    chart.showGridY = true;
    chart.showTickMarks = true;
    chart.width = _args.width;
    chart.height = _args.height;
    chart.xAxisType = 'time';
    chart.timeDisplay = 'minutes';
    chart.priority = _args.priority;

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

    return chart;
  },
};
