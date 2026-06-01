import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-apparent-2')
export class ObiWindApparent2 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 0C12.5519 0 12.9997 0.447715 12.9997 1V15H14.9977C15.7413 15 16.2259 15.7823 15.8932 16.4482L12.8952 22.4453C12.5262 23.1829 11.473 23.183 11.1042 22.4453L8.1061 16.4482C7.77377 15.7828 8.25796 15.0003 9.00161 15H10.9997V1C10.9997 0.447845 11.4476 0.000210999 11.9997 0ZM11.9997 19.7637L13.3815 17H10.6178L11.9997 19.7637Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 0C12.5519 0 12.9997 0.447715 12.9997 1V15H14.9977C15.7413 15 16.2259 15.7823 15.8932 16.4482L12.8952 22.4453C12.5262 23.1829 11.473 23.183 11.1042 22.4453L8.1061 16.4482C7.77377 15.7828 8.25796 15.0003 9.00161 15H10.9997V1C10.9997 0.447845 11.4476 0.000210999 11.9997 0ZM11.9997 19.7637L13.3815 17H10.6178L11.9997 19.7637Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-apparent-2': ObiWindApparent2;
  }
}
