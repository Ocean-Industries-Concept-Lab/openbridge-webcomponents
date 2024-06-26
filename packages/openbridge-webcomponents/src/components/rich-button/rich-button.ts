import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './rich-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcRichButtonPosition {
  Regular = 'regular',
  Top = 'top',
  Bottom = 'bottom',
  Center = 'center',
}
export type ObcRichButtonPositionType = 'regular' | 'top' | 'bottom' | 'center';

export enum ObcRichButtonSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
  MultiLine = 'multi-line',
}
export type ObcRichButtonSizeType =
  | 'single-line'
  | 'double-line'
  | 'multi-line';

@customElement('obc-rich-button')
export class ObcRichButton extends LitElement {
  @property({type: String}) position: ObcRichButtonPositionType =
    ObcRichButtonPosition.Regular;
  @property({type: String}) size: ObcRichButtonSizeType =
    ObcRichButtonSize.SingleLine;
  @property({type: Boolean}) info = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasTrailingIcon = false;
  @property({type: Boolean}) hasStatus = false;
  @property({type: Boolean}) hasGraphic = false;
  @property({type: Boolean}) graphicBorder = false;
  @property({type: Boolean}) border = false;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.position]: true,
          [this.size]: true,
          'graphic-border': this.graphicBorder,
          info: this.info,
          border: this.border,
        })}
      >
        <button>
          ${this.hasGraphic
            ? html`<div class="graphic"><slot name="graphic"></slot></div>`
            : nothing}
          <div class="container">
            <div class="container-content">
              ${this.hasLeadingIcon
                ? html`<div class="leading-icon">
                    <slot name="leading-icon"></slot>
                  </div>`
                : nothing}
              <div class="content">
                <slot name="label"></slot>
                ${this.size === ObcRichButtonSize.SingleLine
                  ? nothing
                  : html`<slot name="description"></slot>`}
              </div>
            </div>
            ${this.hasStatus
              ? html`
                  <div class="status">
                    <slot name="status"></slot>
                  </div>
                `
              : nothing}
            ${this.hasTrailingIcon
              ? html`
                  <div class="trailing-icon">
                    <slot name="trailing-icon"></slot>
                  </div>
                `
              : nothing}
          </div>
        </button>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-button': ObcRichButton;
  }
}
