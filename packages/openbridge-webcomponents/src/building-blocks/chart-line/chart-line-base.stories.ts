import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import type {ObcAreaGraph} from '../../bars-graphs/area-graph/area-graph.js';
// Import concrete implementation for demonstration (base class is abstract)
import '../../bars-graphs/area-graph/area-graph.js';
import '../bar-vertical/bar-vertical.js';
import '../bar-horizontal/bar-horizontal.js';
import {
  XAxisType,
  YAxisPosition,
  LineMode,
  TimeDisplay,
} from './chart-line-base.js';
import {AreaFillMode} from '../../bars-graphs/area-graph/area-graph.js';
import {
  FillMode,
  AdvicePosition,
} from '../../building-blocks/external-scale/external-scale.js';
import {
  Priority,
  BorderRadiusPosition,
} from '../../navigation-instruments/types.js';
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
  title: 'Building Blocks/Line Area Chart Base',
  component: 'obc-area-graph',
  tags: ['autodocs', '6.0'],
  parameters: {
    docs: {
      description: {
        component: `# Line-Area Chart Base (abstract base class)

Abstract base class for line and area chart components built on Chart.js.

## Features
- **Single or multi-series**: Use \`data\` for simple single-series or \`datasets\` for multi-series charts
- **Time and category axes**: Supports \`category\` x-axis (labels) and \`time\` x-axis (ISO dates or timestamps)
- **Line styles**: Choose \`smooth\` (curved), \`straight\`, or \`stepped\` line rendering
- **Fill modes**: Area fills with \`semitransparent\`, \`solid\`, or \`threshold\` (red/blue above/below midpoint)
- **Stacked charts**: Enable \`stacked\` for multi-series datasets to stack values on y-axis
- **Flexible axes**: Single y-axis via \`yAxisPosition\` or multi-axis via \`yAxes\` for complex charts
- **Theme-aware**: Automatically updates colors on theme changes using CSS variables
- **Responsive sizing**: Fixed height with 1.5:1 aspect ratio (e.g., 320px height → 480px width)
- **Grid & ticks**: Toggle grid lines (\`showGrid\`, \`showGridX\`, \`showGridY\`) and tick marks (\`showTickMarks\`)
- **Legend support**: Optional HTML legend showing series labels with \`legend\` property
- **External axis support**: via slots

## Size Behavior
- Above 192px: Shows labels, tick marks, and grid lines with standard padding
- Below 192px: Hides labels/ticks and uses edge-to-edge rendering for compact display

## Concrete implementations
- \`<obc-line-graph>\`: Line chart (non-filled)
- \`<obc-area-graph>\`: Area chart with fill modes (semitransparent, solid, threshold)

## Examples

### Basic single-series with category axis
\`\`\`html
<obc-line-graph></obc-line-graph>
<script>
  const chart = document.querySelector('obc-line-graph');
  chart.data = [
    {label: 'Jan', value: 10},
    {label: 'Feb', value: 14},
    {label: 'Mar', value: 12}
  ];
  chart.unit = 'kW';
  chart.height = 256;
</script>
\`\`\`

### Multi-series with time axis and legend
\`\`\`html
<obc-line-graph></obc-line-graph>
<script>
  const chart = document.querySelector('obc-line-graph');
  chart.xAxisType = 'time';
  chart.timeDisplay = 'date';
  chart.legend = true;
  chart.datasets = [
    {label: 'Temperature', data: [{x: '2025-01-01', y: 20}, {x: '2025-01-02', y: 22}]},
    {label: 'Humidity', data: [{x: '2025-01-01', y: 65}, {x: '2025-01-02', y: 68}]}
  ];
</script>
\`\`\`

### Stacked area chart with solid fill
\`\`\`html
<obc-area-graph></obc-area-graph>
<script>
  const chart = document.querySelector('obc-area-graph');
  chart.datasets = [
    {label: 'Series A', data: [2, 3, 4, 3, 5]},
    {label: 'Series B', data: [1, 2, 3, 2, 4]},
    {label: 'Series C', data: [3, 2, 1, 2, 3]}
  ];
  chart.fillMode = 'solid';
  chart.stacked = true;
  chart.legend = true;
</script>
\`\`\``,
      },
    },
  },
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
      .fill=${_args.fill}
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
    data: {
      control: 'object',
      description: 'Simple single-series data (array of {label,value})',
    },
    datasets: {
      control: 'object',
      description: 'Chart.js datasets for multi-series mode',
    },
    labels: {
      control: 'object',
      description: 'Optional explicit labels for category x-axis',
    },

    // Axis and layout
    xAxisType: {
      control: {type: 'radio'},
      options: [XAxisType.category, XAxisType.time],
    },
    yAxisPosition: {
      control: {type: 'radio'},
      options: [YAxisPosition.left, YAxisPosition.right],
    },
    showGrid: {control: 'boolean'},
    showGridX: {
      control: 'boolean',
      description: 'Show vertical grid lines (x-axis). Default: true',
    },
    showGridY: {
      control: 'boolean',
      description: 'Show horizontal grid lines (y-axis). Default: true',
    },
    showTickMarks: {control: 'boolean'},
    xTicksLimit: {
      control: {type: 'number'},
      description: 'Max number of x-axis ticks/grid lines (optional)',
    },
    xStepSize: {
      control: {type: 'number'},
      description: 'Force x-axis tick interval (optional)',
    },
    yTicksLimit: {
      control: {type: 'number'},
      description: 'Max number of y-axis ticks/grid lines (optional)',
    },
    yStepSize: {
      control: {type: 'number'},
      description: 'Force y-axis tick interval (optional)',
    },

    lineMode: {
      control: {type: 'radio'},
      options: [LineMode.smooth, LineMode.straight, LineMode.stepped],
    },
    timeDisplay: {
      control: {type: 'radio'},
      options: [TimeDisplay.minutes, TimeDisplay.date],
    },
    showPoints: {
      control: 'boolean',
      description: 'Show point markers (default: false)',
    },
    fill: {control: 'boolean'},
    fillMode: {
      control: {type: 'radio'},
      options: [
        AreaFillMode.semitransparent,
        AreaFillMode.solid,
        AreaFillMode.threshold,
      ],
      description: 'Threshold mode auto-calculates midpoint (min+max)/2',
      if: {arg: 'fill', truthy: true},
    },
    stacked: {
      control: 'boolean',
      description: 'Enable stacked mode for multi-series datasets',
    },
    colors: {control: 'object'},
    legend: {control: 'boolean'},
    priority: {
      control: 'select',
      options: Object.values(Priority),
      description:
        'Use enhanced color palette (blue) instead of default (gray)',
    },
    showDebugOverlay: {control: 'boolean'},
    width: {
      control: {type: 'range', min: 192, max: 1024},
      description: 'Width of the chart in pixels (default: 480)',
    },
    height: {
      control: {type: 'range', min: 48, max: 512},
      description: 'Height of the chart in pixels (default: 320)',
    },
  },
  args: {
    data: SAMPLE_DATA,
    datasets: undefined,
    labels: undefined,
    xAxisType: XAxisType.category,
    yAxisPosition: YAxisPosition.left,
    showGrid: true, // Component defaults to false, but stories show grid by default
    showGridX: true, // Component defaults to false, but stories show grid by default
    showGridY: true, // Component defaults to false, but stories show grid by default
    showTickMarks: true, // Component defaults to false, but stories show tick marks by default
    xTicksLimit: undefined,
    xStepSize: undefined,
    yTicksLimit: undefined,
    yStepSize: undefined,
    showPoints: false,
    fill: false,
    fillMode: AreaFillMode.semitransparent,
    lineMode: LineMode.smooth,
    timeDisplay: TimeDisplay.minutes,
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

export const SingleSeries: Story = {
  name: 'Single-Series Line Graph (category)',
};

export const WithPoints: Story = {
  name: 'With Points Line Graph',
  args: {
    showPoints: true,
  },
};

export const StraightLine: Story = {
  name: 'Straight Line Graph',
  args: {
    lineMode: 'straight',
  },
};

export const SteppedLine: Story = {
  name: 'Stepped Line Graph',
  args: {
    lineMode: 'stepped',
  },
};

export const Filled: Story = {
  name: 'Filled Line Graph',
  args: {
    fill: true,
  },
};

export const FilledSolid: Story = {
  name: 'Filled Solid Line Graph',
  args: {
    fill: true,
    fillMode: 'solid',
  },
};

export const FilledThreshold: Story = {
  name: 'Filled Threshold Line Graph',
  args: {
    fill: true,
    fillMode: 'threshold',
  },
};

export const Stacked: Story = {
  name: 'Stacked Line Graph',
  args: {
    showGridY: false,
    fill: true,
    fillMode: 'solid',
    stacked: true,
    legend: true,
    datasets: SAMPLE_MULTI_DATASETS,
  },
};

export const MultiSeriesTime: Story = {
  name: 'Multi-Series Line Graph',
  args: {
    showGridY: false,
    datasets: SAMPLE_MULTI_DATASETS,
    legend: true,
  },
};

export const MinHeight: Story = {
  name: 'Minimal Height Line Graph (48px)',
  args: {
    width: 72,
    height: 48,
  },
};

export const ThresholdHeight: Story = {
  name: 'Threshold Height Line Graph (192px, where labels appear)',
  args: {
    width: 288,
    height: 192,
  },
};

export const NoLabelsNoTicks: Story = {
  name: 'No Labels/ticks Line Graph (but yes 32px padding for optional points)',
  args: {
    showTickMarks: false,
    width: 288,
    height: 192,
    fill: true,
    fillMode: AreaFillMode.semitransparent,
    showPoints: true,
  },
};

export const WithLegend: Story = {
  name: 'With Legend Line Graph',
  args: {
    legend: true,
  },
};

export const MultiAxis: Story = {
  name: 'Multi-Axis Line Graph (left and right y-axes)',
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
        .datasets=${multiAxisDatasets as never}
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
    chart.width = _args.width;
    chart.height = _args.height;
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
    chart.xAxisType = XAxisType.time;
    chart.timeDisplay = TimeDisplay.minutes;
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

export const ExternalScalesBottomRight: Story = {
  name: 'External Scales (480×320, bottom + right)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    priority: {
      control: 'select',
      options: Object.values(Priority),
      description: 'Use priority-based color palette for chart and scales',
    },
  },
  args: {
    showTickMarks: false, // Chart.js ticks disabled
    width: 480,
    height: 320,
    fill: true,
    fillMode: AreaFillMode.semitransparent,
    showPoints: true,
    priority: Priority.enhanced,
  },
  render: (_args) => html`
    <obc-area-graph
      .data=${SAMPLE_DATA}
      .showTickMarks=${false}
      .showGrid=${true}
      .showGridX=${true}
      .showGridY=${true}
      .width=${480}
      .height=${320}
      .fill=${true}
      .fillMode=${_args.fillMode}
      .showPoints=${_args.showPoints}
      .priority=${_args.priority}
    >
      <obc-bar-vertical
        slot="right-scale"
        .minValue=${0}
        .maxValue=${10}
        .height=${320}
        .side=${'right'}
        .hasScale=${true}
        .hasBar=${false}
        .primaryTickmarkInterval=${2}
        .secondaryTickmarkInterval=${1}
        .priority=${_args.priority}
      ></obc-bar-vertical>
      <obc-bar-horizontal
        slot="bottom-scale"
        .minValue=${0}
        .maxValue=${12}
        .width=${480}
        .side=${'bottom'}
        .hasScale=${true}
        .hasBar=${false}
        .primaryTickmarkInterval=${2}
        .secondaryTickmarkInterval=${1}
        .priority=${_args.priority}
      ></obc-bar-horizontal>
    </obc-area-graph>
  `,
};

export const ExternalScalesAllSides: Story = {
  name: 'External Scales (800×600, all 4 sides)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
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
    vScaleHasAdvice: {
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
    hScaleHasAdvice: {
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
    width: 800,
    height: 600,
    priority: Priority.enhanced,
    // Vertical scale defaults
    vScaleHasBar: true,
    vScaleShowLabels: true,
    vScaleHasAdvice: true,
    vScaleFillMode: 'fill',
    vScaleAdvicePosition: 'inner',
    vScaleValue: 5,
    vScaleSetpoint: 5,
    vScaleFillMin: 3,
    vScaleFillMax: 5,
    // Horizontal scale defaults
    hScaleHasBar: true,
    hScaleShowLabels: true,
    hScaleHasAdvice: true,
    hScaleFillMode: 'tint',
    hScaleAdvicePosition: 'inner',
    hScaleValue: 6,
    hScaleSetpoint: 8.5,
    hScaleFillMin: 0,
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
      .borderRadiusPositionExternalScales=${BorderRadiusPosition.outerLastChild}
      .priority=${_args.priority}
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
        .fillMin=${5.5}
        .fillMax=${7}
        .value=${_args.vScaleValue}
        .setpoint=${_args.vScaleSetpoint}
        .advicePosition=${_args.vScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.vScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .advices=${_args.vScaleHasAdvice
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
      <obc-bar-vertical
        slot="right-scale"
        .minValue=${3.0}
        .maxValue=${7.0}
        .height=${_args.height}
        .side=${'right'}
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
        .advices=${_args.vScaleHasAdvice
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
        .advices=${_args.hScaleHasAdvice
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
      <obc-bar-horizontal
        slot="top-scale"
        .minValue=${0}
        .maxValue=${11}
        .width=${_args.width}
        .side=${'top'}
        .hasScale=${true}
        .showLabels=${_args.hScaleShowLabels}
        .hasBar=${_args.hScaleHasBar}
        .fillMode=${_args.hScaleFillMode === 'fill'
          ? FillMode.fill
          : FillMode.tint}
        .fillMin=${7}
        .fillMax=${11}
        .value=${_args.hScaleValue}
        .setpoint=${_args.hScaleSetpoint}
        .advicePosition=${_args.hScaleAdvicePosition === 'inner'
          ? AdvicePosition.inner
          : _args.hScaleAdvicePosition === 'center'
            ? AdvicePosition.center
            : AdvicePosition.outer}
        .advices=${_args.hScaleHasAdvice
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

export const ExternalScalesMinimal: Story = {
  name: 'External Scales (192×192, bottom + right, minimal)',
  play: async () => {
    // Wait for rendering to complete before snapshot
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  argTypes: {
    priority: {
      control: 'select',
      options: Object.values(Priority),
      description: 'Use priority-based color palette for chart and scales',
    },
  },
  args: {
    showTickMarks: false,
    width: 192,
    height: 192,
    fill: true,
    fillMode: AreaFillMode.threshold,
    showPoints: true,
    priority: Priority.enhanced,
    showLabels: true,
  },
  render: (_args) => html`
    <obc-area-graph
      .data=${SAMPLE_DATA}
      .showTickMarks=${false}
      .showGrid=${true}
      .showGridX=${true}
      .showGridY=${true}
      .width=${192}
      .height=${192}
      .fill=${true}
      .fillMode=${_args.fillMode}
      .showPoints=${_args.showPoints}
      .priority=${_args.priority}
    >
      <obc-bar-vertical
        slot="right-scale"
        .minValue=${0}
        .maxValue=${10}
        .height=${192}
        .side=${'right'}
        .hasScale=${true}
        .showLabels=${_args.showLabels}
        .hasBar=${false}
        .primaryTickmarkInterval=${2}
        .secondaryTickmarkInterval=${1}
        .priority=${_args.priority}
      ></obc-bar-vertical>
      <obc-bar-horizontal
        slot="bottom-scale"
        .minValue=${0}
        .maxValue=${12}
        .width=${192}
        .side=${'bottom'}
        .hasScale=${true}
        .showLabels=${_args.showLabels}
        .hasBar=${false}
        .primaryTickmarkInterval=${2}
        .secondaryTickmarkInterval=${1}
        .priority=${_args.priority}
      ></obc-bar-horizontal>
    </obc-area-graph>
  `,
};

export const FixedAspectRatioScaling: StoryObj = {
  name: 'Fixed Aspect Ratio Scaling (responsive)',
  tags: ['skip-test'],
  decorators: [],
  args: {
    width: 400,
    height: 300,
  },
  render: (args) => {
    const sampleData = [
      {label: 'Jan', value: 3.5},
      {label: 'Feb', value: 4.2},
      {label: 'Mar', value: 5},
      {label: 'Apr', value: 4},
      {label: 'May', value: 7},
      {label: 'Jun', value: 3},
    ];

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
          color: var(--instrument-frame-secondary-color);
          padding: 12px;
          background: var(--container-background-color);
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .comparison-container {
          padding: 16px;
          resize: both;
          overflow: auto;
          min-width: 200px;
          min-height: 200px;
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
              <strong>Left (fixedAspectRatioScaling=false):</strong> Chart stays
              at fixed ${args.width}×${args.height}px regardless of container
              size.
            </li>
            <li>
              <strong>Right (fixedAspectRatioScaling=true):</strong> Chart fills
              container width, height computed from ${args.width}:${args.height}
              aspect ratio.
            </li>
          </ul>
        </div>

        <!-- Left: fixedAspectRatioScaling=false -->
        <div class="comparison-container container-normal">
          <div class="comparison-label label-normal">
            fixedAspectRatioScaling=false (default, fixed pixel size)
          </div>
          <obc-area-graph
            .data=${sampleData}
            .width=${args.width}
            .height=${args.height}
            .showGrid=${true}
            .showGridX=${true}
            .showGridY=${true}
            .fill=${true}
            .fillMode=${'semitransparent'}
            .showPoints=${true}
            .priority=${Priority.regular}
            .fixedAspectRatioScaling=${false}
          ></obc-area-graph>
        </div>

        <!-- Right: fixedAspectRatioScaling=true -->
        <div class="comparison-container container-fixed">
          <div class="comparison-label label-fixed">
            fixedAspectRatioScaling=true (responsive, fills width)
          </div>
          <obc-area-graph
            style="width: 100%;"
            .data=${sampleData}
            .width=${args.width}
            .height=${args.height}
            .showGrid=${true}
            .showGridX=${true}
            .showGridY=${true}
            .fill=${true}
            .fillMode=${'semitransparent'}
            .showPoints=${true}
            .priority=${Priority.enhanced}
            .fixedAspectRatioScaling=${true}
          ></obc-area-graph>
        </div>
      </div>
    `;
  },
};
