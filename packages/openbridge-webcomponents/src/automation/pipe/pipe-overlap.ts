import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {overlapPaths} from './pipe-geometry.js';
import type {PipeValue, PipeSize, MediumColor} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

/**
 * `<obc-pipe-overlap>` – A crossing where one pipe run hops over another
 * without connecting, on a process diagram grid.
 *
 * Draws two runs as stroked lines (an outline-weight pass then a
 * fill-weight pass, the shared pipe stroke model): one continuous line
 * passing over, and the crossing run split into two segments around a gap
 * so it reads as passing under. Canonically the vertical run is continuous
 * and the horizontal run is gapped; `direction` rotates the pair 90 degrees
 * so the *other* run becomes the continuous one.
 *
 * ## Features
 * - **Value states:** `open-flow` and `open-generic` (default open pipe),
 *   `empty` (unfilled outline), `medium-flow` (filled with a selectable
 *   medium color), `enhanced` and `running` (highlighted flow states),
 *   `closed` and `closed-dash` (shut-off states, the latter dashed).
 * - **Medium color:** When `value` is `medium-flow`, `mediumColor` selects
 *   the fill/border family (for example `Blue`, `Teal`, `Red`); defaults to
 *   `Teal` when unset. Ignored for other values.
 * - **Sizes:** `small`, `medium` (default), `large`, `xl` — scale both the
 *   outline and fill stroke weights together; the gap width scales with
 *   size to stay legible at every stroke weight.
 * - **Direction:** `direction` selects which run passes over the other —
 *   `vertical` (default) keeps the vertical run continuous and gaps the
 *   horizontal one; `horizontal` keeps the horizontal run continuous and
 *   gaps the vertical one.
 *
 * ## Usage Guidelines
 * Use `obc-pipe-overlap` wherever two pipe runs cross without connecting.
 * If the runs should join into a single four-way junction instead, use
 * `obc-pipe-cross`.
 */
@customElement('obc-pipe-overlap')
export class ObcPipeOverlap extends LitElement {
  static override styles = unsafeCSS(componentStyle);

  @property({type: String}) value: PipeValue = 'open-flow';
  @property({type: String}) size: PipeSize = 'medium';
  @property({type: String, attribute: 'medium-color'})
  mediumColor?: MediumColor;
  // eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
  @property({type: String}) direction: 'horizontal' | 'vertical' = 'vertical';

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    const {continuous, gapped} = overlapPaths(this.size);
    const rotation = this.direction === 'horizontal' ? 90 : 0;
    const hasFill = stroke.fillVar !== null && stroke.fillWeight !== null;

    // Stroke order reproduces the Figma vector: an outline-weight pass over
    // both runs, then a fill-weight pass over both. The gapped (under) run is
    // drawn before the continuous (over) run in each pass so the continuous
    // run's strokes cover the crossing, making it read as lying on top.
    const line = (d: string, weight: number, colorVar: string, dash: number[]) =>
      svg`<path d=${d} fill="none" vector-effect="non-scaling-stroke"
        stroke="var(${colorVar})" stroke-width=${weight}
        stroke-dasharray=${dash.join(' ')} />`;

    const layers = [
      line(gapped, stroke.outlineWeight, stroke.outlineVar, stroke.dashPattern),
      line(continuous, stroke.outlineWeight, stroke.outlineVar, stroke.dashPattern),
    ];
    if (hasFill) {
      layers.push(
        line(gapped, stroke.fillWeight as number, stroke.fillVar as string, []),
        line(continuous, stroke.fillWeight as number, stroke.fillVar as string, [])
      );
    }

    return html`
      <svg
        class="pipe pipe-rotated"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(-12 -12) rotate(${rotation} ${GRID / 2} ${GRID / 2})"
      >
        ${layers}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-overlap': ObcPipeOverlap;
  }
}
