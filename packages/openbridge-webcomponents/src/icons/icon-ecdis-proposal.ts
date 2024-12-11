import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ecdis-proposal')
export class ObiEcdisProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.36111 18.675L15.6667 21L21.2778 19.2C21.4815 19.1333 21.6528 19.0333 21.7917 18.9C21.9306 18.7667 22 18.6083 22 18.425V4.3C22 3.96667 21.8472 3.72083 21.5417 3.5625C21.2361 3.40417 20.9259 3.39167 20.6111 3.525L15.6667 5.3L8.36111 3L2.75 4.775C2.52778 4.85833 2.34722 4.98333 2.20833 5.15C2.06944 5.31667 2 5.50833 2 5.725V19.675C2 20.0083 2.15278 20.2583 2.45833 20.425C2.76389 20.5917 3.07407 20.6 3.38889 20.45L8.36111 18.675ZM20.3333 17.95L16.3889 19.125V14.3125L14.7222 15V19.125L8.36111 17.2077L3.66667 18.825V6.025L7.61111 4.85V9.5L9.27778 8.77641V4.85L15.6667 6.72553L20.3333 5.15V17.95Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7895 9.88015C15.9703 9.54403 15.026 9.51746 14.1434 9.87617L7.04076 12.7631L7.79383 14.6159L14.8965 11.729C15.7791 11.3703 16.4371 10.6924 16.7895 9.88015ZM15.4614 13.1186C17.1758 12.4217 18.2942 10.8818 18.5323 9.17177C17.1687 8.11278 15.2931 7.78971 13.5786 8.48657L5.08635 11.9383L6.96904 16.5703L15.4614 13.1186Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.36111 18.675L15.6667 21L21.2778 19.2C21.4815 19.1333 21.6528 19.0333 21.7917 18.9C21.9306 18.7667 22 18.6083 22 18.425V4.3C22 3.96667 21.8472 3.72083 21.5417 3.5625C21.2361 3.40417 20.9259 3.39167 20.6111 3.525L15.6667 5.3L8.36111 3L2.75 4.775C2.52778 4.85833 2.34722 4.98333 2.20833 5.15C2.06944 5.31667 2 5.50833 2 5.725V19.675C2 20.0083 2.15278 20.2583 2.45833 20.425C2.76389 20.5917 3.07407 20.6 3.38889 20.45L8.36111 18.675ZM20.3333 17.95L16.3889 19.125V14.3125L14.7222 15V19.125L8.36111 17.2077L3.66667 18.825V6.025L7.61111 4.85V9.5L9.27778 8.77641V4.85L15.6667 6.72553L20.3333 5.15V17.95Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7895 9.88015C15.9703 9.54403 15.026 9.51746 14.1434 9.87617L7.04076 12.7631L7.79383 14.6159L14.8965 11.729C15.7791 11.3703 16.4371 10.6924 16.7895 9.88015ZM15.4614 13.1186C17.1758 12.4217 18.2942 10.8818 18.5323 9.17177C17.1687 8.11278 15.2931 7.78971 13.5786 8.48657L5.08635 11.9383L6.96904 16.5703L15.4614 13.1186Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-ecdis-proposal': ObiEcdisProposal;
  }
}