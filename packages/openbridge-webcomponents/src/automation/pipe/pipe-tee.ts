import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {teePath} from './pipe-geometry.js';
import {renderPipeStrokes} from './pipe-render.js';
import type {PipeValue, PipeSize, PipeDirection, MediumColor} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

// Degrees to rotate the canonical tee (straight run left-right, branch
// dropping toward the bottom edge) around the viewBox centre (12,12) so the
// branch points toward `direction`. Rotating about the centre, like
// `obc-pipe-corner`, keeps the shape inside the 24x24 canvas at every step.
const ROTATION_BY_DIRECTION: Record<PipeDirection, number> = {
  bottom: 0,
  left: 90,
  top: 180,
  right: 270,
};

/**
 * `<obc-pipe-tee>` – A three-way junction connecting a straight run to a
 * perpendicular branch on a process diagram grid.
 *
 * Draws the shared tee geometry — a full-width straight run with a
 * perpendicular branch, its inner corners rounded to match
 * `obc-pipe-corner` — rotated so the branch points toward `direction`. Uses
 * the same outline-plus-fill stroke pattern as the other `obc-pipe-*`
 * components (via the shared `renderPipeStrokes` helper) so it reads as one
 * continuous run when combined with straights and corners.
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
 * - **Direction:** `direction` selects which edge the branch points toward
 *   — `top` (default), `right`, `bottom`, or `left`. The straight run spans
 *   the two edges perpendicular to the branch.
 *
 * ## Usage Guidelines
 * Use `obc-pipe-tee` wherever a pipe run splits into a perpendicular
 * branch. Combine with `obc-pipe-straight` and `obc-pipe-corner` to build a
 * full pipe network; this component only supplies the junction, not the
 * runs on either side of it.
 */
@customElement('obc-pipe-tee')
export class ObcPipeTee extends LitElement {
  static override styles = unsafeCSS(componentStyle);

  @property({type: String}) value: PipeValue = 'open-flow';
  @property({type: String}) size: PipeSize = 'medium';
  @property({type: String, attribute: 'medium-color'})
  mediumColor?: MediumColor;
  @property({type: String}) direction: PipeDirection = 'top';

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    const d = teePath(this.size);
    const rotation = ROTATION_BY_DIRECTION[this.direction];
    return html`
      <svg
        class="pipe"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(${rotation} ${GRID / 2} ${GRID / 2})"
      >
        ${renderPipeStrokes(d, stroke)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-tee': ObcPipeTee;
  }
}
