import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-track-no')
export class ObiTrackNo extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1962 8.80387C14.2558 8.86233 13.3344 9.2514 12.6179 9.96796L8.4638 14.122L9.87802 15.5363L14.0321 11.3822C14.7487 10.6656 15.1377 9.7443 15.1962 8.80387ZM17 7.00002C14.9983 6.46546 12.774 6.98337 11.2037 8.55375L5.63538 14.122L9.87802 18.3647L15.4463 12.7964C17.0167 11.226 17.5346 9.00172 17 7.00002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1962 8.80387C14.2558 8.86233 13.3344 9.2514 12.6179 9.96796L8.4638 14.122L9.87802 15.5363L14.0321 11.3822C14.7487 10.6656 15.1377 9.7443 15.1962 8.80387ZM17 7.00002C14.9983 6.46546 12.774 6.98337 11.2037 8.55375L5.63538 14.122L9.87802 18.3647L15.4463 12.7964C17.0167 11.226 17.5346 9.00172 17 7.00002Z" style="fill: var(--element-active-color)"/>
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
    'obi-track-no': ObiTrackNo;
  }
}