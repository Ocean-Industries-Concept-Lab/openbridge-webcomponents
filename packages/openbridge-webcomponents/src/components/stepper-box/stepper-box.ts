import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './stepper-box.css?inline';
import '../../icons/icon-down-iec.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-left-google.js';

export enum ObcStepperBoxType {
  upDown = 'up-down',
  leftRight = 'left-right',
  plusMinus = 'plus-minus',
}

/**
 *
 * @fires down - Fired when the down button is clicked
 * @fires up - Fired when the up button is clicked
 */
@customElement('obc-stepper-box')
export class ObcStepperBox extends LitElement {
  @property({type: String}) type = ObcStepperBoxType.plusMinus;
  @property({type: Boolean}) hasHelperText = false;

  get leftIcon() {
    if (this.type === ObcStepperBoxType.upDown) {
      return html`<obi-chevron-down-google></obi-chevron-down-google>`;
    } else if (this.type === ObcStepperBoxType.leftRight) {
      return html`<obi-chevron-left-google></obi-chevron-left-google>`;
    } else  {
      return html`<obi-down-iec></obi-down-iec>`;
    }
  }

  get rightIcon() {
    if (this.type === ObcStepperBoxType.upDown) {
      return html`<obi-chevron-up-google></obi-chevron-up-google>`;
    } else if (this.type === ObcStepperBoxType.leftRight) {
      return html`<obi-chevron-right-google></obi-chevron-right-google>`;
    } else {
      return html`<obi-up-iec></obi-up-iec>`;
    }
  }

  override render() {
    return html`
      <div class="wrapper">
        <obc-icon-button cornerleft @click=${() => this.down()}>
          ${this.leftIcon}
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
          ${this.rightIcon}
        </obc-icon-button>
      </div>
      ${this.hasHelperText ? html`<div class="helper-text"><slot name="helper-text"></slot></div>` : ''}
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
