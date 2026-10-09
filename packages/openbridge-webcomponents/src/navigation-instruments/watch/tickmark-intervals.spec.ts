import {describe, expect, it} from 'vitest';
import {buildIntervalTickmarks, TickmarkType} from './tickmark.js';

const linear = (min: number, max: number) => (v: number) =>
  ((v - min) / (max - min)) * 270 - 135;

describe('buildIntervalTickmarks', () => {
  it('reproduces the instrument-radial default 0..100 ladder', () => {
    const ticks = buildIntervalTickmarks({
      minValue: 0,
      maxValue: 100,
      mapAngle: linear(0, 100),
      primaryInterval: 50,
      secondaryInterval: 10,
      showLabels: true,
      zeroTick: true,
    });
    // zero at a range end is textOnly; interior primaries labeled; ends labeled
    expect(ticks[0]).toEqual({
      angle: -135,
      type: TickmarkType.textOnly,
      text: '0',
    });
    expect(ticks.find((t) => t.text === '50')?.type).toBe(TickmarkType.primary);
    expect(ticks[ticks.length - 1]).toEqual({
      angle: 135,
      type: TickmarkType.textOnly,
      text: '100',
    });
    // secondaries every 10 except where primaries sit
    expect(ticks.filter((t) => t.type === TickmarkType.secondary)).toHaveLength(
      8
    );
  });

  it('marks zero as main on a bipolar range', () => {
    const ticks = buildIntervalTickmarks({
      minValue: -50,
      maxValue: 50,
      mapAngle: linear(-50, 50),
      primaryInterval: 25,
      showLabels: false,
      zeroTick: true,
    });
    expect(ticks.find((t) => t.angle === 0)?.type).toBe(TickmarkType.main);
  });

  it('suppresses interval labels but keeps end labels', () => {
    const ticks = buildIntervalTickmarks({
      minValue: 0,
      maxValue: 100,
      mapAngle: linear(0, 100),
      primaryInterval: 50,
      showLabels: true,
      suppressIntervalLabels: true,
    });
    expect(ticks.find((t) => t.angle === 0)?.text).toBeUndefined();
    expect(ticks.map((t) => t.text)).toContain('0');
    expect(ticks.map((t) => t.text)).toContain('100');
  });

  it('drops the max end label when suppressed (full circle)', () => {
    const ticks = buildIntervalTickmarks({
      minValue: 0,
      maxValue: 100,
      mapAngle: (v) => (v / 100) * 360,
      primaryInterval: 50,
      showLabels: true,
      suppressMaxEndLabel: true,
    });
    expect(ticks.map((t) => t.text)).toContain('0');
    expect(ticks.map((t) => t.text)).not.toContain('100');
  });

  it('ignores runaway intervals', () => {
    const ticks = buildIntervalTickmarks({
      minValue: 0,
      maxValue: 100,
      mapAngle: linear(0, 100),
      primaryInterval: 1e-6,
      showLabels: false,
    });
    expect(ticks).toHaveLength(0);
  });
});
