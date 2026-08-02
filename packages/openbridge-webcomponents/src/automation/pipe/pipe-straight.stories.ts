import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPipeStraight} from './pipe-straight.js';
import './pipe-straight.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcPipeStraight> = {
  title: 'Automation/Pipe/Straight',
  component: 'obc-pipe-straight',
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
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {type: 'radio'},
    },
    length: {
      control: {type: 'number', min: 1, max: 10, step: 1},
    },
  },
} satisfies Meta<ObcPipeStraight>;

export default meta;
type Story = StoryObj<ObcPipeStraight>;

export const Default: Story = {
  args: {
    value: 'open-flow',
    size: 'medium',
    length: 3,
    orientation: 'horizontal',
  },
};

export const Open: Story = {
  args: {
    ...Default.args,
    value: 'open-flow',
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    value: 'empty',
  },
};

export const MediumFlow: Story = {
  args: {
    ...Default.args,
    value: 'medium-flow',
    mediumColor: 'Teal',
  },
};

export const Enhanced: Story = {
  args: {
    ...Default.args,
    value: 'enhanced',
  },
};

export const Running: Story = {
  args: {
    ...Default.args,
    value: 'running',
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    value: 'closed',
  },
};

export const ClosedDash: Story = {
  args: {
    ...Default.args,
    value: 'closed-dash',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    ...Default.args,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const Xl: Story = {
  args: {
    ...Default.args,
    size: 'xl',
  },
};
