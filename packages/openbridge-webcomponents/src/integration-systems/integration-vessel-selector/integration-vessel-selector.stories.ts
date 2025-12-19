import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationVesselSelector} from './integration-vessel-selector.js';
import './integration-vessel-selector.js';
import '../integration-button/integration-button.js';
import {html} from 'lit';

const meta: Meta<typeof ObcIntegrationVesselSelector> = {
  title: 'Integration Systems/Integration Vessel Selector',
  tags: ['6.0'],
  component: 'obc-integration-vessel-selector',
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<ObcIntegrationVesselSelector>;

export default meta;
type Story = StoryObj<ObcIntegrationVesselSelector>;

export const Primary: Story = {
  render: (args) => html`
    <obc-integration-vessel-selector
      style="width: 320px; display: block; height: 100vh;"
    >
      <div slot="fleet">Fleet</div>
      <obc-integration-button
        hasLeadingIcon
        hasTrailingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon2"></obi-placeholder>
        <div slot="label">Label</div>
        <div slot="status">Status</div>
        <div slot="info-label">Info Label</div>
        <div slot="info-status">Info Status</div>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        hasTrailingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        selected
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon2"></obi-placeholder>
        <div slot="label">Label</div>
        <div slot="status">Status</div>
        <div slot="info-label">Info Label</div>
        <div slot="info-status">Info Status</div>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        hasTrailingIcon
        dividerBottom
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon2"></obi-placeholder>
        <div slot="label">Label</div>
        <div slot="status">Status</div>
        <div slot="info-label">Info Label</div>
        <div slot="info-status">Info Status</div>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        hasTrailingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon2"></obi-placeholder>
        <div slot="label">Label</div>
        <div slot="status">Status</div>
        <div slot="info-label">Info Label</div>
        <div slot="info-status">Info Status</div>
      </obc-integration-button>
    </obc-integration-vessel-selector>
  `,
};
