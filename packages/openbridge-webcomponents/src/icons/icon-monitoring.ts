import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-monitoring')
export class ObiMonitoring extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48703 10.5689L7.6594 12.5H2V10.5H6.3406L7.58085 7.60608L9.42308 7.61538L11.013 11.4311L11.8406 9.5H14V11.5H13.1594L11.9191 14.3939L10.0769 14.3846L8.48703 10.5689Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2109 17.4271 13.7879 16.4628 15.0499L20.0875 18.6746C20.4781 19.0652 20.4781 19.6983 20.0875 20.0888C19.697 20.4794 19.0639 20.4794 18.6733 20.0888L15.0484 16.4639C13.7867 17.4276 12.2102 18 10.5 18C7.62196 18 5.12254 16.3789 3.86505 14H6.25716C7.26595 15.2215 8.79206 16 10.5 16C13.5376 16 16 13.5376 16 10.5C16 7.46243 13.5376 5 10.5 5C7.98245 5 5.85996 6.6915 5.20703 9H3.15003C3.84493 5.57664 6.87156 3 10.5 3Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48703 10.5689L7.6594 12.5H2V10.5H6.3406L7.58085 7.60608L9.42308 7.61538L11.013 11.4311L11.8406 9.5H14V11.5H13.1594L11.9191 14.3939L10.0769 14.3846L8.48703 10.5689Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2109 17.4271 13.7879 16.4628 15.0499L20.0875 18.6746C20.4781 19.0652 20.4781 19.6983 20.0875 20.0888C19.697 20.4794 19.0639 20.4794 18.6733 20.0888L15.0484 16.4639C13.7867 17.4276 12.2102 18 10.5 18C7.62196 18 5.12254 16.3789 3.86505 14H6.25716C7.26595 15.2215 8.79206 16 10.5 16C13.5376 16 16 13.5376 16 10.5C16 7.46243 13.5376 5 10.5 5C7.98245 5 5.85996 6.6915 5.20703 9H3.15003C3.84493 5.57664 6.87156 3 10.5 3Z" style="fill: var(--element-active-color)"/>
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
    'obi-monitoring': ObiMonitoring;
  }
}
