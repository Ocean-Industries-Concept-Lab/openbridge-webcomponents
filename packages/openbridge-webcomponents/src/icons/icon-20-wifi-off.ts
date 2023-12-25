import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-wifi-off')
export class Obi20WifiOff extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23.6404 7.59479C23.1903 7.25479 18.7104 3.59479 12.0004 3.59479C10.6804 3.59479 9.45035 3.73479 8.31035 3.97479L18.4304 14.0948L23.6404 7.59479ZM3.41035 1.90479L2.00035 3.31479L4.05035 5.36479C1.91035 6.35478 0.590352 7.41479 0.360352 7.59479L12.0004 22.0948L15.9104 17.2248L19.2304 20.5448L20.6404 19.1348L3.41035 1.90479Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.6404 7.59479C23.1903 7.25479 18.7104 3.59479 12.0004 3.59479C10.6804 3.59479 9.45035 3.73479 8.31035 3.97479L18.4304 14.0948L23.6404 7.59479ZM3.41035 1.90479L2.00035 3.31479L4.05035 5.36479C1.91035 6.35478 0.590352 7.41479 0.360352 7.59479L12.0004 22.0948L15.9104 17.2248L19.2304 20.5448L20.6404 19.1348L3.41035 1.90479Z" fill="currentColor"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-20-wifi-off': Obi20WifiOff;
  }
}
