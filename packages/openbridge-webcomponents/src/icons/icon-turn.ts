import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-turn')
export class ObiTurn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.1502 9.81858C15.3805 9.18451 13.1107 8.88808 10.8261 9.03847C8.5267 9.18983 6.56869 9.76946 5.31048 10.536C4.01415 11.3258 3.98682 11.9327 4.00444 12.0671C4.03815 12.3242 4.39525 13.0809 6.01228 13.8381C7.14125 14.3668 8.60154 14.7474 10.2183 14.9109L8.24744 12.6586L9.75259 11.3416L13.8288 16.0001L9.75259 20.6586L8.24744 19.3416L10.3558 16.932C8.42207 16.7708 6.61257 16.3277 5.16407 15.6493C3.30716 14.7797 2.18712 13.5912 2.02141 12.327C1.85622 11.0669 2.65083 9.81447 4.26989 8.82805C5.88056 7.84675 8.17747 7.20849 10.6947 7.04279C13.212 6.87709 15.761 7.19635 17.8248 7.93578C19.8898 8.67568 21.3128 9.78026 21.8079 11.0246C22.0312 11.586 22.076 12.2276 21.8409 12.8884C21.6128 13.5294 21.1493 14.1119 20.492 14.6404C19.515 15.4259 18.1291 16.0547 16.5 16.4652V14.3928C17.6866 14.0443 18.6208 13.5786 19.2388 13.0817C19.7056 12.7064 19.8889 12.4081 19.9566 12.2179C20.0173 12.0474 20.0067 11.9076 19.9495 11.7639C19.7691 11.3104 19.0064 10.4837 17.1502 9.81858Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.1502 9.81858C15.3805 9.18451 13.1107 8.88808 10.8261 9.03847C8.5267 9.18983 6.56869 9.76946 5.31048 10.536C4.01415 11.3258 3.98682 11.9327 4.00444 12.0671C4.03815 12.3242 4.39525 13.0809 6.01228 13.8381C7.14125 14.3668 8.60154 14.7474 10.2183 14.9109L8.24744 12.6586L9.75259 11.3416L13.8288 16.0001L9.75259 20.6586L8.24744 19.3416L10.3558 16.932C8.42207 16.7708 6.61257 16.3277 5.16407 15.6493C3.30716 14.7797 2.18712 13.5912 2.02141 12.327C1.85622 11.0669 2.65083 9.81447 4.26989 8.82805C5.88056 7.84675 8.17747 7.20849 10.6947 7.04279C13.212 6.87709 15.761 7.19635 17.8248 7.93578C19.8898 8.67568 21.3128 9.78026 21.8079 11.0246C22.0312 11.586 22.076 12.2276 21.8409 12.8884C21.6128 13.5294 21.1493 14.1119 20.492 14.6404C19.515 15.4259 18.1291 16.0547 16.5 16.4652V14.3928C17.6866 14.0443 18.6208 13.5786 19.2388 13.0817C19.7056 12.7064 19.8889 12.4081 19.9566 12.2179C20.0173 12.0474 20.0067 11.9076 19.9495 11.7639C19.7691 11.3104 19.0064 10.4837 17.1502 9.81858Z" style="fill: var(--element-active-color)"/>
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
    'obi-turn': ObiTurn;
  }
}