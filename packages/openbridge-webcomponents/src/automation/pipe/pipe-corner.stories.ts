import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPipeCorner} from './pipe-corner.js';
import './pipe-corner.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcPipeCorner> = {
  title: 'Automation/Pipe/Corner',
  component: 'obc-pipe-corner',
  tags: ['autodocs', '6.0'],
  decorators: [crossDecorator],
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
      options: ['top', 'right', 'bottom', 'left'],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<ObcPipeCorner>;

export default meta;
type Story = StoryObj<ObcPipeCorner>;

export const Default: Story = {
  args: {
    value: 'open-flow',
    size: 'medium',
    direction: 'top',
  },
};

export const Top: Story = {
  args: {
    ...Default.args,
    direction: 'top',
  },
};

export const Right: Story = {
  args: {
    ...Default.args,
    direction: 'right',
  },
};

export const Bottom: Story = {
  args: {
    ...Default.args,
    direction: 'bottom',
  },
};

export const Left: Story = {
  args: {
    ...Default.args,
    direction: 'left',
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

export const Xl: Story = {
  args: {
    ...Default.args,
    size: 'xl',
  },
};
