import {describe, it, expect, vi, afterEach} from 'vitest';
import {nothing, render, svg, type SVGTemplateResult} from 'lit';
import {
  renderExternalScale,
  valueToMainAxis,
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

/** Renders one label fragment into a detached <svg> and returns its <text>. */
function labelElement(label: SVGTemplateResult): SVGTextElement {
  const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  render(svg`${label}`, host);
  return host.querySelector('text')!;
}

const labelText = (label: SVGTemplateResult) =>
  labelElement(label).textContent?.trim();
const labelAttr = (label: SVGTemplateResult, name: string) =>
  labelElement(label).getAttribute(name);

describe('main tickmark labels (#1191)', () => {
  it('labels [min, 0, max] instead of the interval ladder', () => {
    const parts = renderExternalScale(
      bottomScale({
        minValue: -50,
        maxValue: 100,
        primaryTickmarkInterval: 10,
        mainTickmarkLabels: true,
      })
    );
    expect(parts.labels.map(labelText)).toEqual(['-50', '0', '100']);
  });

  it('clamps the end labels inward on a horizontal scale', () => {
    const parts = renderExternalScale(
      bottomScale({minValue: 0, maxValue: 100, mainTickmarkLabels: true})
    );
    expect(parts.labels.map((l) => labelAttr(l, 'text-anchor'))).toEqual([
      'start',
      'end',
    ]);
  });

  it('clamps the end labels inward on a vertical scale', () => {
    const parts = renderExternalScale(
      bottomScale({
        orientation: ExternalScaleOrientation.vertical,
        side: ExternalScaleSide.left,
        minValue: 0,
        maxValue: 100,
        mainTickmarkLabels: true,
      })
    );
    // min sits at the bottom and hangs upward, max at the top hangs downward.
    expect(parts.labels.map((l) => labelAttr(l, 'dominant-baseline'))).toEqual([
      'auto',
      'hanging',
    ]);
  });
});

describe('reverse (#1211)', () => {
  const vertical = (overrides: Partial<ExternalScaleConfig>) =>
    bottomScale({
      orientation: ExternalScaleOrientation.vertical,
      side: ExternalScaleSide.right,
      ...overrides,
    });

  it('is inert when false', () => {
    const plain = vertical({});
    const off = vertical({reverse: false});
    expect(valueToMainAxis(off, 0)).toBe(valueToMainAxis(plain, 0));
    expect(valueToMainAxis(off, 100)).toBe(valueToMainAxis(plain, 100));
  });

  it('mirrors min and max on a vertical scale and keeps the midpoint', () => {
    const plain = vertical({});
    const rev = vertical({reverse: true});
    expect(valueToMainAxis(rev, 0)).toBeCloseTo(valueToMainAxis(plain, 100));
    expect(valueToMainAxis(rev, 100)).toBeCloseTo(valueToMainAxis(plain, 0));
    expect(valueToMainAxis(rev, 50)).toBeCloseTo(valueToMainAxis(plain, 50));
  });

  it('mirrors on a horizontal scale too', () => {
    const plain = bottomScale({});
    const rev = bottomScale({reverse: true});
    expect(valueToMainAxis(rev, 0)).toBeCloseTo(valueToMainAxis(plain, 100));
    expect(valueToMainAxis(rev, 25)).toBeCloseTo(valueToMainAxis(plain, 75));
  });

  it('works on a range that does not start at zero', () => {
    const plain = vertical({minValue: 20, maxValue: 60});
    const rev = vertical({minValue: 20, maxValue: 60, reverse: true});
    expect(valueToMainAxis(rev, 20)).toBeCloseTo(valueToMainAxis(plain, 60));
    expect(valueToMainAxis(rev, 30)).toBeCloseTo(valueToMainAxis(plain, 50));
  });

  it('still renders a bar and a dot on a reversed scale', () => {
    const parts = renderExternalScale(
      vertical({
        reverse: true,
        hasBar: true,
        value: 75,
        fillMin: 0,
        highlightCurrentValue: true,
      })
    );
    expect(parts.barFill).not.toBe(nothing);
    expect(parts.currentValueDot).not.toBe(nothing);
  });
});
