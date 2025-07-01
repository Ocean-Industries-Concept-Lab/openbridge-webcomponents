import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcGraphMini} from './graph-mini.js';
import './graph-mini.js';

const meta: Meta<typeof ObcGraphMini> = {
  title: 'Bars and Graphs/Graph mini',
  tags: ['6.0'],
  component: 'obc-graph-mini',
  args: {
    data: [
      Array.from({length: 30}, (_, i) => i),
      Array.from({length: 30}, (_, i) => Math.sin((i / 30) * 2 * Math.PI)),
    ],
  },
} satisfies Meta<ObcGraphMini>;

export default meta;
type Story = StoryObj<ObcGraphMini>;

export const Primary: Story = {};

export const Realtime: Story = {
  tags: ['skip-snapshot'],
  args: {
    data: [
      Array.from({length: 60}, (_, i) => i),
      Array.from({length: 60}, (_, i) => Math.sin((i / 60) * 2 * Math.PI)),
    ],
  },
  play: async ({canvasElement}) => {
    const graph = canvasElement.querySelector('obc-graph-mini') as ObcGraphMini;
    if (!graph) {
      throw new Error('Graph not found');
    }

    let i = graph.data[0].length;
    setInterval(() => {
      console.log('updating', i);
      const data = graph.data;
      const x = [...data[0], i];
      const y = [...data[1], Math.sin((i / 60) * 2 * Math.PI)];
      x.shift();
      y.shift();
      const newData: [number[], number[]] = [x, y];
      graph.data = newData;
      i++;
    }, 1000 / 60);
  },
};
