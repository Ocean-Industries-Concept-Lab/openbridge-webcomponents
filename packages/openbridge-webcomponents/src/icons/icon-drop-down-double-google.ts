import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-drop-down-double-google')
export class ObiDropDownDoubleGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.9313 14C9.32548 14 9.02257 14 8.88231 14.1198C8.76061 14.2237 8.69602 14.3797 8.70858 14.5392C8.72305 14.7231 8.93724 14.9373 9.36561 15.3657L11.4342 17.4343C11.6323 17.6323 11.7313 17.7313 11.8454 17.7684C11.9458 17.801 12.054 17.801 12.1544 17.7684C12.2686 17.7313 12.3676 17.6323 12.5656 17.4343L14.6342 15.3657C15.0626 14.9373 15.2768 14.7231 15.2913 14.5392C15.3038 14.3797 15.2392 14.2237 15.1175 14.1198C14.9773 14 14.6744 14 14.0686 14H9.9313Z" fill="currentColor"/>
<path d="M14.0686 9.99998C14.6744 9.99998 14.9773 9.99998 15.1175 9.88019C15.2392 9.77624 15.3038 9.62031 15.2913 9.46076C15.2768 9.27686 15.0626 9.06268 14.6342 8.6343L12.5656 6.56567C12.3676 6.36766 12.2686 6.26866 12.1544 6.23156C12.054 6.19894 11.9458 6.19894 11.8454 6.23156C11.7313 6.26866 11.6323 6.36766 11.4342 6.56567L9.36561 8.6343C8.93724 9.06268 8.72305 9.27686 8.70858 9.46075C8.69602 9.62031 8.76061 9.77624 8.88231 9.88019C9.02257 9.99998 9.32548 9.99998 9.9313 9.99998L14.0686 9.99998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.9313 14C9.32548 14 9.02257 14 8.88231 14.1198C8.76061 14.2237 8.69602 14.3797 8.70858 14.5392C8.72305 14.7231 8.93724 14.9373 9.36561 15.3657L11.4342 17.4343C11.6323 17.6323 11.7313 17.7313 11.8454 17.7684C11.9458 17.801 12.054 17.801 12.1544 17.7684C12.2686 17.7313 12.3676 17.6323 12.5656 17.4343L14.6342 15.3657C15.0626 14.9373 15.2768 14.7231 15.2913 14.5392C15.3038 14.3797 15.2392 14.2237 15.1175 14.1198C14.9773 14 14.6744 14 14.0686 14H9.9313Z" style="fill: var(--element-active-color)"/>
<path d="M14.0686 9.99998C14.6744 9.99998 14.9773 9.99998 15.1175 9.88019C15.2392 9.77624 15.3038 9.62031 15.2913 9.46076C15.2768 9.27686 15.0626 9.06268 14.6342 8.6343L12.5656 6.56567C12.3676 6.36766 12.2686 6.26866 12.1544 6.23156C12.054 6.19894 11.9458 6.19894 11.8454 6.23156C11.7313 6.26866 11.6323 6.36766 11.4342 6.56567L9.36561 8.6343C8.93724 9.06268 8.72305 9.27686 8.70858 9.46075C8.69602 9.62031 8.76061 9.77624 8.88231 9.88019C9.02257 9.99998 9.32548 9.99998 9.9313 9.99998L14.0686 9.99998Z" style="fill: var(--element-active-color)"/>
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
    'obi-drop-down-double-google': ObiDropDownDoubleGoogle;
  }
}