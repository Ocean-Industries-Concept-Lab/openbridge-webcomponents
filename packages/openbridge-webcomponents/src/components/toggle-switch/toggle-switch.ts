import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../icon-button/icon-button.js';
import componentStyle from './toggle-switch.css?inline';
import {customElement} from '../../decorator.js';

/**
 *
 * @fires input - Dispatched when the value of the input changes
 */
@customElement('obc-toggle-switch')
export class ObcToggleSwitch extends LitElement {
  @property({type: String}) label = 'Label';
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) hasDescription = false;
  @property({type: String}) description = '';
  @property({type: Boolean}) hasBottomDividor = false;
  @property({type: Boolean}) hasIcon = false;

  private _tryChange(e: InputEvent) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.checked = (e.target as HTMLInputElement).checked;
  }

  override render() {
    return html`
      <label
        class=${classMap({
          checked: this.checked,
          disabled: this.disabled,
          'has-description': this.hasDescription,
        })}
      >
        <div class="icon-label-container">
          ${this.hasIcon
            ? html`<div class="icon-container"><slot name="icon"></slot>
                </slot>
              </div>`
            : nothing}
          <div class="label-container">
            <span class="label">${this.label}</span>
            ${this.hasDescription
              ? html`<span class="description">${this.description}</span>`
              : nothing}
          </div>
        </div>
        <div class="switch">
          <div class="presenter ${classMap({checked: this.checked})}">
            <div class="knob"></div>
            <input
              type="checkbox"
              ?checked=${this.checked}
              ?disabled=${this.disabled}
              @input=${this._tryChange}
            />
          </div>
        </div>
        ${this.hasBottomDividor
          ? html`<div class="bottom-divider"></div>`
          : nothing}
      </label>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-switch': ObcToggleSwitch;
  }
}
