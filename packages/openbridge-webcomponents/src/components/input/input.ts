import {LitElement, unsafeCSS, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './input.style';
import '../icon/icon';

type HTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

@customElement('obc-input')
export class Input extends LitElement {
  @property({type: String}) value: string = '';
  @property({type: String}) placeholder: string = '';
  @property({type: String}) type: HTMLInputTypeAttribute = 'text';
  @property({type: String}) icon: string = '';

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  onChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  override render() {
    const hasIcon = this.icon !== '';
    return html`
      <label class="wrapper">
        <input
          type=${this.type}
          class="input"
          value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.onInput}
          @change=${this.onChange}
        />
        ${hasIcon
          ? html`<div class="icon">
              <obc-icon icon=${this.icon}></obc-icon>
            </div>`
          : ''}
      </label>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-input': Input;
  }
}
