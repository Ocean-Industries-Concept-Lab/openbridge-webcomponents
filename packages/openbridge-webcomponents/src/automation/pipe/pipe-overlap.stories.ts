import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPipeOverlap} from './pipe-overlap.js';
import './pipe-overlap.js';

const meta: Meta<typeof ObcPipeOverlap> = {
  title: 'Automation/Pipe/Overlap',
  component: 'obc-pipe-overlap',
  tags: ['autodocs', '6.0'],
  parameters: {layout: 'centered'},
  argTypes: {
    value: {
      options: [
        'open-flow',
        'open-generic',
        'empty',
        'medium-flow',
        'enhanced',
        'running',
        'closed',
        'closed-dash',
      ],
      control: {type: 'select'},
    },
    size: {
      options: ['small', 'medium', 'large', 'xl'],
      control: {type: 'radio'},
    },
    mediumColor: {
      options: [
        'Neutral',
        'Enhanced',
        'Blue',
        'Cyan',
        'Teal',
        'Green',
        'Yellow',
        'Orange',
        'Red',
        'Purple',
        'Indigo',
      ],
      control: {type: 'select'},
    },
    direction: {
      options: ['horizontal', 'vertical'],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<ObcPipeOverlap>;

export default meta;
type Story = StoryObj<ObcPipeOverlap>;

export const Default: Story = {
  args: {
    value: 'open-flow',
    size: 'medium',
    direction: 'vertical',
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    direction: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    direction: 'horizontal',
  },
};

export const MediumFlow: Story = {
  args: {
    ...Default.args,
    value: 'medium-flow',
    mediumColor: 'Teal',
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    value: 'closed',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Xl: Story = {
  args: {
    ...Default.args,
    size: 'xl',
  },
};
