import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-target-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcArAlertType} from '../types.js';
import {selectionFrame} from './selection-frame';

export enum ObcPoiTargetButtonType {
  Button = 'button',
  Enhanced = 'enhanced',
}

@customElement('obc-poi-target-button')
export class ObcPoiTargetButton extends LitElement {
  @property({type: Number}) relativeDirection = 0;
  @property({type: Boolean}) selected = false;
  @property({type: String}) selectedId: string | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: Boolean}) overlap = false;
  @property({type: String}) type = ObcPoiTargetButtonType.Button;
  override render() {
    return html`
      ${this.overlap
        ? html`<div
            class=${classMap({
              'wrapper-overlap': true,
              [`alert-${this.alertType}`]: true,
              [`type-${this.type}`]: true,
            })}
          >
            <div class="vissible-wrapper"></div>
          </div>`
        : html`
            <button
              class=${classMap({
                wrapper: true,
                selected: this.selected,
                [`alert-${this.alertType}`]: true,
                [`type-${this.type}`]: true,
              })}
            >
              ${this.selectedId
                ? html`<div class="id-label">${this.selectedId}</div>`
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
          `}
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target-button': ObcPoiTargetButton;
  }
}
