import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {crossPath} from './pipe-geometry.js';
import {renderPipeStrokes} from './pipe-render.js';
import type {PipeValue, PipeSize, MediumColor} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

/**
 * `<obc-pipe-cross>` – A four-way junction connecting a horizontal run to a
 * crossing vertical run on a process diagram grid.
 *
 * Draws the plus-shaped centreline (two perpendicular full-width runs
 * meeting at the grid centre) with the shared two-pass pipe stroke model —
 * an outline-weight pass then a fill-weight pass. The strokes end flush at
 * the tile edges, so every arm mouth is open (pipes connect across it) and
 * flow reads as passing straight through the crossing. Unlike
 * `obc-pipe-tee`, the crossing is symmetric on all four sides, so the
 * component has no `direction` property.
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
 *   outline and fill stroke weights together.
 *
 * ## Usage Guidelines
 * Use `obc-pipe-cross` wherever two pipe runs cross and connect at all four
 * sides. Combine with `obc-pipe-straight` and `obc-pipe-corner` to build a
 * full pipe network; this component only supplies the junction, not the
 * runs on either side of it. If the two runs cross without connecting, use
 * `obc-pipe-overlap` instead.
 */
@customElement('obc-pipe-cross')
export class ObcPipeCross extends LitElement {
  static override styles = unsafeCSS(componentStyle);

  @property({type: String}) value: PipeValue = 'open-flow';
  @property({type: String}) size: PipeSize = 'medium';
  @property({type: String, attribute: 'medium-color'})
  mediumColor?: MediumColor;

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    return html`
      <svg
        class="pipe"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${renderPipeStrokes(crossPath(), stroke)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-cross': ObcPipeCross;
  }
}
