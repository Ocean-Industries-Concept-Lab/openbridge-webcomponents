import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-target-cancel')
export class Obi07TargetCancel extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4.22222V8.66667H4.22222V4.22222H8.66667V2H4.22222C3 2 2 3 2 4.22222Z" fill="currentColor"/>
<path d="M4.22222 15.3334H2V19.7779C2 21.0001 3 22.0001 4.22222 22.0001H8.66667V19.7779H4.22222V15.3334Z" fill="currentColor"/>
<path d="M15.3333 19.7779H19.7778V15.3334H22V19.7779C22 21.0001 21 22.0001 19.7778 22.0001H15.3333V19.7779Z" fill="currentColor"/>
<path d="M19.7778 2H15.3333V4.22222H19.7778V8.66667H22V4.22222C22 3 21 2 19.7778 2Z" fill="currentColor"/>
<path d="M16.7914 6L18 7.20857L13.2086 12L18 16.7914L16.7914 18L12 13.2086L7.20857 18L6 16.7914L10.7914 12L6 7.20857L7.20857 6L12 10.7914L16.7914 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4.22222V8.66667H4.22222V4.22222H8.66667V2H4.22222C3 2 2 3 2 4.22222Z" style="fill: var(--element-active-color)"/>
<path d="M4.22222 15.3334H2V19.7779C2 21.0001 3 22.0001 4.22222 22.0001H8.66667V19.7779H4.22222V15.3334Z" style="fill: var(--element-active-color)"/>
<path d="M15.3333 19.7779H19.7778V15.3334H22V19.7779C22 21.0001 21 22.0001 19.7778 22.0001H15.3333V19.7779Z" style="fill: var(--element-active-color)"/>
<path d="M19.7778 2H15.3333V4.22222H19.7778V8.66667H22V4.22222C22 3 21 2 19.7778 2Z" style="fill: var(--element-active-color)"/>
<path d="M16.7914 6L18 7.20857L13.2086 12L18 16.7914L16.7914 18L12 13.2086L7.20857 18L6 16.7914L10.7914 12L6 7.20857L7.20857 6L12 10.7914L16.7914 6Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-target-cancel': Obi07TargetCancel;
  }
}
