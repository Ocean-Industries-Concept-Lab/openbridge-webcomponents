/**
 * The linear instrument scale's advice bands (`watchfaceLinear`): values on
 * the scale along y, the band on the tick lane beside the bar, the dashed
 * limit guides across it. Drawn by the shared linear renderer.
 *
 * @module
 */

import {SVGTemplateResult, nothing, svg} from 'lit';
import {
  tickmarkColor,
  TickmarkStyle,
} from '../../navigation-instruments/watch/tickmark.js';
import {valueToY} from './instrument-linear.js';
import {
  AdviceTrigger,
  adviceStyle,
  adviceTriggerReadings,
  asResolvedAdvice,
  nextAdviceMaskId,
  resolveAdvices,
  type AdviceInput,
  type ResolvedAdvice,
} from '../../svghelpers/advice.js';
import {
  renderLinearAdviceArea,
  renderLinearAdviceBand,
  renderLinearAdvicePoint,
} from '../../svghelpers/advice-linear.js';

/** @deprecated Use {@link ResolvedAdvice}. */
export type LinearAdviceRaw = ResolvedAdvice;

/** @deprecated Use {@link AdviceInput}; `type` and `hinted` are still read. */
export type LinearAdvice = AdviceInput & {min: number; max: number};

/**
 * The advice list resolved against a trend band: an advice the band reaches
 * into is `triggered`, otherwise it keeps its configured state.
 *
 * Shared by the vertical draught-style scales (`obc-heave`, `obc-draft-trim`,
 * the heave column of `obc-pitch-roll-heave`).
 */
export function resolveLinearAdvice(
  advice: readonly AdviceInput[],
  trendMin: number,
  trendMax: number,
  opts: {trigger?: AdviceTrigger; emphasis?: boolean} = {}
): ResolvedAdvice[] {
  // The band is the instrument's value; these scales have no setpoint.
  const readings = adviceTriggerReadings(
    opts.trigger ?? AdviceTrigger.both,
    {min: trendMin, max: trendMax},
    undefined
  );
  return resolveAdvices(advice, readings, {emphasis: opts.emphasis});
}

export function singleSidedTickmark({
  height,
  scaleWidth,
  minValue,
  maxValue,
  value,
  style,
  x1,
}: {
  height: number;
  scaleWidth: number;
  minValue: number;
  maxValue: number;
  value: number;
  style: TickmarkStyle;
  x1: number;
}) {
  if (value >= maxValue || value <= minValue) {
    return null;
  }
  const color = tickmarkColor(style);
  const y = valueToY(value, minValue, maxValue, height);
  return svg`<line x1=${x1 - 2} x2=${x1 + scaleWidth} y1=${y}  y2=${y} stroke=${color} stroke-width="1" vector-effect="non-scaling-stroke"/>`;
}

export function renderAdvice(
  height: number,
  minValue: number,
  maxValue: number,
  barWidth: number,
  scaleWidth: number,
  input: AdviceInput | ResolvedAdvice,
  maskId: string = nextAdviceMaskId('linear')
): SVGTemplateResult {
  const advice = asResolvedAdvice(input);
  const style = adviceStyle(advice.category, advice.state);
  const tickmarkStyle = style.tickStyle as TickmarkStyle;
  const x1 = barWidth / 2 - scaleWidth;
  const x1Tickmark = -barWidth / 2;
  const x2Tickmark = barWidth / 2 - scaleWidth;
  const yMin = valueToY(advice.min, minValue, maxValue, height);
  const yMax = valueToY(advice.max, minValue, maxValue, height);

  // The limit guides across the bar: the area layer draws them in the
  // category's dash, otherwise they stay the dashed tertiary lines.
  const bounds: SVGTemplateResult[] = [];
  if (advice.showArea) {
    bounds.push(
      renderLinearAdviceArea({
        vertical: true,
        mainStart: yMin,
        mainEnd: yMax,
        perpStart: x1Tickmark,
        perpEnd: x2Tickmark,
        advice,
        patternId: `${maskId}-area`,
      })
    );
  } else {
    const guide = (y: number) =>
      svg`<line x1=${x1Tickmark} x2=${x2Tickmark} y1=${y} y2=${y}
                    stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"
                    stroke-dasharray="4 4"/>`;
    if (advice.min > minValue) bounds.push(guide(yMin));
    if (!advice.point && advice.max < maxValue) bounds.push(guide(yMax));
  }

  const marker = advice.point
    ? renderLinearAdvicePoint({
        vertical: true,
        main: yMin,
        perpCenter: x1 + 8,
        advice,
      })
    : renderLinearAdviceBand({
        vertical: true,
        mainStart: yMin,
        mainEnd: yMax,
        perpStart: x1 + 4,
        advice,
        maskId,
      });
  const tick = (value: number) =>
    singleSidedTickmark({
      height,
      scaleWidth,
      minValue,
      maxValue,
      value,
      style: tickmarkStyle,
      x1,
    });
  return svg`
    ${bounds}
    ${marker}
    ${advice.hideMinTickmark ? nothing : tick(advice.min)}
    ${advice.point || advice.hideMaxTickmark ? nothing : tick(advice.max)}
  `;
}
