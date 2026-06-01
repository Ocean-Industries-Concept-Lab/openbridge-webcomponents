import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-true-7')
export class ObiWindTrue7 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0301 0C19.5824 0 20.0301 0.447715 20.0301 1C20.0301 1.55228 19.5824 2 19.0301 2H13.0301V3.5H19.0301C19.5824 3.5 20.0301 3.94772 20.0301 4.5C20.0301 5.05228 19.5824 5.5 19.0301 5.5H13.0301V7H16.0301C16.5824 7 17.0301 7.44772 17.0301 8C17.0301 8.55228 16.5824 9 16.0301 9H13.0301V15H15.0281C15.7716 15 16.2564 15.7823 15.9236 16.4482L12.9256 22.4453L12.9246 22.4443C12.5789 23.1367 11.6327 23.1802 11.2117 22.5752L11.1346 22.4453L8.13652 16.4482C7.80454 15.7833 8.28773 15.0002 9.03203 15H11.0301V1C11.0301 0.447811 11.4779 0.000155104 12.0301 0H19.0301Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0301 0C19.5824 0 20.0301 0.447715 20.0301 1C20.0301 1.55228 19.5824 2 19.0301 2H13.0301V3.5H19.0301C19.5824 3.5 20.0301 3.94772 20.0301 4.5C20.0301 5.05228 19.5824 5.5 19.0301 5.5H13.0301V7H16.0301C16.5824 7 17.0301 7.44772 17.0301 8C17.0301 8.55228 16.5824 9 16.0301 9H13.0301V15H15.0281C15.7716 15 16.2564 15.7823 15.9236 16.4482L12.9256 22.4453L12.9246 22.4443C12.5789 23.1367 11.6327 23.1802 11.2117 22.5752L11.1346 22.4453L8.13652 16.4482C7.80454 15.7833 8.28773 15.0002 9.03203 15H11.0301V1C11.0301 0.447811 11.4779 0.000155104 12.0301 0H19.0301Z" fill="currentColor"/>
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
    'obi-wind-true-7': ObiWindTrue7;
  }
}
