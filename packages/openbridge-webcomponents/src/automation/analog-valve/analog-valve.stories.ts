import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-vite';
import {ObcAnalogValve, ObcValveHandle} from './analog-valve.js';
import {
  AutomationButtonLabelDirection,
  AutomationButtonReadoutPosition,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './analog-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';

const meta: Meta<typeof ObcAnalogValve> = {
  title: 'Automation/Automation Devices/Analog Valve',
  tags: ['autodocs'],
  component: 'obc-analog-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    labelDirection: AutomationButtonLabelDirection.right,
    alert: false,
    progress: false,
    vertical: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    labelDirection: {
      options: Object.values(AutomationButtonLabelDirection),
      control: {type: 'radio'},
    },
    value: {control: {type: 'range', min: 0, max: 100, step: 1}},
    handle: {
      options: Object.values(ObcValveHandle),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcAnalogValve>;

export default meta;
type Story = StoryObj<ObcAnalogValve>;

export const Open: Story = {
  args: {
    open: true,
    value: 20,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    value: 0,
  },
};

export const WithoutLabelDirection: Story = {
  args: {
    open: true,
    value: 20,
    labelDirection: AutomationButtonLabelDirection.none,
  },
};

export const WithBadges: Story = {
  args: {
    open: true,
    value: 20,
    badgeAlert: AutomationButtonBadgeAlert.Silence,
    badgeControl: AutomationButtonBadgeControl.Auto,
    badgeInterlock: AutomationButtonBadgeInterlock.Interlock,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
  },
};

export const WithSimulationBadge: Story = {
  args: {
    open: true,
    value: 20,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.Simulation,
  },
};

export const ClosedWithHandle: Story = {
  args: {
    open: false,
    value: 0,
    handle: ObcValveHandle.manual,
  },
};

export const OpenWithHandle: Story = {
  args: {
    open: true,
    value: 20,
    handle: ObcValveHandle.manual,
  },
};

export const HandleOnEverySide: Story = {
  render: () => html`
    <div style="display: flex; gap: 48px;">
      ${[false, true].map((vertical) =>
        [false, true].map(
          (invertHandlePosition) =>
            html`<obc-analog-valve
              positioning="button"
              tag=${`${vertical ? 'vertical' : 'horizontal'}${invertHandlePosition ? ' inverted' : ''}`}
              .vertical=${vertical}
              .invertHandlePosition=${invertHandlePosition}
              .handle=${ObcValveHandle.manual}
            ></obc-analog-valve>`
        )
      )}
    </div>
  `,
};

export const AllHandles: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 48px; width: 480px;">
      ${Object.values(ObcValveHandle)
        .filter((handle) => handle !== ObcValveHandle.none)
        .map(
          (handle) =>
            html`<obc-analog-valve
              positioning="button"
              tag=${handle}
              .handle=${handle}
            ></obc-analog-valve>`
        )}
    </div>
  `,
};
