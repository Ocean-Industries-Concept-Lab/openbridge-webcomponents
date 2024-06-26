import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-delete')
export class Obi01Delete extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 21C6.9 21 6 20.1 6 19V7H18V19C18 20.1 17.1 21 16 21H8ZM9.87869 10.5L12 12.6213L14.1214 10.5L15.5356 11.9142L13.4142 14.0356L15.5355 16.1569L14.1213 17.5711L12 15.4498L9.87872 17.5711L8.46451 16.1569L10.5858 14.0356L8.46448 11.9142L9.87869 10.5Z" fill="currentColor"/>
<path d="M15.5 4H19V6H5V4H8.5L9.5 3H14.5L15.5 4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 21C6.9 21 6 20.1 6 19V7H18V19C18 20.1 17.1 21 16 21H8ZM9.87869 10.5L12 12.6213L14.1214 10.5L15.5356 11.9142L13.4142 14.0356L15.5355 16.1569L14.1213 17.5711L12 15.4498L9.87872 17.5711L8.46451 16.1569L10.5858 14.0356L8.46448 11.9142L9.87869 10.5Z" style="fill: var(--element-active-color)"/>
<path d="M15.5 4H19V6H5V4H8.5L9.5 3H14.5L15.5 4Z" style="fill: var(--element-active-color)"/>
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
    'obi-01-delete': Obi01Delete;
  }
}
