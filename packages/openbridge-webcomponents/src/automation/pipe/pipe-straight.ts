import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {resolvePipeStroke, GRID} from './pipe-styles.js';
import {straightChannel} from './pipe-geometry.js';
import {renderPipeChannel} from './pipe-render.js';
import type {PipeValue, PipeSize, MediumColor} from './pipe-types.js';
import componentStyle from './pipe.css?inline';

/**
 * `<obc-pipe-straight>` – A straight pipe run connecting two points on a
 * process diagram grid.
 *
 * Draws a single straight segment (horizontal or vertical) using the shared
 * pipe stroke model: an outline path plus, for most states, an inner fill
 * path that reads the medium color. It is the simplest member of the
 * `obc-pipe-*` family and establishes the render pattern (outline + fill
 * `<path>` pair driven by a resolved `PipeStroke`) that the other pipe
 * components (corners, endpoints, junctions) build on.
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
 * - **Length and orientation:** `length` sets the run's span in grid units
 *   (one unit = 24px); `orientation` draws the run `horizontal` (default) or
 *   `vertical`.
 *
 * ## Usage Guidelines
 * Use `obc-pipe-straight` for any uninterrupted run between two connection
 * points on a schematic. Combine multiple instances (and other `obc-pipe-*`
 * components for corners, junctions, and endpoints) to build a full pipe
 * network; this component does not bend or branch on its own.
 */
@customElement('obc-pipe-straight')
export class ObcPipeStraight extends LitElement {
  static override styles = unsafeCSS(componentStyle);

  @property({type: String}) value: PipeValue = 'open-flow';
  @property({type: String}) size: PipeSize = 'medium';
  @property({type: String, attribute: 'medium-color'})
  mediumColor?: MediumColor;
  @property({type: Number}) length = 1;
  // eslint-disable-next-line openbridge/prefer-enum-over-string-literal-union
  @property({type: String}) orientation: 'horizontal' | 'vertical' =
    'horizontal';

  override render() {
    const stroke = resolvePipeStroke(this.value, this.size, this.mediumColor);
    const span = this.length * GRID;
    const width = this.orientation === 'horizontal' ? GRID + span : GRID;
    const height = this.orientation === 'horizontal' ? GRID : GRID + span;
    const channel = straightChannel(this.length, this.orientation, this.size);
    return html`
      <svg
        class="pipe"
        width=${width}
        height=${height}
        viewBox="0 0 ${width} ${height}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${renderPipeChannel(channel, stroke)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-pipe-straight': ObcPipeStraight;
  }
}
