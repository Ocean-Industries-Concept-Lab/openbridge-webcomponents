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
  computeExternalScaleLayout,
  computeFixedAspectRatioScale,
  type ExternalScaleConfig,
  type ExternalScaleLayoutConfig,
} from './external-scale.js';
import {
  FrameStyle,
  InstrumentState,
  Priority,
} from '../../navigation-instruments/types.js';
import {AdviceTrigger} from '../../svghelpers/advice.js';

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

describe('advice icons', () => {
  const layout = (overrides: Partial<ExternalScaleLayoutConfig>) =>
    computeExternalScaleLayout({
      orientation: ExternalScaleOrientation.vertical,
      side: ExternalScaleSide.right,
      length: 200,
      hasBar: true,
      hasScale: false,
      labels: false,
      barThickness: 24,
      tickThickness: 24,
      labelThickness: 60,
      scaleType: ScaleType.regular,
      hasAdvice: true,
      ...overrides,
    });

  it('reserves the icon box past the pills without a scale, and past the ticks with one', () => {
    expect(layout({}).viewBoxThickness).toBe(24 + 16);
    expect(layout({hasAdviceIcon: true}).viewBoxThickness).toBe(24 + 16 + 16);
    expect(layout({hasAdviceIcon: true, hasScale: true}).viewBoxThickness).toBe(
      24 + 24 + 8 + 16
    );
  });

  it('adds the icon box past the label band when labels are drawn', () => {
    expect(layout({labels: true}).viewBoxThickness).toBe(24 + 60);
    expect(layout({labels: true, hasAdviceIcon: true}).viewBoxThickness).toBe(
      24 + 60 + 16
    );
  });

  it('puts the icon after the labels on a labelled scale, and in their place otherwise', () => {
    const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const icon = (overrides: Partial<ExternalScaleConfig>) => {
      render(
        svg`${
          renderExternalScale({
            ...bottomScale({
              advices: [{min: 20, max: 40, category: 'eco', showIcon: true}],
              hasBar: true,
              barThickness: 24,
              hasScale: false,
              ...overrides,
            }),
          }).adviceOverlays
        }`,
        host
      );
      return host.querySelector('g.advice-icon')!.getAttribute('transform')!;
    };
    // Bottom side, outward is +y: the bar ends at 24; the inner pills take
    // the next 16, the label band 60.
    const withoutLabels = icon({labels: false});
    const withLabels = icon({labels: true, labelThickness: 60});
    const y = (t: string) =>
      Number(t.match(/translate\([-\d.]+ ([-\d.]+)\)/)![1]);
    expect(y(withoutLabels)).toBe(24 + 16);
    expect(y(withLabels)).toBe(24 + 60);
  });
});

describe('advice overlays', () => {
  const html = (overrides: Partial<ExternalScaleConfig>) => {
    const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    render(
      svg`${renderExternalScale(bottomScale(overrides)).adviceOverlays}`,
      host
    );
    return host.innerHTML;
  };

  it('triggers on the value under the default trigger, with no setpoint', () => {
    const out = html({
      advices: [{min: 20, max: 40, category: 'caution'}],
      value: 30,
      setpoint: undefined,
    });
    expect(out).toContain('var(--alert-caution-color)');
  });

  it('ignores the value when the trigger is the setpoint', () => {
    const out = html({
      advices: [{min: 20, max: 40, category: 'caution'}],
      value: 30,
      setpoint: undefined,
      adviceTrigger: AdviceTrigger.setpoint,
    });
    expect(out).not.toContain('var(--alert-caution-color)');
  });

  it('still reads a legacy entry', () => {
    const out = html({
      advices: [{min: 20, max: 40, type: 'advice', hinted: true}],
      value: 50,
    });
    expect(out).toContain('var(--instrument-tick-mark-tertiary-color)');
  });

  it('draws a point and an area', () => {
    const out = html({
      advices: [
        {value: 30, category: 'optimal'},
        {min: 60, max: 80, category: 'alarm', showArea: true},
      ],
      value: 50,
      hasBar: true,
      barThickness: 24,
    });
    expect(out).toContain('<circle');
    expect(out).toContain('fill="url(#');
  });

  it('names its masks after the configured prefix', () => {
    const out = html({
      advices: [{min: 20, max: 40, category: 'caution'}],
      adviceMaskPrefix: 'bar-7',
    });
    expect(out).toContain('id="bar-7-0"');
  });
});

describe('advice geometry under fixedAspectRatio', () => {
  const layout = (overrides: Partial<ExternalScaleLayoutConfig>) =>
    computeExternalScaleLayout({
      orientation: ExternalScaleOrientation.vertical,
      side: ExternalScaleSide.right,
      length: 200,
      hasBar: true,
      hasScale: false,
      labels: false,
      barThickness: 24,
      tickThickness: 24,
      labelThickness: 60,
      scaleType: ScaleType.regular,
      hasAdvice: true,
      ...overrides,
    });

  it('reserves the advice column in pixels, so the viewBox share grows as the drawing shrinks', () => {
    expect(layout({fixedAspectRatioScale: 0.5}).viewBoxThickness).toBe(24 + 32);
    expect(layout({fixedAspectRatioScale: 2}).viewBoxThickness).toBe(24 + 8);
    expect(
      layout({advicePosition: AdvicePosition.outer, fixedAspectRatioScale: 0.5})
        .viewBoxThickness
    ).toBe(24 + 48);
    expect(
      layout({hasAdviceIcon: true, fixedAspectRatioScale: 0.5}).viewBoxThickness
    ).toBe(24 + 32 + 16);
  });

  it('paints the pill 8 px thick and 4 px off the bar at every scale', () => {
    const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(host);
    const band = (scale: number) => {
      render(
        svg`${
          renderExternalScale(
            bottomScale({
              advices: [{min: 20, max: 40, category: 'optimal'}],
              hasBar: true,
              barThickness: 24,
              hasScale: false,
              labels: false,
              fixedAspectRatioScale: scale,
            })
          ).adviceOverlays
        }`,
        host
      );
      const boxes = [...host.querySelectorAll('path')].map((p) =>
        (p as SVGPathElement).getBBox()
      );
      const y = Math.min(...boxes.map((b) => b.y));
      const height = Math.max(...boxes.map((b) => b.height));
      return {y, height};
    };
    try {
      // The bar ends at 24 on a bottom scale; 8 and 4 are CSS px, so in
      // viewBox units they are divided by the painted scale.
      expect(band(1)).toEqual({y: 24 + 4, height: 8});
      expect(band(0.5)).toEqual({y: 24 + 8, height: 16});
      expect(band(2)).toEqual({y: 24 + 2, height: 4});
    } finally {
      host.remove();
    }
  });

  it('caps the scale by the cross axis with the pixel column held out of the ratio', () => {
    // 48 scaled units plus a 16 px column: the drawing fits a 60 px host at
    // (60 - 16) / 48, not at 60 / 64.
    const thickness = (scale: number) => 48 + 16 / scale;
    const scale = (containerCrossAxisSize: number) =>
      computeFixedAspectRatioScale({
        orientation: ExternalScaleOrientation.vertical,
        containerMainAxisSize: 600,
        scaleReferenceSize: 384,
        containerCrossAxisSize,
        viewBoxThickness: thickness,
      });
    expect(scale(400)).toBeCloseTo(600 / 384, 4);
    expect(scale(60)).toBeCloseTo((60 - 16) / 48, 3);
  });
});
