import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../elevated-card/elevated-card.js';
import '../radio/radio.js';
import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize,
  ObcElevatedCardTag,
} from '../elevated-card/elevated-card.js';
import {customElement} from '../../decorator.js';

@customElement('obc-elevated-card-radio')
export class ObcElevatedCardRadio extends LitElement {
  private static counter = 0;
  @property({type: String}) position: ObcElevatedCardPosition =
    ObcElevatedCardPosition.Regular;
  @property({type: String}) size: ObcElevatedCardSize =
    ObcElevatedCardSize.SingleLine;
  @property({type: Boolean}) graphicBorder = false;
  @property({type: Boolean}) border = false;
  @property({type: String}) name = '';
  @property({type: String}) value = '';
  @property({type: String}) label = '';
  @property({type: Boolean}) checked: boolean = false;
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: Boolean}) required: boolean = false;

  private instanceId: string;

  constructor() {
    super();
    this.instanceId = `obc-elevated-card-radio-${ObcElevatedCardRadio.counter++}`;
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this; // Renders into light DOM
  }

  override render() {
    return html`
      <obc-elevated-card
        class="obc-elevated-card-radio"
        .overrideTag=${ObcElevatedCardTag.Div}
        .position=${this.position}
        .size=${ObcElevatedCardSize.SingleLine}
        ?graphicBorder=${this.graphicBorder}
        ?border=${this.border}
        @click=${this._handleCardClick}
      >
        <obc-radio
          .name=${this.name}
          inputId=${this.instanceId}
          .value=${this.value}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          slot="leading-icon"
        ></obc-radio>
        <label
          class="obc-elevated-card-radio__label"
          for=${this.instanceId}
          slot="label"
          >${this.label}</label
        >
      </obc-elevated-card>
    `;
  }

  private _handleCardClick() {
    this.renderRoot.querySelector('input')?.click();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-elevated-card-radio': ObcElevatedCardRadio;
  }
}
