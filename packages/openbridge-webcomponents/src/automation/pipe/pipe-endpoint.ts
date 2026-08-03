import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {endpointChannel, endpointCapPath, endpointCapOutlinePath} from './pipe-geometry.js';
import {renderPipeChannel} from './pipe-render.js';
import type {
  PipeValue,
  PipeSize,
  PipeDirection,
  MediumColor,
} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

// Degrees to rotate the canonical endpoint (cap toward the left half of the
// cell, stub mouth OPEN at the right edge, x=GRID) around the viewBox centre
// (12,12) so the terminus faces `direction`. Matches the corner's
// rotate-about-centre approach so the shape stays inside the 24x24 canvas
// at every step.
const ROTATION_BY_DIRECTION: Record<PipeDirection, number> = {
  left: 0,
  top: 90,
  right: 180,
  bottom: 270,
};

// Additional tilt applied to the cap bar (on top of `direction`'s rotation)
// for the `breakoff` variant, degrees.
const BREAKOFF_TILT = 30;

/**
 * `<obc-pipe-endpoint>` – A terminating open-stub-and-cap glyph closing off
 * one end of a process diagram pipe run.
 *
 * Draws an open-mouth pipe stub — the same walled-channel model as
 * `obc-pipe-straight` (a fill-width interior band bordered by two 1px
 * walls), open at the connecting grid edge — meeting a perpendicular
 * rounded-rectangle cap bar at the terminus, filled with the resolved fill
 * color and bordered with a 1px outline stroke. `closed` and `closed-dash`
 * collapse both pieces to a single stroke/fill in the outline color,
 * matching those values' shut-off appearance elsewhere in the family.
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
    const channel = endpointChannel(this.size);
    const cap = endpointCapPath(this.size);
    const rotation = ROTATION_BY_DIRECTION[this.direction];
    const isBreakoff = this.variant === 'breakoff';
    const capTilt = isBreakoff ? BREAKOFF_TILT : 0;
    const hasFill = stroke.fillVar !== null && stroke.fillWeight !== null;

    // Default `cap` variant: the cap's near (stub-facing) edge is left
    // unstroked across the channel band so the stub's interior/walls flow
    // straight into the cap with no seam (see `endpointCapOutlinePath`).
    // `breakoff` tilts the cap away from the stub, so that alignment no
    // longer holds — it keeps the prior fully-closed outline, matching its
    // intentionally disconnected look.
    const capOutline = isBreakoff ? cap : endpointCapOutlinePath(this.size);
    const capFill = svg`<path d=${cap} fill="var(${hasFill ? stroke.fillVar : stroke.outlineVar})" stroke="none"
      transform="rotate(${capTilt} ${GRID / 2} ${GRID / 2})" />`;
    const capLayer =
      hasFill
        ? svg`${capFill}<path d=${capOutline} fill="none"
            stroke="var(${stroke.outlineVar})" stroke-width="1"
            vector-effect="non-scaling-stroke"
            transform="rotate(${capTilt} ${GRID / 2} ${GRID / 2})" />`
        : capFill;

    return html`
      <svg
        class="pipe pipe-rotated"
        width=${GRID}
        height=${GRID}
        viewBox="0 0 ${GRID} ${GRID}"
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(-12 -12) rotate(${rotation} ${GRID / 2} ${GRID / 2})"
      >
        ${capLayer}${renderPipeChannel(channel, stroke)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-endpoint': ObcPipeEndpoint;
  }
}
