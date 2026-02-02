import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-target-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcArAlertType} from '../types.js';
import {selectionFrame} from './selection-frame.js';
import {customElement} from '../../decorator.js';

export enum ObcPoiTargetButtonType {
  Button = 'button',
  Enhanced = 'enhanced',
}

export enum PoiTargetButtonVisualState {
  Normal = 'normal',
  Overlap = 'overlap',
}

export interface ObcPoiTargetButtonValue {
  value: string;
  label: string;
  unit: string;
}

@customElement('obc-poi-target-button')
export class ObcPoiTargetButton extends LitElement {
  @property({type: Number}) relativeDirection = 0;
  @property({type: Boolean}) selected = false;
  @property({type: String}) selectedId: string | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true, attribute: 'visualstate'})
  visualState: PoiTargetButtonVisualState = PoiTargetButtonVisualState.Normal;
  @property({type: String}) type = ObcPoiTargetButtonType.Button;
  @property({type: Boolean}) inExpandedGroup = false;
  @property({type: Array, attribute: false}) values: ObcPoiTargetButtonValue[] =
    [];
  @property({type: Boolean}) hasRelation = false;

  override render() {
    if (this.values.length > 0) {
      return this.renderWithValues();
    }
    return this.renderButton();
  }

  renderButton() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          selected: this.selected,
          [`alert-${this.alertType}`]: true,
          [`type-${this.type}`]: true,
          expanded: this.inExpandedGroup,
        })}
      >
        ${this.selectedId
          ? html`<div class="id-label">
              ${this.selectedId}
              <slot
                name="id-label"
                part="id-label"
                class="id-label-content"
              ></slot>
            </div>`
          : nothing}
        <div class="button-wrapper">
          ${selectionFrame(this.selected, this.alertType, this.type)}
          <div class="visible-wrapper">
            <div
              class="icon"
              style="transform: rotate(${this.relativeDirection}deg);"
            >
              <slot></slot>
            </div>
            <div class="alert-ring"></div>
            <div class="state-layer"></div>
          </div>
        </div>
      </button>
    `;
  }

  renderWithValues() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'has-values': true,
          selected: this.selected,
          'has-id-label': Boolean(this.selectedId),
          [`alert-${this.alertType}`]: true,
          [`type-${this.type}`]: true,
          expanded: this.inExpandedGroup,
        })}
      >
        ${this.selectedId
          ? html`<div class="id-label">
              ${this.selectedId}
              <slot
                name="id-label"
                part="id-label"
                class="id-label-content"
              ></slot>
            </div>`
          : nothing}
        <div class="data-wrapper">
          ${this.values.map(
            (value) =>
              html`<div class="data">
                <div class="value">${value.value}</div>
                <div class="label">${value.label}</div>
                <div class="unit">${value.unit}</div>
              </div>`
          )}
        </div>
        <div class="button-wrapper">
          ${selectionFrame(this.selected, this.alertType, this.type)}
          <div class="visible-wrapper">
            <div
              class="icon"
              style="transform: rotate(${this.relativeDirection}deg);"
            >
              <slot></slot>
            </div>
          </div>
        </div>
        ${this.hasRelation
          ? html`<div class="relation-wrapper" part="relation-wrapper">
              <slot name="relation" class="relation" part="relation"></slot>
            </div>`
          : nothing}
        <div class="alert-ring"></div>
        <div class="state-layer"></div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target-button': ObcPoiTargetButton;
  }
}
