import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './pie-chart.js';

const SUNBURST_DATA = [
  {
    label: 'Sector A',
    value: 50,
    children: [
      {label: 'A1', value: 25},
      {label: 'A2', value: 15},
      {label: 'A3', value: 10},
    ],
  },
  {
    label: 'Sector B',
    value: 25,
    children: [
      {label: 'B1', value: 15},
      {label: 'B2', value: 10},
    ],
  },
  {
    label: 'Sector C',
    value: 12.5,
    children: [
      {label: 'C1', value: 5.5},
      {label: 'C2', value: 7},
    ],
  },
  {
    label: 'Sector D',
    value: 12.5,
    children: [
      {label: 'D1', value: 2.5},
      {label: 'D2', value: 10},
    ],
  },
];

const meta: Meta = {
  title: 'Bars and Graphs/Pie chart',
  component: 'obc-pie-chart',
  tags: ['autodocs', '6.0'],
  argTypes: {
    fixedHeight: {
      control: {type: 'range', min: 48, max: 512},
      description:
        'Fixed height of the chart in pixels (mandatory, determines chart circumference)',
    },
    showOuterLabels: {control: 'boolean'},
    showUnit: {
      control: 'boolean',
      if: {arg: 'showOuterLabels', truthy: true},
    },
    outerLabelUnit: {control: 'text'},
    outerLabelMaxLength: {control: {type: 'number', min: 0, max: 64, step: 1}},
    outerLabelDecimalPlaces: {
      control: {type: 'number', min: 0, max: 4, step: 1},
    },
    showDebugOverlay: {control: 'boolean'},
    sunburst: {control: 'boolean'},
    data: {control: 'object'},
    colors: {control: 'object'},
    legend: {control: 'boolean'},
  },
  args: {
    fixedHeight: 320,
    showOuterLabels: true,
    showUnit: true,
    outerLabelUnit: '%',
    outerLabelMaxLength: 0,
    outerLabelDecimalPlaces: 0,
    showDebugOverlay: false,
    sunburst: false,
    data: SUNBURST_DATA,
    colors: [],
    legend: false,
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  name: 'Default pie',
  tags: ['!snapshot'],
  render: (args) => html`
    <obc-pie-chart
      .data=${args.data}
      .colors=${args.colors}
      .showOuterLabels=${args.showOuterLabels}
      .showUnit=${args.showUnit}
      .outerLabelUnit=${args.outerLabelUnit}
      .outerLabelMaxLength=${args.outerLabelMaxLength}
      .outerLabelDecimalPlaces=${args.outerLabelDecimalPlaces}
      .showDebugOverlay=${args.showDebugOverlay}
      .sunburst=${args.sunburst}
      .fixedHeight=${args.fixedHeight}
      .legend=${args.legend}
    ></obc-pie-chart>
  `,
};

export const Sunburst: Story = {
  name: 'Sunburst subsegments pie (click interaction)',
  args: {
    sunburst: true,
    data: SUNBURST_DATA,
  },
};

export const LongUnit: Story = {
  name: 'Long label unit pie',
  args: {
    showOuterLabels: true,
    outerLabelUnit: ' km/h-unbelievably-long',
    showUnit: true,
  },
};

export const TrimLabels: Story = {
  name: 'Trim label length pie',
  args: {
    showOuterLabels: true,
    outerLabelUnit: ' km/h-unbelievably-long',
    outerLabelMaxLength: 10,
  },
};

export const WithDecimals: Story = {
  name: 'Decimal places pie',
  args: {
    showOuterLabels: true,
    outerLabelDecimalPlaces: 2,
  },
};

export const MinHeight: Story = {
  name: 'Minimal height pie (48px)',
  args: {
    fixedHeight: 48,
  },
};

export const ThresholdHeight: Story = {
  name: 'Threshold height pie (192px, where labels appear)',
  args: {
    fixedHeight: 192,
  },
};

export const WithLegend: Story = {
  name: 'With legend pie',
  args: {
    legend: true,
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
  },
};

export const Realtime: Story = {
  tags: ['!snapshot'],
  render: (args) => {
    const chart = document.createElement('obc-pie-chart');
    chart.data = JSON.parse(JSON.stringify(SUNBURST_DATA));
    chart.showOuterLabels = args.showOuterLabels;
    chart.showUnit = args.showUnit;
    chart.outerLabelUnit = args.outerLabelUnit;
    chart.outerLabelMaxLength = args.outerLabelMaxLength;
    chart.outerLabelDecimalPlaces = args.outerLabelDecimalPlaces;
    chart.showDebugOverlay = args.showDebugOverlay;
    chart.fixedHeight = args.fixedHeight;

    setInterval(() => {
      const newData = chart.data.map((d) => ({
        ...d,
        value: Math.max(1, d.value + Math.floor(Math.random() * 10 - 5)),
      }));
      chart.data = newData;
    }, 2000);

    return chart;
  },
};
