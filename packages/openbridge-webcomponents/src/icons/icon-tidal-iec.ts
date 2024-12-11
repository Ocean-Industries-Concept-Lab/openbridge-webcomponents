import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-tidal-iec')
export class ObiTidalIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0.231934L5.62036 7.67483L6.37962 8.32562L11.5 2.35186V7.81527L5.62036 14.6748L6.37962 15.3256L11.5 9.35186V14.8153L5.62036 21.6748L6.37962 22.3256L11.5 16.3519V24.0002H12.5V16.3519L17.6204 22.3256L18.3796 21.6748L12.5 14.8153V9.35186L17.6204 15.3256L18.3796 14.6748L12.5 7.81527V2.35186L17.6204 8.32562L18.3796 7.67483L12 0.231934Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0.231934L5.62036 7.67483L6.37962 8.32562L11.5 2.35186V7.81527L5.62036 14.6748L6.37962 15.3256L11.5 9.35186V14.8153L5.62036 21.6748L6.37962 22.3256L11.5 16.3519V24.0002H12.5V16.3519L17.6204 22.3256L18.3796 21.6748L12.5 14.8153V9.35186L17.6204 15.3256L18.3796 14.6748L12.5 7.81527V2.35186L17.6204 8.32562L18.3796 7.67483L12 0.231934Z" fill="currentColor"/>
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
    'obi-tidal-iec': ObiTidalIec;
  }
}
