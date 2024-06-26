import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-general')
export class Obi14AlarmGeneral extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34315 4.34292C5.60028 5.08579 5.011 5.96771 4.60896 6.93831C4.20693 7.90892 4 8.9492 4 9.99978L2 9.99978C2 8.68656 2.25866 7.3862 2.7612 6.17295C3.26375 4.95969 4.00035 3.8573 4.92893 2.92871L6.34315 4.34292Z" fill="currentColor"/>
<path d="M19.391 6.93831C19.7931 7.90892 20 8.9492 20 9.99978L22 9.99978C22 8.68656 21.7413 7.3862 21.2388 6.17294C20.7362 4.95969 19.9997 3.8573 19.0711 2.92871L17.6569 4.34292C18.3997 5.08579 18.989 5.96771 19.391 6.93831Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10ZM14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z" fill="currentColor"/>
<path d="M16 17.9999V17H8V21H16V19.9999H18.118L20.1198 15.9965C21.1686 15.9345 22 15.0644 22 14C22 12.8954 21.1046 12 20 12C18.8954 12 18 12.8954 18 14C18 14.4073 18.1218 14.7862 18.3308 15.1022L16.882 17.9999H16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34315 4.34292C5.60028 5.08579 5.011 5.96771 4.60896 6.93831C4.20693 7.90892 4 8.9492 4 9.99978L2 9.99978C2 8.68656 2.25866 7.3862 2.7612 6.17295C3.26375 4.95969 4.00035 3.8573 4.92893 2.92871L6.34315 4.34292Z" style="fill: var(--element-active-color)"/>
<path d="M19.391 6.93831C19.7931 7.90892 20 8.9492 20 9.99978L22 9.99978C22 8.68656 21.7413 7.3862 21.2388 6.17294C20.7362 4.95969 19.9997 3.8573 19.0711 2.92871L17.6569 4.34292C18.3997 5.08579 18.989 5.96771 19.391 6.93831Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10ZM14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z" style="fill: var(--element-active-color)"/>
<path d="M16 17.9999V17H8V21H16V19.9999H18.118L20.1198 15.9965C21.1686 15.9345 22 15.0644 22 14C22 12.8954 21.1046 12 20 12C18.8954 12 18 12.8954 18 14C18 14.4073 18.1218 14.7862 18.3308 15.1022L16.882 17.9999H16Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alarm-general': Obi14AlarmGeneral;
  }
}
