import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcAlertCounterItem,
  ObcAlertCounterItemType,
} from './alert-counter-item.js';
import './alert-counter-item.js';
import type {AlertCounts} from '../../types.js';

const LEVEL_COUNTS: AlertCounts = {
  countLevelCritical: 1,
  countLevelHigh: 9,
  countLevelMedium: 4,
  countLevelLow: 2,
  countLevelDiagnostic: 7,
};

const meta: Meta<typeof ObcAlertCounterItem> = {
  title: 'Application Components/Alerts/Alert Counter Item',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-alert-counter-item',
  args: {
    type: ObcAlertCounterItemType.Badges,
    counts: {countAlarm: 2, countWarning: 4, countCaution: 6},
    shelvedCount: 0,
  },
  argTypes: {
    type: {
      control: {type: 'inline-radio'},
      options: Object.values(ObcAlertCounterItemType),
    },
    counts: {control: {type: 'object'}},
    shelvedCount: {control: {type: 'number', min: 0}},
  },
  render: (args) =>
    html`<obc-alert-counter-item
      .type=${args.type}
      .counts=${args.counts}
      .shelvedCount=${args.shelvedCount}
    ></obc-alert-counter-item>`,
} satisfies Meta<ObcAlertCounterItem>;

export default meta;
type Story = StoryObj<ObcAlertCounterItem>;

export const Badges: Story = {};

export const BadgesWithShelved: Story = {
  args: {shelvedCount: 9},
};

export const AlertLevel: Story = {
  args: {type: ObcAlertCounterItemType.AlertLevel},
};

export const AlertLevelWithShelved: Story = {
  args: {type: ObcAlertCounterItemType.AlertLevel, shelvedCount: 9},
};

export const LevelSeverities: Story = {
  args: {counts: LEVEL_COUNTS},
};

export const LevelSeveritiesAlertLevel: Story = {
  args: {type: ObcAlertCounterItemType.AlertLevel, counts: LEVEL_COUNTS},
};
