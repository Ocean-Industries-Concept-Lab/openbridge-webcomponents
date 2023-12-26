import {LitElement, html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import compentStyle from './input.style';
import {classMap} from 'lit/directives/class-map.js';

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

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  onChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  @queryAssignedElements({slot: 'icon'}) private iconSlot!: HTMLElement[];
  @state() private hasIcon = false;

  override firstUpdated() {
    this.hasIcon = this.iconSlot.length > 0;
  }

  override render() {
    return html`
      <label class=${classMap({wrapper: true, hasIcon: this.hasIcon})}>
        <input
          type=${this.type}
          class="input"
          value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="icon">
          <slot name="icon"></slot>
        </div>
      </label>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-input': Input;
  }
}
