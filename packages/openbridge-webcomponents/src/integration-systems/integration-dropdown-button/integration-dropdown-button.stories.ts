import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationDropdownButton} from './integration-dropdown-button.js';
import './integration-dropdown-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';
import '../integration-button/integration-button.js';

const meta: Meta<ObcIntegrationDropdownButton> = {
  title: 'Integration Systems/Integration Dropdown Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-integration-dropdown-button',
  globals: {
    backgrounds: {
      value: 'integration-container-global-color',
    },
  },
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
    openTop: {
      control: 'boolean',
    },
  },
  args: {
    options: [
      {
        value: 'oslo',
        label: 'M/S Oslo',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {
        value: 'titanic',
        label: 'Titanic',
        icon: html`<obi-ship slot="icon"></obi-ship>`,
      },
      {
        value: 'helge-ingstad',
        label: 'Helge Ingstad',
        icon: html`<obi-ship slot="icon"></obi-ship>`,
      },
      {
        value: 'disabled',
        label: 'Disabled',
        icon: html`<obi-ship slot="icon"></obi-ship>`,
        disabled: true,
      },
    ],
    value: 'oslo',
    hasFleet: true,
    fleetLabel: 'Fleet',
  },
  render: (args) => html`
    <obc-integration-dropdown-button
      .options=${args.options}
      .value=${args.value}
      .hasFleet=${args.hasFleet}
      .fleetLabel=${args.fleetLabel}
      .disabled=${args.disabled}
      .placeholder=${args.placeholder}
    >
      <obc-integration-button
        slot="fleet"
        .readouts=${[{label: 'Label', value: 'Value', unit: 'Unit'}]}
      >
        <div slot="label">Fleet name</div>
        <div slot="info-label">Label</div>
        <div slot="info-status">Status</div>
      </obc-integration-button>
    </obc-integration-dropdown-button>
  `,
} satisfies Meta<ObcIntegrationDropdownButton>;

export default meta;
type Story = StoryObj<ObcIntegrationDropdownButton>;

export const WithFleet: Story = {
  args: {
    value: 'fleet',
  },
};

export const WithoutFleet: Story = {
  args: {
    hasFleet: false,
  },
};

export const SelectedDisabled: Story = {
  args: {
    value: 'disabled',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Unselected: Story = {
  args: {
    value: undefined,
    placeholder: 'Select an option',
  },
};
