import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import sharedStyle from '../shuffle-button/shuffle-button.css?inline';
import componentStyle from './hydraulic-check-valve.css?inline';
import '../../icons/icon-hydraulic-13.js';

/**
 * `<obc-hydraulic-check-valve>` – Static check valve symbol.
 *
 * Renders the check valve symbol in the same thumb-on-track visual style as
 * the position-selector valve components, sized to a single slot (48px at
 * regular size). A check valve has no selectable positions, so the component
 * is display-only and not focusable.
 *
 * ## Usage Guidelines
 * Use alongside `<obc-hydraulic-valve-4-3>` and `<obc-hydraulic-valve-x-2>`
 * for consistent styling of valves without switchable positions.
 *
 * @alpha
 */
@customElement('obc-hydraulic-check-valve')
export class ObcHydraulicCheckValve extends LitElement {
  /**
   * Accessible name for the symbol.
   *
   * @default 'Check valve'
   */
  @property({type: String}) override ariaLabel = 'Check valve';

  override render() {
    return html`
      <div class="shuffle" role="img" aria-label=${this.ariaLabel}>
        <div class="window">
          <div class="track"></div>
          <div class="thumb selected">
            <div class="visible-wrapper">
              <div class="icon-container">
                <obi-hydraulic-13></obi-hydraulic-13>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = [unsafeCSS(sharedStyle), unsafeCSS(componentStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-hydraulic-check-valve': ObcHydraulicCheckValve;
  }
}
