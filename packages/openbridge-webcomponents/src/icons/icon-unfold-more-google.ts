import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-unfold-more-google')
export class ObiUnfoldMoreGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6.83L15.17 10L16.58 8.59L12 4L7.41003 8.59L8.83003 10L12 6.83Z" fill="currentColor"/>
<path d="M12 17.17L8.83004 14L7.42004 15.41L12 20L16.59 15.41L15.17 14L12 17.17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6.83L15.17 10L16.58 8.59L12 4L7.41003 8.59L8.83003 10L12 6.83Z" style="fill: var(--element-active-color)"/>
<path d="M12 17.17L8.83004 14L7.42004 15.41L12 20L16.59 15.41L15.17 14L12 17.17Z" style="fill: var(--element-active-color)"/>
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
    'obi-unfold-more-google': ObiUnfoldMoreGoogle;
  }
}