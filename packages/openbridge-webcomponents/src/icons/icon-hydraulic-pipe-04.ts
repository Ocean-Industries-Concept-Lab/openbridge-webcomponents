import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-pipe-04')
export class ObiHydraulicPipe04 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8681_1533)">
<path d="M11.206 4.00021C11.6061 3.46617 12.4078 3.46599 12.8076 4.00021L19.8037 13.4006C20.2969 14.06 19.8264 15.0002 19.0029 15.0002H15V48.0002H8.99995V22.0002H9.01167L8.99995 15.0002H4.99898C4.17517 15.0002 3.7052 14.0599 4.19917 13.4006L11.206 4.00021Z" fill="currentColor"/>
<path d="M44 39.0002H39V48.0002H33V39.0002H28V33.0002H44V39.0002Z" fill="currentColor"/>
<path d="M11.206 3.95831C11.6062 3.42421 12.4078 3.42488 12.8076 3.95929L19.8037 13.4007C20.2969 14.0601 19.8264 15.0003 19.0029 15.0003H15V48.0003H14V14.0003H19.0029L12.0068 4.55792L4.99898 14.0003H9.99898L10.0126 24.0003H9.99995V48.0003H8.99995V22.0003H9.00972L8.99995 15.0003H4.99898C4.17517 15.0003 3.7052 14.06 4.19917 13.4007L11.206 3.95831Z" fill="currentColor"/>
<path d="M44 39.0003H39V48.0003H38V38.0003H43V34.0003H29V38.0003H34V48.0003H33V39.0003H28V33.0003H44V39.0003Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8681_1533">
<rect width="48" height="48" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8681_1533)">
<path d="M11.206 4.00021C11.6061 3.46617 12.4078 3.46599 12.8076 4.00021L19.8037 13.4006C20.2969 14.06 19.8264 15.0002 19.0029 15.0002H15V48.0002H8.99995V22.0002H9.01167L8.99995 15.0002H4.99898C4.17517 15.0002 3.7052 14.0599 4.19917 13.4006L11.206 4.00021Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M44 39.0002H39V48.0002H33V39.0002H28V33.0002H44V39.0002Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M11.206 3.95831C11.6062 3.42421 12.4078 3.42488 12.8076 3.95929L19.8037 13.4007C20.2969 14.0601 19.8264 15.0003 19.0029 15.0003H15V48.0003H14V14.0003H19.0029L12.0068 4.55792L4.99898 14.0003H9.99898L10.0126 24.0003H9.99995V48.0003H8.99995V22.0003H9.00972L8.99995 15.0003H4.99898C4.17517 15.0003 3.7052 14.06 4.19917 13.4007L11.206 3.95831Z" style="fill: var(--automation-pipe-tertiary-color)"/>
<path d="M44 39.0003H39V48.0003H38V38.0003H43V34.0003H29V38.0003H34V48.0003H33V39.0003H28V33.0003H44V39.0003Z" style="fill: var(--automation-pipe-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_8681_1533">
<rect width="48" height="48" style="fill: var(--automation-pipe-primary-color)"/>
</clipPath>
</defs>
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
    'obi-hydraulic-pipe-04': ObiHydraulicPipe04;
  }
}
