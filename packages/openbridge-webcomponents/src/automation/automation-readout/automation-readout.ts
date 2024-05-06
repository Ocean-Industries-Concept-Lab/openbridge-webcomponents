import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './automation-readout.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {LineType, lineWidth} from '..';

export enum AutomationReadoutPosition {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom',
}

@customElement('obc-automation-readout')
export class ObcAutomationReadout extends LitElement {
  @property({type: Number}) value = 0;
  @property({type: String}) unit = '';
  @property({type: Number}) numberOfDigits = 3;
  @property({type: String}) position: AutomationReadoutPosition =
    AutomationReadoutPosition.Bottom;
  @property({type: String}) lineType: LineType | undefined = undefined;

  override render() {
    const offset = this.getLineWidth() / 2;

    return html`
      <button
        class=${classMap({
          wrapper: true,
          [`position-${this.position}`]: true,
        })}
        style="--offset: ${offset}px;"
      >
        <div class="visible-wrapper">
          <div
            class="value"
            style="min-width: ${this.numberOfDigits.toFixed(0)}ch"
          >
            ${this.value.toFixed(0)}
          </div>
          <div class="unit">${this.unit}</div>
        </div>
      </button>
    `;
  }

  getLineWidth(): number {
    if (this.lineType === undefined) {
      return 0;
    }
    return lineWidth(this.lineType);
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-readout': ObcAutomationReadout;
  }
}
