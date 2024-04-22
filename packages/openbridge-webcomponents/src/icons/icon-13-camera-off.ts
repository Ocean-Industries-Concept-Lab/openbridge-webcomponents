import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-13-camera-off')
export class Obi13CameraOff extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.99982 5.5856L3.01968 2.60547L1.60547 4.01968L3.67413 6.08835C3.26072 6.45475 3.00015 6.98975 3.00015 7.5856V16.5856C3.00015 17.6902 3.89558 18.5856 5.00015 18.5856H16.0002C16.0556 18.5856 16.1104 18.5833 16.1647 18.5789L18.4515 20.8657L19.8657 19.4515L17.8233 17.4091L17.8239 17.4077L16.0002 15.584V15.5859L7.99982 7.5856H8.0018L6.0018 5.5856H5.99982ZM5.17139 7.5856H5.00015L5.00015 16.5856H14.1714L5.17139 7.5856Z" fill="currentColor"/>
<path d="M16.0002 7.5856V12.7555L18.0002 14.7555V13.6513L21.0002 15.9998V7.99979L18.0002 10.4513V7.5856C18.0002 6.48103 17.1047 5.5856 16.0002 5.5856H8.83023L10.8302 7.5856H16.0002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.99982 5.5856L3.01968 2.60547L1.60547 4.01968L3.67413 6.08835C3.26072 6.45475 3.00015 6.98975 3.00015 7.5856V16.5856C3.00015 17.6902 3.89558 18.5856 5.00015 18.5856H16.0002C16.0556 18.5856 16.1104 18.5833 16.1647 18.5789L18.4515 20.8657L19.8657 19.4515L17.8233 17.4091L17.8239 17.4077L16.0002 15.584V15.5859L7.99982 7.5856H8.0018L6.0018 5.5856H5.99982ZM5.17139 7.5856H5.00015L5.00015 16.5856H14.1714L5.17139 7.5856Z" style="fill: var(--element-active-color)"/>
<path d="M16.0002 7.5856V12.7555L18.0002 14.7555V13.6513L21.0002 15.9998V7.99979L18.0002 10.4513V7.5856C18.0002 6.48103 17.1047 5.5856 16.0002 5.5856H8.83023L10.8302 7.5856H16.0002Z" style="fill: var(--element-active-color)"/>
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
    'obi-13-camera-off': Obi13CameraOff;
  }
}