import { LitElement, html, unsafeCSS, svg } from 'lit'
import { customElement } from 'lit/decorators.js'
import compentStyle from "./main-engine.css?inline";

@customElement('obc-main-engine')
export class ObcMainEngine extends LitElement {


  override render() {
    const container = svg`<rect x="-80" y="-176" width="160" height="352" fill="var(--instrument-frame-primary-color)" stroke="var(--instrument-frame-tertiary-color)" rx="8"/>`;
    const frame = svg`<rect x="-80" y="-176" width="160" height="352" fill="none" stroke="var(--instrument-frame-tertiary-color)" rx="8"/>`;
    const frameLeft = svg`<rect x="-56" y="-176" width="48" height="352" fill="var(--instrument-frame-secondary-color)"/>`;
    const frameRight = svg`<rect x="8" y="-176" width="48" height="352" fill="var(--instrument-frame-secondary-color)"/>`;
    const thrustCenter = svg`<rect x="8" y="-2" height="4" width="72" fill="var(--instrument-enhanced-secondary-color)"/>`;

    return html`
      <div class="container">
        <svg viewbox="-100 -200 200 400">
          ${container}
          ${frameLeft}
          ${frameRight}
          ${thrustCenter}
          ${frame}
        </svg>
      </div>
      `
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-main-engine': ObcMainEngine
  }
}
