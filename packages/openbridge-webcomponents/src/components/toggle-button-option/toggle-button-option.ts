import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import comonentStyle from './toggle-button-option.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcToggleButtonOptionType {
  icon = 'icon',
  text = 'text',
  iconTextUnder = 'icon-text-under',
  iconText = 'text-icon',
}

@customElement('obc-toggle-button-option')
export class ObcToggleButtonOption extends LitElement {
  @property({type: String}) value = 'value';
  @property({type: Boolean}) selected = false;
  @property({type: String}) type = ObcToggleButtonOptionType.text;

  onClick() {
    this.dispatchEvent(
      new CustomEvent('selected', {detail: {value: this.value}})
    );
  }

  override render() {
    const isInlineLabel =
      this.type === ObcToggleButtonOptionType.text ||
      this.type === ObcToggleButtonOptionType.iconText;
    const hasIcon = this.type !== ObcToggleButtonOptionType.text;
    const hasLabel = this.type !== ObcToggleButtonOptionType.icon;
    return html`
      <button
        class=${classMap({
          wrapper: true,
          selected: this.selected,
          'inline-label': isInlineLabel,
        })}
        @click=${this.onClick}
      >
        ${hasIcon
          ? html`<div class="icon">
              <slot name="icon"> </slot>
            </div>`
          : ''}
        ${hasLabel ? html`<div class="label"><slot></slot></div>` : ''}
      </button>
    `;
  }

  static override styles = unsafeCSS(comonentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-option': ObcToggleButtonOption;
  }
}
