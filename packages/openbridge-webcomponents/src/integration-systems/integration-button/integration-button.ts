import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-button.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export interface IntegrationButtonReadout {
  label: string;
  value: string;
  unit: string;
}

export enum IntegrationButtonVariant {
  normal = 'normal',
  flat = 'flat',
}

export enum IntegrationButtonType {
  hug = 'hug',
  regular = 'regular',
  rich = 'rich',
}

/**
 * `<obc-integration-button>` – A button component for integration systems.
 *
 * @slot leading-icon - Icon before label (shown when `hasLeadingIcon` is true)
 * @slot trailing-icon - Icon after label (shown when `hasTrailingIcon` is true)
 * @slot trailing-icon2 - Icon after label (shown when `hasTrailingIcon2` is true)
 * @slot label - Label text
 * @slot status - Status/description text (shown when `hasDescription` is true and type is not hug)
 * @slot info-label - Info label text
 * @slot info-status - Info status text
 *
 * @fires click - Fired when the internal button is activated.
 *
 * @property {boolean} hasTrailingIcon - Shows the `trailing-icon` slot.
 * @property {boolean} hasTrailingIcon2 - Shows the `trailing-icon2` slot.
 * @property {boolean} hasLeadingIcon - Shows the `leading-icon` slot.
 * @property {boolean} hasDescription - Shows the `status` slot for non-hug types.
 * @property {IntegrationButtonReadout[]} readouts - List of readout items shown in the rich type.
 * @property {boolean} disabled - Disables the internal button.
 * @property {boolean} activated - Applies active state styling while a selection is pending.
 * @property {boolean} selected - Applies selected state styling.
 * @property {boolean} dividerBottom - Shows a bottom divider under the button.
 * @property {IntegrationButtonVariant} variant - Visual variant (`normal` or `flat`).
 * @property {IntegrationButtonType} type - Layout type (`hug`, `regular`, or `rich`).
 */
@customElement('obc-integration-button')
export class ObcIntegrationButton extends LitElement {
  @property({type: Boolean}) hasTrailingIcon = false;
  @property({type: Boolean}) hasTrailingIcon2 = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasDescription = false;
  @property({type: Array, attribute: false})
  readouts: IntegrationButtonReadout[] = [];
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) activated = false;
  @property({type: Boolean}) selected = false;
  @property({type: Boolean}) dividerBottom = false;
  @property({type: String}) variant: IntegrationButtonVariant =
    IntegrationButtonVariant.normal;
  @property({type: String}) type: IntegrationButtonType =
    IntegrationButtonType.regular;

  private getButtonClasses() {
    return {
      'touch-target': true,
      selected: this.selected,
      activated: this.activated,
      disabled: this.disabled,
      'has-description': this.hasDescription,
      ['variant-' + this.variant]: true,
      ['type-' + this.type]: true,
    };
  }

  renderRich() {
    return html`
      <button
        class=${classMap(this.getButtonClasses())}
        ?disabled=${this.disabled}
      >
        <div class="content-container">
          <div class="main-container">
            ${this.hasLeadingIcon
              ? html`<div class="icon leading">
                  <slot name="leading-icon"></slot>
                </div>`
              : nothing}
            <div class="text-container">
              <div class="label"><slot name="label"></slot></div>
              ${this.hasDescription
                ? html`<div class="status"><slot name="status"></slot></div>`
                : nothing}
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
        </div>
      </button>
      ${this.dividerBottom ? html`<div class="divider-bottom"></div>` : nothing}
    `;
  }

  renderRegular() {
    return html`
      <button
        class=${classMap(this.getButtonClasses())}
        ?disabled=${this.disabled}
      >
        <div class="content-container">
          ${this.hasLeadingIcon
            ? html`<div class="icon leading">
                <slot name="leading-icon"></slot>
              </div>`
            : nothing}
          <div class="text-container">
            <div class="label"><slot name="label"></slot></div>
            ${this.hasDescription
              ? html`<div class="status"><slot name="status"></slot></div>`
              : nothing}
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
      </button>
      ${this.dividerBottom ? html`<div class="divider-bottom"></div>` : nothing}
    `;
  }

  renderHug() {
    return html`
      <button
        class=${classMap(this.getButtonClasses())}
        ?disabled=${this.disabled}
      >
        <div class="content-container">
          ${this.hasLeadingIcon
            ? html`<div class="icon leading">
                <slot name="leading-icon"></slot>
              </div>`
            : nothing}
          <div class="text-container">
            <div class="label"><slot name="label"></slot></div>
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
      </button>
      ${this.dividerBottom ? html`<div class="divider-bottom"></div>` : nothing}
    `;
  }

  override render() {
    switch (this.type) {
      case IntegrationButtonType.hug: {
        return this.renderHug();
      }
      case IntegrationButtonType.rich: {
        return this.renderRich();
      }
      case IntegrationButtonType.regular:
      default: {
        return this.renderRegular();
      }
    }
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-button': ObcIntegrationButton;
  }
}
