import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './donut-chart.js';
import {ObcDonutChart} from './donut-chart.js';
// import {widthDecorator} from '../../storybook-util.js';

const SAMPLE_DATA = [
  {label: 'Group A', value: 33},
  {label: 'Group B', value: 25},
  {label: 'Group C', value: 12},
  {label: 'Group D', value: 8},
  {label: 'Group E', value: 4},
];

const meta: Meta<typeof ObcDonutChart> = {
  title: 'Bars and Graphs/Donut Chart (using Chart.js)',
  component: 'obc-donut-chart',
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
    // width: { control: { type: 'range', min: 32, max: 1028, step: 1 } },
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
    // width: 512,
  },
  // decorators: [widthDecorator],
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
      .size=${args.size}
      .thickness=${args.thickness}
      .gap=${args.gap}
      .showPercentLabels=${args.showPercentLabels}
    ></obc-donut-chart>
  `,
  play: async () => {
    // Wait for Chart.js animation to complete
    await new Promise((resolve) => setTimeout(resolve, 2500));
  },
};

export const HalfDonut: Story = {
  args: {
    half: true,
  },
  play: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
  },
  play: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  },
};

// export const NoGap: Story = {
//   args: {
//     gap: 0,
//   },
//   play: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   },
// };

// export const ThickDonut: Story = {
//   args: {
//     thickness: 50,
//   },
//   play: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   },
// };

// export const ThinDonut: Story = {
//   args: {
//     thickness: 15,
//   },
//   play: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   },
// };

// export const NoCenterLabel: Story = {
//   play: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   },
// };

// Responsive test story - use fullscreen mode to test
// export const ResponsiveTest: Story = {
//   render: (args) => html`
//     <div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; padding: 20px; box-sizing: border-box;">
//       <div style="text-align: center;">
//         <h3 style="margin: 0 0 10px 0; color: var(--on-normal-active-color);">Resize browser to test responsiveness</h3>
//         <p style="margin: 0; color: var(--on-normal-neutral-color);">Size: ${args.size}px | Thickness: ${args.thickness}px</p>
//       </div>
//       <obc-donut-chart
//         .data=${args.data}
//         .colors=${args.colors}
//         .half=${args.half}
//         .max=${args.max}
//         .size=${args.size}
//         .thickness=${args.thickness}
//         .gap=${args.gap}
//         .showPercentLabels=${args.showPercentLabels}
//       ></obc-donut-chart>
//     </div>
//   `,
//   parameters: {
//     layout: 'fullscreen',
//   },
// };

// Multiple sizes comparison
// export const SizeComparison: Story = {
//   render: (args) => html`
//     <div
//       style="display: flex; flex-wrap: wrap; gap: 40px; padding: 20px; align-items: center; justify-content: center;"
//     >
//       ${[120, 180, 220, 300, 400].map(
//         (size) => html`
//           <div style="text-align: center;">
//             <obc-donut-chart
//               .data=${args.data}
//               .colors=${args.colors}
//               .half=${args.half}
//               .max=${args.max}
//               .size=${size}
//               .thickness=${Math.round(size * 0.127)}
//               .gap=${args.gap}
//               .showPercentLabels=${args.showPercentLabels}
//             ></obc-donut-chart>
//             <p style="margin-top: 10px; color: var(--on-normal-neutral-color);">
//               ${size}px
//             </p>
//           </div>
//         `
//       )}
//     </div>
//   `,
//   parameters: {
//     layout: 'fullscreen',
//   },
//   play: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   },
// };

// export const HalfDonutComparison: Story = {
//   render: (args) => html`
//     <div
//       style="display: flex; flex-wrap: wrap; gap: 40px; padding: 20px; align-items: flex-start; justify-content: center;"
//     >
//       ${[120, 180, 220, 300, 400].map(
//         (size) => html`
//           <div style="text-align: center;">
//             <obc-donut-chart
//               .data=${args.data}
//               .colors=${args.colors}
//               .half=${true}
//               .max=${args.max}
//               .size=${size}
//               .thickness=${Math.round(size * 0.127)}
//               .gap=${args.gap}
//               .showPercentLabels=${args.showPercentLabels}
//             ></obc-donut-chart>
//             <p style="margin-top: 10px; color: var(--on-normal-neutral-color);">
//               ${size}px
//             </p>
//           </div>
//         `
//       )}
//     </div>
//   `,
//   parameters: {
//     layout: 'fullscreen',
//   },
//   play: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   },
// };

export const Realtime: Story = {
  tags: ['skip-snapshot'],
  render: (args) => {
    const chart = document.createElement('obc-donut-chart');
    chart.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
    chart.half = args.half;
    chart.max = args.max;
    chart.size = args.size;
    chart.thickness = args.thickness;
    chart.gap = args.gap;

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

// export const FullVsHalf: Story = {
//   tags: ['skip-snapshot'],
//   // TODO: check why this story is failing
//   render: (args) => html`
//     <div
//       style="display: flex; gap: 60px; padding: 40px; align-items: center; justify-content: center; flex-wrap: wrap;"
//     >
//       <div style="text-align: center;">
//         <h4 style="margin: 0 0 20px 0;">Full Donut</h4>
//         <obc-donut-chart
//           .data=${args.data}
//           .colors=${args.colors}
//           .half=${false}
//           .max=${args.max}
//           .size=${args.size}
//           .thickness=${args.thickness}
//           .gap=${args.gap}
//         ></obc-donut-chart>
//       </div>
//       <div style="text-align: center;">
//         <h4 style="margin: 0 0 20px 0;">Half Donut</h4>
//         <obc-donut-chart
//           .data=${args.data}
//           .colors=${args.colors}
//           .half=${true}
//           .max=${args.max}
//           .size=${args.size}
//           .thickness=${args.thickness}
//           .gap=${args.gap}
//         ></obc-donut-chart>
//       </div>
//     </div>
//   `,
//   play: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   },
// };
