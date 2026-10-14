import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {widthDecorator} from '../../storybook-util.js';
import "./logging-graph.js";

const meta: Meta<typeof LoggingGraph> = {
  title: 'GRAPHS/LoggingGraph',
  tags: ['autodocs', '6.0'],
  component: 'ob-logging-graph-skipper',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  args: {
    width: 512
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<LoggingGraph>;

export default meta;
type Story = StoryObj<LoggingGraph>;

export const Default: Story = {
  args: {},
};

export const LoggingGraph: Story = {
  args: {
    width: 1024,
    height: 512,
    nameOfFunctionOne: 'Blue data',
    nameOfFunctionTwo: 'Green data',
    timeScale: '1h',
    showFunctionOne: true,
    showFunctionTwo: false
  },
};
