import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcCheckbox } from './checkbox.js';
import './checkbox.js';
import { html } from 'lit';

const meta = {
  title: 'Input/Checkbox',
  tags: ['6.0'],
  component: 'obc-checkbox',
  argTypes: {
    status: {
      name: 'Status',
      options: ['unchecked', 'checked', 'mixed'],
      control: { type: 'select' },
    },
    state: {
      name: 'State',
      options: ['enabled', 'active', 'disabled'],
      control: { type: 'select' },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
    },
  }
} as Meta<typeof ObcCheckbox>;

export default meta;
type Story = StoryObj<ObcCheckbox>;

// Template that accepts both status and state
const Template: Story['render'] = (args) => {
  return html`
    <obc-checkbox
      .status=${args.status}
      .state=${args.state}
      .label=${args.label}
    ></obc-checkbox>
  `;
};

// Status-based stories (default enabled state)
export const Unchecked: Story = {
  render: Template,
  args: { 
    status: 'unchecked', 
    state: 'enabled',
    label: 'Checkbox item'
  },
};

export const Checked: Story = {
  render: Template,
  args: { 
    status: 'checked', 
    state: 'enabled',
    label: 'Checkbox item'
  },
};

export const Mixed: Story = {
  render: Template,
  args: { 
    status: 'mixed', 
    state: 'enabled',
    label: 'Checkbox item'
  },
};

// State-based stories
export const Disabled: Story = {
  render: Template,
  args: { 
    status: 'unchecked', 
    state: 'disabled',
    label: 'Checkbox item'
  },
};
