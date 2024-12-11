import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-propulsion-tunnel-thruster')
export class ObiPropulsionTunnelThruster extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9C2.44771 9 2 9.44772 2 10L2 14C2 14.5523 2.44772 15 3 15L11 15L11 16.5C11 16.7761 11.2239 17 11.5 17L12.5 17C12.7761 17 13 16.7761 13 16.5L13 15L21 15C21.5523 15 22 14.5523 22 14L22 10C22 9.44771 21.5523 9 21 9L13 9L13 7.5C13 7.22386 12.7761 7 12.5 7L11.5 7C11.2239 7 11 7.22386 11 7.5L11 9L3 9ZM4 13L4 11L7 11L7 13L4 13ZM13 11L13 13L20 13L20 11L13 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9C2.44771 9 2 9.44772 2 10L2 14C2 14.5523 2.44772 15 3 15L11 15L11 16.5C11 16.7761 11.2239 17 11.5 17L12.5 17C12.7761 17 13 16.7761 13 16.5L13 15L21 15C21.5523 15 22 14.5523 22 14L22 10C22 9.44771 21.5523 9 21 9L13 9L13 7.5C13 7.22386 12.7761 7 12.5 7L11.5 7C11.2239 7 11 7.22386 11 7.5L11 9L3 9ZM4 13L4 11L7 11L7 13L4 13ZM13 11L13 13L20 13L20 11L13 11Z" fill="currentColor"/>
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
    'obi-propulsion-tunnel-thruster': ObiPropulsionTunnelThruster;
  }
}
