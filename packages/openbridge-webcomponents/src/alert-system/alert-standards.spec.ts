import {afterEach, describe, expect, it} from 'vitest';
import {html} from 'lit';
import {
  defineAlertStandard,
  type AlertStandard,
  type AlertStateDefinition,
} from './alert-standard.js';
import {
  findAlertStandard,
  getDefaultAlertStandardId,
  registerAlertStandard,
  setDefaultAlertStandard,
} from './alert-standard-registry.js';
import {iec62923AlertStandard} from './iec-62923-alert-standard.js';
import {isa182AlertStandard} from './isa-18-2-alert-standard.js';
import {
  alertActionLabel,
  compareAlertsBySortingRank,
  findAlertStateDefinition,
  isAlertActionOffered,
  isAlertIncludedInFilter,
} from './read-standard-alert.js';
import type {StandardAlert} from './standard-alert.js';

const BUILT_IN_STANDARDS: AlertStandard[] = [
  iec62923AlertStandard,
  isa182AlertStandard,
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

afterEach(() => setDefaultAlertStandard('iec-62923'));

describe.each(BUILT_IN_STANDARDS)('the $id standard', (standard) => {
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
  const rank = (criticality: string, state: string) =>
    findAlertStateDefinition({standard: 'iec-62923', criticality, state})
      ?.sortingRank;

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
    const alert: StandardAlert = {
      id: 'a',
      standard: 'iec-62923',
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
  it('lists shelved, suppressed and out-of-service alarms each in a filter of their own', () => {
    const filtersOf = (state: string) =>
      findAlertStateDefinition({
        standard: 'isa-18.2',
        criticality: 'high',
        state,
      })?.includedInFilters;
    expect([
      filtersOf('shelved'),
      filtersOf('suppressed-by-design'),
      filtersOf('out-of-service'),
    ]).toEqual([['shelved'], ['suppressed-by-design'], ['out-of-service']]);
  });

  it('holds an alarm steady once it is shelved, suppressed or out of service', () => {
    for (const state of ['shelved', 'suppressed-by-design', 'out-of-service']) {
      expect(
        findAlertStateDefinition({
          standard: 'isa-18.2',
          criticality: 'critical',
          state,
        })?.flashingSpeed,
        state
      ).toBeUndefined();
    }
  });
});

describe('reading an alert', () => {
  const unknownAlerts = [
    {standard: 'not-registered', criticality: 'alarm', state: 'active'},
    {standard: 'iec-62923', criticality: 'not-defined', state: 'active'},
    {standard: 'iec-62923', criticality: 'caution', state: 'active-silenced'},
    {standard: 'iec-62923', criticality: 'toString', state: 'toString'},
  ];

  it.each(unknownAlerts)(
    'finds no state definition for $standard $criticality $state',
    (alert) => {
      expect(findAlertStateDefinition(alert)).toBeUndefined();
      expect(isAlertIncludedInFilter(alert, 'active')).toBe(false);
      expect(isAlertIncludedInFilter(alert, undefined)).toBe(true);
      expect(isAlertActionOffered(alert, 'acknowledge')).toBe(false);
    }
  );

  it('sorts by sorting rank across standards, an unknown alert last', () => {
    const alerts = [
      unknownAlerts[0],
      {standard: 'iec-62923', criticality: 'caution', state: 'active'},
      {standard: 'isa-18.2', criticality: 'critical', state: 'unacknowledged'},
      {standard: 'iec-62923', criticality: 'emergency-alarm', state: 'active'},
      {standard: 'isa-18.2', criticality: 'medium', state: 'unacknowledged'},
    ];
    expect(
      [...alerts]
        .sort(compareAlertsBySortingRank)
        .map(({standard, criticality}) => `${standard} ${criticality}`)
    ).toEqual([
      'iec-62923 emergency-alarm',
      'isa-18.2 critical',
      'isa-18.2 medium',
      'iec-62923 caution',
      'not-registered alarm',
    ]);
  });

  it('labels an action as its standard does, and an unknown one by its id', () => {
    expect([
      alertActionLabel('isa-18.2', 'shelve'),
      alertActionLabel('isa-18.2', 'not-declared'),
    ]).toEqual(['Shelve', 'not-declared']);
  });
});

describe('the registry', () => {
  it('takes a standard with one criticality, one state and nothing else', () => {
    const minimalStandard = defineAlertStandard({
      id: 'minimal-spec-standard',
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
    registerAlertStandard(minimalStandard);

    expect(findAlertStandard('minimal-spec-standard')).toBe(minimalStandard);
    expect(
      findAlertStateDefinition({
        standard: 'minimal-spec-standard',
        criticality: 'fault',
        state: 'present',
      })?.sortingRank
    ).toBe(1);
  });

  it('follows iec-62923 until another default is set', () => {
    expect(getDefaultAlertStandardId()).toBe('iec-62923');
    setDefaultAlertStandard('isa-18.2');
    expect(getDefaultAlertStandardId()).toBe('isa-18.2');
  });
});
