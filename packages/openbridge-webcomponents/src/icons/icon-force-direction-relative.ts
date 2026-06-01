import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-force-direction-relative')
export class ObiForceDirectionRelative extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9306 1.49611C11.1844 0.376959 12.8156 0.376939 13.0693 1.49611L13.0908 1.61134L14.8427 14.7588L17.4843 14.0986L17.5781 14.0791C18.5355 13.9193 19.2327 15.0227 18.6308 15.8252L12.8799 23.4932C12.4399 24.0798 11.5601 24.0798 11.1201 23.4932L5.36911 15.8252C4.76725 15.0227 5.46442 13.9193 6.42185 14.0791L6.5156 14.0986L9.15622 14.7588L10.9092 1.61134L10.9306 1.49611ZM10.8437 17.2412L8.48923 16.6524L12 21.333L15.5097 16.6524L13.1562 17.2412L12 8.5674L10.8437 17.2412Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9306 1.49611C11.1844 0.376959 12.8156 0.376939 13.0693 1.49611L13.0908 1.61134L14.8427 14.7588L17.4843 14.0986L17.5781 14.0791C18.5355 13.9193 19.2327 15.0227 18.6308 15.8252L12.8799 23.4932C12.4399 24.0798 11.5601 24.0798 11.1201 23.4932L5.36911 15.8252C4.76725 15.0227 5.46442 13.9193 6.42185 14.0791L6.5156 14.0986L9.15622 14.7588L10.9092 1.61134L10.9306 1.49611ZM10.8437 17.2412L8.48923 16.6524L12 21.333L15.5097 16.6524L13.1562 17.2412L12 8.5674L10.8437 17.2412Z" style="fill: var(--element-active-color)"/>
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
    'obi-force-direction-relative': ObiForceDirectionRelative;
  }
}
