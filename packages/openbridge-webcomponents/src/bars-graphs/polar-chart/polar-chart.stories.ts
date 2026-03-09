import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './polar-chart.js';
import {ObcPolarChart} from './polar-chart.js';
import {Priority} from '../../navigation-instruments/types.js';

const SAMPLE_DATA = [
  {label: 'Sector A', value: 80},
  {label: 'Sector B', value: 60},
  {label: 'Sector C', value: 80},
  {label: 'Sector D', value: 60},
  {label: 'Sector E', value: 40},
  {label: 'Sector F', value: 20},
  {label: 'Sector G', value: 40},
  {label: 'Sector H', value: 60},
  {label: 'Sector I', value: 80},
  {label: 'Sector J', value: 60},
  {label: 'Sector K', value: 93},
  {label: 'Sector L', value: 100},
];

const meta: Meta = {
  title: 'Bars and Graphs/Polar Chart',
  component: 'obc-polar-chart',
  tags: ['autodocs', '6.0'],
  argTypes: {
    fixedHeight: {
      control: {type: 'range', min: 48, max: 512, step: 8},
      description:
        'Fixed height of the chart in pixels (mandatory, determines chart circumference)',
    },
    monochrome: {
      control: 'boolean',
      if: {arg: 'discreteColorStops', truthy: false},
    },
    discreteColorStops: {control: 'boolean'},
    showSectorLabels: {control: 'boolean'},
    showOuterLabels: {control: 'boolean'},
    outerLabelUnit: {
      control: 'text',
      if: {arg: 'showSectorLabels', truthy: false},
    },
    showUnit: {
      control: 'boolean',
      if: {arg: 'showSectorLabels', truthy: false},
    },
    outerLabelMaxLength: {control: {type: 'number', min: 0, max: 64, step: 1}},
    outerLabelDecimalPlaces: {
      control: {type: 'number', min: 0, max: 4, step: 1},
      if: {arg: 'showSectorLabels', truthy: false},
    },
    showDebugOverlay: {control: 'boolean'},
    data: {control: 'object'},
    colors: {control: 'object'},
    priority: {
      control: 'select',
      options: Object.values(Priority),
      description:
        'Use enhanced color palette (blue) instead of default (gray)',
    },
    legend: {control: 'boolean'},
  },
  args: {
    fixedHeight: 320,
    monochrome: false,
    discreteColorStops: false,
    showSectorLabels: false,
    showOuterLabels: true, // Component defaults to false, but stories show labels by default
    outerLabelUnit: '°',
    showUnit: true, // Component defaults to false, but stories show unit by default
    outerLabelMaxLength: 0,
    outerLabelDecimalPlaces: 0,
    showDebugOverlay: false,
    data: SAMPLE_DATA,
    colors: [],
    priority: Priority.enhanced,
    legend: false,
  },
};

export default meta;

type Story = StoryObj<ObcPolarChart>;

export const Default: Story = {
  name: 'Default polar',
  render: (args) => html`
    <obc-polar-chart
      .data=${args.data}
      .colors=${args.colors}
      .priority=${args.priority}
      .monochrome=${args.monochrome}
      .discreteColorStops=${args.discreteColorStops}
      .showSectorLabels=${args.showSectorLabels}
      .showOuterLabels=${args.showOuterLabels}
      .outerLabelUnit=${args.outerLabelUnit}
      .showUnit=${args.showUnit}
      .outerLabelMaxLength=${args.outerLabelMaxLength}
      .outerLabelDecimalPlaces=${args.outerLabelDecimalPlaces}
      .showDebugOverlay=${args.showDebugOverlay}
      .fixedHeight=${args.fixedHeight}
      .legend=${args.legend}
    ></obc-polar-chart>
  `,
};

export const Monochrome: Story = {
  name: 'Monochrome polar',
  args: {
    monochrome: true,
  },
};

export const DiscreteColorStops: Story = {
  name: 'Discrete color stops polar',
  args: {
    discreteColorStops: true,
  },
};

export const MinHeight: Story = {
  name: 'Minimal height polar (48px)',
  args: {
    fixedHeight: 48,
  },
};

export const ThresholdHeight: Story = {
  name: 'Threshold height polar (192px, where labels appear)',
  args: {
    fixedHeight: 192,
  },
};

export const WithAnglesAndDegreeSymbol: Story = {
  name: 'With angles and degree symbol polar',
  args: {
    showSectorLabels: false,
    showOuterLabels: true,
    outerLabelUnit: '°',
    showUnit: true,
    outerLabelDecimalPlaces: 0,
  },
};

export const WithSectorLabels: Story = {
  name: 'With sector labels polar (no angles)',
  args: {
    showSectorLabels: true,
    showOuterLabels: true,
    outerLabelMaxLength: 10,
  },
};

export const WithLegend: Story = {
  name: 'With legend polar',
  args: {
    legend: true,
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
    priority: Priority.regular,
  },
};

export const Realtime: Story = {
  tags: ['!snapshot'],
  args: {
    fixedHeight: 320,
  },
  render: (args) => {
    const chart = document.createElement('obc-polar-chart');
    chart.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
    chart.priority = args.priority;
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
