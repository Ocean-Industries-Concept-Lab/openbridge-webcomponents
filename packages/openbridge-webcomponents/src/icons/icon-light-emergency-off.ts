import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-emergency-off')
export class ObiLightEmergencyOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1935 21.1924L2.80874 2.80762L1.39453 4.22183L5.78816 8.61546C5.293 9.28132 5 10.1064 5 11C5 12.8638 6.27477 14.4299 8 14.874V17H5C4.44772 17 4 17.4477 4 18V20H17.1727L19.7793 22.6066L21.1935 21.1924ZM11.3845 14.2118L14 16.8273V17H10V14.874C10.5075 14.7434 10.976 14.5157 11.3845 14.2118ZM9.93901 12.7663L7.23369 10.061C7.08453 10.341 7 10.6606 7 11C7 12.1046 7.89543 13 9 13C9.33938 13 9.65902 12.9155 9.93901 12.7663Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.1821 14.353C18.2765 13.6392 19 12.4041 19 11C19 8.79086 17.2091 7 15 7C13.5959 7 12.3608 7.72345 11.647 8.81794L13.1268 10.2977C13.4112 9.53957 14.1426 9 15 9C16.1046 9 17 9.89543 17 11C17 11.8574 16.4604 12.5888 15.7023 12.8732L17.1821 14.353Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1935 21.1924L2.80874 2.80762L1.39453 4.22183L5.78816 8.61546C5.293 9.28132 5 10.1064 5 11C5 12.8638 6.27477 14.4299 8 14.874V17H5C4.44772 17 4 17.4477 4 18V20H17.1727L19.7793 22.6066L21.1935 21.1924ZM11.3845 14.2118L14 16.8273V17H10V14.874C10.5075 14.7434 10.976 14.5157 11.3845 14.2118ZM9.93901 12.7663L7.23369 10.061C7.08453 10.341 7 10.6606 7 11C7 12.1046 7.89543 13 9 13C9.33938 13 9.65902 12.9155 9.93901 12.7663Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.1821 14.353C18.2765 13.6392 19 12.4041 19 11C19 8.79086 17.2091 7 15 7C13.5959 7 12.3608 7.72345 11.647 8.81794L13.1268 10.2977C13.4112 9.53957 14.1426 9 15 9C16.1046 9 17 9.89543 17 11C17 11.8574 16.4604 12.5888 15.7023 12.8732L17.1821 14.353Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-emergency-off': ObiLightEmergencyOff;
  }
}
