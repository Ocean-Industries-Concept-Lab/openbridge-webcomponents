import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcAlertSubsystemCounter,
  ObcAlertSubsystemCounterOrientation,
} from './alert-subsystem-counter.js';
import './alert-subsystem-counter.js';
import '../badge/badge.js';
import '../../icons/icon-placeholder.js';

const badges = html`
  <obc-badge slot="badges" size="large" type="alarm" .number=${9}></obc-badge>
  <obc-badge slot="badges" size="large" type="warning" .number=${4}></obc-badge>
  <obc-badge slot="badges" size="large" type="caution" .number=${2}></obc-badge>
`;

const meta: Meta<typeof ObcAlertSubsystemCounter> = {
  title: 'Application Components/Alerts/Alert Subsystem Counter',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-subsystem-counter',
  args: {
    label: 'Label',
    orientation: ObcAlertSubsystemCounterOrientation.Horizontal,
    hasAlert: true,
    emptyText: 'No alerts',
  },
  argTypes: {
    orientation: {
      control: {type: 'inline-radio'},
      options: Object.values(ObcAlertSubsystemCounterOrientation),
    },
    hasAlert: {control: {type: 'boolean'}},
    label: {control: {type: 'text'}},
    emptyText: {control: {type: 'text'}},
  },
  render: (args) =>
    html`<div style="width:191px">
      <obc-alert-subsystem-counter
        .label=${args.label}
        .orientation=${args.orientation}
        .hasAlert=${args.hasAlert}
        .emptyText=${args.emptyText}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        ${badges}
      </obc-alert-subsystem-counter>
    </div>`,
} satisfies Meta<ObcAlertSubsystemCounter>;

export default meta;
type Story = StoryObj<ObcAlertSubsystemCounter>;

export const Default: Story = {};

export const Abbreviation: Story = {
  args: {label: 'ABC'},
};

export const NoAlerts: Story = {
  args: {hasAlert: false},
};

export const Vertical: Story = {
  args: {orientation: ObcAlertSubsystemCounterOrientation.Vertical},
};

export const VerticalNoAlerts: Story = {
  args: {
    orientation: ObcAlertSubsystemCounterOrientation.Vertical,
    hasAlert: false,
  },
};

export const AbbreviationVertical: Story = {
  args: {
    label: 'ABC',
    orientation: ObcAlertSubsystemCounterOrientation.Vertical,
  },
  render: (args) =>
    html`<div style="width:fit-content">
      <obc-alert-subsystem-counter
        .label=${args.label}
        .orientation=${args.orientation}
        .hasAlert=${args.hasAlert}
        .emptyText=${args.emptyText}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        ${badges}
      </obc-alert-subsystem-counter>
    </div>`,
};

export const WithoutIcon: Story = {
  render: (args) =>
    html`<div style="width:191px">
      <obc-alert-subsystem-counter
        .label=${args.label}
        .orientation=${args.orientation}
        .hasAlert=${args.hasAlert}
        .emptyText=${args.emptyText}
      >
        ${badges}
      </obc-alert-subsystem-counter>
    </div>`,
};
