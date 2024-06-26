import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-acknowledged')
export class Obi14AlarmAcknowledged extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2402 14.8352H11C11 13.0132 11 9.99164 11 8.16962H13.2402V14.8352ZM13.2402 19.5008H11V17.168H13.2402V19.5008Z" fill="currentColor"/>
<path d="M11 14.8352H13.2402V8.16962H11C11 9.99164 11 13.0132 11 14.8352Z" fill="currentColor"/>
<path d="M11 19.5008H13.2402V17.168H11V19.5008Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" style="fill: var(--alarm-enabled-background-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2402 14.8352H11C11 13.0132 11 9.99164 11 8.16962H13.2402V14.8352ZM13.2402 19.5008H11V17.168H13.2402V19.5008Z" style="fill: var(--alarm-enabled-background-color)"/>
<path d="M11 14.8352H13.2402V8.16962H11C11 9.99164 11 13.0132 11 14.8352Z" style="fill: var(--on-alarm-active-color)"/>
<path d="M11 19.5008H13.2402V17.168H11V19.5008Z" style="fill: var(--on-alarm-active-color)"/>
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
    'obi-14-alarm-acknowledged': Obi14AlarmAcknowledged;
  }
}
