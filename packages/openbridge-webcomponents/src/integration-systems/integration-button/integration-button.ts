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
 * @slot status - Status/description text (shown when `hasStatus` is true)
 * @slot info-label - Info label text
 * @slot info-status - Info status text
 * @slot integration-vessel-menu - Integration vessel menu to be shown when button is in activated state
 *
 * @fires click - Fired when the internal button is activated.
 *
 * @experimental
 */
@customElement('obc-integration-button')
export class ObcIntegrationButton extends LitElement {
  /** Shows the `trailing-icon` slot. */
  @property({type: Boolean}) hasTrailingIcon = false;
  /**
   * Shows the `trailing-icon2` slot.
   * @availableWhen hasTrailingIcon==true
   */
  @property({type: Boolean}) hasTrailingIcon2 = false;
  /** Shows the `leading-icon` slot. */
  @property({type: Boolean}) hasLeadingIcon = false;
  /** Shows the `status` slot. */
  @property({type: Boolean}) hasStatus = false;
  /** List of readout items shown in the rich type. */
  @property({type: Array, attribute: false})
  readouts: IntegrationButtonReadout[] = [];
  /** Disables the internal button. */
  @property({type: Boolean}) disabled = false;
  /** Applies active state styling while a selection is pending. */
  @property({type: Boolean}) activated = false;
  /** Applies selected state styling. */
  @property({type: Boolean}) selected = false;
  /** Shows a bottom divider under the button. */
  @property({type: Boolean}) dividerBottom = false;
  /** Shows a right divider to separate from adjacent buttons. */
  @property({type: Boolean}) dividerRight = false;
  /** Visual variant (`normal` or `flat`). */
  @property({type: String}) variant: IntegrationButtonVariant =
    IntegrationButtonVariant.normal;
  /** Layout type (`hug`, `regular`, or `rich`). */
  @property({type: String}) type: IntegrationButtonType =
    IntegrationButtonType.regular;

  private getButtonClasses() {
    return {
      'touch-target': true,
      selected: this.selected,
      activated: this.activated,
      disabled: this.disabled,
      'has-description': this.hasStatus,
      ['variant-' + this.variant]: true,
      ['type-' + this.type]: true,
    };
  }

  private onIntegrationVesselMenuClick(event: Event) {
    event.stopPropagation();
  }

  renderRich() {
    return html`
      <div class="button-horizontal-divider-container">
        <div class="button-vertical-divider-container">
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
                  ${this.hasStatus
                    ? html`<div class="status">
                        <slot name="status"></slot>
                      </div>`
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
          ${this.dividerRight
            ? html`<div class="divider-right"></div>`
            : html`<div
                class="divider-right"
                style="visibility: hidden;"
              ></div>`}
        </div>
        ${this.dividerBottom
          ? html`<div class="divider-bottom"></div>`
          : nothing}
      </div>
      <div
        class=${classMap({
          'integration-vessel-menu-container': true,
          show: this.activated,
        })}
        @click=${this.onIntegrationVesselMenuClick}
      >
        <slot name="integration-vessel-menu"></slot>
      </div>
    `;
  }

  renderRegular() {
    return html`
      <div class="button-vertical-divider-container">
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
              ${this.hasStatus
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
        ${this.dividerRight
          ? html`<div class="divider-right"></div>`
          : html`<div class="divider-right" style="visibility: hidden;"></div>`}
      </div>
      <div
        class=${classMap({
          'integration-vessel-menu-container': true,
          show: this.activated,
        })}
        @click=${this.onIntegrationVesselMenuClick}
      >
        <slot name="integration-vessel-menu"></slot>
      </div>
    `;
  }

  renderHug() {
    return html`
      <div class="button-vertical-divider-container">
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
              ${this.hasStatus
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
        ${this.dividerRight
          ? html`<div class="divider-right"></div>`
          : html`<div class="divider-right" style="visibility: hidden;"></div>`}
      </div>
      <div
        class=${classMap({
          'integration-vessel-menu-container': true,
          show: this.activated,
        })}
        @click=${this.onIntegrationVesselMenuClick}
      >
        <slot name="integration-vessel-menu"></slot>
      </div>
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

  override updated() {
    let dividerHeight = 40;
    if (this.type === IntegrationButtonType.hug) {
      dividerHeight = 32;
    }
    if (this.type === IntegrationButtonType.rich) {
      dividerHeight = 64;
    }
    this.style.setProperty(
      '--integration-button-divider-height',
      `${dividerHeight}px`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-button': ObcIntegrationButton;
  }
}
