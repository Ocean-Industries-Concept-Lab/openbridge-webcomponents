import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcStartStopSwitch,
  StartStopSwitchVariant,
  StartStopSwitchSize,
} from './start-stop-switch.js';
import './start-stop-switch.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-command-in.js';
import {html} from 'lit';

const meta: Meta<ObcStartStopSwitch> = {
  title: 'UI Components/Selection controls and switches/Start stop switch',
  tags: ['6.0'],
  component: 'obc-start-stop-switch',
  args: {
    showUncheckedStateIcon: false,
    showCheckedStateIcon: false,
    checked: false,
    variant: 'normal',
    size: 'regular',
    disabled: false,
    hasAlert: false,
    hasDescription: false,
    description: '',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked (on)',
    },
    variant: {
      control: 'select',
      options: ['normal', 'running', 'loading'] as StartStopSwitchVariant[],
      description: 'Visual variant when checked',
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
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .showUncheckedStateIcon=${args.showUncheckedStateIcon}
      .showCheckedStateIcon=${args.showCheckedStateIcon}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
      .hasAlert=${args.hasAlert}
      .hasDescription=${args.hasDescription}
      .description=${args.description}
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
};

export default meta;
type Story = StoryObj<ObcStartStopSwitch>;

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Loading: Story = {
  args: {
    checked: true,
    variant: 'loading',
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
      .hasAlert=${args.hasAlert}
      .description=${args.description}
    >
      <div slot="checked-state-label">Loading</div>
      <div slot="unchecked-state-label">State</div>
      <div slot="to-checked-action-label">Action</div>
      <div slot="to-unchecked-action-label">Action</div>
    </obc-start-stop-switch>`;
  },
};

export const Running: Story = {
  args: {
    checked: true,
    variant: 'running',
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
      .hasAlert=${args.hasAlert}
      .description=${args.description}
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
    checked: false,
    size: 'large',
  },
};

export const SizeLargeChecked: Story = {
  args: {
    checked: true,
    size: 'large',
  },
};

export const SizeLargeDisabled: Story = {
  args: {
    checked: false,
    size: 'large',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
    >
      <div slot="checked-state-label">State</div>
      <div slot="unchecked-state-label">State</div>
    </obc-start-stop-switch>`;
  },
};

export const SizeLargeDisabledChecked: Story = {
  args: {
    checked: true,
    size: 'large',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .variant=${args.variant}
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
    checked: true,
    variant: 'loading',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
    >
      <div slot="checked-state-label">Loading</div>
      <div slot="unchecked-state-label">State</div>
    </obc-start-stop-switch>`;
  },
};

export const DisabledRunning: Story = {
  args: {
    checked: true,
    variant: 'running',
    disabled: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .variant=${args.variant}
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
        <obc-start-stop-switch disabled>
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch checked disabled>
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch checked variant="loading" disabled>
          <div slot="checked-state-label">Loading</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch checked variant="running" disabled>
          <div slot="checked-state-label">Running</div>
          <div slot="unchecked-state-label">State</div>
        </obc-start-stop-switch>
      </div>
    `;
  },
};

export const WithAlert: Story = {
  args: {
    checked: true,
    hasAlert: true,
  },
};

export const WithDescription: Story = {
  args: {
    checked: false,
    hasDescription: true,
    description: 'Action description',
  },
};

export const AllVariants: Story = {
  render: () => {
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 16px; max-width: 256px;"
      >
        <obc-start-stop-switch>
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
          <div slot="to-checked-action-label">Action</div>
          <div slot="to-unchecked-action-label">Action</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch checked>
          <div slot="checked-state-label">State</div>
          <div slot="unchecked-state-label">State</div>
          <div slot="to-checked-action-label">Action</div>
          <div slot="to-unchecked-action-label">Action</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch checked variant="loading">
          <div slot="checked-state-label">Loading</div>
          <div slot="unchecked-state-label">State</div>
          <div slot="to-checked-action-label">Action</div>
          <div slot="to-unchecked-action-label">Action</div>
        </obc-start-stop-switch>

        <obc-start-stop-switch checked variant="running">
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
    checked: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      showCheckedStateIcon
    >
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

export const LoadingToRunning: Story = {
  render: () => {
    const handleChange = (e: Event) => {
      const switchEl = e.target as HTMLElement & {
        checked: boolean;
        variant: string;
      };
      const label = switchEl.querySelector(
        '[slot="checked-state-label"]'
      ) as HTMLElement;

      if (switchEl.checked) {
        switchEl.variant = 'loading';
        label.textContent = 'Loading...';
        setTimeout(() => {
          switchEl.variant = 'running';
          label.textContent = 'Running';
        }, 2000);
      } else {
        switchEl.variant = 'normal';
        label.textContent = 'Stopped';
      }
    };

    return html`<obc-start-stop-switch @change=${handleChange}>
      <div slot="checked-state-label">Stopped</div>
      <div slot="unchecked-state-label">Stopped</div>
      <div slot="to-checked-action-label">Start</div>
      <div slot="to-unchecked-action-label">Stop</div>
    </obc-start-stop-switch>`;
  },
};
