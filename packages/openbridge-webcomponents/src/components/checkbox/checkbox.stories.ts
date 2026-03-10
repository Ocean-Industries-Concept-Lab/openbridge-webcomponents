import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {CheckboxState, CheckboxStatus, ObcCheckbox} from './checkbox.js';
import './checkbox.js';

const statusVariants = [
  CheckboxStatus.unchecked,
  CheckboxStatus.checked,
  CheckboxStatus.mixed,
] as const;

const renderStatusGroup = (
  state: CheckboxState,
  disabled = false,
  noHoverEffects = false
) => html`
  <div style="display:flex; justify-content:flex-start; width:100%;">
    <div style="display:flex; align-items:center; gap:24px; min-height:96px;">
      ${statusVariants.map(
        (status) =>
          html`<obc-checkbox
            .status=${status}
            .state=${state}
            .disabled=${disabled}
            .noHoverEffects=${noHoverEffects}
            aria-label=${`${state} ${status} checkbox`}
          ></obc-checkbox>`
      )}
    </div>
  </div>
`;

const meta = {
  title: 'UI Components/Selection Controls and Switches/Checkbox',
  tags: ['6.0'],
  component: 'obc-checkbox',
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
  render: (args, context) => {
    const checkbox = html`<obc-checkbox
      .status=${args.status}
      .state=${args.state}
      .disabled=${args.disabled}
      .noHoverEffects=${args.noHoverEffects}
      aria-label="Checkbox item"
    ></obc-checkbox>`;

    if (context.viewMode === 'docs') {
      return html`<div
        style="display:flex; justify-content:flex-start; width:100%;"
      >
        ${checkbox}
      </div>`;
    }

    return html`<div
      style="display:flex; align-items:center; justify-content:center; width:100%; min-height:100vh;"
    >
      ${checkbox}
    </div>`;
  },
  argTypes: {
    status: {
      name: 'Status',
      options: Object.values(CheckboxStatus),
      control: {type: 'select'},
    },
    state: {
      name: 'State',
      options: Object.values(CheckboxState),
      control: {type: 'select'},
    },
  },
} satisfies Meta<ObcCheckbox>;

export default meta;
type Story = StoryObj<ObcCheckbox>;

export const Playground: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    state: CheckboxState.enabled,
    disabled: false,
  },
  parameters: {
    controls: {
      exclude: /^(noHoverEffects)$/i,
      expanded: true,
    },
  },
};

export const Enabled: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    state: CheckboxState.enabled,
  },
  render: (args) =>
    renderStatusGroup(
      CheckboxState.enabled,
      args.disabled,
      args.noHoverEffects
    ),
};

export const Disabled: Story = {
  args: {
    status: CheckboxStatus.unchecked,
    state: CheckboxState.enabled,
  },
  render: () => renderStatusGroup(CheckboxState.enabled, true),
};

export const Loading: Story = {
  args: {
    status: CheckboxStatus.checked,
    state: CheckboxState.loading,
  },
  render: () => renderStatusGroup(CheckboxState.loading),
};
