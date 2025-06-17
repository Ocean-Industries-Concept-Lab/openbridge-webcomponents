import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCheckbox} from './checkbox.js';
import './checkbox.js';
import {html} from 'lit';

const meta = {
  title: 'Input/Checkbox',
  tags: ['6.0'],
  component: 'obc-checkbox',
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

// Template for regular checkboxes
const Template: Story['render'] = (args) => {
  return html`
    <obc-checkbox
      .status=${args.status}
      .disabled=${args.disabled}
      .label=${args.label}
      .isMixed=${args.isMixed}
      .ariaControls=${args.ariaControls}
    ></obc-checkbox>
  `;
};

// Template for mixed-state demonstration
const MixedStateTemplate: Story['render'] = () => {
  return html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; padding: 16px;"
    >
      <h3>Mixed-State Checkbox Demo</h3>

      <!-- Parent mixed-state checkbox -->
      <obc-checkbox
        .isMixed=${true}
        .label=${'Select all condiments'}
        .ariaControls=${'mustard mayo ketchup'}
      ></obc-checkbox>

      <div
        style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;"
      >
        <obc-checkbox id="mustard" .label=${'Mustard'}></obc-checkbox>

        <obc-checkbox id="mayo" .label=${'Mayonnaise'}></obc-checkbox>

        <obc-checkbox id="ketchup" .label=${'Ketchup'}></obc-checkbox>
      </div>

      <p style="font-size: 14px; color: #666; margin-top: 16px;">
        Try clicking the "Select all condiments" checkbox to see it toggle all
        children.<br />
        Or check/uncheck individual condiments to see the parent automatically
        update to mixed state.
      </p>
    </div>
  `;
};

// Basic checkbox stories
export const Unchecked: Story = {
  render: Template,
  args: {
    status: 'unchecked',
    disabled: false,
    label: 'Checkbox item',
    isMixed: false,
    ariaControls: '',
  },
};

export const Checked: Story = {
  render: Template,
  args: {
    status: 'checked',
    disabled: false,
    label: 'Checkbox item',
    isMixed: false,
    ariaControls: '',
  },
};

// Note: Mixed state should not be manually set for regular checkboxes
// This story is just for visual reference
export const Mixed: Story = {
  render: Template,
  args: {
    status: 'mixed',
    disabled: false,
    label: 'Mixed state (visual only)',
    isMixed: false,
    ariaControls: '',
  },
};

// Disabled states
export const Disabled: Story = {
  render: Template,
  args: {
    status: 'unchecked',
    disabled: true,
    label: 'Disabled checkbox',
    isMixed: false,
    ariaControls: '',
  },
};
