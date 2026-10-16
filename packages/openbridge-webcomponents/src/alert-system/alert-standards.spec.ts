import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {html} from 'lit';
import {
  defineAlertStandard,
  type AlertStandard,
  type AlertStateDefinition,
} from './alert-standard.js';
import {
  getAlertStandard,
  setAlertStandard,
} from './configured-alert-standard.js';
import {iec62923AlertStandard} from './iec-62923-alert-standard.js';
import {isa182AlertStandard} from './isa-18-2-alert-standard.js';
import {
  alertActionLabel,
  compareAlertsBySortingRank,
  findAlertStateDefinition,
  isAlertActionOffered,
  isAlertIncludedInFilter,
} from './read-standard-alert.js';
import type {StandardAlertOf} from './standard-alert.js';

const BUILT_IN_STANDARDS: {name: string; standard: AlertStandard}[] = [
  {name: 'iec-62923', standard: iec62923AlertStandard},
  {name: 'isa-18.2', standard: isa182AlertStandard},
];

function everyStateDefinitionOf(
  standard: AlertStandard
): [string, AlertStateDefinition][] {
  return Object.entries(standard.criticalities).flatMap(
    ([criticality, {states}]) =>
      Object.entries(states).map(
        ([state, definition]): [string, AlertStateDefinition] => [
          `${criticality} ${state}`,
          definition,
        ]
      )
  );
}

afterEach(() => setAlertStandard(undefined));

describe.each(BUILT_IN_STANDARDS)('the $name standard', ({standard}) => {
  it('names only filters and actions it declares', () => {
    for (const [name, definition] of everyStateDefinitionOf(standard)) {
      for (const filterId of definition.includedInFilters ?? []) {
        expect(Object.keys(standard.filters), name).toContain(filterId);
      }
      for (const actionId of definition.offeredActions ?? []) {
        expect(Object.keys(standard.actions), name).toContain(actionId);
      }
    }
  });

  it('gives a flashing state a second frame to cross-fade with', () => {
    for (const [name, definition] of everyStateDefinitionOf(standard)) {
      if (definition.flashingSpeed !== undefined) {
        expect(definition.glyph.flashFrame, name).toBeDefined();
      }
    }
  });
});

describe('iec-62923', () => {
  beforeEach(() => setAlertStandard(iec62923AlertStandard));

  const rank = (criticality: string, state: string) =>
    findAlertStateDefinition({criticality, state})?.sortingRank;

  it('ranks its states in the display order of IEC 62923-1 6.4.2.1', () => {
    const ranksInDisplayOrder = [
      rank('emergency-alarm', 'active'),
      rank('alarm', 'active-unacknowledged'),
      rank('warning', 'active-unacknowledged'),
      rank('alarm', 'rectified-unacknowledged'),
      rank('warning', 'rectified-unacknowledged'),
      rank('alarm', 'active-acknowledged'),
      rank('alarm', 'active-responsibility-transferred'),
      rank('warning', 'active-acknowledged'),
      rank('warning', 'active-responsibility-transferred'),
      rank('caution', 'active'),
    ];
    expect(ranksInDisplayOrder).toEqual(
      [...ranksInDisplayOrder].sort((a, b) => a! - b!)
    );
    expect(new Set(ranksInDisplayOrder).size).toBe(ranksInDisplayOrder.length);
  });

  it('ranks a silenced alert with the unacknowledged ones', () => {
    expect(rank('alarm', 'active-silenced')).toBe(
      rank('alarm', 'active-unacknowledged')
    );
  });

  it('offers no acknowledge where acknowledging is not allowed, and shows a glyph instead', () => {
    const alert: StandardAlertOf<typeof iec62923AlertStandard> = {
      id: 'a',
      criticality: 'warning',
      state: 'active-unacknowledged-acknowledge-not-allowed',
    };
    expect(isAlertActionOffered(alert, 'acknowledge')).toBe(false);
    expect(
      findAlertStateDefinition(alert)?.glyphShownInsteadOfActions
    ).toBeDefined();
    expect(isAlertIncludedInFilter(alert, 'unacked')).toBe(true);
  });

  it('acknowledges one alert at a time', () => {
    expect(iec62923AlertStandard.actions.acknowledge).not.toHaveProperty(
      'canBeAppliedToSeveralAlertsAtOnce'
    );
  });
});

describe('isa-18.2', () => {
  beforeEach(() => setAlertStandard(isa182AlertStandard));

  it('lists shelved, suppressed and out-of-service alarms each in a filter of their own', () => {
    const filtersOf = (state: string) =>
      findAlertStateDefinition({criticality: 'high', state})?.includedInFilters;
    expect([
      filtersOf('shelved'),
      filtersOf('suppressed-by-design'),
      filtersOf('out-of-service'),
    ]).toEqual([['shelved'], ['suppressed-by-design'], ['out-of-service']]);
  });

  it('holds an alarm steady once it is shelved, suppressed or out of service', () => {
    for (const state of ['shelved', 'suppressed-by-design', 'out-of-service']) {
      expect(
        findAlertStateDefinition({criticality: 'critical', state})
          ?.flashingSpeed,
        state
      ).toBeUndefined();
    }
  });
});

describe('reading an alert', () => {
  beforeEach(() => setAlertStandard(iec62923AlertStandard));

  const alertsTheStandardDoesNotDefine = [
    {criticality: 'not-defined', state: 'active'},
    {criticality: 'caution', state: 'active-silenced'},
    {criticality: 'toString', state: 'toString'},
  ];

  it.each(alertsTheStandardDoesNotDefine)(
    'finds no state definition for $criticality $state',
    (alert) => {
      expect(findAlertStateDefinition(alert)).toBeUndefined();
      expect(isAlertIncludedInFilter(alert, 'active')).toBe(false);
      expect(isAlertIncludedInFilter(alert, undefined)).toBe(true);
      expect(isAlertActionOffered(alert, 'acknowledge')).toBe(false);
    }
  );

  it('sorts by sorting rank, an alert the standard does not define last', () => {
    const alerts = [
      {criticality: 'not-defined', state: 'active'},
      {criticality: 'caution', state: 'active'},
      {criticality: 'emergency-alarm', state: 'active'},
      {criticality: 'warning', state: 'active-unacknowledged'},
    ];
    expect(
      [...alerts]
        .sort(compareAlertsBySortingRank)
        .map((alert) => alert.criticality)
    ).toEqual(['emergency-alarm', 'warning', 'caution', 'not-defined']);
  });

  it('labels an action as the standard does, and an unknown one by its id', () => {
    setAlertStandard(isa182AlertStandard);
    expect([
      alertActionLabel('shelve'),
      alertActionLabel('not-declared'),
    ]).toEqual(['Shelve', 'not-declared']);
  });
});

describe('while no alert standard is set', () => {
  const alert = {criticality: 'alarm', state: 'active-unacknowledged'};

  it('finds no state definition and lists no alert, not even without a filter', () => {
    expect(getAlertStandard()).toBeUndefined();
    expect(findAlertStateDefinition(alert)).toBeUndefined();
    expect(isAlertIncludedInFilter(alert, undefined)).toBe(false);
  });
});

describe('a standard defined outside the library', () => {
  it('takes one criticality, one state and nothing else', () => {
    const minimalStandard = defineAlertStandard({
      filters: {},
      actions: {},
      criticalities: {
        fault: {
          states: {
            present: {glyph: {frame: html`<span>!</span>`}, sortingRank: 1},
          },
        },
      },
    });
    setAlertStandard(minimalStandard);

    expect(
      findAlertStateDefinition({criticality: 'fault', state: 'present'})
        ?.sortingRank
    ).toBe(1);
  });
});
