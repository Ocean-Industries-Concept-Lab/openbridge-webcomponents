import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-warning-unacknowledged-iec')
export class ObiWarningUnacknowledgedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/>
<path d="M12 6.59082V17.5L8.5 14H6V10H8.5L12 6.59082Z" fill="currentColor"/>
<path d="M13.5 17.4094C16.0601 16.9392 18 14.6962 18 12.0001C18 9.30406 16.0601 7.06108 13.5 6.59082V8.12615C15.2252 8.57019 16.5 10.1363 16.5 12.0001C16.5 13.864 15.2252 15.4301 13.5 15.8741V17.4094Z" fill="currentColor"/>
<path d="M13.5 14.2921C14.383 13.9063 15 13.0253 15 12.0001C15 10.975 14.383 10.0939 13.5 9.70815V14.2921Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" style="fill: var(--alert-warning-color)"/>
<path d="M12 6.59082V17.5L8.5 14H6V10H8.5L12 6.59082Z" style="fill: var(--on-warning-active-color)"/>
<path d="M13.5 17.4094C16.0601 16.9392 18 14.6962 18 12.0001C18 9.30406 16.0601 7.06108 13.5 6.59082V8.12615C15.2252 8.57019 16.5 10.1363 16.5 12.0001C16.5 13.864 15.2252 15.4301 13.5 15.8741V17.4094Z" style="fill: var(--on-warning-active-color)"/>
<path d="M13.5 14.2921C14.383 13.9063 15 13.0253 15 12.0001C15 10.975 14.383 10.0939 13.5 9.70815V14.2921Z" style="fill: var(--on-warning-active-color)"/>
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
    'obi-warning-unacknowledged-iec': ObiWarningUnacknowledgedIec;
  }
}