import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {CheckboxStatus, ObcCheckbox} from './checkbox.js';
import './checkbox.js';

const meta = {
  title: 'UI Components/Selection Controls and Switches/Checkbox',
  tags: ['6.0'],
  component: 'obc-checkbox',
  parameters: {
    actions: {
      handles: ['change', 'disabled'],
    },
  },
  argTypes: {
    status: {
      name: 'Status',
      options: ['unchecked', 'checked', 'mixed'],
      control: {type: 'select'},
    },
    disabled: {
      name: 'Disabled',
      control: {type: 'boolean'},
    },
    label: {
      name: 'Label',
      control: {type: 'text'},
    },
    isMixed: {
      name: 'Is Mixed State Parent',
      control: {type: 'boolean'},
    },
    ariaControls: {
      name: 'Aria Controls (space-separated IDs)',
      control: {type: 'text'},
    },
  },
} as Meta<typeof ObcCheckbox>;

export default meta;
type Story = StoryObj<ObcCheckbox>;

// Basic checkbox stories
export const Unchecked: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    label: 'Checkbox item',
  },
};

export const Checked: Story = {
  args: {
    status: CheckboxStatus.checked,
    label: 'Checkbox item',
  },
};

export const Mixed: Story = {
  args: {
    status: CheckboxStatus.mixed,
    label: 'Mixed state',
  },
};

// Disabled states
export const Disabled: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    disabled: true,
    label: 'Disabled checkbox',
  },
};
