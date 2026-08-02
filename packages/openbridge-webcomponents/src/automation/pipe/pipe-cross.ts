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
 * Draws two perpendicular full-width bars meeting at the grid centre, using
 * the same outline-plus-fill stroke pattern as the other `obc-pipe-*`
 * components (via the shared `renderPipeStrokes` helper) so it reads as one
 * continuous run when combined with straights and corners. Unlike
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
    const d = crossPath(this.size);
    return html`
      <svg
        class="pipe"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${renderPipeStrokes(d, stroke)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-cross': ObcPipeCross;
  }
}
