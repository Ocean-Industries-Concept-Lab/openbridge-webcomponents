import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-reorder-google')
export class ObiReorderGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99995 1.58582L12.7071 6.29292L11.2928 7.70714L8.99995 5.41424V14H6.99995V5.41424L4.70706 7.70714L3.29285 6.29292L7.99995 1.58582Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 22.4142L11.2928 17.7071L12.7071 16.2929L15 18.5858V10H17V18.5858L19.2928 16.2929L20.7071 17.7071L16 22.4142Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99995 1.58582L12.7071 6.29292L11.2928 7.70714L8.99995 5.41424V14H6.99995V5.41424L4.70706 7.70714L3.29285 6.29292L7.99995 1.58582Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 22.4142L11.2928 17.7071L12.7071 16.2929L15 18.5858V10H17V18.5858L19.2928 16.2929L20.7071 17.7071L16 22.4142Z" style="fill: var(--element-active-color)"/>
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
    'obi-reorder-google': ObiReorderGoogle;
  }
}
