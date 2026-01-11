import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDropdownButton} from './dropdown-button.js';
import './dropdown-button.js';

const meta: Meta<ObcDropdownButton> = {
  title: 'UI Components/Buttons/Dropdown Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-dropdown-button',
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
} satisfies Meta<ObcDropdownButton>;

export default meta;
type Story = StoryObj<ObcDropdownButton>;

export const Primary: Story = {};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const PreSelected: Story = {
  args: {
    value: 'xc90',
  },
};
