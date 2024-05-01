import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./automation-readout.css?inline";

function zeroPadding(value: number, numberOfDigits: number): string {
  const v = value.toFixed(0);
  if (v.length >= numberOfDigits) {
    return "";
  } else {
    return '0'.repeat(numberOfDigits - v.length);
  }
}

@customElement('obc-automation-readout')
export class ObcAutomationReadout extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: String }) unit = '';
  @property({ type: Number }) numberOfDigits = 3;

  override render() {
    return html`
      <div class="wrapper">
        <div class="visible-wrapper">
          <div class="zeros">${zeroPadding(this.value, this.numberOfDigits)}</div>
          <div class="value">${this.value.toFixed(0)}</div>
          <div class="unit">${this.unit}</div>
        </div>
      </div>
      `
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-readout': ObcAutomationReadout
  }
}
