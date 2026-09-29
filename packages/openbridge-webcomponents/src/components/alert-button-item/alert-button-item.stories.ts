import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertButtonItem, ObcAlertButtonType} from './alert-button-item.js';
import './alert-button-item.js';
import {AlertType, FlashingSpeed, type AlertCounts} from '../../types.js';

type ItemArgs = Pick<
  ObcAlertButtonItem,
  | 'type'
  | 'alertType'
  | 'nAlerts'
  | 'counter'
  | 'globalCounter'
  | 'counts'
  | 'shelvedCount'
  | 'blinking'
  | 'flashingSpeed'
  | 'fillHeight'
>;

const SEVERITY_COUNTS: AlertCounts = {
  countAlarm: 2,
  countWarning: 4,
  countCaution: 6,
};

// Storybook drops the args whose `@availableWhen` gate is off, so every
// binding falls back to the element default.
const renderItem = (args: Partial<ItemArgs>) =>
  html`<obc-alert-button-item
    .type=${args.type ?? ObcAlertButtonType.Normal}
    .alertType=${args.alertType}
    .nAlerts=${args.nAlerts ?? 0}
    .counter=${args.counter ?? false}
    .globalCounter=${args.globalCounter ?? false}
    .counts=${args.counts ?? {}}
    .shelvedCount=${args.shelvedCount ?? 0}
    .blinking=${args.blinking ?? false}
    .flashingSpeed=${args.flashingSpeed ?? FlashingSpeed.Default}
    .fillHeight=${args.fillHeight ?? false}
  ></obc-alert-button-item>`;

const meta: Meta<ItemArgs> = {
  title: 'Application Components/Alerts/Alert Button Item',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-alert-button-item',
  args: {
    type: ObcAlertButtonType.Normal,
    alertType: AlertType.Alarm,
    nAlerts: 3,
    counter: true,
    globalCounter: false,
    blinking: false,
  },
  argTypes: {
    type: {
      control: {type: 'inline-radio'},
      options: Object.values(ObcAlertButtonType),
    },
    alertType: {control: {type: 'select'}, options: Object.values(AlertType)},
    nAlerts: {control: {type: 'number', min: 0}},
    counts: {control: {type: 'object'}},
    shelvedCount: {control: {type: 'number', min: 0}},
    flashingSpeed: {
      control: {type: 'select'},
      options: Object.values(FlashingSpeed),
    },
  },
  render: (args) => renderItem(args),
} satisfies Meta<ItemArgs>;

export default meta;
type Story = StoryObj<ItemArgs>;

export const Default: Story = {};

export const WithoutCounter: Story = {
  args: {counter: false},
};

export const Flat: Story = {
  args: {type: ObcAlertButtonType.Flat},
};

export const Enhanced: Story = {
  args: {type: ObcAlertButtonType.Enhanced},
};

export const NoAlerts: Story = {
  args: {nAlerts: 0, alertType: undefined},
};

export const Blinking: Story = {
  args: {blinking: true},
};

export const EnabledVariants: Story = {
  render: () =>
    html`<div style="display:flex;gap:24px;align-items:center">
      ${renderItem({type: ObcAlertButtonType.Flat})}
      ${renderItem({type: ObcAlertButtonType.Normal})}
      ${[AlertType.Caution, AlertType.Warning, AlertType.Alarm].map(
        (alertType) =>
          [
            ObcAlertButtonType.Flat,
            ObcAlertButtonType.Normal,
            ObcAlertButtonType.Enhanced,
          ].map((type) =>
            renderItem({type, alertType, nAlerts: 3, counter: true})
          )
      )}
      ${renderItem({globalCounter: true, nAlerts: 12, counts: SEVERITY_COUNTS})}
    </div>`,
  parameters: {
    docs: {
      description: {
        story:
          'The Enabled row of the Figma Alert button item: flat and normal without alerts; flat, normal and enhanced for caution, warning and alarm; the global counter.',
      },
    },
  },
};

export const LevelSeverities: Story = {
  render: () =>
    html`<div style="display:flex;gap:24px;align-items:center">
      ${[
        AlertType.LevelCritical,
        AlertType.LevelHigh,
        AlertType.LevelMedium,
        AlertType.LevelLow,
        AlertType.LevelDiagnostic,
      ].map((alertType) =>
        [ObcAlertButtonType.Normal, ObcAlertButtonType.Enhanced].map((type) =>
          renderItem({type, alertType, nAlerts: 3, counter: true})
        )
      )}
    </div>`,
};

export const GlobalCounter: Story = {
  args: {globalCounter: true, nAlerts: 12, counts: SEVERITY_COUNTS},
};

export const GlobalCounterWithShelved: Story = {
  args: {
    globalCounter: true,
    nAlerts: 12,
    counts: SEVERITY_COUNTS,
    shelvedCount: 9,
  },
};

export const GlobalCounterLevelSeverities: Story = {
  args: {
    globalCounter: true,
    nAlerts: 23,
    counts: {
      countLevelCritical: 1,
      countLevelHigh: 9,
      countLevelMedium: 4,
      countLevelLow: 2,
      countLevelDiagnostic: 7,
    },
  },
};

export const FillHeight: Story = {
  render: () =>
    html`<div style="display:flex;height:56px">
      ${renderItem({
        alertType: AlertType.Alarm,
        nAlerts: 3,
        counter: true,
        fillHeight: true,
      })}
    </div>`,
};
