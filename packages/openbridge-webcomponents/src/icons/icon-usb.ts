import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-usb')
export class ObiUsb extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C11.45 21 10.9792 20.8042 10.5875 20.4125C10.1958 20.0208 10 19.55 10 19C10 18.65 10.0917 18.325 10.275 18.025C10.4583 17.725 10.7 17.4833 11 17.3V15H8C7.45 15 6.97917 14.8042 6.5875 14.4125C6.19583 14.0208 6 13.55 6 13V10.7C5.7 10.55 5.45833 10.325 5.275 10.025C5.09167 9.725 5 9.38333 5 9C5 8.45 5.19583 7.97917 5.5875 7.5875C5.97917 7.19583 6.45 7 7 7C7.55 7 8.02083 7.19583 8.4125 7.5875C8.80417 7.97917 9 8.45 9 9C9 9.38333 8.90833 9.71667 8.725 10C8.54167 10.2833 8.3 10.5167 8 10.7V13H11V5H9L12 1L15 5H13V13H16V11H15V7H19V11H18V13C18 13.55 17.8042 14.0208 17.4125 14.4125C17.0208 14.8042 16.55 15 16 15H13V17.3C13.3167 17.4667 13.5625 17.7 13.7375 18C13.9125 18.3 14 18.6333 14 19C14 19.55 13.8042 20.0208 13.4125 20.4125C13.0208 20.8042 12.55 21 12 21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C11.45 21 10.9792 20.8042 10.5875 20.4125C10.1958 20.0208 10 19.55 10 19C10 18.65 10.0917 18.325 10.275 18.025C10.4583 17.725 10.7 17.4833 11 17.3V15H8C7.45 15 6.97917 14.8042 6.5875 14.4125C6.19583 14.0208 6 13.55 6 13V10.7C5.7 10.55 5.45833 10.325 5.275 10.025C5.09167 9.725 5 9.38333 5 9C5 8.45 5.19583 7.97917 5.5875 7.5875C5.97917 7.19583 6.45 7 7 7C7.55 7 8.02083 7.19583 8.4125 7.5875C8.80417 7.97917 9 8.45 9 9C9 9.38333 8.90833 9.71667 8.725 10C8.54167 10.2833 8.3 10.5167 8 10.7V13H11V5H9L12 1L15 5H13V13H16V11H15V7H19V11H18V13C18 13.55 17.8042 14.0208 17.4125 14.4125C17.0208 14.8042 16.55 15 16 15H13V17.3C13.3167 17.4667 13.5625 17.7 13.7375 18C13.9125 18.3 14 18.6333 14 19C14 19.55 13.8042 20.0208 13.4125 20.4125C13.0208 20.8042 12.55 21 12 21Z" style="fill: var(--element-active-color)"/>
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
    'obi-usb': ObiUsb;
  }
}