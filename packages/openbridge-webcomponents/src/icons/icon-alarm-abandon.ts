import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-abandon')
export class ObiAlarmAbandon extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.14272 17.9997H4.00033C5.39033 17.9997 6.78033 17.5297 8.00033 16.6797C9.22033 17.5297 10.6176 17.9597 12.0076 17.9597C13.3976 17.9597 14.7948 17.5294 16.0148 16.6794C16.9883 17.3577 18.07 17.794 19.1736 17.9426L21.6348 13.7376C22.1237 12.8909 21.8309 11.798 20.9841 11.3092L18.6747 9.97582L20.008 7.66642L15.3892 4.99976L14.0559 7.30916L11.7465 5.97582C10.8997 5.48693 9.80688 5.77976 9.31799 6.62654L7.26466 10.183L6.08495 9.933C5.84925 9.87902 5.59989 9.91981 5.40085 10.0512C5.20181 10.1826 5.05427 10.3849 5.00799 10.625C4.68051 11.9266 4.35072 13.2276 4.02093 14.5285C3.72765 15.6854 3.43437 16.8424 3.14272 17.9997ZM20.0952 12.8488L10.8576 7.51543L9.09315 10.5715L14.5875 11.7217L18.3308 15.9049L20.0952 12.8488Z" fill="currentColor"/>
<path d="M12 19.9598C13.39 19.9598 14.78 19.5298 16 18.6798C17.22 19.5298 18.61 19.9998 20 19.9998H22V21.9998H20C18.62 21.9998 17.26 21.6598 16 21.0098C14.74 21.6598 13.37 21.9798 12 21.9798C10.63 21.9798 9.26 21.6498 8 21.0098C6.74 21.6498 5.38 21.9998 4 21.9998H2V19.9998H4C5.39 19.9998 6.78 19.5298 8 18.6798C9.22 19.5298 10.61 19.9598 12 19.9598Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.14272 17.9997H4.00033C5.39033 17.9997 6.78033 17.5297 8.00033 16.6797C9.22033 17.5297 10.6176 17.9597 12.0076 17.9597C13.3976 17.9597 14.7948 17.5294 16.0148 16.6794C16.9883 17.3577 18.07 17.794 19.1736 17.9426L21.6348 13.7376C22.1237 12.8909 21.8309 11.798 20.9841 11.3092L18.6747 9.97582L20.008 7.66642L15.3892 4.99976L14.0559 7.30916L11.7465 5.97582C10.8997 5.48693 9.80688 5.77976 9.31799 6.62654L7.26466 10.183L6.08495 9.933C5.84925 9.87902 5.59989 9.91981 5.40085 10.0512C5.20181 10.1826 5.05427 10.3849 5.00799 10.625C4.68051 11.9266 4.35072 13.2276 4.02093 14.5285C3.72765 15.6854 3.43437 16.8424 3.14272 17.9997ZM20.0952 12.8488L10.8576 7.51543L9.09315 10.5715L14.5875 11.7217L18.3308 15.9049L20.0952 12.8488Z" style="fill: var(--element-active-color)"/>
<path d="M12 19.9598C13.39 19.9598 14.78 19.5298 16 18.6798C17.22 19.5298 18.61 19.9998 20 19.9998H22V21.9998H20C18.62 21.9998 17.26 21.6598 16 21.0098C14.74 21.6598 13.37 21.9798 12 21.9798C10.63 21.9798 9.26 21.6498 8 21.0098C6.74 21.6498 5.38 21.9998 4 21.9998H2V19.9998H4C5.39 19.9998 6.78 19.5298 8 18.6798C9.22 19.5298 10.61 19.9598 12 19.9598Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-abandon': ObiAlarmAbandon;
  }
}