import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSelect} from './select.js';
import './select.js';

const meta: Meta<ObcSelect> = {
  title: 'UI Components/Input/Select',
  tags: ['autodocs'],
  component: 'obc-select',
  argTypes: {
    options: {
      control: 'object',
    },
    value: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  args: {
    options: [
      {
        value: 'volvo',
        label: 'Volvo',
      },
      {
        value: 'xc90',
        label: 'XC 90',
        level: 2,
      },
      {
        value: 'mercedes',
        label: 'Mercedes',
      },
      {
        value: 'audi',
        label: 'Audi',
      },
    ],
    value: 'volvo',
  },
} satisfies Meta<ObcSelect>;

export default meta;
type Story = StoryObj<ObcSelect>;

export const Primary: Story = {};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
