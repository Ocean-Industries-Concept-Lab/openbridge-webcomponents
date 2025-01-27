import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-note-edit-proposal')
export class ObiNoteEditProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 13V11H13V13H3ZM3 9V7H17V9H3ZM3 5V3H17V5H3ZM11 21V17.925L18.025 10.925C18.175 10.775 18.3417 10.6667 18.525 10.6C18.7083 10.5333 18.8917 10.5 19.075 10.5C19.275 10.5 19.4667 10.5375 19.65 10.6125C19.8333 10.6875 20 10.8 20.15 10.95L21.075 11.875C21.2083 12.025 21.3125 12.1917 21.3875 12.375C21.4625 12.5583 21.5 12.7417 21.5 12.925C21.5 13.1083 21.4667 13.2958 21.4 13.4875C21.3333 13.6792 21.225 13.85 21.075 14L14.075 21H11ZM12.5 19.5H13.45L17.975 14.95L17.525 14.475L17.05 14.025L12.5 18.55V19.5ZM17.525 14.475L17.05 14.025L17.975 14.95L17.525 14.475Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 13V11H13V13H3ZM3 9V7H17V9H3ZM3 5V3H17V5H3ZM11 21V17.925L18.025 10.925C18.175 10.775 18.3417 10.6667 18.525 10.6C18.7083 10.5333 18.8917 10.5 19.075 10.5C19.275 10.5 19.4667 10.5375 19.65 10.6125C19.8333 10.6875 20 10.8 20.15 10.95L21.075 11.875C21.2083 12.025 21.3125 12.1917 21.3875 12.375C21.4625 12.5583 21.5 12.7417 21.5 12.925C21.5 13.1083 21.4667 13.2958 21.4 13.4875C21.3333 13.6792 21.225 13.85 21.075 14L14.075 21H11ZM12.5 19.5H13.45L17.975 14.95L17.525 14.475L17.05 14.025L12.5 18.55V19.5ZM17.525 14.475L17.05 14.025L17.975 14.95L17.525 14.475Z" style="fill: var(--element-active-color)"/>
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
    'obi-note-edit-proposal': ObiNoteEditProposal;
  }
}
