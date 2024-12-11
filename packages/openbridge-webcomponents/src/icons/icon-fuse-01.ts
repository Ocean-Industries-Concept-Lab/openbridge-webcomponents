import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-fuse-01')
export class ObiFuse01 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2207)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H0L0 13H4L4 17C4 17.5523 4.44772 18 5 18L19 18C19.5523 18 20 17.5523 20 17V13H24V11H20V7C20 6.44772 19.5523 6 19 6L5 6C4.44772 6 4 6.44772 4 7L4 11ZM5 7L19 7V11L5 11L5 7ZM19 13V17L5 17L5 13L19 13Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_2207">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2207)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H0L0 13H4L4 17C4 17.5523 4.44772 18 5 18L19 18C19.5523 18 20 17.5523 20 17V13H24V11H20V7C20 6.44772 19.5523 6 19 6L5 6C4.44772 6 4 6.44772 4 7L4 11ZM5 7L19 7V11L5 11L5 7ZM19 13V17L5 17L5 13L19 13Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_3597_2207">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    'obi-fuse-01': ObiFuse01;
  }
}