import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-05-people')
export class Obi05People extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16 11.3501C17.66 11.3501 18.99 10.0101 18.99 8.3501C18.99 6.6901 17.66 5.3501 16 5.3501C14.34 5.3501 13 6.6901 13 8.3501C13 10.0101 14.34 11.3501 16 11.3501ZM8 11.3501C9.66 11.3501 10.99 10.0101 10.99 8.3501C10.99 6.6901 9.66 5.3501 8 5.3501C6.34 5.3501 5 6.6901 5 8.3501C5 10.0101 6.34 11.3501 8 11.3501ZM8 13.3501C5.67 13.3501 1 14.5201 1 16.8501V19.3501H15V16.8501C15 14.5201 10.33 13.3501 8 13.3501ZM16 13.3501C15.71 13.3501 15.38 13.3701 15.03 13.4001C16.19 14.2401 17 15.3701 17 16.8501V19.3501H23V16.8501C23 14.5201 18.33 13.3501 16 13.3501Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 11.3501C17.66 11.3501 18.99 10.0101 18.99 8.3501C18.99 6.6901 17.66 5.3501 16 5.3501C14.34 5.3501 13 6.6901 13 8.3501C13 10.0101 14.34 11.3501 16 11.3501ZM8 11.3501C9.66 11.3501 10.99 10.0101 10.99 8.3501C10.99 6.6901 9.66 5.3501 8 5.3501C6.34 5.3501 5 6.6901 5 8.3501C5 10.0101 6.34 11.3501 8 11.3501ZM8 13.3501C5.67 13.3501 1 14.5201 1 16.8501V19.3501H15V16.8501C15 14.5201 10.33 13.3501 8 13.3501ZM16 13.3501C15.71 13.3501 15.38 13.3701 15.03 13.4001C16.19 14.2401 17 15.3701 17 16.8501V19.3501H23V16.8501C23 14.5201 18.33 13.3501 16 13.3501Z" style="fill: var(--element-active-color)"/>
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
    'obi-05-people': Obi05People;
  }
}
