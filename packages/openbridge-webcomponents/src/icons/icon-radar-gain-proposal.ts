import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-gain-proposal')
export class ObiRadarGainProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor"/>
<path d="M15.75 5.50483C17.4727 6.49939 18.7296 8.13753 19.2445 10.0589L14.6478 11.2906C13.845 9.51652 12.0594 8.28225 9.98556 8.28225C7.16076 8.28225 4.87081 10.5722 4.87081 13.397C4.87081 13.568 4.8792 13.737 4.89559 13.9036L4.75557 13.9412C4.24075 12.0198 4.51027 9.97265 5.50483 8.25002C6.49939 6.52739 8.13753 5.2704 10.0589 4.75557C11.9802 4.24075 14.0274 4.51027 15.75 5.50483Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" style="fill: var(--element-active-color)"/>
<path d="M15.75 5.50483C17.4727 6.49939 18.7296 8.13753 19.2445 10.0589L14.6478 11.2906C13.845 9.51652 12.0594 8.28225 9.98556 8.28225C7.16076 8.28225 4.87081 10.5722 4.87081 13.397C4.87081 13.568 4.8792 13.737 4.89559 13.9036L4.75557 13.9412C4.24075 12.0198 4.51027 9.97265 5.50483 8.25002C6.49939 6.52739 8.13753 5.2704 10.0589 4.75557C11.9802 4.24075 14.0274 4.51027 15.75 5.50483Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-gain-proposal': ObiRadarGainProposal;
  }
}
