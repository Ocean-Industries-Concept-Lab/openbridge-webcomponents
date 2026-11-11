/**
 * The SVG pattern tiles the advice bands and areas are filled with: the
 * caution stripe, the exclusion hairline and the alarm dot lattice, at the
 * geometry `advice.ts` fixes. Each tile is in user space so it reads the same
 * at any band length; the caller references it by id.
 *
 * TODO(designer): the tiles are drawn at every size, as every set draws
 * them; the size below which a hatch stops reading is not decided (#1062).
 *
 * @module
 */

import {nothing, svg, type SVGTemplateResult} from 'lit';
import {ADVICE_DOT, ADVICE_HAIRLINE_WIDTH, ADVICE_STRIPE} from './advice.js';

const STRIPE_TILE = ADVICE_STRIPE.pitch * Math.SQRT2;

/**
 * Parallel 45° lines from top-left to bottom-right, `width` units wide on
 * the design's pitch; a hairline when `width` is
 * {@link ADVICE_HAIRLINE_WIDTH}. The line runs corner to corner of a square
 * tile whose side is the pitch along the axis, with the two half lines at the
 * opposite corners completing the neighbours.
 */
export function stripePattern(
  id: string,
  color: string,
  width: number = ADVICE_STRIPE.width,
  mirrored = false
): SVGTemplateResult {
  const t = STRIPE_TILE;
  // A group drawn under a reflection shows the stripe sloping the other way;
  // mirroring the tile back keeps every band on the same slope.
  const transform = mirrored ? 'scale(-1 1)' : nothing;
  return svg`<pattern id=${id} patternUnits="userSpaceOnUse" width=${t} height=${t} patternTransform=${transform}>
    <path d="M 0 0 L ${t} ${t} M ${t / 2} ${-t / 2} L ${(3 * t) / 2} ${t / 2} M ${-t / 2} ${t / 2} L ${t / 2} ${(3 * t) / 2}" stroke=${color} stroke-width=${width} stroke-linecap="square"/>
  </pattern>`;
}

/** The exclusion hatch: the stripe tile as a hairline. */
export function hairlinePattern(
  id: string,
  color: string,
  mirrored = false
): SVGTemplateResult {
  return stripePattern(id, color, ADVICE_HAIRLINE_WIDTH, mirrored);
}

/** The alarm lattice: square dots on a grid, every other row shifted by half a pitch. */
export function dotPattern(id: string, color: string): SVGTemplateResult {
  const {size, pitch, rowOffset} = ADVICE_DOT;
  const inset = (pitch / 2 - size) / 2;
  return svg`<pattern id=${id} patternUnits="userSpaceOnUse" width=${pitch} height=${pitch}>
    <rect x=${inset} y=${inset} width=${size} height=${size} fill=${color}/>
    <rect x=${inset + rowOffset} y=${inset + pitch / 2} width=${size} height=${size} fill=${color}/>
  </pattern>`;
}
