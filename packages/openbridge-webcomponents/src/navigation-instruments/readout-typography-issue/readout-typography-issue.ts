import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './readout-typography-issue.css?inline';
import {customElement} from '../../decorator.js';

@customElement('obc-readout-typography-issue')
export class ObcReadoutTypographyIssue extends LitElement {
  @property({type: String}) value = '';
  @property({type: String}) label = '';
  @property({type: String}) unit = '';

  override render() {
    return html`
      <div class="visual-wrapper">
        <div class="content-container">
          <div class="readout__value-wrapper">
            <span class="readout__value">${this.value}</span>
          </div>
          <div class="readout__meta">
            <div class="readout__meta-line readout__meta-line--label">
              <span class="readout__label">${this.label}</span>
            </div>
            <div class="readout__meta-line readout__meta-line--unit">
              <span class="readout__unit">${this.unit}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-typography-issue': ObcReadoutTypographyIssue;
  }
}
