import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './donut-chart.js';
import {ObcDonutChart} from './donut-chart.js';
import {widthDecorator} from '../../storybook-util.js';

const SAMPLE_DATA = [
  {label: 'Sector A', value: 33},
  {label: 'Sector B', value: 25},
  {label: 'Sector C', value: 12},
  {label: 'Sector D', value: 8},
  {label: 'Sector E', value: 4},
];

const meta: Meta<typeof ObcDonutChart> = {
  title: 'Bars and Graphs/Donut Chart (using Chart.js)',
  component: 'obc-donut-chart',
  tags: ['autodocs', '6.0'],
  argTypes: {
    width: {control: {type: 'range', min: 48, max: 512, step: 1}},
    half: {control: 'boolean'},
    showOuterLabels: {control: 'boolean'},
    showPercentage: {control: 'boolean'},
    centerLabel: {control: 'text'},
    data: {control: 'object'},
    colors: {control: 'object'},
    max: {control: 'number'},
    thickness: {control: {type: 'range', min: 10, max: 60, step: 2}},
  },
  args: {
    width: 320,
    half: false,
    showOuterLabels: true,
    showPercentage: true,
    centerLabel: 'Total',
    data: SAMPLE_DATA,
    colors: [],
    max: 100,
    thickness: 24,
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcDonutChart>;

export default meta;

type Story = StoryObj<ObcDonutChart>;

export const FullDonut: Story = {
  render: (args) => html`
    <obc-donut-chart
      .data=${args.data}
      .colors=${args.colors}
      .half=${args.half}
      .max=${args.max}
      .thickness=${args.thickness}
      .showOuterLabels=${args.showOuterLabels}
      .showPercentage=${args.showPercentage}
      .centerLabel=${args.centerLabel}
    ></obc-donut-chart>
  `,
};

export const HalfDonut: Story = {
  args: {
    half: true,
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
  },
};

export const Realtime: Story = {
  tags: ['skip-snapshot'],
  render: (args) => {
    const chart = document.createElement('obc-donut-chart');
    chart.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
    chart.half = args.half;
    chart.showOuterLabels = args.showOuterLabels;
    chart.showPercentage = args.showPercentage;
    chart.centerLabel = args.centerLabel;
    chart.max = args.max;
    chart.thickness = args.thickness;

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
