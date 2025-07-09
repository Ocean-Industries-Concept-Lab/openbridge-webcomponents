import { LitElement, html, nothing, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import {property} from 'lit/decorators.js';
import comonentvariant from './toggle-button-vertical-option.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcToggleButtonOptionVariant {
  flat = 'flat',
  regular = 'regular',
}


@customElement('obc-toggle-button-vertical-option')
export class ObcToggleButtonVerticalOption extends LitElement {
  @property({type: String}) value = 'value';
  @property({type: Boolean, reflect: true}) selected = false;
  @property({type: String}) variant = ObcToggleButtonOptionVariant.regular;
  @property({type: Boolean, reflect: true}) noDivider = false;
  @property({type: Boolean}) hasIcon = false;
  @property({type: String}) label = '';

  onClick() {
    this.dispatchEvent(
      new CustomEvent('selected', {detail: {value: this.value}})
    );
  }

  override render() {
    const inlineLabel = this.hasIcon && this.label !== '';
    
    return html`
    <button
      class=${classMap({
        wrapper: true,
        selected: this.selected,
        'inline-label': inlineLabel,
        'type-flat': this.variant === ObcToggleButtonOptionVariant.flat,
        'type-regular': this.variant === ObcToggleButtonOptionVariant.regular,
      })}
      @click=${this.onClick}
    >
      <div class="visible-wrapper">
        <div class="icon-label-container">
          ${this.hasIcon
          ? html`<div class="icon"><slot name="icon"></slot></div>`
          : nothing}
        ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
      </div>
        ${!this.selected
          ? html`<div class="bottom-divider"></div>`
          : nothing}
      </div>
    </button>
  `;
}

  static override styles = unsafeCSS(comonentvariant);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-vertical-option': ObcToggleButtonVerticalOption;
  }
}
