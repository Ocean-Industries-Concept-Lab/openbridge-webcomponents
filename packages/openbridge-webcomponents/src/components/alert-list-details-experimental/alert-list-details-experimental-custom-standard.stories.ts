import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type TemplateResult} from 'lit';
import {
  ObcAlertListDetailsExperimental,
  actionColumn,
  statusColumn,
  timeColumn,
  type StandardAlertWithColumnFields,
} from './alert-list-details-experimental.js';
import {defineAlertStandard} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import type {StandardAlertOf} from '../../alert-system/standard-alert.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';
import {FlashingSpeed} from '../../types.js';
import '../../icons/icon-placeholder.js';

const healthAlarmGlyphFrame = (
  colourToken: string,
  filled: boolean
): TemplateResult =>
  html`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      fill=${filled ? `var(${colourToken})` : 'none'}
      stroke="var(${colourToken})"
      stroke-width="2"
    />
    <path
      d="M12 7v10M7 12h10"
      stroke=${filled ? 'var(--container-background-color)' : `var(${colourToken})`}
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </svg>`;

const flashingHealthAlarmGlyph = (colourToken: string) => ({
  frame: healthAlarmGlyphFrame(colourToken, true),
  flashFrame: healthAlarmGlyphFrame(colourToken, false),
});

const steadyHealthAlarmGlyph = (colourToken: string, filled: boolean) => ({
  frame: healthAlarmGlyphFrame(colourToken, filled),
});

/**
 * IEC 60601-1-8, the alarms of medical equipment, defined by the application
 * and not shipped with the library. An alarm keeps flashing after its sound
 * is silenced, and a latched alarm stays until it is reset.
 */
const iec6060118AlertStandardDefinedByTheApplication = defineAlertStandard({
  filters: {
    present: {
      label: () => 'Present',
      titleWhenNoAlertIsIncluded: () => 'No alarm condition present',
      iconWhenNoAlertIsIncluded: html`<obi-placeholder></obi-placeholder>`,
    },
    latched: {
      label: () => 'Latched',
      titleWhenNoAlertIsIncluded: () => 'No latched alarms',
      iconWhenNoAlertIsIncluded: html`<obi-placeholder></obi-placeholder>`,
    },
  },
  actions: {
    'silence-audio': {label: () => 'Silence'},
    reset: {label: () => 'Reset', canBeAppliedToSeveralAlertsAtOnce: true},
  },
  criticalities: {
    high: {
      states: {
        present: {
          glyph: flashingHealthAlarmGlyph('--alert-alarm-color'),
          sortingRank: 15,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: ['present'],
          offeredActions: ['silence-audio'],
        },
        'present-audio-silenced': {
          glyph: flashingHealthAlarmGlyph('--alert-alarm-color'),
          sortingRank: 16,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: ['present'],
        },
        latched: {
          glyph: steadyHealthAlarmGlyph('--alert-alarm-color', false),
          sortingRank: 150,
          includedInFilters: ['latched'],
          offeredActions: ['reset'],
        },
      },
    },
    medium: {
      states: {
        present: {
          glyph: flashingHealthAlarmGlyph('--alert-warning-color'),
          sortingRank: 35,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: ['present'],
          offeredActions: ['silence-audio'],
        },
        'present-audio-silenced': {
          glyph: flashingHealthAlarmGlyph('--alert-warning-color'),
          sortingRank: 36,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: ['present'],
        },
        latched: {
          glyph: steadyHealthAlarmGlyph('--alert-warning-color', false),
          sortingRank: 151,
          includedInFilters: ['latched'],
          offeredActions: ['reset'],
        },
      },
    },
    low: {
      states: {
        present: {
          glyph: steadyHealthAlarmGlyph('--alert-caution-color', true),
          sortingRank: 105,
          includedInFilters: ['present'],
        },
      },
    },
  },
  display: {
    textOf: (alert: StandardAlertWithColumnFields) => alert.text,
    labelOf: (alert: StandardAlertWithColumnFields) => alert.source,
    timeOf: (alert: StandardAlertWithColumnFields) => alert.time,
    formatTime: (time: Date) =>
      time.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
  },
});

type Iec6060118Alert = StandardAlertOf<
  typeof iec6060118AlertStandardDefinedByTheApplication
> &
  StandardAlertWithColumnFields;

const medicalAlerts: Iec6060118Alert[] = [
  {
    id: 'high-present',
    criticality: 'high',
    state: 'present',
    source: 'Patient monitor',
    text: 'High priority, present',
    tagId: 'HIGH-PRESENT',
    time: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'high-silenced',
    criticality: 'high',
    state: 'present-audio-silenced',
    source: 'Ventilator',
    text: 'High priority, audio silenced',
    tagId: 'HIGH-SILENCED',
    time: new Date('2024-01-15T14:36:00Z'),
  },
  {
    id: 'medium-present',
    criticality: 'medium',
    state: 'present',
    source: 'Infusion pump',
    text: 'Medium priority, present',
    tagId: 'MEDIUM-PRESENT',
    time: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'medium-latched',
    criticality: 'medium',
    state: 'latched',
    source: 'Infusion pump',
    text: 'Medium priority, latched until reset',
    tagId: 'MEDIUM-LATCHED',
    time: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'low-present',
    criticality: 'low',
    state: 'present',
    source: 'Pulse oximeter',
    text: 'Low priority, present',
    tagId: 'LOW-PRESENT',
    time: new Date('2024-01-15T14:33:00Z'),
  },
];

const meta: Meta<ObcAlertListDetailsExperimental> = {
  title:
    'Application Components/Alerts/Alert List Details Experimental/Custom Standard',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  args: {
    showHeader: true,
    columns: [statusColumn(), actionColumn({dividerRight: true}), timeColumn()],
    alerts: medicalAlerts,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertListDetailsExperimental'),
          'iec6060118AlertStandardDefinedByTheApplication'
        ),
      },
    },
  },
  argTypes: {
    columns: {control: false},
    filterId: {
      control: {type: 'select'},
      options: [undefined, 'present', 'latched'],
    },
  },
  render: (args) => {
    setAlertStandard(iec6060118AlertStandardDefinedByTheApplication);
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      .filterId=${args.filterId}
      .columns=${args.columns}
      .showHeader=${args.showHeader}
      .alerts=${args.alerts}
      .selectedRowId=${args.selectedRowId}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-details-experimental>`;
  },
} satisfies Meta<ObcAlertListDetailsExperimental>;

export default meta;
type Story = StoryObj<ObcAlertListDetailsExperimental>;

export const CustomStandard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A standard the application defines itself, not shipped with the library: IEC 60601-1-8, the alarms of medical equipment, written in this story file with `defineAlertStandard()` and set with `setAlertStandard()`. Its glyphs, sorting, actions and filters reach the list unchanged. Its `display` tells the list which fields of the alert to show, and `formatTime` shows the time as hours and minutes.',
      },
    },
  },
};
