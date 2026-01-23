import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-water-google')
export class ObiWaterGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21.5C9.78333 21.5 7.89583 20.7333 6.3375 19.2C4.77917 17.6667 4 15.8 4 13.6C4 12.55 4.20417 11.5458 4.6125 10.5875C5.02083 9.62917 5.6 8.78333 6.35 8.05L12 2.5L17.65 8.05C18.4 8.78333 18.9792 9.62917 19.3875 10.5875C19.7958 11.5458 20 12.55 20 13.6C20 15.8 19.2208 17.6667 17.6625 19.2C16.1042 20.7333 14.2167 21.5 12 21.5ZM12 19.5C13.6667 19.5 15.0833 18.9292 16.25 17.7875C17.4167 16.6458 18 15.25 18 13.6C18 12.8167 17.85 12.0708 17.55 11.3625C17.25 10.6542 16.8167 10.0333 16.25 9.5L12 5.3L7.75 9.5C7.18333 10.0333 6.75 10.6542 6.45 11.3625C6.15 12.0708 6 12.8167 6 13.6C6 15.25 6.58333 16.6458 7.75 17.7875C8.91667 18.9292 10.3333 19.5 12 19.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21.5C9.78333 21.5 7.89583 20.7333 6.3375 19.2C4.77917 17.6667 4 15.8 4 13.6C4 12.55 4.20417 11.5458 4.6125 10.5875C5.02083 9.62917 5.6 8.78333 6.35 8.05L12 2.5L17.65 8.05C18.4 8.78333 18.9792 9.62917 19.3875 10.5875C19.7958 11.5458 20 12.55 20 13.6C20 15.8 19.2208 17.6667 17.6625 19.2C16.1042 20.7333 14.2167 21.5 12 21.5ZM12 19.5C13.6667 19.5 15.0833 18.9292 16.25 17.7875C17.4167 16.6458 18 15.25 18 13.6C18 12.8167 17.85 12.0708 17.55 11.3625C17.25 10.6542 16.8167 10.0333 16.25 9.5L12 5.3L7.75 9.5C7.18333 10.0333 6.75 10.6542 6.45 11.3625C6.15 12.0708 6 12.8167 6 13.6C6 15.25 6.58333 16.6458 7.75 17.7875C8.91667 18.9292 10.3333 19.5 12 19.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-water-google': ObiWaterGoogle;
  }
}
