import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-text-icon')
export class ObiTextIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7884 18L7.92443 8.928H7.86043C7.8711 9.14134 7.8871 9.456 7.90843 9.872C7.92976 10.2773 7.9511 10.72 7.97243 11.2C7.99376 11.6693 8.00443 12.1067 8.00443 12.512V18H5.94043V6.576H9.10843L11.8924 15.376H11.9404L14.9004 6.576H18.0524V18H15.8924V12.416C15.8924 12.0427 15.8978 11.632 15.9084 11.184C15.9298 10.7253 15.9458 10.2933 15.9564 9.888C15.9778 9.472 15.9938 9.15734 16.0044 8.944H15.9404L12.9004 18H10.7884Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7884 18L7.92443 8.928H7.86043C7.8711 9.14134 7.8871 9.456 7.90843 9.872C7.92976 10.2773 7.9511 10.72 7.97243 11.2C7.99376 11.6693 8.00443 12.1067 8.00443 12.512V18H5.94043V6.576H9.10843L11.8924 15.376H11.9404L14.9004 6.576H18.0524V18H15.8924V12.416C15.8924 12.0427 15.8978 11.632 15.9084 11.184C15.9298 10.7253 15.9458 10.2933 15.9564 9.888C15.9778 9.472 15.9938 9.15734 16.0044 8.944H15.9404L12.9004 18H10.7884Z" style="fill: var(--element-active-color)"/>
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
    'obi-text-icon': ObiTextIcon;
  }
}
