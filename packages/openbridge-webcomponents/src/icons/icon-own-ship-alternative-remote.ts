import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-alternative-remote')
export class ObiOwnShipAlternativeRemote extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9375 5.34847C12.0359 5.107 12.3841 5.10698 12.4824 5.34847L16.832 16.0409C17.041 16.5555 16.4635 17.0355 15.9824 16.7469L12.21 14.5008L8.4375 16.7469C7.95641 17.0356 7.3781 16.5554 7.58691 16.0409L11.9375 5.34847Z" fill="currentColor"/>
<path d="M4.60938 8.93929C4.20745 9.90978 4 10.9504 4 12.0008C4.00007 13.0512 4.2074 14.0919 4.60938 15.0623L2.76074 15.828C2.25826 14.6149 2.00007 13.3139 2 12.0008C2 10.6877 2.25831 9.3868 2.76074 8.17367L4.60938 8.93929Z" fill="currentColor"/>
<path d="M21.2393 8.17367C21.7417 9.3868 22 10.6877 22 12.0008C21.9999 13.3139 21.7417 14.6149 21.2393 15.828L19.3906 15.0623C19.7926 14.0919 19.9999 13.0512 20 12.0008C20 10.9504 19.7926 9.90978 19.3906 8.93929L21.2393 8.17367Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9375 5.34847C12.0359 5.107 12.3841 5.10698 12.4824 5.34847L16.832 16.0409C17.041 16.5555 16.4635 17.0355 15.9824 16.7469L12.21 14.5008L8.4375 16.7469C7.95641 17.0356 7.3781 16.5554 7.58691 16.0409L11.9375 5.34847Z" style="fill: var(--element-active-color)"/>
<path d="M4.60938 8.93929C4.20745 9.90978 4 10.9504 4 12.0008C4.00007 13.0512 4.2074 14.0919 4.60938 15.0623L2.76074 15.828C2.25826 14.6149 2.00007 13.3139 2 12.0008C2 10.6877 2.25831 9.3868 2.76074 8.17367L4.60938 8.93929Z" style="fill: var(--element-active-color)"/>
<path d="M21.2393 8.17367C21.7417 9.3868 22 10.6877 22 12.0008C21.9999 13.3139 21.7417 14.6149 21.2393 15.828L19.3906 15.0623C19.7926 14.0919 19.9999 13.0512 20 12.0008C20 10.9504 19.7926 9.90978 19.3906 8.93929L21.2393 8.17367Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-alternative-remote': ObiOwnShipAlternativeRemote;
  }
}
