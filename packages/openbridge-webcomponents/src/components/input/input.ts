import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './input.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {SlotController} from '../../slot-controller';

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
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: Boolean}) required: boolean = false;
  @property({type: Boolean}) error: boolean = false;
  @property({type: Boolean}) noHorisontalPadding: boolean = false;

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  private hasLeadingIconController: SlotController = new SlotController(
    this,
    'leading-icon'
  );
  private hasTrailingIconController: SlotController = new SlotController(
    this,
    'trailing-icon'
  );

  override render() {
    return html`
      <label
        class=${classMap({
          wrapper: true,
          squared: this.squared,
          'has-leading-icon': this.hasLeadingIconController.hasAssignedElements,
          'has-trailing-icon':
            this.hasTrailingIconController.hasAssignedElements,
          [`align-` + this.textAlign]: true,
          [`font-` + this.font]: true,
          disabled: this.disabled,
          error: this.error,
          'no-horisontal-padding': this.noHorisontalPadding,
        })}
      >
        <div class="input-wrapper" part="input-wrapper">
          <input
            .type=${this.type}
            class="input"
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            @input=${this.onInput}
          />
          <div class="icon leading" part="icon leading">
            <slot name="leading-icon"></slot>
          </div>
          <div class="icon trailing" part="icon trailing">
            <slot name="trailing-icon"></slot>
          </div>
        </div>
        <div class="helper-text" part="helper-text">
          <slot name="helper-text"></slot>
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
