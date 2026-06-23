import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationVesselSelector} from './integration-vessel-selector.js';
import './integration-vessel-selector.js';
import '../integration-bar/integration-bar.js';
import '../integration-button/integration-button.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';
import {
  IntegrationButtonType,
  IntegrationButtonVariant,
} from '../integration-button/integration-button.js';

const meta: Meta<typeof ObcIntegrationVesselSelector> = {
  title: 'Integration Systems/Integration Vessel Selector',
  tags: ['alpha'],
  component: 'obc-integration-vessel-selector',
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<ObcIntegrationVesselSelector>;

export default meta;
type Story = StoryObj<ObcIntegrationVesselSelector>;

export const Primary: Story = {
  render: () => html`
    <obc-integration-vessel-selector
      style="width: 320px; display: block; height: 100vh;"
      hasFleet
    >
      <obc-integration-button
        slot="fleet"
        hasLeadingIcon
        hasTrailingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        type=${IntegrationButtonType.rich}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon2"></obi-placeholder>
        <div slot="label">Fleet</div>
        <div slot="status">Status</div>
        <div slot="info-label">Info Label</div>
        <div slot="info-status">Info Status</div>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
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
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
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
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
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

export const Rich: Story = {
  render: () => html`
    <obc-integration-vessel-selector
      style="width: 320px; display: block; height: 100vh;"
      hasFleet
    >
      <obc-integration-button
        slot="fleet"
        hasLeadingIcon
        hasTrailingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        type=${IntegrationButtonType.rich}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon2"></obi-placeholder>
        <div slot="label">Fleet</div>
        <div slot="status">Status</div>
        <div slot="info-label">Info Label</div>
        <div slot="info-status">Info Status</div>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
        type=${IntegrationButtonType.rich}
        dividerBottom
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
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
        type=${IntegrationButtonType.rich}
        dividerBottom
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
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
        type=${IntegrationButtonType.rich}
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

export const WithTopbar: Story = {
  render: () => html`
    <obc-integration-vessel-selector
      style="width: 320px; display: block; height: 100vh;"
      hasFleet
      hasTopbar=${true}
    >
      <obc-integration-bar
        slot="topbar"
        .showClock=${true}
        .showUserButton=${true}
        .showDimmingButton=${true}
        .showSystemButton=${false}
        .showAlertButton=${true}
        .showScreenButton=${false}
        .showNotificationButton=${false}
      >
        <obc-clock
          integrationBarMode
          .date=${'2021-01-01T11:11:11.111Z'}
          .showDate=${false}
          slot="clock"
          .showTimezone=${false}
          .timeZoneOffsetHours=${1}
          .blinkOnlyBreakpointPx=${600}
        ></obc-clock>
      </obc-integration-bar>
      <obc-integration-button
        slot="fleet"
        hasLeadingIcon
        hasTrailingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        type=${IntegrationButtonType.rich}
      >
        <obi-placeholder slot="leading-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon"></obi-placeholder>
        <obi-placeholder slot="trailing-icon2"></obi-placeholder>
        <div slot="label">Fleet</div>
        <div slot="status">Status</div>
        <div slot="info-label">Info Label</div>
        <div slot="info-status">Info Status</div>
      </obc-integration-button>
      <obc-integration-button
        hasLeadingIcon
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
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
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
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
        .readouts=${[
          {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
          {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
        ]}
        variant=${IntegrationButtonVariant.flat}
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
