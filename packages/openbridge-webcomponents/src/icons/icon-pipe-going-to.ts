import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-going-to')
export class ObiPipeGoingTo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.00012 15.0001L0.00012207 15.0001V9.01428L9.00012 9.00012L9.00012 4.99889C9.00012 4.17506 9.94044 3.70462 10.5997 4.19859L20.0001 11.2063C20.5342 11.6064 20.5339 12.4075 19.9995 12.8073L10.5991 19.8039C9.93974 20.2972 9.00012 19.8267 9.00012 19.0032L9.00012 15.0001Z" fill="currentColor"/>
<path d="M9 19.0032C9 19.8267 9.93962 20.2972 10.599 19.8039L20.0412 12.8073C20.5756 12.4075 20.5759 11.6064 20.0418 11.2063L10.5996 4.19859C9.94031 3.70462 9 4.17506 9 4.99889L9 9.00012L0 9.01288V10.0129L10 9.99872L10 4.99888L19.4422 12.0066L10 19.0032L10 14.0001L0 14.0001V15.0001L9 15.0001L9 19.0032Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.00012 15.0001L0.00012207 15.0001V9.01428L9.00012 9.00012L9.00012 4.99889C9.00012 4.17506 9.94044 3.70462 10.5997 4.19859L20.0001 11.2063C20.5342 11.6064 20.5339 12.4075 19.9995 12.8073L10.5991 19.8039C9.93974 20.2972 9.00012 19.8267 9.00012 19.0032L9.00012 15.0001Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M9 19.0032C9 19.8267 9.93962 20.2972 10.599 19.8039L20.0412 12.8073C20.5756 12.4075 20.5759 11.6064 20.0418 11.2063L10.5996 4.19859C9.94031 3.70462 9 4.17506 9 4.99889L9 9.00012L0 9.01288V10.0129L10 9.99872L10 4.99888L19.4422 12.0066L10 19.0032L10 14.0001L0 14.0001V15.0001L9 15.0001L9 19.0032Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-pipe-going-to': ObiPipeGoingTo;
  }
}