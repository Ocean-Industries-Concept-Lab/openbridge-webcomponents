import {describe, it, expect} from 'vitest';
import {
  AdviceCategory,
  AdviceState,
  normalizeAdvice,
  normalizeAngularRange,
  isGoToCategory,
  AdviceTrigger,
  adviceTriggerReadings,
  isAdviceHit,
  resolveAdvices,
  adviceStyle,
  adviceCaps,
  chainAdvices,
  nextAdviceMaskId,
  negateAdvice,
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

describe('adviceTriggerReadings', () => {
  it('picks the readings the trigger mode names and drops missing ones', () => {
    expect(adviceTriggerReadings(AdviceTrigger.both, 5, 7)).toEqual([5, 7]);
    expect(adviceTriggerReadings(AdviceTrigger.value, 5, 7)).toEqual([5]);
    expect(adviceTriggerReadings(AdviceTrigger.setpoint, 5, 7)).toEqual([7]);
    expect(adviceTriggerReadings(AdviceTrigger.both, 5, undefined)).toEqual([
      5,
    ]);
    expect(adviceTriggerReadings(AdviceTrigger.setpoint, 5, null)).toEqual([]);
  });
});

describe('isAdviceHit', () => {
  const band = normalizeAdvice({min: 20, max: 40, category: 'caution'});

  it('hits a number inside the range, bounds included', () => {
    expect(isAdviceHit(band, 20)).toBe(true);
    expect(isAdviceHit(band, 40)).toBe(true);
    expect(isAdviceHit(band, 41)).toBe(false);
    expect(isAdviceHit(band, undefined)).toBe(false);
    expect(isAdviceHit(band, NaN)).toBe(false);
  });

  it('hits an interval that overlaps the range', () => {
    expect(isAdviceHit(band, {min: 2, max: 25})).toBe(true);
    expect(isAdviceHit(band, {min: 41, max: 50})).toBe(false);
  });

  it('hits an angular range across north', () => {
    const north = normalizeAdvice({
      minAngle: 350,
      maxAngle: 10,
      category: 'caution',
    });
    expect(isAdviceHit(north, 0, {angularWraparound: true})).toBe(true);
    expect(isAdviceHit(north, 355, {angularWraparound: true})).toBe(true);
    expect(isAdviceHit(north, 20, {angularWraparound: true})).toBe(false);
    expect(isAdviceHit(north, 0)).toBe(false);
  });

  it('hits a point on equality only', () => {
    const point = normalizeAdvice({value: 30, category: 'optimal'});
    expect(isAdviceHit(point, 30)).toBe(true);
    expect(isAdviceHit(point, 30.5)).toBe(false);
  });
});

describe('resolveAdvices', () => {
  const list = [
    {min: 20, max: 40, category: 'caution', hinted: true},
    {min: 60, max: 80, category: 'optimal'},
  ];

  it('triggers on a hit and keeps the configured state otherwise', () => {
    const [caution, optimal] = resolveAdvices(list, [30]);
    expect(caution.state).toBe(AdviceState.triggered);
    expect(optimal.state).toBe(AdviceState.enabled);
  });

  it('orders a reversed linear pair', () => {
    const [band] = resolveAdvices(
      [{min: 40, max: 20, category: 'caution'}],
      [30]
    );
    expect(band).toMatchObject({min: 20, max: 40, state: 'triggered'});
  });

  it('never triggers without a reading', () => {
    const [caution] = resolveAdvices(list, []);
    expect(caution.state).toBe(AdviceState.hinted);
  });

  it('orders a reversed angular pair and tests across north', () => {
    const [band] = resolveAdvices(
      [{minAngle: 350, maxAngle: 10, type: 'caution', hinted: true}],
      [0],
      {angularWraparound: true}
    );
    expect(band).toMatchObject({min: 350, max: 10, state: 'triggered'});
    const [swapped] = resolveAdvices(
      [{minAngle: -40, maxAngle: -57, type: 'caution'}],
      [],
      {angularWraparound: true}
    );
    expect(swapped).toMatchObject({min: -57, max: -40});
  });

  it('applies the emphasis rules when asked', () => {
    const rest = resolveAdvices(list, [50], {emphasis: true});
    expect(rest.map((a) => a.state)).toEqual([
      AdviceState.hinted,
      AdviceState.active,
    ]);
    const noGoHit = resolveAdvices(list, [30], {emphasis: true});
    expect(noGoHit.map((a) => a.state)).toEqual([
      AdviceState.triggered,
      AdviceState.hinted,
    ]);
    const goToHit = resolveAdvices(
      [{min: 20, max: 40, category: 'caution'}, list[1]],
      [70],
      {emphasis: true}
    );
    expect(goToHit.map((a) => a.state)).toEqual([
      AdviceState.hinted,
      AdviceState.triggered,
    ]);
  });
});

describe('adviceStyle', () => {
  it('colours a triggered caution band in the alert tokens', () => {
    const s = adviceStyle(AdviceCategory.caution, AdviceState.triggered);
    expect(s.fill).toBe('var(--alert-caution-color)');
    expect(s.stroke).toBe('var(--on-caution-color)');
    expect(s.pattern).toBe('stripes');
    expect(s.patternColor).toBe('var(--on-caution-color)');
    expect(s.tickStyle).toBe('enhanced');
    expect(s.areaOutline).toBe('dashed');
    expect(s.areaFill).toBe('var(--alert-caution-tint-color)');
  });

  it('draws a hinted alarm band solid in the tertiary grey', () => {
    const s = adviceStyle(AdviceCategory.alarm, AdviceState.hinted);
    expect(s.fill).toBe('var(--instrument-tick-mark-tertiary-color)');
    expect(s.stroke).toBe('var(--instrument-tick-mark-tertiary-color)');
    expect(s.pattern).toBe('none');
    expect(s.tickStyle).toBe('regular');
    expect(s.areaPattern).toBe('dots');
  });

  it('tints an active optimal band and fills a triggered one', () => {
    expect(
      adviceStyle(AdviceCategory.optimal, AdviceState.active)
    ).toMatchObject({
      fill: 'var(--base-blue-100)',
      stroke: 'var(--element-neutral-enhanced-color)',
    });
    const t = adviceStyle(AdviceCategory.optimal, AdviceState.triggered);
    expect(t.fill).toBe('var(--instrument-enhanced-secondary-color)');
    expect(t.tickStyle).toBe('enhanced');
    expect(t.areaOutline).toBe('dotted');
  });

  it('hatches an exclusion band as a hairline and uses the alarm outline token', () => {
    expect(
      adviceStyle(AdviceCategory.exclusion, AdviceState.triggered)
    ).toMatchObject({
      fill: 'var(--instrument-frame-primary-color)',
      stroke: 'var(--instrument-tick-mark-primary-color)',
      pattern: 'hairline',
    });
    expect(
      adviceStyle(AdviceCategory.alarm, AdviceState.triggered).stroke
    ).toBe('var(--alert-alarm-outline-color)');
  });

  it('reads the legacy regular state as enabled', () => {
    expect(adviceStyle(AdviceCategory.caution, AdviceState.regular)).toEqual(
      adviceStyle(AdviceCategory.caution, AdviceState.enabled)
    );
  });
});

describe('adviceCaps and chainAdvices', () => {
  it('caps a go-to band as a pill and a no-go band square where a tick stands', () => {
    expect(
      adviceCaps(normalizeAdvice({min: 0, max: 1, category: 'optimal'}))
    ).toEqual({start: 'pill', end: 'pill'});
    expect(
      adviceCaps(normalizeAdvice({min: 0, max: 1, category: 'caution'}))
    ).toEqual({start: 'square', end: 'square'});
    expect(
      adviceCaps(
        normalizeAdvice({
          min: 0,
          max: 1,
          category: 'caution',
          hideMaxTickmark: true,
        })
      )
    ).toEqual({start: 'square', end: 'pill'});
  });

  it('cuts both bands flat where they meet', () => {
    const [a, b] = chainAdvices(
      resolveAdvices(
        [
          {min: 60, max: 80, category: 'caution'},
          {min: 80, max: 100, category: 'alarm'},
        ],
        []
      )
    );
    expect(adviceCaps(a)).toEqual({start: 'square', end: 'flat'});
    expect(adviceCaps(b)).toEqual({start: 'flat', end: 'square'});
  });

  it('is applied by resolveAdvices', () => {
    const [a] = resolveAdvices(
      [
        {min: 60, max: 80, category: 'optimal'},
        {min: 80, max: 100, category: 'alarm'},
      ],
      []
    );
    expect(a.flatEnd).toBe(true);
  });
});

describe('negateAdvice', () => {
  it('swaps a range and keeps a point', () => {
    const [range, point] = resolveAdvices(
      [
        {min: 10, max: 20, category: 'caution', hideMinTickmark: true},
        {value: 5, category: 'alarm', hideMinTickmark: true},
      ],
      []
    );
    expect(negateAdvice(range)).toMatchObject({
      min: -20,
      max: -10,
      hideMinTickmark: false,
      hideMaxTickmark: true,
    });
    expect(negateAdvice(point)).toMatchObject({
      min: -5,
      max: -5,
      point: true,
      hideMinTickmark: true,
    });
  });
});

describe('nextAdviceMaskId', () => {
  it('hands out distinct ids with the given prefix', () => {
    const a = nextAdviceMaskId('watch');
    const b = nextAdviceMaskId('watch');
    expect(a).not.toBe(b);
    expect(a.startsWith('watch-')).toBe(true);
  });
});
