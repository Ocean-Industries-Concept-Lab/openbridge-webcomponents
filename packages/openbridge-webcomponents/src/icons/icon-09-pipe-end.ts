import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-pipe-end')
export class Obi09PipeEnd extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20141_405720)">
<path d="M13 24L13 13L16 13V11L8 11L8 13L11 13L11 24H13Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_20141_405720">
<rect width="24" height="24" fill="currentColor" transform="translate(24 24) rotate(-180)"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20141_405720)">
<path d="M13 24L13 13L16 13V11L8 11L8 13L11 13L11 24H13Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_20141_405720">
<rect width="24" height="24" fill="none" transform="translate(24 24) rotate(-180)"/>
</clipPath>
</defs>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-pipe-end': Obi09PipeEnd;
  }
}
