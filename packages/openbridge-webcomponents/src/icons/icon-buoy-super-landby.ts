import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-super-landby')
export class ObiBuoySuperLandby extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7502 12V6.29903L15.0893 7.64952L15.8393 6.35048L13.5002 5L15.8393 3.64952L15.0893 2.35048L12.7502 3.70097V1H11.2502V3.70096L8.91113 2.35048L8.16113 3.64952L10.5002 5L8.16113 6.35048L8.91113 7.64952L11.2502 6.29904V12H6.13333L4.4 18.5H2V20H9C9 21.6569 10.3431 23 12 23C13.6569 23 15 21.6569 15 20H22V18.5H19.6L17.8667 12H12.7502ZM14.5987 18.5H18.0476L16.7142 13.5H7.28575L5.95242 18.5H9.40135C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7502 12V6.29903L15.0893 7.64952L15.8393 6.35048L13.5002 5L15.8393 3.64952L15.0893 2.35048L12.7502 3.70097V1H11.2502V3.70096L8.91113 2.35048L8.16113 3.64952L10.5002 5L8.16113 6.35048L8.91113 7.64952L11.2502 6.29904V12H6.13333L4.4 18.5H2V20H9C9 21.6569 10.3431 23 12 23C13.6569 23 15 21.6569 15 20H22V18.5H19.6L17.8667 12H12.7502ZM14.5987 18.5H18.0476L16.7142 13.5H7.28575L5.95242 18.5H9.40135C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-super-landby': ObiBuoySuperLandby;
  }
}