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
  Unchecked = 'unchecked',
  Checked = 'checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

export interface ObcPoiTargetButtonData {
  value: string;
  label: string;
  unit: string;
}

export interface ObcPoiTargetButtonHeader {
  content?: string;
  size?: string;
  state?: string;
  type?: string;
  hasIndicator?: boolean;
}

@customElement('obc-poi-target-button')
export class ObcPoiTargetButton extends LitElement {
  @property({type: Number}) relativeDirection = 0;
  @property({type: Boolean}) selected = false;
  @property({type: Object}) header: ObcPoiTargetButtonHeader | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true})
  value: PoiTargetButtonVisualState = PoiTargetButtonVisualState.Unchecked;
  @property({type: String}) type = ObcPoiTargetButtonType.Button;
  @property({type: Boolean}) inExpandedGroup = false;
  @property({type: Array, attribute: false}) data: ObcPoiTargetButtonData[] =
    [];
  @property({type: Boolean}) hasRelation = false;

  get hasData(): boolean {
    return this.data.length > 0;
  }

  get hasHeader(): boolean {
    return this.header !== null;
  }

  override render() {
    if (this.hasData) {
      return this.renderWithData();
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
        ${this.hasHeader
          ? html`<div class="id-label">
              ${this.header?.content ?? ''}
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

  renderWithData() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'has-data': true,
          selected: this.selected,
          'has-header': this.hasHeader,
          [`alert-${this.alertType}`]: true,
          [`type-${this.type}`]: true,
          expanded: this.inExpandedGroup,
        })}
      >
        ${this.hasHeader
          ? html`<div class="id-label">
              ${this.header?.content ?? ''}
              <slot
                name="id-label"
                part="id-label"
                class="id-label-content"
              ></slot>
            </div>`
          : nothing}
        <div class="data-wrapper">
          ${this.data.map(
            (item) =>
              html`<div class="data">
                <div class="value">${item.value}</div>
                <div class="label">${item.label}</div>
                <div class="unit">${item.unit}</div>
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
