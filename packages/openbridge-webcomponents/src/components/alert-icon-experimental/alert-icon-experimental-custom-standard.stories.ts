import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type TemplateResult} from 'lit';
import {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {alertStandardMatrix} from '../../storybook-util.js';
import {defineAlertStandard} from '../../alert-system/alert-standard.js';
import '../../icons/icon-placeholder.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

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
});

const iconOfCriticalityAndState = (criticality: string, state: string) =>
  html`<div style="width: 32px; height: 32px">
    <obc-alert-icon-experimental
      .criticality=${criticality}
      .state=${state}
    ></obc-alert-icon-experimental>
  </div>`;

const meta: Meta<ObcAlertIconExperimental> = {
  title:
    'Application Components/Alerts/Alert Icon Experimental/Custom Standard',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-icon-experimental',
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertIconExperimental'),
          'iec6060118AlertStandardDefinedByTheApplication'
        ),
      },
    },
  },
  render: () => {
    setAlertStandard(iec6060118AlertStandardDefinedByTheApplication);
    return alertStandardMatrix(
      iec6060118AlertStandardDefinedByTheApplication,
      [],
      iconOfCriticalityAndState
    );
  },
} satisfies Meta<ObcAlertIconExperimental>;

export default meta;
type Story = StoryObj<ObcAlertIconExperimental>;

export const CustomStandard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A standard the application defines itself, not shipped with the library: IEC 60601-1-8, the alarms of medical equipment, written in this story file with `defineAlertStandard()` and set with `setAlertStandard()`. It brings its own priorities, states, glyphs and tempo; no component changes.',
      },
    },
  },
};
