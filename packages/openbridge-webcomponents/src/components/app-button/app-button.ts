import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './app-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum AppButtonSize {
  Normal = 'normal',
  Small = 'small',
}

@customElement('obc-app-button')
export class ObcAppButton extends LitElement {
  @property({type: String}) label = 'Button';
  @property({type: Boolean}) checked = false;
  @property({type: String}) size = AppButtonSize.Normal;

  override render() {
    return html` <button
      class="${classMap({
        wrapper: true,
        checked: this.checked,
        small: this.size === AppButtonSize.Small,
      })}"
    >
      <div class="icon-wrapper">
        <span class="icon">
          <slot name="icon"></slot>
        </span>
      </div>
      <div class="label">${this.label}</div>
    </button>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-app-button': ObcAppButton;
  }
}
