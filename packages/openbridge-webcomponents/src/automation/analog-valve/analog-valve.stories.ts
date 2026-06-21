import type {Meta, StoryObj} from '@storybook/web-vite';
import {html} from 'lit';
import {ObcAnalogValve} from './analog-valve.js';
import {AutomationButtonReadoutPosition} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './analog-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import '../automation-badge/automation-badge.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-timer-google.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';
import {ObcAlertFrameType} from '../../components/alert-frame/alert-frame.js';

const meta: Meta<typeof ObcAnalogValve> = {
  title: 'Automation/Automation Devices/Analog Valve',
  tags: ['autodocs'],
  component: 'obc-analog-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    vertical: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    value: {control: {type: 'range', min: 0, max: 100, step: 1}},
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

/**
 * The analog valve forwards the `alert-frame-icon`, `alert-frame-label` and
 * `alert-frame-timer` slots down to the alert frame. With the `bottom-flip`
 * frame type the flap shows a custom icon together with a label and a clock.
 * See `ObcAbstractAutomationButton` for the documentation of these slots.
 */
export const AlertFrameWithIconLabelAndClock: Story = {
  args: {
    open: true,
    value: 20,
    alert: true,
    alertFrameType: ObcAlertFrameType.BottomFlip,
    showAlertIcon: true,
  },
  render: (args) => html`
    <obc-analog-valve
      .open=${args.open}
      .value=${args.value}
      .tag=${args.tag}
      .readoutPosition=${args.readoutPosition}
      .readoutSize=${args.readoutSize}
      .showReadoutStack=${args.showReadoutStack}
      ?alert=${args.alert}
      .alertFrameType=${args.alertFrameType}
      .showAlertIcon=${args.showAlertIcon}
    >
      <obi-placeholder slot="alert-frame-icon"></obi-placeholder>
      <span slot="alert-frame-label">Alert</span>
      <obi-timer-google slot="alert-frame-timer"></obi-timer-google>
    </obc-analog-valve>
  `,
};
