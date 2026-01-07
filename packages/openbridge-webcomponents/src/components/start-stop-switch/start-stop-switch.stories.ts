import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcStartStopSwitch,
  StartStopSwitchValue,
  StartStopSwitchSize,
} from './start-stop-switch.js';
import './start-stop-switch.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-command-in.js';
import {html} from 'lit';

const meta: Meta<typeof ObcStartStopSwitch> = {
  title: 'UI Components/Selection controls and switches/Start stop switch',
  tags: ['6.0'],
  component: 'obc-start-stop-switch',
  argTypes: {
    value: {
      control: 'select',
      options: ['off', 'on', 'loading', 'motor-on'] as StartStopSwitchValue[],
      description: 'The current value/state of the switch',
    },
    size: {
      control: 'select',
      options: ['regular', 'large'] as StartStopSwitchSize[],
      description: 'The size of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    hasAlert: {
      control: 'boolean',
      description: 'Whether to show an alert frame',
    },
    hasDescription: {
      control: 'boolean',
      description: 'Whether to show the description',
    },
    description: {
      control: 'text',
      description: 'Description text below the switch',
    },
    hasUncheckedStateIcon: {
      control: 'boolean',
      description: 'Show icon in unchecked state',
    },
    hasCheckedStateIcon: {
      control: 'boolean',
      description: 'Show icon in checked state',
    },
  },
  args: {
    value: 'off',
    size: 'regular',
    disabled: false,
    hasAlert: false,
    hasDescription: false,
    description: '',
    hasUncheckedStateIcon: true,
    hasCheckedStateIcon: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
      .hasAlert=${args.hasAlert}
      .hasDescription=${args.hasDescription}
      .description=${args.description}
      .hasUncheckedStateIcon=${args.hasUncheckedStateIcon}
      .hasCheckedStateIcon=${args.hasCheckedStateIcon}
    >
      <div slot="checked-state-icon">
        <obi-placeholder></obi-placeholder>
      </div>
      <div slot="unchecked-state-icon">
        <obi-placeholder></obi-placeholder>
      </div>
      <div slot="checked-state-label">Checked State</div>
      <div slot="unchecked-state-label">Unchecked State</div>
      <div slot="to-checked-action-label">Action</div>
      <div slot="to-unchecked-action-label">Action</div>
    </obc-start-stop-switch>`;
  },
} satisfies Meta<ObcStartStopSwitch>;

export default meta;
type Story = StoryObj<ObcStartStopSwitch>;

export const Off: Story = {
  args: {
    value: 'off',
  },
};

export const On: Story = {
  args: {
    value: 'on',
  },
};

export const Loading: Story = {
  args: {
    value: 'loading',
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
      .hasAlert=${args.hasAlert}
      .description=${args.description}
      .hasCheckedStateIcon=${false}
    >
      <div slot="checked-state-label">Loading</div>
      <div slot="unchecked-state-label">State</div>
      <div slot="to-checked-action-label">Action</div>
      <div slot="to-unchecked-action-label">Action</div>
    </obc-start-stop-switch>`;
  },
};

export const MotorOn: Story = {
  args: {
    value: 'motor-on',
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
      .hasAlert=${args.hasAlert}
      .description=${args.description}
      .hasCheckedStateIcon=${false}
    >
      <div slot="checked-state-label">State</div>
      <div slot="unchecked-state-label">State</div>
      <div slot="to-checked-action-label">Action</div>
      <div slot="to-unchecked-action-label">Action</div>
    </obc-start-stop-switch>`;
  },
};

export const SizeLarge: Story = {
  args: {
    value: 'off',
    size: 'large',
  },
};

export const SizeLargeOn: Story = {
  args: {
    value: 'on',
    size: 'large',
  },
};

export const SizeLargeDisabled: Story = {
  args: {
    value: 'off',
    size: 'large',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
    >
      <div slot="checked-state-label">State</div>
      <div slot="unchecked-state-label">State</div>
    </obc-start-stop-switch>`;
  },
};

export const SizeLargeDisabledOn: Story = {
  args: {
    value: 'on',
    size: 'large',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
    >
      <div slot="checked-state-label">State</div>
      <div slot="unchecked-state-label">State</div>
    </obc-start-stop-switch>`;
  },
};

export const DisabledLoading: Story = {
  args: {
    value: 'loading',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
    >
      <div slot="checked-state-label">Loading</div>
      <div slot="unchecked-state-label">State</div>
    </obc-start-stop-switch>`;
  },
};

export const DisabledMotorOn: Story = {
  args: {
    value: 'motor-on',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
    >
      <div slot="checked-state-label">Running</div>
      <div slot="unchecked-state-label">State</div>
    </obc-start-stop-switch>`;
  },
};

export const AllDisabledVariants: Story = {
  render: () => {
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 16px; max-width: 256px;"
      >
        <obc-start-stop-switch value="off" disabled>
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch value="on" disabled>
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch value="loading" disabled>
          <div slot="checked-state-label">Loading</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch value="motor-on" disabled>
          <div slot="checked-state-label">Running</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>
      </div>
    `;
  },
};

export const WithAlert: Story = {
  args: {
    value: 'on',
    hasAlert: true,
  },
};

export const WithDescription: Story = {
  args: {
    value: 'off',
    hasDescription: true,
    description: 'Action description',
  },
};

export const AllValues: Story = {
  render: () => {
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 16px; max-width: 256px;"
      >
        <obc-start-stop-switch value="off">
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
          <div slot="to-checked-action-label">Action</div>
          <div slot="to-unchecked-action-label">Action</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch value="on">
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
          <div slot="to-checked-action-label">Action</div>
          <div slot="to-unchecked-action-label">Action</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch value="loading">
          <div slot="checked-state-label">Loading</div>
          <div slot="unchecked-state-label">State</div>
          <div slot="to-checked-action-label">Action</div>
          <div slot="to-unchecked-action-label">Action</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch value="motor-on">
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
          <div slot="to-checked-action-label">Action</div>
          <div slot="to-unchecked-action-label">Action</div>
        </obc-start-stop-switch>
      </div>
    `;
  },
};

export const CmdExample: Story = {
  args: {
    value: 'on',
  },
  render: (args) => {
    return html`<obc-start-stop-switch .value=${args.value} hasCheckedStateIcon>
      <div slot="checked-state-icon">
        <obi-command-in></obi-command-in>
      </div>
      <div slot="checked-state-label">In CMD</div>
      <div slot="unchecked-state-label">DP Aft Bridge</div>
      <div slot="to-checked-action-label">Request</div>
      <div slot="to-unchecked-action-label">Release</div>
    </obc-start-stop-switch>`;
  },
};

/**
 * @deprecated Use the `value` property stories instead
 */
export const Unchecked: Story = {
  args: {
    value: 'off',
  },
};

/**
 * @deprecated Use the `value` property stories instead
 */
export const Checked: Story = {
  args: {
    value: 'on',
  },
};
