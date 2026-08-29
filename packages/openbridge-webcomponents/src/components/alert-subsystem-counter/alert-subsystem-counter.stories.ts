import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing, type TemplateResult} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  ObcAlertSubsystemCounter,
  ObcAlertSubsystemCounterOrientation,
} from './alert-subsystem-counter.js';
import './alert-subsystem-counter.js';
import '../badge/badge.js';
import {BadgeType, BadgeVariant} from '../badge/badge.js';
import '../../icons/icon-placeholder.js';

const badges = html`
  <obc-badge slot="badges" size="large" type="alarm" .number=${9}></obc-badge>
  <obc-badge slot="badges" size="large" type="warning" .number=${4}></obc-badge>
  <obc-badge slot="badges" size="large" type="caution" .number=${2}></obc-badge>
`;

const levelBadges = html`
  <obc-badge
    slot="badges"
    size="large"
    type=${BadgeType.levelCritical}
    .number=${1}
  ></obc-badge>
  <obc-badge
    slot="badges"
    size="large"
    type=${BadgeType.levelHigh}
    .number=${9}
  ></obc-badge>
  <obc-badge
    slot="badges"
    size="large"
    type=${BadgeType.levelMedium}
    .number=${4}
  ></obc-badge>
  <obc-badge
    slot="badges"
    size="large"
    type=${BadgeType.levelLow}
    .number=${2}
  ></obc-badge>
  <obc-badge
    slot="badges"
    size="large"
    type=${BadgeType.levelDiagnostic}
    .number=${7}
  ></obc-badge>
`;

const iconBadges = html`
  <obc-badge
    slot="badges"
    size="large"
    type="alarm"
    variant=${BadgeVariant.flat}
    showIcon
    .number=${9}
  ></obc-badge>
  <obc-badge
    slot="badges"
    size="large"
    type="warning"
    variant=${BadgeVariant.flat}
    showIcon
    .number=${4}
  ></obc-badge>
  <obc-badge
    slot="badges"
    size="large"
    type="caution"
    variant=${BadgeVariant.flat}
    showIcon
    .number=${2}
  ></obc-badge>
`;

type CounterArgs = Pick<
  ObcAlertSubsystemCounter,
  'label' | 'orientation' | 'hasAlert' | 'emptyText'
>;

// `emptyText` is gated on `hasAlert==false`, so Storybook drops it from the
// args while `hasAlert` is on; attribute bindings with `ifDefined` leave the
// element's own default in place instead of writing `undefined` into it.
const renderCounter = (
  args: CounterArgs,
  options: {width?: string; withIcon?: boolean; badges?: TemplateResult} = {}
) =>
  html`<div style="width:${options.width ?? '191px'}">
    <obc-alert-subsystem-counter
      label=${ifDefined(args.label)}
      .orientation=${args.orientation}
      .hasAlert=${args.hasAlert}
      emptytext=${ifDefined(args.emptyText)}
    >
      ${options.withIcon === false
        ? nothing
        : html`<obi-placeholder slot="icon"></obi-placeholder>`}
      ${options.badges ?? badges}
    </obc-alert-subsystem-counter>
  </div>`;

const meta: Meta<typeof ObcAlertSubsystemCounter> = {
  title: 'Application Components/Alerts/Alert Subsystem Counter',
  tags: ['autodocs', '6.0', 'beta'],
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
  render: (args) => renderCounter(args),
} satisfies Meta<ObcAlertSubsystemCounter>;

export default meta;
type Story = StoryObj<ObcAlertSubsystemCounter>;

export const Default: Story = {};

export const Abbreviation: Story = {
  args: {label: 'ABC'},
  render: (args) => renderCounter(args, {width: '172px'}),
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
  render: (args) => renderCounter(args, {width: 'fit-content'}),
};

export const WithoutIcon: Story = {
  render: (args) => renderCounter(args, {withIcon: false}),
};

export const LongLabel: Story = {
  args: {label: 'Auxiliary cooling water system'},
  parameters: {
    docs: {
      description: {
        story:
          'The label is the only element that gives way: it truncates with an ellipsis while the icon and badges keep their size.',
      },
    },
  },
};

export const LevelSeverities: Story = {
  render: (args) =>
    renderCounter(args, {width: 'fit-content', badges: levelBadges}),
  parameters: {
    docs: {
      description: {
        story:
          'The badge `type` accepts the whole `AlertType` vocabulary, including the `level-*` family. Slot them highest severity first, in `ALERT_SEVERITY_PRIORITY` order.',
      },
    },
  },
};

export const WithBadgeIcons: Story = {
  render: (args) =>
    renderCounter(args, {width: 'fit-content', badges: iconBadges}),
  parameters: {
    docs: {
      description: {
        story:
          'Any `obc-badge` configuration works in the `badges` slot — here the `flat` variant with `showIcon` so each count carries its severity symbol.',
      },
    },
  },
};

type OverviewEntry = {
  label: string;
  hasAlert: boolean;
  badges?: TemplateResult;
  withIcon?: boolean;
};

const overview: OverviewEntry[] = [
  {
    label: 'Propulsion',
    hasAlert: true,
    badges: html`<obc-badge
        slot="badges"
        size="large"
        type="alarm"
        .number=${2}
      ></obc-badge>
      <obc-badge
        slot="badges"
        size="large"
        type="warning"
        .number=${1}
      ></obc-badge>`,
  },
  {label: 'Navigation', hasAlert: false},
  {
    label: 'Power',
    hasAlert: true,
    badges: html`<obc-badge
      slot="badges"
      size="large"
      type="caution"
      .number=${3}
    ></obc-badge>`,
  },
  {
    label: 'HVAC',
    hasAlert: true,
    badges: html`<obc-badge
        slot="badges"
        size="large"
        type=${BadgeType.levelHigh}
        .number=${9}
      ></obc-badge>
      <obc-badge
        slot="badges"
        size="large"
        type=${BadgeType.levelMedium}
        .number=${4}
      ></obc-badge>
      <obc-badge
        slot="badges"
        size="large"
        type=${BadgeType.levelLow}
        .number=${2}
      ></obc-badge>`,
  },
  {label: 'Cargo', hasAlert: false, withIcon: false},
  {
    label: 'Fire detection',
    hasAlert: true,
    withIcon: false,
    badges: html`<obc-badge
      slot="badges"
      size="large"
      type="alarm"
      .number=${12}
    ></obc-badge>`,
  },
];

export const Overview: Story = {
  render: (args) =>
    html`<div
      style="display:grid;grid-template-columns:repeat(2, 240px);gap:8px"
    >
      ${overview.map((entry) =>
        renderCounter(
          {...args, label: entry.label, hasAlert: entry.hasAlert},
          {width: '240px', withIcon: entry.withIcon, badges: entry.badges}
        )
      )}
    </div>`,
  parameters: {
    docs: {
      description: {
        story:
          'A status overview composes one counter per subsystem in a grid. Counters with and without alerts, with and without icons, and with different badge families share one row height.',
      },
    },
  },
};

export const OverviewVertical: Story = {
  args: {orientation: ObcAlertSubsystemCounterOrientation.Vertical},
  render: (args) =>
    html`<div
      style="display:grid;grid-template-columns:repeat(3, 120px);gap:8px;align-items:stretch"
    >
      ${overview.map((entry) =>
        renderCounter(
          {...args, label: entry.label, hasAlert: entry.hasAlert},
          {width: '120px', withIcon: entry.withIcon, badges: entry.badges}
        )
      )}
    </div>`,
};
