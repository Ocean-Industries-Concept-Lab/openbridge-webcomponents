import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {endpointStubPath, endpointCapPath} from './pipe-geometry.js';
import {renderPipeStrokes} from './pipe-render.js';
import type {
  PipeValue,
  PipeSize,
  PipeDirection,
  MediumColor,
} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

// Degrees to rotate the canonical endpoint (terminus at the left edge,
// x=0, stub running inward toward the centre) around the viewBox centre
// (12,12) so the terminus faces `direction`. Matches the corner's
// rotate-about-centre approach so the shape stays inside the 24x24 canvas
// at every step.
const ROTATION_BY_DIRECTION: Record<PipeDirection, number> = {
  left: 0,
  top: 90,
  right: 180,
  bottom: 270,
};

/**
 * `<obc-pipe-endpoint>` – A terminating stub-and-cap glyph closing off one
 * end of a process diagram pipe run.
 *
 * Draws the shared half-cell inward stub plus a perpendicular (or tilted
 * "breakoff") cap stroke at the terminus, using the same outline-plus-fill
 * stroke pattern as `obc-pipe-straight` and `obc-pipe-corner`. The stub and
 * cap are each rendered as an outline pass followed by a fill pass so the
 * two pieces read as one continuous glyph; `closed` and `closed-dash`
 * collapse to a single stroke per piece, matching those values' shut-off
 * appearance elsewhere in the family.
 *
 * ## Features
 * - **Value states:** `open-flow` and `open-generic` (default open pipe),
 *   `empty` (unfilled outline), `medium-flow` (filled with a selectable
 *   medium color), `enhanced` and `running` (highlighted flow states),
 *   `closed` and `closed-dash` (shut-off states, the latter dashed).
 * - **Medium color:** When `value` is `medium-flow`, `mediumColor` selects
 *   the fill/border family (for example `Blue`, `Teal`, `Red`); defaults to
 *   `Teal` when unset. Ignored for other values.
 * - **Sizes:** `small`, `medium` (default), `large`, `xl` — scale the stub,
 *   cap, and stroke weights together.
 * - **Direction:** `direction` selects which edge the terminus faces —
 *   `top`, `right` (default), `bottom`, or `left`.
 * - **Cap variant:** `variant` selects a straight `cap` (default, cap
 *   perpendicular to the stub) or a `breakoff` cap (tilted ~30 degrees, for
 *   a broken/disconnected look).
 *
 * ## Usage Guidelines
 * Use `obc-pipe-endpoint` to close off a pipe run that does not continue to
 * another device or junction. Combine with `obc-pipe-straight` (and other
 * `obc-pipe-*` components) to build a full pipe network; this component
 * only supplies the terminating glyph, not the run leading up to it.
 */
@customElement('obc-pipe-endpoint')
export class ObcPipeEndpoint extends LitElement {
  static override styles = unsafeCSS(componentStyle);

  @property({type: String}) value: PipeValue = 'open-flow';
  @property({type: String}) size: PipeSize = 'medium';
  @property({type: String, attribute: 'medium-color'})
  mediumColor?: MediumColor;
  @property({type: String}) direction: PipeDirection = 'right';
  // eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
  @property({type: String}) variant: 'cap' | 'breakoff' = 'cap';

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    const stub = endpointStubPath();
    const outlineCap = endpointCapPath(this.size, this.variant, 'outline');
    const rotation = ROTATION_BY_DIRECTION[this.direction];

    // The stub shares one `d` across both layers, so `renderPipeStrokes`'s
    // outline path (index 0) fits it directly. The cap has a different `d`
    // per layer (the fill cap is shorter than the outline cap), so its two
    // layers are drawn by hand: outline pass (stub, then cap) followed by a
    // fill pass — matching the canvas glyph's draw order — and the fill
    // pass is skipped entirely when the resolved stroke has no fill
    // (closed / closed-dash), leaving a single stroke.
    const outlinePass = [
      renderPipeStrokes(stub, stroke)[0],
      svg`<path d=${outlineCap} fill="none" vector-effect="non-scaling-stroke"
        stroke="var(${stroke.outlineVar})" stroke-width=${stroke.outlineWeight}
        stroke-dasharray=${stroke.dashPattern.join(' ')} />`,
    ];

    const fillPass =
      stroke.fillVar !== null && stroke.fillWeight !== null
        ? [
            svg`<path d=${stub} fill="none" vector-effect="non-scaling-stroke"
              stroke="var(${stroke.fillVar})" stroke-width=${stroke.fillWeight} />`,
            svg`<path d=${endpointCapPath(this.size, this.variant, 'fill')} fill="none"
              vector-effect="non-scaling-stroke" stroke="var(${stroke.fillVar})"
              stroke-width=${stroke.fillWeight} />`,
          ]
        : [];

    return html`
      <svg
        class="pipe pipe-rotated"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(-12 -12) rotate(${rotation} ${GRID / 2} ${GRID / 2})"
      >
        ${outlinePass}${fillPass}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-endpoint': ObcPipeEndpoint;
  }
}
