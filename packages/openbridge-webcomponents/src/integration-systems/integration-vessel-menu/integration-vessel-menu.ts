import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './integration-vessel-menu.css?inline';

import '../../components/button/button.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';
import '../../building-blocks/alert-list/alert-list.js';

/**
 * `<obc-integration-vessel-menu>` – A menu to be shown when selecting a obc-integration-button from a obc-integration-bar.
 *
 * @slot leading-icon - Icon shown in the header.
 * @slot title - Header title text.
 * @slot button-1-leading-icon - Leading icon for the first button.
 * @slot button-1-label - Label for the first button.
 * @slot button-2-leading-icon - Leading icon for the second button.
 * @slot button-2-label - Label for the second button.
 * @slot button-3-leading-icon - Leading icon for the third button.
 * @slot button-3-label - Label for the third button.
 * @slot content - Main content shown in the content area.
 * @slot alarms - Alarm items rendered inside the alert list.
 *
 * @property {number} numberOfButtons - Number of buttons to render (up to 3).
 *
 * @fires button1-click - Fired when the first button is clicked.
 * @fires button2-click - Fired when the second button is clicked.
 * @fires button3-click - Fired when the third button is clicked.
 */

@customElement('obc-integration-vessel-menu')
export class ObcIntegrationVesselMenu extends LitElement {
  @property({type: Number}) numberOfButtons = 3;

  private renderButtons() {
    return html`${Array.from({length: this.numberOfButtons}, (_, i) => {
      const buttonNum = i + 1;
      return html`<obc-button
        @click=${() =>
          this.dispatchEvent(new CustomEvent(`button${buttonNum}-click`))}
        ?showLeadingIcon=${true}
        ?fullWidth=${true}
        class="button"
      >
        <slot
          name="button-${buttonNum}-leading-icon"
          slot="leading-icon"
        ></slot>
        <slot name="button-${buttonNum}-label"></slot>
      </obc-button>`;
    })}`;
  }

  protected override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
        })}
      >
        <div class="footer-container">${this.renderButtons()}</div>
        <div class="content-area">
          <slot name="content"></slot>
        </div>
        <div class="content-container">
          <obc-alert-list class="alert-list"
            ><slot name="alarms"> </slot>
          </obc-alert-list>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-vessel-menu': ObcIntegrationVesselMenu;
  }
}
