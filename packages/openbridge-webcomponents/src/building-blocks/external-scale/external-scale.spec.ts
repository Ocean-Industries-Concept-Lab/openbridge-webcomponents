import {describe, it, expect, vi, afterEach} from 'vitest';
import {
  renderExternalScale,
  ExternalScaleOrientation,
  ExternalScaleSide,
  ScaleType,
  FillMode,
  AdvicePosition,
  EXTERNAL_SCALE_MAX_TICKS,
  type ExternalScaleConfig,
} from './external-scale.js';
import {
  FrameStyle,
  InstrumentState,
  Priority,
} from '../../navigation-instruments/types.js';

const bottomScale = (
  overrides: Partial<ExternalScaleConfig>
): ExternalScaleConfig => ({
  orientation: ExternalScaleOrientation.horizontal,
  side: ExternalScaleSide.bottom,
  length: 600,
  paddingStart: 32,
  paddingEnd: 32,
  minValue: 0,
  maxValue: 100,
  hasBar: false,
  hasScale: true,
  labels: true,
  scaleBackground: false,
  barThickness: 24,
  tickThickness: 24,
  labelThickness: 60,
  mainTickmarks: [],
  scaleType: ScaleType.regular,
  frameStyle: FrameStyle.regular,
  priority: Priority.regular,
  fillMode: FillMode.fill,
  atSetpoint: false,
  autoAtSetpoint: true,
  autoAtSetpointDeadband: 1,
  setpointAtZeroDeadband: 0.5,
  state: InstrumentState.active,
  advicePosition: AdvicePosition.inner,
  ...overrides,
});

// A twelve-minute window in epoch milliseconds — what a slotted scale
// receives from a chart on a time axis.
const TWELVE_MINUTES_MS = 12 * 60_000;

describe('tick ladder density guard (#1219)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('drops a ladder that would exceed the tick cap instead of building it', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const parts = renderExternalScale(
      bottomScale({
        minValue: 0,
        maxValue: TWELVE_MINUTES_MS,
        primaryTickmarkInterval: 2,
        secondaryTickmarkInterval: 1,
      })
    );
    expect(parts.tickmarks.length).toBeLessThan(EXTERNAL_SCALE_MAX_TICKS);
    expect(parts.labels).toEqual([]);
    expect(warn).toHaveBeenCalled();
  });

  it('counts both endpoints: a range of exactly the cap in steps is one over', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const parts = renderExternalScale(
      bottomScale({
        minValue: 0,
        maxValue: EXTERNAL_SCALE_MAX_TICKS,
        primaryTickmarkInterval: 1,
      })
    );
    expect(parts.labels).toEqual([]);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('keeps a ladder whose count is under the cap', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const parts = renderExternalScale(
      bottomScale({
        minValue: 0,
        maxValue: TWELVE_MINUTES_MS,
        primaryTickmarkInterval: 2 * 60_000,
      })
    );
    // 0, 2 … 12 minutes: seven labels.
    expect(parts.labels).toHaveLength(7);
    expect(parts.tickmarks.length).toBeGreaterThan(0);
    expect(warn).not.toHaveBeenCalled();
  });
});
