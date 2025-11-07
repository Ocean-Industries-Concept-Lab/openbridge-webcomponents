import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './radial-bar-chart.js';
import {ObcRadialBarChart} from './radial-bar-chart.js';

const SAMPLE_DATA = [70, 50, 30];

const meta: Meta = {
  title: 'Bars and Graphs/Radial Bar Chart',
  component: 'obc-radial-bar-chart',
  tags: ['autodocs', '6.0'],
  argTypes: {
    fixedHeight: {
      control: {type: 'range', min: 48, max: 512, step: 8},
      description:
        'Fixed height of the chart in pixels (mandatory, determines chart circumference)',
    },
    data: {control: 'object'},
    colors: {control: 'object'},
    max: {control: {type: 'range', min: 50, max: 200, step: 10}},
    circumference: {
      control: {type: 'select'},
      options: [360, 270],
    },
    minRingThickness: {
      control: {type: 'range', min: 8, max: 32, step: 2},
      description:
        'Minimum thickness of each ring in pixels (excluding borders). Rings maintain equal thickness and cutout adjusts automatically (max 60%, min 20%).',
    },
    showDebugOverlay: {control: 'boolean'},
    legend: {control: 'boolean'},
  },
  args: {
    fixedHeight: 320,
    data: SAMPLE_DATA,
    colors: [],
    max: 100,
    circumference: 270,
    minRingThickness: 16,
    showDebugOverlay: false,
    legend: false,
  },
};

export default meta;

type Story = StoryObj<ObcRadialBarChart>;

export const Default: Story = {
  name: 'Default radial bar',
  render: (args) => html`
    <obc-radial-bar-chart
      .data=${args.data}
      .colors=${args.colors}
      .max=${args.max}
      .circumference=${args.circumference}
      .minRingThickness=${args.minRingThickness}
      .showDebugOverlay=${args.showDebugOverlay}
      .fixedHeight=${args.fixedHeight}
      .legend=${args.legend}
    ></obc-radial-bar-chart>
  `,
};

export const FullCircle: Story = {
  name: 'Full circle radial bar (360°)',
  args: {
    circumference: 360,
  },
};

export const MinHeight: Story = {
  name: 'Minimal height radial bar (48px)',
  args: {
    fixedHeight: 48,
  },
};

export const ManyRings: Story = {
  name: 'Many rings radial bar',
  args: {
    data: [90, 75, 60, 45, 30],
  },
};

export const AutoShrinkRings: Story = {
  name: 'Auto-shrink ring thickness (8 rings)',
  args: {
    data: [95, 90, 85, 80, 75, 70, 65, 60],
  },
};

export const WithLegend: Story = {
  name: 'With legend radial bar',
  args: {
    legend: true,
  },
};

export const CustomColors: Story = {
  name: 'Custom colors radial bar',
  args: {
    colors: ['#e74c3c', '#3498db', '#2ecc71'],
  },
};

export const Realtime: Story = {
  name: 'Realtime radial bar',
  tags: ['skip-snapshot'],
  args: {
    fixedHeight: 320,
  },
  render: (args) => {
    const chart = document.createElement('obc-radial-bar-chart');
    chart.data = [...args.data];
    chart.max = args.max;
    chart.circumference = args.circumference;
    chart.minRingThickness = args.minRingThickness;
    chart.fixedHeight = args.fixedHeight;

    setInterval(() => {
      const newData = chart.data.map((value) =>
        Math.max(
          1,
          Math.min(args.max, value + Math.floor(Math.random() * 20 - 10))
        )
      );
      chart.data = newData;
    }, 2000);

    return chart;
  },
};
