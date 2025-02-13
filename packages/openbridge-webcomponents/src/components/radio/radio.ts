import { LitElement, html, unsafeCSS } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./radio.css?inline";

@customElement('obc-radio')
export class ObcRadio extends LitElement {
  @property({ type: String }) name: string | undefined;
  @property({ type: String }) value: string | undefined;
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean}) required: boolean = false;
  @property({ type: Boolean}) hasLabel: boolean = false;

  override createRenderRoot() {
    return this; // Renders into light DOM
  }

  override render() {
    if (this.hasLabel) {
    return html`
      <label for=${ifDefined(this.value)} class="has-label">
        <input type="radio" .name=${ifDefined(this.name)} .value=${ifDefined(this.value)}
          ?checked=${this.checked} ?disabled=${this.disabled} ?required=${this.required}> 
        <span class="label"><slot></slot></span>
      </label>
      `
    } else {
      return html`
      <input type="radio" .name=${ifDefined(this.name)} .value=${ifDefined(this.value)}
        ?checked=${this.checked} ?disabled=${this.disabled} ?required=${this.required}> 
      
      `
    }
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-radio': ObcRadio
  }
}
