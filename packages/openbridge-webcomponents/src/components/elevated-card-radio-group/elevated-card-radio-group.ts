import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./elevated-card-radio-group.css?inline";
import { ObcElevatedCardPosition } from '../elevated-card/elevated-card';
import "../elevated-card-radio/elevated-card-radio";

@customElement('obc-elevated-card-radio-group')
export class ObcElevatedCardRadioGroup extends LitElement {

  @property({type: Array}) options: {label: string, value: string}[] = [];
  @property({type: String}) name: string = 'default';
  @property({type: String}) value: string = '';
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: Boolean}) required: boolean = false;
  @property({type: Boolean}) top: boolean = false;

  override render() {
    return html`<div class="wrapper">
        ${this.options.map((option, i) => {
      let position: ObcElevatedCardPosition = ObcElevatedCardPosition.Center;
      if (i === 0 && this.top) {
        position = ObcElevatedCardPosition.Top;
      }
      if (i === this.options.length - 1) {
        position = ObcElevatedCardPosition.Bottom;
      }
      return html`
      <obc-elevated-card-radio
        .name=${this.name}
        .value=${option.value}
        .label=${option.label}
        ?checked=${this.value === option.value}
        ?disabled=${this.disabled}
        ?required=${this.required}
        .position=${position}
      ></obc-elevated-card-radio>`
    }
    )}
    </div>`;
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-elevated-card-radio-group': ObcElevatedCardRadioGroup
  }
}
