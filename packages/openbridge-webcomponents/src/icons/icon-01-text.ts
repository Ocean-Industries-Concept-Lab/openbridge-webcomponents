import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-text')
export class Obi01Text extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7884 18L7.92438 8.928H7.86038C7.87104 9.14133 7.88704 9.456 7.90838 9.872C7.92971 10.2773 7.95104 10.72 7.97238 11.2C7.99371 11.6693 8.00438 12.1067 8.00438 12.512V18H5.94038V6.576H9.10838L11.8924 15.376H11.9404L14.9004 6.576H18.0524V18H15.8924V12.416C15.8924 12.0427 15.8977 11.632 15.9084 11.184C15.9297 10.7253 15.9457 10.2933 15.9564 9.888C15.9777 9.472 15.9937 9.15733 16.0044 8.944H15.9404L12.9004 18H10.7884Z" fill="currentColor" />
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7884 18L7.92438 8.928H7.86038C7.87104 9.14133 7.88704 9.456 7.90838 9.872C7.92971 10.2773 7.95104 10.72 7.97238 11.2C7.99371 11.6693 8.00438 12.1067 8.00438 12.512V18H5.94038V6.576H9.10838L11.8924 15.376H11.9404L14.9004 6.576H18.0524V18H15.8924V12.416C15.8924 12.0427 15.8977 11.632 15.9084 11.184C15.9297 10.7253 15.9457 10.2933 15.9564 9.888C15.9777 9.472 15.9937 9.15733 16.0044 8.944H15.9404L12.9004 18H10.7884Z" style="fill: var(--element-neutral-color)" />
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
    'obi-01-text': Obi01Text;
  }
}
