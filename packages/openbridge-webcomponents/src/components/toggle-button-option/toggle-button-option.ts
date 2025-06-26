import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import comonentvariant from './toggle-button-option.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcToggleButtonOptionVariant {
  icon = 'icon',
  text = 'text',
  iconTextUnder = 'icon-text-under',
  iconText = 'text-icon',
}

export enum ObcToggleButtonOptionType {
  flat = 'flat',
  regular = 'regular',
}

@customElement('obc-toggle-button-option')
export class ObcToggleButtonOption extends LitElement {
  @property({type: String}) value = 'value';
  @property({type: Boolean, reflect: true}) selected = false;
  @property({type: String}) variant = ObcToggleButtonOptionVariant.text;
  @property({type: String}) type = ObcToggleButtonOptionType.regular;
  @property({type: Boolean}) hugText = false;

  onClick() {
    this.dispatchEvent(
      new CustomEvent('selected', {detail: {value: this.value}})
    );
  }

  override render() {
    const isInlineLabel =
      this.variant === ObcToggleButtonOptionVariant.text ||
      this.variant === ObcToggleButtonOptionVariant.iconText;
    const hasIcon = this.variant !== ObcToggleButtonOptionVariant.text;
    const hasLabel = this.variant !== ObcToggleButtonOptionVariant.icon;
    return html`
      <button
        class=${classMap({
          wrapper: true,
          selected: this.selected,
          'inline-label': isInlineLabel,
          'type-flat': this.type === ObcToggleButtonOptionType.flat,
          'type-regular': this.type === ObcToggleButtonOptionType.regular,
          'icon-text-under':
            this.variant === ObcToggleButtonOptionVariant.iconTextUnder,
          'hug-text': this.hugText,
        })}
        @click=${this.onClick}
      >
        <div class="visible-wrapper">
          ${hasIcon
            ? html`<div class="icon">
                <slot name="icon"> </slot>
              </div>`
            : ''}
          ${hasLabel ? html`<div class="label"><slot></slot></div>` : ''}
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(comonentvariant);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-option': ObcToggleButtonOption;
  }
}
