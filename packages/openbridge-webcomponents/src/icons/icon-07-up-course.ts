import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-up-course')
export class Obi07UpCourse extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3906 9.82227C11.707 9.82227 11.1777 10.0801 10.8027 10.5957C10.4277 11.1074 10.2402 11.8223 10.2402 12.7402C10.2402 14.6504 10.957 15.6055 12.3906 15.6055C12.9922 15.6055 13.7207 15.4551 14.5762 15.1543V16.6777C13.873 16.9707 13.0879 17.1172 12.2207 17.1172C10.9746 17.1172 10.0215 16.7402 9.36133 15.9863C8.70117 15.2285 8.37109 14.1426 8.37109 12.7285C8.37109 11.8379 8.5332 11.0586 8.85742 10.3906C9.18164 9.71875 9.64648 9.20508 10.252 8.84961C10.8613 8.49023 11.5742 8.31055 12.3906 8.31055C13.2227 8.31055 14.0586 8.51172 14.8984 8.91406L14.3125 10.3906C13.9922 10.2383 13.6699 10.1055 13.3457 9.99219C13.0215 9.87891 12.7031 9.82227 12.3906 9.82227Z" fill="currentColor"/>
<path d="M12 2L14 6H10L12 2Z" fill="currentColor"/>
<path d="M11 19H13V22H11V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3906 9.82227C11.707 9.82227 11.1777 10.0801 10.8027 10.5957C10.4277 11.1074 10.2402 11.8223 10.2402 12.7402C10.2402 14.6504 10.957 15.6055 12.3906 15.6055C12.9922 15.6055 13.7207 15.4551 14.5762 15.1543V16.6777C13.873 16.9707 13.0879 17.1172 12.2207 17.1172C10.9746 17.1172 10.0215 16.7402 9.36133 15.9863C8.70117 15.2285 8.37109 14.1426 8.37109 12.7285C8.37109 11.8379 8.5332 11.0586 8.85742 10.3906C9.18164 9.71875 9.64648 9.20508 10.252 8.84961C10.8613 8.49023 11.5742 8.31055 12.3906 8.31055C13.2227 8.31055 14.0586 8.51172 14.8984 8.91406L14.3125 10.3906C13.9922 10.2383 13.6699 10.1055 13.3457 9.99219C13.0215 9.87891 12.7031 9.82227 12.3906 9.82227Z" style="fill: var(--element-active-color)"/>
<path d="M12 2L14 6H10L12 2Z" style="fill: var(--element-active-color)"/>
<path d="M11 19H13V22H11V19Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-up-course': Obi07UpCourse;
  }
}
