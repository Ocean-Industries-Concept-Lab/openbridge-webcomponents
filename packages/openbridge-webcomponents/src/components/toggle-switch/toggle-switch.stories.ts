import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcToggleSwitch} from './toggle-switch.js';
import './toggle-switch.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcToggleSwitch> = {
  title: 'UI Components/Selection controls and switches/Toggle Switch',
  tags: ['6.0'],
  component: 'obc-toggle-switch',
  argTypes: {
    label: {
      control: {type: 'text'},
    },
    checked: {
      control: {type: 'boolean'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    hasDescription: {
      control: {type: 'boolean'},
    },
    description: {
      control: {type: 'text'},
    },
    hasBottomDivider: {
      control: {type: 'boolean'},
    },
    hasIcon: {
      control: {type: 'boolean'},
    },
  },
  parameters: {
    actions: {
      handles: ['input'],
    },
  },
} satisfies Meta<ObcToggleSwitch>;

export default meta;
type Story = StoryObj<ObcToggleSwitch>;

// Shared render function
const renderToggleSwitch = (args) => {
  return html`<div style="width: 350px;">
    <obc-toggle-switch
      label="${args.label}"
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?hasDescription=${args.hasDescription}
      description="${args.description}"
      ?hasBottomDivider=${args.hasBottomDivider}
      ?hasIcon=${args.hasIcon}
    >
      ${args.hasIcon
        ? html`<obi-placeholder slot="icon"></obi-placeholder>`
        : ''}
    </obc-toggle-switch>
  </div>`;
};

export const Default: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: false,
    hasDescription: true,
    description: 'Description',
    hasBottomDivider: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// Basic toggle switch
export const Primary: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    hasDescription: false,
    description: '',
    hasBottomDivider: false,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Toggle switch with description
export const WithDescription: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: false,
    hasDescription: true,
    description: 'Description',
    hasBottomDivider: false,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Toggle switch with icon
export const WithIcon: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    hasDescription: false,
    description: '',
    hasBottomDivider: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// Toggle switch with icon and description
export const WithIconAndLongDescription: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: false,
    hasDescription: true,
    description:
      'Very long descriptions will overflow and get three dots to indicate overflow',
    hasBottomDivider: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// Disabled toggle switch
export const Disabled: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: true,
    hasDescription: true,
    description: 'Description',
    hasBottomDivider: false,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Disabled and checked
export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: true,
    hasDescription: true,
    description: 'Description',
    hasBottomDivider: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// With bottom divider
export const WithBottomDivider: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    hasDescription: true,
    description: 'Description',
    hasBottomDivider: true,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Multiple toggle switches to show in a list
export const MultipleToggles: Story = {
  render: () => {
    return html`<div style="width: 400px;">
      <obc-toggle-switch
        label="Label"
        ?checked="${true}"
        ?hasDescription="${true}"
        description="Description"
        ?hasBottomDivider="${true}"
        ?hasIcon="${true}"
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-switch>

      <obc-toggle-switch
        label="Label"
        ?checked="${false}"
        ?hasDescription="${true}"
        description="Description"
        ?hasBottomDivider="${true}"
        ?hasIcon="${true}"
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-switch>

      <obc-toggle-switch
        label="Label"
        ?checked="${false}"
        ?hasDescription="${true}"
        description="Description"
        ?hasBottomDivider="${false}"
        ?hasIcon="${true}"
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-switch>
    </div>`;
  },
};
