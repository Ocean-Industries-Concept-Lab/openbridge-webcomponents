import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-com-mic-muted-google')
export class ObiComMicMutedGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.22183 2.80762L2.80762 4.22183L9 10.4142V11.5C9 13.1569 10.3431 14.5 12 14.5C12.3271 14.5 12.642 14.4477 12.9367 14.3509L14.1169 15.5311C13.474 15.8319 12.7566 16 12 16C9.23857 16 7 13.7614 7 11H5C5 14.5265 7.6077 17.4439 11 17.9291V22H13V17.9291C13.9374 17.795 14.8149 17.4752 15.594 17.0082L19.7782 21.1924L21.1924 19.7782L4.22183 2.80762Z" fill="currentColor"/>
<path d="M13 8.75735V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V6.75735L9.00897 4.76632C9.1282 3.21868 10.4218 2 12 2C13.6569 2 15 3.34315 15 5V10.7574L13 8.75735Z" fill="currentColor"/>
<path d="M16.7643 12.5216L18.2992 14.0565C18.7482 13.133 19 12.0959 19 11H17C17 11.5306 16.9174 12.0418 16.7643 12.5216Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.22183 2.80762L2.80762 4.22183L9 10.4142V11.5C9 13.1569 10.3431 14.5 12 14.5C12.3271 14.5 12.642 14.4477 12.9367 14.3509L14.1169 15.5311C13.474 15.8319 12.7566 16 12 16C9.23857 16 7 13.7614 7 11H5C5 14.5265 7.6077 17.4439 11 17.9291V22H13V17.9291C13.9374 17.795 14.8149 17.4752 15.594 17.0082L19.7782 21.1924L21.1924 19.7782L4.22183 2.80762Z" style="fill: var(--element-active-color)"/>
<path d="M13 8.75735V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V6.75735L9.00897 4.76632C9.1282 3.21868 10.4218 2 12 2C13.6569 2 15 3.34315 15 5V10.7574L13 8.75735Z" style="fill: var(--element-active-color)"/>
<path d="M16.7643 12.5216L18.2992 14.0565C18.7482 13.133 19 12.0959 19 11H17C17 11.5306 16.9174 12.0418 16.7643 12.5216Z" style="fill: var(--element-active-color)"/>
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
    'obi-com-mic-muted-google': ObiComMicMutedGoogle;
  }
}
