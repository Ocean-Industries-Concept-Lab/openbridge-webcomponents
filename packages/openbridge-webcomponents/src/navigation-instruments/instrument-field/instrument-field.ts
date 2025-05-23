import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import compentStyle from './instrument-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import "../../components/button/button";
import "../../icons/icon-drop-down-google.js";
import "../../components/context-menu/context-menu";
import "../../components/navigation-item/navigation-item";

export enum InstrumentFieldSize {
  regular = 'regular',
  enhanced = 'enhanced',
}

@customElement('obc-instrument-field')
export class ObcInstrumentField extends LitElement {
  @property({type: String}) size: InstrumentFieldSize =
    InstrumentFieldSize.regular;
  @property({type: Number}) setpoint = 0;
  @property({type: Boolean}) hasSetpoint = false;
  @property({type: Boolean}) hasSrc = false;
  @property({type: Number}) value = 0;
  @property({type: Number}) maxDigits = 3;
  @property({type: Number}) fractionDigits = 0;
  @property({type: String}) tag = '';
  @property({type: String}) unit = '';
  @property({type: String}) src = '';
  @property({type: Boolean}) neutralColor = false;
  @property({type: Boolean}) horizontal = false;
  @property({type: Boolean}) labelOnly = false;
  @property({type: Boolean}) off = false;
  @property({type: Boolean}) hasSrcPicker = false;

  @state() srcPickerContentVisible = false;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.size]: true,
          'neutral-color': this.neutralColor || this.off,
          horizontal: this.horizontal,
          'left-aligned': this.labelOnly || (this.horizontal && !this.hasSetpoint),
        })}
      > 
        ${this.horizontal && this.size === InstrumentFieldSize.regular
          ? html`<div class="label"><div class="tag" part="tag">${this.tag}</div></div>`
          : nothing
          }
        ${this.hasSetpoint
          ? html`<div class="setpoint">
              <svg
                class="setpoint-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="var(--instrument-enhanced-secondary-color)"
                  d="M4.66797 4.80263C4.66797 4.14363 5.45194 3.76746 6.0013 4.16286L10.4456 7.17243C11.0312 7.56899 11.0314 8.43154 10.4459 8.82828L6.0013 11.8401C5.45194 12.2355 4.66797 11.8593 4.66797 11.2003L4.66797 4.80263Z"
                  fill="var(--instrument-enhanced-primary-color)"
                />
              </svg>
              <div class="setpoint-value">${this.setpointValueBlueNumbers}</div>
            </div>`
          : null}
        ${this.horizontal && !this.labelOnly && this.hasSetpoint
          ? html`<div class="divider"></div>`
          : null}
        ${!this.labelOnly
          ? html` <div class="value">
              ${this.off
                ? html`<div class="value-blue">OFF</div>`
                : html` <div class="value-hint-zero">${this.hintZeros}</div>
                    <div class="value-blue">${this.valueBlueNumbers}</div>`}
            </div>`
          : null}
        <div class="label" part="label">
          ${this.horizontal && this.size === InstrumentFieldSize.regular
            ? nothing
            : html`<div class="tag" part="tag">${this.tag}</div>`
          }
          <div class="unit">${this.unit}</div>
        </div>
        ${this.hasSrc && this.horizontal
          ? html`<div class="divider src-divider"></div>`
          : null}
        ${this.hasSrc
          ? this.hasSrcPicker
            ? html`<div class="src">
                    <obc-button variant="flat" icon="arrow-down" class="src-picker" @click=${() => this.srcPickerContentVisible = !this.srcPickerContentVisible}>
                      ${this.src}
                      <obi-drop-down-google slot="trailing-icon"></obi-drop-down-google>
                    </obc-button>
                </div>`
            : html`<div class="src">${this.src}</div>`
          : null}
        
      </div>
      ${this.hasSrcPicker && this.srcPickerContentVisible ? html`<obc-context-menu class="src-picker-content" @click=${() => this.srcPickerContentVisible = false}>
        <slot name="src-picker-content"></slot>
      </obc-context-menu>` : nothing}
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
