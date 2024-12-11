import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-delete-icon')
export class ObiCursorDeleteIcon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.666 11H18.3327V19.6667H11.666V11Z" fill="currentColor"/>
<path d="M13.2667 18L15 16.2667L16.7333 18L17.6667 17.0667L15.9333 15.3333L17.6667 13.6L16.7333 12.6667L15 14.4L13.2667 12.6667L12.3333 13.6L14.0667 15.3333L12.3333 17.0667L13.2667 18ZM11.6667 21C11.3 21 10.9861 20.8694 10.725 20.6083C10.4639 20.3472 10.3333 20.0333 10.3333 19.6667V11H9.66667V9.66667H13V9H17V9.66667H20.3333V11H19.6667V19.6667C19.6667 20.0333 19.5361 20.3472 19.275 20.6083C19.0139 20.8694 18.7 21 18.3333 21H11.6667ZM18.3333 11H11.6667V19.6667H18.3333V11Z" fill="currentColor"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.666 11H18.3327V19.6667H11.666V11Z" style="fill: var(--element-active-inverted-color)"/>
<path d="M13.2667 18L15 16.2667L16.7333 18L17.6667 17.0667L15.9333 15.3333L17.6667 13.6L16.7333 12.6667L15 14.4L13.2667 12.6667L12.3333 13.6L14.0667 15.3333L12.3333 17.0667L13.2667 18ZM11.6667 21C11.3 21 10.9861 20.8694 10.725 20.6083C10.4639 20.3472 10.3333 20.0333 10.3333 19.6667V11H9.66667V9.66667H13V9H17V9.66667H20.3333V11H19.6667V19.6667C19.6667 20.0333 19.5361 20.3472 19.275 20.6083C19.0139 20.8694 18.7 21 18.3333 21H11.6667ZM18.3333 11H11.6667V19.6667H18.3333V11Z" style="fill: var(--element-active-color)"/>
<path d="M5 13L1 1L13 5L7 7L5 13Z" style="fill: var(--element-active-color)"/>
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
    'obi-cursor-delete-icon': ObiCursorDeleteIcon;
  }
}
