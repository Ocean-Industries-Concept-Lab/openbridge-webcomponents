import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcToggleSwitch} from './toggle-switch.js';
import './toggle-switch.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcToggleSwitch> = {
  title: 'UI Components/Input/Toggle Switch',
  tags: ['autodocs'],
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
    hasBottomDividor: {
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
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?hasDescription="${args.hasDescription}"
      description="${args.description}"
      ?hasBottomDividor="${args.hasBottomDividor}"
      ?hasIcon="${args.hasIcon}"
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
    description: 'This shows all available features enabled',
    hasBottomDividor: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// Basic toggle switch
export const Primary: Story = {
  args: {
    label: 'Toggle Switch',
    checked: false,
    disabled: false,
    hasDescription: false,
    description: '',
    hasBottomDividor: false,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Toggle switch with description
export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    checked: true,
    disabled: false,
    hasDescription: true,
    description: 'Receive push notifications for important updates',
    hasBottomDividor: false,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Toggle switch with icon
export const WithIcon: Story = {
  args: {
    label: 'Dark mode',
    checked: false,
    disabled: false,
    hasDescription: false,
    description: '',
    hasBottomDividor: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// Toggle switch with icon and description
export const WithIconAndDescription: Story = {
  args: {
    label: 'Auto-save',
    checked: true,
    disabled: false,
    hasDescription: true,
    description: 'Automatically save your work every 30 seconds',
    hasBottomDividor: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// Disabled toggle switch
export const Disabled: Story = {
  args: {
    label: 'Premium feature',
    checked: false,
    disabled: true,
    hasDescription: true,
    description: 'Upgrade to premium to unlock this feature',
    hasBottomDividor: false,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Disabled and checked
export const DisabledChecked: Story = {
  args: {
    label: 'Security enabled',
    checked: true,
    disabled: true,
    hasDescription: true,
    description: 'This security feature is always enabled',
    hasBottomDividor: false,
    hasIcon: true,
  },
  render: renderToggleSwitch,
};

// With bottom divider
export const WithBottomDivider: Story = {
  args: {
    label: 'Email notifications',
    checked: false,
    disabled: false,
    hasDescription: true,
    description: 'Receive email updates about your account',
    hasBottomDividor: true,
    hasIcon: false,
  },
  render: renderToggleSwitch,
};

// Multiple toggle switches to show in a list
export const MultipleToggles: Story = {
  render: () => {
    return html`<div style="width: 400px;">
      <obc-toggle-switch
        label="Push notifications"
        ?checked="${true}"
        ?hasDescription="${true}"
        description="Get notified instantly"
        ?hasBottomDividor="${true}"
        ?hasIcon="${true}"
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-switch>

      <obc-toggle-switch
        label="Email notifications"
        ?checked="${false}"
        ?hasDescription="${true}"
        description="Daily digest emails"
        ?hasBottomDividor="${true}"
        ?hasIcon="${true}"
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-switch>

      <obc-toggle-switch
        label="Marketing emails"
        ?checked="${false}"
        ?hasDescription="${true}"
        description="Product updates and promotions"
        ?hasBottomDividor="${false}"
        ?hasIcon="${true}"
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-toggle-switch>
    </div>`;
  },
};
