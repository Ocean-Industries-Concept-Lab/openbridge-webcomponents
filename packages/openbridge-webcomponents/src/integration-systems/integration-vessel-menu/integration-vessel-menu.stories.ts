import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import type {ObcIntegrationVesselMenu} from './integration-vessel-menu.js';
import './integration-vessel-menu.js';
import '../../icons/icon-placeholder.js';
import {ObcAlertMenuItemStatus} from '../../components/alert-menu-item/alert-menu-item.js';
import '../../components/alert-menu-item/alert-menu-item.js';
import '../../icons/icon-caution-color-iec.js';

const handleAck = (event: Event) => {
  const alertItem = event.currentTarget as HTMLElement;
  const alertParent = alertItem.parentElement;
  if (alertParent) {
    alertParent.removeChild(alertItem);
  }
};

const renderAlarms = () => html`
  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.Unacknowledged}
    title="CPA/TCPA Alert"
    description="Risk of collision with vessel MV NORDIC at CPA 0.2nm"
    time="09:12:34"
    @ack-click=${handleAck}
    data-testid="engine-temperature-high-1"
  >
    <obc-alert-icon slot="alert-icon" type="alarm" active></obc-alert-icon>
  </obc-alert-menu-item>
  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.NoAckAlarm}
    title="Off Track Deviation"
    description="Vessel has deviated from planned route by 0.5nm"
    time="09:13:22"
  >
    <obc-alert-icon slot="alert-icon" type="alarm" active></obc-alert-icon>
  </obc-alert-menu-item>
  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.Unacknowledged}
    title="Main Engine Overload"
    description="Port main engine load exceeds 95% of MCR"
    time="09:14:05"
    data-testid="engine-temperature-high-2"
    @ack-click=${handleAck}
  >
    <obc-alert-icon slot="alert-icon" type="alarm" active></obc-alert-icon>
  </obc-alert-menu-item>

  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.NoAckWarning}
    title="Depth Below Keel"
    description="Under keel clearance below safety margin: 2.5m"
    time="09:15:10"
  >
    <obc-alert-icon slot="alert-icon" type="warning" active></obc-alert-icon>
  </obc-alert-menu-item>
  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.NoAckWarning}
    title="Wind Speed High"
    description="True wind speed 35kts exceeds operational limit"
    time="09:16:00"
  >
    <obc-alert-icon slot="alert-icon" type="warning" active></obc-alert-icon>
  </obc-alert-menu-item>
  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.NoAckWarning}
    title="ECDIS Primary GPS Lost"
    description="Position source switched to secondary GPS"
    time="09:16:45"
  >
    <obc-alert-icon slot="alert-icon" type="warning" active></obc-alert-icon>
  </obc-alert-menu-item>

  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.Caution}
    title="Fuel Oil Temperature"
    description="HFO temperature approaching lower limit: 115°C"
    time="09:17:20"
  >
    <obi-caution-color-iec
      useCssColor
      slot="alert-icon"
    ></obi-caution-color-iec>
  </obc-alert-menu-item>
  <obc-alert-menu-item
    slot="alarms"
    .status=${ObcAlertMenuItemStatus.Caution}
    title="Ballast Tank Level"
    description="No. 3 Port ballast tank level below recommended trim: 45%"
    time="09:17:45"
  >
    <obi-caution-color-iec
      useCssColor
      slot="alert-icon"
    ></obi-caution-color-iec>
  </obc-alert-menu-item>
`;

const renderButtons = () => html`
  <obc-button slot="buttons" ?fullWidth=${true}>Action 1</obc-button>
  <obc-button slot="buttons" ?fullWidth=${true}>Ac. 2</obc-button>
  <obc-button slot="buttons" ?fullWidth=${true}>Action number 3</obc-button>
`;

const renderContent = () => html`
  <div slot="content" style="padding: 16px;">
    <p style="margin: 0;">Content area</p>
  </div>
`;

const meta: Meta<ObcIntegrationVesselMenu> = {
  title: 'Integration Systems/Integration Vessel Menu',
  component: 'obc-integration-vessel-menu',
  tags: ['alpha'],
  args: {hasActions: true, hasAlertList: true, hasContent: true},
  argTypes: {
    hasActions: {
      control: 'boolean',
    },
    hasAlertList: {
      control: 'boolean',
    },
    hasContent: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ObcIntegrationVesselMenu>;

interface IntegrationVesselMenuArgs {
  hasActions: boolean;
  hasAlertList: boolean;
  hasContent: boolean;
}

type IntegrationVesselMenuTemplate = (
  args: IntegrationVesselMenuArgs
) => ReturnType<typeof html>;

// The menu sizes to its content; section visibility is driven by the has* args.
const template: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu
    style="width: 400px;"
    .hasActions=${args.hasActions}
    .hasAlertList=${args.hasAlertList}
    .hasContent=${args.hasContent}
  >
    ${renderButtons()} ${renderContent()} ${renderAlarms()}
  </obc-integration-vessel-menu>
`;

const templateWrappedButtons: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu
    style="width: 600px; height: 400px;"
    .hasActions=${args.hasActions}
    .hasAlertList=${args.hasAlertList}
    .hasContent=${args.hasContent}
  >
    <div slot="buttons">
      <div style="display: contents;">
        <obc-button ?fullWidth=${true}>Open</obc-button>
      </div>
      <div style="display: contents;">
        <obc-button ?fullWidth=${true}>Alerts</obc-button>
      </div>
    </div>
    <div slot="content" style="padding: 24px;">
      <div style="width: 320px;">
        <p>Content area</p>
      </div>
    </div>
    ${renderAlarms()}
  </obc-integration-vessel-menu>
`;

export const Default: Story = {
  render: template,
};

export const NoActions: Story = {
  render: template,
  args: {hasActions: false},
};

export const NoContent: Story = {
  render: template,
  args: {hasContent: false},
};

export const NoAlertList: Story = {
  render: template,
  args: {hasAlertList: false},
};

// Recommended bounded usage: the consumer caps the menu by setting a height on
// the host element. The menu fills that height and the alert list scrolls within
// the remaining space automatically — no per-slot sizing required.
const templateConstrained: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu
    style="width: 400px; height: 500px;"
    .hasActions=${args.hasActions}
    .hasAlertList=${args.hasAlertList}
    .hasContent=${args.hasContent}
  >
    ${renderButtons()} ${renderContent()} ${renderAlarms()}
  </obc-integration-vessel-menu>
`;

export const Constrained: Story = {
  render: templateConstrained,
};

// Without consumer bounding, tall content grows the whole menu unbounded.
const templateLongContent: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu
    style="width: 400px;"
    .hasActions=${args.hasActions}
    .hasAlertList=${args.hasAlertList}
    .hasContent=${args.hasContent}
  >
    ${renderButtons()}
    <div slot="content" style="padding: 16px;">
      <div style="height: 600px;">
        <p style="margin: 0;">Tall content with no height cap</p>
      </div>
    </div>
  </obc-integration-vessel-menu>
`;

export const LongContentOverflow: Story = {
  render: templateLongContent,
  args: {hasAlertList: false},
};

export const WithButtonsWrappedInDivWithoutStyling: Story = {
  render: templateWrappedButtons,
};

const templateNoAlerts: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu
    style="width: 400px;"
    .hasActions=${args.hasActions}
    .hasAlertList=${args.hasAlertList}
    .hasContent=${args.hasContent}
  >
    ${renderButtons()} ${renderContent()}
  </obc-integration-vessel-menu>
`;

export const NoAlerts: Story = {
  render: templateNoAlerts,
};
