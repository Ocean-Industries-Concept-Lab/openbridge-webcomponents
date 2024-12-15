import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-general')
export class ObiAlarmGeneral extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34315 4.34292C5.60028 5.08579 5.011 5.96771 4.60896 6.93831C4.20693 7.90892 4 8.9492 4 9.99978L2 9.99978C2 8.68656 2.25866 7.3862 2.7612 6.17295C3.26375 4.95969 4.00035 3.8573 4.92893 2.92871L6.34315 4.34292Z" fill="currentColor"/>
<path d="M19.391 6.93831C19.7931 7.90892 20 8.9492 20 9.99978L22 9.99978C22 8.68656 21.7413 7.3862 21.2388 6.17294C20.7362 4.95969 19.9997 3.8573 19.0711 2.92871L17.6569 4.34292C18.3997 5.08579 18.989 5.96771 19.391 6.93831Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="currentColor"/>
<path d="M21 17C22.1046 17 23 16.1046 23 15C23 13.8954 22.1046 13 21 13C19.8954 13 19 13.8954 19 15C19 15.1791 19.0236 15.3528 19.0677 15.518L16.5858 18H16V17.5C16 17.2239 15.7761 17 15.5 17H8.5C8.22386 17 8 17.2239 8 17.5V20.5C8 20.7761 8.22386 21 8.5 21H15.5C15.7761 21 16 20.7761 16 20.5V20H17.4142L20.4819 16.9322C20.6472 16.9764 20.8208 17 21 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34315 4.34292C5.60028 5.08579 5.011 5.96771 4.60896 6.93831C4.20693 7.90892 4 8.9492 4 9.99978L2 9.99978C2 8.68656 2.25866 7.3862 2.7612 6.17295C3.26375 4.95969 4.00035 3.8573 4.92893 2.92871L6.34315 4.34292Z" fill="currentColor"/>
<path d="M19.391 6.93831C19.7931 7.90892 20 8.9492 20 9.99978L22 9.99978C22 8.68656 21.7413 7.3862 21.2388 6.17294C20.7362 4.95969 19.9997 3.8573 19.0711 2.92871L17.6569 4.34292C18.3997 5.08579 18.989 5.96771 19.391 6.93831Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="currentColor"/>
<path d="M21 17C22.1046 17 23 16.1046 23 15C23 13.8954 22.1046 13 21 13C19.8954 13 19 13.8954 19 15C19 15.1791 19.0236 15.3528 19.0677 15.518L16.5858 18H16V17.5C16 17.2239 15.7761 17 15.5 17H8.5C8.22386 17 8 17.2239 8 17.5V20.5C8 20.7761 8.22386 21 8.5 21H15.5C15.7761 21 16 20.7761 16 20.5V20H17.4142L20.4819 16.9322C20.6472 16.9764 20.8208 17 21 17Z" fill="currentColor"/>
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
    'obi-alarm-general': ObiAlarmGeneral;
  }
}
