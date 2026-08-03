import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {cornerChannel} from './pipe-geometry.js';
import {renderPipeChannel} from './pipe-render.js';
import type {PipeValue, PipeSize, PipeDirection, MediumColor} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

// Degrees to rotate the canonical corner (enters left edge, leaves bottom
// edge) around the viewBox centre (12,12) so its outgoing leg exits toward
// `direction`. Rotating about the centre — rather than the viewBox origin,
// as the deprecated corner-line does — keeps the shape inside the 24x24
// canvas at every step.
const ROTATION_BY_DIRECTION: Record<PipeDirection, number> = {
  bottom: 0,
  left: 90,
  top: 180,
  right: 270,
};

/**
 * `<obc-pipe-corner>` – A 90-degree bend connecting two perpendicular
 * segments on a process diagram grid.
 *
 * Draws the shared rounded-corner pipe geometry, rotated so its outgoing
 * leg exits toward `direction`. Uses the same outline-plus-fill stroke
 * pattern as `obc-pipe-straight` (via the shared `renderPipeStrokes`
 * helper) so both components read as one continuous run when combined.
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
 * - **Direction:** `direction` selects which edge the bend's outgoing leg
 *   exits toward — `top`, `right`, `bottom`, or `left` (default `top`). The
 *   other leg enters from the adjacent edge 90 degrees clockwise from it.
 *
 * ## Usage Guidelines
 * Use `obc-pipe-corner` wherever a pipe run changes direction by 90
 * degrees. Combine with `obc-pipe-straight` (and other `obc-pipe-*`
 * components) to build a full pipe network; this component only supplies
 * the bend, not the straight runs on either side of it.
 */
@customElement('obc-pipe-corner')
export class ObcPipeCorner extends LitElement {
  static override styles = unsafeCSS(componentStyle);

  @property({type: String}) value: PipeValue = 'open-flow';
  @property({type: String}) size: PipeSize = 'medium';
  @property({type: String, attribute: 'medium-color'})
  mediumColor?: MediumColor;
  @property({type: String}) direction: PipeDirection = 'top';

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    const channel = cornerChannel(this.direction, this.size);
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
        ${renderPipeChannel(channel, stroke)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-corner': ObcPipeCorner;
  }
}
