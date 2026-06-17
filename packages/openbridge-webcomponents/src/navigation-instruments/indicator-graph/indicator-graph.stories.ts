import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcIndicatorGraph,
  ObcIndicatorGraphPriority,
  ObcIndicatorGraphSize,
} from './indicator-graph.js';
import './indicator-graph.js';
import {widthDecorator} from '../../storybook-util.js';
const meta: Meta<typeof ObcIndicatorGraph> = {
  title: 'Bars and Graphs/Indicator Graph',
  tags: ['6.0', 'autodocs'],
  component: 'obc-indicator-graph',
  decorators: [widthDecorator],
  args: {
    data: [
      Array.from({length: 30}, (_, i) => i),
      Array.from({length: 30}, (_, i) => 2 + Math.sin((i / 30) * 2 * Math.PI)),
    ],
    width: 400,
    height: 400,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    height: {control: {type: 'range', min: 100, max: 1000, step: 1}},
  },
} satisfies Meta<ObcIndicatorGraph>;

export default meta;
type Story = StoryObj<ObcIndicatorGraph>;

export const Primary: Story = {};

export const NoZeroLine: Story = {
  args: {
    layout: {
      y: {showZeroLine: false},
    },
  },
};

export const WithRange: Story = {
  args: {
    layout: {
      size: ObcIndicatorGraphSize.medium,
      priority: ObcIndicatorGraphPriority.regular,
      y: {min: -10, max: 10},
    },
  },
};

export const Enhanced: Story = {
  args: {
    layout: {
      size: ObcIndicatorGraphSize.medium,
      priority: ObcIndicatorGraphPriority.enhanced,
    },
  },
};

export const Small: Story = {
  args: {
    layout: {
      size: ObcIndicatorGraphSize.small,
    },
  },
};

export const Medium: Story = {
  args: {
    layout: {
      size: ObcIndicatorGraphSize.medium,
    },
  },
};

export const Large: Story = {
  args: {
    layout: {
      size: ObcIndicatorGraphSize.large,
    },
  },
};

export const Realtime: Story = {
  tags: ['skip-test'],
  args: {
    data: [
      Array.from({length: 60}, (_, i) => i),
      Array.from(
        {length: 60},
        (_, i) => 2 + Math.sin((i / 60 / 5) * 2 * Math.PI)
      ),
    ],
    layout: {
      size: ObcIndicatorGraphSize.medium,
      priority: ObcIndicatorGraphPriority.regular,
      y: {max: 4},
    },
  },
  play: async ({canvasElement}) => {
    const graph = canvasElement.querySelector(
      'obc-indicator-graph'
    ) as ObcIndicatorGraph;
    if (!graph) {
      throw new Error('Graph not found');
    }

    let i = graph.data[0].length;
    const intervalId = setInterval(() => {
      if (!graph.isConnected) {
        clearInterval(intervalId);
        return;
      }
      const data = graph.data;
      const x = [...data[0], i];
      const y = [...data[1], 2 + Math.sin((i / 60 / 5) * 2 * Math.PI)];
      x.shift();
      y.shift();
      const newData: [number[], number[]] = [x, y];
      graph.data = newData;
      i++;
    }, 1000 / 60);
  },
};

// Regression: changing priority after the first render must update the stroke
// color. The story starts as `regular` and switches to `enhanced` in `play`, so
// the baseline captures the enhanced color the dynamic update produced.
export const ChangePriority: Story = {
  args: {
    layout: {
      size: ObcIndicatorGraphSize.medium,
      priority: ObcIndicatorGraphPriority.regular,
    },
  },
  play: async ({canvasElement}) => {
    const graph = canvasElement.querySelector(
      'obc-indicator-graph'
    ) as ObcIndicatorGraph;
    if (!graph) {
      throw new Error('Graph not found');
    }
    graph.layout = {
      size: ObcIndicatorGraphSize.medium,
      priority: ObcIndicatorGraphPriority.enhanced,
    };
    await graph.updateComplete;
  },
};

export const BelowZero: Story = {
  args: {
    data: [
      Array.from({length: 30}, (_, i) => i),
      Array.from({length: 30}, (_, i) => -2 - Math.sin((i / 30) * 2 * Math.PI)),
    ],
    layout: {
      y: {min: -10, max: 0},
    },
  },
};
