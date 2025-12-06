import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
// Import concrete implementation for demonstration (base class is abstract)
import '../../bars-graphs/area-graph/area-graph.js';

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
  title: 'Building Blocks/Line-Area Chart Base',
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
      .fill=${_args.fill}
      .fillMode=${_args.fillMode}
      .stacked=${_args.stacked}
      .legend=${_args.legend}
      .showDebugOverlay=${_args.showDebugOverlay}
      .fixedHeight=${_args.fixedHeight}
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
    xAxisType: {control: {type: 'radio'}, options: ['category', 'time']},
    yAxisPosition: {control: {type: 'radio'}, options: ['left', 'right']},
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
      options: ['smooth', 'straight', 'stepped'],
    },
    timeDisplay: {control: {type: 'radio'}, options: ['minutes', 'date']},
    showPoints: {
      control: 'boolean',
      description: 'Show point markers (default: false)',
    },
    fill: {control: 'boolean'},
    fillMode: {
      control: {type: 'radio'},
      options: ['semitransparent', 'solid', 'threshold'],
      description: 'Threshold mode auto-calculates midpoint (min+max)/2',
      if: {arg: 'fill', truthy: true},
    },
    stacked: {
      control: 'boolean',
      description: 'Enable stacked mode for multi-series datasets',
    },
    colors: {control: 'object'},
    legend: {control: 'boolean'},
    showDebugOverlay: {control: 'boolean'},
    fixedHeight: {
      control: {type: 'range', min: 48, max: 512},
      description:
        'Fixed height of the chart in pixels (mandatory, determines chart size)',
    },
  },
  args: {
    data: SAMPLE_DATA,
    datasets: undefined,
    labels: undefined,
    xAxisType: 'category',
    yAxisPosition: 'left',
    showGrid: true,
    showGridX: true,
    showGridY: true,
    showTickMarks: true,
    xTicksLimit: undefined,
    xStepSize: undefined,
    yTicksLimit: undefined,
    yStepSize: undefined,
    showPoints: false,
    fill: false,
    fillMode: 'semitransparent',
    lineMode: 'smooth',
    timeDisplay: 'minutes',
    stacked: false,
    colors: [],
    legend: false,
    showDebugOverlay: false,
    fixedHeight: 320,
  },
};

export default meta;

type Story = StoryObj;

export const SingleSeries: Story = {
  name: 'Single-series line graph (category)',
};

export const WithPoints: Story = {
  name: 'With points line graph',
  args: {
    showPoints: true,
  },
};

export const StraightLine: Story = {
  name: 'Straight line graph',
  args: {
    lineMode: 'straight',
  },
};

export const SteppedLine: Story = {
  name: 'Stepped line graph',
  args: {
    lineMode: 'stepped',
  },
};

export const Filled: Story = {
  name: 'Filled line graph',
  args: {
    fill: true,
  },
};

export const FilledSolid: Story = {
  name: 'Filled solid line graph',
  args: {
    fill: true,
    fillMode: 'solid',
  },
};

export const FilledThreshold: Story = {
  name: 'Filled threshold line graph',
  args: {
    fill: true,
    fillMode: 'threshold',
  },
};

export const Stacked: Story = {
  name: 'Stacked line graph',
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
  name: 'Multi-series line graph',
  args: {
    showGridY: false,
    datasets: SAMPLE_MULTI_DATASETS,
    legend: true,
  },
};

export const MinHeight: Story = {
  name: 'Minimal height line graph (48px)',
  args: {
    fixedHeight: 48,
  },
};

export const ThresholdHeight: Story = {
  name: 'Threshold height line graph (192px, where labels appear)',
  args: {
    fixedHeight: 192,
  },
};

export const NoLabelsNoTicks: Story = {
  name: 'No labels/ticks line graph (but yes 32px padding for optional points)',
  args: {
    showTickMarks: false,
    fixedHeight: 192,
    fill: true,
    fillMode: 'semitransparent',
    showPoints: true,
  },
};

export const WithLegend: Story = {
  name: 'With legend line graph',
  args: {
    legend: true,
  },
};

export const MultiAxis: Story = {
  name: 'Multi-axis line graph (left and right y-axes)',
  render: (_args) => html`
    <obc-area-graph
      .labels=${[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]}
      .yAxes=${[
        {id: 'y-temp', position: 'left' as const, min: 0, max: 100},
        {id: 'y-pressure', position: 'right' as const, min: 0, max: 10},
      ]}
      .datasets=${[
        {
          label: 'Temperature',
          data: [20, 25, 30, 28, 35, 40, 38, 42, 45, 50, 48, 52],
          yAxisID: 'y-temp',
        },
        {
          label: 'Pressure',
          data: [2, 3, 2.5, 4, 3.5, 5, 4.5, 6, 5.5, 7, 6.5, 8],
          yAxisID: 'y-pressure',
        },
      ]}
      .legend=${true}
      .showDebugOverlay=${_args.showDebugOverlay}
      .fixedHeight=${_args.fixedHeight}
    ></obc-area-graph>
  `,
};

export const CustomColors: Story = {
  args: {
    datasets: SAMPLE_MULTI_DATASETS,
    colors: ['#e74c3c', '#3498db', '#2ecc71'],
    legend: true,
  },
};

export const RealtimeSqueezing: Story = {
  name: 'Realtime (squeezing)',
  tags: ['skip-snapshot'],
  render: (_args) => {
    const chart = document.createElement('obc-area-graph');
    chart.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
    chart.showDebugOverlay = _args.showDebugOverlay;
    chart.showGridY = _args.showGridY;
    chart.fixedHeight = _args.fixedHeight;

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
  tags: ['skip-snapshot'],
  render: (_args) => {
    const chart = document.createElement('obc-area-graph');
    chart.showDebugOverlay = _args.showDebugOverlay;
    chart.showGridY = false;
    chart.fixedHeight = _args.fixedHeight;
    chart.xAxisType = 'time';
    chart.timeDisplay = 'minutes';

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

export const ExternalAxisOverlay: Story = {
  name: 'External SVG axis overlay (scales-updated event)',
  tags: ['skip-snapshot'],
  args: {
    showTickMarks: false, // Hide Chart.js labels/ticks
    fixedHeight: 320,
    fill: true,
    fillMode: 'semitransparent',
    yTicksLimit: 6, // Match external axis
    yStepSize: 2, // Force 2-unit intervals
  },
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
      '<p style="margin: 0 0 8px 0; font-weight: bold;">📊 Scale Info (updates on resize/data change):</p>';

    const scaleInfoList = document.createElement('ul');
    scaleInfoList.style.margin = '0';
    scaleInfoList.style.padding = '0 0 0 20px';
    scaleInfoList.style.listStyle = 'none';
    infoPanel.appendChild(scaleInfoList);

    // Chart wrapper with SVG overlay
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '480px';

    const chart = document.createElement('obc-area-graph');
    chart.data = SAMPLE_DATA;
    chart.showTickMarks = _args.showTickMarks;
    chart.fixedHeight = _args.fixedHeight;
    chart.fill = _args.fill;
    chart.fillMode = _args.fillMode;
    if (_args.yTicksLimit) chart.yTicksLimit = _args.yTicksLimit;
    if (_args.yStepSize) chart.yStepSize = _args.yStepSize;

    // Create SVG overlay for custom axes
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';

    // Listen for scale updates
    chart.addEventListener('scales-updated', (e) => {
      const detail = (e as CustomEvent).detail;
      const {x, y, padding, canvas, config} = detail;

      // Update info panel
      scaleInfoList.innerHTML = `
        <li>• <strong>X-axis:</strong> ${x.min.toFixed(1)} → ${x.max.toFixed(1)} (${x.type}) [${x.left}px → ${x.right}px]</li>
        <li>• <strong>Y-axis:</strong> ${y.min.toFixed(1)} → ${y.max.toFixed(1)} [${y.top}px → ${y.bottom}px]</li>
        <li>• <strong>Canvas:</strong> ${canvas.width}px × ${canvas.height}px</li>
        <li>• <strong>Padding:</strong> T:${padding.top} R:${padding.right} B:${padding.bottom} L:${padding.left}</li>
        <li>• <strong>Chart area:</strong> ${x.right - x.left}px × ${y.bottom - y.top}px</li>
        <li>• <strong>Config:</strong> xTicks:${config.xTicksLimit ?? 'auto'} xStep:${config.xStepSize ?? 'auto'} yTicks:${config.yTicksLimit ?? 'auto'} yStep:${config.yStepSize ?? 'auto'}</li>
      `;

      // Clear previous axes
      svg.innerHTML = '';

      // Use values from ScaleInfo (no manual calculation needed!)
      const chartLeft = x.left;
      const chartRight = x.right;
      const chartTop = y.top;
      const chartBottom = y.bottom;
      const chartWidth = chartRight - chartLeft;
      const chartHeight = chartBottom - chartTop;

      // Draw Y-axis labels (left side) - matching Chart.js scale exactly
      const ySteps = 5;
      for (let i = 0; i <= ySteps; i++) {
        const value = y.min + (y.max - y.min) * (i / ySteps);
        const yPos = chartBottom - (chartHeight * i) / ySteps;

        const text = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        );
        text.setAttribute('x', (chartLeft - 8).toString());
        text.setAttribute('y', yPos.toString());
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#FF6B6B');
        text.setAttribute('font-size', '12px');
        text.setAttribute('font-weight', 'bold');
        text.textContent = value.toFixed(1);
        svg.appendChild(text);
      }

      // Draw X-axis labels (bottom)
      if (x.type === 'category' && x.labels) {
        const xSteps = Math.min(x.labels.length, 6);
        const skipEvery = Math.ceil(x.labels.length / xSteps);

        x.labels.forEach((label: string, i: number) => {
          if (i % skipEvery !== 0) return;

          const xPos = chartLeft + (chartWidth * i) / (x.labels!.length - 1);

          const text = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text'
          );
          text.setAttribute('x', xPos.toString());
          text.setAttribute('y', (chartBottom + 20).toString());
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('fill', '#4ECDC4');
          text.setAttribute('font-size', '12px');
          text.setAttribute('font-weight', 'bold');
          text.textContent = label;
          svg.appendChild(text);
        });
      }
    });

    wrapper.appendChild(chart);
    wrapper.appendChild(svg);
    container.appendChild(infoPanel);
    container.appendChild(wrapper);
    return container;
  },
};
