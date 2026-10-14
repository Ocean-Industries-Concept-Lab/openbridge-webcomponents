/**
 * `iec-60601-1-8-alert-standard` – An alert standard defined outside the
 * library, for the stories. The library does not ship it.
 */
import {html, type TemplateResult} from 'lit';
import '../../icons/icon-placeholder.js';
import {FlashingSpeed} from '../../types.js';
import {defineAlertStandard} from '../alert-standard.js';

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
 * IEC 60601-1-8, the alarms of medical equipment, as a standard from outside
 * the library: its own priorities, states, glyphs and filters. Copy this
 * file to define a standard of your own. An alarm keeps
 * flashing after its sound is silenced, and a latched alarm stays until it
 * is reset. The standard asks 1.4 to 2.8 Hz for a high priority; `fast`, at
 * 1.25 Hz, is the quickest tempo the library has.
 */
export const iec6060118AlertStandard = defineAlertStandard({
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
