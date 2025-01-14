import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-swell')
export class ObiSwell extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.00001 18.9992C4.33019 18.9992 5.92119 17.6516 7.10391 16.0383C7.94309 14.8936 8.66687 13.4809 9.33801 12.1709C9.58395 11.6909 9.82282 11.2246 10.0577 10.7904C10.9959 9.05622 11.8725 7.815 12.9438 7.28443C13.5744 6.97209 14.4014 6.85316 15.5739 7.26287C15.0308 7.65026 14.6036 8.16181 14.3034 8.76629C13.6644 10.0527 13.658 11.6354 14.0901 13.1057C14.9573 16.057 17.7297 18.9993 22 18.9992L22 16.9992C18.7703 16.9992 16.672 14.7984 16.009 12.5419C15.6759 11.4083 15.7395 10.3709 16.0946 9.65596C16.1621 9.52011 16.2422 9.39104 16.3369 9.27134C17.2934 7.87876 18.7316 7.66487 18.7316 7.66487C18.7316 7.66487 18.0184 6.15599 16.1993 5.36514C14.6475 4.8297 13.2786 4.88673 12.0561 5.4922C10.353 6.33569 9.22157 8.1327 8.29862 9.83878C8.01295 10.3668 7.7443 10.8912 7.48147 11.4043C6.83784 12.6606 6.2291 13.8489 5.49093 14.8558C4.48735 16.2247 3.41982 16.9992 2 16.9992L2.00001 18.9992Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.00001 18.9992C4.33019 18.9992 5.92119 17.6516 7.10391 16.0383C7.94309 14.8936 8.66687 13.4809 9.33801 12.1709C9.58395 11.6909 9.82282 11.2246 10.0577 10.7904C10.9959 9.05622 11.8725 7.815 12.9438 7.28443C13.5744 6.97209 14.4014 6.85316 15.5739 7.26287C15.0308 7.65026 14.6036 8.16181 14.3034 8.76629C13.6644 10.0527 13.658 11.6354 14.0901 13.1057C14.9573 16.057 17.7297 18.9993 22 18.9992L22 16.9992C18.7703 16.9992 16.672 14.7984 16.009 12.5419C15.6759 11.4083 15.7395 10.3709 16.0946 9.65596C16.1621 9.52011 16.2422 9.39104 16.3369 9.27134C17.2934 7.87876 18.7316 7.66487 18.7316 7.66487C18.7316 7.66487 18.0184 6.15599 16.1993 5.36514C14.6475 4.8297 13.2786 4.88673 12.0561 5.4922C10.353 6.33569 9.22157 8.1327 8.29862 9.83878C8.01295 10.3668 7.7443 10.8912 7.48147 11.4043C6.83784 12.6606 6.2291 13.8489 5.49093 14.8558C4.48735 16.2247 3.41982 16.9992 2 16.9992L2.00001 18.9992Z" style="fill: var(--element-active-color)"/>
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
    'obi-swell': ObiSwell;
  }
}