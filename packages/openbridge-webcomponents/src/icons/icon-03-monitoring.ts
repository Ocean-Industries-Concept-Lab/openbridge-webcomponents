import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-monitoring')
export class Obi03Monitoring extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.03274 7.04951L9.9706 10.4408L10.691 9H19V10H11.309L10.0294 12.5592L7.96726 8.95049L7.26759 10H6V9H6.73241L8.03274 7.04951Z" fill="currentColor"/>
<path d="M14.71 14H15.5L20.49 19L19 20.49L14 15.5V14.71L13.73 14.43C12.59 15.41 11.11 16 9.5 16C5.91 16 3 13.09 3 9.5C3 5.91 5.91 3 9.5 3C12.5737 3 15.149 5.13321 15.8261 8H13.7451C13.1289 6.25017 11.4637 5 9.5 5C7.01 5 5 7.01 5 9.5C5 11.99 7.01 14 9.5 14C11.4637 14 13.1289 12.7498 13.7451 11H15.825C15.5821 12.0231 15.0961 12.9551 14.43 13.73L14.71 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.03274 7.04951L9.9706 10.4408L10.691 9H19V10H11.309L10.0294 12.5592L7.96726 8.95049L7.26759 10H6V9H6.73241L8.03274 7.04951Z" style="fill: var(--element-active-color)"/>
<path d="M14.71 14H15.5L20.49 19L19 20.49L14 15.5V14.71L13.73 14.43C12.59 15.41 11.11 16 9.5 16C5.91 16 3 13.09 3 9.5C3 5.91 5.91 3 9.5 3C12.5737 3 15.149 5.13321 15.8261 8H13.7451C13.1289 6.25017 11.4637 5 9.5 5C7.01 5 5 7.01 5 9.5C5 11.99 7.01 14 9.5 14C11.4637 14 13.1289 12.7498 13.7451 11H15.825C15.5821 12.0231 15.0961 12.9551 14.43 13.73L14.71 14Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-monitoring': Obi03Monitoring;
  }
}
