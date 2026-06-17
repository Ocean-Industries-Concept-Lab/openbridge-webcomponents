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

const meta: Meta<ObcIntegrationVesselMenu> = {
  title: 'Integration Systems/Integration Vessel Menu',
  component: 'obc-integration-vessel-menu',
  tags: ['alpha'],
  args: {hideAlarmList: false},
  argTypes: {
    hideAlarmList: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (story) => html`
      <div style="height: 400px; display: flex;">${story()}</div>
    `,
  ],
};

export default meta;
type Story = StoryObj<ObcIntegrationVesselMenu>;

interface IntegrationVesselMenuArgs {
  hideAlarmList: boolean;
}

type IntegrationVesselMenuTemplate = (
  args: IntegrationVesselMenuArgs
) => ReturnType<typeof html>;

const template: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu .hideAlarmList=${args.hideAlarmList}>
    <div slot="content" style="padding: 24px;">
      <div style="width: 496px; height: 256;">
        <p>Content area</p>
      </div>
    </div>
    <obc-button
      slot="buttons"
      @click=${() => console.log('Button 1 clicked')}
      ?fullWidth=${true}
    >
      <div>Action 1</div>
    </obc-button>
    <obc-button
      slot="buttons"
      @click=${() => console.log('Button 2 clicked')}
      ?fullWidth=${true}
    >
      Ac. 2
    </obc-button>
    <obc-button
      slot="buttons"
      @click=${() => console.log('Button 3 clicked')}
      ?fullWidth=${true}
    >
      Action number 3
    </obc-button>

    ${renderAlarms()}
  </obc-integration-vessel-menu>
`;

const templateWithoutAlarms: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu .hideAlarmList=${args.hideAlarmList}>
    <obc-button
      slot="buttons"
      @click=${() => console.log('Button 1 clicked')}
      ?fullWidth=${true}
    >
      Action 1
    </obc-button>
    <obc-button
      slot="buttons"
      @click=${() => console.log('Button 2 clicked')}
      ?fullWidth=${true}
    >
      Ac. 2
    </obc-button>
    <obc-button
      slot="buttons"
      @click=${() => console.log('Button 3 clicked')}
      ?fullWidth=${true}
    >
      Action number 3
    </obc-button>
    <div slot="content" style="padding: 24px;">
      <p>Add content here</p>
    </div>
  </obc-integration-vessel-menu>
`;

const templateWrappedButtons: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu .hideAlarmList=${args.hideAlarmList}>
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

export const WithoutAlarms: Story = {
  render: templateWithoutAlarms,
};

export const WithoutAlarmsHideEmptyAlarmList: Story = {
  render: templateWithoutAlarms,
  args: {hideAlarmList: true},
};

export const WithButtonsWrappedInDivWithoutStyling: Story = {
  render: templateWrappedButtons,
};
