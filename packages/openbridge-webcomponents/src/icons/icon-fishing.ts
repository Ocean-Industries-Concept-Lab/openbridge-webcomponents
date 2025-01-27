import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-fishing')
export class ObiFishing extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 15.5C5 19.0899 7.91015 22 11.5 22C15.0899 22 18 19.0899 18 15.5V12.3551C19.4457 11.9248 20.5 10.5855 20.5 9C20.5 7.41449 19.4457 6.07521 18 5.64494V2H16V5.64494C14.5543 6.07521 13.5 7.41449 13.5 9C13.5 10.5855 14.5543 11.9248 16 12.3551V15.5C16 17.9853 13.9853 20 11.5 20C9.01472 20 7 17.9853 7 15.5V14.2484L8.08538 15.283L9.5 13.8684L5 9.57895V15.5ZM17 10.5C17.3842 10.5 17.7346 10.3556 18 10.1181C18.3069 9.84339 18.5 9.44425 18.5 9C18.5 8.55575 18.3069 8.15661 18 7.88195C17.7346 7.64443 17.3842 7.5 17 7.5C16.6158 7.5 16.2654 7.64443 16 7.88195C15.6931 8.15661 15.5 8.55575 15.5 9C15.5 9.44425 15.6931 9.84339 16 10.1181C16.2654 10.3556 16.6158 10.5 17 10.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 15.5C5 19.0899 7.91015 22 11.5 22C15.0899 22 18 19.0899 18 15.5V12.3551C19.4457 11.9248 20.5 10.5855 20.5 9C20.5 7.41449 19.4457 6.07521 18 5.64494V2H16V5.64494C14.5543 6.07521 13.5 7.41449 13.5 9C13.5 10.5855 14.5543 11.9248 16 12.3551V15.5C16 17.9853 13.9853 20 11.5 20C9.01472 20 7 17.9853 7 15.5V14.2484L8.08538 15.283L9.5 13.8684L5 9.57895V15.5ZM17 10.5C17.3842 10.5 17.7346 10.3556 18 10.1181C18.3069 9.84339 18.5 9.44425 18.5 9C18.5 8.55575 18.3069 8.15661 18 7.88195C17.7346 7.64443 17.3842 7.5 17 7.5C16.6158 7.5 16.2654 7.64443 16 7.88195C15.6931 8.15661 15.5 8.55575 15.5 9C15.5 9.44425 15.6931 9.84339 16 10.1181C16.2654 10.3556 16.6158 10.5 17 10.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-fishing': ObiFishing;
  }
}
