import {describe, it, expect} from 'vitest';
import {convertThrustAdvices} from './thruster.js';
import {AdviceState} from '../../svghelpers/advice.js';

describe('convertThrustAdvices', () => {
  it('splits a band across zero into a top and a bottom part, flat at zero', () => {
    const {topAdvices, bottomAdvices} = convertThrustAdvices(
      [{min: -10, max: 30, category: 'caution'}],
      [0]
    );
    expect(topAdvices).toHaveLength(1);
    expect(bottomAdvices).toHaveLength(1);
    expect(topAdvices[0]).toMatchObject({
      min: 0,
      max: 30,
      flatStart: true,
      state: AdviceState.triggered,
    });
    expect(bottomAdvices[0]).toMatchObject({
      min: 0,
      max: 10,
      flatStart: true,
      state: AdviceState.triggered,
    });
  });

  it('keeps a legacy entry on the top side with its hinted state', () => {
    const {topAdvices, bottomAdvices} = convertThrustAdvices(
      [{min: 20, max: 50, type: 'advice', hinted: true}],
      undefined
    );
    expect(bottomAdvices).toHaveLength(0);
    expect(topAdvices[0]).toMatchObject({
      min: 20,
      max: 50,
      category: 'optimal',
      state: AdviceState.hinted,
    });
  });

  it('mirrors a negative band onto the bottom side, ends swapped', () => {
    const {bottomAdvices} = convertThrustAdvices(
      [
        {min: -60, max: -40, category: 'alarm'},
        {min: -40, max: -20, category: 'caution'},
      ],
      []
    );
    expect(bottomAdvices.map((a) => [a.min, a.max])).toEqual([
      [40, 60],
      [20, 40],
    ]);
    expect(bottomAdvices[0]).toMatchObject({flatStart: true, flatEnd: false});
    expect(bottomAdvices[1]).toMatchObject({flatStart: false, flatEnd: true});
  });

  it('swaps the tick flags with the ends when mirroring, and hides the cut', () => {
    const {topAdvices, bottomAdvices} = convertThrustAdvices(
      [
        {min: -60, max: -40, category: 'caution', hideMaxTickmark: true},
        {min: -10, max: 30, category: 'optimal', hideMinTickmark: true},
      ],
      undefined
    );
    // The -40 end, near zero, becomes the 40 end of the mirrored band.
    expect(bottomAdvices[0]).toMatchObject({
      min: 40,
      max: 60,
      hideMinTickmark: true,
      hideMaxTickmark: false,
    });
    expect(topAdvices[0]).toMatchObject({
      min: 0,
      max: 30,
      flatStart: true,
      hideMinTickmark: true,
      hideMaxTickmark: false,
    });
    // The hidden -10 end is the mirrored part's max end.
    expect(bottomAdvices[1]).toMatchObject({
      min: 0,
      max: 10,
      flatStart: true,
      hideMinTickmark: true,
      hideMaxTickmark: true,
    });
  });

  it('places a point on the side of its sign', () => {
    const {topAdvices, bottomAdvices} = convertThrustAdvices(
      [
        {value: 25, category: 'optimal'},
        {value: -25, category: 'alarm'},
      ],
      [25]
    );
    expect(topAdvices[0]).toMatchObject({
      min: 25,
      point: true,
      state: AdviceState.triggered,
    });
    expect(bottomAdvices[0]).toMatchObject({min: 25, max: 25, point: true});
  });

  it('triggers on the setpoint alone when given one reading', () => {
    const {topAdvices} = convertThrustAdvices(
      [{min: 20, max: 50, category: 'caution'}],
      30
    );
    expect(topAdvices[0].state).toBe(AdviceState.triggered);
  });
});
