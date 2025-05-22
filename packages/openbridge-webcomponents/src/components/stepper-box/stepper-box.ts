import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import compentStyle from './stepper-box.css?inline';
import '../../icons/icon-down-iec.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-up-iec.js';

/**
 *
 * @fires down - Fired when the down button is clicked
 * @fires up - Fired when the up button is clicked
 */
@customElement('obc-stepper-box')
export class ObcStepperBox extends LitElement {
  override render() {
    return html`
      <div class="wrapper">
        <obc-icon-button cornerleft @click=${() => this.down()}>
          <obi-down-iec></obi-down-iec>
        </obc-icon-button>
        <div class="display">
          <div class="value">
            <slot></slot>
          </div>
          <div class="unit">
            <slot name="unit"></slot>
          </div>
        </div>
        <obc-icon-button cornerright @click=${() => this.up()}>
          <obi-up-iec></obi-up-iec>
        </obc-icon-button>
      </div>
    `;
  }

  down() {
    this.dispatchEvent(new CustomEvent('down'));
  }

  up() {
    this.dispatchEvent(new CustomEvent('up'));
  }
  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-stepper-box': ObcStepperBox;
  }
}
