import {describe, expect, it} from 'vitest';
import {
  AlertAcknowledgement as Ack,
  AlertCondition as Condition,
  AlertSetAside,
  NoAckGlyph,
  type AlertPresentation,
  type AlertSystem,
} from './alert-system.js';
import {
  alertSystem,
  registerAlertSystem,
  registeredAlertSystems,
} from './alert-systems.js';
import {
  MaritimeAlertCriticality as Maritime,
  MaritimeAlertState as MaritimeState,
  maritimeAlertSystem,
} from './maritime-alert-system.js';
import {
  AutomationAlertCriticality as Automation,
  AutomationAlertState as AutomationState,
  automationAlertSystem,
} from './automation-alert-system.js';
import {FlashingSpeed} from '../types.js';

type Row = [
  criticality: string,
  state: string,
  condition: Condition,
  acknowledgement: Ack,
  flash: FlashingSpeed,
];

/** The drawing-relevant part of a presentation, for table rows. */
const core = ({condition, acknowledgement, flash}: AlertPresentation) => [
  condition,
  acknowledgement,
  flash,
];

function expectRows(system: AlertSystem, rows: Row[]) {
  for (const [criticality, state, ...expected] of rows) {
    expect([
      criticality,
      state,
      ...core(system.present(criticality, state)),
    ]).toEqual([criticality, state, ...expected]);
  }
}

/** The tag of the element a glyph frame draws, or `svg` for a raw template. */
const tagOf = (frame: unknown) =>
  (frame as {strings?: TemplateStringsArray}).strings?.[0].match(
    /<([a-z-]+)/
  )?.[1];

describe('IEC 62923 (iec-62923)', () => {
  const system = maritimeAlertSystem as AlertSystem;

  it('ranks emergency alarm, alarm, warning, caution, and acknowledges one at a time', () => {
    expect(system.criticalities).toEqual([
      Maritime.EmergencyAlarm,
      Maritime.Alarm,
      Maritime.Warning,
      Maritime.Caution,
    ]);
    expect(system.allowsBulkAcknowledge).toBe(false);
  });

  it('presents the alarm and warning states', () => {
    expectRows(system, [
      [
        Maritime.Alarm,
        MaritimeState.ActiveUnacknowledged,
        Condition.Active,
        Ack.Unacked,
        FlashingSpeed.Fast,
      ],
      [
        Maritime.Alarm,
        MaritimeState.ActiveSilenced,
        Condition.Active,
        Ack.Unacked,
        FlashingSpeed.Fast,
      ],
      [
        Maritime.Alarm,
        MaritimeState.ActiveAcknowledged,
        Condition.Active,
        Ack.Acked,
        FlashingSpeed.Fixed,
      ],
      [
        Maritime.Warning,
        MaritimeState.ActiveResponsibilityTransferred,
        Condition.Active,
        Ack.Unacked,
        FlashingSpeed.Fixed,
      ],
      [
        Maritime.Warning,
        MaritimeState.RectifiedUnacknowledged,
        Condition.Cleared,
        Ack.Unacked,
        FlashingSpeed.VerySlow,
      ],
      [
        Maritime.Alarm,
        MaritimeState.Normal,
        Condition.Normal,
        Ack.Acked,
        FlashingSpeed.Fixed,
      ],
    ]);
  });

  it('gives emergency alarms and cautions only active and normal', () => {
    expect(
      [Maritime.EmergencyAlarm, Maritime.Caution, Maritime.Alarm].map(
        (criticality) => system.statesOf(criticality).length
      )
    ).toEqual([2, 2, 6]);
    expectRows(system, [
      [
        Maritime.EmergencyAlarm,
        MaritimeState.Active,
        Condition.Active,
        Ack.None,
        FlashingSpeed.Fast,
      ],
      [
        Maritime.Caution,
        MaritimeState.Active,
        Condition.Active,
        Ack.None,
        FlashingSpeed.Fixed,
      ],
      [
        Maritime.Caution,
        MaritimeState.RectifiedUnacknowledged,
        Condition.Normal,
        Ack.None,
        FlashingSpeed.Fixed,
      ],
    ]);
  });

  it('draws the IEC 62923 icons, the emergency alarm as a flashing square', () => {
    const glyphs = [
      system.present(Maritime.EmergencyAlarm, MaritimeState.Active).glyph,
      system.present(Maritime.Alarm, MaritimeState.ActiveSilenced).glyph,
      system.present(
        Maritime.Warning,
        MaritimeState.ActiveResponsibilityTransferred
      ).glyph,
    ];
    expect(glyphs.map(({frame}) => tagOf(frame))).toEqual([
      'obi-alarm-emergency-iec',
      'obi-alarm-silenced-iec',
      'obi-warning-transferred-iec',
    ]);
    expect(glyphs.map(({flashFrame}) => flashFrame !== undefined)).toEqual([
      true,
      true,
      false,
    ]);
  });

  it('keeps the flash of an alert set aside', () => {
    const shelved = system.present(
      Maritime.Alarm,
      MaritimeState.ActiveUnacknowledged,
      {setAside: AlertSetAside.Shelved}
    );
    expect([shelved.setAside, shelved.flash]).toEqual([
      AlertSetAside.Shelved,
      FlashingSpeed.Fast,
    ]);
  });

  it('picks the alarm no-ACK glyph for alarms, the warning one for the rest', () => {
    expect(system.criticalities.map(system.noAckGlyph)).toEqual([
      NoAckGlyph.Alarm,
      NoAckGlyph.Alarm,
      NoAckGlyph.Warning,
      NoAckGlyph.Warning,
    ]);
  });

  it('ranks as IEC 62923-1 6.4.2.1 lists: unacked alarms, unacked warnings, rectified, then acknowledged', () => {
    const order: [Maritime, MaritimeState][] = [
      [Maritime.EmergencyAlarm, MaritimeState.Active],
      [Maritime.Alarm, MaritimeState.ActiveUnacknowledged],
      [Maritime.Warning, MaritimeState.ActiveSilenced],
      [Maritime.Alarm, MaritimeState.RectifiedUnacknowledged],
      [Maritime.Warning, MaritimeState.RectifiedUnacknowledged],
      [Maritime.Alarm, MaritimeState.ActiveAcknowledged],
      [Maritime.Warning, MaritimeState.ActiveResponsibilityTransferred],
      [Maritime.Caution, MaritimeState.Active],
      [Maritime.Alarm, MaritimeState.Normal],
    ];
    const ranks = order.map(([c, s]) => system.displayRank(c, s));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
    expect(new Set(ranks).size).toBe(ranks.length);
  });
});

describe('ISA-18.2 (isa-18.2)', () => {
  const system = automationAlertSystem as AlertSystem;

  it('ranks critical, high, medium, low, diagnostic, and acknowledges several at once', () => {
    expect(system.criticalities).toEqual([
      Automation.Critical,
      Automation.High,
      Automation.Medium,
      Automation.Low,
      Automation.Diagnostic,
    ]);
    expect(system.allowsBulkAcknowledge).toBe(true);
  });

  it('gives a diagnostic alert only active and normal', () => {
    expect([
      system.statesOf(Automation.Diagnostic),
      system.statesOf(Automation.Critical).includes(AutomationState.Active),
    ]).toEqual([[AutomationState.Active, AutomationState.Normal], false]);
  });

  it('flashes an unacknowledged alarm by priority, and a cleared one very slow', () => {
    expectRows(system, [
      [
        Automation.Critical,
        AutomationState.Unacknowledged,
        Condition.Active,
        Ack.Unacked,
        FlashingSpeed.Fast,
      ],
      [
        Automation.Medium,
        AutomationState.Unacknowledged,
        Condition.Active,
        Ack.Unacked,
        FlashingSpeed.Slow,
      ],
      [
        Automation.Low,
        AutomationState.Unacknowledged,
        Condition.Active,
        Ack.Unacked,
        FlashingSpeed.VerySlow,
      ],
      [
        Automation.High,
        AutomationState.ReturnedToNormalUnacknowledged,
        Condition.Cleared,
        Ack.Unacked,
        FlashingSpeed.VerySlow,
      ],
      [
        Automation.High,
        AutomationState.LatchedAcknowledged,
        Condition.Cleared,
        Ack.Acked,
        FlashingSpeed.Fixed,
      ],
      [
        Automation.Diagnostic,
        AutomationState.Active,
        Condition.Active,
        Ack.None,
        FlashingSpeed.Fixed,
      ],
    ]);
  });

  it('owes a reset only while latched', () => {
    expect(
      [
        AutomationState.LatchedUnacknowledged,
        AutomationState.LatchedAcknowledged,
        AutomationState.ReturnedToNormalUnacknowledged,
      ].map((state) => system.present(Automation.High, state).resetOwed)
    ).toEqual([true, true, false]);
  });

  it('stops flashing an alarm set aside', () => {
    expect(
      system.present(Automation.High, AutomationState.Unacknowledged, {
        setAside: AlertSetAside.Suppressed,
      }).flash
    ).toBe(FlashingSpeed.Fixed);
  });

  it('draws critical and low in their own glyphs, high in the borrowed alarm icon', () => {
    const unacked = (criticality: Automation) =>
      system.present(criticality, AutomationState.Unacknowledged).glyph;
    expect(tagOf(unacked(Automation.High).frame)).toBe(
      'obi-alarm-unacknowledged-iec'
    );
    expect(tagOf(unacked(Automation.Critical).frame)).toBe('svg');
    expect(tagOf(unacked(Automation.Low).frame)).toBe('svg');
  });

  it('ranks unacknowledged alarms first, by priority', () => {
    const rank = (c: Automation, s: AutomationState) =>
      system.displayRank(c, s);
    expect(rank(Automation.Low, AutomationState.Unacknowledged)).toBeLessThan(
      rank(Automation.Critical, AutomationState.Acknowledged)
    );
    expect(
      rank(Automation.Critical, AutomationState.Unacknowledged)
    ).toBeLessThan(rank(Automation.High, AutomationState.Unacknowledged));
  });
});

describe('every built-in standard', () => {
  it('gives every criticality some of its states, and only those', () => {
    for (const system of registeredAlertSystems()) {
      for (const criticality of system.criticalities) {
        const states = system.statesOf(criticality);
        expect(states.length).toBeGreaterThan(0);
        expect(states.filter((s) => !system.states.includes(s))).toEqual([]);
      }
    }
  });

  it('labels and presents every criticality in every state', () => {
    for (const system of registeredAlertSystems()) {
      for (const criticality of system.criticalities) {
        expect(system.label(criticality)).not.toBe('');
        for (const state of system.states) {
          const presented = system.present(criticality, state);
          expect([
            system.id,
            criticality,
            state,
            presented.glyph.frame,
          ]).not.toContain(undefined);
        }
      }
    }
  });
});

describe('the registry', () => {
  it('finds each built-in standard by its id', () => {
    expect(['iec-62923', 'isa-18.2'].map((id) => alertSystem(id).id)).toEqual([
      'iec-62923',
      'isa-18.2',
    ]);
  });

  it('takes a new standard, and falls back to the default for an unknown id', () => {
    const custom: AlertSystem = {
      ...automationAlertSystem,
      id: 'custom',
    } as AlertSystem;
    registerAlertSystem(custom);
    expect(alertSystem('custom')).toBe(custom);
    expect(alertSystem('unknown')).toBe(maritimeAlertSystem);
  });
});
