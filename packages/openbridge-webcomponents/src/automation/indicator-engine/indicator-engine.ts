import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './indicator-engine.css?inline';
import {customElement} from '../../decorator.js';
import {IndicatorDirection} from '../indicator-shared/linear-indicator.js';

export enum IndicatorEngineValue {
  static = 'static',
  regular = 'regular',
  enhanced = 'enhanced',
}

const CYLINDER_RADIUS = 3;
const HORIZONTAL_CYLINDER_CENTERS = [12, 20, 28, 36];
const VERTICAL_CYLINDER_CENTERS = [12, 20, 28, 36];

/**
 * Compact 48×48 engine indicator glyph.
 *
 * ## Features / Variants
 * - `direction`: `vertical` (upright block with side rails) or `horizontal`
 *   (lying block on a base rail)
 * - `value`: cylinder color — `static`, `regular` or `enhanced`
 *
 * ## Usage Guidelines
 * Use as a static engine presence/state glyph in dashboards and lists.
 * It carries no numeric value; pair it with readouts or other indicators
 * when quantities must be shown.
 */
@customElement('obc-indicator-engine')
export class ObcIndicatorEngine extends LitElement {
  @property({type: String, reflect: true}) value: IndicatorEngineValue =
    IndicatorEngineValue.static;
  @property({type: String, reflect: true}) direction: IndicatorDirection =
    IndicatorDirection.vertical;

  private renderHorizontal() {
    return svg`
      <rect class="rail" x="6" y="38" width="36" height="4" rx="2" />
      <rect class="frame" x="6" y="12" width="36" height="24" rx="4" />
      <rect class="rail" x="9" y="24" width="30" height="1" rx="0.5" />
      ${HORIZONTAL_CYLINDER_CENTERS.map(
        (cx) =>
          svg`<circle class="cylinder" cx=${cx} cy="18" r=${CYLINDER_RADIUS} />`
      )}
    `;
  }

  private renderVertical() {
    return svg`
      <rect class="frame" x="12" y="6" width="24" height="36" rx="4" />
      <rect class="rail" x="16" y="10" width="1" height="28" rx="0.5" />
      <rect class="rail" x="31" y="10" width="1" height="28" rx="0.5" />
      ${VERTICAL_CYLINDER_CENTERS.map(
        (cy) =>
          svg`<circle class="cylinder" cx="24" cy=${cy} r=${CYLINDER_RADIUS} />`
      )}
    `;
  }

  override render() {
    return html`
      <svg viewBox="0 0 48 48" role="img">
        ${this.direction === IndicatorDirection.horizontal
          ? this.renderHorizontal()
          : this.renderVertical()}
      </svg>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-indicator-engine': ObcIndicatorEngine;
  }
}
