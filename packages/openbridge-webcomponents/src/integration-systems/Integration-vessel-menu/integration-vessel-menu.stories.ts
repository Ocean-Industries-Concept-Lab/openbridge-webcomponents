import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import type {ObcIntegrationVesselMenu} from './integration-vessel-menu.js';
import './integration-vessel-menu.js';
import '../../icons/icon-placeholder.js';
import {ObcAlertMenuItemStatus} from '../../components/alert-menu-item/alert-menu-item.js';
import '../../components/alert-menu-item/alert-menu-item.js';
import '../../icons/icon-caution-color-iec.js';

const handleAck = (event: Event) => {
  const alertItem = event.target as HTMLElement;
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
  tags: ['6.1'],
  args: {hideHeader: false, numberOfButtons: 3},
  argTypes: {
    hideHeader: {control: 'boolean'},
    numberOfButtons: {
      control: 'number',
      min: 0,
      max: 3,
      step: 1,
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
  hideHeader: boolean;
  numberOfButtons: number;
}

type IntegrationVesselMenuTemplate = (
  args: IntegrationVesselMenuArgs
) => ReturnType<typeof html>;

const template: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu
    .hideHeader=${args.hideHeader}
    .numberOfButtons=${args.numberOfButtons}
    @button-1-click=${() => console.log('Button 1 clicked')}
    @button-2-click=${() => console.log('Button 2 clicked')}
    @button-3-click=${() => console.log('Button 3 clicked')}
  >
    <div slot="content" style="padding: 24px;">
      <div style="width: 496px; height: 256;">
        <p>Content area</p>
      </div>
    </div>
    <obi-placeholder slot="button-1-leading-icon"></obi-placeholder>
    <div slot="button-1-label">Action 1</div>
    <obi-placeholder slot="button-2-leading-icon"></obi-placeholder>
    <div slot="button-2-label">Ac. 2</div>
    <obi-placeholder slot="button-3-leading-icon"></obi-placeholder>
    <div slot="button-3-label">Action number 3</div>
    ${renderAlarms()}
  </obc-integration-vessel-menu>
`;

const templateWithoutAlarms: IntegrationVesselMenuTemplate = (args) => html`
  <obc-integration-vessel-menu
    .hideHeader=${args.hideHeader}
    .numberOfButtons=${args.numberOfButtons}
    @button-1-click=${() => console.log('Button 1 clicked')}
    @button-2-click=${() => console.log('Button 2 clicked')}
    @button-3-click=${() => console.log('Button 3 clicked')}
  >
    <div slot="content" style="padding: 24px;">
      <p>Add content here</p>
    </div>
  </obc-integration-vessel-menu>
`;

export const Default: Story = {
  render: template,
};

export const WithoutAlarms: Story = {
  render: templateWithoutAlarms,
};
