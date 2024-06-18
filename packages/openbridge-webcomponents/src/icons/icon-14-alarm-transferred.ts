import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-transferred')
export class Obi14AlarmTransferred extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.875 10.7276L13.0926 9.5L18.3 14.75L13.0926 19.9999L11.875 18.7723L14.9966 15.6195H6V13.8804H14.9966L11.875 10.7276Z" fill="currentColor"/>
<path d="M13.0926 9.5L11.875 10.7276L14.9966 13.8804H6V15.6195H14.9966L11.875 18.7723L13.0926 19.9999L18.3 14.75L13.0926 9.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" style="fill: var(--alarm-enabled-background-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.875 10.7276L13.0926 9.5L18.3 14.75L13.0926 19.9999L11.875 18.7723L14.9966 15.6195H6V13.8804H14.9966L11.875 10.7276Z" style="fill: var(--alarm-enabled-background-color)"/>
<path d="M13.0926 9.5L11.875 10.7276L14.9966 13.8804H6V15.6195H14.9966L11.875 18.7723L13.0926 19.9999L18.3 14.75L13.0926 9.5Z" style="fill: var(--on-alarm-active-color)"/>
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
    'obi-14-alarm-transferred': Obi14AlarmTransferred;
  }
}
