import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './instrument-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum InstrumentFieldSize {
  small = 'small',
  regular = 'regular',
  enhanced = 'enhanced',
  large = 'large',
  largeEnhanced = 'large-enhanced',
}
export type InstrumentFieldSizeType =
  | 'small'
  | 'regular'
  | 'enhanced'
  | 'large'
  | 'large-enhanced';

@customElement('obc-instrument-field')
export class ObcInstrumentField extends LitElement {
  @property({type: String}) size: InstrumentFieldSizeType =
    InstrumentFieldSize.regular;
  @property({type: Number}) setpoint = 0;
  @property({type: Boolean}) hasSetpoint = false;
  @property({type: Number}) value = 0;
  @property({type: Boolean}) degree = false;
  @property({type: Number}) maxDigits = 3;
  @property({type: Number}) fractionDigits = 0;
  @property({type: String}) tag = '';
  @property({type: String}) unit = '';
  @property({type: String}) source = '';
  @property({type: Boolean}) hasSource = false;

  override render() {
    return html`
      <div class=${classMap({wrapper: true, [this.size]: true})}>
        ${this.hasSetpoint
          ? html`<div class="setpoint">
              ${this.size === 'small' || this.size === 'regular'
                ? html`<svg
                    class="setpoint-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4C4 3.17595 4.94076 2.70557 5.6 3.2L12 8L5.6 12.8C4.94076 13.2944 4 12.824 4 12V4Z"
                      fill="#0070D6"
                    />
                  </svg>`
                : html`<svg
                    class="setpoint-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 5C6 4.17595 6.94076 3.70557 7.6 4.2L18 12L7.6 19.8C6.94076 20.2944 6 19.824 6 19V5Z"
                      fill="var(--instrument-enhanced-primary-color)"
                    />
                  </svg>`}
              <div class="setpoint-value">${this.setpointValueBlueNumbers}</div>
            </div>`
          : null}
        <div class="value">
          <div class="value-hint-zero">${this.hintZeros}</div>
          <div class="value-blue">${this.valueBlueNumbers}</div>
          ${this.degree ? html`<div class="degree">°</div>` : null}
        </div>
        <div class="label">
          <div class="tag">${this.tag}</div>
          <div class="unit">${this.unit}</div>
        </div>
        ${this.hasSource
          ? html`<div class="source">${this.source}</div>`
          : null}
      </div>
    `;
  }

  get setpointValueBlueNumbers(): string {
    return this.setpoint.toFixed(this.fractionDigits);
  }

  get valueBlueNumbers(): string {
    return this.value.toFixed(this.fractionDigits);
  }

  get hintZeros(): string {
    if (this.value < 0) {
      return '';
    }
    const nBlues = this.valueBlueNumbers.length;
    const nHints = this.maxDigits - nBlues;
    if (nHints > 0) {
      return '0'.repeat(nHints);
    }
    return '';
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-instrument-field': ObcInstrumentField;
  }
}
