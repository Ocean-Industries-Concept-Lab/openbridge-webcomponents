import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diodes-07-off')
export class ObiDiodes07Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.5C10 3.22386 10.2239 3 10.5 3C10.7761 3 11 3.22386 11 3.5V8.23077L17 11.4615V4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4L19 20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20L17 12.5385L11 15.7692L11 20.5C11 20.7761 10.7761 21 10.5 21C10.2239 21 10 20.7761 10 20.5L10 16.3077L5 19L5 5L10 7.69231V3.5ZM6 6.67422L10 8.82806L10 15.1719L6 17.3258L6 6.67422ZM15.8907 12L11 9.36653L11 14.6335L15.8907 12Z" fill="currentColor"/>
<path d="M10 8.82767L6 6.67383L6 17.3254L10 15.1715L10 8.82767Z" fill="currentColor"/>
<path d="M11 14.6331L15.8907 11.9996L11 9.36614V14.6331Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.5C10 3.22386 10.2239 3 10.5 3C10.7761 3 11 3.22386 11 3.5V8.23077L17 11.4615V4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4L19 20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20L17 12.5385L11 15.7692L11 20.5C11 20.7761 10.7761 21 10.5 21C10.2239 21 10 20.7761 10 20.5L10 16.3077L5 19L5 5L10 7.69231V3.5ZM6 6.67422L10 8.82806L10 15.1719L6 17.3258L6 6.67422ZM15.8907 12L11 9.36653L11 14.6335L15.8907 12Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M10 8.82767L6 6.67383L6 17.3254L10 15.1715L10 8.82767Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 14.6331L15.8907 11.9996L11 9.36614V14.6331Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-diodes-07-off': ObiDiodes07Off;
  }
}