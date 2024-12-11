import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sensor-gps-full')
export class ObiSensorGpsFull extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.86838 4.57513C3.47785 4.18461 3.47785 3.55144 3.86838 3.16092L5.9897 1.0396C6.38022 0.649073 7.01339 0.649073 7.40391 1.0396L11.6466 5.28224C12.0371 5.67276 12.0371 6.30593 11.6466 6.69645L11.293 7.05L12.0001 7.75711L14.8285 4.92868C15.2191 4.53816 15.8522 4.53816 16.2427 4.92868L19.0712 7.75711C19.4617 8.14764 19.4617 8.7808 19.0712 9.17132L16.2427 11.9998L16.9499 12.7069L17.3034 12.3533C17.6939 11.9628 18.3271 11.9628 18.7176 12.3533L22.9603 16.5959C23.3508 16.9865 23.3508 17.6196 22.9603 18.0102L20.8389 20.1315C20.4484 20.522 19.8153 20.522 19.4247 20.1315L15.1821 15.8888C14.7916 15.4983 14.7916 14.8651 15.1821 14.4746L15.5356 14.1211L14.8285 13.414L13.4143 14.8282C13.0238 15.2187 12.3906 15.2187 12.0001 14.8282L9.17168 11.9998C8.78115 11.6092 8.78115 10.9761 9.17168 10.5855L10.5859 9.17132L9.87879 8.46422L9.52523 8.81777C9.13471 9.2083 8.50154 9.2083 8.11102 8.81777L3.86838 4.57513Z" fill="currentColor"/>
<path d="M8.46404 15.5355C8.92834 15.9998 9.47953 16.3681 10.0862 16.6193C10.6928 16.8706 11.343 16.9999 11.9996 16.9999V18.9999C11.0803 18.9999 10.1701 18.8189 9.32079 18.4671C8.47151 18.1153 7.69984 17.5997 7.04983 16.9497C6.39982 16.2997 5.8842 15.528 5.53242 14.6787C5.18064 13.8294 4.99958 12.9192 4.99958 11.9999L6.99958 11.9999C6.99958 12.6565 7.12891 13.3067 7.38018 13.9134C7.63145 14.52 7.99975 15.0712 8.46404 15.5355Z" fill="currentColor"/>
<path d="M5.63592 18.3641C6.47165 19.1998 7.4638 19.8627 8.55573 20.315C9.64766 20.7673 10.818 21.0001 11.9999 21.0001L11.9999 23.0001C10.5553 23.0001 9.12494 22.7156 7.79036 22.1628C6.45578 21.61 5.24315 20.7997 4.2217 19.7783C3.20026 18.7569 2.39001 17.5442 1.8372 16.2096C1.2844 14.8751 0.999878 13.4447 0.999878 12.0001L2.99988 12.0001C2.99988 13.182 3.23267 14.3523 3.68496 15.4443C4.13725 16.5362 4.80019 17.5284 5.63592 18.3641Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.86838 4.57513C3.47785 4.18461 3.47785 3.55144 3.86838 3.16092L5.9897 1.0396C6.38022 0.649073 7.01339 0.649073 7.40391 1.0396L11.6466 5.28224C12.0371 5.67276 12.0371 6.30593 11.6466 6.69645L11.293 7.05L12.0001 7.75711L14.8285 4.92868C15.2191 4.53816 15.8522 4.53816 16.2427 4.92868L19.0712 7.75711C19.4617 8.14764 19.4617 8.7808 19.0712 9.17132L16.2427 11.9998L16.9499 12.7069L17.3034 12.3533C17.6939 11.9628 18.3271 11.9628 18.7176 12.3533L22.9603 16.5959C23.3508 16.9865 23.3508 17.6196 22.9603 18.0102L20.8389 20.1315C20.4484 20.522 19.8153 20.522 19.4247 20.1315L15.1821 15.8888C14.7916 15.4983 14.7916 14.8651 15.1821 14.4746L15.5356 14.1211L14.8285 13.414L13.4143 14.8282C13.0238 15.2187 12.3906 15.2187 12.0001 14.8282L9.17168 11.9998C8.78115 11.6092 8.78115 10.9761 9.17168 10.5855L10.5859 9.17132L9.87879 8.46422L9.52523 8.81777C9.13471 9.2083 8.50154 9.2083 8.11102 8.81777L3.86838 4.57513Z" style="fill: var(--element-active-color)"/>
<path d="M8.46404 15.5355C8.92834 15.9998 9.47953 16.3681 10.0862 16.6193C10.6928 16.8706 11.343 16.9999 11.9996 16.9999V18.9999C11.0803 18.9999 10.1701 18.8189 9.32079 18.4671C8.47151 18.1153 7.69984 17.5997 7.04983 16.9497C6.39982 16.2997 5.8842 15.528 5.53242 14.6787C5.18064 13.8294 4.99958 12.9192 4.99958 11.9999L6.99958 11.9999C6.99958 12.6565 7.12891 13.3067 7.38018 13.9134C7.63145 14.52 7.99975 15.0712 8.46404 15.5355Z" style="fill: var(--element-active-color)"/>
<path d="M5.63592 18.3641C6.47165 19.1998 7.4638 19.8627 8.55573 20.315C9.64766 20.7673 10.818 21.0001 11.9999 21.0001L11.9999 23.0001C10.5553 23.0001 9.12494 22.7156 7.79036 22.1628C6.45578 21.61 5.24315 20.7997 4.2217 19.7783C3.20026 18.7569 2.39001 17.5442 1.8372 16.2096C1.2844 14.8751 0.999878 13.4447 0.999878 12.0001L2.99988 12.0001C2.99988 13.182 3.23267 14.3523 3.68496 15.4443C4.13725 16.5362 4.80019 17.5284 5.63592 18.3641Z" style="fill: var(--element-active-color)"/>
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
    'obi-sensor-gps-full': ObiSensorGpsFull;
  }
}
