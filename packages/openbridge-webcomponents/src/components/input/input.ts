import {LitElement, html, unsafeCSS} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import compentStyle from './input.css?inline';
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

/**
 *
 * @element obc-input
 *
 * @fires input - Dispatched when the value of the input changes
 */
@customElement('obc-input')
export class ObcInput extends LitElement {
  @property({type: String}) value: string = '';
  @property({type: String}) placeholder: string = '';
  @property({type: String}) type: HTMLInputTypeAttribute = 'text';
  @property({type: Boolean}) squared: boolean = false;
  @property({type: String}) textAlign: 'left' | 'center' | 'right' = 'left';
  @property({type: String}) font: 'body' | 'button' = 'body';

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  @queryAssignedElements({slot: 'icon'}) private iconSlot!: HTMLElement[];
  @state() private hasIcon = false;

  override firstUpdated() {
    this.hasIcon = this.iconSlot.length > 0;
  }

  override render() {
    return html`
      <label
        class=${classMap({
          wrapper: true,
          hasIcon: this.hasIcon,
          squared: this.squared,
          [`align-` + this.textAlign]: true,
          [`font-` + this.font]: true,
        })}
      >
        <input
          type=${this.type}
          class="input"
          value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.onInput}
        />
        <div class="icon">
          <slot name="icon"></slot>
        </div>
      </label>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-input': ObcInput;
  }
}
