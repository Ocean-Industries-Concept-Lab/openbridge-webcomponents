import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcIntegrationDropdownButton,
  IntegrationDropdownButtonType,
} from './integration-dropdown-button.js';
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
    type: {
      control: 'select',
      options: Object.values(IntegrationDropdownButtonType),
    },
    openTop: {
      control: 'boolean',
    },
  },
  args: {
    options: [
      {
        value: 'volvo',
        label: 'M/S Oslo',
        icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
      },
      {
        value: 'xc90',
        label: 'Titanic',
        icon: html`<obi-ship slot="icon"></obi-ship>`,
      },
      {
        value: 'mercedes',
        label: 'Helge Ingstad',
        icon: html`<obi-ship slot="icon"></obi-ship>`,
      },
    ],
    value: 'volvo',
    type: IntegrationDropdownButtonType.label,
  },
  render: (args) => html`
    <obc-integration-dropdown-button
      .options=${args.options}
      .value=${args.value}
      .type=${args.type}
    >
      <div slot="fleet">
        <obc-integration-button style="width: 320px; display: block;">
          <div slot="label">Fleet</div>
          <div slot="status">Status</div>
          <div slot="info-label">Info Label</div>
          <div slot="info-status">Info Status</div>
        </obc-integration-button>
      </div>
    </obc-integration-dropdown-button>
  `,
} satisfies Meta<ObcIntegrationDropdownButton>;

export default meta;
type Story = StoryObj<ObcIntegrationDropdownButton>;

export const Label: Story = {};
