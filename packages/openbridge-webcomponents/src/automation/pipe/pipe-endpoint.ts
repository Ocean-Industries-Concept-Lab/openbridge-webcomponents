import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {
  endpointLineCap,
  endpointStubPath,
  ENDPOINT_BAR_HALF_OUTLINE,
  ENDPOINT_BAR_HALF_FILL,
} from './pipe-geometry.js';
import type {
  PipeValue,
  PipeSize,
  PipeDirection,
  MediumColor,
} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

// Degrees to rotate the canonical endpoint (stub mouth OPEN at the LEFT
// edge, x=0, running inward to the bar at the grid centre — see
// `endpointStubPath`) around the viewBox centre (12,12) so the OPEN MOUTH
// faces `direction`: the connecting run attaches on the `direction` side,
// and the bar sits on the anchor. Matches the corner's rotate-about-centre
// approach so the shape stays inside the 24x24 canvas at every step.
const ROTATION_BY_DIRECTION: Record<PipeDirection, number> = {
  left: 0,
  top: 90,
  right: 180,
  bottom: 270,
};

/**
 * `<obc-pipe-endpoint>` – A terminating open-stub-and-cap glyph closing off
 * one end of a process diagram pipe run.
 *
 * Draws a T — a pipe stub meeting a perpendicular bar at the terminus —
 * stroked with the same two-pass model as the rest of the family: an
 * outline-weight pass, then (for states with a fill) a fill-weight pass over
 * it. The bar's ends are rounded at `medium` (round linecap) and square at
 * `small`/`large`/`xl`, matching the Figma endpoint glyph. `closed` and
 * `closed-dash` collapse to the single outline-color pass, matching those
 * values' shut-off appearance elsewhere in the family.
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
 *   bar, and stroke weights together.
 * - **Direction:** `direction` selects which tile edge the OPEN MOUTH faces
 *   — `top`, `right` (default), `bottom`, or `left`. The connecting run
 *   attaches on the `direction` side; the terminating bar sits at the tile
 *   centre. To cap a run arriving from the left, use `direction="left"`.
 *   (Note this is the opposite convention from `obc-pipe-arrow`, whose
 *   `direction` names the edge its arrow-out tip points toward.)
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

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    const rotation = ROTATION_BY_DIRECTION[this.direction];
    const cap = endpointLineCap(this.size);
    const hasFill = stroke.fillVar !== null && stroke.fillWeight !== null;

    // Not `renderPipeStrokes`: the T's two passes must interleave per part
    // (stub outline, bar outline, stub fill, bar fill) so the stub's fill
    // pass covers the bar's outline where they meet, keeping the interior
    // seamless — and the bar's path length and linecap differ per pass.
    const c = GRID / 2;
    const stub = endpointStubPath();

    const bar = (
      half: number,
      weight: number,
      colorVar: string,
      dash: number[]
    ) =>
      svg`<path d=${`M ${c} ${c - half} L ${c} ${c + half}`} fill="none"
        stroke="var(${colorVar})" stroke-width=${weight}
        stroke-linecap=${cap} vector-effect="non-scaling-stroke"
        stroke-dasharray=${dash.join(' ')} />`;
    const stubLine = (weight: number, colorVar: string, dash: number[]) =>
      svg`<path d=${stub} fill="none" stroke="var(${colorVar})"
        stroke-width=${weight} vector-effect="non-scaling-stroke"
        stroke-dasharray=${dash.join(' ')} />`;

    const outlineHalf = ENDPOINT_BAR_HALF_OUTLINE[this.size];
    const layers = [
      // Outline pass (stub + bar).
      stubLine(stroke.outlineWeight, stroke.outlineVar, stroke.dashPattern),
      bar(outlineHalf, stroke.outlineWeight, stroke.outlineVar, stroke.dashPattern),
    ];
    if (hasFill) {
      const fillHalf = ENDPOINT_BAR_HALF_FILL[this.size];
      layers.push(
        stubLine(stroke.fillWeight as number, stroke.fillVar as string, []),
        bar(fillHalf, stroke.fillWeight as number, stroke.fillVar as string, [])
      );
    }

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
        ${layers}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-endpoint': ObcPipeEndpoint;
  }
}
