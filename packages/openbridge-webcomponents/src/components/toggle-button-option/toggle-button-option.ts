import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import comonentvariant from './toggle-button-option.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcToggleButtonOptionType {
  icon = 'icon',
  text = 'text',
  iconTextUnder = 'icon-text-under',
  iconText = 'text-icon',
}

export enum ObcToggleButtonOptionVariant {
  flat = 'flat',
  regular = 'regular',
}

@customElement('obc-toggle-button-option')
export class ObcToggleButtonOption extends LitElement {
  @property({type: String}) value = 'value';
  @property({type: Boolean, reflect: true}) selected = false;
  @property({type: String}) type = ObcToggleButtonOptionType.text;
  @property({type: String}) variant = ObcToggleButtonOptionVariant.regular;
  @property({type: Boolean}) hugText = false;
  @property({type: Boolean, reflect: true}) noDivider = false;

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
          'type-flat': this.variant === ObcToggleButtonOptionVariant.flat,
          'type-regular': this.variant === ObcToggleButtonOptionVariant.regular,
          'icon-text-under':
            this.type === ObcToggleButtonOptionType.iconTextUnder,
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
