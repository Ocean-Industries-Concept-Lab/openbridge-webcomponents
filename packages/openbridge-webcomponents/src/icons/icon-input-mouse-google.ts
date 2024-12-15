import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-input-mouse-google')
export class ObiInputMouseGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1C7.6 1 4.04 4.54 4 8.93L6 8.93C6.04 5.99 8.19 3.56 11 3.09V8.93H13V3.09C15.81 3.56 17.96 5.99 18 8.93L19.9995 8.88764C19.9371 4.51725 16.3858 1 12 1Z" fill="currentColor"/>
<path d="M20 14.93V8.93L19.9995 8.88764L18 8.93H13H11H6L4 8.93V14.93L6 10.93H18L20 14.93Z" fill="currentColor"/>
<path d="M12 22.93C16.42 22.93 20 19.35 20 14.93L18 10.93V14.93C18 18.24 15.31 20.93 12 20.93C8.69 20.93 6 18.24 6 14.93V10.93L4 14.93C4 19.35 7.58 22.93 12 22.93Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1C7.6 1 4.04 4.54 4 8.93L6 8.93C6.04 5.99 8.19 3.56 11 3.09V8.93H13V3.09C15.81 3.56 17.96 5.99 18 8.93L19.9995 8.88764C19.9371 4.51725 16.3858 1 12 1Z" style="fill: var(--element-active-color)"/>
<path d="M20 14.93V8.93L19.9995 8.88764L18 8.93H13H11H6L4 8.93V14.93L6 10.93H18L20 14.93Z" style="fill: var(--element-active-color)"/>
<path d="M12 22.93C16.42 22.93 20 19.35 20 14.93L18 10.93V14.93C18 18.24 15.31 20.93 12 20.93C8.69 20.93 6 18.24 6 14.93V10.93L4 14.93C4 19.35 7.58 22.93 12 22.93Z" style="fill: var(--element-active-color)"/>
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
    'obi-input-mouse-google': ObiInputMouseGoogle;
  }
}
