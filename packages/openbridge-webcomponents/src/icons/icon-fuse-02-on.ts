import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-fuse-02-on')
export class ObiFuse02On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.99997 15.4636L3.9978 15.4648L3.99997 15.4686V21C3.99997 21.5523 4.44768 22 4.99997 22H19C19.5523 22 20 21.5523 20 21V8.53539L20.0018 8.53434L20 8.53119V3C20 2.44772 19.5523 2 19 2H4.99997C4.44768 2 3.99997 2.44772 3.99997 3V15.4636ZM4.99997 3H19V6.80334L4.99997 14.8862V3ZM19 9.11274V21H4.99997V17.1956L19 9.11274Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 3H19V6.80334L5 14.8862V3ZM19 9.11274V21H5V17.1956L19 9.11274Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.99997 15.4636L3.9978 15.4648L3.99997 15.4686V21C3.99997 21.5523 4.44768 22 4.99997 22H19C19.5523 22 20 21.5523 20 21V8.53539L20.0018 8.53434L20 8.53119V3C20 2.44772 19.5523 2 19 2H4.99997C4.44768 2 3.99997 2.44772 3.99997 3V15.4636ZM4.99997 3H19V6.80334L4.99997 14.8862V3ZM19 9.11274V21H4.99997V17.1956L19 9.11274Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 3H19V6.80334L5 14.8862V3ZM19 9.11274V21H5V17.1956L19 9.11274Z" style="fill: var(--automation-device-primary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-fuse-02-on': ObiFuse02On;
  }
}
