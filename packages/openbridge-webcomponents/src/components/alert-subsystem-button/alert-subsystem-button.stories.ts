import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertSubsystemButton} from './alert-subsystem-button.js';
import './alert-subsystem-button.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcAlertSubsystemButton> = {
  title: 'Application Components/Alerts/Alert Subsystem Button',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-alert-subsystem-button',
  args: {
    counts: {countCaution: 2},
    hasAlert: true,
    label: '',
    emptyText: 'No alerts',
  },
  argTypes: {
    counts: {control: {type: 'object'}},
  },
} satisfies Meta<ObcAlertSubsystemButton>;

export default meta;
type Story = StoryObj<ObcAlertSubsystemButton>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {label: 'HVAC', counts: {countAlarm: 1, countCaution: 2}},
  // A hand-written render for the slotted icon, so it binds every arg itself.
  render: (args) =>
    html`<obc-alert-subsystem-button
      .counts=${args.counts ?? {}}
      ?hasAlert=${args.hasAlert}
      .label=${args.label}
      .emptyText=${args.emptyText}
      ?disabled=${args.disabled}
      ?counterDisabled=${args.counterDisabled}
      ?listDisabled=${args.listDisabled}
      ><obi-placeholder slot="icon"></obi-placeholder
    ></obc-alert-subsystem-button>`,
};

export const NoAlerts: Story = {
  args: {hasAlert: false},
};

export const LevelSeverities: Story = {
  args: {
    counts: {
      countLevelCritical: 1,
      countLevelHigh: 9,
      countLevelMedium: 4,
      countLevelLow: 2,
      countLevelDiagnostic: 7,
    },
  },
};

export const Disabled: Story = {
  args: {disabled: true},
};

export const CounterDisabled: Story = {
  args: {counterDisabled: true},
};

export const ListDisabled: Story = {
  args: {listDisabled: true},
};
