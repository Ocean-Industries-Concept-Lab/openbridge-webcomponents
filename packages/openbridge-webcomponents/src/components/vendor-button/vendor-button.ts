import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./vendor-button.css?inline";

@customElement('obc-vendor-button')
export class ObcVendorButton extends LitElement {
  @property({ type: String, attribute: "image-src" }) imageSrc = '';
  @property({ type: String}) alt = 'logo';

  override render() {
    return html`
      <button class="wrapper">
        <img src=${this.imageSrc} alt=${this.alt} />
      </button>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-vendor-button': ObcVendorButton
  }
}
