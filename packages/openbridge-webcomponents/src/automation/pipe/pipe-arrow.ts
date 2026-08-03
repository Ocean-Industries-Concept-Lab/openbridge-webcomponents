import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {
  arrowHeadPath,
  arrowStubEnd,
  endpointStubPath,
} from './pipe-geometry.js';
import {renderPipeStrokes} from './pipe-render.js';
import type {
  PipeValue,
  PipeSize,
  PipeDirection,
  MediumColor,
} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

function isClosedValue(value: PipeValue): boolean {
  return value === 'closed' || value === 'closed-dash';
}

// Degrees to rotate the canonical arrowhead around the viewBox centre
// (12,12). Canonical orientation (rotation 0 = direction 'right'): the mouth
// is at the LEFT edge (x=0) and the arrow-out tip points toward +x — the
// opposite canonical edge from `obc-pipe-endpoint`, whose mouth faces `left`
// unrotated.
const ROTATION_BY_DIRECTION: Record<PipeDirection, number> = {
  right: 0,
  bottom: 90,
  left: 180,
  top: 270,
};

/**
 * `<obc-pipe-arrow>` – A flow-direction arrowhead terminating one end of a
 * process diagram pipe run.
 *
 * Draws a filled, rounded-triangle arrowhead (exact vector geometry from the
 * shared Figma glyph table) with the connecting half-cell stub layered on
 * top: the head is painted first — filled with the resolved fill color
 * (falling back to the outline color when the state has no fill, for example
 * `closed`) and, for every non-`closed` state, outlined with a 1px stroke —
 * then the stub is drawn over it as an outline-weight pass followed by a
 * fill-weight pass, blending the head's base into the rest of the pipe run.
 *
 * ## Features
 * - **Value states:** `open-flow` and `open-generic` (default open pipe),
 *   `empty` (unfilled outline), `medium-flow` (filled with a selectable
 *   medium color), `enhanced` and `running` (highlighted flow states),
 *   `closed` and `closed-dash` (shut-off states, drawn as a single outline
 *   pass with a different, blunter head shape).
 * - **Medium color:** When `value` is `medium-flow`, `mediumColor` selects
 *   the fill/border family (for example `Blue`, `Teal`, `Red`); defaults to
 *   `Teal` when unset. Ignored for other values.
 * - **Sizes:** `small`, `medium` (default), `large`, `xl` — scale the stub
 *   and stroke weights together; `xl` also selects a distinct, larger
 *   arrowhead glyph rather than a scaled-up copy of the others.
 * - **Direction:** `direction` selects which tile edge the glyph's terminus
 *   occupies — `top`, `right` (default), `bottom`, or `left` — i.e. the
 *   side the connecting run does NOT attach on. With the default
 *   `flow="arrow-out"` the arrowhead's tip points toward the `direction`
 *   edge; with `flow="arrow-in"` the head is mirrored, so the tip points
 *   back toward the connecting run instead. The mouth (where the run
 *   attaches) is always on the side opposite `direction`, regardless of
 *   `flow`. (Note this is the opposite convention from
 *   `obc-pipe-endpoint`, whose `direction` names the mouth side.)
 * - **Flow:** `flow` selects whether the arrow represents flow leaving
 *   (`arrow-out`, default) or entering (`arrow-in`) at this endpoint, which
 *   selects a mirrored head shape from the glyph table.
 *
 * ## Usage Guidelines
 * Use `obc-pipe-arrow` to close off a pipe run with a directional flow
 * indicator instead of a plain endpoint cap. Combine with
 * `obc-pipe-straight` (and other `obc-pipe-*` components) to build a full
 * pipe network; this component only supplies the terminating arrowhead, not
 * the run leading up to it.
 */
@customElement('obc-pipe-arrow')
export class ObcPipeArrow extends LitElement {
  static override styles = unsafeCSS(componentStyle);

  @property({type: String}) value: PipeValue = 'open-flow';
  @property({type: String}) size: PipeSize = 'medium';
  @property({type: String, attribute: 'medium-color'})
  mediumColor?: MediumColor;
  @property({type: String}) direction: PipeDirection = 'right';
  // eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
  @property({type: String}) flow: 'arrow-in' | 'arrow-out' = 'arrow-out';

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    const closed = isClosedValue(this.value);
    const head = arrowHeadPath(this.flow, this.size, this.value);
    const stub = endpointStubPath(
      arrowStubEnd(this.flow, this.size, this.value)
    );
    const rotation = ROTATION_BY_DIRECTION[this.direction];
    const headFillVar = stroke.fillVar ?? stroke.outlineVar;

    // Head first (painted under the stub), translated by (GRID/2, GRID/2) to
    // undo arrowHeadPath's terminus-at-origin shift and land it back in the
    // shared 0-24 viewBox. Filled with the resolved fill color, falling back
    // to the outline color when the state has no fill; a 1px outline stroke
    // is added for every non-closed state, matching the Figma head vectors.
    const headLayer = svg`
      <g transform="translate(${GRID / 2} ${GRID / 2})">
        <path
          d=${head}
          fill="var(${headFillVar})"
          stroke=${closed ? 'none' : `var(${stroke.outlineVar})`}
          stroke-width=${closed ? 0 : 1}
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;

    // Stub on top, blending the head's base into the rest of the pipe run.
    // For closed / closed-dash the resolved stroke already has a null fill,
    // so the shared renderer emits only the (dashed) outline pass.
    const stubLayers = renderPipeStrokes(stub, stroke);

    return html`
      <svg
        class="pipe pipe-rotated"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(-12 -12) rotate(${rotation} ${GRID / 2} ${GRID /
        2})"
      >
        ${headLayer}${stubLayers}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-arrow': ObcPipeArrow;
  }
}
