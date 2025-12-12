import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-button.css?inline';
import {property} from 'lit/decorators.js';

export interface IntegrationButtonReadout {
  label: string;
  value: string;
  unit: string;
}

/**
 * `<obc-integration-button>` – A button component for integration systems.
 *
 * @slot leading-icon - Icon before label (shown when `hasLeadingIcon` is true)
 * @slot trailing-icon - Icon after label (shown when `hasTrailingIcon` is true)
 * @slot trailing-icon2 - Icon after label (shown when `hasTrailingIcon2` is true)
 * @slot label - Label text
 * @slot status - Status text
 * @slot info-label - Info label text
 * @slot info-status - Info status text
 */
@customElement('obc-integration-button')
export class ObcIntegrationButton extends LitElement {
  @property({type: Boolean}) hasTrailingIcon = false;
  @property({type: Boolean}) hasTrailingIcon2 = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Array, attribute: false})
  readouts: IntegrationButtonReadout[] = [];
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) selected = false;

  override render() {
    return html`
      <button
        class="wrapper ${this.selected ? 'selected' : ''}"
        ?disabled=${this.disabled}
      >
        <div class="main-container">
          ${this.hasLeadingIcon
            ? html`<div class="icon leading">
                <slot name="leading-icon"></slot>
              </div>`
            : nothing}
          <div class="text-container">
            <div class="label"><slot name="label"></slot></div>
            <div class="status"><slot name="status"></slot></div>
          </div>
          ${this.hasTrailingIcon
            ? html`<div class="icon-container">
                ${this.hasTrailingIcon2
                  ? html`<slot
                      name="trailing-icon2"
                      class="icon trailing"
                    ></slot>`
                  : nothing}
                <slot name="trailing-icon" class="icon trailing"></slot>
              </div>`
            : nothing}
        </div>
        <div class="info-container">
          <div class="info-item">
            <slot class="info-label" name="info-label"></slot>
            <slot class="info-status" name="info-status"></slot>
          </div>
          ${this.readouts.map(
            (readout) => html`
              <div class="info-readout-item">
                <div class="info-item-label">${readout.label}</div>
                <div class="info-item-value">${readout.value}</div>
                <div class="info-item-unit">${readout.unit}</div>
              </div>
            `
          )}
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-button': ObcIntegrationButton;
  }
}
