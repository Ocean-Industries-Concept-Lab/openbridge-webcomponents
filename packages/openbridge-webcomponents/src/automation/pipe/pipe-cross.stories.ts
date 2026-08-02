import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPipeCross} from './pipe-cross.js';
import './pipe-cross.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcPipeCross> = {
  title: 'Automation/Pipe/Cross',
  component: 'obc-pipe-cross',
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
  },
} satisfies Meta<ObcPipeCross>;

export default meta;
type Story = StoryObj<ObcPipeCross>;

export const Default: Story = {
  args: {
    value: 'open-flow',
    size: 'medium',
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
