import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-reorder-google')
export class ObiReorderGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00008 1.58578L12.7072 6.29289L11.293 7.70711L9.00008 5.41421V14H7.00008V5.41421L4.70718 7.70711L3.29297 6.29289L8.00008 1.58578Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 22.4142L11.293 17.7071L12.7072 16.2929L15.0001 18.5858V10H17.0001V18.5858L19.293 16.2929L20.7072 17.7071L16.0001 22.4142Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00008 1.58578L12.7072 6.29289L11.293 7.70711L9.00008 5.41421V14H7.00008V5.41421L4.70718 7.70711L3.29297 6.29289L8.00008 1.58578Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 22.4142L11.293 17.7071L12.7072 16.2929L15.0001 18.5858V10H17.0001V18.5858L19.293 16.2929L20.7072 17.7071L16.0001 22.4142Z" style="fill: var(--element-active-color)"/>
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
