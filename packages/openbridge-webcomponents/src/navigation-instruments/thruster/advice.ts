/**
 * The thrust column's advice bands: percent of the column height along y,
 * on the tick lane beside the bar. Drawn by the shared linear renderer.
 *
 * @module
 */

import {SVGTemplateResult, nothing, svg} from 'lit';
import {TickmarkStyle} from '../watch/tickmark.js';
import {singleSidedTickmark} from './tickmark.js';
import {
  adviceStyle,
  asResolvedAdvice,
  nextAdviceMaskId,
  type AdviceInput,
  type ResolvedAdvice,
} from '../../svghelpers/advice.js';
import {
  renderLinearAdviceBand,
  renderLinearAdvicePoint,
} from '../../svghelpers/advice-linear.js';

/** @deprecated Use {@link ResolvedAdvice}. */
export type LinearAdviceRaw = ResolvedAdvice;

/** @deprecated Use {@link AdviceInput}; `type` and `hinted` are still read. */
export type LinearAdvice = AdviceInput & {min: number; max: number};

/** The tick lane's near edge; the band sits 4 off the bar like the external scale's `inner` position. */
const BAND_PERP_START = 12;

const yOf = (percent: number, height: number) => (-percent * height) / 100 - 2;

/**
 * One advice on the column. `flipDirection` is kept for the callers that
 * mirror the bottom half; the pattern tile reads the same either way.
 */
export function renderAdvice(
  height: number,
  input: AdviceInput | ResolvedAdvice,
  _flipDirection = false,
  maskId: string = nextAdviceMaskId('thruster')
): SVGTemplateResult {
  const advice = asResolvedAdvice(input);
  const style = adviceStyle(advice.category, advice.state);
  const tickmarkStyle = style.tickStyle as TickmarkStyle;
  const marker = advice.point
    ? renderLinearAdvicePoint({
        vertical: true,
        main: yOf(advice.min, height),
        perpCenter: BAND_PERP_START + 4,
        advice,
      })
    : renderLinearAdviceBand({
        vertical: true,
        mainStart: yOf(advice.min, height),
        mainEnd: yOf(advice.max, height),
        perpStart: BAND_PERP_START,
        advice,
        maskId,
      });
  return svg`
    ${marker}
    ${advice.hideMinTickmark ? nothing : singleSidedTickmark(height, advice.min, tickmarkStyle)}
    ${advice.point || advice.hideMaxTickmark ? nothing : singleSidedTickmark(height, advice.max, tickmarkStyle)}
  `;
}
