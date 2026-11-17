import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-digital-closed')
export class ObiTwowayDigitalClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 7.04483C2 6.21268 2.9574 5.74488 3.61426 6.25577L9.98535 11.2108C10.4997 11.6112 10.4997 12.3886 9.98535 12.789L3.61426 17.745C2.9574 18.2559 2 17.7871 2 16.955V7.04483Z" fill="currentColor"/>
<path d="M20.3857 6.25577C21.0426 5.74488 22 6.21268 22 7.04483V16.955C22 17.7871 21.0426 18.2559 20.3857 17.745L14.0146 12.789C13.5003 12.3886 13.5002 11.6112 14.0146 11.2108L20.3857 6.25577Z" fill="currentColor"/>
<path d="M2 7.04483C2 6.21268 2.9574 5.74488 3.61426 6.25577L9.98535 11.2108C10.4997 11.6112 10.4997 12.3886 9.98535 12.789L3.61426 17.745C2.9574 18.2559 2 17.7871 2 16.955V7.04483ZM20.3857 6.25577C21.0426 5.74488 22 6.21268 22 7.04483V16.955C22 17.7871 21.0426 18.2559 20.3857 17.745L14.0146 12.789C13.5003 12.3886 13.5002 11.6112 14.0146 11.2108L20.3857 6.25577Z" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 7.04483C2 6.21268 2.9574 5.74488 3.61426 6.25577L9.98535 11.2108C10.4997 11.6112 10.4997 12.3886 9.98535 12.789L3.61426 17.745C2.9574 18.2559 2 17.7871 2 16.955V7.04483Z" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M20.3857 6.25577C21.0426 5.74488 22 6.21268 22 7.04483V16.955C22 17.7871 21.0426 18.2559 20.3857 17.745L14.0146 12.789C13.5003 12.3886 13.5002 11.6112 14.0146 11.2108L20.3857 6.25577Z" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M2 7.04483C2 6.21268 2.9574 5.74488 3.61426 6.25577L9.98535 11.2108C10.4997 11.6112 10.4997 12.3886 9.98535 12.789L3.61426 17.745C2.9574 18.2559 2 17.7871 2 16.955V7.04483ZM20.3857 6.25577C21.0426 5.74488 22 6.21268 22 7.04483V16.955C22 17.7871 21.0426 18.2559 20.3857 17.745L14.0146 12.789C13.5003 12.3886 13.5002 11.6112 14.0146 11.2108L20.3857 6.25577Z" style="stroke: var(--automation-symbol-off-border-color)"/>
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
    'obi-twoway-digital-closed': ObiTwowayDigitalClosed;
  }
}
