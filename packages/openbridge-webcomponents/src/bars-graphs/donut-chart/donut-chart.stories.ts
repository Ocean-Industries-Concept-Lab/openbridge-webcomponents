import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './donut-chart.js';

const SAMPLE_DATA = [
  {label: 'Sector A', value: 50},
  {label: 'Sector B', value: 7},
  {label: 'Sector C', value: 12.5},
  {label: 'Sector D', value: 8},
  {label: 'Sector E', value: 4.5},
];

const meta: Meta = {
  title: 'Bars and Graphs/Donut chart',
  component: 'obc-donut-chart',
  tags: ['autodocs', '6.0'],
  argTypes: {
    fixedHeight: {
      control: {type: 'range', min: 48, max: 512},
      description:
        'Fixed height of the chart in pixels (mandatory, determines chart circumference)',
    },
    half: {control: 'boolean'},
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
    centerReadoutLabel: {control: 'text'},
    centerReadoutUnit: {control: 'text'},
    data: {control: 'object'},
    colors: {control: 'object'},
    enhanced: {
      control: 'boolean',
      description:
        'Use enhanced color palette (blue) instead of default (gray)',
    },
    max: {control: 'number'},
    thickness: {control: {type: 'range', min: 10, max: 60, step: 2}},
    legend: {control: 'boolean'},
  },
  args: {
    fixedHeight: 320,
    half: false,
    showOuterLabels: true,
    showUnit: true,
    outerLabelUnit: '%',
    centerReadoutUnit: '%',
    outerLabelMaxLength: 0,
    outerLabelDecimalPlaces: 0,
    showDebugOverlay: false,
    centerReadoutLabel: 'Total',
    data: SAMPLE_DATA,
    colors: [],
    enhanced: true,
    max: 100,
    thickness: 24,
    legend: false,
  },
};

export default meta;

type Story = StoryObj;

export const FullDonut: Story = {
  name: 'Full donut',
  render: (args) => html`
    <obc-donut-chart
      .data=${args.data}
      .colors=${args.colors}
      .enhanced=${args.enhanced}
      .half=${args.half}
      .max=${args.max}
      .thickness=${args.thickness}
      .showOuterLabels=${args.showOuterLabels}
      .showUnit=${args.showUnit}
      .outerLabelUnit=${args.outerLabelUnit}
      .outerLabelMaxLength=${args.outerLabelMaxLength}
      .outerLabelDecimalPlaces=${args.outerLabelDecimalPlaces}
      .showDebugOverlay=${args.showDebugOverlay}
      .centerReadoutLabel=${args.centerReadoutLabel}
      .centerReadoutUnit=${args.centerReadoutUnit}
      .fixedHeight=${args.fixedHeight}
      .legend=${args.legend}
    ></obc-donut-chart>
  `,
};

export const HalfDonut: Story = {
  name: 'Half donut',
  args: {
    half: true,
  },
};

export const HalfDonutWithoutRemaining: Story = {
  name: 'Half donut without remaining segment',
  args: {
    half: true,
    max: 50,
  },
};

export const LongUnit: Story = {
  name: 'Long label unit donut',
  args: {
    showOuterLabels: true,
    outerLabelUnit: ' km/h-unbelievably-long',
    showUnit: true,
  },
};

export const TrimLabels: Story = {
  name: 'Trim label length donut',
  args: {
    showOuterLabels: true,
    outerLabelUnit: ' km/h-unbelievably-long',
    outerLabelMaxLength: 10,
  },
};

export const WithDecimals: Story = {
  name: 'Decimal places donut',
  args: {
    showOuterLabels: true,
    outerLabelDecimalPlaces: 2,
  },
};

export const MinHeight: Story = {
  name: 'Minimal height donut (48px)',
  args: {
    fixedHeight: 48,
  },
};

export const ThresholdHeight: Story = {
  name: 'Threshold height donut (192px, where labels appear)',
  args: {
    fixedHeight: 192,
  },
};

export const WithLegend: Story = {
  name: 'With legend donut',
  args: {
    legend: true,
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
    enhanced: false,
  },
};

export const Realtime: Story = {
  tags: ['!snapshot'],
  render: (args) => {
    const chart = document.createElement('obc-donut-chart');
    chart.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
    chart.enhanced = args.enhanced;
    chart.half = args.half;
    chart.showOuterLabels = args.showOuterLabels;
    chart.showUnit = args.showUnit;
    chart.outerLabelUnit = args.outerLabelUnit;
    chart.outerLabelMaxLength = args.outerLabelMaxLength;
    chart.outerLabelDecimalPlaces = args.outerLabelDecimalPlaces;
    chart.showDebugOverlay = args.showDebugOverlay;
    chart.centerReadoutLabel = args.centerReadoutLabel;
    chart.max = args.max;
    chart.thickness = args.thickness;
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
