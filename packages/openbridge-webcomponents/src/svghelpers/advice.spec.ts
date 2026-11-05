import {describe, it, expect} from 'vitest';
import {
  AdviceCategory,
  AdviceState,
  normalizeAdvice,
  normalizeAngularRange,
  isGoToCategory,
} from './advice.js';

describe('normalizeAdvice', () => {
  it('maps a legacy angle range onto the shared shape', () => {
    const a = normalizeAdvice({
      minAngle: 10,
      maxAngle: 30,
      type: 'caution',
      hinted: true,
    });
    expect(a).toMatchObject({
      min: 10,
      max: 30,
      point: false,
      category: AdviceCategory.caution,
      state: AdviceState.hinted,
      hideMinTickmark: false,
      hideMaxTickmark: false,
      showArea: false,
      flatStart: false,
      flatEnd: false,
    });
  });

  it('reads the other legacy field pairs', () => {
    expect(
      normalizeAdvice({minSpeed: 1, maxSpeed: 2, category: 'alarm'})
    ).toMatchObject({min: 1, max: 2});
    expect(
      normalizeAdvice({minValue: 3, maxValue: 4, category: 'warning'})
    ).toMatchObject({min: 3, max: 4});
  });

  it('turns a value into a point', () => {
    expect(normalizeAdvice({value: 45, category: 'optimal'})).toMatchObject({
      min: 45,
      max: 45,
      point: true,
    });
  });

  it('maps the legacy category names', () => {
    expect(normalizeAdvice({min: 0, max: 1, type: 'advice'}).category).toBe(
      AdviceCategory.optimal
    );
    expect(normalizeAdvice({min: 0, max: 1, category: 'safe'}).category).toBe(
      AdviceCategory.running
    );
  });

  it('maps the legacy regular state onto enabled, and no state onto enabled', () => {
    expect(
      normalizeAdvice({min: 0, max: 1, category: 'caution', state: 'regular'})
        .state
    ).toBe(AdviceState.enabled);
    expect(normalizeAdvice({min: 0, max: 1, category: 'caution'}).state).toBe(
      AdviceState.enabled
    );
    expect(
      normalizeAdvice({min: 0, max: 1, category: 'caution', hinted: false})
        .state
    ).toBe(AdviceState.enabled);
  });

  it('keeps an explicit state over the hinted flag', () => {
    expect(
      normalizeAdvice({
        min: 0,
        max: 1,
        category: 'optimal',
        state: AdviceState.active,
        hinted: true,
      }).state
    ).toBe(AdviceState.active);
  });

  it('throws on a missing or unknown category and on a missing range', () => {
    expect(() => normalizeAdvice({min: 0, max: 1})).toThrow(TypeError);
    expect(() => normalizeAdvice({min: 0, max: 1, category: 'danger'})).toThrow(
      TypeError
    );
    expect(() => normalizeAdvice({min: 0, category: 'caution'})).toThrow(
      TypeError
    );
  });
});

describe('normalizeAngularRange', () => {
  it('keeps a band across north written as min > max', () => {
    expect(normalizeAngularRange(350, 10)).toEqual({min: 350, max: 10});
  });

  it('swaps a reversed pair that would draw the long way round', () => {
    expect(normalizeAngularRange(-40, -57)).toEqual({min: -57, max: -40});
    expect(normalizeAngularRange(200, 100)).toEqual({min: 100, max: 200});
  });

  it('keeps a deliberate long band written with the smaller angle first', () => {
    expect(normalizeAngularRange(20, 340)).toEqual({min: 20, max: 340});
  });
});

describe('isGoToCategory', () => {
  it('splits the categories into go-to and no-go', () => {
    expect(isGoToCategory(AdviceCategory.optimal)).toBe(true);
    expect(isGoToCategory(AdviceCategory.running)).toBe(true);
    expect(isGoToCategory(AdviceCategory.eco)).toBe(true);
    expect(isGoToCategory(AdviceCategory.caution)).toBe(false);
    expect(isGoToCategory(AdviceCategory.exclusion)).toBe(false);
  });
});
