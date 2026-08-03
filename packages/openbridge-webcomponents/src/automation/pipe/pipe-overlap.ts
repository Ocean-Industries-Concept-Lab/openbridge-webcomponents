import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {overlapJunction} from './pipe-geometry.js';
import {renderPipeJunction} from './pipe-render.js';
import type {PipeValue, PipeSize, MediumColor} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

/**
 * `<obc-pipe-overlap>` – A crossing where one pipe run hops over another
 * without connecting, on a process diagram grid.
 *
 * Draws one run as a solid, uninterrupted bar with open mouths at both
 * edges and unbroken walls, and the other as two segments split around a
 * gap at the crossing point (each segment's own mouth open at its tile
 * edge, nothing capping the gap end), so the two runs read as passing over
 * one another rather than joining. The interior of both runs is a single
 * continuous fill; only the gapped run's walls break, at the gap rather
 * than a shared junction. The gapped run's geometry comes from
 * `overlapJunction`, which returns it pre-rotated to run vertically; the
 * whole pair rotates 90 degrees when `direction` is `horizontal` so the
 * *other* run becomes the one with the gap.
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
 * - **Direction:** `direction` selects which run hops over the other —
 *   `vertical` (default) gaps the vertical run so the horizontal run reads
 *   as continuous; `horizontal` gaps the horizontal run so the vertical run
 *   reads as continuous.
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
    const junction = overlapJunction(this.size);
    const rotation = this.direction === 'horizontal' ? 90 : 0;
    return html`
      <svg
        class="pipe pipe-rotated"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(-12 -12) rotate(${rotation} ${GRID / 2} ${GRID / 2})"
      >
        ${renderPipeJunction(junction, stroke)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-overlap': ObcPipeOverlap;
  }
}
