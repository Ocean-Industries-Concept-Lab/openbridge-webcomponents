import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './donut-chart-svg.js';
import {ObcDonutChartSvg} from './donut-chart-svg.js';

const SAMPLE_DATA = [
  {label: 'Sector A', value: 33},
  {label: 'Sector B', value: 25},
  {label: 'Sector C', value: 12},
  {label: 'Sector D', value: 8},
  {label: 'Sector E', value: 4},
];

const meta: Meta<typeof ObcDonutChartSvg> = {
  title: 'Bars and Graphs/Donut Chart (using SVG)',
  component: 'obc-donut-chart-svg',
  tags: ['6.0'],
  argTypes: {
    half: {control: 'boolean'},
    showPercentLabels: {control: 'boolean'},
    data: {control: 'object'},
    colors: {control: 'object'},
    max: {control: 'number'},
    size: {control: {type: 'range', min: 100, max: 600, step: 10}},
    thickness: {control: {type: 'range', min: 10, max: 60, step: 2}},
    gap: {control: {type: 'range', min: 0, max: 10, step: 1}},
  },
  args: {
    half: false,
    showPercentLabels: true,
    data: SAMPLE_DATA,
    colors: [],
    max: 100,
    size: 220,
    thickness: 28,
    gap: 2,
  },
} satisfies Meta<ObcDonutChartSvg>;

export default meta;

type Story = StoryObj<ObcDonutChartSvg>;

export const FullDonut: Story = {
  render: (args) => html`
    <obc-donut-chart-svg
      .data=${args.data}
      .colors=${args.colors}
      .half=${args.half}
      .max=${args.max}
      .size=${args.size}
      .thickness=${args.thickness}
      .gap=${args.gap}
      .showPercentLabels=${args.showPercentLabels}
    ></obc-donut-chart-svg>
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
    const chart = document.createElement('obc-donut-chart-svg');
    chart.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
    chart.half = args.half;
    chart.max = args.max;

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
