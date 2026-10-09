import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import './alert-icon-experimental.js';
import '../../icons/icon-caution-color-iec.js';
import {FlashingSpeed} from '../../types.js';
import {alertSystemMatrix} from '../../storybook-util.js';
import {
  AlertAcknowledgement,
  AlertCondition,
  NoAckGlyph,
  makePresentation,
  rankByUrgency,
  type AlertGlyph,
  type AlertPresentation,
  type AlertPresentOptions,
  type AlertSystem,
} from '../../alert-system/alert-system.js';
import {registerAlertSystem} from '../../alert-system/alert-systems.js';
import {
  ALARM_GLYPHS,
  MaritimeAlertCriticality,
  MaritimeAlertState,
  WARNING_GLYPHS,
} from '../../alert-system/maritime-alert-system.js';
import {
  AutomationAlertCriticality,
  AutomationAlertState,
} from '../../alert-system/automation-alert-system.js';

const meta: Meta<typeof ObcAlertIconExperimental> = {
  title: 'Application Components/Alerts/Alert Icon Experimental',
  tags: ['autodocs', '6.0', 'experimental'],
  component: 'obc-alert-icon-experimental',
  args: {
    standard: 'iec-62923',
    criticality: MaritimeAlertCriticality.Alarm,
    state: MaritimeAlertState.ActiveUnacknowledged,
    flashingSpeed: FlashingSpeed.Default,
  },
  argTypes: {
    standard: {
      control: {type: 'select'},
      options: ['iec-62923', 'isa-18.2'],
    },
    criticality: {
      control: {type: 'select'},
      options: [
        ...Object.values(MaritimeAlertCriticality),
        ...Object.values(AutomationAlertCriticality),
      ],
    },
    state: {
      control: {type: 'select'},
      options: [
        ...new Set([
          ...Object.values(MaritimeAlertState),
          ...Object.values(AutomationAlertState),
        ]),
      ],
    },
    flashingSpeed: {
      control: {type: 'select'},
      options: Object.values(FlashingSpeed),
    },
  },
  render: (args) =>
    html`<div style="width: 64px; height: 64px">
      <obc-alert-icon-experimental
        .standard=${args.standard}
        .criticality=${args.criticality}
        .state=${args.state}
        .setAside=${args.setAside}
        .flashingSpeed=${args.flashingSpeed}
      ></obc-alert-icon-experimental>
    </div>`,
} satisfies Meta<ObcAlertIconExperimental>;

export default meta;
type Story = StoryObj<ObcAlertIconExperimental>;

export const Primary: Story = {};

export const AutomationHigh: Story = {
  args: {
    standard: 'isa-18.2',
    criticality: AutomationAlertCriticality.High,
    state: AutomationAlertState.LatchedUnacknowledged,
  },
};

const standardStory = (
  name: string,
  standard: string,
  story: string
): Story => ({
  name,
  parameters: {docs: {description: {story}}},
  render: () =>
    alertSystemMatrix(
      standard,
      (criticality, state) =>
        html`<div style="width: 32px; height: 32px">
          <obc-alert-icon-experimental
            .standard=${standard}
            .criticality=${criticality}
            .state=${state}
          ></obc-alert-icon-experimental>
        </div>`
    ),
});

export const Iec62923 = standardStory(
  'IEC 62923',
  'iec-62923',
  'Every criticality of IEC 62923 in every state it takes. An emergency alarm and a caution take no acknowledgement, so they are only active or normal.'
);

export const Isa182 = standardStory(
  'ISA-18.2',
  'isa-18.2',
  'Every priority of ISA-18.2 in every state it takes. A diagnostic alert takes no acknowledgement, so it is only active or normal.'
);

enum HealthAlertCriticality {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

enum HealthAlertState {
  Present = 'present',
  /** Acknowledging silences the sound; the light keeps flashing. */
  Acknowledged = 'acknowledged',
  /** The condition cleared; the alarm stays until an operator resets it. */
  Latched = 'latched',
  Absent = 'absent',
}

const CAUTION_GLYPH: AlertGlyph = {
  frame: html`<obi-caution-color-iec usecsscolor></obi-caution-color-iec>`,
};

const HEALTH_GLYPHS = {
  [HealthAlertCriticality.High]: ALARM_GLYPHS,
  [HealthAlertCriticality.Medium]: WARNING_GLYPHS,
  [HealthAlertCriticality.Low]: {
    unacknowledged: CAUTION_GLYPH,
    silenced: CAUTION_GLYPH,
    rectified: CAUTION_GLYPH,
    normal: CAUTION_GLYPH,
  },
};

// IEC 60601-1-8 asks 1.4 to 2.8 Hz for a high priority; fast, at 1.25 Hz, is
// the quickest tempo the library has.
const HEALTH_FLASH = {
  [HealthAlertCriticality.High]: FlashingSpeed.Fast,
  [HealthAlertCriticality.Medium]: FlashingSpeed.Slow,
  [HealthAlertCriticality.Low]: FlashingSpeed.Fixed,
} as const;

function presentHealth(
  criticality: HealthAlertCriticality,
  state: HealthAlertState,
  options?: AlertPresentOptions
): AlertPresentation {
  const glyphs = HEALTH_GLYPHS[criticality];
  const flash = options?.setAside
    ? FlashingSpeed.Fixed
    : HEALTH_FLASH[criticality];
  switch (state) {
    case HealthAlertState.Acknowledged:
      return makePresentation(
        glyphs.silenced,
        {
          condition: AlertCondition.Active,
          acknowledgement: AlertAcknowledgement.Acked,
          silenced: true,
          flash,
        },
        options
      );
    case HealthAlertState.Latched:
      return makePresentation(
        glyphs.rectified,
        {
          condition: AlertCondition.Cleared,
          acknowledgement: AlertAcknowledgement.Unacked,
          resetOwed: true,
          flash,
        },
        options
      );
    case HealthAlertState.Absent:
      return makePresentation(
        glyphs.normal,
        {
          condition: AlertCondition.Normal,
          acknowledgement: AlertAcknowledgement.None,
          flash: FlashingSpeed.Fixed,
        },
        options
      );
    default:
      return makePresentation(
        glyphs.unacknowledged,
        {
          condition: AlertCondition.Active,
          acknowledgement: AlertAcknowledgement.Unacked,
          flash,
        },
        options
      );
  }
}

const HEALTH_CRITICALITIES = Object.values(HealthAlertCriticality);

const HEALTH_LABEL: Record<HealthAlertCriticality, string> = {
  [HealthAlertCriticality.High]: 'High',
  [HealthAlertCriticality.Medium]: 'Medium',
  [HealthAlertCriticality.Low]: 'Low',
};

const healthAlertSystem: AlertSystem<HealthAlertCriticality, HealthAlertState> =
  {
    id: 'iec-60601-1-8',
    criticalities: HEALTH_CRITICALITIES,
    states: Object.values(HealthAlertState),
    statesOf: () => Object.values(HealthAlertState),
    allowsBulkAcknowledge: true,
    label: (criticality) => HEALTH_LABEL[criticality],
    present: presentHealth,
    noAckGlyph: (criticality) =>
      criticality === HealthAlertCriticality.High
        ? NoAckGlyph.Alarm
        : NoAckGlyph.Warning,
    displayRank: (criticality, state) =>
      rankByUrgency(
        presentHealth(criticality, state),
        HEALTH_CRITICALITIES.indexOf(criticality)
      ),
  };

registerAlertSystem(healthAlertSystem);

export const CustomStandard = standardStory(
  'Custom Standard',
  'iec-60601-1-8',
  'A standard from outside the library: IEC 60601-1-8, the alarms of medical equipment, defined and registered in this story file with `registerAlertSystem()`. It brings its own priorities, states, glyphs and tempo; no component changes. Acknowledging silences the sound and the light keeps flashing, and a latched alarm stays until it is reset.'
);
