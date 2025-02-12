import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-undo-iec')
export class ObiUndoIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.31323 18.9473V16.9473H14.4132C15.4632 16.9473 16.3756 16.6139 17.1502 15.9473C17.9256 15.2806 18.3132 14.4473 18.3132 13.4473C18.3132 12.4473 17.9256 11.6139 17.1502 10.9473C16.3756 10.2806 15.4632 9.94727 14.4132 9.94727H8.11323L10.7132 12.5473L9.31323 13.9473L4.31323 8.94727L9.31323 3.94727L10.7132 5.34727L8.11323 7.94727H14.4132C16.0299 7.94727 17.4176 8.47227 18.5762 9.52227C19.7342 10.5723 20.3132 11.8806 20.3132 13.4473C20.3132 15.0139 19.7342 16.3223 18.5762 17.3723C17.4176 18.4223 16.0299 18.9473 14.4132 18.9473H7.31323Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.31323 18.9473V16.9473H14.4132C15.4632 16.9473 16.3756 16.6139 17.1502 15.9473C17.9256 15.2806 18.3132 14.4473 18.3132 13.4473C18.3132 12.4473 17.9256 11.6139 17.1502 10.9473C16.3756 10.2806 15.4632 9.94727 14.4132 9.94727H8.11323L10.7132 12.5473L9.31323 13.9473L4.31323 8.94727L9.31323 3.94727L10.7132 5.34727L8.11323 7.94727H14.4132C16.0299 7.94727 17.4176 8.47227 18.5762 9.52227C19.7342 10.5723 20.3132 11.8806 20.3132 13.4473C20.3132 15.0139 19.7342 16.3223 18.5762 17.3723C17.4176 18.4223 16.0299 18.9473 14.4132 18.9473H7.31323Z" style="fill: var(--element-active-color)"/>
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
    'obi-undo-iec': ObiUndoIec;
  }
}
