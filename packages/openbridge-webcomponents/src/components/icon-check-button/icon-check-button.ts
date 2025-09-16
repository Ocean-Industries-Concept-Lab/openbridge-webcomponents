import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyles from './icon-check-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

@customElement('obc-icon-check-button')
export class ObcIconCheckButton extends LitElement {
  @property({type: Boolean, reflect: true}) checked = false;
  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean}) hasLabel = false;
  @property({type: String}) label = '';
  @property({type: Boolean}) hasAlert = false;

  private handleClick() {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('icon-check-button-click', {
        detail: {
          checked: this.checked,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'state-checked': this.checked,
          'state-unchecked': !this.checked,
          disabled: this.disabled,
          'has-alert': this.hasAlert,
        })}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-pressed=${this.checked ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <div class="visible-wrapper">
          <div class="icon">
            <slot name="icon"></slot>
          </div>
        </div>
        ${this.hasLabel
          ? html`<div class="label-container">
              <div class="label">${this.label}</div>
            </div>`
          : ''}
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyles);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-icon-check-button': ObcIconCheckButton;
  }
}
