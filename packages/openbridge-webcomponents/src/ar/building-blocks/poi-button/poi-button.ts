import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcArAlertType} from '../../types.js';
import {selectionFrame} from './selection-frame.js';
import {customElement} from '../../../decorator.js';
import {
  ObcPoiObjectState,
  ObcPoiObjectStyle,
  ObcPoiObjectType,
} from '../poi-object/poi-object.js';

export enum ObcPoiButtonType {
  Button = 'button',
  Enhanced = 'enhanced',
}

export enum ObcPoiButtonLayout {
  Anchored = 'anchored',
  Inline = 'inline',
}

export enum PoiButtonVisualState {
  Unchecked = 'unchecked',
  Checked = 'checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

export interface ObcPoiButtonDataItem {
  value: string;
  label: string;
  unit: string;
}

export interface ObcPoiButtonHeader {
  content?: string;
  size?: string;
  state?: string;
  type?: string;
  hasIndicator?: boolean;
}

export abstract class ObcPoiButtonBase extends LitElement {
  @property({type: Number}) relativeDirection = 0;
  @property({type: Boolean}) selected = false;
  @property({type: String, reflect: true}) layout: ObcPoiButtonLayout =
    ObcPoiButtonLayout.Anchored;
  @property({type: Object}) header: ObcPoiButtonHeader | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true})
  value: PoiButtonVisualState = PoiButtonVisualState.Unchecked;
  @property({type: String}) type = ObcPoiButtonType.Button;
  @property({type: Boolean}) inExpandedGroup = false;
  @property({type: Array, attribute: false}) data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean}) hasRelation = false;

  get hasData(): boolean {
    return this.data.length > 0;
  }

  get hasHeader(): boolean {
    return this.header !== null;
  }

  private get poiObjectType(): ObcPoiObjectType {
    return this.type === ObcPoiButtonType.Enhanced
      ? ObcPoiObjectType.Large
      : ObcPoiObjectType.Regular;
  }

  private get poiObjectState(): ObcPoiObjectState {
    if (this.value === PoiButtonVisualState.Overlapped) {
      return ObcPoiObjectState.Overlapped;
    }

    if (this.hasData) {
      if (this.value === PoiButtonVisualState.Activated) {
        return ObcPoiObjectState.Activated;
      }
      if (this.value === PoiButtonVisualState.Checked) {
        return ObcPoiObjectState.StaticChecked;
      }
      return ObcPoiObjectState.StaticUnchecked;
    }

    if (this.value === PoiButtonVisualState.Activated) {
      return ObcPoiObjectState.Activated;
    }
    if (this.value === PoiButtonVisualState.Checked) {
      return ObcPoiObjectState.Checked;
    }

    return ObcPoiObjectState.Unchecked;
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
          <obc-poi-object
            class="poi-object"
            .type=${this.poiObjectType}
            .objectStyle=${ObcPoiObjectStyle.Regular}
            .state=${this.poiObjectState}
            .interactive=${false}
          >
            <span
              class="icon"
              style="transform: rotate(${this.relativeDirection}deg);"
            >
              <slot></slot>
            </span>
          </obc-poi-object>
          <div class="alert-ring"></div>
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
          <obc-poi-object
            class="poi-object"
            .type=${this.poiObjectType}
            .objectStyle=${ObcPoiObjectStyle.Regular}
            .state=${this.poiObjectState}
            .interactive=${false}
          >
            <span
              class="icon"
              style="transform: rotate(${this.relativeDirection}deg);"
            >
              <slot></slot>
            </span>
          </obc-poi-object>
        </div>
        ${this.hasRelation
          ? html`<div class="relation-wrapper" part="relation-wrapper">
              <slot name="relation" class="relation" part="relation"></slot>
            </div>`
          : nothing}
        <div class="alert-ring"></div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

@customElement('obc-poi-button')
export class ObcPoiButton extends ObcPoiButtonBase {}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-button': ObcPoiButton;
  }
}
