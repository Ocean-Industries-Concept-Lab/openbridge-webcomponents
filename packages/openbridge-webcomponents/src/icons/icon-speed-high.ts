import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-speed-high')
export class ObiSpeedHigh extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6C7.58172 6 4 9.58172 4 14C4 15.4597 4.38939 16.8247 5.0704 18.001H18.9296C19.2607 17.4291 19.5229 16.8125 19.7049 16.1621C20.4224 15.9999 21.139 15.8378 21.8604 15.6747L21.8596 15.6793C21.5887 17.2816 20.9366 18.7543 20 20.001H4C2.74418 18.3295 2 16.2516 2 14C2 8.47715 6.47715 4 12 4C16.9506 4 21.0609 7.59738 21.8596 12.3207L21.8604 12.3253C21.1388 12.1621 20.4221 12 19.7044 11.8377C18.7611 8.46991 15.669 6 12 6Z" fill="currentColor"/>
<path d="M10 14C10 15.1046 10.8954 16 12 16C12.8651 16 18.5088 14.7733 20.9155 14.2413C21.176 14.1837 21.176 13.8163 20.9155 13.7587C18.5088 13.2267 12.8651 12 12 12C10.8954 12 10 12.8954 10 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6C7.58172 6 4 9.58172 4 14C4 15.4597 4.38939 16.8247 5.0704 18.001H18.9296C19.2607 17.4291 19.5229 16.8125 19.7049 16.1621C20.4224 15.9999 21.139 15.8378 21.8604 15.6747L21.8596 15.6793C21.5887 17.2816 20.9366 18.7543 20 20.001H4C2.74418 18.3295 2 16.2516 2 14C2 8.47715 6.47715 4 12 4C16.9506 4 21.0609 7.59738 21.8596 12.3207L21.8604 12.3253C21.1388 12.1621 20.4221 12 19.7044 11.8377C18.7611 8.46991 15.669 6 12 6Z" style="fill: var(--element-active-color)"/>
<path d="M10 14C10 15.1046 10.8954 16 12 16C12.8651 16 18.5088 14.7733 20.9155 14.2413C21.176 14.1837 21.176 13.8163 20.9155 13.7587C18.5088 13.2267 12.8651 12 12 12C10.8954 12 10 12.8954 10 14Z" style="fill: var(--element-active-color)"/>
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
    'obi-speed-high': ObiSpeedHigh;
  }
}