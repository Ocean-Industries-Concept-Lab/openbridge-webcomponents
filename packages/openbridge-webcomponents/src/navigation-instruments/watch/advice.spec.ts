import {describe, expect, it} from 'vitest';
import {
  AdviceState,
  AdviceTrigger,
  AdviceType,
  adviceTriggerValues,
} from './advice.js';
import {convertThrustAdvices} from '../thruster/thruster.js';

describe('adviceTriggerValues', () => {
  it('both uses the value and the setpoint', () => {
    expect(adviceTriggerValues(AdviceTrigger.both, 10, 20)).toEqual([10, 20]);
  });
  it('both uses the value alone without a setpoint', () => {
    expect(adviceTriggerValues(AdviceTrigger.both, 10, undefined)).toEqual([
      10,
    ]);
    expect(adviceTriggerValues(AdviceTrigger.both, 10, null)).toEqual([10]);
  });
  it('value ignores the setpoint', () => {
    expect(adviceTriggerValues(AdviceTrigger.value, 10, 20)).toEqual([10]);
  });
  it('setpoint never falls back to the value', () => {
    expect(adviceTriggerValues(AdviceTrigger.setpoint, 10, 20)).toEqual([20]);
    expect(adviceTriggerValues(AdviceTrigger.setpoint, 10, undefined)).toEqual(
      []
    );
    expect(adviceTriggerValues(AdviceTrigger.setpoint, 10, null)).toEqual([]);
  });
});

describe('convertThrustAdvices', () => {
  const advices = [
    {min: 50, max: 100, type: AdviceType.caution, hinted: false},
  ];

  it('triggers when any reading is inside the range', () => {
    const {topAdvices} = convertThrustAdvices(advices, [10, 60]);
    expect(topAdvices[0].state).toBe(AdviceState.triggered);
  });
  it('does not trigger when no reading is inside the range', () => {
    expect(convertThrustAdvices(advices, [10]).topAdvices[0].state).toBe(
      AdviceState.regular
    );
    expect(convertThrustAdvices(advices, []).topAdvices[0].state).toBe(
      AdviceState.regular
    );
  });
});
