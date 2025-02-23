import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-camera-off')
export class ObiCameraOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.99957 5.5856L3.01944 2.60547L1.60522 4.01968L3.67389 6.08835C3.26048 6.45475 2.99991 6.98975 2.99991 7.5856V16.5856C2.99991 17.6902 3.89534 18.5856 4.99991 18.5856H15.9999C16.0553 18.5856 16.1102 18.5833 16.1645 18.5789L18.4512 20.8657L19.8655 19.4515L17.823 17.4091L17.8237 17.4077L15.9999 15.584V15.5859L7.99957 7.5856H8.00156L6.00156 5.5856H5.99957ZM5.17114 7.5856H4.99991L4.99991 16.5856H14.1711L5.17114 7.5856Z" fill="currentColor"/>
<path d="M15.9999 7.5856V12.7555L17.9999 14.7555V13.6513L20.9999 15.9998V7.99979L17.9999 10.4513V7.5856C17.9999 6.48103 17.1045 5.5856 15.9999 5.5856H8.82999L10.83 7.5856H15.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.99957 5.5856L3.01944 2.60547L1.60522 4.01968L3.67389 6.08835C3.26048 6.45475 2.99991 6.98975 2.99991 7.5856V16.5856C2.99991 17.6902 3.89534 18.5856 4.99991 18.5856H15.9999C16.0553 18.5856 16.1102 18.5833 16.1645 18.5789L18.4512 20.8657L19.8655 19.4515L17.823 17.4091L17.8237 17.4077L15.9999 15.584V15.5859L7.99957 7.5856H8.00156L6.00156 5.5856H5.99957ZM5.17114 7.5856H4.99991L4.99991 16.5856H14.1711L5.17114 7.5856Z" style="fill: var(--element-active-color)"/>
<path d="M15.9999 7.5856V12.7555L17.9999 14.7555V13.6513L20.9999 15.9998V7.99979L17.9999 10.4513V7.5856C17.9999 6.48103 17.1045 5.5856 15.9999 5.5856H8.82999L10.83 7.5856H15.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-camera-off': ObiCameraOff;
  }
}
