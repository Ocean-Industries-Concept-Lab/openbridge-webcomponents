import {describe, expect, it} from 'vitest';
import {
  DEPTH_RANGES,
  DEPTH_RANGE_STEP_DOWN_FRACTION,
  resolveDepthRange,
} from './depth-shared.js';

const [shallow, regular, deep] = DEPTH_RANGES;
const base = {ranges: DEPTH_RANGES, autoRange: false, dataMax: 0};

describe('resolveDepthRange', () => {
  it('defaults to the Regular rung', () => {
    expect(resolveDepthRange(base)).toBe(regular);
    expect(resolveDepthRange({...base, dataMax: 900})).toBe(regular);
  });

  it('returns the rung matching an explicit maximum', () => {
    expect(resolveDepthRange({...base, maxDepth: 25})).toBe(shallow);
    expect(resolveDepthRange({...base, maxDepth: 1000})).toBe(deep);
  });

  it('builds a synthetic rung for a maximum off the ladder', () => {
    const r = resolveDepthRange({...base, maxDepth: 50});
    expect(r.maxDepth).toBe(50);
    expect(r.airFraction).toBe(regular.airFraction);
    expect(r.vesselScale).toBe(regular.vesselScale);
    expect(r.primaryTickmarkInterval).toBeGreaterThan(0);
    expect(r.secondaryTickmarkInterval).toBeLessThan(r.primaryTickmarkInterval);
  });

  it("takes the deepest rung's traits for a maximum above the ladder", () => {
    const r = resolveDepthRange({...base, maxDepth: 5000});
    expect(r.maxDepth).toBe(5000);
    expect(r.airFraction).toBe(deep.airFraction);
  });

  it('ignores a non-positive explicit maximum', () => {
    expect(resolveDepthRange({...base, maxDepth: 0})).toBe(regular);
    expect(resolveDepthRange({...base, maxDepth: -3})).toBe(regular);
  });

  it('auto-range picks the smallest rung that contains the data', () => {
    expect(resolveDepthRange({...base, autoRange: true, dataMax: 12})).toBe(
      shallow
    );
    expect(resolveDepthRange({...base, autoRange: true, dataMax: 25})).toBe(
      shallow
    );
    expect(resolveDepthRange({...base, autoRange: true, dataMax: 26})).toBe(
      regular
    );
    expect(resolveDepthRange({...base, autoRange: true, dataMax: 400})).toBe(
      deep
    );
    expect(resolveDepthRange({...base, autoRange: true, dataMax: 5000})).toBe(
      deep
    );
  });

  it('auto-range steps up as soon as the data exceeds the rung', () => {
    expect(
      resolveDepthRange({
        ...base,
        autoRange: true,
        dataMax: 30,
        current: shallow,
      })
    ).toBe(regular);
    expect(
      resolveDepthRange({
        ...base,
        autoRange: true,
        dataMax: 101,
        current: shallow,
      })
    ).toBe(deep);
  });

  it('auto-range steps down one rung only once the data is well inside it', () => {
    const edge = regular.maxDepth * DEPTH_RANGE_STEP_DOWN_FRACTION;
    expect(
      resolveDepthRange({
        ...base,
        autoRange: true,
        dataMax: edge,
        current: deep,
      })
    ).toBe(deep);
    expect(
      resolveDepthRange({
        ...base,
        autoRange: true,
        dataMax: edge - 1,
        current: deep,
      })
    ).toBe(regular);
    // Shallow would fit, but the descent is one rung per resolution.
    expect(
      resolveDepthRange({...base, autoRange: true, dataMax: 5, current: deep})
    ).toBe(regular);
  });

  it('matches the current rung by value when the ladder is replaced', () => {
    const copy = DEPTH_RANGES.map((r) => ({...r}));
    const [, copyRegular, copyDeep] = copy;
    // The same descent rule, with `current` from the previous ladder object.
    expect(
      resolveDepthRange({
        ranges: copy,
        autoRange: true,
        dataMax: 5,
        current: deep,
      })
    ).toBe(copyRegular);
    expect(
      resolveDepthRange({
        ranges: copy,
        autoRange: true,
        dataMax: 80,
        current: deep,
      })
    ).toBe(copyDeep);
    expect(
      resolveDepthRange({
        ranges: copy,
        autoRange: false,
        dataMax: 0,
        current: deep,
      })
    ).toBe(copyDeep);
  });

  it('keeps the current rung for empty data', () => {
    expect(
      resolveDepthRange({...base, autoRange: true, dataMax: NaN, current: deep})
    ).toBe(deep);
    expect(resolveDepthRange({...base, autoRange: true, dataMax: NaN})).toBe(
      regular
    );
  });

  it('falls back to the built-in ladder for an empty ranges list', () => {
    expect(resolveDepthRange({...base, ranges: []})).toBe(regular);
  });
});
